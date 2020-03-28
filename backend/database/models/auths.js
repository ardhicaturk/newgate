'use strict';
module.exports = (sequelize, DataTypes) => {
  const auths = sequelize.define('auths', {
    entity: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5],
        isAlphanumeric: true
      }
    },
    resetToken: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5],
        isAlphanumeric: true
      }
    }
  }, {});
  auths.associate = function(models) {
    // associations can be defined here
    auths.belongsToMany(models.users_directories, {
      through: {
        model: models.users_auth_modes
      }
    });
  };
  return auths;
};