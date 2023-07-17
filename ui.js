function fpsIndicatorAnimation(framesPerSeconds){
  fpsIndicatorDOM.innerText = "FPS: " + Math.round(framesPerSeconds);
  let middleFPS = 30;
  let red = 255 * middleFPS / framesPerSeconds;
  let green = 255 * framesPerSeconds / middleFPS;
  fpsIndicatorDOM.style.color = "rgb(" + red + "," + green + ", 0)";
}
let fpsIndicatorAnimationTimeOut = 0.1;
let fpsIndicatorAnimationTimeIteration = 0;
let fpsFramesArray = [];
let animationUpdate = () => {
  if(fpsIndicatorAnimationTimeIteration >= fpsIndicatorAnimationTimeOut){
    fpsIndicatorAnimation(arifmeticAverage(fpsFramesArray));
    fpsIndicatorAnimationTimeIteration = 0;
    fpsFramesArray = [];
  }
  fpsIndicatorAnimationTimeIteration += deltaTime;
  fpsFramesArray.push(fps);
  window.requestAnimationFrame(animationUpdate);
};

animationUpdate();