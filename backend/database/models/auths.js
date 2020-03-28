'use strict';
module.exports = (sequelize, DataTypes) => {
  const auths = sequelize.define('auths', {
    entity: DataTypes.STRING,
    resetToken: DataTypes.STRING
  }, {});
  auths.associate = function(models) {
    // associations can be defined here
  };
  return auths;
};