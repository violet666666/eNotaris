'use client';

import { FiBell, FiUser, FiLogOut } from 'react-icons/fi';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8">
      <div className="flex-1">
        <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
          <FiBell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
            <FiUser size={16} />
          </div>
          <span className="text-sm font-medium text-gray-700">Admin</span>
        </div>

        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
          <FiLogOut size={20} />
        </button>
      </div>
    </nav>
  );
}
