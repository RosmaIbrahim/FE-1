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
│       │   └── register.js       # Handling registrasi nasabah baru
│       │
│       ├── nasabah/              # Logika Fitur Role Nasabah
│       │   ├── profile-check.js  # Validasi & notifikasi mandatory profile setup
│       │   ├── setor-sampah.js   # Handling form pengajuan setor & upload foto
│       │   └── pencairan.js      # Handling pengajuan & riwayat pencairan saldo
│       │
│       ├── admin/                # Logika Fitur Role Admin RW (Pengurus)
│       │   ├── timbang-sampah.js # Calculation otomatis (Berat x Harga) & update status
│       │   ├── verifikasi-pencairan.js # ACC / Tolak penyerahan uang tunai
│       │   ├── kelola-harga.js   # Form update harga harian per kg
│       │   └── kelola-jadwal.js  # Form update jadwal operasional RW
│       │
│       ├── super-admin/          # Logika Fitur Role Super Admin (Kelurahan)
│       │   ├── unit-rw.js        # Manajemen Bank Sampah Unit RW 01 - RW 07
│       │   ├── akun-admin.js     # Pembuatan akun & reset password pengurus RW
│       │   ├── e-commerce.js     # CRUD katalog produk daur ulang online
│       │   └── laporan.js        # Rekapitulasi total sampah & grafik wilayah
│       │
│       └── utils/                # Helper Functions (Shared Utilities)
│           ├── format-rupiah.js  # Converter angka ke format currency (Rp)
│           └── date-picker.js    # Formatting & validasi tanggal operasional
│
├── public/                       # Assets & File Produksi (Siap Deploy / Akses Web)
│   ├── css/
│   │   └── style.css             # Output CSS akhir hasil build Tailwind (Di-link ke HTML)
│   │
│   ├── assets/
│   │   ├── images/               # Asset statis (Logo Kelurahan, Banner, Icon)
│   │   └── uploads/              # Storage sementara foto bukti sampah & foto produk
│   │
│   /* --- HALAMAN HTML (PER ROLE) --- */
│   ├── index.html                # Landing Page & Katalog Daur Ulang (Publik)
│   ├── login.html                # Halaman Login Multi-Role
│   ├── register.html             # Halaman Registrasi Nasabah
│   │
│   ├── nasabah/                  # Area Dashboard User (Nasabah)
│   │   ├── dashboard.html        # Form Setor Sampah, Jadwal RW, & Harga Harian
│   │   ├── profile.html          # Form Melengkapi / Edit Profile
│   │   ├── setoran.html          # Tabel Riwayat & Status Setoran
│   │   ├── tabungan.html         # Ringkasan Saldo, Mutasi, & Form Pencairan
│   │   └── pencairan.html        # Tabel Tracking Status Pencairan Tunai
│   │
│   ├── admin/                    # Area Dashboard Admin (Pengurus RW)
│   │   ├── dashboard.html        # Ringkasan Antrean & Total Nasabah RW
│   │   ├── nasabah-list.html     # Data Nasabah RW & Detail Profil
│   │   ├── antrean-setor.html    # Form Timbang Sampah Physical & Verifikasi
│   │   ├── pencairan-list.html   # Verifikasi Pencairan Saldo (ACC/Tolak/Ambil)
│   │   ├── kelola-harga.html     # Pengaturan Harga Sampah Harian
│   │   └── kelola-jadwal.html    # Pengaturan Jadwal Operasional Titik Kumpul
│   │
│   └── super-admin/              # Area Dashboard Super Admin (Kelurahan)
│       ├── dashboard.html        # Ringkasan Total Sampah & Saldo 7 RW
│       ├── kelola-unit.html      # Tambah & Monitor Unit Bank Sampah RW
│       ├── kelola-admin.html     # Buat Akun & Reset Password Admin RW
│       ├── e-commerce.html       # Kelola Katalog Produk
