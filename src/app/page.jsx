'use client';

import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-800">
      {/* Navbar */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-900">eNotaris</h1>
          <Link href="/dashboard">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              Dashboard
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold text-white mb-6">
          Selamat Datang di eNotaris
        </h1>
        <p className="text-xl text-blue-100 mb-8">
          Platform digital terpadu untuk manajemen notaris dan administrasi kantor
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link href="/dashboard">
            <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center gap-2">
              Masuk Dashboard <FiArrowRight />
            </button>
          </Link>
          <button className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition border border-white">
            Pelajari Lebih Lanjut
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Kelola Pelanggan</h3>
            <p className="text-gray-600">Manajemen data pelanggan pribadi, bank/leasing, dan perusahaan dengan mudah</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Lembar Kerja</h3>
            <p className="text-gray-600">Kelola pesanan dan proses dengan status tracking yang real-time</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Keuangan</h3>
            <p className="text-gray-600">Pantau tagihan, pembayaran, dan laporan keuangan secara terpadu</p>
          </div>
        </div>
      </div>
    </div>
  );
}
