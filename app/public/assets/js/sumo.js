var currentURL = window.location.origin;

console.log(currentURL + "/api");

$(document).on('click', '.sumoControl', controlHandler);

function controlHandler() {
  console.log(this);
  console.log($(this).attr("id"));
  var val = $(this).attr("id");
  $.post(currentURL + "/api", {control: val}, function(response) {

  })
}

var socket = io.connect('http://localhost:3000');

var canvas = document.getElementById('canvas-video');
var context = canvas.getContext('2d');
var img = new Image();

context.fillStyle = '#333';
context.fillText('Loading...', canvas.width/2-30, canvas.height/3);

socket.on('frame', function(data) {
  var uint8Arr = new Uint8Array(data.buffer);
  var str = String.fromCharCode.apply(null, uint8Arr);
  var base64String = btoa(str);

  img.onload = function() {
    context.drawImage(this, 0, 0, canvas.width, canvas.height);
  };
  img.src = 'data:image/png;base64,' + base64String;
})
