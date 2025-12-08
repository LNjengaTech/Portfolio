import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-terminal-bg border-t border-terminal-text/20 py-6 px-6 mt-auto">
      <div className="max-full px-6! flex mx-auto text-center justify-between">
        <p className="text-terminal-text/70 text-sm">
          © {currentYear} LonnexNjenga.dev
        </p>
        <div className="mt-3 flex justify-center gap-6">
          <a
            href="https://github.com/LNjengaTech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-terminal-prompt hover:text-terminal-text transition-colors text-sm"
          >
            GitHub
          </a>
          <a
            // href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-terminal-prompt hover:text-terminal-text transition-colors text-sm"
          >
            LinkedIn
          </a>
          <a
            href="mailto:njengalonnex340@gmail.com"
            className="text-terminal-prompt hover:text-terminal-text transition-colors text-sm"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;