'use strict';
module.exports = (sequelize, DataTypes) => {
  const auth_modes = sequelize.define('auth_modes', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5],
        isAlphanumeric: true
      }
    }
  }, {
    schema: 'auth',
    tableName: 'auth_modes'
  });
  auth_modes.associate = function(models) {
    // associations can be defined here
    auth_modes.belongsToMany(models.users_directories, {
      through: {
        model: models.users_auth_modes
      },
      foreignKey: 'usersId'
    });
  };
  return auth_modes;
};