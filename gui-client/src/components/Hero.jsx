// src/components/Hero.jsx (Updated with Typing Effect)

import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowDown } from 'react-icons/fa';
import { scrollToSection } from '../utils/smoothScroll';
import useTypingEffect from '../hooks/useTypingEffect'; // NEW IMPORT

const Hero = () => {
  // Define the array of titles to cycle through
  const titles = [
    "Full Stack Developer",  
    "Penetration Tester",
    "Cybersecurity Enthusiast",
    "Open Source Contributor"
  ];

  // Initialize the typing effect hook
  const typedText = useTypingEffect(titles, 100, 1500);

  return (
    <section
      id="hero"
      // Dark Mode: Deep space background. Light Mode: Clean gradient
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-200 dark:bg-gray-950 transition-colors duration-500"
    >
      {/* Dynamic Animated Background Glows */}
      <div className="absolute inset-0 dark:block hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-float opacity-70"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container-custom relative z-10 text-center px-6">
        <div className="animate-fade-in">
          {/* Greeting */}
          <p className="text-purple-600 dark:text-purple-400 text-lg md:text-xl mb-4 font-mono tracking-widest">
            HELLO, I'M
          </p>
          
          {/* Name - Updated to use a custom gradient text class */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-blue-500 dark:from-purple-400 dark:to-cyan-400">
              Lonnex Njenga
            </span>
          </h1>
          
          {/* Title - NOW USES THE TYPING EFFECT */}
          <h2 className="text-2xl md:text-4xl text-gray-800 dark:text-gray-300 mb-8 font-light">
            {/* The typed text is wrapped in the primary color span */}
            <span className="font-semibold text-purple-600 dark:text-purple-400">
              {typedText}
            </span>
            {/* Blinking Cursor */}
            <span className="typing-cursor dark:text-purple-400 text-purple-600">|</span>
          </h2>
          
          {/* Description */}
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
            I build exceptional digital experiences that combine beautiful design 
            with powerful functionality. Let's create something amazing together.
          </p>
          
          {/* CTA Buttons - Standardized with Tailwind for both modes */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-3 text-lg font-semibold rounded-lg shadow-lg 
                bg-purple-600 text-white hover:bg-purple-700 
                dark:bg-purple-500 dark:hover:bg-purple-600 dark:shadow-purple-500/50 
                transition-all duration-300 transform hover:-translate-y-0.5"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3 text-lg font-semibold rounded-lg border-2 border-purple-600 text-purple-600 
                hover:bg-purple-50 
                dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900/30 
                transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Get In Touch
            </button>
          </div>
          
          {/* Social Links */}
          <div className="flex gap-6 justify-center">
            <a
              href="https://github.com/LNjengaTech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors transform hover:scale-110"
              aria-label="GitHub profile"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors transform hover:scale-110"
              aria-label="LinkedIn profile"
            >
              <FaLinkedin />
            </a>
            <a
              href="mailto:your.email@example.com"
              className="text-3xl text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors transform hover:scale-110"
              aria-label="Email link"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollToSection('about')}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-purple-600 dark:text-purple-400 transition-colors animate-bounce p-3"
        aria-label="Scroll down to About section"
      >
        <FaArrowDown className="text-3xl" />
      </button>
    </section>
  );
};

export default Hero;