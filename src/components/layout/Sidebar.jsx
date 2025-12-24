'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import {
  FiHome,
  FiFileText,
  FiDollarSign,
  FiDatabase,
  FiUsers,
  FiSettings,
  FiLogOut,
} from 'react-icons/fi';

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: FiHome },
    { name: 'Lembar Kerja', href: '/lembar-kerja', icon: FiFileText },
    { name: 'Keuangan', href: '/keuangan', icon: FiDollarSign },
    { name: 'Master Data', href: '/master', icon: FiDatabase },
    { name: 'Users', href: '/users', icon: FiUsers },
    { name: 'Settings', href: '/settings', icon: FiSettings },
  ];

  const isActive = (href) => pathname.startsWith(href);

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col min-h-screen sticky top-0">
      {/* Brand */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-blue-600">eNotaris</h1>
        <p className="text-sm text-gray-600">Sistem Administrasi</p>
        {user && (
          <div className="mt-3 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-sm">
                {user.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
          </div>
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition ${
                  isActive(item.href)
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="text-xl flex-shrink-0" />
                <span>{item.name}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition"
        >
          <FiLogOut className="text-xl flex-shrink-0" />
          <span className="font-semibold">Logout</span>
        </button>
      </div>
    </aside>
  );
}
