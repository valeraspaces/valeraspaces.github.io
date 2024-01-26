let canvasHeader, mainContent1;
let rayAngle = 0;
function headerAnimation(){
  window.requestAnimationFrame(headerAnimation);
  canvasHeader.width = window.innerWidth;
  canvasHeader.height = window.innerHeight;
  mainContent1.style.marginTop = (canvasHeader.offsetHeight + 2) + "px";
  
  if(canvasHeader.offsetHeight < window.scrollY) return;
  const rayLenght = Math.max(canvasHeader.width, canvasHeader.height) / Math.max(1, window.scrollY / ((window.innerHeight + 1) / 4));
  const rayAngleRotateSteep = Math.max(Math.PI / rayLenght, 0.004);
  contextCNVHeader.beginPath();
  contextCNVHeader.lineWidth = 1;
  for(let rayDrawAngle = rayAngle; rayDrawAngle < rayAngle + Math.PI * 2; rayDrawAngle += rayAngleRotateSteep * 0.9){
    const trigo = (rayDrawAngle - rayAngle) + performance.now() / 10000;
    const red = (Math.sin(trigo) + 0.5) * 255;
    const green = (Math.cos(trigo) + 0.5) * 255;
    const blue = 255 - (red + green);
    const lengthToCollide = rayLenght * (Math.cos(rayDrawAngle + (performance.now() / 10000)) * Math.sin(rayDrawAngle - (performance.now() / 10000)));
    contextCNVHeader.strokeStyle = `rgb(${red}, ${green}, ${blue})`;
    contextCNVHeader.moveTo(canvasHeader.width / 2, canvasHeader.height / 2);
    contextCNVHeader.lineTo(Math.cos(rayDrawAngle) * lengthToCollide + (canvasHeader.width / 2), -Math.sin(rayDrawAngle) * lengthToCollide + (canvasHeader.height / 2));
  }
  contextCNVHeader.stroke();
  rayAngle += rayAngleRotateSteep;
}
window.addEventListener("DOMContentLoaded", () => {
  canvasHeader = document.getElementById("header_animation");
  window.addEventListener("scroll", () => {
    canvasHeader.style.transform = `translateY(${window.scrollY}px)`;
  });
  contextCNVHeader = canvasHeader.getContext("2d");
  mainContent1 = document.getElementsByTagName("main")[0];
  
  headerAnimation();
});