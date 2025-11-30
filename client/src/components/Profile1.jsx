import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProjects } from '../redux/actions/projectActions';


const Profile = () => {
  const dispatch = useDispatch();
  
    const { projects } = useSelector((state) => state.projectList);  
    useEffect(() => {
      dispatch(listProjects());
    }, [dispatch]);




  return (
    <div className="bg-terminal-bg/50 border border-terminal-text/20 rounded-lg p-6 h-full">
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Profile Image */}
        <div className="w-32 h-32 rounded-full border-4 border-terminal-prompt overflow-hidden">
          <img
            src="/profile.png" // Place your image in public folder
            alt="Profile"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/150/0a0e27/00ff41?text=Profile';
            }}
          />
        </div>

        {/* Name and Title */}
        <div>
          <h2 className="text-2xl font-bold text-terminal-text mb-1">Lonnex Njenga</h2>
          <p className="text-terminal-prompt text-sm">Full Stack Developer</p>
        </div>

        {/* Bio */}
        <p className="text-terminal-text/70 text-sm leading-relaxed">
          Building innovative solutions with modern technologies. 
          Passionate about clean code and user experience.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 w-full pt-4 border-t border-terminal-text/20">
          <div>
            <p className="text-terminal-prompt font-bold text-lg">{projects?.length || 0}+</p>
            <p className="text-terminal-text/60 text-xs">Projects</p>
          </div>
          <div>
            <p className="text-terminal-prompt font-bold text-lg">2+</p>
            <p className="text-terminal-text/60 text-xs">Years</p>
          </div>
          <div>
            <p className="text-terminal-prompt font-bold text-lg">50+</p>
            <p className="text-terminal-text/60 text-xs">Commits</p>
          </div>
        </div>

        {/* Skills */}
        {/* <div className="w-full pt-4 border-t border-terminal-text/20">
          <h3 className="text-terminal-text font-semibold mb-3 text-sm">Tech Stack</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind', 'Redux'].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-terminal-text/10 border border-terminal-prompt/30 rounded text-xs text-terminal-text"
              >
                {skill}
              </span>
            ))}
          </div>
        </div> */}

        {/* Quick Links */}
        {/* <div className="w-full pt-4 border-t border-terminal-text/20">
          <h3 className="text-terminal-text font-semibold mb-3 text-sm">Quick Links</h3>
          <div className="space-y-2">
            <a
              href="#"
              className="block text-terminal-prompt hover:text-terminal-text transition-colors text-sm"
            >
              → Download Resume
            </a>
            <a
              href="#"
              className="block text-terminal-prompt hover:text-terminal-text transition-colors text-sm"
            >
              → View GitHub
            </a>
            <a
              href="#"
              className="block text-terminal-prompt hover:text-terminal-text transition-colors text-sm"
            >
              → Contact Me
            </a>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Profile;
