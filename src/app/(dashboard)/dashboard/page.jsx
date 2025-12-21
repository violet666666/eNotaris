'use client';

import Layout from '@/components/layout/Layout';
import { FiUsers, FiFileText, FiDollarSign, FiTrendingUp } from 'react-icons/fi';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    klien: 18,
    lembarKerja: 20,
    partner: 1,
    revenue: 'Rp 2.5M',
  });

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Selamat datang kembali, Eno Tari SH.M.Kn</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6">
          <StatCard 
            icon={FiUsers}
            label="Total Klien"
            value={stats.klien}
            color="blue"
          />
          <StatCard 
            icon={FiFileText}
            label="Lembar Kerja"
            value={stats.lembarKerja}
            color="green"
          />
          <StatCard 
            icon={FiTrendingUp}
            label="Partner"
            value={stats.partner}
            color="purple"
          />
          <StatCard 
            icon={FiDollarSign}
            label="Revenue"
            value={stats.revenue}
            color="orange"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-6">
          {/* Lembar Kerja Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Status Lembar Kerja 2025</h2>
            <div className="space-y-3">
              <StatusBar label="Draft" value="10" max="20" color="blue" />
              <StatusBar label="Persetujuan" value="4" max="20" color="yellow" />
              <StatusBar label="Proses" value="3" max="20" color="green" />
              <StatusBar label="Selesai" value="2" max="20" color="purple" />
              <StatusBar label="Batal" value="1" max="20" color="red" />
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Aktivitas Terbaru</h2>
            <div className="space-y-3">
              <ActivityItem 
                user="Admin"
                action="Update Status dari DRAFT → PERSETUJUAN"
                time="34 menit yang lalu"
                status="PERSETUJUAN"
              />
              <ActivityItem 
                user="Admin"
                action="Terima Pembayaran"
                time="1 jam yang lalu"
                status="DIPROSES"
                color="green"
              />
              <ActivityItem 
                user="Admin"
                action="Membatalkan Lembar Kerja"
                time="34 menit yang lalu"
                status="BATAL"
                color="red"
              />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Aksi Cepat</h2>
          <div className="grid grid-cols-4 gap-4">
            <QuickActionBtn label="Tambah Pelanggan" href="/pelanggan" />
            <QuickActionBtn label="Buat Lembar Kerja" href="/lembar-kerja" />
            <QuickActionBtn label="Lihat Keuangan" href="/keuangan" />
            <QuickActionBtn label="Master Data" href="/master" />
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Component Helper
function StatCard({ icon: Icon, label, value, color }) {
  const colorMap = {
    blue: 'border-blue-500 bg-blue-50',
    green: 'border-green-500 bg-green-50',
    purple: 'border-purple-500 bg-purple-50',
    orange: 'border-orange-500 bg-orange-50',
  };

  return (
    <div className={`bg-white p-6 rounded-lg shadow border-l-4 ${colorMap[color]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <Icon className="text-3xl text-gray-400" />
      </div>
    </div>
  );
}

function StatusBar({ label, value, max, color }) {
  const percentage = (value / max) * 100;
  const colorMap = {
    blue: 'bg-blue-500',
    yellow: 'bg-yellow-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    red: 'bg-red-500',
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm text-gray-600">{value}/{max}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${colorMap[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function ActivityItem({ user, action, time, status, color = 'yellow' }) {
  const statusColorMap = {
    blue: 'bg-blue-100 text-blue-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
  };

  return (
    <div className="flex justify-between items-start pb-3 border-b border-gray-200">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{user}</p>
        <p className="text-sm text-gray-600">{action}</p>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>
      <span className={`text-xs font-semibold px-2 py-1 rounded ${statusColorMap[color]}`}>
        {status}
      </span>
    </div>
  );
}

function QuickActionBtn({ label, href }) {
  return (
    <a href={href}>
      <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition">
        {label}
      </button>
    </a>
  );
}
