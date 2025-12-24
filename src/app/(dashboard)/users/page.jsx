'use client';

import Layout from '@/components/layout/Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiFilter } from 'react-icons/fi';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    isActive: true,
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/users');
      setUsers(response.data.data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        const response = await axios.put(`/api/users/${formData._id}`, formData);
        setUsers(users.map(u => u._id === formData._id ? response.data.data : u));
        alert('User berhasil diupdate');
      } else {
        const response = await axios.post('/api/users', formData);
        setUsers([response.data.data, ...users]);
        alert('User berhasil ditambahkan');
      }
      resetForm();
    } catch (error) {
      console.error('Error:', error);
      alert(error.response?.data?.error || 'Gagal menyimpan user');
    }
  };

  const handleEdit = (user) => {
    setFormData({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: '',
      role: user.role,
      isActive: user.isActive,
    });
    setEditMode(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus user ini?')) return;
    
    try {
      await axios.delete(`/api/users/${id}`);
      setUsers(users.filter(u => u._id !== id));
      alert('User berhasil dihapus');
    } catch (error) {
      console.error('Error:', error);
      alert('Gagal menghapus user');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'user',
      isActive: true,
    });
    setEditMode(false);
    setShowForm(false);
  };

  const filteredUsers = users.filter(user => {
    const matchSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRole = roleFilter === '' || user.role === roleFilter;
    return matchSearch && matchRole;
  });

  const getRoleBadge = (role) => {
    const colorMap = {
      admin: 'bg-purple-100 text-purple-800',
      user: 'bg-blue-100 text-blue-800',
      staff: 'bg-green-100 text-green-800',
    };
    return colorMap[role] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600 mt-1">Kelola akses user sistem</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            <FiPlus /> Tambah User
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {editMode ? 'Edit User' : 'Tambah User Baru'}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nama Lengkap"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder={editMode ? 'Password (kosongkan jika tidak diubah)' : 'Password'}
                required={!editMode}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="user">User</option>
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </select>
              <div className="col-span-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="isActive" className="text-sm text-gray-700">
                  User Aktif
                </label>
              </div>
              <div className="col-span-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                >
                  {editMode ? 'Update' : 'Simpan'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500 transition"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Search & Filter */}
        <div className="bg-white p-4 rounded-lg shadow flex gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Cari user..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Semua Role</option>
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
            <option value="user">User</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Nama
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Role
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
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    Tidak ada data user
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleBadge(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {user.isActive ? 'Aktif' : 'Nonaktif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm flex gap-2">
                      <button 
                        onClick={() => handleEdit(user)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FiEdit2 />
                      </button>
                      <button 
                        onClick={() => handleDelete(user._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <StatCard label="Total Users" value={users.length} color="blue" />
          <StatCard label="Admin" value={users.filter(u => u.role === 'admin').length} color="purple" />
          <StatCard label="Staff" value={users.filter(u => u.role === 'staff').length} color="green" />
          <StatCard label="Aktif" value={users.filter(u => u.isActive).length} color="green" />
        </div>
      </div>
    </Layout>
  );
}

function StatCard({ label, value, color }) {
  const colorMap = {
    blue: 'border-blue-500 bg-blue-50',
    purple: 'border-purple-500 bg-purple-50',
    green: 'border-green-500 bg-green-50',
  };

  return (
    <div className={`bg-white p-4 rounded-lg shadow border-l-4 ${colorMap[color]}`}>
      <p className="text-gray-600 text-sm font-medium">{label}</p>
      <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
    </div>
  );
}
