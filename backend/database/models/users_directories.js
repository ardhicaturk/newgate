'use strict';
module.exports = (sequelize, DataTypes) => {
  const users_directories = sequelize.define('users_directories', {
    uuid: {
      type: DataTypes.UUID,
      unique: true
    },
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
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    schema: 'users_dir',
    tableName: 'users_directories'
  });
  users_directories.associate = function(models) {
    // associations can be defined here
    users_directories.belongsTo(models.roles);
    users_directories.belongsToMany(models.auth_modes, {
      through: {
        model: models.users_auth_modes
      },
      foreignKey: 'authModeId'
    });
    users_directories.belongsToMany(models.auths, {
      through: {
        model: models.users_auth_modes
      },
      foreignKey: 'usersId'
    });
  };
  return users_directories;
};