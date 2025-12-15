import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/actions/userActions';
import { FaUser, FaLock } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (userInfo) {
      navigate('/admin');
    }
  }, [userInfo, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-950 via-blue-950 to-gray-950 px-4 relative overflow-hidden">
      {/* Animated background elements (from index.css @keyframes) */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Using the glass utility for a sharp, technical look */}
        <div className="glass rounded-2xl p-8 border border-gray-700/50 shadow-2xl shadow-purple-900/20">
          
          {/* Logo/Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-display mb-2 text-white">
              <span className="gradient-text">Admin Login</span>
            </h1>
            <p className="text-gray-400">Access your dashboard</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-600/20 border border-red-500 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2 text-sm font-medium">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors placeholder:text-gray-500"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors placeholder:text-gray-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-purple-600/30"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <a
              href="/portfolio"
              className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
            >
              ← Back to Portfolio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;