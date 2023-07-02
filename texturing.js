let sourceImagesArray = [
  "./1.png",
  "./2.png"
  ];
for(let imageSourceIndex = 0; imageSourceIndex < sourceImagesArray.length; imageSourceIndex++){
  let image = new Image();
  image.src = sourceImagesArray[imageSourceIndex];
  image.onload = () => {
    textures.push(image);
  };
}
