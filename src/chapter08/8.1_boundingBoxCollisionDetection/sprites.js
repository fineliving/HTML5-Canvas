// Painters...................................................................

// Painters paint sprites with a paint(sprite, context) method. ImagePainters
// paint an image for their sprite.

var ImagePainter = function (imageUrl) {
   this.image = new Image;
   this.image.src = imageUrl;
};

ImagePainter.prototype = {
   drawImage: function (sprite, context) {},

   paint: function (sprite, context) {
      if (this.image !== undefined) {
         if (!this.image.complete) {
            this.image.onload = function (e) {
               context.drawImage(this, // this is image
                  sprite.left, sprite.top,
                  sprite.width, sprite.height);
            };
         } else {
            context.drawImage(this.image, sprite.left, sprite.top,
               sprite.width, sprite.height);
         }
      }
   }
};

SpriteSheetPainter = function (cells) {
   this.cells = cells;
   this.cellIndex = 0;
};

SpriteSheetPainter.prototype = {
   advance: function () {
      if (this.cellIndex == this.cells.length - 1) {
         this.cellIndex = 0;
      } else {
         this.cellIndex++;
      }
   },

   paint: function (sprite, context) {
      var cell = this.cells[this.cellIndex];

      context.drawImage(spritesheet, cell.left, cell.top, cell.width, cell.height,
         sprite.left, sprite.top, cell.width, cell.height);
   }
};

// Sprite Animators...........................................................

var SpriteAnimator = function (painters, elapsedCallback) {
   this.painters = painters;
   if (elapsedCallback) {
      this.elapsedCallback = elapsedCallback;
   }
   this.animationTimer = new AnimationTimer(1000);
   this.painters = [];
   this.spritePainter = undefined;
   this.index = 0;
};

SpriteAnimator.prototype = {
   initializeSprite: function (sprite) {
      sprite.animating = true;
      sprite.painter = this.painters[0];
   },

   endAnimation: function (interval, originalPainter) {
      sprite.animating = false;

      if (this.elapsedCallback) this.elapsedCallback(sprite);
      else sprite.painter = originalPainter;

      clearInterval(interval);
   },

   advanceSpritePainter: function (sprite) {
      sprite.painter = this.painters[this.index];
   },

   start: function (sprite, duration) {
      var period = duration / (this.painters.length),
         interval = undefined,
         animator = this, // for setInterval() function
         originalPainter = sprite.painter;

      initializeSprite(sprite);

      animationTimer.duration = duration;
      animationTimer.start();

      interval = setInterval(function () {
         var elapsed = animationTimer.getElapsedTime();
         animator.index = (parseFloat(elapsed / period).toFixed(0)) - 1;

         if (animationTimer.isOver()) endAnimation(interval, originalPainter);
         else advanceSpritePainter(sprite);
      }, period);
   },
};

// Sprites....................................................................

// Sprites have a name, a painter, and an array of behaviors. Sprites can
// be updated, and painted.
//
// A sprite's painter paints the sprite: paint(sprite, context)
// A sprite's behavior executes: execute(sprite, context, time)

var Sprite = function (name, painter, behaviors) {
   if (name !== undefined) this.name = name;
   else this.name = undefined;

   if (painter !== undefined) this.painter = painter;
   else this.painter = undefined;

   if (behaviors !== undefined) this.behaviors = behaviors;
   else this.behaviors = [];

   this.left = 0;
   this.top = 0;
   this.width = 10;
   this.height = 10;
   this.velocityX = 0;
   this.velocityY = 0;
   this.visible = true;
   this.animating = false;

   return this;
};

Sprite.prototype = {
   paint: function (context) {
      if (this.painter !== undefined && this.visible) {
         this.painter.paint(this, context);
      }
   },

   update: function (context, time) {
      for (var i = this.behaviors.length; i > 0; --i) {
         this.behaviors[i - 1].execute(this, context, time);
      }
   }
};