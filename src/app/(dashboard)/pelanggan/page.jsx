'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';

export default function PelangganPage() {
  const [pelanggans, setPelanggans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    noTelepon: '',
    alamat: '',
    kabkotaId: '',
    noKTP: '',
  });
  const [kabkotas, setKabkotas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch data
  useEffect(() => {
    fetchPelanggans();
    fetchKabkotas();
  }, []);

  const fetchPelanggans = async () => {
    try {
      const response = await axios.get('/api/pelanggan');
      setPelanggans(response.data.data || []);
      setError('');
    } catch (err) {
      setError('Gagal memuat data pelanggan');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchKabkotas = async () => {
    try {
      const response = await axios.get('/api/master/kab-kota');
      setKabkotas(response.data.data || []);
    } catch (err) {
      console.error('Gagal memuat kabupaten/kota:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/api/pelanggan/${editingId}`, formData);
        setPelanggans(
          pelanggans.map((p) => (p._id === editingId ? { ...p, ...formData } : p))
        );
      } else {
        const response = await axios.post('/api/pelanggan', formData);
        setPelanggans([...pelanggans, response.data.data]);
      }
      resetForm();
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Gagal menyimpan data');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus?')) return;
    try {
      await axios.delete(`/api/pelanggan/${id}`);
      setPelanggans(pelanggans.filter((p) => p._id !== id));
    } catch (err) {
      setError('Gagal menghapus pelanggan');
    }
  };

  const handleEdit = (pelanggan) => {
    setFormData({
      nama: pelanggan.nama,
      email: pelanggan.email,
      noTelepon: pelanggan.noTelepon,
      alamat: pelanggan.alamat,
      kabkotaId: pelanggan.kabkotaId?._id || '',
      noKTP: pelanggan.noKTP,
    });
    setEditingId(pelanggan._id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      nama: '',
      email: '',
      noTelepon: '',
      alamat: '',
      kabkotaId: '',
      noKTP: '',
    });
    setEditingId(null);
    setShowForm(false);
  };

  const filteredPelanggans = pelanggans.filter(
    (p) =>
      p.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pelanggan</h1>
          <p className="text-gray-600">Kelola data pelanggan notaris</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <FiPlus /> Tambah Pelanggan
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-xl font-bold">
            {editingId ? 'Edit Pelanggan' : 'Tambah Pelanggan Baru'}
          </h2>

          {error && <div className="bg-red-50 text-red-700 p-3 rounded">{error}</div>}

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama
              </label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                placeholder="Nama pelanggan"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                No KTP
              </label>
              <input
                type="text"
                name="noKTP"
                value={formData.noKTP}
                onChange={handleChange}
                placeholder="No KTP"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                No Telepon
              </label>
              <input
                type="tel"
                name="noTelepon"
                value={formData.noTelepon}
                onChange={handleChange}
                placeholder="08xxxxxxxxxx"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kota/Kabupaten
              </label>
              <select
                name="kabkotaId"
                value={formData.kabkotaId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
              >
                <option value="">Pilih Kota/Kabupaten</option>
                {kabkotas.map((kk) => (
                  <option key={kk._id} value={kk._id}>
                    {kk.nama}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alamat
              </label>
              <textarea
                name="alamat"
                value={formData.alamat}
                onChange={handleChange}
                placeholder="Alamat lengkap"
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
              ></textarea>
            </div>

            <div className="md:col-span-2 flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                {editingId ? 'Update' : 'Simpan'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 bg-gray-300 text-gray-900 py-2 rounded-lg hover:bg-gray-400"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center gap-2">
          <FiSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Cari pelanggan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-6 text-center">Loading...</div>
        ) : filteredPelanggans.length === 0 ? (
          <div className="p-6 text-center text-gray-500">Tidak ada data pelanggan</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Nama
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    No KTP
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Telepon
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Kota
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredPelanggans.map((pelanggan) => (
                  <tr key={pelanggan._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{pelanggan.nama}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{pelanggan.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{pelanggan.noKTP}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{pelanggan.noTelepon}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {pelanggan.kabkotaId?.nama || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm flex gap-2">
                      <button
                        onClick={() => handleEdit(pelanggan)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => handleDelete(pelanggan._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
