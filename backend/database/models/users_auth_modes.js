'use strict';
module.exports = (sequelize, DataTypes) => {
  const users_auth_modes = sequelize.define('users_auth_modes', {
    usersId: DataTypes.INTEGER,
    authModeId: DataTypes.INTEGER,
    authId: DataTypes.INTEGER
  }, {});
  users_auth_modes.associate = function(models) {
    // associations can be defined here
  };
  return users_auth_modes;
};