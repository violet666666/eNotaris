'use client';

import Layout from '@/components/layout/Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FiPlus, FiEdit2, FiTrash2, FiFilter } from 'react-icons/fi';

export default function LembarKerjaPage() {
  const [lembarKerja, setLembarKerja] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    fetchLembarKerja();
  }, []);

  const fetchLembarKerja = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/lembar-kerja');
      setLembarKerja(response.data.data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colorMap = {
      'Draft': 'bg-gray-100 text-gray-800',
      'Persetujuan': 'bg-yellow-100 text-yellow-800',
      'Proses': 'bg-blue-100 text-blue-800',
      'Selesai': 'bg-green-100 text-green-800',
      'Batal': 'bg-red-100 text-red-800',
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  };

  const filteredData = filterStatus 
    ? lembarKerja.filter(item => item.status === filterStatus)
    : lembarKerja;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Lembar Kerja</h1>
            <p className="text-gray-600 mt-1">Kelola pesanan dan proses notaris</p>
          </div>
          <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
            <FiPlus /> Buat Lembar Kerja
          </button>
        </div>

        {/* Filter */}
        <div className="bg-white p-4 rounded-lg shadow flex gap-4">
          <div className="flex items-center gap-2">
            <FiFilter className="text-gray-500" />
            <span className="text-gray-700 font-medium">Filter Status:</span>
          </div>
          <button
            onClick={() => setFilterStatus('')}
            className={`px-4 py-2 rounded-lg transition ${
              filterStatus === ''
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Semua ({lembarKerja.length})
          </button>
          {['Draft', 'Persetujuan', 'Proses', 'Selesai', 'Batal'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg transition ${
                filterStatus === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status} ({lembarKerja.filter(item => item.status === status).length})
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">No Pesanan</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Nama Pelanggan</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Kategori</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Layanan</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Tagihan</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    Tidak ada data
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => (
                  <tr key={item._id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.noPesanan}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.namePelanggan}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.kategori}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.layanan || '-'}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="text-gray-900 font-medium">Rp {item.totalTagihan?.toLocaleString('id-ID') || 0}</div>
                      <div className="text-xs text-gray-500">Bayar: Rp {item.totalDibayar?.toLocaleString('id-ID') || 0}</div>
                    </td>
                    <td className="px-6 py-4 text-sm flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <FiEdit2 />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
