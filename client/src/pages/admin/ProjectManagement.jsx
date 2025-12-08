import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listProjects } from '../../redux/actions/projectActions';
import { listCommands } from '../../redux/actions/commandActions';

const Dashboard = () => {
  const dispatch = useDispatch();

  const { projects } = useSelector((state) => state.projectList);
  const { commands } = useSelector((state) => state.commandList);

  useEffect(() => {
    dispatch(listProjects());
    dispatch(listCommands());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-terminal-text mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/*stats cards */}
        <div className="bg-terminal-bg/50 border border-terminal-text/20 rounded-lg p-6">
          <h3 className="text-terminal-text/70 text-sm mb-2">Total Projects</h3>
          <p className="text-4xl font-bold text-terminal-prompt">
            {projects?.length || 0}
          </p>
        </div>

        <div className="bg-terminal-bg/50 border border-terminal-text/20 rounded-lg p-6">
          <h3 className="text-terminal-text/70 text-sm mb-2">Total Commands</h3>
          <p className="text-4xl font-bold text-terminal-prompt">
            {commands?.length || 0}
          </p>
        </div>

        <div className="bg-terminal-bg/50 border border-terminal-text/20 rounded-lg p-6">
          <h3 className="text-terminal-text/70 text-sm mb-2">Core Commands</h3>
          <p className="text-4xl font-bold text-terminal-prompt">
            {commands?.filter((c) => c.isCoreCommand).length || 0}
          </p>
        </div>
      </div>

      {/*Quick actions*/}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-terminal-bg/50 border border-terminal-text/20 rounded-lg p-6">
          <h2 className="text-xl font-bold text-terminal-text mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              to="/admin/projects"
              className="block px-4 py-3 bg-terminal-prompt/10 border border-terminal-prompt/30 rounded text-terminal-prompt hover:bg-terminal-prompt/20 transition-colors"
            >
              → Manage Projects
            </Link>
            <Link
              to="/admin/commands"
              className="block px-4 py-3 bg-terminal-prompt/10 border border-terminal-prompt/30 rounded text-terminal-prompt hover:bg-terminal-prompt/20 transition-colors"
            >
              → Manage Commands
            </Link>
            <Link
              to="/"
              className="block px-4 py-3 bg-terminal-text/10 border border-terminal-text/30 rounded text-terminal-text hover:bg-terminal-text/20 transition-colors"
            >
              → View Portfolio
            </Link>
          </div>
        </div>

        <div className="bg-terminal-bg/50 border border-terminal-text/20 rounded-lg p-6">
          <h2 className="text-xl font-bold text-terminal-text mb-4">Recent Projects</h2>
          <div className="space-y-2">
            {projects?.slice(0, 5).map((project) => (
              <div
                key={project._id}
                className="px-3 py-2 bg-terminal-bg border border-terminal-text/10 rounded text-sm"
              >
                <p className="text-terminal-text font-semibold">{project.title}</p>
                <p className="text-terminal-text/60 text-xs mt-1">
                  {project.terminalCommand}
                </p>
              </div>
            ))}
            {(!projects || projects.length === 0) && (
              <p className="text-terminal-text/50 text-sm">No projects yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;