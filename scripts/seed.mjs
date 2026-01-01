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
      { nama: "Persiapan Dokumen", deskripsi: "Tahap persiapan dokumen" },
      { nama: "Verifikasi", deskripsi: "Tahap verifikasi data" },
      { nama: "Penandatanganan", deskripsi: "Tahap penandatanganan" },
      { nama: "Pengarsipan", deskripsi: "Tahap pengarsipan dokumen" },
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
        nama: "Template Akta Jual Beli Standard",
        jenisAktaId: jenisAkta[0]._id,
        isi: "Template isi untuk akta jual beli...",
        status: "aktif",
      },
      {
        nama: "Template Akta Pemberian Hak Standard",
        jenisAktaId: jenisAkta[1]._id,
        isi: "Template isi untuk akta pemberian hak...",
        status: "aktif",
      },
    ]);
    console.log("✅ Created 2 template akta");

    // 10) Kas/Bank
    await MasterKasBank.insertMany([
      {
        nama: "Bank BCA - Rekening Notaris",
        tipe: "bank",
        nomorRekening: "1234567890",
        bank: "BCA",
        atasNama: "Eno Tari SH.M.Kn",
        saldo: 50000000,
        status: "aktif",
      },
      {
        nama: "Kas Tunai Kantor",
        tipe: "kas",
        atasNama: "Eno Tari SH.M.Kn",
        saldo: 10000000,
        status: "aktif",
      },
    ]);
    console.log("✅ Created 2 kas/bank");

    // 11) Partner
    await MasterPartner.insertMany([
      {
        nama: "CV Jaya Mandiri",
        tipe: "perusahaan",
        alamat: "Jl. Merdeka No.1, Makassar",
        noTelepon: "0411-123456",
        email: "info@jayamandiri.com",
        status: "aktif",
      },
      {
        nama: "PT Sejahtera Indonesia",
        tipe: "perusahaan",
        alamat: "Jl. Ahmad Yani No.50, Makassar",
        noTelepon: "0411-654321",
        email: "contact@sejahtera.com",
        status: "aktif",
      },
      {
        nama: "Notaris Mitra",
        tipe: "notaris",
        alamat: "Jl. Sudirman No.123, Makassar",
        noTelepon: "0411-999999",
        email: "notaris@mitra.com",
        status: "aktif",
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
        nomorLembar: "LK/001/2025",
        tanggal: new Date("2025-01-01"),
        judulPekerjaan: "Akta Jual Beli Tanah",
        jenisAktaId: jenisAkta[0]._id,
        pelangganId: pelanggans[0]._id,
        kotaId: kabkotas[0]._id,
        deskripsi: "Pembuatan akta jual beli tanah di Makassar",
        status: "DRAFT",
        nilaiPekerjaan: 2500000,
      },
      {
        nomorLembar: "LK/002/2025",
        tanggal: new Date("2025-01-05"),
        judulPekerjaan: "Akta Pemberian Hak Tanah",
        jenisAktaId: jenisAkta[1]._id,
        pelangganId: pelanggans[1]._id,
        kotaId: kabkotas[0]._id,
        deskripsi: "Pembuatan akta pemberian hak tanah",
        status: "PERSETUJUAN",
        nilaiPekerjaan: 2000000,
      },
      {
        nomorLembar: "LK/003/2025",
        tanggal: new Date("2025-01-10"),
        judulPekerjaan: "Akta Cerai",
        jenisAktaId: jenisAkta[2]._id,
        pelangganId: pelanggans[2]._id,
        kotaId: kabkotas[0]._id,
        deskripsi: "Pembuatan akta cerai",
        status: "PROSES",
        nilaiPekerjaan: 1500000,
      },
      {
        nomorLembar: "LK/004/2025",
        tanggal: new Date("2024-12-15"),
        judulPekerjaan: "Akta Perkawinan",
        jenisAktaId: jenisAkta[3]._id,
        pelangganId: pelanggans[0]._id,
        kotaId: kabkotas[0]._id,
        deskripsi: "Pembuatan akta perkawinan",
        status: "SELESAI",
        nilaiPekerjaan: 1800000,
      },
    ]);
    console.log("✅ Created 4 lembar kerja");

    // 14) Tagihan
    const tagihans = await Tagihan.insertMany([
      {
        nomorTagihan: "TAG/001/2025",
        tanggal: new Date("2025-01-01"),
        lembarKerjaId: lembarkerja[0]._id,
        pelangganId: pelanggans[0]._id,
        jumlah: 2500000,
        status: "BELUM_BAYAR",
        deskripsi: "Tagihan untuk akta jual beli",
      },
      {
        nomorTagihan: "TAG/002/2025",
        tanggal: new Date("2025-01-05"),
        lembarKerjaId: lembarkerja[1]._id,
        pelangganId: pelanggans[1]._id,
        jumlah: 2000000,
        status: "BELUM_BAYAR",
        deskripsi: "Tagihan untuk akta pemberian hak",
      },
      {
        nomorTagihan: "TAG/003/2025",
        tanggal: new Date("2025-01-10"),
        lembarKerjaId: lembarkerja[2]._id,
        pelangganId: pelanggans[2]._id,
        jumlah: 1500000,
        status: "SEBAGIAN_BAYAR",
        deskripsi: "Tagihan untuk akta cerai",
      },
    ]);
    console.log("✅ Created 3 tagihans");

    // 15) Pembayaran
    await Pembayaran.insertMany([
      {
        nomorPembayaran: "BYR/001/2025",
        tanggal: new Date("2025-01-08"),
        tagihanId: tagihans[2]._id,
        pelangganId: pelanggans[2]._id,
        jumlah: 800000,
        metodePembayaran: "transfer_bank",
        status: "SELESAI",
        keterangan: "Pembayaran sebagian akta cerai",
      },
      {
        nomorPembayaran: "BYR/002/2025",
        tanggal: new Date("2025-01-12"),
        tagihanId: tagihans[2]._id,
        pelangganId: pelanggans[2]._id,
        jumlah: 700000,
        metodePembayaran: "tunai",
        status: "SELESAI",
        keterangan: "Pembayaran sisa akta cerai",
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
