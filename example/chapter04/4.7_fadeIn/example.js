var image = new Image(),
   canvas = document.getElementById('canvas'),
   context = canvas.getContext('2d'),
   offscreenCanvas = document.createElement('canvas'),
   offscreenContext = offscreenCanvas.getContext('2d'),
   fadeButton = document.getElementById('fadeButton'),
   imagedata,
   imagedataOffscreen,
   interval = null;

// Functions.....................................................

function increaseTransparency(imagedata, steps) {
   var alpha,
      currentAlpha,
      step,
      length = imagedata.data.length;

   for (var i = 3; i < length; i += 4) { // For every alpha component
      alpha = imagedataOffscreen.data[i];

      if (alpha > 0) {
         currentAlpha = imagedata.data[i];
         step = Math.ceil(alpha / steps);

         if (currentAlpha + step <= alpha) { // Not at original alpha setting yet
            imagedata.data[i] += step; // increase transparency
         } else {
            imagedata.data[i] = alpha; // end: original transparency
         }
      }
   }
}

function fadeIn(context, imagedata, steps, millisecondsPerStep) {
   var frame = 0;

   for (var i = 3; i < imagedata.data.length; i += 4) { // For every alpha component
      imagedata.data[i] = 0;
   }

   interval = setInterval(function () { // Every millisecondsPerStep
      frame++;

      if (frame > steps) {
         clearInterval(interval);
         //animationComplete();
      } else {
         increaseTransparency(imagedata, steps);
         context.putImageData(imagedata, 0, 0);
      }
   }, millisecondsPerStep);

};

// Animation.....................................................

function animationComplete() {
   setTimeout(function () {
      context.clearRect(0, 0, canvas.width, canvas.height);
   }, 1000);
}

fadeButton.onclick = function () {
   imagedataOffscreen = offscreenContext.getImageData(0, 0,
      canvas.width, canvas.height);

   fadeIn(context,
      offscreenContext.getImageData(0, 0,
         canvas.width, canvas.height),
      50,
      1000 / 60);
};

// Initialization................................................

image.src = '../../shared/images/log-crossing.png';
image.onload = function () {
   offscreenCanvas.width = canvas.width;
   offscreenCanvas.height = canvas.height;
   offscreenContext.drawImage(image, 0, 0);
};