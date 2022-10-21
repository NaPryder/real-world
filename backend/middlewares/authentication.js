const jwt = require('jsonwebtoken')
const { Error } = require('sequelize')
require('dotenv').config()
const db = require('../models/index')
const User = db.User

const signToken = async (email, username) => {
  return await jwt.sign(
    {email: email, username:username},
    process.env.SECRET_TOKEN,
    // {
    //   expiresIn: "1h"
    // }
  )
}


const verifyToken = async (req, res, next) => {
  try {
    const tokenText = req.headers.authorization

    // Validate token headers
    if (!tokenText) throw new SyntaxError("Token missing")

    // Verify token
    const token = tokenText.split(" ")[1]
    console.log('found token :>> ', token);
    if (!token) throw new SyntaxError("Token missing")
    
    const decoded = await jwt.verify(token, process.env.SECRET_TOKEN);
    
    // User is verified
    req.headers.email = decoded.email
    
    // res.json(req.headers)
    next()

  } catch (err) {
    next(err);
  }
}

const getVerifiedUser = async (req, res, next) => {
  try {
    // Validate email headers
    if (!req.headers.email) throw new FieldRequireError("email")

    const verifiedUser = await User.findOne(
      {
        where:{ email: req.headers.email }
      }
    )
    
    if(!verifiedUser) throw new Error("Not found email")

    req.verifiedUser = verifiedUser
    next()

  } catch (error) {
    next(error)
  }
}

module.exports = {
  signToken,
  verifyToken,
  getVerifiedUser,
}