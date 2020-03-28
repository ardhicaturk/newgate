'use strict';
module.exports = (sequelize, DataTypes) => {
  const users_directories = sequelize.define('users_directories', {
    uuid: DataTypes.UUID,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    verfied: DataTypes.BOOLEAN,
    email: DataTypes.STRING,
    lasLogin: DataTypes.DATE,
    image: DataTypes.STRING,
    roleId: DataTypes.INTEGER
  }, {});
  users_directories.associate = function(models) {
    // associations can be defined here
  };
  return users_directories;
};