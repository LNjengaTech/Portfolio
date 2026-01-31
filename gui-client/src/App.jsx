//App.jsx - the entrypoint to the project
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeProvider } from './contexts/ThemeContext';
import 'react-quill-new/dist/quill.snow.css';

//pages
import Landing from './pages/Landing';
import Portfolio from './pages/Portfolio';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';

//admin
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ProjectManagement from './pages/admin/ProjectManagement';
import CommandManagement from './pages/admin/CommandManagement';
import SkillManagement from './pages/admin/SkillManagement';
//import ExperienceManagement from './pages/admin/ExperienceManagement';
import ArticleManagement from './pages/admin/ArticleManagement';
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
    //Entire app wrapped in theme provider
    <ThemeProvider>
      <Routes>
        {/*public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:slug" element={<ArticleDetail />} />

        {/*admin Login */}
        <Route path="/admin/login" element={<Login />} />

        {/*protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              {' '}
              <AdminLayout />{' '}
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<ProjectManagement />} />
          <Route path="commands" element={<CommandManagement />} />
          <Route path="skills" element={<SkillManagement />} />
          {/* <Route path="experiences" element={<ExperienceManagement />} /> */}
          <Route path="articles" element={<ArticleManagement />} />
        </Route>

        {/*catch all*/}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ThemeProvider>
    // End wrapper
  );
}

export default App;
