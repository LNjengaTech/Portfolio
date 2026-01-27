const asyncHandler = require('express-async-handler');
const Article = require('../models/Article');

//Public: Get all published articles
const getArticles = asyncHandler(async (req, res) => {
  const articles = await Article.find({ published: true }).sort({ createdAt: -1 });
  res.json(articles);
});

//Public: Get single article by slug
const getArticleBySlug = asyncHandler(async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug, published: true });
  if (article) {
    res.json(article);
  } else {
    res.status(404);
    throw new Error('Article not found');
  }
});

//Admin: Get all articles (including drafts)
const getAllArticles = asyncHandler(async (req, res) => {
  const articles = await Article.find({}).sort({ createdAt: -1 });
  res.json(articles);
});

//Admin: Create article
const createArticle = asyncHandler(async (req, res) => {
  const { title, content, published, tags } = req.body;
  if (!title || !content) {
    res.status(400);
    throw new Error('Missing required fields');
  }
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const existing = await Article.findOne({ slug });
  if (existing) {
    res.status(400);
    throw new Error('Slug already in use');
  }
  const article = new Article({
    title,
    slug,
    content,
    published: published || false,
    tags: tags || []
  });
  const createdArticle = await article.save();
  res.status(201).json(createdArticle);
});

//Admin: Update article
const updateArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (article) {
    article.title = req.body.title || article.title;
    if (req.body.title) {
      article.slug = req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    }
    article.content = req.body.content || article.content;
    article.published = req.body.published !== undefined ? req.body.published : article.published;
    article.tags = req.body.tags || article.tags;
    const updatedArticle = await article.save();
    res.json(updatedArticle);
  } else {
    res.status(404);
    throw new Error('Article not found');
  }
});

//Admin: Delete article
const deleteArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (article) {
    await Article.deleteOne({ _id: article._id });
    res.json({ message: 'Article removed' });
  } else {
    res.status(404);
    throw new Error('Article not found');
  }
});

module.exports = { getArticles, getArticleBySlug, getAllArticles, createArticle, updateArticle, deleteArticle };