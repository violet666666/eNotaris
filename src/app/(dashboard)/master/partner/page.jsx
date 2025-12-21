'use client';

import Layout from '@/components/layout/Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

export default function PartnerPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    kode: '',
    nama: '',
    jenisPartner: 'Partner',
    noTelepon: '',
    email: '',
    alamat: '',
    provinsi: '',
    kabKota: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/master/partner');
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
      const response = await axios.post('/api/master/partner', formData);
      if (response.data.success) {
        setData([...data, response.data.data]);
        setFormData({
          kode: '',
          nama: '',
          jenisPartner: 'Partner',
          noTelepon: '',
          email: '',
          alamat: '',
          provinsi: '',
          kabKota: '',
        });
        setShowForm(false);
        alert('Data berhasil ditambahkan');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Gagal menyimpan data');
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Master Partner</h1>
            <p className="text-gray-600 mt-1">Kelola data partner dan notaris</p>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setFormData({
                kode: '',
                nama: '',
                jenisPartner: 'Partner',
                noTelepon: '',
                email: '',
                alamat: '',
                provinsi: '',
                kabKota: '',
              });
            }}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            <FiPlus /> Tambah Partner
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Tambah Partner
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Kode"
                value={formData.kode}
                onChange={(e) =>
                  setFormData({ ...formData, kode: e.target.value })
                }
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Nama"
                value={formData.nama}
                onChange={(e) =>
                  setFormData({ ...formData, nama: e.target.value })
                }
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <select
                value={formData.jenisPartner}
                onChange={(e) =>
                  setFormData({ ...formData, jenisPartner: e.target.value })
                }
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Notaris">Notaris</option>
                <option value="Partner">Partner</option>
                <option value="Vendor">Vendor</option>
              </select>
              <input
                type="tel"
                placeholder="No Telepon"
                value={formData.noTelepon}
                onChange={(e) =>
                  setFormData({ ...formData, noTelepon: e.target.value })
                }
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Provinsi"
                value={formData.provinsi}
                onChange={(e) =>
                  setFormData({ ...formData, provinsi: e.target.value })
                }
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Kab/Kota"
                value={formData.kabKota}
                onChange={(e) =>
                  setFormData({ ...formData, kabKota: e.target.value })
                }
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Alamat"
                value={formData.alamat}
                onChange={(e) =>
                  setFormData({ ...formData, alamat: e.target.value })
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

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Kode
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Nama
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Jenis
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Kontak
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Lokasi
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    Belum ada data
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr key={item._id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {item.kode}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.nama}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                        {item.jenisPartner}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.noTelepon || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.kabKota}, {item.provinsi}
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
