function getImageFromFile(source, timeOut = 5){
  let imageObject = new Image();
  imageObject.src = source;
  let imageLoaded = false;
  let timeLoading = 0;
  imageObject.onload = () => {
    imageLoaded = true;
  };
  imageObject.onerror = () => {
    console.log("Image loading error. Loading processed " + timeLoading + "s.");
    return;
  };
  while(!imageObject){
    timeLoading += deltaTime;
    if(timeLoading >= timeOut){
      imageObject.onerror();
    }
  }
  return imageObject;
};

textures.kostyaSprite = getImageFromFile("./textures/1.png");
textures.logo = getImageFromFile("./textures/logo.jpg");
textures.wall = getImageFromFile("./textures/wall.jpg");
textures.YanaPhoto = getImageFromFile("./textures/Yana.jpg");

s.texture = textures.kostyaSprite;
w.texture = textures.wall;
k.texture = textures.logo;
y.texture = textures.YanaPhoto;
y.texture = textures.YanaPhoto;