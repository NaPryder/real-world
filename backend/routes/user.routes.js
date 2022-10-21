const express = require('express')
const router = express.Router()

const { verifyToken, getVerifiedUser } = require('../middlewares/authentication')
const userController = require('../controllers/user.controller')

// root /api => users path
router.post('/users/register', userController.register)

router.post('/users/login', userController.login)


// root /api => user path
//get current user
router.get('/user', verifyToken, getVerifiedUser, userController.getCurrentUser)

// update user
router.put('/user', verifyToken, getVerifiedUser, userController.updateUser)


module.exports = router