import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/actions/userActions';

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
    <div className="min-h-screen flex items-center justify-center bg-terminal-bg px-4">
      <div className="w-full max-w-md">
        <div className="bg-terminal-bg/50 border border-terminal-text/20 rounded-lg p-8">
          <h1 className="text-3xl font-bold text-terminal-text mb-6 text-center">
            Admin Login
          </h1>

          {error && (
            <div className="mb-4 p-3 bg-terminal-error/10 border border-terminal-error rounded text-terminal-error text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-terminal-text mb-2 text-sm">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 bg-terminal-bg border border-terminal-text/30 rounded text-terminal-text focus:outline-none focus:border-terminal-prompt"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label className="block text-terminal-text mb-2 text-sm">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 bg-terminal-bg border border-terminal-text/30 rounded text-terminal-text focus:outline-none focus:border-terminal-prompt"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-terminal-prompt text-terminal-bg font-semibold rounded hover:bg-terminal-text transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};


export default Login;
