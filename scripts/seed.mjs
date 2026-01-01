import path from "path";
import { fileURLToPath } from "url";

import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// ====== load .env dari root project ======
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// pakai .env (sesuai preferensi Anda)
dotenv.config({ path: path.resolve(__dirname, "../.env") });

if (!process.env.MONGODB_URI) {
  console.error("❌ ERROR: MONGODB_URI tidak ditemukan di .env");
  process.exit(1);
}

// ====== import models (ESM) ======
import User from "../src/models/User.js";
import Pelanggan from "../src/models/Pelanggan.js";
import LembarKerja from "../src/models/LembarKerja.js";
import Tagihan from "../src/models/Tagihan.js";
import Pembayaran from "../src/models/Pembayaran.js";

import MasterProvinsi from "../src/models/MasterProvinsi.js";
import MasterKabKota from "../src/models/MasterKabKota.js";
import MasterJenisAkta from "../src/models/MasterJenisAkta.js";
import MasterJenisPajak from "../src/models/MasterJenisPajak.js";
import MasterJenisProses from "../src/models/MasterJenisProses.js";
import MasterJenisSertifikat from "../src/models/MasterJenisSertifikat.js";
import MasterJenisSuratKeluar from "../src/models/MasterJenisSuratKeluar.js";
import MasterTemplateAkta from "../src/models/MasterTemplateAkta.js";
import MasterKasBank from "../src/models/MasterKasBank.js";
import MasterPartner from "../src/models/MasterPartner.js";

async function connectDB() {
  await mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 60000,
    connectTimeoutMS: 60000,
    socketTimeoutMS: 60000,
  });
}

