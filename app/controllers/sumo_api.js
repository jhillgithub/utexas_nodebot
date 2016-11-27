var sumo = require('node-sumo');
var cv = require('opencv');
var sumoModel = require("../../models")["Sumo"];

var drone = sumo.createClient();
drone.connect(function() {
  console.log("Connected...");
});

var fpsInterval = 1000/10;
var buf = null;
var w = new cv.NamedWindow("Video", '0');
var broadcasting = false;
// face detection properties
var rectColor = [0, 255, 0];
var rectThickness = 2;
var saveDisabled = false;
var saveDelay = 2000;
var uuid = require('node-uuid');

// var camera = new cv.VideoCapture("Video");
// camera.setWidth(320);
// camera.setHeight(240);

// setInterval(function() {
//   if (buf == null) {
//    return;
//   }
//
//   try {
//     cv.readImage(buf, function(err, im) {
//       if (err) {
//         console.log(err);
//       } else {
//         if (im.width() < 1 || im.height() < 1) {
//           console.log("no width or height");
//           return;
//         }
//         w.show(im);
//         w.blockingWaitKey(0, 50);
//       }
//     });
//   } catch(e) {
//     console.log(e);
//   }
// }, 100);


drone.on("battery", function(battery) {
  console.log("battery: " + battery);
});

var connect = function() {
  drone.connect(function() {
    console.log("Connected...");
  });
};

var forward = function() {
  setTimeout(function() {
    console.log("Moving forward...")
    drone.postureJumper();
    drone.forward(50);
  }, 0);

  setTimeout(function() {
    console.log("Stopping motion...")
    drone.stop();
  }, 1000);
};

var backward = function() {
  setTimeout(function() {
    console.log("Moving backward...")
    drone.postureJumper();
    drone.backward(50);
  }, 0);

  setTimeout(function() {
    console.log("Stopping motion...")
    drone.stop();
  }, 1000);
};

var left = function() {
  setTimeout(function() {
    console.log("Moving left...")
    drone.postureJumper();
    drone.left(50);
  }, 0);

  setTimeout(function() {
    console.log("Stopping motion...")
    drone.stop();
  }, 100);
};

var right = function() {
  setTimeout(function() {
    console.log("Moving right...")
    drone.postureJumper();
    drone.right(50);
  }, 0);

  setTimeout(function() {
    console.log("Stopping motion...")
    drone.stop();
  }, 100);
};

var tap = function() {
  setTimeout(function() {
    console.log("I've been hit...")
    drone.postureJumper();
    drone.animationsTap();
  }, 0);
};

var spin = function() {
  setTimeout(function() {
    console.log("I'm dead...")
    drone.postureJumper();
    drone.animationsSpin();
  }, 0);
};

var longJump = function() {
  drone.postureJumper();
  drone.animationsLongJump();
};

var startVideo = function(socket) {
  var video = drone.getVideoStream();


  console.log('listening for data');


  video.on("data", function(data) {
    console.log('got data', new Date());
    buf = data;

    broadcasting = true;

  });

  console.log('starting processVideo');
  setInterval(function() {

    if (buf == null) {
       return;
    }
    // console.log("buffer", buf);
    try {
      cv.readImage(buf, function(err, im) {
        if (err) {
          console.log(err);
        }

        im.detectObject(cv.FACE_CASCADE, {}, function(err, faces) {
               if (err) throw err;

               for (var i = 0; i < faces.length; i++) {
                 face = faces[i];
                 im.rectangle([face.x, face.y], [face.width, face.height], rectColor, rectThickness);
               }
               if (faces.length > 0 && saveDisabled == false) {
                 console.log("saving detection");
                 var uuid1 = uuid.v1();
                 saveDisabled = true;
                 setTimeout(function(){saveDisabled = false;}, saveDelay);
                 var imgPath = '/assets/images/detection_' + uuid1 + '.jpg'
                 im.save('./public' + imgPath);
                 sumoModel.create({
                   'image': imgPath
                 });
               }
               socket.emit('frame', { buffer: im.toBuffer() });
        });
      })
    } catch(e) {
      console.log(e);
    }
  }, fpsInterval)


  // broadcasting = true;
  // setInterval(function() {
  //   // camera.read(function(err, im) {
  //   try {
  //     cv.readImage(buf, function(err, im) {
  //       if (err) {
  //         console.log(err);
  //       }
  //       socket.emit('frame', { buffer: im.toBuffer() });
  //     })
  //     } catch(e) {
  //       console.log(e);
  //     }
  //   }, 100)

  // setInterval(function() {
  //   if (buf == null) {
  //    return;
  //   }
  //
  //   try {
  //     cv.readImage(buf, function(err, im) {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         if (im.width() < 1 || im.height() < 1) {
  //           console.log("no width or height");
  //           return;
  //         }
  //         w.show(im);
  //         w.blockingWaitKey(0, 50);
  //       }
  //     });
  //   } catch(e) {
  //     console.log(e);
  //   }
  // }, 100);
};

function processVideo() {

}



var sumo = {
  connect: connect,
  forward: forward,
  backward: backward,
  left: left,
  right: right,
  tap: tap,
  spin: spin,
  longJump: longJump,
  startVideo: startVideo,
  test: function() {console.log("test")}
}

module.exports = sumo;
