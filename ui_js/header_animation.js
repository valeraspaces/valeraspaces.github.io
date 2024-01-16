let canvasHeader, mainContent1;
class Material{
  constructor(color, textureData){
    this.color = color;
    this.textureData = textureData;
  }
}
class WorldObject{
  transform = [
    [0, 0, 0],
    [0, 0, 0]
  ];
  material = null;
}
const sceneHeaderAnimation = [
  new WorldObject()
];
const headerCamera = {
  position: [1, 1, 0],
  rotation: 0
};
function headerAnimation(){
  window.requestAnimationFrame(headerAnimation);
  canvasHeader.width = window.innerWidth;
  canvasHeader.height = window.innerHeight;
  mainContent1.style.marginTop = canvasHeader.offsetHeight + "px";
  function getDistance2(A, B){
    return Math.sqrt(Math.pow(B[0] - A[0], 2) + Math.pow(B[1] - A[1], 2));
  }
  function getVectorDistance2(A, B){
    return [
      B[0] - A[0],
      B[1] - A[1]
    ];
  }
  for(let object of sceneHeaderAnimation){
    
  }
  contexCNVHeader.clearRect(0, 0, canvasHeader.width, canvasHeader.height);
  
  for(let pixelX = 0; pixelX < canvasHeader.width; pixelX++){
    
  }
}
window.addEventListener("DOMContentLoaded", () => {
  canvasHeader = document.getElementById("header_animation");
  contexCNVHeader = canvasHeader.getContext("2d");
  mainContent1 = document.getElementsByTagName("main")[0];
  headerAnimation();
});