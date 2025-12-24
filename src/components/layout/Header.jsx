'use client';

import { useAuth } from '@/contexts/AuthContext';
import { FiBell, FiSearch, FiUser, FiSettings, FiLogOut, FiChevronDown } from 'react-icons/fi';
import { useState, useRef, useEffect } from 'react';

export default function Header() {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);
  const notifRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left: Search */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari data..."
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            />
          </div>
        </div>

        {/* Right: Notifications & Profile */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
            >
              <FiBell className="text-xl" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-20">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <h3 className="font-semibold text-gray-900">Notifikasi</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <NotificationItem
                    title="Lembar Kerja Baru"
                    message="Order #00123 telah dibuat"
                    time="5 menit yang lalu"
                    unread
                  />
                  <NotificationItem
                    title="Pembayaran Diterima"
                    message="Pembayaran Rp 5.000.000 telah diterima"
                    time="1 jam yang lalu"
                    unread
                  />
                  <NotificationItem
                    title="Dokumen Selesai"
                    message="Akta jual beli telah selesai"
                    time="2 jam yang lalu"
                  />
                </div>
                <div className="p-3 border-t border-gray-200 text-center bg-gray-50">
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    Lihat Semua Notifikasi
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 pl-4 border-l border-gray-200 hover:bg-gray-50 p-2 rounded-lg transition"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-md">
                <span className="text-white font-semibold">
                  {user?.name?.charAt(0).toUpperCase() || 'A'}
                </span>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-gray-900">
                  {user?.name || 'Admin'}
                </p>
                <p className="text-xs text-gray-500 capitalize">{user?.role || 'User'}</p>
              </div>
              <FiChevronDown className="text-gray-400" />
            </button>

            {/* Profile Menu Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-20">
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <p className="font-semibold text-gray-900">{user?.name}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
                <div className="py-2">
                  <MenuItem icon={FiUser} label="Profile" onClick={() => alert('Profile')} />
                  <MenuItem icon={FiSettings} label="Settings" onClick={() => alert('Settings')} />
                </div>
                <div className="border-t border-gray-200">
                  <MenuItem 
                    icon={FiLogOut} 
                    label="Logout" 
                    onClick={logout}
                    className="text-red-600 hover:bg-red-50"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function MenuItem({ icon: Icon, label, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition ${className}`}
    >
      <Icon className="text-lg" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

function NotificationItem({ title, message, time, unread }) {
  return (
    <div className={`p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition ${unread ? 'bg-blue-50' : ''}`}>
      <div className="flex gap-3">
        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${unread ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900">{title}</p>
          <p className="text-sm text-gray-600 truncate">{message}</p>
          <p className="text-xs text-gray-400 mt-1">{time}</p>
        </div>
      </div>
    </div>
  );
}