async function seedDatabase() {
  try {
    await connectDB();
    console.log("✅ Connected to MongoDB");

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
    console.log("🗑️ Cleared existing data");

    // 1) Users
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const users = await User.insertMany([
      {
        name: "Eno Tari SH.M.Kn",
        email: "admin@notaris.com",
        password: hashedPassword,
        role: "admin",
        isActive: true,
      },
      {
        name: "Staff Notaris",
        email: "staff@notaris.com",
        password: hashedPassword,
        role: "staff",
        isActive: true,
      },
      {
        name: "User Notaris",
        email: "user@notaris.com",
        password: hashedPassword,
        role: "user",
        isActive: true,
      },
    ]);
    console.log("✅ Created 3 users");

    // 2) Provinsi
    const provinsis = await MasterProvinsi.insertMany([
      { nama: "Jawa Barat", kode: "JB" },
      { nama: "Jawa Tengah", kode: "JT" },
      { nama: "Jawa Timur", kode: "JI" },
      { nama: "Sulawesi Selatan", kode: "SS" },
      { nama: "DKI Jakarta", kode: "DKI" },
    ]);
    console.log("✅ Created 5 provinsis");

    // 3) Kab/Kota
    const kabkotas = await MasterKabKota.insertMany([
      { nama: "Kota Makassar", provinsiId: provinsis[3]._id, kode: "MKS" },
      { nama: "Bandung", provinsiId: provinsis[0]._id, kode: "BDG" },
      { nama: "Jakarta Selatan", provinsiId: provinsis[4]._id, kode: "JKS" },
      { nama: "Surabaya", provinsiId: provinsis[2]._id, kode: "SBY" },
      { nama: "Semarang", provinsiId: provinsis[1]._id, kode: "SMG" },
    ]);
    console.log("✅ Created 5 kabupaten/kota");

    // 4) Jenis Akta
    const jenisAkta = await MasterJenisAkta.insertMany([
      { nama: "Akta Jual Beli", kode: "AJB" },
      { nama: "Akta Pemberian Hak", kode: "APH" },
      { nama: "Akta Cerai", kode: "AC" },
      { nama: "Akta Perkawinan", kode: "AP" },
      { nama: "Akta Kematian", kode: "AK" },
    ]);
    console.log("✅ Created 5 jenis akta");

    // 5) Jenis Pajak
    await MasterJenisPajak.insertMany([
  {
    kode: "BPHTB",
    nama: "BPHTB",
    persentase: 5,
    deskripsi: "Bea Perolehan Hak atas Tanah dan Bangunan",
    isActive: true,
  },
  {
    kode: "PPN",
    nama: "PPN",
    persentase: 10,
    deskripsi: "Pajak Pertambahan Nilai",
    isActive: true,
  },
  {
    kode: "PPh",
    nama: "PPh",
    persentase: 15,
    deskripsi: "Pajak Penghasilan",
    isActive: true,
  },
  {
    kode: "ADM",
    nama: "Biaya Administrasi",
    persentase: 2,
    deskripsi: "Biaya administrasi notaris",
    isActive: true,
  },
]);
console.log("✅ Created 4 jenis pajak");


    // 6) Jenis Proses
    await MasterJenisProses.insertMany([
  {
    kode: "PRS",
    nama: "Persiapan Dokumen",
    deskripsi: "Tahap persiapan dokumen",
    isActive: true,
  },
  {
    kode: "VRF",
    nama: "Verifikasi",
    deskripsi: "Tahap verifikasi data",
    isActive: true,
  },
  {
    kode: "TTD",
    nama: "Penandatanganan",
    deskripsi: "Tahap penandatanganan",
    isActive: true,
  },
  {
    kode: "ARS",
    nama: "Pengarsipan",
    deskripsi: "Tahap pengarsipan dokumen",
    isActive: true,
  },
]);
console.log("✅ Created 4 jenis proses");


    // 7) Jenis Sertifikat
    await MasterJenisSertifikat.insertMany([
      { nama: "Sertifikat Tanah", kode: "ST" },
      { nama: "Sertifikat Bangunan", kode: "SB" },
      { nama: "Sertifikat Hak Milik", kode: "SHM" },
      { nama: "Sertifikat Hak Guna Usaha", kode: "SHGU" },
    ]);
    console.log("✅ Created 4 jenis sertifikat");

    // 8) Jenis Surat Keluar
    await MasterJenisSuratKeluar.insertMany([
      { nama: "Surat Rekomendasi", kode: "SR" },
      { nama: "Surat Keterangan", kode: "SK" },
      { nama: "Surat Penetapan", kode: "SP" },
      { nama: "Surat Berita Acara", kode: "SBA" },
    ]);
    console.log("✅ Created 4 jenis surat keluar");

    // 9) Template Akta
    await MasterTemplateAkta.insertMany([
  {
    kode: "TMP-AJB",
    nama: "Template Akta Jual Beli Standard",
    jenisAkta: "AJB",
    content: "Template isi untuk akta jual beli...",
    isActive: true,
  },
  {
    kode: "TMP-APH",
    nama: "Template Akta Pemberian Hak Standard",
    jenisAkta: "APH",
    content: "Template isi untuk akta pemberian hak...",
    isActive: true,
  },
]);
console.log("✅ Created 2 template akta");


    // 10) Kas/Bank
   await MasterKasBank.insertMany([
  {
    kode: "BANK-BCA",
    nama: "Bank BCA - Rekening Notaris",
    jenis: "Bank",
    nomorRekening: "1234567890",
    bankNama: "BCA",
    atasNama: "Eno Tari SH.M.Kn",
    saldo: 50000000,
    isActive: true,
  },
  {
    kode: "KAS-TUNAI",
    nama: "Kas Tunai Kantor",
    jenis: "Kas",
    atasNama: "Eno Tari SH.M.Kn",
    saldo: 10000000,
    isActive: true,
  },
]);
console.log("✅ Created 2 kas/bank");


    // 11) Partner
    await MasterPartner.insertMany([
  {
    kode: "PRT-JAYA",
    nama: "CV Jaya Mandiri",
    jenisPartner: "Partner",
    alamat: "Jl. Merdeka No.1, Makassar",
    noTelepon: "0411-123456",
    email: "info@jayamandiri.com",
    provinsi: "Sulawesi Selatan",
    kabKota: "Kota Makassar",
    isActive: true,
  },
  {
    kode: "PRT-SEJAHTERA",
    nama: "PT Sejahtera Indonesia",
    jenisPartner: "Partner",
    alamat: "Jl. Ahmad Yani No.50, Makassar",
    noTelepon: "0411-654321",
    email: "contact@sejahtera.com",
    provinsi: "Sulawesi Selatan",
    kabKota: "Kota Makassar",
    isActive: true,
  },
  {
    kode: "NTR-MITRA",
    nama: "Notaris Mitra",
    jenisPartner: "Notaris",
    alamat: "Jl. Sudirman No.123, Makassar",
    noTelepon: "0411-999999",
    email: "notaris@mitra.com",
    provinsi: "Sulawesi Selatan",
    kabKota: "Kota Makassar",
    isActive: true,
  },
]);
console.log("✅ Created 3 partners");


    // 12) Pelanggan
    const pelanggans = await Pelanggan.insertMany([
      {
        nama: "Budi Santoso",
        email: "budi@example.com",
        noTelepon: "08123456789",
        alamat: "Jl. Gatot Subroto No.1, Makassar",
        kabkotaId: kabkotas[0]._id,
        noKTP: "7371123456789012",
        status: "aktif",
      },
      {
        nama: "Siti Nurhaliza",
        email: "siti@example.com",
        noTelepon: "08129876543",
        alamat: "Jl. Pembela Kemerdekaan No.50, Makassar",
        kabkotaId: kabkotas[0]._id,
        noKTP: "7371234567890123",
        status: "aktif",
      },
      {
        nama: "Rudi Hartono",
        email: "rudi@example.com",
        noTelepon: "08111111111",
        alamat: "Jl. Bumi No.100, Makassar",
        kabkotaId: kabkotas[0]._id,
        noKTP: "7371345678901234",
        status: "aktif",
      },
    ]);
    console.log("✅ Created 3 pelanggans");

    // 13) Lembar Kerja
    const lembarkerja = await LembarKerja.insertMany([
  {
    noPesanan: "LK/001/2025",
    namePelanggan: pelanggans[0].nama,
    kategori: "Pribadi",
    status: "Draft",
    layanan: "Akta Jual Beli Tanah",
    totalTagihan: 2500000,
    totalDibayar: 0,
    targetSelesai: new Date("2025-01-15"),
  },
  {
    noPesanan: "LK/002/2025",
    namePelanggan: pelanggans[1].nama,
    kategori: "Pribadi",
    status: "Persetujuan",
    layanan: "Akta Pemberian Hak Tanah",
    totalTagihan: 2000000,
    totalDibayar: 0,
    targetSelesai: new Date("2025-01-20"),
  },
  {
    noPesanan: "LK/003/2025",
    namePelanggan: pelanggans[2].nama,
    kategori: "Pribadi",
    status: "Proses",
    layanan: "Akta Cerai",
    totalTagihan: 1500000,
    totalDibayar: 800000,
    targetSelesai: new Date("2025-01-25"),
  },
  {
    noPesanan: "LK/004/2025",
    namePelanggan: pelanggans[0].nama,
    kategori: "Perusahaan",
    status: "Selesai",
    layanan: "Akta Perkawinan",
    totalTagihan: 1800000,
    totalDibayar: 1800000,
    targetSelesai: new Date("2024-12-30"),
  },
]);
console.log("✅ Created 4 lembar kerja");


    // 14) Tagihan
   const tagihans = await Tagihan.insertMany([
  {
    noTagihan: "TAG/001/2025",
    lembarKerjaId: lembarkerja[0]._id,
    noPesanan: lembarkerja[0].noPesanan,
    namePelanggan: lembarkerja[0].namePelanggan,
    jumlah: 2500000,
    status: "Belum Bayar",
    deskripsi: "Tagihan untuk Akta Jual Beli",
    tanggalTagihan: new Date("2025-01-01"),
    tanggalJatuhTempo: new Date("2025-01-15"),
    sisaBayar: 2500000,
  },
  {
    noTagihan: "TAG/002/2025",
    lembarKerjaId: lembarkerja[1]._id,
    noPesanan: lembarkerja[1].noPesanan,
    namePelanggan: lembarkerja[1].namePelanggan,
    jumlah: 2000000,
    status: "Belum Bayar",
    deskripsi: "Tagihan untuk Akta Pemberian Hak",
    tanggalTagihan: new Date("2025-01-05"),
    tanggalJatuhTempo: new Date("2025-01-20"),
    sisaBayar: 2000000,
  },
  {
    noTagihan: "TAG/003/2025",
    lembarKerjaId: lembarkerja[2]._id,
    noPesanan: lembarkerja[2].noPesanan,
    namePelanggan: lembarkerja[2].namePelanggan,
    jumlah: 1500000,
    status: "Sebagian Bayar",
    deskripsi: "Tagihan untuk Akta Cerai",
    tanggalTagihan: new Date("2025-01-10"),
    tanggalJatuhTempo: new Date("2025-01-25"),
    sisaBayar: 700000,
  },
]);
console.log("✅ Created 3 tagihans");


    // 15) Pembayaran
    await Pembayaran.insertMany([
  {
    noPembayaran: "BYR/001/2025",
    tagihanId: tagihans[2]._id,
    noTagihan: tagihans[2].noTagihan,
    namePelanggan: tagihans[2].namePelanggan,
    jumlahBayar: 800000,
    metodePembayaran: "Transfer Bank",
    nomorReferensi: "TRF-001",
    tanggalBayar: new Date("2025-01-08"),
    keterangan: "Pembayaran sebagian akta cerai",
    operator: "seed",
  },
  {
    noPembayaran: "BYR/002/2025",
    tagihanId: tagihans[2]._id,
    noTagihan: tagihans[2].noTagihan,
    namePelanggan: tagihans[2].namePelanggan,
    jumlahBayar: 700000,
    metodePembayaran: "Tunai",
    tanggalBayar: new Date("2025-01-12"),
    keterangan: "Pembayaran sisa akta cerai",
    operator: "seed",
  },
]);
console.log("✅ Created 2 pembayarans");


    console.log("\n✅ Database seeding completed successfully!");
    console.log("\n📝 Credentials:");
    console.log("Email: admin@notaris.com");
    console.log("Password: admin123");
    console.log("\n📊 Data Summary:");
    console.log(`- Users: ${users.length}`);
    console.log(`- Pelanggans: ${pelanggans.length}`);
    console.log(`- Lembar Kerja: ${lembarkerja.length}`);
    console.log(`- Tagihans: ${tagihans.length}`);
    console.log(`- Pembayarans: 2`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error?.message || error);
    console.error(error);
    process.exit(1);
  }
}

seedDatabase();
