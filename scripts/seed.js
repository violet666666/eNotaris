require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Models
const User = require('../src/models/User');
const Pelanggan = require('../src/models/Pelanggan');
const LembarKerja = require('../src/models/LembarKerja');
const Tagihan = require('../src/models/Tagihan');
const Pembayaran = require('../src/models/Pembayaran');

// Master Models
const MasterProvinsi = require('../src/models/MasterProvinsi');
const MasterKabKota = require('../src/models/MasterKabKota');
const MasterJenisAkta = require('../src/models/MasterJenisAkta');
const MasterJenisPajak = require('../src/models/MasterJenisPajak');
const MasterJenisProses = require('../src/models/MasterJenisProses');
const MasterJenisSertifikat = require('../src/models/MasterJenisSertifikat');
const MasterJenisSuratKeluar = require('../src/models/MasterJenisSuratKeluar');
const MasterTemplateAkta = require('../src/models/MasterTemplateAkta');
const MasterKasBank = require('../src/models/MasterKasBank');
const MasterPartner = require('../src/models/MasterPartner');

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Pelanggan.deleteMany({}),
      LembarKerja.deleteMany({}),
      Tagihan.deleteMany({}),
      Pembayaran.deleteMany({}),
      MasterProvinsi.deleteMany({}),
      MasterKabKota.deleteMany({}),
      MasterJenisAkta.deleteMany({}),
      MasterJenisPajak.deleteMany({}),
      MasterJenisProses.deleteMany({}),
      MasterJenisSertifikat.deleteMany({}),
      MasterJenisSuratKeluar.deleteMany({}),
      MasterTemplateAkta.deleteMany({}),
      MasterKasBank.deleteMany({}),
      MasterPartner.deleteMany({}),
    ]);
    console.log('Cleared existing data');

    // 1. Seed Users
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const users = await User.insertMany([
      {
        name: 'Eno Tari SH.M.Kn',
        email: 'admin@notaris.com',
        password: hashedPassword,
        role: 'admin',
        status: 'active',
      },
      {
        name: 'Staff Notaris',
        email: 'staff@notaris.com',
        password: hashedPassword,
        role: 'staff',
        status: 'active',
      },
      {
        name: 'User Notaris',
        email: 'user@notaris.com',
        password: hashedPassword,
        role: 'user',
        status: 'active',
      },
    ]);
    console.log('✅ Created 3 users');

    // 2. Seed Master Data - Provinsi
    const provinsis = await MasterProvinsi.insertMany([
      { nama: 'Jawa Barat', kode: 'JB' },
      { nama: 'Jawa Tengah', kode: 'JT' },
      { nama: 'Jawa Timur', kode: 'JI' },
      { nama: 'Sulawesi Selatan', kode: 'SS' },
      { nama: 'DKI Jakarta', kode: 'DKI' },
    ]);
    console.log('✅ Created 5 provinsis');

    // 3. Seed Master Data - Kabupaten/Kota
    const kabkotas = await MasterKabKota.insertMany([
      { nama: 'Kota Makassar', provinsiId: provinsis[3]._id, kode: 'MKS' },
      { nama: 'Bandung', provinsiId: provinsis[0]._id, kode: 'BDG' },
      { nama: 'Jakarta Selatan', provinsiId: provinsis[4]._id, kode: 'JKS' },
      { nama: 'Surabaya', provinsiId: provinsis[2]._id, kode: 'SBY' },
      { nama: 'Semarang', provinsiId: provinsis[1]._id, kode: 'SMG' },
    ]);
    console.log('✅ Created 5 kabupaten/kota');

    // 4. Seed Master Data - Jenis Akta
    const jenisAkta = await MasterJenisAkta.insertMany([
      { nama: 'Akta Jual Beli', kode: 'AJB' },
      { nama: 'Akta Pemberian Hak', kode: 'APH' },
      { nama: 'Akta Cerai', kode: 'AC' },
      { nama: 'Akta Perkawinan', kode: 'AP' },
      { nama: 'Akta Kematian', kode: 'AK' },
    ]);
    console.log('✅ Created 5 jenis akta');

    // 5. Seed Master Data - Jenis Pajak
    const jenisPajak = await MasterJenisPajak.insertMany([
      { nama: 'BPHTB', deskripsi: 'Bea Perolehan Hak atas Tanah dan Bangunan', tarif: 5 },
      { nama: 'PPN', deskripsi: 'Pajak Pertambahan Nilai', tarif: 10 },
      { nama: 'PPh', deskripsi: 'Pajak Penghasilan', tarif: 15 },
      { nama: 'Biaya Administrasi', deskripsi: 'Biaya administrasi notaris', tarif: 2 },
    ]);
    console.log('✅ Created 4 jenis pajak');

    // 6. Seed Master Data - Jenis Proses
    const jenisProses = await MasterJenisProses.insertMany([
      { nama: 'Persiapan Dokumen', deskripsi: 'Tahap persiapan dokumen' },
      { nama: 'Verifikasi', deskripsi: 'Tahap verifikasi data' },
      { nama: 'Penandatanganan', deskripsi: 'Tahap penandatanganan' },
      { nama: 'Pengarsipan', deskripsi: 'Tahap pengarsipan dokumen' },
    ]);
    console.log('✅ Created 4 jenis proses');

    // 7. Seed Master Data - Jenis Sertifikat
    const jenisSertifikat = await MasterJenisSertifikat.insertMany([
      { nama: 'Sertifikat Tanah', kode: 'ST' },
      { nama: 'Sertifikat Bangunan', kode: 'SB' },
      { nama: 'Sertifikat Hak Milik', kode: 'SHM' },
      { nama: 'Sertifikat Hak Guna Usaha', kode: 'SHGU' },
    ]);
    console.log('✅ Created 4 jenis sertifikat');

    // 8. Seed Master Data - Jenis Surat Keluar
    const jenisSuratKeluar = await MasterJenisSuratKeluar.insertMany([
      { nama: 'Surat Rekomendasi', kode: 'SR' },
      { nama: 'Surat Keterangan', kode: 'SK' },
      { nama: 'Surat Penetapan', kode: 'SP' },
      { nama: 'Surat Berita Acara', kode: 'SBA' },
    ]);
    console.log('✅ Created 4 jenis surat keluar');

    // 9. Seed Master Data - Template Akta
    const templateAkta = await MasterTemplateAkta.insertMany([
      { 
        nama: 'Template Akta Jual Beli Standard',
        jenisAktaId: jenisAkta[0]._id,
        isi: 'Template isi untuk akta jual beli...',
        status: 'aktif'
      },
      { 
        nama: 'Template Akta Pemberian Hak Standard',
        jenisAktaId: jenisAkta[1]._id,
        isi: 'Template isi untuk akta pemberian hak...',
        status: 'aktif'
      },
    ]);
    console.log('✅ Created 2 template akta');

    // 10. Seed Master Data - Kas Bank
    const kasBank = await MasterKasBank.insertMany([
      {
        nama: 'Bank BCA - Rekening Notaris',
        tipe: 'bank',
        nomorRekening: '1234567890',
        bank: 'BCA',
        atasNama: 'Eno Tari SH.M.Kn',
        saldo: 50000000,
        status: 'aktif'
      },
      {
        nama: 'Kas Tunai Kantor',
        tipe: 'kas',
        atasNama: 'Eno Tari SH.M.Kn',
        saldo: 10000000,
        status: 'aktif'
      },
    ]);
    console.log('✅ Created 2 kas/bank');

    // 11. Seed Master Data - Partner
    const partners = await MasterPartner.insertMany([
      {
        nama: 'CV Jaya Mandiri',
        tipe: 'perusahaan',
        alamat: 'Jl. Merdeka No.1, Makassar',
        noTelepon: '0411-123456',
        email: 'info@jayamandiri.com',
        status: 'aktif'
      },
      {
        nama: 'PT Sejahtera Indonesia',
        tipe: 'perusahaan',
        alamat: 'Jl. Ahmad Yani No.50, Makassar',
        noTelepon: '0411-654321',
        email: 'contact@sejahtera.com',
        status: 'aktif'
      },
      {
        nama: 'Notaris Mitra',
        tipe: 'notaris',
        alamat: 'Jl. Sudirman No.123, Makassar',
        noTelepon: '0411-999999',
        email: 'notaris@mitra.com',
        status: 'aktif'
      },
    ]);
    console.log('✅ Created 3 partners');

    // 12. Seed Pelanggan
    const pelanggans = await Pelanggan.insertMany([
      {
        nama: 'Budi Santoso',
        email: 'budi@example.com',
        noTelepon: '08123456789',
        alamat: 'Jl. Gatot Subroto No.1, Makassar',
        kabkotaId: kabkotas[0]._id,
        noKTP: '7371123456789012',
        status: 'aktif'
      },
      {
        nama: 'Siti Nurhaliza',
        email: 'siti@example.com',
        noTelepon: '08129876543',
        alamat: 'Jl. Pembela Kemerdekaan No.50, Makassar',
        kabkotaId: kabkotas[0]._id,
        noKTP: '7371234567890123',
        status: 'aktif'
      },
      {
        nama: 'Rudi Hartono',
        email: 'rudi@example.com',
        noTelepon: '08111111111',
        alamat: 'Jl. Bumi No.100, Makassar',
        kabkotaId: kabkotas[0]._id,
        noKTP: '7371345678901234',
        status: 'aktif'
      },
    ]);
    console.log('✅ Created 3 pelanggans');

    // 13. Seed Lembar Kerja
    const lembarkerja = await LembarKerja.insertMany([
      {
        nomorLembar: 'LK/001/2025',
        tanggal: new Date('2025-01-01'),
        judulPekerjaan: 'Akta Jual Beli Tanah',
        jenisAktaId: jenisAkta[0]._id,
        pelangganId: pelanggans[0]._id,
        kotaId: kabkotas[0]._id,
        deskripsi: 'Pembuatan akta jual beli tanah di Makassar',
        status: 'DRAFT',
        nilaiPekerjaan: 2500000,
      },
      {
        nomorLembar: 'LK/002/2025',
        tanggal: new Date('2025-01-05'),
        judulPekerjaan: 'Akta Pemberian Hak Tanah',
        jenisAktaId: jenisAkta[1]._id,
        pelangganId: pelanggans[1]._id,
        kotaId: kabkotas[0]._id,
        deskripsi: 'Pembuatan akta pemberian hak tanah',
        status: 'PERSETUJUAN',
        nilaiPekerjaan: 2000000,
      },
      {
        nomorLembar: 'LK/003/2025',
        tanggal: new Date('2025-01-10'),
        judulPekerjaan: 'Akta Cerai',
        jenisAktaId: jenisAkta[2]._id,
        pelangganId: pelanggans[2]._id,
        kotaId: kabkotas[0]._id,
        deskripsi: 'Pembuatan akta cerai',
        status: 'PROSES',
        nilaiPekerjaan: 1500000,
      },
      {
        nomorLembar: 'LK/004/2025',
        tanggal: new Date('2024-12-15'),
        judulPekerjaan: 'Akta Perkawinan',
        jenisAktaId: jenisAkta[3]._id,
        pelangganId: pelanggans[0]._id,
        kotaId: kabkotas[0]._id,
        deskripsi: 'Pembuatan akta perkawinan',
        status: 'SELESAI',
        nilaiPekerjaan: 1800000,
      },
    ]);
    console.log('✅ Created 4 lembar kerja');

    // 14. Seed Tagihan
    const tagihans = await Tagihan.insertMany([
      {
        nomorTagihan: 'TAG/001/2025',
        tanggal: new Date('2025-01-01'),
        lembarKerjaId: lembarkerja[0]._id,
        pelangganId: pelanggans[0]._id,
        jumlah: 2500000,
        status: 'BELUM_BAYAR',
        deskripsi: 'Tagihan untuk akta jual beli',
      },
      {
        nomorTagihan: 'TAG/002/2025',
        tanggal: new Date('2025-01-05'),
        lembarKerjaId: lembarkerja[1]._id,
        pelangganId: pelanggans[1]._id,
        jumlah: 2000000,
        status: 'BELUM_BAYAR',
        deskripsi: 'Tagihan untuk akta pemberian hak',
      },
      {
        nomorTagihan: 'TAG/003/2025',
        tanggal: new Date('2025-01-10'),
        lembarKerjaId: lembarkerja[2]._id,
        pelangganId: pelanggans[2]._id,
        jumlah: 1500000,
        status: 'SEBAGIAN_BAYAR',
        deskripsi: 'Tagihan untuk akta cerai',
      },
    ]);
    console.log('✅ Created 3 tagihans');

    // 15. Seed Pembayaran
    const pembayarans = await Pembayaran.insertMany([
      {
        nomorPembayaran: 'BYR/001/2025',
        tanggal: new Date('2025-01-08'),
        tagihanId: tagihans[2]._id,
        pelangganId: pelanggans[2]._id,
        jumlah: 800000,
        metodePembayaran: 'transfer_bank',
        status: 'SELESAI',
        keterangan: 'Pembayaran sebagian akta cerai',
      },
      {
        nomorPembayaran: 'BYR/002/2025',
        tanggal: new Date('2025-01-12'),
        tagihanId: tagihans[2]._id,
        pelangganId: pelanggans[2]._id,
        jumlah: 700000,
        metodePembayaran: 'tunai',
        status: 'SELESAI',
        keterangan: 'Pembayaran sisa akta cerai',
      },
    ]);
    console.log('✅ Created 2 pembayarans');

    console.log('\n✅ Database seeding completed successfully!');
    console.log('\n📝 Credentials:');
    console.log('Email: admin@notaris.com');
    console.log('Password: admin123');
    console.log('\n📊 Data Summary:');
    console.log(`- Users: ${users.length}`);
    console.log(`- Pelanggans: ${pelanggans.length}`);
    console.log(`- Lembar Kerja: ${lembarkerja.length}`);
    console.log(`- Tagihans: ${tagihans.length}`);
    console.log(`- Pembayarans: ${pembayarans.length}`);

    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();
