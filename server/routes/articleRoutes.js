//articleRoutes.js

const express = require('express');
const router = express.Router();
const { getArticles, getArticleBySlug, getAllArticles, createArticle, updateArticle, deleteArticle } = require('../controllers/articleController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getArticles); // Public published
router.get('/all', protect, getAllArticles); // Admin all
router.get('/:slug', getArticleBySlug); // Public by slug
router.post('/', protect, createArticle);
router.route('/:id').put(protect, updateArticle).delete(protect, deleteArticle);

module.exports = router;