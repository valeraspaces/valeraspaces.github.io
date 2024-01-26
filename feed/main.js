let publicationsContent;
document.addEventListener("DOMContentLoaded", () => {
  const urlToJSON = "/data/content_list.json";
  publicationsContent = document.getElementById("content");
  getTextFromUrl(urlToJSON).then(text => {
    const json = JSON.parse(text);
    for(let postInfo of json){
      const postCard = document.createElement("div");
      postCard.classList.add("post-card");
      postCard.innerHTML = `
        <div id="post-title">${postInfo.title} • ${postInfo.place}</div>
        <h3 id="post-header">${postInfo.header}</h3>
        <div id="post-multimedia">
        </div>
        <div id="description">${postInfo.description}</div>
      `;
      const images = postCard.querySelector("#post-multimedia");
      if(!Array.isArray(postInfo.urlToMedia)) images.remove();
      else{
        for(let url of postInfo.urlToMedia){
          const videoElement = document.createElement("video");
          videoElement.addEventListener("click", (e) => {
            if(e.currentTarget.paused) e.currentTarget.play();
            else e.currentTarget.pause();
          });
          const sourceElement = document.createElement("source");
          videoElement.appendChild(sourceElement);
          images.appendChild(videoElement);
        }
      }
      publicationsContent.appendChild(postCard);
    }
  });
});