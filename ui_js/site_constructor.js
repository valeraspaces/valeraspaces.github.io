let metaViewPort;
const getTextFromUrl = url => {
  return fetch(url).then(response => response.text());
}
window.addEventListener("DOMContentLoaded", () => {
  metaViewPort = metaViewPort = document.getElementById("viewport-metatag");
  const onWindowResize = () => {
    if(window.innerWidth / window.innerHeight >= 1){
      metaViewPort.content = "";
      return;
    }
    metaViewPort.content = "width=device-width, initial-scale=1.0, user-scalable=no";
  };
  onWindowResize();
  window.addEventListener("resize", onWindowResize);
});