const db = require('../models/index')
const Tag = db.Tag

const getTags = async (req, res, next) => {
  try {
    // Get tags
    let tags = await Tag.findAll()

    // Get tag name
    tags = tags.map((tag)=> tag.name)
    
    res.status(200).json({tags})
  } catch (error) {
    next(error)
    
  }
}

module.exports = {
  getTags,
}