//pages/ArticleDetail.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getArticleBySlug } from '../redux/actions/articleActions';
import DOMPurify from 'dompurify';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'; // dark theme
import { FaArrowLeft, FaSun, FaMoon, } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

const ArticleDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { article, loading, error } = useSelector((state) => state.articleDetails);

  //get theme state and toggle function from context
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    dispatch(getArticleBySlug(slug));
    window.scrollTo(0, 0);
  }, [dispatch, slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="text-xl text-purple-400 animate-pulse">Loading...</div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 p-8">
        <h2 className="text-3xl font-bold text-red-400 mb-6">{error || 'Article not found'}</h2>
        <Link to="/articles" className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
          <FaArrowLeft className="mr-2" />
          Back to Articles
        </Link>
      </div>
    );
  }

  //Function to render content with highlighted code blocks
  const renderHighlightedContent = (htmlContent) => {
    const container = document.createElement('div');
    container.innerHTML = DOMPurify.sanitize(htmlContent);

    //find all code blocks
    const codeBlocks = container.querySelectorAll('pre.ql-syntax');
    codeBlocks.forEach((block) => {
      const language = block.getAttribute('data-language') || 'javascript'; //Quill adds class like ql-syntax
      const codeText = block.innerText;

      //create highlighted version
      const highlighted = (
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          customStyle={{
            margin: '1.5rem 0',
            borderRadius: '0.75rem',
            background: '#0f172a',
            padding: '1.25rem',
          }}
          showLineNumbers
        >
          {codeText}
        </SyntaxHighlighter>
      );

      //replace original block with React component placeholder
      //Since can't directly insert React into DOM,use a wrapper approach
      block.outerHTML = `<div class="code-highlight-placeholder">${codeText}</div>`;
    });

    //this is a limitation — better to use dangerouslySetInnerHTML + CSS
    //for full replacement, i will definitely need a more advanced parser.
    //simplest reliable way: keep Quill HTML and style with CSS + add language class
    return htmlContent;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-0">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <Link to="/articles" className="inline-flex items-center text-purple-400 hover:text-purple-300">
            <FaArrowLeft className="mr-2" />
            Back to Articles
          </Link>
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1 text-sm p-2 rounded-full text-purple-600 dark:text-purple-400 bg-gray-200 dark:bg-gray-700 transition-colors"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? "light mode" : "dark mode"}
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        <article className="p-4 md:p-12 prose prose-invert max-w-none">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-6">{article.title}</h1>
          <div className='flex items-center gap-3 mb-10'>
            <div className='w-10! h-10! rounded-full overflow-hidden border border-gray-200 shadow-sm ring-1 ring-gray-50 ring-offset-2 shrink-0'>
              <img src="/profilepic.png" className='w-full! h-full! object-cover! object-center! hover:scale-110! transition-transform duration-300 m-0!'/>
            </div>
            
            <div className='flex flex-col'>
              <Link to='https://lonnex.vercel.app' className='text-sm font-bold dark:text-white! text-gray-400! no-underline! hover:underline!'>Lonnex Njenga</Link>
              <div className="flex items-center gap-4 text-gray-400 text-sm">
                <time>{new Date(article.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                {article.tags?.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {article.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-gray-900 text-gray-300 rounded-full text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/*Render Quill content */}
          <div
            className="
              prose prose-invert prose-lg
              prose-headings:text-white
              prose-a:text-purple-400 hover:prose-a:underline
              prose-pre:bg-gray-950 prose-pre:p-0 prose-pre:m-0
              prose-code:bg-transparent
            "
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(article.content, {
                ADD_TAGS: ['ol', 'ul', 'li', 'pre', 'code', 'div', 'span'], //explicitly allow lists
                ADD_ATTR: ['class', 'data-language'], //for code blocks
              }),
            }}
          />
        </article>
      </div>
    </div>
  );
};

export default ArticleDetail;
