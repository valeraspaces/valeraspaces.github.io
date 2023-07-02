let getMapIndex = (map, indexX, indexY) => {
  let yMap = map[Math.floor(indexY)];
  let xMap;
  if(yMap !== undefined && yMap !== null) xMap = yMap[Math.floor(indexX)];
  else return yMap;
  return xMap;
};

class GameObject{
  position = {
    x: 0,
    y: 0,
    z: 0
  };
  rotation = {
    x: 0,
    y: 0,
    z: 0
  };
  translate(xSteep, ySteep, zSteep){
    this.position.x += (zSteep * Math.cos(this.rotation.y)) + (xSteep * Math.cos(this.rotation.y + (Math.PI / 2)));
    this.position.z += (zSteep * Math.sin(this.rotation.y)) + (xSteep * Math.cos(this.rotation.y));
    this.position.y += (ySteep * Math.cos(this.rotation.x));
  }
}

player = {
  gameObject: new GameObject()
};
player.gameObject.position.x = 4;
player.gameObject.position.z = 4;
player.gameObject.rotation.y = 0;
let playerSteep = {
  vertical: 0,
  horizontal: 0,
  rotate: 0
};

let playerMoving = function(speed, rotateSpeed){
  //Рух
  ui.button.moveTop.onclick = () => {
    playerSteep.vertical = speed;
    playerSteep.horizontal = 0;
  };
  ui.button.moveBack.onclick = () => {
    playerSteep.vertical = -speed;
    playerSteep.horizontal = 0;
  };
  ui.button.moveStop.onclick = () => {
    playerSteep.vertical = 0;
    playerSteep.horizontal = 0;
  };
  ui.button.moveLeft.onclick = () => {
    playerSteep.horizontal = -speed;
    playerSteep.vertical = 0;
  };
  ui.button.moveRight.onclick = () => {
    playerSteep.horizontal = speed;
    playerSteep.vertical = 0;
  };
  
  //Поворот
  ui.button.rotateLeft.onclick = () => {
    playerSteep.rotate = -rotateSpeed;
  };
  ui.button.rotateRight.onclick = () => {
    playerSteep.rotate = rotateSpeed;
  };
  ui.button.rotateStop.onclick = () => {
    playerSteep.rotate = 0;
  };
}
playerMoving(2, Math.PI / 160);

let update = () => {
  player.gameObject.translate(playerSteep.horizontal * deltaTime, 0, playerSteep.vertical * deltaTime);
  player.gameObject.rotation.y += playerSteep.rotate;
};
