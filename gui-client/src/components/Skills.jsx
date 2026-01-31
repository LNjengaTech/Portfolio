// src/components/Skills.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listSkills } from '../redux/actions/skillActions';
import * as Icons from 'react-icons/si'; // Import all from react-icons/si (or fa, etc., adjust as needed)
import * as FaIcons from 'react-icons/fa'; // For Fa* icons

const Skills = () => {
  const dispatch = useDispatch();
  const { skills, loading, error } = useSelector((state) => state.skillList);

  useEffect(() => {
    dispatch(listSkills());
  }, [dispatch]);

  // Icon map: Combine from different libraries
  const getIcon = (iconName) => {
    if (iconName.startsWith('Si')) {
      return Icons[iconName] || null;
    } else if (iconName.startsWith('Fa')) {
      return FaIcons[iconName] || null;
    }
    return null;
  };

  // Group skills by category
  const skillCategories = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="section-padding bg-white dark:bg-gray-950 transition-colors duration-500">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            My <span className="text-purple-600 dark:text-purple-400">Skills</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Technologies I work with</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="spinner"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 dark:text-red-400 py-20">{error}</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {Object.entries(skillCategories).map(([category, categorySkills], index) => (
              <div 
                key={index} 
                className="p-6 rounded-xl border border-gray-200 dark:border-purple-900/50 
                  bg-gray-50 dark:bg-gray-800 transition-all duration-300 
                  hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-700/30"
              >
                <h3 className="text-xl font-bold mb-6 text-purple-600 dark:text-purple-400 border-b border-gray-200 dark:border-gray-700 pb-3">
                  {category}
                </h3>
                <div className="space-y-6">
                  {categorySkills.map((skill, idx) => {
                    const IconComponent = getIcon(skill.icon);
                    return (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-2xs md:text-sm text-purple-600 dark:text-purple-400">
                              {IconComponent ? <IconComponent /> : null}
                            </span>
                            <span className="text-xs font-medium text-gray-800 dark:text-gray-200">{skill.name}</span>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                        </div>
                        {/* Progress Bar */}
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-linear-to-r from-purple-500 to-cyan-500 rounded-full transition-all duration-1000"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;