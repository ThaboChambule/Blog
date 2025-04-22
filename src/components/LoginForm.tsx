'use client';

import { useState, useContext, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserContext } from './UserContext';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const router = useRouter();

  async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      if (response.ok) {
        const userInfo = await response.json();
        setUserInfo(userInfo);
        router.push('/');
      } else {
        const data = await response.json();
        setError(data.error || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <div className="mb-4">
        <label htmlFor="username" className="block mb-1 font-medium">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="password" className="block mb-1 font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
      
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <Link href="/register" className="text-blue-600 hover:underline">
          Register instead
        </Link>
      </div>
    </form>
  );
}