import React from 'react';
import Profile from '../../components/Profile';
import Terminal from '../../components/Terminal';

const Home = () => {
  return (
    <div className="w-full mx-auto! py-8! px-6!">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px]">
        {/* Profile Section - Left Side (smaller on large screens) */}
        <div className="lg:col-span-4">
          <Profile />
        </div>

        {/* Terminal Section - Right Side (larger on large screens) */}
        <div className="lg:col-span-8">
          <Terminal />
        </div>
      </div>
    </div>
  );
};

export default Home;