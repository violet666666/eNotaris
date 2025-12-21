'use client';

import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import { FiChevronRight, FiTrendingUp, FiDollarSign, FiCreditCard } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function KeuanganPage() {
  const [stats, setStats] = useState({
    totalTagihan: 0,
    totalBelumBayar: 0,
    totalPembayaran: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [tagihanRes, pembayaranRes] = await Promise.all([
        axios.get('/api/keuangan/tagihan'),
        axios.get('/api/keuangan/pembayaran'),
      ]);

      setStats({
        totalTagihan: tagihanRes.data.stats?.totalTagihan || 0,
        totalBelumBayar: tagihanRes.data.stats?.totalBelumBayar || 0,
        totalPembayaran: pembayaranRes.data.stats?.totalPembayaran || 0,
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    {
      title: 'Tagihan',
      description: 'Kelola tagihan pelanggan',
      href: '/keuangan/tagihan',
      icon: FiDollarSign,
      color: 'blue',
      stat: `Rp ${stats.totalTagihan.toLocaleString('id-ID')}`,
    },
    {
      title: 'Pembayaran',
      description: 'Catat pembayaran masuk',
      href: '/keuangan/pembayaran',
      icon: FiCreditCard,
      color: 'green',
      stat: `Rp ${stats.totalPembayaran.toLocaleString('id-ID')}`,
    },
    {
      title: 'Laporan Keuangan',
      description: 'Lihat laporan dan analisis',
      href: '/keuangan/laporan',
      icon: FiTrendingUp,
      color: 'purple',
      stat: 'Detail Laporan',
    },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Keuangan</h1>
          <p className="text-gray-600 mt-2">Kelola tagihan, pembayaran, dan laporan keuangan</p>
        </div>

        {/* Stats Cards */}
        {!loading && (
          <div className="grid grid-cols-3 gap-6">
            <StatCard
              label="Total Tagihan"
              value={`Rp ${stats.totalTagihan.toLocaleString('id-ID')}`}
              color="blue"
              icon={FiDollarSign}
            />
            <StatCard
              label="Belum Dibayar"
              value={`Rp ${stats.totalBelumBayar.toLocaleString('id-ID')}`}
              color="red"
              icon={FiTrendingUp}
            />
            <StatCard
              label="Total Pembayaran"
              value={`Rp ${stats.totalPembayaran.toLocaleString('id-ID')}`}
              color="green"
              icon={FiCreditCard}
            />
          </div>
        )}

        {/* Menu Grid */}
        <div className="grid grid-cols-1 gap-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const colorMap = {
              blue: 'border-blue-500 bg-blue-50',
              green: 'border-green-500 bg-green-50',
              purple: 'border-purple-500 bg-purple-50',
              red: 'border-red-500 bg-red-50',
            };

            return (
              <Link key={item.href} href={item.href}>
                <div className={`bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer border-l-4 ${colorMap[item.color]}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Icon className="text-2xl text-gray-600" />
                        <h3 className="text-lg font-semibold text-gray-900">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600">{item.description}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-3">
                        {item.stat}
                      </p>
                    </div>
                    <FiChevronRight className="text-gray-400 text-2xl" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

function StatCard({ label, value, color, icon: Icon }) {
  const colorMap = {
    blue: 'border-blue-500 bg-blue-50',
    green: 'border-green-500 bg-green-50',
    red: 'border-red-500 bg-red-50',
    purple: 'border-purple-500 bg-purple-50',
  };

  return (
    <div className={`bg-white p-6 rounded-lg shadow border-l-4 ${colorMap[color]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <Icon className="text-3xl text-gray-400" />
      </div>
    </div>
  );
}
