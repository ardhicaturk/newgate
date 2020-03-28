'use strict';
module.exports = (sequelize, DataTypes) => {
  const roles = sequelize.define('roles', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3],
        isAlphanumeric: true
      }
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    }
  }, {});
  roles.associate = function(models) {
    // associations can be defined here
    roles.hasMany(models.users_directories)
  };
  return roles;
};