var canvas = document.getElementById('canvas'),
   context = canvas.getContext('2d'),
   ball = new Sprite('ball', {
      paint: function (sprite, context) {
         context.save();
         context.strokeStyle = 'blue';
         context.fillStyle = 'yellow';
         context.beginPath();
         context.arc(sprite.left + sprite.width / 2,
            sprite.top + sprite.height / 2,
            10, 0, Math.PI * 2, false);
         context.stroke();
         context.fill();
         context.restore();
      }
   }),
   ballMoving = false,
   lastTime = undefined,
   velocityX = 350,
   velocityY = 190,
   showInstructions = true;

// Functions.....................................................

function windowToCanvas(e) {
   var x = e.x || e.clientX,
      y = e.y || e.clientY,
      bbox = canvas.getBoundingClientRect();

   return {
      x: x - bbox.left * (canvas.width / bbox.width),
      y: y - bbox.top * (canvas.height / bbox.height)
   };
};

function getBoundingBox(ball) {
   return {
      left: ball.left,
      top: ball.top,
      width: ball.width,
      height: ball.height
   };
}

function handleEdgeCollisions() {
   var bbox = getBoundingBox(ball),
      right = bbox.left + bbox.width,
      bottom = bbox.top + bbox.height;

   if (right > canvas.width || bbox.left < 0) {
      velocityX = -velocityX;

      if (right > canvas.width) {
         ball.left -= right - canvas.width;
      }

      if (bbox.left < 0) {
         ball.left -= bbox.left;
      }
   }
   if (bottom > canvas.height || bbox.top < 0) {
      velocityY = -velocityY;

      if (bottom > canvas.height) {
         ball.top -= bottom - canvas.height;
      }
      if (bbox.top < 0) {
         ball.top -= bbox.top;
      }
   }
};

function detectCollisions() {
   if (ballMoving) {
      handleEdgeCollisions();
   }
};

function isPointInBall(x, y) {
   return x > ball.left && x < ball.left + ball.width &&
      y > ball.top && y < ball.top + ball.height;
}


// Event Handlers................................................

canvas.onmousedown = function (e) {
   var location = windowToCanvas(e);

   ballMoving = !ballMoving;

   if (showInstructions)
      showInstructions = false;
};

// Animation.....................................................

function animate(time) {
   var elapsedTime;

   if (lastTime === 0) {
      lastTime = time;
   } else {
      context.clearRect(0, 0, canvas.width, canvas.height);

      if (ballMoving) {
         elapsedTime = parseFloat(time - lastTime) / 1000;

         ball.left += velocityX * elapsedTime;
         ball.top += velocityY * elapsedTime;

         detectCollisions();
      }

      lastTime = time;

      ball.paint(context);

      if (showInstructions) {
         context.fillStyle = 'rgba(100, 140, 230, 0.7)';
         context.font = '24px Arial';
         context.fillText('Click anywhere to start or stop the ball', 20, 40);
      }
   }
   window.requestNextAnimationFrame(animate);
};


// Initialization................................................

ball.fillStyle = 'rgba(255,255,0,1.0)';
ball.left = 100;
ball.top = 100;

context.shadowColor = 'rgba(100,140,255,0.5)';
context.shadowBlur = 4;
context.shadowOffsetX = 2;
context.shadowOffsetY = 2;
context.font = '38px Arial';

window.requestNextAnimationFrame(animate);