var context = document.getElementById('canvas').getContext('2d'),
   RADIUS = 75,
   ball = new Sprite('ball', {
      paint: function (sprite, context) {
         context.beginPath();
         context.arc(sprite.left + sprite.width / 2,
            sprite.top + sprite.height / 2,
            RADIUS, 0, Math.PI * 2, false);
         context.clip();

         context.shadowColor = 'rgb(0,0,0)';
         context.shadowOffsetX = -4;
         context.shadowOffsetY = -4;
         context.shadowBlur = 8;

         context.lineWidth = 2;
         context.strokeStyle = 'rgb(100,100,195)';
         context.fillStyle = 'rgba(30,144,255,0.15)';
         context.fill();
         context.stroke();
      }
   });

function drawGrid(color, stepx, stepy) {
   context.save()

   context.shadowColor = undefined;
   context.shadowOffsetX = 0;
   context.shadowOffsetY = 0;

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
}

drawGrid('lightgray', 10, 10);

ball.left = 320;
ball.top = 160;
ball.paint(context);