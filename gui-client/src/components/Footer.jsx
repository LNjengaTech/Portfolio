import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { scrollToSection } from '../utils/smoothScroll';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-950 transition-colors duration-500 border-t border-gray-100 dark:border-gray-800">
      <div className="container-custom mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          
          {/* Logo/Name */}
          <div className="text-center md:text-left">
            <Link to="/portfolio" className="text-3xl font-extrabold tracking-tight">
              <span className="gradient-text">Lonnex Njenga</span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Full Stack Developer & CyberSec Enthusiast
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex space-x-6">
            <button 
              onClick={() => scrollToSection('hero')} 
              className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm font-medium"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('projects')} 
              className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm font-medium"
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm font-medium"
            >
              Contact
            </button>
            
          </nav>

          {/* Social Links */}
          <div className="flex space-x-4">
            <a href="https://github.com/LNjengaTech" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-xl transition-colors">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/lonnex-njenga-b4946336b" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-xl transition-colors">
              <FaLinkedin />
            </a>
            <a href="https://x.com/LonnexTech" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-xl transition-colors">
              <FaTwitter />
            </a>
          </div>

        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {currentYear} lonnex.vercel.app | All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;