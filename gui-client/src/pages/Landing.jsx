// src/pages/Landing.jsx (Modernized)

import React from 'react';
import Antigravity from '../components/Antigravity';
import { useNavigate } from 'react-router-dom';
import { FaTerminal, FaGlobe, FaGithub, FaLinkedin, FaTwitter, FaInfo } from 'react-icons/fa';

const Landing = () => {
  const navigate = useNavigate();
  const cliUrl = import.meta.env.VITE_CLI_URL;

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <Antigravity
        count={300}
        magnetRadius={6}
        ringRadius={7}
        waveSpeed={0.4}
        waveAmplitude={1}
        particleSize={1.5}
        lerpSpeed={0.05}
        color="#6249c5"
        autoAnimate
        particleVariance={1}
        rotationSpeed={0}
        depthFactor={1}
        pulseSpeed={3}
        particleShape="capsule"
        fieldStrength={10}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
      />
      <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <header style={{ background: 'rgba(119, 119, 119, 0.1)', backdropFilter: 'blur(10px)', padding: '30px', width: '100%', maxWidth: '1000px', marginTop: '40px', borderRadius: '100px', textAlign: 'center', border: '1px solid rgba(119, 119, 119, 0.41)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: '#6249c5', borderRadius: '50%' }}></div>
            <span className="font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-blue-500 dark:from-purple-400 dark:to-cyan-400">
              Lonnex Njenga
            </span>
          </div>
          <nav style={{ display: 'flex', gap: '20px' }}>
            <a href="https://github.com/LNjengaTech" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-xl transition-colors">
                          <FaGithub />
                        </a>
            <a href="https://www.linkedin.com/in/lonnex-njenga-b4946336b" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-xl transition-colors">
                          <FaLinkedin />
                        </a>
            <a href="https://x.com/LonnexTech" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-xl transition-colors">
                          <FaTwitter />
                        </a>
          </nav>
        </header>
        <main style={{ flex: 1, padding: '20px', textAlign: 'center' }}>
        <div className="container-custom relative z-10 top-10 md:top-36">
        <div className="text-center animate-fade-in">
          <p className="hidden md:block text-xl md:text-2xl text-gray-400 mb-12">
            Full Stack Developer & Cybersecurity Enthusiast
          </p>

          <p className="text-lg font-bold text-gray-300 max-w-2xl mx-auto mb-4">
            Choose your experience:
          </p>

          <p className="hidden md:block text-lg text-gray-400 max-w-2xl mx-auto mb-16">
            Choose your experience: Explore my work through a modern web interface 
            or dive into a unique terminal-based portfolio.
          </p>

          {/* Choice Buttons */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* GUI Portfolio Button (Purple/Primary Theme) */}
            <button
              onClick={() => navigate('/portfolio')}
              className="group relative overflow-hidden bg-gray-800/60 backdrop-blur-xs border-2 border-purple-600/30 rounded-2xl p-8 text-left hover:border-purple-600 transition-all duration-300 transform hover:-translate-y-1 shadow-2xl shadow-purple-900/20"
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
              <div className="absolute inset-0 bg-linear-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>

            {/* CLI Portfolio Button (Cyan/Terminal Theme) */}
            <button
              onClick={() => window.location.href = cliUrl || '/cli'}
              className="group relative overflow-hidden bg-gray-800/60 backdrop-blur-xs border-2 border-cyan-600/30 rounded-2xl p-8 text-left hover:border-cyan-600 transition-all duration-300 transform hover:-translate-y-1 shadow-2xl shadow-cyan-900/20"
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
              <div className="absolute inset-0 bg-linear-to-br from-cyan-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </div>

          {/* Footer text */}
          <p className="text-gray-200 mt-16 text-lg font-bold">
            <FaInfo className="inline mr-2 text-black bg-white p-1 rounded-full w-5 h-5"/>Both portfolios showcase the same projects with different experiences
          </p>
        </div>
      </div>
        </main>
      </div>
    </div>




 
  );
};

export default Landing;