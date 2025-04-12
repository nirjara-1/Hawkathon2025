import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

export default function LandingPage() {
  return (
    <div className="landing-page min-h-screen bg-gradient-to-b from-indigo-50 via-white to-blue-50 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-white shadow-md">
        <Logo /> {/* Logo */}
        <div className="space-x-4">
          <Link to="/login" className="text-indigo-700 font-medium hover:underline">
            Log In
          </Link>
          <Link to="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            Sign Up
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex items-center justify-center px-6">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            Connected by Kindness 💙
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Threaded is a smart donation matching platform that helps communities connect generosity to real-time needs. Whether you're giving a winter coat or a laptop, we make sure it finds the right hands at the right time.
          </p>
          <Link to="/signup">
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-indigo-700">
              Get Started
            </button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-4">
        Built with ❤️ for Hawkathon 2025
      </footer>
    </div>
  );
}


