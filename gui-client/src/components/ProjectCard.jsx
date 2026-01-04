// src/components/ProjectCard.jsx

import React from 'react';
import { FaExternalLinkAlt, FaCode } from 'react-icons/fa';

const ProjectCard = ({ project }) => {
  //check if it's a full URL (Cloudinary) or a local path
  const imageUrl = project.imageUrl?.startsWith('http') 
    ? project.imageUrl 
    : `${import.meta.env.VITE_API_URL.replace('/api', '')}${project.imageUrl}`;

  //fallback for empty images
  const finalSrc = project.imageUrl ? imageUrl : 'https://via.placeholder.com/400x300';

  return (
    <div 
      className="glass rounded-xl overflow-hidden shadow-lg border border-gray-200
        transform hover:-translate-y-2 transition-all duration-500 card-hover"
      style={{ animation: 'var(--animation-slide-up)' }}
    >
      {/* Project Image/Media */}
      <div className="relative aspect-video bg-gray-100 dark:bg-purple-950/1 overflow-hidden">
        <img
          src={imageUrl}
          alt={project.title}
          className="w-full p-2 rounded-2xl h-full object-fit transition-transform duration-500 group-hover:scale-105"
        />
        {project.featured && (
          <span className="absolute top-3 right-3 bg-purple-600 text-white px-3 py-1 text-xs font-semibold rounded-full shadow-md">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400">
            {project.category}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">
            {project.terminalCommand}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1 mb-5">
          {project.technologies?.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded dark:bg-gray-700 dark:text-gray-300"
            >
              {tech}
            </span>
          ))}
          {project.technologies?.length > 4 && (
            <span className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded dark:bg-gray-700 dark:text-gray-300">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex gap-4 pt-3 border-t border-gray-200 dark:border-gray-700">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors text-sm font-semibold"
            >
              <FaExternalLinkAlt />
              Live Demo
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors text-sm font-semibold"
            >
              <FaCode />
              Repository
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;