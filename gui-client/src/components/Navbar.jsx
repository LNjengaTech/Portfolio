//src/components/Navbar.jsx (Final version with Theme Toggle)

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { scrollToSection } from '../utils/smoothScroll';
import { FaBars, FaTimes, FaSun, FaMoon, FaTerminal } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Get theme state and toggle function from context
  const { theme, toggleTheme } = useTheme();

  // Function to handle scrolling behavior for background change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to handle section navigation
  const handleNavClick = (sectionId) => {
    if (location.pathname !== '/portfolio') {
      // If not on the portfolio page, navigate there first
      Link('/portfolio');
      // Delay scrolling to allow navigation to complete
      setTimeout(() => scrollToSection(sectionId), 100);
    } else {
      scrollToSection(sectionId);
    }
    setIsOpen(false);
  };

  //custom button component for navigation links
  const NavButton = ({ sectionId, label }) => (
    <button onClick={() => handleNavClick(sectionId)} className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium text-lg md:text-base">
      {label}
    </button>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
        ${isScrolled ? 'bg-white/90 backdrop-blur-lg dark:bg-gray-950/90 shadow-lg border-b border-gray-200 dark:border-gray-800' : 'bg-transparent'}`}
    >
      <div className="container-custom mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-extrabold tracking-tight z-50">
          <span className="gradient-text">Lonnex</span>
        </Link>

        {/*desktop */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavButton sectionId="hero" label="Home" />
          <NavButton sectionId="about" label="About" />
          <NavButton sectionId="skills" label="Skills" />
          <NavButton sectionId="projects" label="Projects" />
          <NavButton sectionId="contact" label="Contact" />

          <Link to="/articles" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium text-lg md:text-base">
            Articles
          </Link>

          {/*theme toggle*/}
          <button onClick={toggleTheme} className="relative flex h-8 w-16 items-center rounded-full bg-gray-300 dark:bg-gray-600 p-1 transition-colors duration-300">
            <div
              className={`flex h-6 w-6 transform items-center justify-center rounded-full bg-white transition-transform duration-300 ease-in-out ${
                theme === 'dark' ? 'translate-x-8' : 'translate-x-0'
              }`}
            >
              {theme === 'dark' ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-purple-600" />}
            </div>
          </button>
        </nav>

        {/*Mobile Menu Button */}
        <button className="md:hidden text-2xl text-gray-800 dark:text-white z-50" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/*Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="absolute inset-0 bg-white dark:bg-gray-950"></div>
        <div className="relative p-6 mt-16 flex flex-col items-center space-y-6">
          <NavButton sectionId="hero" label="Home" />
          <NavButton sectionId="about" label="About" />
          <NavButton sectionId="skills" label="Skills" />
          <NavButton sectionId="projects" label="Projects" />
          <NavButton sectionId="contact" label="Contact" />

          <Link to="/articles" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium text-lg md:text-base">
            Articles
          </Link>

          <div className="flex items-center space-x-6 pt-4">
            <button onClick={toggleTheme} className="relative flex h-8 w-16 items-center rounded-full bg-gray-300 dark:bg-gray-600 p-1 transition-colors duration-300">
              <div
                className={`flex h-6 w-6 transform items-center justify-center rounded-full bg-white transition-transform duration-300 ease-in-out ${
                  theme === 'dark' ? 'translate-x-8' : 'translate-x-0'
                }`}
              >
                {theme === 'dark' ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-purple-600" />}
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
