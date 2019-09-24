var canvas = document.getElementById('canvas'),
   context = canvas.getContext('2d'),
   bomb = new Sprite('bomb', new ImagePainter('../../shared/images/bomb.png')),

   BOMB_LEFT = 220,
   BOMB_TOP = 80,
   BOMB_WIDTH = 180,
   BOMB_HEIGHT = 130;

function paint() {
   bomb.paint(context);
}

function animate(now) {
   context.clearRect(0, 0, canvas.width, canvas.height);
   paint();
   window.requestNextAnimationFrame(animate);
}

bomb.left = BOMB_LEFT;
bomb.top = BOMB_TOP;
bomb.width = BOMB_WIDTH;
bomb.height = BOMB_HEIGHT;

window.requestNextAnimationFrame(animate);