const db = require('../models/index')
const User = db.User
const { DataNotFoundError, ForbidenError }  = require('../utils/Errors')


// Follow user
const toggleFollowUser = async (req, res, next) => {
  // Authentication required, returns a Profile
  // No additional parameters required
  try {
    const { username } = req.params
    const verifiedUser = req.verifiedUser

    const profile = await User.findOne(
      {
        where: {username: username},
        attributes: { exclude: ["email", "password"] },
        // include: { model: User}
      }
    )
    if (!profile) throw new DataNotFoundError(`User ${username}`);

    // Follow or Unfollow
    if (req.method === 'POST') await profile.addFollower(verifiedUser)
    else if (req.method === 'DELETE') await profile.removeFollower(verifiedUser)
    else throw new ForbidenError()
    // return res.json(profile)

    profile.dataValues.following = await profile.hasFollower(
      verifiedUser ? verifiedUser: null
    )
    profile.dataValues.followingCount = await profile.countFollowers()
    // profile.dataValues.followingList = await profile.getFollowers()
    
    return  res.status(200).json({ profile })
    
  } catch (error) {
    next(error)
  }
}


// Get Profiles =>  /api/profiles/:username
const getProfile = async (req, res, next) => {
  // Authentication optional, returns a Profile
  try {
    const { username } = req.params
    const verifiedUser = req.verifiedUser

    const profile = await User.findOne(
      {
        where: {username: username},
        attributes: { exclude: ["email", "password"] },
      }
    )

    if (!profile) throw new DataNotFoundError(`User ${username}`)

    // Is verifiedUser is following profile user ?
    profile.dataValues.follow = await profile.hasFollower(verifiedUser ? verifiedUser: null)

    // Profile follower
    profile.dataValues.followerCount = await profile.countFollowers()
    
    // Profile following
    profile.dataValues.followingCount = await profile.countFollowing()
    res.status(200).json({ profile })

  } catch (error) {
    next(error)
  }
}


module.exports = {
  getProfile,
  toggleFollowUser,
}

