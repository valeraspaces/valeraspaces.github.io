let appList, contentList, galleryList;
window.addEventListener("DOMContentLoaded", () => {
  appList = document.getElementById("apps_scrollbar");
  contentList = document.getElementById("feed_scrollbar");
  getTextFromUrl("/data/app_list.json").then(text => {
    var removableSkeleton = document.getElementById("app_block_scrollbar-skeletani");
    if(removableSkeleton) appList.removeChild(removableSkeleton);
    const json = JSON.parse(text);
    if(json.length <= 0) appList.innerHTML = "Додатки відсутні";
    for(let index in json){
      if(index > 15) break;
      const appDetails = json[index];
      if(!appDetails.favourite) continue;
      const cardApp = document.createElement("div");
      cardApp.classList.add("app_block_scrollbars");
      cardApp.innerHTML = `
        <h3 align="center">${appDetails.name}</h3>
        <p class="description">${appDetails.description}</p>
      `;
      cardApp.style.backgroundImage = `url("${appDetails.favicon}")`;
      cardApp.urlToAppPage = `/applications/index.html?app=${index}`;
      cardApp.addEventListener("click", (e) => {
        window.location.href = e.currentTarget.urlToAppPage;
      });
      appList.appendChild(cardApp);
    }
  });
  getTextFromUrl("/data/content_list.json").then(text => {
    const json = JSON.parse(text);
    if(json.length <= 0) contentList.innerHTML = "Публікації відсутні";
    const publication = json[0];
    contentList.innerHTML = `
      <div class="feed_block_scrollbar">
        <div id="title">${publication.place.length > 0 ? (publication.title + " • " + publication.place) : publication.title}</div>
        <div id="header_text">${publication.header}</div>
        <img src="${publication.urlToMedia[0]}"></img>
        <div id="description">${publication.description}</div>
      </div>
    `;
  });
  
});