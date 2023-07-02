let sourceImagesArray = [
  "./textures/1.png",
  "./textures/2.png"
  ];
for(let imageSourceIndex = 0; imageSourceIndex < sourceImagesArray.length; imageSourceIndex++){
  let image = new Image();
  image.src = sourceImagesArray[imageSourceIndex];
  image.onload = () => {
    textures.push(image);
  };
}