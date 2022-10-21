
const db = require('../models/index')
const Tag = db.Tag

// see every method in instance
const getMethods = (obj) => {
  let properties = new Set()
  let currentObj = obj
  do {
    Object.getOwnPropertyNames(currentObj).map(item => properties.add(item))
  } while ((currentObj = Object.getPrototypeOf(currentObj)))
  return [...properties.keys()].filter(item => typeof obj[item] === 'function')
}

const getSlug = (title) =>  title.trim().toLowerCase().replace(/\W|_/g, "-")


const addAllTags = async (newTagList, article) => {
  // // to remove
  // await article.setTaglist([])

  // to add
  for(const tag of newTagList) {
    // adding new tag
    if (tag.trim() === "") continue
    const tagDB = await Tag.findByPk(tag.trim())

    // Check tag exist in DB
    if (tagDB) await article.addTaglist(tagDB)
    else  {
      // Create new tag
      newTag = await Tag.create({ name: tag.trim()})
      await article.addTaglist(newTag)
    }
  }



}


const getTagname = async (article) => {
  const taglist = await article.getTaglist()
  return taglist.map((tag)=> tag.name)
}

const assignMultipleArticle = async (articles, verifiedUser) => {
  // add taglist, favorited, favoritesCount object to each article from articles.rows
  for (const article of articles.rows) {

    // Get taglist
    article.dataValues.taglist = await getTagname(article)
    
    // Get favorited (True or False)
    article.dataValues.favorited = await article.hasFavorites(verifiedUser ? verifiedUser : null)

    // Get count favorites
    article.dataValues.favoritesCount = await article.countFavorites()
  }
}

module.exports = {
  getSlug,
  getMethods,
  addAllTags,
  assignMultipleArticle,
}