let contentImages;

window.addEventListener("DOMContentLoaded", () => {
  contentImages = document.getElementById("content");
  const urlToJSONFile = "/data/gallery_list.json";
  getTextFromUrl(urlToJSONFile).then(text => {
    const json = JSON.parse(text);
    for(let imagePropData of json){
      const linkElement = document.createElement("a");
      linkElement.target = "_blank";
      linkElement.setAttribute("target", "_blank");
      linkElement.href = imagePropData.urlToMedia;
      linkElement.style.backgroundImage = `url(${linkElement.href})`;
      contentImages.appendChild(linkElement);
    }
  });
});