var canvas = document.getElementById('canvas'),
   context = canvas.getContext('2d'),
   video = document.getElementById('video');

function animate() {
   if (!video.ended) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      window.requestNextAnimationFrame(animate);
   }
}

video.onload = function (e) {
   video.play();
   window.requestNextAnimationFrame(animate);
};

alert('This example plays a video, but due to copyright restrictions and size limitations, the video is not included in the code for this example. To make this example work, download a video, and replace the two source elements in example.html to refer to your video.');