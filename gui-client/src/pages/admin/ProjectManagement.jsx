import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProjects, createProject, updateProject, deleteProject, uploadProjectImage } from '../../redux/actions/projectActions';
import { PROJECT_CREATE_RESET, PROJECT_UPDATE_RESET, PROJECT_IMAGE_UPLOAD_RESET } from '../../redux/constants/projectConstants';
import { FaUpload, FaTrash, FaImage } from 'react-icons/fa';

const ProjectManagement = () => {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    detailedDescription: '',
    terminalCommand: '',
    technologies: '',
    liveUrl: '',
    repoUrl: '',
    imageUrl: '',
    images: '',
    featured: false,
    category: 'Web',
    completionDate: '',
    demoVideo: '',
  });

  const { projects, loading } = useSelector((state) => state.projectList);
  const { success: createSuccess, error: createError } = useSelector((state) => state.projectCreate);
  const { success: updateSuccess, error: updateError } = useSelector((state) => state.projectUpdate);
  const { success: deleteSuccess } = useSelector((state) => state.projectDelete);
  const { imageUrl: uploadedImageUrl } = useSelector((state) => state.projectImageUpload);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      detailedDescription: '',
      terminalCommand: '',
      technologies: '',
      liveUrl: '',
      repoUrl: '',
      imageUrl: '',
      images: '',
      featured: false,
      category: 'Web',
      completionDate: '',
      demoVideo: '',
    });
    setEditMode(false);
    setCurrentProject(null);
    setImagePreview(null);
  };

  useEffect(() => {
    dispatch(listProjects());

    if (createSuccess || updateSuccess) {
      setShowModal(false);
      resetForm();
      dispatch({ type: PROJECT_CREATE_RESET });
      dispatch({ type: PROJECT_UPDATE_RESET });
      dispatch(listProjects());
    }

    if (deleteSuccess) {
      dispatch(listProjects());
    }
  }, [dispatch, createSuccess, updateSuccess, deleteSuccess]);

  useEffect(() => {
    if (uploadedImageUrl) {
      setFormData((prev) => ({ ...prev, imageUrl: uploadedImageUrl }));
      setImagePreview(uploadedImageUrl);
      dispatch({ type: PROJECT_IMAGE_UPLOAD_RESET });
    }
  }, [uploadedImageUrl, dispatch]);

  const handleOpenModal = (project = null) => {
    if (project) {
      setEditMode(true);
      setCurrentProject(project);
      setFormData({
        title: project.title,
        description: project.description,
        detailedDescription: project.detailedDescription || '',
        terminalCommand: project.terminalCommand,
        technologies: project.technologies.join(', '),
        liveUrl: project.liveUrl || '',
        repoUrl: project.repoUrl || '',
        imageUrl: project.imageUrl || '',
        images: project.images?.join(', ') || '',
        featured: project.featured || false,
        category: project.category || 'Web',
        completionDate: project.completionDate ? new Date(project.completionDate).toISOString().split('T')[0] : '',
        demoVideo: project.demoVideo || '',
      });
      setImagePreview(project.imageUrl || null);
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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      //show preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      //upload image
      try {
        setUploadingImage(true);
        await dispatch(uploadProjectImage(file));
        setUploadingImage(false);
      } catch (error) {
        setUploadingImage(false);
        alert('Failed to upload image');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const projectData = {
      ...formData,
      technologies: formData.technologies.split(',').map((t) => t.trim()),
      images: formData.images ? formData.images.split(',').map((i) => i.trim()) : [],
    };

    if (editMode) {
      dispatch(updateProject(currentProject._id, projectData));
    } else {
      dispatch(createProject(projectData));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      dispatch(deleteProject(id));
    }
  };

  const apiUrl = import.meta.env.VITE_API_URL.replace('/api', '');

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Project Management</h1>
        <button onClick={() => handleOpenModal()} className="px-4 py-2 bg-primary-500 text-white font-semibold rounded hover:bg-primary-600 transition-colors">
          + Add Project
        </button>
      </div>

      {/*Error Messages */}
      {(createError || updateError) && <div className="mb-4 p-4 bg-red-500/10 border border-red-500 rounded text-red-400">{createError || updateError}</div>}

      {/*Projects Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects?.map((project) => (
            <div key={project._id} className="glass rounded-xl overflow-hidden hover:shadow-xl transition-shadow">
              {/*project image */}
              <div className="relative aspect-video bg-slate-700">
                <img
                  src={project.imageUrl ? (project.imageUrl.startsWith('http') ? project.imageUrl : `${apiUrl}${project.imageUrl}`) : 'https://via.placeholder.com/400x300/1e293b/0ea5e9?text=No+Image'}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                {project.featured && <span className="absolute top-2 right-2 bg-primary-500 text-white px-2 py-1 rounded text-xs font-semibold">Featured</span>}
              </div>

              {/*content */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-primary-400 px-2 py-1 bg-primary-500/10 rounded">{project.category}</span>
                  <span className="text-xs text-slate-500 font-mono">{project.terminalCommand}</span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                <p className="text-slate-400 text-sm mb-3 line-clamp-2">{project.description}</p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {project.technologies.slice(0, 3).map((tech, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 bg-slate-700 text-slate-300 rounded">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && <span className="text-xs px-2 py-1 bg-slate-700 text-slate-300 rounded">+{project.technologies.length - 3}</span>}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenModal(project)}
                    className="flex-1 px-3 py-2 bg-primary-500/10 border border-primary-500/30 rounded text-primary-400 hover:bg-primary-500/20 transition-colors text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="flex-1 px-3 py-2 bg-red-500/10 border border-red-500/30 rounded text-red-400 hover:bg-red-500/20 transition-colors text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {(!projects || projects.length === 0) && !loading && <div className="text-center py-20 text-slate-400">No projects found. Create your first project!</div>}

      {/*modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 max-w-3xl w-full my-8">
            <h2 className="text-2xl font-bold text-white mb-6">{editMode ? 'Edit Project' : 'Add New Project'}</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/*Image Upload */}
              <div>
                <label className="block text-white mb-2 text-sm font-medium">Project Image</label>
                <div className="flex items-start gap-4">
                  {/*Preview */}
                  <div className="w-40 h-40 bg-slate-700 rounded-lg overflow-hidden shrink-0">
                    {imagePreview ? (
                      <img
                        src={imagePreview.startsWith('data:image') || imagePreview.startsWith('http') ? imagePreview : `${apiUrl}${imagePreview}`}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500">
                        <FaImage className="text-4xl" />
                      </div>
                    )}
                  </div>

                  {/*Upload Button */}
                  <div className="flex-1">
                    <label className="cursor-pointer">
                      <div className="px-4 py-3 bg-slate-700 border-2 border-dashed border-slate-600 rounded-lg hover:border-primary-500 transition-colors text-center">
                        <FaUpload className="mx-auto text-2xl text-slate-400 mb-2" />
                        <span className="text-slate-300 text-sm">{uploadingImage ? 'Uploading...' : 'Click to upload image'}</span>
                        <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} className="hidden" />
                      </div>
                    </label>
                    <p className="text-slate-500 text-xs mt-2">Recommended: 1200x800px, max 5MB</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2 text-sm">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 text-sm">Terminal Command *</label>
                  <input
                    type="text"
                    name="terminalCommand"
                    value={formData.terminalCommand}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-primary-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white mb-2 text-sm">Short Description * (For cards)</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="2"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-white mb-2 text-sm">Detailed Description (For full view)</label>
                <textarea
                  name="detailedDescription"
                  value={formData.detailedDescription}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-primary-500"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2 text-sm">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-primary-500"
                  >
                    <option value="Web">Web</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Desktop">Desktop</option>
                    <option value="API">API</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white mb-2 text-sm">Completion Date</label>
                  <input
                    type="date"
                    name="completionDate"
                    value={formData.completionDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white mb-2 text-sm">Technologies (comma-separated)</label>
                <input
                  type="text"
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleChange}
                  placeholder="React, Node.js, MongoDB"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-primary-500"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2 text-sm">Live URL</label>
                  <input
                    type="url"
                    name="liveUrl"
                    value={formData.liveUrl}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 text-sm">Repository URL</label>
                  <input
                    type="url"
                    name="repoUrl"
                    value={formData.repoUrl}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white mb-2 text-sm">Demo Video URL (YouTube/Vimeo)</label>
                <input
                  type="url"
                  name="demoVideo"
                  value={formData.demoVideo}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-primary-500"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="w-4 h-4" />
                  <span className="text-white text-sm">Featured Project</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 py-3 bg-primary-500 text-white font-semibold rounded hover:bg-primary-600 transition-colors">
                  {editMode ? 'Update Project' : 'Create Project'}
                </button>
                <button type="button" onClick={handleCloseModal} className="flex-1 py-3 bg-slate-700 text-white rounded hover:bg-slate-600 transition-colors">
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

export default ProjectManagement;
