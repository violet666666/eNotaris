'use client';

import Layout from '@/components/layout/Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

export default function PembayaranPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    noTagihan: '',
    namePelanggan: '',
    jumlahBayar: 0,
    metodePembayaran: 'Transfer Bank',
    nomorReferensi: '',
    keterangan: '',
    operator: 'Admin',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/keuangan/pembayaran');
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
      const response = await axios.post('/api/keuangan/pembayaran', formData);
      if (response.data.success) {
        setData([response.data.data, ...data]);
        setFormData({
          noTagihan: '',
          namePelanggan: '',
          jumlahBayar: 0,
          metodePembayaran: 'Transfer Bank',
          nomorReferensi: '',
          keterangan: '',
          operator: 'Admin',
        });
        setShowForm(false);
        alert('Pembayaran berhasil dicatat');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Gagal menyimpan pembayaran');
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Daftar Pembayaran</h1>
            <p className="text-gray-600 mt-1">Catat pembayaran masuk dari pelanggan</p>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setFormData({
                noTagihan: '',
                namePelanggan: '',
                jumlahBayar: 0,
                metodePembayaran: 'Transfer Bank',
                nomorReferensi: '',
                keterangan: '',
                operator: 'Admin',
              });
            }}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            <FiPlus /> Catat Pembayaran
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Catat Pembayaran Baru
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="No Tagihan"
                required
                value={formData.noTagihan}
                onChange={(e) =>
                  setFormData({ ...formData, noTagihan: e.target.value })
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
                placeholder="Jumlah Bayar"
                required
                value={formData.jumlahBayar}
                onChange={(e) =>
                  setFormData({ ...formData, jumlahBayar: parseFloat(e.target.value) })
                }
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={formData.metodePembayaran}
                onChange={(e) =>
                  setFormData({ ...formData, metodePembayaran: e.target.value })
                }
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Tunai">Tunai</option>
                <option value="Transfer Bank">Transfer Bank</option>
                <option value="Cek">Cek</option>
                <option value="Giro">Giro</option>
              </select>
              <input
                type="text"
                placeholder="Nomor Referensi (Opsional)"
                value={formData.nomorReferensi}
                onChange={(e) =>
                  setFormData({ ...formData, nomorReferensi: e.target.value })
                }
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Operator"
                value={formData.operator}
                onChange={(e) =>
                  setFormData({ ...formData, operator: e.target.value })
                }
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Keterangan"
                value={formData.keterangan}
                onChange={(e) =>
                  setFormData({ ...formData, keterangan: e.target.value })
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
                  No Pembayaran
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  No Tagihan
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Pelanggan
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Jumlah
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Metode
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Tanggal
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
                    Tidak ada data pembayaran
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr key={item._id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {item.noPembayaran}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.noTagihan}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.namePelanggan}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      Rp {item.jumlahBayar?.toLocaleString('id-ID') || 0}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                        {item.metodePembayaran}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(item.tanggalBayar).toLocaleDateString('id-ID')}
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
