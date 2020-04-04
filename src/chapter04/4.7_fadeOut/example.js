var image = new Image(),
   canvas = document.getElementById('canvas'),
   context = canvas.getContext('2d'),
   fadeButton = document.getElementById('fadeButton'),
   originalImageData = null,
   interval = null;

// Functions.....................................................

function increaseTransparency(imagedata, steps) {
   var alpha, currentAlpha, step, length = imagedata.data.length;

   for (var i = 3; i < length; i += 4) { // For every alpha component
      alpha = originalImageData.data[i];

      if (alpha > 0 && imagedata.data[i] > 0) { // not totally transparent yet
         currentAlpha = imagedata.data[i];
         step = Math.ceil(alpha / steps);

         if (currentAlpha - step > 0) { // not too close to the end
            imagedata.data[i] -= step; // increase transparency
         } else {
            imagedata.data[i] = 0; // end: totally transparent
         }
      }
   }
}

function fadeOut(context, imagedata, x, y,
   steps, millisecondsPerStep) {
   var frame = 0,
      length = imagedata.data.length;

   interval = setInterval(function () { // Once every millisecondsPerStep ms
      frame++;

      if (frame > steps) { // animation is over
         clearInterval(interval); // end animation
         animationComplete(); // put picture back in 1s
      } else {
         increaseTransparency(imagedata, steps);
         context.putImageData(imagedata, x, y);
      }
   }, millisecondsPerStep);
};

// Animation.....................................................

function animationComplete() {
   setTimeout(function () {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
   }, 1000);
}

// Initialization................................................

fadeButton.onclick = function () {
   fadeOut(context,
      context.getImageData(0, 0, canvas.width, canvas.height),
      0, 0, 20, 1000 / 60);
};

image.src = '../../shared/images/log-crossing.png';
image.onload = function () {
   context.drawImage(image, 0, 0, canvas.width, canvas.height);
   originalImageData = context.getImageData(0, 0, canvas.width, canvas.height);
};