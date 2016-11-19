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
// $.post(currentURL + "/api", function(data){
//
// 	// for each character that our server sends us back
// 	for (var i =0; i < data.length; i++){
// 		// create a parent div for the oncoming elements
// 		var wellSection = $("<div>");
// 		// add a class to this div: 'well'
// 		wellSection.addClass('well');
// 		// add an id to the well to mark which well it is
// 		wellSection.attr('id', 'characterWell-' + i)
// 		// append the well to the well section
// 		$('#wellSection').append(wellSection);
//
// 		// Now add all of our chacter data to the well we just placed on the page
//
// 		// make the name an h2,
// 		$("#characterWell-" + i).append("<h2>" + data[i].name + "</h2>");
// 		// the role an h3,
// 		$("#characterWell-" + i).append("<h3>Role: " + data[i].role + "</h4>");
// 		// the age an h3,
// 		$("#characterWell-" + i).append("<h3>Age: " + data[i].age + "</h4>");
// 		// and the forcepoints an h3.
// 		$("#characterWell-" + i).append("<h3>Force Points: " + data[i].forcePoints + "</h4>");
// 	}
// })
