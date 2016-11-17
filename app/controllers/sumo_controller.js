// *********************************************************************************
// sumo_controller.js - this file offers a set of routes for interacting with the sumo robot
// *********************************************************************************

// Dependencies
// =============================================================
var express = require('express');
var router = express.Router();
var sumo = require('../../models/sumo.js');

router.get('/', function (req, res) {
  res.render('index');
});

module.exports = router;
