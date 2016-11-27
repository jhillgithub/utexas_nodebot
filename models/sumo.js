'use strict';
module.exports = function(sequelize, DataTypes) {
  var Sumo = sequelize.define('Sumo', {
    image: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Sumo;
};
