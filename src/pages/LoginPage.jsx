import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import Logo from '../components/Logo';

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await signInWithEmailAndPassword(auth, form.email, form.password);
        navigate('/app');
      } catch (err) {
        console.error("Login error:", err.code);
        if (
          err.code === 'auth/user-not-found' ||
          err.code === 'auth/wrong-password'
        ) {
          setError("Incorrect email or password.");
        } else {
          setError("Something went wrong. Please try again.");
        }
      }
  };

  return (
    <div className="min-h-screen flex flex-col bg-indigo-50">
      <header className="flex justify-between items-center p-6 bg-white shadow-md">
        <Logo />
        <Link to="/signup" className="text-indigo-700 font-medium hover:underline">
          New here? Sign Up
        </Link>
      </header>

      <main className="flex-grow flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">Welcome Back</h2>

          {error && (
            <div className="text-red-600 text-sm mb-4 text-center">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
            >
              Log In
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}