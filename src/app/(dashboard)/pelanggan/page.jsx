'use client';

import Layout from '@/components/layout/Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function PelangganPage() {
  const [pelanggan, setPelanggan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPelanggan();
  }, []);

  const fetchPelanggan = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/pelanggan');
      setPelanggan(response.data.data || []);
    } catch (error) {
      console.error('Error fetching pelanggan:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Daftar Pelanggan</h1>
            <p className="text-gray-600 mt-1">Kelola data pelanggan Anda</p>
          </div>
          <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition">
            Tambah Pelanggan
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Nama</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Kategori</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">No Telepon</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Provinsi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : pelanggan.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    Tidak ada data pelanggan
                  </td>
                </tr>
              ) : (
                pelanggan.map((item) => (
                  <tr key={item._id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{item.nama}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                        {item.kategori}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.noTelepon}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.email || '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.provinsi}</td>
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
