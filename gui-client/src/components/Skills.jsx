// src/components/Skills.jsx

import React from 'react';
import {
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaPython,
  FaDocker,
  FaGitAlt,
} from 'react-icons/fa';
import {
  SiMongodb,
  SiTypescript,
  SiExpress,
  SiTailwindcss,
  SiJavascript,
  SiPostgresql,
  SiRedis,
  SiMysql,
  SiNextdotjs,
  SiRedux,
  SiLaravel,
  SiAmazon,
  SiAmazonwebservices
} from 'react-icons/si';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React', icon: <FaReact />, level: 96 },
        { name: 'JavaScript', icon: <SiJavascript />, level: 85 },
        { name: 'TypeScript', icon: <SiTypescript />, level: 96 },
        { name: 'Next.js', icon: <SiNextdotjs />, level: 96 },
        { name: 'Tailwind CSS', icon: <SiTailwindcss />, level: 95 },
        { name: 'Redux', icon: <SiRedux />, level: 30 },
      ],
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js', icon: <FaNodeJs />, level: 96 },
        { name: 'Express', icon: <SiExpress />, level: 90 },
        { name: 'Laravel', icon: <SiLaravel />, level: 85 },
        { name: 'Python', icon: <FaPython />, level: 50 },
      ],
    },
    {
      title: 'Database',
      skills: [
        { name: 'MongoDB', icon: <SiMongodb />, level: 95 },
        { name: 'PostgreSQL', icon: <SiPostgresql />, level: 70 },
        { name: 'MySQL', icon: <SiMysql />, level: 80 },
        { name: 'Redis', icon: <SiRedis />, level: 25 },
      ],
    },
    {
      title: 'Tools & DevOps',
      skills: [
        { name: 'Docker', icon: <FaDocker />, level: 75 },
        { name: 'Git', icon: <FaGitAlt />, level: 90 },
        { name: 'REST APIs', icon: <FaDatabase />, level: 92 },
        { name: 'AWS', icon: <SiAmazonwebservices />, level: 20 },

      ],
    },
  ];

  return (
    <section id="skills" className="section-padding bg-white dark:bg-gray-950 transition-colors duration-500">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            My <span className="text-purple-600 dark:text-purple-400">Skills</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Technologies I work with</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <div 
              key={index} 
              // Theme adapted card styling
              className="p-6 rounded-xl border border-gray-200 dark:border-purple-900/50 
                bg-gray-50 dark:bg-gray-800 transition-all duration-300 
                hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-700/30"
            >
              <h3 className="text-xl font-bold mb-6 text-purple-600 dark:text-purple-400 border-b border-gray-200 dark:border-gray-700 pb-3">
                {category.title}
              </h3>
              <div className="space-y-6">
                {category.skills.map((skill, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl text-purple-600 dark:text-purple-400">
                          {skill.icon}
                        </span>
                        <span className="font-medium text-gray-800 dark:text-gray-200">{skill.name}</span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        // Dynamic gradient progress bar
                        className="h-full bg-linear-to-r from-purple-500 to-cyan-500 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;