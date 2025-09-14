
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { GraduationCapIcon } from '../icons';

interface LoginProps {
  navigateToPublic: () => void;
}

const Login: React.FC<LoginProps> = ({ navigateToPublic }) => {
  const [email, setEmail] = useState('clerk@edusys.edu');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const { signIn } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setError('');
    // Simulate a login call
    signIn(email);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
            <div className="flex justify-center items-center space-x-2 mb-4">
                <GraduationCapIcon className="h-10 w-10 text-brand-primary" />
                <h1 className="text-3xl font-bold text-brand-dark">EduSys Portal</h1>
            </div>
          <p className="text-gray-500">Clerk & Admin Login</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
            />
          </div>
          <div>
            <label htmlFor="password"  className="text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary"
            >
              Sign In
            </button>
          </div>
        </form>
         <div className="text-center">
             <button onClick={navigateToPublic} className="text-sm text-brand-secondary hover:underline">
                &larr; Back to Public Website
             </button>
         </div>
      </div>
    </div>
  );
};

export default Login;
