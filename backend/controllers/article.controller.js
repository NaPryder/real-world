const db = require('../models/index')
const Article = db.Article
const Tag = db.Tag
const User = db.User
const Comment = db.Comment
const { FieldRequireError, DataNotFoundError, DataExistsError, ForbidenError} = require("../utils/Errors")
const { getSlug, addAllTags, assignMultipleArticle } = require('../utils/util')

const includeOptions = [
  { 
    model: Tag, 
    as: "taglist", 
    attributes: ["name" ] 
  },
  { 
    model: User, 
    as: "author", 
    attributes: { exclude: ["email"] } 
  },
];


// Favorite or Unfavorite Article
const toggleFavoriteArticle = async (req, res, next) => {
  /*
  POST -> Favorite
  DELETE -> Unfavorite
  
  Authentication required, returns the Article
  No additional parameters required
  */
  
  try {
    const verifiedUser = req.verifiedUser
    const { slug } = req.params

    const article = await Article.findOne(
      {
        where: {slug : slug},
        include: includeOptions
      }
    )

    if (!article) throw new DataNotFoundError(`article slug: ${slug}`)

    if (req.method==="POST") await article.addFavorites(verifiedUser)
    else if (req.method==="DELETE") await article.removeFavorites(verifiedUser)
    else throw new ForbidenError()
      
    // Get taglist name
    article.dataValues.taglist = article.taglist.map((tag)=> tag.name)

    // Get favorite
    article.dataValues.favorited = await article.hasFavorites(verifiedUser ? verifiedUser : null)

    // Get count favorites
    article.dataValues.favoritesCount = await article.countFavorites()

    res.status(200).json({article})

  } catch (error) {
    next(error)
    
  }
}

// Get Single Article
const getSingleArticle = async (req, res, next) => {
  try {
    const slug  = req.params.slug
    const verifiedUser = req.verifiedUser

    const article = await Article.findOne(
      {
        where: { slug: slug },
        include: includeOptions
      }
    )
    if (!article) throw new DataNotFoundError(`article slug: ${slug}`)
    
    // Get tag name
    article.dataValues.taglist = article.taglist.map((tag)=> tag.name)

    // Get favorited (True or False)
    article.dataValues.favorited = await article.hasFavorites(verifiedUser ? verifiedUser : null)

    // Get count favorites
    article.dataValues.favoritesCount = await article.countFavorites()
    res.status(200).json({ article })
    
  } catch (error) {
    next(error)
  }
}

// Get Multiple Article - with filter in query
const getMultipleArticle = async (req, res, next) => {
  /* 
  Returns most recent articles globally by default, provide tag, author or favorited query parameter to filter results
  Query Parameters:
    Filter by tag: ?tag=AngularJS
    Filter by author: ?author=jake
    Favorited by user: ?favorited=jake
    Limit number of articles (default is 20): ?limit=20
    Offset/skip number of articles (default is 0): ?offset=0
  Authentication optional, will return multiple articles, ordered by most recent first
  */
  try {
    const verifiedUser = req.verifiedUser

    const { tag, author, favorited, limit=20, offset=0 } = req.query

    const option = {
      include: [
        {
          model: User,
          as: "author",
          attributes: {exclude: ["email"]},
          // where: { username: author } ,
          ...(author && { where: { username: author } }),
        },
        {
          model: Tag,
          as: 'taglist',
          attributes: ["name"],
          // where: {name: tag},
          ...(tag && { where: {name: tag}}),
        }
      ],
      limit: Number.parseInt(limit),
      offset: Number.parseInt(offset),
      order: [
        ["createdAt", "DESC"]
      ]
    }

    let articles = {rows: [], count: 0}
    if (favorited) {
      // Find favorite user
      const user = await User.findOne(
        {
          where: {username: favorited}
        }
      )
      
      if (!user) throw new DataNotFoundError(`user ${favorited}`)
      // find article with favorited by user
      articles.rows = await user.getFavorites(option)
      articles.count = await user.countFavorites()

    }else {
      
      //get articles
      articles = await Article.findAndCountAll(option)
    }  

    // get each article favorite, taglist
    await assignMultipleArticle(articles)
    
    return res.json({ articles: articles.rows, articlesCount: articles.count})
  } catch (error) {
    next(error)
  }
}

// Feed Articles
const getFeedArticle = async (req, res, next) => {
  // Can also take limit and offset query parameters like List Articles
  // Authentication required, will return multiple articles created by followed users, ordered by most recent first.

  try {
    const verifiedUser = req.verifiedUser
    const { limit=20, offset=0 } = req.query
    
    // Get following
    const followings = await verifiedUser.getFollowing()
    const followingsId = followings.map((user)=> user.id)

    let articles = {rows: [], count: 0}
    articles = await Article.findAndCountAll(
      {
        include: includeOptions,
        limit: Number.parseInt(limit),
        offset: Number.parseInt(offset),
        order: [ ["createdAt", "DESC"] ],
        where: { userId: followingsId }
      }
    )
    
    // get each article favorite, taglist
    await assignMultipleArticle(articles)

    res.json({articles: articles.rows, articlesCount: articles.count})

  } catch (error) {
    next(error)
  }
}

