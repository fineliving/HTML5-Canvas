var canvas = document.getElementById('canvas'),
  context = canvas.getContext('2d'),
  text = 'Centered',
  textMetrics,
  SQUARE_WIDTH = 20,
  FONT_HEIGHT = 128;

function drawGrid(color, stepx, stepy) {
  context.save()

  context.strokeStyle = color;
  context.fillStyle = '#ffffff';
  context.lineWidth = 0.5;
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);

  for (var i = stepx + 0.5; i < context.canvas.width; i += stepx) {
    context.beginPath();
    context.moveTo(i, 0);
    context.lineTo(i, context.canvas.height);
    context.stroke();
  }

  for (var i = stepy + 0.5; i < context.canvas.height; i += stepy) {
    context.beginPath();
    context.moveTo(0, i);
    context.lineTo(context.canvas.width, i);
    context.stroke();
  }

  context.restore();
};

function drawText() {
  context.fillStyle = 'orange';
  context.strokeStyle = 'cornflowerblue';

  context.fillText(text, canvas.width / 2,
    canvas.height / 2);

  context.strokeText(text, canvas.width / 2,
    canvas.height / 2);
};

function drawCenterSquare() {
  context.fillStyle = 'rgba(255, 0, 0, 0.4)';
  context.strokeStyle = 'black';
  context.fillRect(canvas.width / 2 - SQUARE_WIDTH / 2,
    canvas.height / 2 - SQUARE_WIDTH / 2, 20, 20);

  context.strokeRect(canvas.width / 2 - SQUARE_WIDTH / 2,
    canvas.height / 2 - SQUARE_WIDTH / 2, 20, 20);
};

context.font = '128px Helvetica';
context.textBaseline = 'middle';
context.textAlign = 'center';
textMetrics = context.measureText(text);

drawGrid('lightgray', 10, 10);
drawText();
drawCenterSquare();