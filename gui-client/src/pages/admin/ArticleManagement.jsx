import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listAllArticles, createArticle, updateArticle, deleteArticle } from '../../redux/actions/articleActions';
import { ARTICLE_CREATE_RESET, ARTICLE_UPDATE_RESET } from '../../redux/constants/articleConstants';
import ReactQuill from 'react-quill-new';
import axios from 'axios';
import 'react-quill-new/dist/quill.snow.css';

const ArticleManagement = () => {
  const dispatch = useDispatch();

  //Ref to access the Quill editor instance
  const quillRef = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    published: false,
    tags: '',
  });

  const { articles, loading, error } = useSelector((state) => state.articleListAll);
  const { success: createSuccess, error: createError } = useSelector((state) => state.articleCreate);
  const { success: updateSuccess, error: updateError } = useSelector((state) => state.articleUpdate);
  const { success: deleteSuccess } = useSelector((state) => state.articleDelete);

  // Accessing user info for the upload authorization header
  const { userInfo } = useSelector((state) => state.userLogin);

  const [isUploading, setIsUploading] = useState(false);

  //Custom Image Handler for Cloudinary
  //1.Wrap the imageHandler in useCallback
  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const uploadData = new FormData();
      uploadData.append('image', file);

      try {
        setIsUploading(true); //start loading
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo?.token}`,
          },
        };

        //call the backend endpoint
        const { data } = await axios.post('/api/articles/upload-image', uploadData, config);

        const quill = quillRef.current.getEditor();
        const range = quill.getSelection();

        //insert the Cloudinary URL into the editor as an <img> tag
        quill.insertEmbed(range.index, 'image', data.url);
      } catch (err) {
        console.error('Image upload failed', err);
        alert('Failed to upload image. Please try again.');
      }finally{
        setIsUploading(false); //stop loading on success OR error
      }

    };
  }, [userInfo]);



  // Modules definition wrapped in useMemo to prevent re-renders re-initializing the editor
  //2.include imageHandler in the useMemo dependencies
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }], 
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'align': [] }], //adds Left, Center, Right, and Justify
          [{ list: 'ordered' }, { list: 'bullet' }], 
          ['link', 'image', 'blockquote', 'code-block'], 
          ['clean']],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    [imageHandler],
  ); //the compiler is happy now because imageHandler is stable

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      published: false,
      tags: '',
    });
    setEditMode(false);
    setCurrentArticle(null);
  };

  useEffect(() => {
    dispatch(listAllArticles());

    if (createSuccess || updateSuccess) {
      setShowModal(false);
      resetForm();
      dispatch({ type: ARTICLE_CREATE_RESET });
      dispatch({ type: ARTICLE_UPDATE_RESET });
      dispatch(listAllArticles());
    }

    if (deleteSuccess) {
      dispatch(listAllArticles());
    }
  }, [dispatch, createSuccess, updateSuccess, deleteSuccess]);

  const handleOpenModal = (article = null) => {
    if (article) {
      setEditMode(true);
      setCurrentArticle(article);
      setFormData({
        title: article.title,
        content: article.content || '',
        published: article.published,
        tags: article.tags?.join(', ') || '',
      });
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleContentChange = (value) => {
    setFormData({ ...formData, content: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const articleData = {
      ...formData,
      tags: formData.tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0),
    };

    if (editMode) {
      dispatch(updateArticle(currentArticle._id, articleData));
    } else {
      dispatch(createArticle(articleData));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this article? This will also remove associated images from Cloudinary.')) {
      dispatch(deleteArticle(id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Article Management</h1>
        <button onClick={() => handleOpenModal()} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
          + Add Article
        </button>
      </div>

      {(createError || updateError || error) && <div className="mb-6 p-4 bg-red-900/30 border border-red-500 rounded text-red-300">{createError || updateError || error}</div>}

      {loading ? (
        <div className="text-white">Loading...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles?.map((article) => (
            <div key={article._id} className="bg-gray-800 p-5 rounded-xl border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-2">{article.title}</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags?.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-purple-900/50 text-purple-300 text-xs rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <span className={`text-xs px-3 py-1 rounded-full ${article.published ? 'bg-green-900/50 text-green-300' : 'bg-yellow-900/50 text-yellow-300'}`}>
                {article.published ? 'Published' : 'Draft'}
              </span>
              <div className="flex gap-3 mt-4">
                <button onClick={() => handleOpenModal(article)} className="flex-1 py-2 bg-purple-600/30 text-purple-300 rounded">
                  Edit
                </button>
                <button onClick={() => handleDelete(article._id)} className="flex-1 py-2 bg-red-600/30 text-red-300 rounded">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6">{editMode ? 'Edit Article' : 'New Article'}</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-300 mb-2">Title</label>
                <input 
                  type="text" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded text-white" 
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Content</label>
                <div className="bg-white text-black rounded overflow-hidden flex flex-col" style={{ height: '600px' }}>
                  {/*loading overlay*/}
                  {isUploading && (
                    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
                      <div className="spinner mb-4"></div> {/*using the existing spinner class */}
                      <p className="text-white font-medium animate-pulse">
                        Uploading image, please wait...
                      </p>
                    </div>
                  )}
                  <ReactQuill 
                    ref={quillRef} 
                    theme="snow" 
                    value={formData.content} 
                    onChange={handleContentChange} 
                    modules={modules} 
                    className="flex flex-col h-full" 
                  />
                </div>
              </div>

              {/*added spacer to prevent the editor toolbar from overlapping tags on small screens */}
              <div className="pt-12 md:pt-14">
                <label className="block text-gray-300 mb-2">Tags (comma separated)</label>
                <input type="text" name="tags" value={formData.tags} onChange={handleChange} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded text-white" />
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" name="published" checked={formData.published} onChange={handleChange} />
                <label className="text-gray-300">Published</label>
              </div>

              <div className="flex gap-4">
                <button type="submit" className="flex-1 py-3 bg-purple-600 text-white rounded hover:bg-purple-700">
                  {editMode ? 'Update' : 'Create'}
                </button>
                <button type="button" onClick={handleCloseModal} className="flex-1 py-3 bg-gray-700 text-white rounded hover:bg-gray-600">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleManagement;
