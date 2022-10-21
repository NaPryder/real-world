const { Model } = require("sequelize");


module.exports = (sequelize, DataTypes) => {
  class Article extends Model {


    static associate({ Comment, User, Tag }) {
      // define relations

      // Users
      this.belongsTo(User, {foreignKey: 'userId', as: 'author'})

      // Comments
      this.hasMany(Comment, { foreignKey: 'articleId', onDelete: 'CASCADE'})

      // Favorites
      this.belongsToMany(
        User, 
        {
          through: "Favorites",
          as: 'favorites',
          foreignKey: 'articleId',
          timestamps: false
        }
      )

      // Tags
      this.belongsToMany(
        Tag,
        {
          through: 'TagList',
          as: 'taglist',
          foreignKey: 'articleId',
          timestamps: false,
          // onDelete: 'CASCADE',
        }
      )

    }

    // Method
    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        userID: undefined,
      };
    }
  }

  // initialize
  Article.init(
    {
      slug: {
        type: DataTypes.STRING,
      },
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      body: DataTypes.TEXT,
    },

    {
      sequelize,
      modelName: "Article",
    },

  )

  return Article
}
