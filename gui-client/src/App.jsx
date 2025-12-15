// src/App.jsx (Updated)

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeProvider } from './contexts/ThemeContext'; // <--- NEW IMPORT


//pages
import Landing from './pages/Landing';
import Portfolio from './pages/Portfolio';

//admin
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ProjectManagement from './pages/admin/ProjectManagement';
import CommandManagement from './pages/admin/CommandManagement';
import AdminLayout from './layouts/AdminLayout';

//protected route component
const ProtectedRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.userLogin);
  
  if (!userInfo) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    // <--- WRAPPED THE ENTIRE APP WITH THEME PROVIDER
    <ThemeProvider> 
      <Routes>
        {/*public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/portfolio" element={<Portfolio />} />

        {/*admin Login */}
        <Route path="/admin/login" element={<Login />} />

        {/*protected Admin Routes */}
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

        {/*catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ThemeProvider>
    // <--- END WRAPPER
  );
}

export default App;