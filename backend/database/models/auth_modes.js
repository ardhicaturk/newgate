'use strict';
module.exports = (sequelize, DataTypes) => {
  const auth_modes = sequelize.define('auth_modes', {
    name: DataTypes.STRING
  }, {});
  auth_modes.associate = function(models) {
    // associations can be defined here
  };
  return auth_modes;
};