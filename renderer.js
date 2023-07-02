function renderer(position, rotation, map, context, canvas, fieldOfView, textures){
  let halfFieldOfView = fieldOfView / 2;
  let raysNum = canvas.width;
  let rayAngleSteep = fieldOfView / raysNum;
  let raySteep = 0.05;
  let distanceToCamera = 0.25;
  let maxDistance = 30;
  let iteration = 0;
  let drawedSprites = [];
  
  let newIndexObject = (indexX, indexY) => {
    let indexInMapY = map[Math.floor(indexY)];
    let indexInMapX;
    if(indexInMapY !== undefined && indexInMapY !== null) indexInMapX = indexInMapY[Math.floor(indexX)];
    else indexInMapX = indexInMapY;
    return indexInMapX;
  };
  
  let drawing = (index, distance, iteration, angle) => {
    let height;
    let color = "white";
    let heightOnScreen;
    let drawingPoints;
    let positionY = 0;
    let positionYOnScreen;
    let correction = 1 / Math.cos((angle - rotation.y) / 2);
    let light = 1;
    let colorIntensive = 1;
    let isSprite = false;
    let texture;
   
    if(distance === 0) return;
    if(index === undefined) return;
    
    if(index == 0) return;
    if(index == 1){
      light = 5;
      colorIntensive = 255 * light / distance;
      height = 10;
      color = "rgb(" + 0 + "," + colorIntensive + "," + 0 + ")";
    }
    if(index == 2){
      light = 5;
      colorIntensive = 255 * light / distance;
      height = 5;
      color = "rgb(" + colorIntensive + "," + colorIntensive + "," + colorIntensive + ")";
      positionY = -5;
    }
    if(index == 3){
      positionY = -2.5;
      isSprite = true;
      texture = textures[0];
      height = 5;
    }
    
    let projectionToScreen = (distanceToCamera / distance) * canvas.height * correction;
    heightOnScreen = height * projectionToScreen;
    positionYOnScreen = positionY * projectionToScreen;
    let topPoint = ((canvas.height - heightOnScreen) - positionYOnScreen) / 2;
    
    if(isSprite){
      if(texture !== undefined && texture !== null){
        let aspectRatio = texture.naturalWidth / texture.naturalHeight;
        let widthImage = heightOnScreen * aspectRatio;
        let centered = iteration - widthImage;
        context.drawImage(texture, centered, topPoint, widthImage, heightOnScreen);
      }
      return;
    }
    context.beginPath();
    context.lineWidth = 2;
    let lineTopPoint = ((canvas.height - heightOnScreen) - positionYOnScreen) / 2;
    context.moveTo(iteration, lineTopPoint);
    let lineBottomPoint = (((canvas.height - heightOnScreen) - positionYOnScreen) / 2) + heightOnScreen;
    context.strokeStyle = color;
    context.lineTo(iteration, lineBottomPoint);
    
    context.stroke();
  };
  
  context.clearRect(0, 0, canvas.width - 1, canvas.height - 1);
  
  for(let angle = rotation.y - halfFieldOfView; angle <= rotation.y + halfFieldOfView; angle += rayAngleSteep){
    let rayPosition = {
      x: position.x,
      z: position.z
    };
    let index = newIndexObject(rayPosition.x, rayPosition.z);
    let usedDistance = 0;
    let indexBuffer = 0;
    let objects = [];
    let getSpriteDrawed = (objectIndex) => {
      for(let drawedIndex = 0; drawedIndex < drawedSprites.length; drawedIndex++){
        if(drawedSprites[drawedIndex] === objectIndex) return true;
      }
      return false;
    };
    while(usedDistance < maxDistance){
      rayPosition.x += Math.cos(angle) * raySteep;
      rayPosition.z += Math.sin(angle) * raySteep;
      //if(rayPosition.x < 0 || rayPosition.x >= map[0].length || rayPosition.z < 0 || rayPosition.z >= map.length) break;
      
      index = newIndexObject(rayPosition.x, rayPosition.z);
      if(index != 0 && index != indexBuffer && !getSpriteDrawed(index)){
        if(index == 3){
          drawedSprites.push(index);
        }
        objects.push([index, rayPosition.x, rayPosition.z]);
      }
      if(index == 1) break;
      
      indexBuffer = index;
      usedDistance += raySteep;
    }
    //let distanceToRayEnd = Math.sqrt(Math.pow(position.x - rayPosition.x, 2) + Math.pow(position.z - rayPosition.z, 2));
    
    for(let objectIndex = objects.length - 1; objectIndex >= 0; objectIndex--){
      object = objects[objectIndex];
      let distance = Math.sqrt(Math.pow(position.x - object[1], 2) + Math.pow(position.z - object[2], 2));
      
      drawing(object[0], distance, iteration, angle);
    }
    iteration++;
  }
}

let canvasFitToScreen = function(dom){
  dom.width = window.innerWidth;
  dom.height = window.innerHeight;
};

let UpdateFunc = () => {
  canvasFitToScreen(canvasGXDOM);
  let aspectRatio = canvasGXDOM.width / canvasGXDOM.height;
  let fieldOfView = (Math.PI / 4) * aspectRatio;
  
  let position = {
    x: player.gameObject.position.x,
    y: player.gameObject.position.y,
    z: player.gameObject.position.z
  };
  let rotation = {
    y: player.gameObject.rotation.y,
    x: player.gameObject.rotation.z
  }
  
  update();
  renderer(position, rotation, map, gxContext, canvasGXDOM, fieldOfView, textures);
  
  window.requestAnimationFrame(UpdateFunc);
};

UpdateFunc();
