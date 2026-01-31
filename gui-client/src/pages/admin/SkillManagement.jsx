// src/components/admin/SkillManagement.jsx

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listSkills, createSkill, updateSkill, deleteSkill } from '../../redux/actions/skillActions';
import { SKILL_CREATE_RESET, SKILL_UPDATE_RESET } from '../../redux/constants/skillConstants';

const SkillManagement = () => {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    level: 0,
    icon: '',
    category: '',
  });

  const { skills, loading, error } = useSelector((state) => state.skillList);
  const { success: createSuccess, error: createError } = useSelector((state) => state.skillCreate);
  const { success: updateSuccess, error: updateError } = useSelector((state) => state.skillUpdate);
  const { success: deleteSuccess } = useSelector((state) => state.skillDelete);

  const resetForm = () => {
    setFormData({
      name: '',
      level: 0,
      icon: '',
      category: '',
    });
    setEditMode(false);
    setCurrentSkill(null);
  };

  useEffect(() => {
    dispatch(listSkills());

    if (createSuccess || updateSuccess) {
      setShowModal(false);
      resetForm();
      dispatch({ type: SKILL_CREATE_RESET });
      dispatch({ type: SKILL_UPDATE_RESET });
      dispatch(listSkills());
    }

    if (deleteSuccess) {
      dispatch(listSkills());
    }
  }, [dispatch, createSuccess, updateSuccess, deleteSuccess]);

  const handleOpenModal = (skill = null) => {
    if (skill) {
      setEditMode(true);
      setCurrentSkill(skill);
      setFormData({
        name: skill.name,
        level: skill.level,
        icon: skill.icon,
        category: skill.category,
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
    const value = e.target.type === 'number' ? parseInt(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editMode) {
      dispatch(updateSkill(currentSkill._id, formData));
    } else {
      dispatch(createSkill(formData));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      dispatch(deleteSkill(id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Skill Management</h1>
        <button onClick={() => handleOpenModal()} className="px-4 py-2 bg-primary-500 text-white font-semibold rounded hover:bg-primary-600 transition-colors">
          + Add Skill
        </button>
      </div>

      {/* Error Messages */}
      {(createError || updateError || error) && <div className="mb-4 p-4 bg-red-500/10 border border-red-500 rounded text-red-400">{createError || updateError || error}</div>}

      {/* Skills Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills?.map((skill) => (
            <div key={skill._id} className="glass rounded-xl overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-2">{skill.name}</h3>
                <p className="text-slate-400 text-sm mb-3">Category: {skill.category}</p>
                <p className="text-slate-400 text-sm mb-3">Level: {skill.level}%</p>
                <p className="text-slate-400 text-sm mb-3">Icon: {skill.icon}</p>
                <div className="flex gap-2">
                  <button onClick={() => handleOpenModal(skill)} className="flex-1 px-3 py-2 bg-primary-500/10 border border-primary-500/30 rounded text-primary-400 hover:bg-primary-500/20 transition-colors text-sm">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(skill._id)} className="flex-1 px-3 py-2 bg-red-500/10 border border-red-500/30 rounded text-red-400 hover:bg-red-500/20 transition-colors text-sm">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {(!skills || skills.length === 0) && !loading && <div className="text-center py-20 text-slate-400">No skills found. Create your first skill!</div>}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 max-w-3xl w-full my-8">
            <h2 className="text-2xl font-bold text-white mb-6">{editMode ? 'Edit Skill' : 'Add New Skill'}</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2 text-sm">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 text-sm">Level (0-100) *</label>
                  <input
                    type="number"
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    required
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-primary-500"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2 text-sm">Icon (e.g., FaReact)</label>
                  <input
                    type="text"
                    name="icon"
                    value={formData.icon}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 text-sm">Category *</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-primary-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 py-3 bg-primary-500 text-white font-semibold rounded hover:bg-primary-600 transition-colors">
                  {editMode ? 'Update Skill' : 'Create Skill'}
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

export default SkillManagement;