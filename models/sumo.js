'use strict';
module.exports = function(sequelize, DataTypes) {
  var Sumo = sequelize.define('Sumo', {
    botname: DataTypes.STRING,
    battery: DataTypes.STRING,
    images: DataTypes.STRING,
    video: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Sumo;
};