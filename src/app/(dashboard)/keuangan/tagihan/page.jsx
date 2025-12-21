'use client';

import Layout from '@/components/layout/Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FiPlus, FiEdit2, FiTrash2, FiFilter } from 'react-icons/fi';

export default function TagihanPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [formData, setFormData] = useState({
    noPesanan: '',
    namePelanggan: '',
    jumlah: 0,
    deskripsi: '',
    tanggalJatuhTempo: '',
    status: 'Belum Bayar',
  });

  useEffect(() => {
    fetchData();
  }, [filterStatus]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const url = filterStatus
        ? `/api/keuangan/tagihan?status=${filterStatus}`
        : '/api/keuangan/tagihan';
      const response = await axios.get(url);
      setData(response.data.data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/keuangan/tagihan', formData);
      if (response.data.success) {
        setData([response.data.data, ...data]);
        setFormData({
          noPesanan: '',
          namePelanggan: '',
          jumlah: 0,
          deskripsi: '',
          tanggalJatuhTempo: '',
          status: 'Belum Bayar',
        });
        setShowForm(false);
        alert('Tagihan berhasil ditambahkan');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Gagal menyimpan tagihan');
    }
  };

  const getStatusColor = (status) => {
    const colorMap = {
      'Belum Bayar': 'bg-red-100 text-red-800',
      'Sebagian Bayar': 'bg-yellow-100 text-yellow-800',
      'Lunas': 'bg-green-100 text-green-800',
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Daftar Tagihan</h1>
            <p className="text-gray-600 mt-1">Kelola tagihan pelanggan</p>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setFormData({
                noPesanan: '',
                namePelanggan: '',
                jumlah: 0,
                deskripsi: '',
                tanggalJatuhTempo: '',
                status: 'Belum Bayar',
              });
            }}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            <FiPlus /> Buat Tagihan
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Buat Tagihan Baru
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="No Pesanan"
                required
                value={formData.noPesanan}
                onChange={(e) =>
                  setFormData({ ...formData, noPesanan: e.target.value })
                }
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Nama Pelanggan"
                required
                value={formData.namePelanggan}
                onChange={(e) =>
                  setFormData({ ...formData, namePelanggan: e.target.value })
                }
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Jumlah"
                required
                value={formData.jumlah}
                onChange={(e) =>
                  setFormData({ ...formData, jumlah: parseFloat(e.target.value) })
                }
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                placeholder="Tanggal Jatuh Tempo"
                value={formData.tanggalJatuhTempo}
                onChange={(e) =>
                  setFormData({ ...formData, tanggalJatuhTempo: e.target.value })
                }
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Deskripsi"
                value={formData.deskripsi}
                onChange={(e) =>
                  setFormData({ ...formData, deskripsi: e.target.value })
                }
                className="col-span-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
              <div className="col-span-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Simpan
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500 transition"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        )}

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
            Semua
          </button>
          {['Belum Bayar', 'Sebagian Bayar', 'Lunas'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg transition ${
                filterStatus === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  No Tagihan
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  No Pesanan
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Pelanggan
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Jumlah
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Jatuh Tempo
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    Tidak ada data tagihan
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr key={item._id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {item.noTagihan}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.noPesanan}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.namePelanggan}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      Rp {item.jumlah?.toLocaleString('id-ID') || 0}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.tanggalJatuhTempo
                        ? new Date(item.tanggalJatuhTempo).toLocaleDateString('id-ID')
                        : '-'}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
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
