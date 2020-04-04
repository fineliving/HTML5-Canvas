var canvas = document.getElementById('canvas'),
   context = canvas.getContext('2d'),
   image = new Image();

image.src = '../../shared/images/countrypath.jpg';
image.onload = function (e) {
   context.drawImage(image, 0, 0);
};