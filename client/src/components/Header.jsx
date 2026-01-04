import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header className="bg-terminal-bg border-b border-terminal-text/20 py-6! px-6!">
      <div className="w-full mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-terminal-text hover:text-terminal-prompt transition-colors">
          LonnexNjenga.
        </Link>
        <nav>
          <Link
            to="https://lonnex.vercel.app"
            className="text-terminal-prompt text-xs transition-colors px-4 py-2 rounded hover:text-terminal-prompt/70"
          >
           -&gt; GUI Portfolio
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;