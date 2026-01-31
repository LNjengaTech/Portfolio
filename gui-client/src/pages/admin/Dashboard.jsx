import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listProjects } from '../../redux/actions/projectActions';
import { listCommands } from '../../redux/actions/commandActions';
import { FaProjectDiagram, FaTerminal, FaStar, FaChartLine } from 'react-icons/fa';

const Dashboard = () => {
  const dispatch = useDispatch();

  const { projects } = useSelector((state) => state.projectList);
  const { commands } = useSelector((state) => state.commandList);

  useEffect(() => {
    dispatch(listProjects());
    dispatch(listCommands());
  }, [dispatch]);

  const stats = [
    {
      title: 'Total Projects',
      value: projects?.length || 0,
      icon: <FaProjectDiagram />,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Featured Projects',
      value: projects?.filter((p) => p.featured).length || 0,
      icon: <FaStar />,
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      title: 'Total Commands',
      value: commands?.length || 0,
      icon: <FaTerminal />,
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Categories',
      value: new Set(projects?.map((p) => p.category)).size || 0,
      icon: <FaChartLine />,
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <div key={index} className="glass rounded-xl p-6 card-hover">
            <div className="flex items-center justify-between mb-4">
              <div className={`text-3xl text-white p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
            <h3 className="text-slate-400 text-sm mb-1">{stat.title}</h3>
            <p className="text-4xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="glass rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              to="/admin/projects"
              className="block px-4 py-3 bg-primary-500/10 border border-primary-500/30 rounded-lg text-primary-400 hover:bg-primary-500/20 transition-colors"
            >
              → Manage Projects
            </Link>
            <Link
              to="/admin/skills"
              className="block px-4 py-3 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-500/20 transition-colors"
            >
              → Manage Skills
            </Link>
            <Link
              to="/admin/commands"
              className="block px-4 py-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 hover:bg-green-500/20 transition-colors"
            >
              → Manage Commands
            </Link>
            
            <Link
              to="/portfolio"
              className="block px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-600 transition-colors"
            >
              → View Portfolio
            </Link>
          </div>
        </div>

        {/* Recent Projects */}
        <div className="glass rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Recent Projects</h2>
          <div className="space-y-3">
            {projects?.slice(0, 5).map((project) => (
              <div
                key={project._id}
                className="flex items-center justify-between p-3 bg-slate-800 rounded-lg"
              >
                <div>
                  <p className="text-white font-medium text-sm">{project.title}</p>
                  <p className="text-slate-400 text-xs mt-1">
                    {project.category} • {project.terminalCommand}
                  </p>
                </div>
                {project.featured && (
                  <FaStar className="text-yellow-500" />
                )}
              </div>
            ))}
            {(!projects || projects.length === 0) && (
              <p className="text-slate-500 text-sm">No projects yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="glass rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Projects by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {['Web', 'Mobile', 'Desktop', 'API', 'Other'].map((category) => {
            const count = projects?.filter((p) => p.category === category).length || 0;
            return (
              <div key={category} className="text-center">
                <div className="text-3xl font-bold text-primary-400 mb-1">{count}</div>
                <div className="text-slate-400 text-sm">{category}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;