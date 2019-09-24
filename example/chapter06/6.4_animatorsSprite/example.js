var canvas = document.getElementById('canvas'),
   context = canvas.getContext('2d'),
   explosionButton = document.getElementById('explosionButton'),

   BOMB_LEFT = 100,
   BOMB_TOP = 80,
   BOMB_WIDTH = 180,
   BOMB_HEIGHT = 130,

   NUM_EXPLOSION_PAINTERS = 9,
   NUM_FUSE_PAINTERS = 9,

   // Painters..................................................

   bombPainter = new ImagePainter('../../shared/images/bomb.png'),
   bombNoFusePainter = new ImagePainter('bomb-no-fuse.png'),
   fuseBurningPainters = [],
   explosionPainters = [],

   // Animators.................................................

   fuseBurningAnimator = new SpriteAnimator(
      fuseBurningPainters,
      function () {
         bomb.painter = bombNoFusePainter;
      });

explosionAnimator = new SpriteAnimator(
   explosionPainters,
   function () {
      bomb.painter = bombNoFusePainter;
   });

// Bomb......................................................

bomb = new Sprite('bomb', bombPainter),

   // Event Handlers................................................

   explosionButton.onclick = function (e) {
      if (bomb.animating) // not now...
         return;

      // burn fuse for 2 seconds

      fuseBurningAnimator.start(bomb, 2000);

      // wait for 3 seconds, then explode for 1 second

      setTimeout(function () {
         explosionAnimator.start(bomb, 1000);

         // wait for 2 seconds, then reset to the
         // original bomb image

         setTimeout(function () {
            bomb.painter = bombPainter;
         }, 2000);

      }, 3000);

   };

// Animation.....................................................

function animate(now) {
   context.clearRect(0, 0, canvas.width, canvas.height);
   bomb.paint(context);
   window.requestNextAnimationFrame(animate);
}

// Initialization................................................

bomb.left = BOMB_LEFT;
bomb.top = BOMB_TOP;
bomb.width = BOMB_WIDTH;
bomb.height = BOMB_HEIGHT;

for (var i = 0; i < NUM_FUSE_PAINTERS; ++i) {
   fuseBurningPainters.push(new ImagePainter('fuse-0' + i + '.png'));
}

for (var i = 0; i < NUM_EXPLOSION_PAINTERS; ++i) {
   explosionPainters.push(new ImagePainter('explosion-0' + i + '.png'));
}

window.requestNextAnimationFrame(animate);