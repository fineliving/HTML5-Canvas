var canvas = document.getElementById('canvas'),
   context = canvas.getContext('2d'),

   resetButton = document.getElementById('resetButton'),

   image = new Image(),
   imageData,

   mousedown = {},
   rubberbandRectangle = {},
   dragging = false;

// Functions.....................................................

function windowToCanvas(canvas, x, y) {
   var canvasRectangle = canvas.getBoundingClientRect();

   return {
      x: x - canvasRectangle.left,
      y: y - canvasRectangle.top
   };
}

function captureRubberbandPixels() {
   imageData = context.getImageData(rubberbandRectangle.left,
      rubberbandRectangle.top,
      rubberbandRectangle.width,
      rubberbandRectangle.height);
}

function restoreRubberbandPixels() {
   var deviceWidthOverCSSPixels = imageData.width / rubberbandRectangle.width,
      deviceHeightOverCSSPixels = imageData.height / rubberbandRectangle.height;

   context.putImageData(imageData,
      rubberbandRectangle.left * deviceWidthOverCSSPixels,
      rubberbandRectangle.top * deviceHeightOverCSSPixels);
}

function drawRubberband() {
   context.strokeRect(rubberbandRectangle.left + context.lineWidth,
      rubberbandRectangle.top + context.lineWidth,
      rubberbandRectangle.width - 2 * context.lineWidth,
      rubberbandRectangle.height - 2 * context.lineWidth);
}

function setRubberbandRectangle(x, y) {
   rubberbandRectangle.left = Math.min(x, mousedown.x);
   rubberbandRectangle.top = Math.min(y, mousedown.y);
   rubberbandRectangle.width = Math.abs(x - mousedown.x),
      rubberbandRectangle.height = Math.abs(y - mousedown.y);
}

function updateRubberband() {
   captureRubberbandPixels();
   drawRubberband();
}

function rubberbandStart(x, y) {
   mousedown.x = x;
   mousedown.y = y;

   rubberbandRectangle.left = mousedown.x;
   rubberbandRectangle.top = mousedown.y;

   dragging = true;
}

function rubberbandStretch(x, y) {
   if (rubberbandRectangle.width > 2 * context.lineWidth &&
      rubberbandRectangle.height > 2 * context.lineWidth) {
      if (imageData !== undefined) {
         restoreRubberbandPixels();
      }
   }

   setRubberbandRectangle(x, y);

   if (rubberbandRectangle.width > 2 * context.lineWidth &&
      rubberbandRectangle.height > 2 * context.lineWidth) {

      updateRubberband();
   }
};

function rubberbandEnd() {
   // Draw and scale image to the on screen canvas. 
   context.drawImage(canvas,
      rubberbandRectangle.left + context.lineWidth * 2,
      rubberbandRectangle.top + context.lineWidth * 2,
      rubberbandRectangle.width - 4 * context.lineWidth,
      rubberbandRectangle.height - 4 * context.lineWidth,
      0, 0, canvas.width, canvas.height);
   dragging = false;
   imageData = undefined;
}

// Event handlers...............................................

canvas.onmousedown = function (e) {
   var loc = windowToCanvas(canvas, e.clientX, e.clientY);
   e.preventDefault();
   rubberbandStart(loc.x, loc.y);
};

canvas.onmousemove = function (e) {
   var loc;

   if (dragging) {
      loc = windowToCanvas(canvas, e.clientX, e.clientY);
      rubberbandStretch(loc.x, loc.y);
   }
}

canvas.onmouseup = function (e) {
   rubberbandEnd();
};

// Initialization..............................................

image.src = '../../shared/images/arch.png';
image.onload = function () {
   context.drawImage(image, 0, 0, canvas.width, canvas.height);
};

resetButton.onclick = function (e) {
   context.clearRect(0, 0,
      canvas.width, canvas.height);

   context.drawImage(image, 0, 0, canvas.width, canvas.height);
};

context.strokeStyle = 'yellow';
context.lineWidth = 2.0;