const path = require('path')
const fs = require("fs")
const { Sequelize, DataTypes} = require('sequelize')
const dbConfig = require('../config/db.config')

// Config DB
const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    operatorsAliases: false,

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    }
  }
)


// Authenticate DB
sequelize.authenticate()
.then( () => {
  console.log('connected');
})
.catch( err => {
  console.log('error :' +err);
})


const basename = path.basename(__filename);
const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Add DB models
fs.readdirSync(__dirname)
  .filter( (file) => (file !== basename && file.includes('.js')) )
  .forEach( (file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes)
    db[model.name] = model
  })

// Associate models
Object.keys(db).forEach( (modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
    // console.log('associate :>> ', modelName);
  }
})


// db.users = require('./User')(sequelize, DataTypes)
// db.comments = require('./Comment')(sequelize, DataTypes)
// db.tags = require('./Tag')(sequelize, DataTypes)
// db.articles = require('./Article')(sequelize, DataTypes)



// db.sequelize.sync({ force: false })
//   .then( () => {
//     console.log('re-sync done');
//   })
//   .catch( err => {
//   console.log('error :' +err);
//   })



module.exports = db