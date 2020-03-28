'use strict';
module.exports = (sequelize, DataTypes) => {
  const users_directories = sequelize.define('users_directories', {
    uuid: DataTypes.UUID,
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: DataTypes.STRING,
    verfied: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3],
        isEmail: true
      }
    },
    lastLogin: DataTypes.DATE,
    image: DataTypes.STRING,
    roleId: DataTypes.INTEGER
  }, {});
  users_directories.associate = function(models) {
    // associations can be defined here
    users_directories.belongsTo(models.roles);
    users_directories.belongsToMany(models.auth_modes, {
      through: {
        model: models.users_auth_modes
      },
    });
    users_directories.belongsToMany(models.auth, {
      through: {
        model: models.users_auth_modes
      },
    });
  };
  return users_directories;
};