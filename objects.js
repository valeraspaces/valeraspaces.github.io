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
  };
  collideFromSolid(){
    let indexOfOveride = [getMapIndex(map, this.position.x, this.position.z)];
    if(indexOfOveride[0].length !== undefined){
      let indexOfOverideMainObject = indexOfOveride[0];
      indexOfOveride = [];
      for(let index = 0; index < indexOfOverideMainObject.length; index ++){
        indexOfOveride.push(indexOfOverideMainObject[index]);
      }
    }
    for(let index = 0; index < indexOfOveride.length; index++){
      let objectOverided = indexOfOveride[index];
      if(objectOverided == 0) return;
      this.position.x += Math.floor(this.position.x) - this.position.x;
      this.position.z += Math.floor(this.position.z) - this.position.z;
      if(this.position.z >= map.length) this.position.z = map.length - 3;
      if(this.position.z <= 0) this.position.z = 1;
      if(this.position.x >= map[0].length) this.position.x = map[0].length - 3;
      if(this.position.x <= 0) this.position.x = 1;
    }
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
  rotate: {
    horizontal: 0,
    vertical: 0
  }
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
    playerSteep.rotate.horizontal = -rotateSpeed;
    playerSteep.rotate.vertical = 0;
  };
  ui.button.rotateRight.onclick = () => {
    playerSteep.rotate.horizontal = rotateSpeed;
    playerSteep.rotate.vertical = 0;
  };
  ui.button.rotateTop.onclick = () => {
    playerSteep.rotate.vertical = rotateSpeed;
    playerSteep.rotate.horizontal = 0;
  };
  ui.button.rotateBottom.onclick = () => {
    playerSteep.rotate.vertical = -rotateSpeed;
    playerSteep.rotate.horizontal = 0;
  };
  ui.button.rotateStop.onclick = () => {
    playerSteep.rotate.vertical = 0;
    playerSteep.rotate.horizontal = 0;
  };
}
playerMoving(2, Math.PI / 160);

let update = () => {
  player.gameObject.translate(playerSteep.horizontal * deltaTime, 0, playerSteep.vertical * deltaTime);
  //player.gameObject.position.y += deltaTime;
  player.gameObject.rotation.y += playerSteep.rotate.horizontal;
  player.gameObject.rotation.x += playerSteep.rotate.vertical;
  player.gameObject.collideFromSolid();
};
