const express = require('express')
const router = express.Router()

const profileController = require('../controllers/profile.controller')
const { verifyToken, getVerifiedUser } = require('../middlewares/authentication')


// get profile
router.get("/:username", verifyToken, getVerifiedUser, profileController.getProfile)

// follow user
router.post("/:username/follow", verifyToken, getVerifiedUser, profileController.toggleFollowUser)

// unfollow user
router.delete("/:username/follow", verifyToken, getVerifiedUser, profileController.toggleFollowUser)

module.exports = router