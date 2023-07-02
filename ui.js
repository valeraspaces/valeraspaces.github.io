function fpsIndicatorAnimation(){
  fpsIndicatorDOM.innerText = "FPS: " + Math.round(fps);
  let middleFPS = 30;
  let red = 255 * middleFPS / fps;
  let green = 255 * fps / middleFPS;
  fpsIndicatorDOM.style.color = "rgb(" + red + "," + green + ", 0)";
}
let fpsIndicatorAnimationTimeOut = 0.5;
let fpsIndicatorAnimationTimeIteration = 0;
let animationUpdate = () => {
  if(fpsIndicatorAnimationTimeIteration >= fpsIndicatorAnimationTimeOut){
    fpsIndicatorAnimation();
    fpsIndicatorAnimationTimeIteration = 0;
  }
  fpsIndicatorAnimationTimeIteration += deltaTime;
  window.requestAnimationFrame(animationUpdate);
};

animationUpdate();