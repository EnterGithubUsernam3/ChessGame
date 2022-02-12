'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GamesDG extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // // define association here
      // GamesDG.belongsTo(models.PlayersDG, { foreignKey: 'player_1', foreignKeyConstraint: true });
      // GamesDG.belongsTo(models.PlayersDG, { foreignKey: 'player_2', foreignKeyConstraint: true });
      // GamesDG.hasMany(models.PlayersDG, { foreignKey: 'player_1', foreignKeyConstraint: true });
      // GamesDG.hasMany(models.PlayersDG, { foreignKey: 'player_2', foreignKeyConstraint: true });
    }
  }
  GamesDG.init({
    Game: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'GamesDG',
  });
  return GamesDG;
};