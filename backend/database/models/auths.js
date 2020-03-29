'use strict';
const cryptoRandomString = require('crypto-random-string');
module.exports = (sequelize, DataTypes) => {
  const auths = sequelize.define('auths', {
    entity: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5]
      }
    },
    resetToken: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: cryptoRandomString({length: 25}),
      validate: {
        len: [5],
        isAlphanumeric: true
      }
    }
  }, {
    schema: 'auth',
    tableName: 'auths'
  });
  auths.associate = function(models) {
    // associations can be defined here
    auths.belongsToMany(models.users_directories, {
      through: {
        model: models.users_auth_modes
      },
      foreignKey: 'authId'
    });
  };
  return auths;
};