var canvasGXDOM = document.getElementById("output-gx");
var gxContext = canvasGXDOM.getContext("2d");

let idGet = function(id){
  return document.getElementById(id);
};
let fpsIndicatorDOM = idGet("fps_indicator");

var ui = {
  button:{
    moveTop: idGet("move_top-btn"),
    moveLeft: idGet("move_left-btn"),
    moveRight: idGet("move_right-btn"),
    moveBack: idGet("move_back-btn"),
    moveStop: idGet("move_stop-btn"),
    rotateLeft: idGet("rotate_left-btn"),
    rotateRight: idGet("rotate_right-btn"),
    rotateStop: idGet("rotate_stop-btn")
  }
};

var deltaTime = 0;
var fps = 0;
let lastClock = performance.now();
let deltaTimeUpdate = function(currentClock){
  deltaTime = (currentClock - lastClock) / 1000;
  fps = 1 / deltaTime;
  lastClock = currentClock;
  window.requestAnimationFrame(deltaTimeUpdate);
};

var map = [
[1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1],
[1,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,2,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1],
[1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

deltaTimeUpdate(performance.now());

var textures = [];