// src/pages/Landing.jsx (Modernized)

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTerminal, FaGlobe } from 'react-icons/fa';

const Landing = () => {
  const navigate = useNavigate();
  const cliUrl = import.meta.env.VITE_CLI_URL;

  return (
    // Use the deep dark background with a subtle blue/slate gradient
    <div className="min-h-screen flex items-center justify-center bg-gray-950 relative overflow-hidden">
      {/* Animated background elements (Purple and Cyan glows) */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        {/* Purple Glow */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl animate-float"></div>
        {/* Cyan/Blue Glow */}
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center animate-fade-in">
          {/* Logo/Name */}
          <h1 className="text-6xl md:text-8xl font-bold mb-4">
            {/* Using the gradient-text class from index.css */}
            <span className="gradient-text">Lonnex</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12">
            Full Stack Developer & Cybersecurity Enthusiast
          </p>

          {/* Description */}
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-16">
            Choose your experience: Explore my work through a modern web interface 
            or dive into a unique terminal-based portfolio.
          </p>

          {/* Choice Buttons */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* GUI Portfolio Button (Purple/Primary Theme) */}
            <button
              onClick={() => navigate('/portfolio')}
              className="group relative overflow-hidden bg-gray-800/60 backdrop-blur-md border-2 border-purple-600/30 rounded-2xl p-8 text-left hover:border-purple-600 transition-all duration-300 transform hover:-translate-y-1 shadow-2xl shadow-purple-900/20"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <FaGlobe className="text-5xl text-purple-400" />
                  <span className="text-sm text-purple-400 font-semibold px-3 py-1 bg-purple-900/50 rounded-full border border-purple-600/50">
                    Recommended
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">GUI Portfolio</h3>
                <p className="text-gray-400 mb-6">
                  A beautiful, modern web interface showcasing my projects, skills, and experience.
                </p>
                <div className="flex items-center text-purple-400 font-semibold">
                  <span>Explore Now</span>
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              {/* Subtle hover overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>

            {/* CLI Portfolio Button (Cyan/Terminal Theme) */}
            <button
              onClick={() => window.location.href = cliUrl || '/cli'}
              className="group relative overflow-hidden bg-gray-800/60 backdrop-blur-md border-2 border-cyan-600/30 rounded-2xl p-8 text-left hover:border-cyan-600 transition-all duration-300 transform hover:-translate-y-1 shadow-2xl shadow-cyan-900/20"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <FaTerminal className="text-5xl text-cyan-400" />
                  <span className="text-sm text-cyan-400 font-semibold px-3 py-1 bg-cyan-900/50 rounded-full border border-cyan-600/50">
                    For Developers
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">CLI Portfolio</h3>
                <p className="text-gray-400 mb-6">
                  An interactive terminal experience. Type commands to explore my work like a true dev.
                </p>
                <div className="flex items-center text-cyan-400 font-semibold">
                  <span>Launch Terminal</span>
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              {/* Subtle hover overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </div>

          {/* Footer text */}
          <p className="text-gray-500 mt-16 text-sm">
            Both portfolios showcase the same projects with different experiences
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;