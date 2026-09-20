# Struktur Folder & File Project - Sistem Informasi Bank Sampah Jambangan
---

```text
bank-sampah-jambangan/
│
├── src/                          # Source Code Utama (Development)
│   ├── css/
│   │   └── main.css              # Input file Tailwind CSS & Custom Directives (@layer)
│   │
│   └── js/                       # Modul JavaScript Berdasarkan Role & Fitur
│       ├── config.js             # Konfigurasi dasar (Base URL, API Key, Client Setting)
│       │
│       ├── auth/                 # Logika Autentikasi
│       │   ├── login.js          # Handling login multi-role (Nasabah/Admin/Super Admin)
│       │   └── register.js       # Handling registrasi nasabah baru (NIK & Password)
│       │
│       ├── nasabah/              # Logika Fitur Role User (Nasabah)
│       │   ├── profile-check.js  # Validasi & notifikasi mandatory profile setup
│       │   ├── setor-sampah.js   # Handling form pengajuan setor & preview foto
│       │   ├── jadwal-harga.js   # Rendering tabel jadwal RW & harga harian
│       │   └── pencairan.js      # Handling pengajuan & tracking status pencairan tunai
│       │
│       ├── admin/                # Logika Fitur Role Admin RW (Pengurus Bank Sampah)
│       │   ├── timbang-sampah.js # Calculation otomatis (Berat x Harga) & update status
│       │   ├── verifikasi-pencairan.js # ACC / Tolak penyerahan uang tunai
│       │   ├── kelola-harga.js   # Form update harga harian per kg & kondisi
│       │   ├── kelola-jadwal.js  # Form update jadwal operasional titik kumpul
│       │   └── nasabah-rw.js     # Rendering data & detail profil nasabah RW
│       │
│       ├── super-admin/          # Logika Fitur Role Super Admin (Kelurahan)
│       │   ├── unit-rw.js        # Manajemen Bank Sampah Unit RW 01 - RW 07
│       │   ├── akun-admin.js     # Pembuatan akun & reset password pengurus RW
│       │   ├── e-commerce.js     # CRUD katalog produk daur ulang online
│       │   └── laporan.js        # Rekapitulasi total sampah, pendapatan & grafik
│       │
│       └── utils/                # Helper Functions (Shared Utilities)
│           ├── format-rupiah.js  # Converter angka ke format currency (Rp)
│           ├── date-picker.js    # Formatting & validasi tanggal operasional
│           └── image-preview.js  # Utility preview foto sebelum di-upload
│
├── public/                       # Assets & File Produksi (Siap Deploy / Akses Web)
│   ├── css/
│   │   └── style.css             # Output CSS akhir hasil build Tailwind (Di-link ke HTML)
│   │
│   ├── assets/                   # Media & Aset Statis / Dinamis
│   │   ├── images/               # ASET STATIS (UI & Design Web)
│   │   │   ├── icons/            # Favicon & Ikon Kategori (plastik, kertas, logam)
│   │   │   ├── logo-surabaya.png # Logo Pemkot Surabaya / Kelurahan Jambangan
│   │   │   ├── logo-bank-sampah.png # Logo Utama Bank Sampah Jambangan
│   │   │   ├── banner-hero.jpg   # Banner/CTA Landing Page
│   │   │   └── default-avatar.png# Profil default jika user belum upload foto
│   │   │
│   │   └── uploads/              # ASET DINAMIS (User Generated Content / Storage Local)
│   │       ├── profiles/         # Storage foto profil nasabah (Form Profil Mandatory)
│   │       ├── bukti-setoran/    # Storage foto bukti kondisi sampah saat pengajuan
│   │       └── produk-daur-ulang/# Storage foto produk kerajinan e-commerce
│   │
│   /* --- HALAMAN HTML (PER ROLE) --- */
│   ├── index.html                # Landing Page & Katalog Produk Daur Ulang (Publik)
│   ├── login.html                # Halaman Login Multi-Role (Nasabah/Admin/Super Admin)
│   ├── register.html             # Halaman Registrasi Nasabah
│   │
│   ├── nasabah/                  # Area Dashboard User (Nasabah)
│   │   ├── dashboard.html        # Form Setor Sampah, Jadwal RW, & Daftar Harga Harian
│   │   ├── profile.html          # Form Melengkapi / Edit Data Profil & Upload Foto
│   │   ├── setoran.html          # Tabel Detail & Status Riwayat Setoran
│   │   ├── tabungan.html         # Card Ringkasan Saldo, Mutasi, & Form Pencairan
│   │   └── pencairan.html        # Tabel Status Pengajuan Pencairan Tunai
│   │
│   ├── admin/                    # Area Dashboard Admin (Pengurus RW)
│   │   ├── dashboard.html        # Widget Antrean Hari Ini, Total Nasabah & Permintaan
│   │   ├── nasabah-list.html     # Daftar Nasabah RW & Detail Profil Lengkap
│   │   ├── antrean-setor.html    # Form Timbang Sampah Fisik & Verifikasi Status
│   │   ├── pencairan-list.html   # Verifikasi Pencairan Saldo (ACC/Tolak/Konfirmasi Tunai)
│   │   ├── kelola-harga.html     # Management Harga Sampah Harian (Kotor/Bersih)
│   │   └── kelola-jadwal.html    # Management Jadwal Operasional Titik Kumpul
│   │
│   └── super-admin/              # Area Dashboard Super Admin (Kelurahan)
│       ├── dashboard.html        # Ringkasan Total Sampah & Saldo 7 RW (Kelurahan)
│       ├── kelola-unit.html      # Tambah & Monitor Unit Bank Sampah RW 1 - 7
│       ├── kelola-admin.html     # Pembuatan Akun Baru & Reset Password Admin RW
│       ├── e-commerce.html       # Kelola Katalog Produk Daur Ulang Online
│       └── laporan.html          # Rekapitulasi Laporan & Grafik Tren Wilayah
│
├── tailwind.config.js            # Konfigurasi Tema Tailwind (Warna Utama, Font, Layer)
└── package.json                  # Script Kompilasi & Dependensi Node.js
