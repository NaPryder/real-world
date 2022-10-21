const { Model } = require("sequelize");


module.exports = (sequelize, DataTypes) => {
  class User extends Model {


    static associate({ Article, Comment, User }) {
      // define relations

      // Articles
      this.hasMany(Article, { foreignKey: 'userId', onDelete: 'CASCADE'})

      // Comments
      this.hasMany(Comment, { foreignKey: 'articleId'})

      // Favorites
      this.belongsToMany(
        Article, 
        {
          through: "Favorites",
          as: 'favorites',
          foreignKey: 'userId',
          timestamps: false
        }
      )

      // Followers
      this.belongsToMany(
        User,
        {
          through: 'Followers',
          as: 'followers',
          foreignKey: 'userId',
          timestamps: false
        }
      )
      
      // Followings
      this.belongsToMany(
        User,
        {
          through: 'Followers',
          as: 'following',
          foreignKey: 'followingId',
          timestamps: false
        }
      )

    }

    // Method
    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        password: undefined,
        updatedAt: undefined,
        createdAt: undefined,
      };
    }
  }

  // initialize
  User.init(
    {
      email: {
        type: DataTypes.STRING, 
        validate: {
          isEmail:true
        },
      },
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      bio: DataTypes.TEXT,
      image: DataTypes.TEXT,
    },

    {
      sequelize,
      modelName: "User",
    },

  )

  return User
}
