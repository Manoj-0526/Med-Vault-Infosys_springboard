import React from "react";

function Layout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white p-5">
        <h2 className="text-2xl font-bold mb-6">MedVault</h2>
        <ul className="space-y-4">
          <li className="hover:text-gray-300 cursor-pointer">Dashboard</li>
          <li className="hover:text-gray-300 cursor-pointer">Profile</li>
          <li className="hover:text-gray-300 cursor-pointer">Appointments</li>
          <li className="hover:text-gray-300 cursor-pointer">Records</li>
          <li className="hover:text-red-400 cursor-pointer">Logout</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-auto">
        {children}
      </main>

    </div>
  );
}

export default Layout;
