'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiArrowRight, FiCheck } from 'react-icons/fi';

export default function LandingPage() {
  const router = useRouter();

  // Auto redirect ke login jika sudah login
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  const features = [
    {
      icon: '📋',
      title: 'Lembar Kerja',
      description: 'Kelola semua pekerjaan notaris dengan sistem yang terorganisir',
    },
    {
      icon: '💰',
      title: 'Manajemen Keuangan',
      description: 'Catat tagihan, pembayaran, dan laporan keuangan dengan mudah',
    },
    {
      icon: '📚',
      title: 'Master Data',
      description: 'Atur data referensi seperti provinsi, jenis akta, dan partner',
    },
    {
      icon: '👥',
      title: 'User Management',
      description: 'Kelola pengguna dengan role-based access control',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
      {/* Header Navigation */}
      <nav className="bg-white bg-opacity-10 backdrop-blur-md border-b border-white border-opacity-10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="text-3xl">📋</div>
              <div>
                <h1 className="text-white font-bold text-xl">eNotaris</h1>
                <p className="text-blue-100 text-xs">Sistem Administrasi Notaris</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Link
                href="/login"
                className="text-white hover:text-blue-100 transition font-medium"
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Daftar
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              Sistem Administrasi Notaris Modern
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Kelola semua aspek usaha notaris Anda dengan mudah. Dari lembar kerja, keuangan, hingga manajemen user - semua dalam satu platform.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition transform hover:scale-105"
            >
              Masuk ke Sistem <FiArrowRight />
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:bg-opacity-10 transition"
            >
              Buat Akun Baru
            </Link>
          </div>

          {/* Quick Links */}
          <div className="pt-8">
            <p className="text-blue-100 mb-4">Demo Akun:</p>
            <div className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded-lg p-4 inline-block">
              <p className="text-white font-mono text-sm">
                Email: <span className="font-bold">admin@notaris.com</span>
              </p>
              <p className="text-white font-mono text-sm">
                Password: <span className="font-bold">admin123</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white bg-opacity-5 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Fitur Lengkap
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded-lg p-6 hover:bg-opacity-20 transition transform hover:scale-105"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-blue-100">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Mengapa Memilih eNotaris?
          </h2>

          <div className="space-y-6">
            {[
              'Antarmuka yang mudah digunakan dan intuitif',
              'Keamanan data dengan enkripsi tingkat enterprise',
              'Laporan dan analitik real-time',
              'Support tim profesional 24/7',
              'Skalabilitas untuk bisnis yang berkembang',
              'Update fitur berkala dan peningkatan keamanan',
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <FiCheck className="text-2xl text-green-400" />
                </div>
                <div>
                  <p className="text-lg text-white">{benefit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-white bg-opacity-5 py-20 px-4">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold text-white">
            Siap Memulai?
          </h2>
          <p className="text-xl text-blue-100">
            Bergabunglah dengan ribuan pengguna eNotaris yang telah mempercayai kami untuk mengelola bisnis notaris mereka.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition transform hover:scale-105"
          >
            Masuk Sekarang <FiArrowRight />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white border-opacity-10 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-blue-100">
            © 2025 eNotaris. Semua hak dilindungi.
          </p>
          <p className="text-blue-200 text-sm mt-2">
            Dibuat dengan ❤️ untuk notaris Indonesia
          </p>
        </div>
      </footer>
    </div>
  );
}
