'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate( {User, Player} ) {
      // define association here
      this.belongsTo(User, {foreignKey: 'userId', as: 'user'});
      this.belongsTo(Player, {foreignKey: 'playerId', as: 'player'});
    }
  }
  Comment.init({
    rating: {
      type: DataTypes.STRING,
      allowNull: false
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};