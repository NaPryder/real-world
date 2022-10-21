const express = require('express')
const router = express.Router()

const { verifyToken, getVerifiedUser } = require('../middlewares/authentication')

const articleController = require('../controllers/article.controller')

// root /api/articles 

// Create Article
router.post('/', verifyToken, getVerifiedUser, articleController.createArticle)

// List Articles
router.get('/', verifyToken, getVerifiedUser, articleController.getMultipleArticle)

// Feed articles
router.get('/feed', verifyToken, getVerifiedUser, articleController.getFeedArticle)

// Get Single Article
router.get('/:slug', articleController.getSingleArticle)

// Update Article
router.put('/:slug', verifyToken, getVerifiedUser, articleController.updateArticle)

// Delete Article
router.delete('/:slug', verifyToken, getVerifiedUser, articleController.deleteArticle)



// Favorite Article
router.post('/:slug/favorite', verifyToken, getVerifiedUser, articleController.toggleFavoriteArticle)

// Unfavorite Article
router.delete('/:slug/favorite', verifyToken, getVerifiedUser, articleController.toggleFavoriteArticle)



// Add Comment
router.post('/:slug/comments', verifyToken, getVerifiedUser, articleController.addComment)

// Get Multiple Comments
router.get('/:slug/comments', verifyToken, getVerifiedUser, articleController.getMultipleComments)

// Delete Comment
router.delete('/:slug/comments/:id', verifyToken, getVerifiedUser, articleController.deleteComment)


module.exports = router
