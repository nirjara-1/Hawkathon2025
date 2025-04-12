import React, { useState } from 'react';
import { Menu } from 'your-icon-library'; // Ensure you import the Menu icon

export default function YourComponent() {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Initialize sidebarOpen state

  return (
    <div className="flex min-h-screen">
      {sidebarOpen && (
        <aside className="w-64 bg-purple-700 text-white p-6 space-y-6 transition-all duration-300">
          {/* Sidebar content */}
        </aside>
      )}

      {/* Menu Toggle Button */}
      {!sidebarOpen && (
        <div className="bg-purple-700 text-white p-2">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Main content always takes full width */}
      <main className={`flex-1 bg-gray-50 p-10 transition-all duration-300`}>
        {/* Main content */}
      </main>
    </div>
  );
}