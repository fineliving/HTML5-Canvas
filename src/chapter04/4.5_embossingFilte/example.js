var image = new Image(),
   canvas = document.getElementById('canvas'),
   context = canvas.getContext('2d'),
   embossButton = document.getElementById('embossButton'),
   embossed = false;

// Functions.....................................................   

function emboss() {
   var imagedata, data, length, width, index = 3;

   imagedata = context.getImageData(0, 0,
      canvas.width, canvas.height);
   data = imagedata.data;
   width = imagedata.width;
   length = data.length;

   for (i = 0; i < length; i++) { // loop through every pixel

      // if we won't overrun the bounds of the array
      if (i <= length - width * 4) {

         // if it's not an alpha 
         if ((i + 1) % 4 !== 0) {

            // if it's the last pixel in the row, there is
            // no pixel to the right, so copy previous pixel's
            // values.

            if ((i + 4) % (width * 4) == 0) {
               data[i] = data[i - 4];
               data[i + 1] = data[i - 3];
               data[i + 2] = data[i - 2];
               data[i + 3] = data[i - 1];
               i += 4;
            } else { // not the last pixel in the row
               data[i] = 255 / 2 // Average value
                  +
                  2 * data[i] // current pixel
                  -
                  data[i + 4] // next pixel
                  -
                  data[i + width * 4]; // pixel underneath
            }
         }
      } else { // last row, no pixels underneath,
         // so copy pixel above
         if ((i + 1) % 4 !== 0) {
            data[i] = data[i - width * 4];
         }
      }
   }
   context.putImageData(imagedata, 0, 0);
}

function drawOriginalImage() {
   context.drawImage(image, 0, 0,
      image.width, image.height,
      0, 0, canvas.width, canvas.height);
}

embossButton.onclick = function () {
   if (embossed) {
      embossButton.value = 'Emboss';
      drawOriginalImage();
      embossed = false;
   } else {
      embossButton.value = 'Original image';
      emboss();
      embossed = true;
   }
};

// Initialization................................................   

image.src = '../../shared/images/curved-road.png';
image.onload = function () {
   drawOriginalImage();
};