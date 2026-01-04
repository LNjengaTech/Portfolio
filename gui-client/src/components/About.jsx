// src/components/About.jsx

import React from 'react';
import { FaCode, FaLightbulb, FaRocket } from 'react-icons/fa';

const About = () => {
  const highlights = [
    {
      icon: <FaCode />,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable, and efficient code is my passion.',
    },
    {
      icon: <FaLightbulb />,
      title: 'Problem Solver',
      description: 'I love tackling complex challenges and finding elegant solutions.',
    },
    {
      icon: <FaRocket />,
      title: 'Fast Learner',
      description: 'Always exploring new technologies and staying ahead of the curve.',
    },
  ];

  return (
    <section id="about" className="section-padding bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            About <span className="text-purple-600 dark:text-purple-400">Me</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Get to know me better</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image/Visual - Using a border gradient effect */}
          <div className="relative">
            <div className="p-1 rounded-2xl overflow-hidden shadow-2xl 
              bg-linear-to-br from-purple-500/20 to-blue-500/20 dark:from-purple-500/50 dark:to-cyan-500/50">
              <img
                src="/profile.png"
                alt="Profile"
                className="min-w-75 min-h-75 object-fit rounded-xl"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/500/4c1d95/f3f4f6?text=Your+Photo';
                }}
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              I'm a Full Stack Developer based in<span className="text-purple-600 dark:text-purple-400"> Mombasa, Kenya</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6 leading-relaxed">
              With over 2 years of experience in web & system development, I specialize in building 
              modern, responsive applications using the latest technologies. My journey in 
              tech started with a curiosity about how things work, and it has evolved into 
              a passion for creating digital solutions that make a difference.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed">
              I believe in continuous learning and staying updated with industry trends. 
              When I'm not coding, you can find me contributing to open source, writing 
              technical articles, or exploring new frameworks.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div>
                <h4 className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">10+</h4>
                <p className="text-gray-600 dark:text-gray-400">Projects & Collabs</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">2+</h4>
                <p className="text-gray-600 dark:text-gray-400">Years Exp</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">70+</h4>
                <p className="text-gray-600 dark:text-gray-400">Commits</p>
              </div>
            </div>

            <a
              href="/Resume.pdf"
              download="Lonnex_Resume.pdf"
              className="inline-block px-8 py-3 text-lg font-semibold rounded-lg shadow-lg 
                bg-purple-600 text-white hover:bg-purple-700 
                dark:bg-purple-500 dark:hover:bg-purple-600 dark:shadow-purple-500/50 
                transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Download Resume
            </a>
          </div>
        </div>

        {/* Highlights - New card style */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 
                bg-white dark:bg-gray-800 transition-all duration-300 
                hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-700/20"
            >
              <div className="text-4xl text-purple-600 dark:text-purple-400 mb-4">{item.icon}</div>
              <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{item.title}</h4>
              <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;