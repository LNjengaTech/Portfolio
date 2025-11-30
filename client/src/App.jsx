import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Layouts
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';

// User Pages
import Home from './pages/user/Home';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ProjectManagement from './pages/admin/ProjectManagement';
import CommandManagement from './pages/admin/CommandManagement';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.userLogin);
  
  if (!userInfo) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Routes>
      {/* User Routes */}
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="placeholder" element={<div className="max-w-7xl mx-auto py-8 px-6 text-terminal-text">Placeholder Page</div>} />
      </Route>

      {/* Admin Login (No Layout) */}
      <Route path="/admin/login" element={<Login />} />

      {/* Protected Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="projects" element={<ProjectManagement />} />
        <Route path="commands" element={<CommandManagement />} />
      </Route>

      {/* Catch all - 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;