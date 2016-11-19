var sumo = require('node-sumo');
var cv = require('opencv');

var drone = sumo.createClient();
drone.connect(function() {
  console.log("Connected...");
});
var video = drone.getVideoStream();
var buf = null;
var w = new cv.NamedWindow("Video", '0');

video.on("data", function(data) {
  buf = data;
});

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
  drone.postureJumper();
  drone.forward(50);

  setTimeout(function() {
    drone.stop();
  }, 1000);
};

var backward = function() {
  drone.postureJumper();
  drone.backward(50);

  setTimeout(function() {
    drone.stop();
  }, 1000);
};

var left = function() {
  drone.postureJumper();
  drone.left(50);

  setTimeout(function() {
    drone.stop();
  }, 100);
};

var right = function() {
  drone.postureJumper();
  drone.right(50);

  setTimeout(function() {
    drone.stop();
  }, 100);
};

var longJump = function() {
  drone.postureJumper();
  drone.animationsLongJump();
};

var startVideo = function(socket) {
  setInterval(function() {
    // camera.read(function(err, im) {
    try {
      cv.readImage(buf, function(err, im) {
        if (err) {
          console.log(err);
        }
        socket.emit('frame', { buffer: im.toBuffer() });
      })
      } catch(e) {
        console.log(e);
      }
    }, 100)

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





var sumo = {
  connect: connect,
  forward: forward,
  backward: backward,
  left: left,
  right: right,
  longJump: longJump,
  startVideo: startVideo,
  test: function() {console.log("test")}
}

module.exports = sumo;
