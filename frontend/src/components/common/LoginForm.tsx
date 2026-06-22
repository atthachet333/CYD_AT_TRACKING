'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { getDemoCredentials } from '@/utils/auth';

/**
 * Login Form Component
 * Simple mock login interface with demo credentials
 */
export function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const demoCredentials = getDemoCredentials();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    
    try {
      await login(username, password);
    } catch (err) {
      setError('Invalid username or password');
    }
  }

  function autofill(user: typeof demoCredentials[0]) {
    setUsername(user.username);
    setPassword(user.password);
    setError('');
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Username Input */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoading}
          placeholder="Enter your username"
          className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:bg-neutral-50 transition-all"
        />
      </div>

      {/* Password Input */}
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            placeholder="Enter your password"
            className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:bg-neutral-50 pr-12 transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-700 transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || !username || !password}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading && <Loader2 size={20} className="animate-spin" />}
        {isLoading ? 'Logging in...' : 'Login'}
      </button>

      {/* Quick Fill Demo Users */}
      <div className="border-t border-neutral-200 pt-4">
        <p className="text-xs font-semibold text-neutral-600 mb-3 uppercase">Quick Demo Credentials</p>
        <div className="space-y-2">
          {demoCredentials.map((user) => (
            <button
              key={user.username}
              type="button"
              onClick={() => autofill(user)}
              disabled={isLoading}
              className="w-full text-left px-3 py-2 bg-neutral-50 hover:bg-blue-50 border border-neutral-200 rounded text-xs transition-colors disabled:opacity-50"
            >
              <div className="font-medium">{user.role} - {user.username}</div>
              <div className="text-neutral-600">{user.description}</div>
            </button>
          ))}
        </div>
      </div>
    </form>
  );
}
