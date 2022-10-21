const { Model } = require("sequelize");


module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {


    static associate({ Article }) {
      // define relations

      // Articles
      this.belongsToMany(
        Article, 
        { 
          through: 'TagList',
          as: 'taglist',
          foreignKey: 'tagName',
          timestamps: false,
        }
      )

    }

    // Method
    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        userId: undefined,
        TagList: undefined,
      };
    }
  }

  // initialize
  Tag.init(
    {
      name: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
    },

    {
      sequelize,
      modelName: "Tag",
    },

  )

  return Tag
}