// Create Article
const createArticle = async (req, res, next) => {
  // Authentication required, will return an Article
  // Required fields: title, description, body
  // Optional fields: tagList as an array of Strings
  
  try {
    const { article } = req.body
    const verifiedUser = req.verifiedUser
    const tagList = article.tagList || []
  
    // Validate fiields
    if (!article.title) throw new FieldRequireError("title")
    else if (!article.description) throw new FieldRequireError("description")
    else if (!article.body) throw new FieldRequireError("body")

    // Assign slug from title
    const slug = getSlug(article.title)
    
    // Check Article slug exists in DB
    const articleSlug = await Article.findOne({where: { slug: slug }})
    if (articleSlug) throw new DataExistsError(`Title ${title}`)

    // Create Article
    const articleInfo = {
      slug,
      title: article.title, 
      description: article.description,
      body: article.body,
    }
    const newArticle = await Article.create(articleInfo)

    // Optional add tagList
    await addAllTags(tagList, newArticle)
    
    // Set tag list
    newArticle.dataValues.tagList = tagList
    
    // Get favorite
    newArticle.dataValues.favorites = await newArticle.hasFavorites( verifiedUser? verifiedUser: null )
    
    // Get Count favorite
    newArticle.dataValues.favoritesCount = await newArticle.countFavorites()

    // Set author
    await newArticle.setAuthor(verifiedUser)
    newArticle.dataValues.author = verifiedUser
    
    res.status(201).json({ newArticle })
    
  } catch (error) {
    next(error)
  }
}

// Update Article
const updateArticle = async (req, res, next) => {
  // Authentication required, returns the updated Article
  // Optional fields: title, description, body
  // The slug also gets updated when the title is changed
  try {
    const  body  = req.body.article
    const  oldSlug  = req.params.slug
    const verifiedUser = req.verifiedUser

    // Find Article
    const article = await Article.findOne({
      where: {slug: oldSlug},
      include: includeOptions
    })
    if (!article) throw new DataNotFoundError(`Article slug ${oldSlug}`)

    // Check user authorization
    if (verifiedUser.dataValues.id !== article.author.dataValues.id) throw new ForbidenError()

    // Check optional fields
    if (body.title) {
      // Check Article slug exists in DB
      const slug = getSlug(body.title)
      const articleSlug = await Article.findOne({where: { slug: slug }})
      if (articleSlug) throw new DataExistsError(`Article slug ${slug}`)

      article.slug = slug
      article.title = body.title
    }
    if (body.description) article.description = body.description
    if (body.body) article.body = body.body
    
    if (body.tagList) {
      // Remove all tag
      await article.setTaglist([])

      // Add new tag
      await addAllTags(body.tagList, article)
    }
    
    // Clean new tags
    let newTags = await article.getTaglist()
    article.dataValues.taglist = newTags.map((tag) => tag.name)

    // Update updateInfo
    await article.save()

    res.status(201).json({ article })
  } catch (error) {
    next(error)
  }
}

// Delete Article
const deleteArticle = async (req, res, next) => {
  // Authentication required
try {
  const verifiedUser = req.verifiedUser
  const { slug } = req.params

  // Get article
  const article = await Article.findOne(
    {
      where: { slug: slug},
      include: includeOptions
    }
  )
  if (!article) throw new DataNotFoundError(`Article ${slug}`)

  // Validate authorization
  if (article.author.id !== verifiedUser.id) throw new ForbidenError()
  
  // Destroy
  await article.destroy()
  res.status(203).json({msg: { body: 'Article deleted successfully' }})

} catch (error) {
  next(error)
  
}
}


// Add Comment to an Article
const addComment = async (req, res, next) => {
  // Authentication required, returns the created Comment
  // Required field: body

  try {
    const verifiedUser = req.verifiedUser
    const { slug } = req.params
    const { body } = req.body.comment
    
    if (!body) throw new FieldRequireError('body')

    // Get article
    const article = await Article.findOne(
      {
        where: { slug: slug },
      }
    )
    if (!article) throw new DataNotFoundError(`Article ${slug}`)
    const commentInfo = {
      body,
      articleId: article.id,
      userId: verifiedUser.id,
    }

    const comment = await Comment.create(commentInfo)

    const following = await verifiedUser.hasFollower(verifiedUser ? verifiedUser: null)
    comment.dataValues.author = verifiedUser
    comment.dataValues.author.dataValues.following = following

    res.status(201).json({comment})

  } catch (error) {
    next(error)
    
  }
}

// TODO
// Get Multiples Comments
const getMultipleComments = async (req, res, next) => {
  // Authentication optional, returns multiple comments

  try {
    const verifiedUser = req.verifiedUser
    const { slug } = req.params

    const article = await Article.findOne(
      {
        where: { slug: slug },
      }
    )
    if (!article) throw new DataNotFoundError(`Article ${slug}`)
    
    // Get comments
    let comments = await article.getComments({
      attributes: {exclude: ["articleId"]}
    })
    
    for(const comment of comments) {
      const user = await comment.getUser(
        { 
          attributes: { exclude: ["email"] }
        }
      )

      // get following 
      user.dataValues.following = await user.hasFollower(verifiedUser ? verifiedUser: null)
      comment.dataValues.author = user
    }

    res.status(201).json({comments})

  } catch (error) {
    next(error)
    
  }
}

// Delete Comment
const deleteComment = async (req, res, next) => {
  try {
    const verifiedUser = req.verifiedUser
    const { slug, id } = req.params

    // Get comment by id
    const comment = await Comment.findByPk(id.trim())
    if (!comment) throw new DataNotFoundError(`Comment id ${id}`)

    // Validate authorization
    if (comment.userId !== verifiedUser.id) throw new ForbidenError()
    
    // Delete comment
    await comment.destroy()

    res.status(203).json({msg: { body: 'Comment deleted successfully' }})

  } catch (error) {
    next(error)
    
  } 
}

module.exports = {
  createArticle,
  updateArticle,
  getSingleArticle,
  getMultipleArticle,
  toggleFavoriteArticle,
  getFeedArticle,
  deleteArticle,
  addComment,
  getMultipleComments,
  deleteComment,
}