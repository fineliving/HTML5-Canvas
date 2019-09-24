var image = new Image(),
   canvas = document.getElementById('canvas'),
   context = canvas.getContext('2d'),
   sunglassButton = document.getElementById('sunglassButton'),
   sunglassesOn = false,
   sunglassFilter = new Worker('sunglassFilter.js');

function putSunglassesOn() {
   sunglassFilter.postMessage(
      context.getImageData(0, 0, canvas.width, canvas.height));

   sunglassFilter.onmessage = function (event) {
      context.putImageData(event.data, 0, 0);
   };
}

function drawOriginalImage() {
   context.drawImage(image, 0, 0,
      image.width, image.height, 0, 0,
      canvas.width, canvas.height);
}

sunglassButton.onclick = function () {
   if (sunglassesOn) {
      sunglassButton.value = 'Sunglasses';
      drawOriginalImage();
      sunglassesOn = false;
   } else {
      sunglassButton.value = 'Original picture';
      putSunglassesOn();
      sunglassesOn = true;
   }
};

image.src = '../../shared/images/curved-road.png';
image.onload = function () {
   drawOriginalImage();
};