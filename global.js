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
    rotateBottom: idGet("rotate_bottom-btn"),
    rotateTop: idGet("rotate_top-btn"),
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

var arifmeticAverage = function(array){
  let sum = 0;
  for(let index = 0; index < array.length; index++){
    sum += array[index] / array.length;
  }
  return sum;
};

let w = {
  isSprite: false,
  height: 10,
  y: 0,
  color: {
    red: 255,
    green: 255,
    blue: 0,
    alpha: 1,
    light: 3
  }
};
let k = {
  isSprite: false,
  height: 5,
  y: 20,
  color: {
    red: 255,
    green: 255,
    blue: 0,
    alpha: 1,
    light: 3
  }
};
let b = {
  isSprite: false,
  height: 5,
  y: -5,
  color: {
    red: 255,
    green: 255,
    blue: 255,
    alpha: 1,
    light: 3
  },
  texture: null
};
let y = {
  isSprite: false,
  height: 5,
  y: 5,
  color: {
    red: 255,
    green: 255,
    blue: 255,
    alpha: 1,
    light: 3
  },
  texture: null
};
let s = {
  isSprite: true,
  height: 7.5,
  y: -2.5,
  color: {
    //red: 255,
    //green: 255,
    //blue: 255,
    //alpha: 1,
    light: 3
  },
  texture: null
};

let j = {
  isSprite: true,
  height: 5,
  y: -5,
  color: {
    red: 255,
    green: 255,
    blue: 255,
    alpha: 1,
    light: 3
  },
  texture: null
};

var map = [
[w,w,w,w,w,w,w,w,w,w,w,w,w,w,w,w,w,w,w,w,w],
[w,0,0,0,0,b,b,b,b,b,0,w,0,0,[w, k],0,0,0,0,0,w],
[w,0,0,0,0,0,0,0,0,0,0,w,0,0,0,0,0,0,0,0,w],
[w,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,w],
[w,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,w],
[w,0,0,w,w,w,w,w,w,0,0,w,w,w,w,w,w,0,0,0,w],
[w,0,0,0,0,0,0,w,0,0,0,0,w,0,0,0,w,0,0,0,w],
[w,0,0,0,0,0,0,w,0,s,s,0,w,0,0,0,0,0,0,0,w],
[w,0,0,0,0,0,0,w,0,0,0,0,w,0,0,0,0,0,0,0,w],
[w,0,0,0,0,0,0,w,0,0,0,0,w,0,0,0,w,0,0,0,w],
[w,0,0,w,w,w,w,w,w,0,0,w,w,w,[w, y],w,w,0,0,0,w],
[w,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,w],
[w,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,w],
[w,w,w,w,w,w,w,w,w,w,w,w,w,w,w,w,w,w,w,w,w]
];

deltaTimeUpdate(performance.now());

var textures = {};
