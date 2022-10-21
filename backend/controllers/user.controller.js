const { encryptPassword, decryptPassword } = require('../utils/encrypt-decrypt')
const { signToken } = require('../middlewares/authentication')
const db = require('../models/index')
const User = db.User
const { FieldRequireError, EmailRegisteredError, DataNotFoundError, InvalidDataError, ForbidenError} = require("../utils/Errors")

// Register
const register = async (req, res, next) => {
  // No authentication required, returns a User
  // Required fields: email, username, password
  try {
    const { user }  = req.body 
    // Validate body
    if (!user.username) throw new FieldRequireError("username")
    else if (!user.email) throw new FieldRequireError("email")
    else if (!user.password) throw new FieldRequireError("password")
    
    // Check existed user
    const existedUser = await User.findOne({
      where: {email: user.email}
    })
    if (existedUser) throw new EmailRegisteredError(user.email)

    // Create new user
    const userInfo = {
      email: user.email,
      username: user.username,
      bio: user.bio || "",
      image: user.image || "",
      password: await encryptPassword(user.password)
    }
    const newUser = await User.create(userInfo)
    
    // Assign token
    const token = await signToken(user.email, user.username)

    res.status(200).json({user: newUser, token})

  } catch (error) {
    console.log('error :>> ', error);
    next(error)
  }
}


// Login
const login = async (req, res, next) => {
  // No authentication required, returns a User
  // Required fields: email, password
  try {
    console.log('req.body :>> ', req.body);
    console.log('req :>> ', req.headers);
    const { user } = req.body

    // Validate body
    if (!(user.email && user.password)) throw new FieldRequireError("email/password")

    // Check existed user
    const existedUser = await User.findOne({
      where: {email: user.email}
    })

    // User does not exist
    if (!existedUser) throw new DataNotFoundError('email', 'please register') 

    const match = await decryptPassword(user.password, existedUser.password)
    if (!match) throw new InvalidDataError('email or password', 'please try again') 

    // Assign token
    const token = await signToken(user.email, existedUser.username)

    res.status(200).json({user: existedUser, token})

  } catch (error) {
    next(error)
  }

}


// Get Current User (verified user)
const getCurrentUser = async (req, res, next) => {
  // Authentication required, returns a User that's the current user
  try {
    
    let current = {}

    Object.keys(req.verifiedUser.dataValues).forEach((key) => {
      if (key!=="password") current[key] = req.verifiedUser.dataValues[key]
    })

    res.status(200).json({current})

  } catch (error) {
    next(error)
    
  }
}

// Update User
const updateUser = async (req, res, next) => {
  // Authentication required, returns the User
  // Accepted fields: email, username, password, newPassword, image, bio

  try {
    const { email } = req.headers
    const { user } = req.body
    const verifiedUser = req.verifiedUser.dataValues
    console.log('verifiedUser.email :>> ', verifiedUser.email);
    // Check authorize
    if (email !== verifiedUser.email) throw new ForbidenError()

    // Validate email & password
    if (!user.password) throw new FieldRequireError("password")

    // Validate password before update
    const match = await decryptPassword(user.password, verifiedUser.password)
    if (!match) throw new InvalidDataError('password', 'please try again')
    
    // Get user
    const updatingUser = await User.findOne(
      {
        where: {email: email},
        attributes: {exclude: ["username"]}
      }
    )
    if (!updatingUser) throw new DataNotFoundError(email, 'pleas login again')

    // Check email exists
    if (user.email) {

      // Check email exists
      const existedUser = await User.findOne({
        where: {email: user.email}
      })
      if (existedUser) throw new EmailRegisteredError(user.email)
      // email not exist
      updatingUser.dataValues.email = user.email
    }
    if (user.bio) updatingUser.dataValues.bio = user.bio
    if (user.image) updatingUser.dataValues.image = user.image
    
    // Get new password
    if (user.newPassword) updatingUser.dataValues.password = await encryptPassword(user.newPassword)

    // Update
    await updatingUser.save()

    return res.status(201).json({user: updatingUser})
    
  } catch (error) {
    next(error)
  }
}

module.exports = {
  register,
  login,
  getCurrentUser,
  updateUser,
}