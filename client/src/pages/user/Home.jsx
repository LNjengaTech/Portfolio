import React from 'react';
import Profile from '../../components/Profile';
import Terminal from '../../components/Terminal';

const Home = () => {
  return (
    <div className="w-full mx-auto! py-8! px-6!">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-150">
        {/*profile section - on the left side and smaller on large screens*/}
        <div className="lg:col-span-4">
          <Profile />
        </div>

        {/*the terminal section - right side + larger on large screens(The most important feature)*/}
        <div className="lg:col-span-8">
          <Terminal />
        </div>
      </div>
    </div>
  );
};

export default Home;