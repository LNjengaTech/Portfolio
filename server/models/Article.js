//Article.js model

const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true }, //Markdown text
  published: { type: Boolean, default: false },
  tags: [String]
}, { timestamps: true });

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;