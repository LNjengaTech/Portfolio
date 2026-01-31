//pages/Articles.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listArticles } from '../redux/actions/articleActions';
import { Link } from 'react-router-dom';

const Articles = () => {
  const dispatch = useDispatch();
  const { articles, loading, error } = useSelector((state) => state.articleList);

  useEffect(() => {
    dispatch(listArticles());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">Published Articles</h1>
      <Link to="/portfolio" className='px-4 w-30 mb-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-semibold shadow-md flex items-center'>BACK HOME</Link>
      {loading ? <div>Loading...</div> : error ? <div>{error}</div> : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link key={article._id} to={`/articles/${article.slug}`} className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-xl">
              <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{article.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">published: {new Date(article.createdAt).toLocaleDateString()}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Articles;