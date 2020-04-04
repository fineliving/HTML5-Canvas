var canvas = document.getElementById('canvas'),
   offscreenCanvas = document.createElement('canvas'),
   offscreenContext = offscreenCanvas.getContext('2d'),
   context = canvas.getContext('2d'),
   video = document.getElementById('video'),
   controlButton = document.getElementById('controlButton'),
   flipCheckbox = document.getElementById('flipCheckbox'),
   colorCheckbox = document.getElementById('colorCheckbox'),
   imageData,
   poster = new Image();

// Functions.....................................................

function removeColor() {
   var data,
      width,
      average;

   imageData = offscreenContext.getImageData(0, 0,
      offscreenCanvas.width, offscreenCanvas.height);

   data = imageData.data;
   width = data.width;

   for (i = 0; i < data.length - 4; i += 4) {
      average = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = average;
      data[i + 1] = average;
      data[i + 2] = average;
   }

   offscreenContext.putImageData(imageData, 0, 0);
}

function drawFlipped() {
   context.save();

   context.translate(canvas.width / 2, canvas.height / 2);
   context.rotate(Math.PI);
   context.translate(-canvas.width / 2, -canvas.height / 2);
   context.drawImage(offscreenCanvas, 0, 0);

   context.restore();
}

function nextVideoFrame() {
   if (video.ended) {
      controlButton.value = 'Play';
   } else {
      offscreenContext.drawImage(video, 0, 0);

      if (!colorCheckbox.checked)
         removeColor();

      if (flipCheckbox.checked)
         drawFlipped();
      else
         context.drawImage(offscreenCanvas, 0, 0);

      requestNextAnimationFrame(nextVideoFrame);
   }
}

function startPlaying() {
   requestNextAnimationFrame(nextVideoFrame);
   video.play();
}

function stopPlaying() {
   video.pause();
}

// Event handlers...............................................

controlButton.onclick = function (e) {
   if (controlButton.value === 'Play') {
      startPlaying();
      controlButton.value = 'Pause';
   } else {
      stopPlaying();
      controlButton.value = 'Play';
   }
}

poster.onload = function () {
   context.drawImage(poster, 0, 0);
};

// Initialization................................................

poster.src = '../../shared/images/smurfposter.png';

offscreenCanvas.width = canvas.width;
offscreenCanvas.height = canvas.height;

alert('This example plays a video, but due to copyright restrictions and size limitations, the video is not included in the code for this example. To make this example work, download a video, and replace the two source elements in example.html to refer to your video.');