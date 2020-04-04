'use strict';
module.exports = (sequelize, DataTypes) => {
  const users_auth_modes = sequelize.define('users_auth_modes', {
    usersId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    authModeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    lastLogin: {
      type: DataTypes.DATE
    },
    authId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    }
  }, {
    schema: 'auth',
    tableName: 'users_auth_modes'
  });
  users_auth_modes.associate = function(models) {
    // associations can be defined here
  };
  return users_auth_modes;
};