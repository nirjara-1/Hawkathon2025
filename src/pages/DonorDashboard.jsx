// src/pages/DonorDashboard.jsx
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import Logo from '../components/Logo';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';

const messages = [
  "You’re making the world warmer, one gift at a time!",
  "Kindness like yours threads communities together 💜",
  "Your generosity is someone’s miracle today ✨",
  "Thanks for showing up. The world notices.",
  "Even the smallest act of giving can echo forever."
];

export default function DonorDashboard() {
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchName = async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) return;
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUserName(userSnap.data().name);
      }
    };
    fetchName();
    setMessage(messages[Math.floor(Math.random() * messages.length)]);
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/login');
  };

  const handleUploadRedirect = () => {
    navigate('/upload');
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      {sidebarOpen && (
        <aside className="w-64 bg-indigo-700 text-white p-6 space-y-6 transition-all duration-300">
          <div className="flex justify-between items-center mb-8">
            <Logo />
            <button onClick={() => setSidebarOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col space-y-4 text-lg">
            <Link to="/upload" className="hover:text-indigo-200">Upload Donations</Link>
            <Link to="/matches" className="hover:text-indigo-200">View Matches</Link>
            <Link to="/donations" className="hover:text-indigo-200">Past Donations</Link>
            <Link to="/impact" className="hover:text-indigo-200">Impact Stats</Link>
            <Link to="/volunteer" className="hover:text-indigo-200">Volunteer Tasks</Link>
            <Link to="/needs" className="hover:text-indigo-200">Explore Needs</Link>
            <Link to="/messages" className="hover:text-indigo-200">Messages</Link>
            <Link to="/profile" className="hover:text-indigo-200">Profile</Link>
          </nav>
          <button onClick={handleLogout} className="mt-6 flex items-center space-x-2 text-white hover:text-indigo-300">
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </button>
        </aside>
      )}

      {!sidebarOpen && (
        <div className="bg-indigo-700 text-white p-2">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-10 transition-all duration-300">
        <h1 className="text-3xl font-bold text-indigo-800 mb-2">Welcome back, {userName || 'Donor'}!</h1>
        <p className="text-gray-600 text-lg mb-8">{message}</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            
            <Link to="/upload" 
                    className="flex flex-col justify-center items-center border-2 border-dashed border-gray-300 rounded-xl text-center p-8 hover:bg-gray-50">
                    <div className="text-3xl mb-2">⬆️</div>
                    <p className="text-sm font-medium text-gray-600">Upload a Donation</p>
            </Link>
          <Link to="/matches" className="bg-white rounded-lg p-6 shadow hover:shadow-md border">Matched Nonprofits</Link>
          <Link to="/donations" className="bg-white rounded-lg p-6 shadow hover:shadow-md border">Past Donations</Link>
          <Link to="/impact" className="bg-white rounded-lg p-6 shadow hover:shadow-md border">Your Impact</Link>
          <Link to="/volunteer" className="bg-white rounded-lg p-6 shadow hover:shadow-md border">Volunteer Opportunities</Link>
          <Link to="/needs" className="bg-white rounded-lg p-6 shadow hover:shadow-md border">Explore Needs</Link>
          <Link to="/messages" className="bg-white rounded-lg p-6 shadow hover:shadow-md border">Inbox</Link>
          <Link to="/profile" className="bg-white rounded-lg p-6 shadow hover:shadow-md border">Your Profile</Link>
        </div>
      </main>
    </div>
  );
}