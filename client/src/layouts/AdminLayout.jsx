import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/userActions';

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userLogin);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-terminal-bg">
      {/*admin's side header */}
      <header className="bg-terminal-bg border-b border-terminal-text/20 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/admin" className="text-2xl font-bold text-terminal-text">
            Admin Panel
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-terminal-text/70 text-sm">
              Welcome, {userInfo?.name}
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-terminal-error text-white rounded hover:bg-terminal-error/80 transition-colors text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/*navigation */}
      <nav className="bg-terminal-bg border-b border-terminal-text/20 py-3 px-6">
        <div className="max-w-7xl mx-auto flex gap-6">
          <Link
            to="/admin"
            className="text-terminal-prompt hover:text-terminal-text transition-colors text-sm"
          >
            Dashboard
          </Link>
          <Link
            to="/admin/projects"
            className="text-terminal-prompt hover:text-terminal-text transition-colors text-sm"
          >
            Projects
          </Link>
          <Link
            to="/admin/commands"
            className="text-terminal-prompt hover:text-terminal-text transition-colors text-sm"
          >
            Commands
          </Link>
          <Link
            to="/"
            className="text-terminal-text/50 hover:text-terminal-text transition-colors text-sm"
          >
            View Site
          </Link>
        </div>
      </nav>

      {/*content*/}
      <main className="max-w-7xl mx-auto py-8 px-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;