'use client';

import Layout from '@/components/layout/Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FiDownload, FiCalendar } from 'react-icons/fi';

export default function LaporanPage() {
  const [stats, setStats] = useState({
    totalTagihan: 0,
    totalBelumBayar: 0,
    totalPembayaran: 0,
    efektivitas: '0%',
  });
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [tagihanRes, pembayaranRes] = await Promise.all([
        axios.get('/api/keuangan/tagihan'),
        axios.get('/api/keuangan/pembayaran'),
      ]);

      const totalTagihan = tagihanRes.data.stats?.totalTagihan || 0;
      const totalPembayaran = pembayaranRes.data.stats?.totalPembayaran || 0;
      const totalBelumBayar = tagihanRes.data.stats?.totalBelumBayar || 0;
      const efektivitas = totalTagihan > 0
        ? ((totalPembayaran / totalTagihan) * 100).toFixed(2)
        : 0;

      setStats({
        totalTagihan,
        totalBelumBayar,
        totalPembayaran,
        efektivitas: `${efektivitas}%`,
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    alert('Fitur export akan diimplementasikan di fase selanjutnya');
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Laporan Keuangan</h1>
            <p className="text-gray-600 mt-1">Lihat analisis dan laporan keuangan</p>
          </div>
          <button
            onClick={handleExport}
            className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
          >
            <FiDownload /> Export Laporan
          </button>
        </div>

        {/* Filter */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter Periode</h2>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dari Tanggal
              </label>
              <div className="flex items-center gap-2">
                <FiCalendar className="text-gray-400" />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sampai Tanggal
              </label>
              <div className="flex items-center gap-2">
                <FiCalendar className="text-gray-400" />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              Terapkan
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6">
          <ReportCard
            label="Total Tagihan"
            value={`Rp ${stats.totalTagihan.toLocaleString('id-ID')}`}
            color="blue"
          />
          <ReportCard
            label="Belum Dibayar"
            value={`Rp ${stats.totalBelumBayar.toLocaleString('id-ID')}`}
            color="red"
          />
          <ReportCard
            label="Total Pembayaran"
            value={`Rp ${stats.totalPembayaran.toLocaleString('id-ID')}`}
            color="green"
          />
          <ReportCard
            label="Efektivitas Pembayaran"
            value={stats.efektivitas}
            color="purple"
          />
        </div>

        {/* Grafik Placeholder */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Tren Tagihan & Pembayaran
            </h3>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Grafik akan ditampilkan di sini</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Status Pembayaran
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Lunas</span>
                  <span className="text-sm font-semibold text-gray-900">40%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full bg-green-500" style={{ width: '40%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Sebagian Bayar</span>
                  <span className="text-sm font-semibold text-gray-900">30%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full bg-yellow-500" style={{ width: '30%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Belum Bayar</span>
                  <span className="text-sm font-semibold text-gray-900">30%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full bg-red-500" style={{ width: '30%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function ReportCard({ label, value, color }) {
  const colorMap = {
    blue: 'border-blue-500 bg-blue-50',
    green: 'border-green-500 bg-green-50',
    red: 'border-red-500 bg-red-50',
    purple: 'border-purple-500 bg-purple-50',
  };

  return (
    <div className={`bg-white p-6 rounded-lg shadow border-l-4 ${colorMap[color]}`}>
      <p className="text-gray-600 text-sm font-medium">{label}</p>
      <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
    </div>
  );
}
