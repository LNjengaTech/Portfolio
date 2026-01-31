import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/userActions';
import { FaHome, FaProjectDiagram, FaTerminal, FaSignOutAlt, FaGlobe, FaBriefcase, FaCode, FaFileAlt } from 'react-icons/fa';

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.userLogin);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin/login');
  };

  const isActive = (path) => location.pathname === path || (path === '/admin' && location.pathname === '/admin');

  return (
    // Enforcing a deep dark background for the admin panel
    <div className="min-h-screen bg-slate-900 text-gray-100 font-sans">
      {/* Admin Header */}
      <header className="bg-gray-900 border-b border-gray-800 py-4 px-6 shadow-xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/admin" className="text-2xl font-bold font-display">
            <span className="gradient-text">Admin Panel</span>
          </Link>
          <div className="flex items-center gap-6">
            <span className="text-gray-400 text-sm hidden sm:inline">
              Welcome, <span className="text-white font-medium">{userInfo?.name}</span>
            </span>
            <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all text-sm font-semibold flex items-center gap-2 shadow-md">
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Admin Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700 py-3 px-6 shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex gap-6 overflow-x-auto">
          {[
            { path: '/admin', name: 'Dashboard', icon: FaHome },
            { path: '/admin/projects', name: 'Projects', icon: FaProjectDiagram },
            { path: '/admin/skills', name: 'Skills', icon: FaCode },
            { path: '/admin/experiences', name: 'Experiences', icon: FaBriefcase },
            { path: '/admin/articles', name: 'Articles', icon: FaFileAlt },
            { path: '/admin/commands', name: 'Commands', icon: FaTerminal },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap
                  ${isActive(item.path) ? 'bg-purple-600 text-white shadow-inner shadow-purple-900' : 'text-gray-300 hover:bg-gray-700 hover:text-purple-400'}`}
              >
                <Icon />
                {item.name}
              </Link>
            );
          })}

          <Link
            to="/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-500 hover:text-gray-300 transition-colors text-sm font-medium ml-auto px-3 py-1.5"
          >
            <FaGlobe />
            View Portfolio
          </Link>
        </div>
      </nav>

      {/* Admin Content */}
      <main className="max-w-7xl mx-auto py-8 px-6 min-h-[calc(100vh-140px)]">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
