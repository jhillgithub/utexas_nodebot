"use strict";

var sumo = require('node-sumo');
var cv = require('opencv');

var drone = sumo.createClient();
var video = drone.getVideoStream();
var buf = null;
var w = new cv.NamedWindow("Video", 0);
// face detection properties
var rectColor = [0, 255, 0];
var rectThickness = 2;
var uuid = require('node-uuid');

drone.connect(function() {
  console.log("Connected...");

  // drone.postureJumper();
  // drone.forward(50);
  // setTimeout(function() {
  //   drone.right(10);
  //   setTimeout(function() {
  //     drone.stop();
  //     drone.animationsLongJump();
  //     drone.animationsSlalom();
  //   }, 5000);
  // }, 1000);
});

drone.on("battery", function(battery) {
  console.log("battery: " + battery);
});

video.on("data", function(data) {
  buf = data;
});

setInterval(function() {
  if (buf == null) {
   return;
  }

  try {
    cv.readImage(buf, function(err, im) {
      if (err) {
        console.log(err);
      } else {
        if (im.width() < 1 || im.height() < 1) {
          console.log("no width or height");
          return;
        }
        im.detectObject(cv.FACE_CASCADE, {}, function(err, faces) {
               if (err) throw err;

               for (var i = 0; i < faces.length; i++) {
                 var face = faces[i];
                 im.rectangle([face.x, face.y], [face.width, face.height], rectColor, rectThickness);
               }
               var uuid1 = uuid.v1();
               if (faces.length > 0) {
                 im.save('./out_' + uuid1 + '.jpg');
               }
               w.show(im);
               w.blockingWaitKey(0, 50);
              //  socket.emit('frame', { buffer: im.toBuffer() });
        });

      }
    });
  } catch(e) {
    console.log(e);
  }
}, 100);
