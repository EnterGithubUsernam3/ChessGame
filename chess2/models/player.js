'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    array = []
    static associate(models) {
      // define association here
    }
  }
  Player.init({
    firstName: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: true
      }

    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: true
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true 
      }
    },
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};