const { Model } = require("sequelize");


module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {


    static associate({ Article, User }) {
      // define relations

      // Users
      this.belongsTo(User, {foreignKey: 'userId'})

      // Articles
      this.belongsTo(Article, { foreignKey: 'articleId'})

    }

    // Method

  }

  // initialize
  Comment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      body: DataTypes.TEXT,
    },

    {
      sequelize,
      modelName: "Comment",
    },

  )

  return Comment
}
