let appList, downloadAppContainer;
const urlParams = new URLSearchParams(window.location.search);
const appSelectedUrl = urlParams.get("app");
window.addEventListener("DOMContentLoaded", () => {
  const urlToJSONFile = "/data/app_list.json";
  appList = document.getElementById("applications-list");
  downloadAppContainer = document.getElementById("app_details");
  appDetailsSetup: if(appSelectedUrl){
    if(appSelectedUrl.length <= 0) break appDetailsSetup;
    document.getElementById("header_content_description").remove();
    appList.remove();
    downloadAppContainer.style.display = "block";
    getTextFromUrl(urlToJSONFile).then(text => {
      const json = JSON.parse(text);
      const currentAppDetails = json[urlParams.get("app")];
      if(!currentAppDetails){
        downloadAppContainer.innerHTML = `
          <div id="app_header">
            <h3>Псевдо 404</h3>
          </div>
          <div id="description">Цей додаток не знайдений</div>
        `;
        return;
      }
      downloadAppContainer.innerHTML = `
        <div id="app_header">
          <img id="app_favicon" src="${currentAppDetails.favicon}"></img>
          <h3>${currentAppDetails.title}</h3>
          <a id="app_download" href="${currentAppDetails.urlToPackage}">Завантажити</a>
        </div>
        <div id="description">${currentAppDetails.description}</div>
        <div id="photos"></div>
      `;
      const photos = downloadAppContainer.querySelector("#photos");
      if(Array.isArray(currentAppDetails.descriptionContent)) for(let url of currentAppDetails.descriptionContent){
        const image = document.createElement("img");
        image.src = url;
        photos.appendChild(image);
      }
      else photos.remove();
      document.getElementsByTagName("title")[0].textContent += ": " + currentAppDetails.name;
    });
    return;
  }
  downloadAppContainer.remove();
  getTextFromUrl(urlToJSONFile).then((text) => {
    const json = JSON.parse(text);
    appList.innerHTML = "";
    for(let index in json){
      const appDetails = json[index];
      const element = document.createElement("div");
      element.classList.add("application_block-lnk");
      element.urlToAppPage = `/applications/index.html?app=${index}`;
      element.indexOfApp = index;
      element.innerHTML = `<h3 id="name">${appDetails.name}</h3>`;
      element.style.backgroundImage = `url(${appDetails.favicon})`;
      element.onclick = function(e){
        window.location.href = element.urlToAppPage;
      }
      appList.appendChild(element);
    }
  });
});