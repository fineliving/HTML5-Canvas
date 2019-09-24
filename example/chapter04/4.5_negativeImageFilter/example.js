var image = new Image(),
   canvas = document.getElementById('canvas'),
   context = canvas.getContext('2d'),
   negativeButton = document.getElementById('negativeButton');

negativeButton.onclick = function () {
   var imagedata = context.getImageData(0, 0, canvas.width, canvas.height),
      data = imagedata.data;

   for (i = 0; i <= data.length - 4; i += 4) {
      data[i] = 255 - data[i]
      data[i + 1] = 255 - data[i + 1];
      data[i + 2] = 255 - data[i + 2];
   }
   context.putImageData(imagedata, 0, 0);
};

image.src = '../../shared/images/curved-road.png';
image.onload = function () {
   context.drawImage(image, 0, 0,
      image.width, image.height, 0, 0,
      context.canvas.width, context.canvas.height);
};