// src/components/Projects.jsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProjects } from '../redux/actions/projectActions';
import ProjectCard from './ProjectCard';

const Projects = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('all');

  const { projects, loading, error } = useSelector((state) => state.projectList);

  useEffect(() => {
    dispatch(listProjects());
  }, [dispatch]);

  const categories = ['all', 'Web', 'Mobile', 'Desktop', 'API', 'Other'];

  const filteredProjects =
    filter === 'all'
      ? (projects || [])
      : (projects || []).filter((p) => p.category === filter);

  return (
    <section id="projects" className="section-padding bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Featured <span className="text-purple-600 dark:text-purple-400">Projects</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
            A selection of my recent work, showcasing a blend of design and functionality.
          </p>

          {/* Filter Buttons - Styled for high contrast */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-5 py-2 text-sm rounded-full font-medium transition-all duration-300 border 
                  ${
                    filter === category
                      ? 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-500/30 dark:bg-purple-500 dark:border-purple-500'
                      : 'bg-transparent border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="spinner"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 dark:text-red-400 py-20">{error}</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects?.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}

        {filteredProjects && filteredProjects.length === 0 && !loading && (
          <div className="text-center text-gray-500 py-20">
            No projects found in this category.
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;