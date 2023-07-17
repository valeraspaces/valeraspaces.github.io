function renderer(position, rotation, map, context, canvas, fieldOfView, textures, sprites){
  let halfFieldOfView = fieldOfView / 2;
  let raysNum = canvas.width;
  let rayAngleSteep = fieldOfView / raysNum;
  let raySteep = 0.05;
  let distanceToCamera = 0.25;
  let maxDistance = 30;
  let iteration = 0;
  let objectsForRendering = [];
  
  let newIndexObject = (indexX, indexY) => {
    let indexInMapY = map[Math.floor(indexY)];
    let indexInMapX;
    if(indexInMapY !== undefined && indexInMapY !== null) indexInMapX = indexInMapY[Math.floor(indexX)];
    else indexInMapX = indexInMapY;
    return indexInMapX;
  };
  
  let drawing = (index, distance, iteration, angle, positionObject, fieldOfView) => {
    let height = 0;
    let color = "white";
    let heightOnScreen;
    let drawingPoints;
    let positionY = 0;
    let positionYOnScreen;
    let correction = 1 / Math.cos((angle - rotation.y) / 1.5);
    let light = 1;
    let colorIntensive = 1;
    let isSprite = false;
    let texture;
    let voidSpace = 0;
    let rotationXHorisont = Math.sin(rotation.x / 8) * canvas.height * 8;
    let crash = (distance === 0) || (index === undefined) || (index === undefined || index === null || index === voidSpace);
   
    if(crash) return;
    //Передача налаштувань
    positionY = index.y;
    isSprite = index.isSprite;
    height = index.height;
    texture = index.texture;
    light = index.color.light;
    let getColor = index.color;
    colorIntensive = light / distance;
    color = "rgba(" + (getColor.red * colorIntensive) + "," + (getColor.green * colorIntensive) + "," + (getColor.blue * colorIntensive) + "," + getColor.alpha + ")";
    let functionPreDraw = index.preDraw;
    if(functionPreDraw !== undefined && functionPreDraw !== null) functionPreDraw();
    //console.log("object: " + index + ", y: " + positionY + ", sprite type?: " + isSprite + ", height: " + height + ", texture: " + texture + ", light: " + light +", color: " + color + ", distance: " + distance);
    //Відображення
    let projectionToScreen = (distanceToCamera / distance) * canvas.height * correction ;
    heightOnScreen = height * projectionToScreen;
    positionYOnScreen = (positionY - position.y) * projectionToScreen;
    let topPoint = (((canvas.height - heightOnScreen) - positionYOnScreen) / 2) + rotationXHorisont;
    let bottomPoint = ((((canvas.height - heightOnScreen) - positionYOnScreen) / 2) + heightOnScreen) + rotationXHorisont;
    
    let textureExist = texture !== undefined && texture !== null;
    if(isSprite){
      if(!textureExist) return;
      let aspectRatio = texture.naturalWidth / texture.naturalHeight;
      let widthImage = heightOnScreen * aspectRatio;
      let centered = iteration - widthImage;
      context.drawImage(texture, centered, topPoint, widthImage, heightOnScreen);
      return;
    }
    if(!textureExist){
      context.beginPath();
      context.lineWidth = 2;
      context.moveTo(iteration, topPoint);
      context.strokeStyle = color;
      context.lineTo(iteration, bottomPoint);
      context.stroke();
      return;
    }
    else{
      let textureImageColumnSteep = 1;
      if(Math.abs(positionObject.x - Math.round(positionObject.x)) >= Math.abs(positionObject.z - Math.round(positionObject.z))) positionObjectCoordinate = positionObject.x;
      else positionObjectCoordinate = positionObject.z;
      let textureImageColumn = (positionObjectCoordinate - Math.floor(positionObjectCoordinate)) * texture.naturalWidth;
      if(textureImageColumn < 0) textureImageColumn = 1;
      else if(textureImageColumn >= texture.naturalWidth) textureImageColumn = texture.naturalWidth;
      context.drawImage(texture, textureImageColumn, 1, textureImageColumnSteep, texture.naturalHeight, iteration, topPoint, 1, heightOnScreen);
      return;
    }
  };
  
  for(let angle = rotation.y - halfFieldOfView; angle <= rotation.y + halfFieldOfView; angle += rayAngleSteep){
    let rayPosition = {
      x: position.x,
      z: position.z
    };
    let index = newIndexObject(rayPosition.x, rayPosition.z);
    let usedDistance = 0;
    let indexBuffer = 0;
    let getSpriteDrawed = (objectIndex) => {
      for(let drawedIndex = 0; drawedIndex < drawedSprites.length; drawedIndex++){
        if(drawedSprites[drawedIndex] === objectIndex) return true;
      }
      return false;
    };
    let distance;
    while(usedDistance < maxDistance){
      rayPosition.x += Math.cos(angle) * raySteep;
      rayPosition.z += Math.sin(angle) * raySteep;
      
      if(rayPosition.x < 0 || rayPosition.x >= map[0].length || rayPosition.z < 0 || rayPosition.z >= map.length) break;
      
      index = newIndexObject(rayPosition.x, rayPosition.z);
      if(index != indexBuffer){
        distance = Math.sqrt(Math.pow(position.x - rayPosition.x, 2) + Math.pow(position.z - rayPosition.z, 2));
        objectsForRendering.push([index, rayPosition.x, rayPosition.z, distance, iteration, angle]);
      }
      indexBuffer = index;
      usedDistance += raySteep;
    }
    
    iteration++;
  }
  objectsForRendering.sort((objectA, objectB) => {
    return objectB[3] - objectA[3];
  });
  
  context.clearRect(0, 0, canvas.width - 1, canvas.height - 1);
  for(let objectRaysIndex = 0; objectRaysIndex < objectsForRendering.length; objectRaysIndex++){
    let object = objectsForRendering[objectRaysIndex];
    let distance = object[3];
    let index = object[0];
    let rayNumber = object[4];
    let angle = object[5];
    let positionObject = {
      x: object[1],
      z: object[2]
    };
    
    if(object[0][0] !== undefined){
      for(let innerObjectIndex = 0; innerObjectIndex < object[0].length; innerObjectIndex++){
        drawing(index[innerObjectIndex], distance, rayNumber, angle, positionObject, fieldOfView);
      }
    }
    else drawing(index, distance, rayNumber, angle, positionObject, fieldOfView);
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
    x: player.gameObject.rotation.x
  }
  
  update();
  renderer(position, rotation, map, gxContext, canvasGXDOM, fieldOfView, textures);
  
  window.requestAnimationFrame(UpdateFunc);
};

UpdateFunc();
