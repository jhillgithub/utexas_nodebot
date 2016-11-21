// *********************************************************************************
// sumo_controller.js - this file offers a set of routes for interacting with the sumo robot
// *********************************************************************************

// Dependencies
// =============================================================
var express = require('express');
var router = express.Router();
var sumo_api = require('./sumo_api.js');
console.log(sumo_api);
// var sumo = require('../../models/sumo.js');

router.get('/', function (req, res) {
  res.render('index');
});

router.get('/leap', function (req, res) {
  res.render('sumoLeap');
});

router.post('/api', function (req, res) {
  // req.params.control
  console.log(req.body);

  switch (req.body.control) {
    case "connect":
      sumo_api.connect();
      break;
    case "forward":
      sumo_api.forward();
      break;
    case "backward":
      sumo_api.backward();
      break;
    case "left":
      sumo_api.left();
      break;
    case "right":
      sumo_api.right();
      break;
    case "tap":
      sumo_api.tap();
      break;
    case "spin":
      sumo_api.spin();
      break;
    case "longJump":
      sumo_api.longJump();
      break;
    case "startVideo":
      sumo_api.startVideo(socket);
      break;
    case "test":
      sumo_api.test();
      break;
    default:
      console.log("I don't understand that command");
  }

  res.render('index');
});

module.exports = router;
