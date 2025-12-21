'use client';

import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';

export default function MasterPage() {
  const masterItems = [
    {
      title: 'Provinsi',
      description: 'Kelola data provinsi',
      href: '/master/provinsi',
      icon: '🗺️',
    },
    {
      title: 'Kabupaten/Kota',
      description: 'Kelola data kabupaten dan kota',
      href: '/master/kab-kota',
      icon: '🏙️',
    },
    {
      title: 'Jenis Akta',
      description: 'Kelola jenis dokumen akta',
      href: '/master/jenis-akta',
      icon: '📄',
    },
    {
      title: 'Template Akta',
      description: 'Kelola template dokumen akta',
      href: '/master/template-akta',
      icon: '🖋️',
    },
    {
      title: 'Jenis Pajak',
      description: 'Kelola jenis pajak dan tarif',
      href: '/master/jenis-pajak',
      icon: '💰',
    },
    {
      title: 'Jenis Proses',
      description: 'Kelola jenis proses lainnya',
      href: '/master/jenis-proses',
      icon: '⚙️',
    },
    {
      title: 'Jenis Sertifikat',
      description: 'Kelola jenis sertifikat tanah',
      href: '/master/jenis-sertifikat',
      icon: '📋',
    },
    {
      title: 'Surat Keluar',
      description: 'Kelola jenis surat keluar notaris',
      href: '/master/surat-keluar',
      icon: '✉️',
    },
    {
      title: 'Kas & Bank',
      description: 'Kelola rekening kas dan bank',
      href: '/master/kas-bank',
      icon: '🏦',
    },
    {
      title: 'Partner',
      description: 'Kelola data partner dan notaris',
      href: '/master/partner',
      icon: '🤝',
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Master Data</h1>
          <p className="text-gray-600 mt-2">Kelola data referensi sistem</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-6">
          {masterItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer border border-gray-200 hover:border-blue-500">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {item.description}
                    </p>
                  </div>
                  <FiChevronRight className="text-gray-400 text-2xl" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
