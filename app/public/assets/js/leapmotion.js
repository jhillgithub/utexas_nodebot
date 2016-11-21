var controllerOptions = {};
var controller = Leap.loop(controllerOptions);
var motionDisabled = false;
var hitCount = 0;

controller.on('frame', function(frame) {
    if (frame.hands[0]) {
        var hand = frame.hands[0];
        if (hand.pointables.length === 5) {
          if (
            !frame.pointables[0].extended &&
            frame.pointables[1].extended &&
            frame.pointables[2].extended &&
            !frame.pointables[3].extended &&
            !frame.pointables[4].extended) {
            handleTrick();
          } else if (
            frame.pointables[0].extended &&
            frame.pointables[1].extended &&
            frame.pointables[2].extended &&
            frame.pointables[3].extended &&
            frame.pointables[4].extended) {
            handleSwipe(hand);
          }
        }
        // console.log('frame');
    }
});

/**
 * Handle swipe by translating movement coordinates to a direction
 * @param {object} hand - The first detected hand
**/
var handleSwipe = function(hand) {
    // The translation object is the change in position of the hand
    // between the current frame and the specified frame.
    // The returned translation vector provides the magnitude and
    // direction of the movement in millimeters.
    try {
      var previousFrame = controller.frame(1);
      var movement = hand.translation(previousFrame);
      // $("#movement").text(movement);
      var direction = '?';

      if (movement[0] > 4) {
          direction = 'right'
      } else if (movement[0] < -4) {
          direction = 'left'
      } else if (movement[2] > 4) {
          direction = 'backward'
      } else if (movement[2] < -4) {
          direction = 'forward'
      }
      // } else if (movement[1] > 4) {
      //     direction = 'UP'
      // } else if (movement[1] < -4) {
      //     direction = 'DOWN'

      // switch (direction) {
      //     case 'FORWARD':
      //         leapHandler()
      //         break;
      //     case 'REVERSE':
      //         break;
      //     case 'LEFT':
      //         break;
      //     case 'RIGHT':
      //         break;
      // }
      if (direction !== '?'){
        // $("#direction").text(direction);
        leapHandler(direction);
        direction = '?';
      }
      // console.log('Direction: ' + direction);
    } catch(err) {
      //noop
    }
}

function handleTrick() {
  console.log('bang');
  console.log("hitCount", hitCount);
  animation = 'tap';
  if (hitCount > 1) {
    animation = 'spin';
  }
  leapHandler(animation);
}

function leapHandler(val) {
  if (motionDisabled == true) return;
  motionDisabled = true;
  var delay = 1000;
  if (val === 'forward' || val === 'reverse' || val === 'tap') {
    delay = 2000;
  } else if (val === 'spin') {
    delay = 5000;
  }
  setTimeout(function(){motionDisabled = false;}, delay);
  console.log("val", val);
  $.post(currentURL + "/api", {control: val}, function(response) {
    if (val === 'spin') {
      hitCount = 0;
    }
    else if (val === 'tap') {
      hitCount += 1;
    }
    console.log("response", response);
  })
}





/** Deprecated **/
// var controllerOptions = {enableGestures: true};
// Leap.loop(controllerOptions, function(frame) {
//
//   // Display Gesture object data
//   if (frame.gestures.length > 0) {
//     for (var i = 0; i < frame.gestures.length; i++) {
//       var gesture = frame.gestures[i];
//       if(gesture.type == "swipe") {
//           //Classify swipe as either horizontal or vertical
//           var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
//           //Classify as right-left or up-down
//           if(isHorizontal){
//               if(gesture.direction[0] > 0){
//                   swipeDirection = "right";
//               } else {
//                   swipeDirection = "left";
//               }
//           } else { //vertical
//               if(gesture.direction[1] > 0){
//                   swipeDirection = "up";
//               } else {
//                   swipeDirection = "down";
//               }
//           }
//           console.log(swipeDirection)
//           d3.select('#swipe').text(swipeDirection);
//        }
//      }
//   }
//
// });
