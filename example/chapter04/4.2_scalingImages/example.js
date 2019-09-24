var canvas = document.getElementById('canvas'),
   context = canvas.getContext('2d'),
   image = new Image(),
   scaleCheckbox = document.getElementById('scaleCheckbox');

// Functions.....................................................

function drawImage() {
   context.clearRect(0, 0, canvas.width, canvas.height);

   if (scaleCheckbox.checked) {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
   } else {
      context.drawImage(image, 0, 0);
   }
   context.restore();
}

// Event Handlers................................................

scaleCheckbox.onchange = function (e) {
   drawImage();
}

// Initialization................................................

image.src = '../../shared/images/waterfall.png';
image.onload = function (e) {
   drawImage();
};