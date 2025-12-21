'use client';

import Link from 'next/link';
import { FiHome, FiUsers, FiFileText, FiDollarSign, FiSettings } from 'react-icons/fi';

export default function Sidebar() {
  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: FiHome },
    { name: 'Pelanggan', href: '/pelanggan', icon: FiUsers },
    { name: 'Lembar Kerja', href: '/lembar-kerja', icon: FiFileText },
    { name: 'Keuangan', href: '/keuangan', icon: FiDollarSign },
    { name: 'Master Data', href: '/master', icon: FiSettings },
  ];

  return (
    <aside className="w-64 bg-blue-900 text-white h-screen fixed overflow-y-auto">
      <div className="p-6 border-b border-blue-800">
        <h1 className="text-2xl font-bold">eNotaris</h1>
        <p className="text-xs text-blue-300 mt-1">Sistem Notaris Digital</p>
      </div>
      
      <nav className="mt-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center px-6 py-3 hover:bg-blue-800 transition-colors border-l-4 border-transparent hover:border-blue-400"
            >
              <Icon className="mr-3 text-lg" />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 w-full border-t border-blue-800 p-4">
        <div className="text-xs text-blue-300">
          <p className="font-semibold">Eno Tari SH.M.Kn</p>
          <p className="mt-1">Admin</p>
        </div>
      </div>
    </aside>
  );
}
