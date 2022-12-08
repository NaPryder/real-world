const express = require('express')
const cors = require('cors')
require("dotenv").config()
const { errorHandler } = require('./middlewares/errorHandler')
const { setProxy } = require('./middlewares/proxy')
const { sequelize } = require('./models')

const usersRoute = require('./routes/user.routes')
const profilesRoute = require('./routes/profile.routes')
const articlesRoute = require('./routes/article.route')
const tagRoute = require('./routes/tag.route')

const app = express()
const PORT = process.env.NODE_LOCAL_PORT || 3000


const syncDB = async () => {
  try {
    await sequelize.sync( { alter: true } )
    console.log('re-sync done');
    
  } catch (error) {
    console.log('error :', error);
  }
}
syncDB()

// Application Middlewares
app.use(cors({
  origin: 'http://127.0.0.1:5173'
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Error Midleware
app.use(errorHandler)
app.use(setProxy)

// Routes
app.use('/api', usersRoute)
app.use('/api/profiles', profilesRoute)
app.use('/api/articles', articlesRoute)
app.use('/api/tags', tagRoute)




// Run server
app.listen(PORT, ()=> {
  console.log(`Start running ${PORT}`)
})