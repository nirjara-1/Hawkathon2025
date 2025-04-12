// src/pages/NonprofitDashboard.jsx
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import Logo from '../components/Logo';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';

const messages = [
  "Your mission is inspiring — thank you for what you do 💙",
  "Together, we're building stronger communities 🤝",
  "Every request you post brings hope to someone 🙌",
  "You're not just helping, you're leading change ✨",
  "Nonprofits like yours are the thread that holds kindness together."
];

export default function NonprofitDashboard() {
  const [orgName, setOrgName] = useState('');
  const [message, setMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrg = async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) return;
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setOrgName(userSnap.data().name || 'Nonprofit');
      }
    };
    fetchOrg();
    setMessage(messages[Math.floor(Math.random() * messages.length)]);
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      {sidebarOpen && (
        <aside className="w-64 bg-purple-700 text-white p-6 space-y-6 transition-all duration-300">
          <div className="flex justify-between items-center mb-8">
            <Logo />
            <button onClick={() => setSidebarOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col space-y-4 text-lg">
            <Link to="/post-need" className="hover:text-purple-200">Post a Need</Link>
            <Link to="/incoming-donations" className="hover:text-purple-200">Incoming Donations</Link>
            <Link to="/matches" className="hover:text-purple-200">Matched Donors</Link>
            <Link to="/history" className="hover:text-purple-200">Donation History</Link>
            <Link to="/impact" className="hover:text-purple-200">Impact Overview</Link>
            <Link to="/volunteers" className="hover:text-purple-200">Manage Volunteers</Link>
            <Link to="/messages" className="hover:text-purple-200">Messages</Link>
            <Link to="/profile" className="hover:text-purple-200">Organization Profile</Link>
          </nav>
          <button onClick={handleLogout} className="mt-6 flex items-center space-x-2 text-white hover:text-purple-300">
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </button>
        </aside>
      )}

      {!sidebarOpen && (
        <div className="bg-purple-700 text-white p-2">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-10 transition-all duration-300">
        <h1 className="text-3xl font-bold text-purple-800 mb-2">Welcome, {orgName}!</h1>
        <p className="text-gray-600 text-lg mb-8">{message}</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <Link to="/post-need" className="bg-white rounded-lg p-6 shadow hover:shadow-md border">Request Items</Link>
          <Link to="/incoming-donations" className="bg-white rounded-lg p-6 shadow hover:shadow-md border">Review Donations</Link>
          <Link to="/matches" className="bg-white rounded-lg p-6 shadow hover:shadow-md border">View Matches</Link>
          <Link to="/history" className="bg-white rounded-lg p-6 shadow hover:shadow-md border">Donation History</Link>
          <Link to="/impact" className="bg-white rounded-lg p-6 shadow hover:shadow-md border">Impact Dashboard</Link>
          <Link to="/volunteers" className="bg-white rounded-lg p-6 shadow hover:shadow-md border">Volunteers</Link>
          <Link to="/messages" className="bg-white rounded-lg p-6 shadow hover:shadow-md border">Inbox</Link>
          <Link to="/profile" className="bg-white rounded-lg p-6 shadow hover:shadow-md border">Organization Profile</Link>
        </div>
      </main>
    </div>
  );
}
