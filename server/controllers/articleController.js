const asyncHandler = require('express-async-handler');
const Article = require('../models/Article');
const cloudinary = require('../config/cloudinary');

// Helper to extract Cloudinary Public IDs from HTML content
const extractPublicIds = (htmlContent) => {
  const ids = [];
  // Regex to find Cloudinary URLs in <img> tags
  // Adjust 'portfolio/projects' if your folder name is different
  const regex = /res\.cloudinary\.com\/[^/]+\/image\/upload\/(?:v\d+\/)?(portfolio\/articles\/[^.]+)/g;
  let match;
  while ((match = regex.exec(htmlContent)) !== null) {
    ids.push(match[1]);
  }
  return ids;
};

// @desc    Upload image to Cloudinary
// @route   POST /api/articles/upload-image
// @access  Private/Admin
const uploadImage = asyncHandler(async (req, res) => {
  if (req.file) {
    res.json({ url: req.file.path });
  } else {
    res.status(400);
    throw new Error('Image upload failed');
  }
});



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
    content: content,
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

// @desc    Delete article & cleanup Cloudinary
// @route   DELETE /api/articles/:id
// @access  Private/Admin
const deleteArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (article) {
    // 1. Find all images in the content
    const publicIds = extractPublicIds(article.content);
    
    // 2. Delete images from Cloudinary
    if (publicIds.length > 0) {
      await Promise.all(
        publicIds.map(id => cloudinary.uploader.destroy(id))
      );
    }

    // 3. Delete article from DB
    await Article.deleteOne({ _id: article._id });
    res.json({ message: 'Article and associated images removed' });
  } else {
    res.status(404);
    throw new Error('Article not found');
  }
});
//Admin: Delete article
// const deleteArticle = asyncHandler(async (req, res) => {
//   const article = await Article.findById(req.params.id);
//   if (article) {
//     await Article.deleteOne({ _id: article._id });
//     res.json({ message: 'Article removed' });
//   } else {
//     res.status(404);
//     throw new Error('Article not found');
//   }
// });

module.exports = { getArticles, getArticleBySlug, getAllArticles, createArticle, updateArticle, deleteArticle, uploadImage};