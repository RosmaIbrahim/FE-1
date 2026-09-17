# FE-1
Bank Sampah
# Dokumentasi Spesifikasi Kebutuhan Sistem Informasi Bank Sampah Surabaya

## 1. Deskripsi Singkat
Sistem Informasi berbasis Web untuk pengelolaan bank sampah warga Surabaya (khususnya 7 RW percontohan) serta katalog penjualan online produk hasil daur ulang sampah.

---

## 2. Hak Akses & Pengguna (User Roles)
1. **User (Nasabah)**: Warga yang menyetorkan sampah dan mengelola saldo tabungan.
2. **Admin (Pengurus Bank Sampah)**: Pengurus tingkat RW yang memproses transaksi setoran harian, verifikasi pencairan, serta mengelola jadwal dan harga.
3. **Super Admin (Pihak Kelurahan)**: Pengawas tingkat kelurahan yang mengelola unit bank sampah per RW, akun admin, serta laporan/rekapitulasi wilayah.

---

## 3. Autentikasi & Registrasi (Authentication)

### A. User (Nasabah)
* **Login**: NIK + Password
* **Registrasi**:
  * Input: `Nama Lengkap`, `NIK` (unik & valid 16 digit), `Password`
  * Lupa Password: Reset via Email/WhatsApp

### B. Admin (Pengurus Bank Sampah)
* **Login**: Username + Password
* **Registrasi**: Dibuatkan akunnya secara khusus oleh Super Admin.

### C. Super Admin (Kelurahan)
* **Login**: Username + Password
* **Registrasi**: `Nama`, `Username`, `Password` (Akses dibuat langsung di level sistem).

---

## 4. Alur & Fitur Layanan Per Role

---

### A. Landing Page & Halaman Publik
1. **Header / Navbar**:
   * Logo & Nama Aplikasi
   * Tombol `Dashboard` / `Layanan`
   * Tombol `Login` (Pilihan login multi-role: Nasabah / Admin / Super Admin)
2. **Section Layanan Publik**:
   * Banner/CTA: *"Ingin setor sampah? Lihat layanan"* $\rightarrow$ Mengarahkan ke form login / dashboard nasabah.
   * Katalog Produk Daur Ulang Online (Dapat dilihat oleh umum).

---

### B. Halaman User (Nasabah)

#### 1. Peringatan & Form Profil (Mandatory Profile Setup)
* **Alur Validasi**:
  * Jika akun baru belum melengkapi data profil, sistem menampilkan notifikasi:
    > *"Sebelum melanjutkan ke layanan, harap melengkapi profile"*
  * Tombol aksi: `Lengkapi Profile`.
* **Field Form Profil**:
  * Input Foto Profile (`jpg`/`png`)
  * Nama Lengkap (Auto-filled dari registrasi)
  * NIK (*Readonly / tidak dapat diubah*)
  * No. KK (Kartu Keluarga)
  * No. Telepon / WhatsApp
  * RT & RW
  * Jenis Kelamin
  * Alamat Rumah Lengkap

#### 2. Dashboard Layanan Utama (Scrollable Page)
1. **Section Form Setor Sampah**:
   * Input/Select:
     * Nama & NIK (*Auto-filled*)
     * No. Telepon (*Auto-filled*)
     * Pilih Bank Sampah tujuan (*Dropdown*)
     * Tanggal Pengajuan Setor (*Sesuai jadwal operasional*)
     * Kategori Sampah (*Organik / Non-Organik*)
     * Kondisi Sampah (*Kotor / Sudah Dibersihkan*)
     * Jenis Sampah (*Plastik, Kertas, Logam, dll.*)
     * Foto Bukti Sampah (*opsional*)
     * Catatan Tambahan (*opsional*)
   * Tombol Action: `Kirim`
   * **Status Awal**: `"Menunggu Diserahkan"`

2. **Section Jadwal Bank Sampah (Tabel)**:
   * Filter lokasi per RW / Bank Sampah
   * Kolom Tabel: `Hari`, `Tanggal`, `Jam Buka`, `Jam Tutup`

3. **Section Daftar Harga Sampah Harian (Tabel)**:
   * Kolom Tabel: `Tanggal`, `Jenis Sampah`, `Kondisi (Sudah dibersihkan / Belum)`, `Harga per Kg`

#### 3. Sidebar Navigasi User
* **Profile**: Mengedit data diri & foto.
* **Setoran**:
  * Tabel Detail Setor: `Tanggal`, `Jenis Sampah`, `Kategori`, `Kondisi`, `Status`, `Aksi` (*Lihat Detail*).
* **Tabungan**:
  * Card Ringkasan:
    * `Saldo (Uang hasil setoran hari itu)`
    * `Total Tabungan Keseluruhan`
  * Tabel Mutasi (Kredit/Debit)
  * Tombol: `Ajukan Pencairan`
* **Logout**

#### 4. Halaman Pengajuan Pencairan Saldo
* **Form Pengajuan**:
  * Field: `Jumlah Saldo Tersedia` (*Readonly*), `Tanggal Pengajuan`, `Jumlah Nominal Pencairan`
  * Tombol Action: `Ajukan`
* **Tabel Status Pengajuan**:
  * Alur Perubahan Status: **`Menunggu`** $\rightarrow$ **`Belum Diambil`** $\rightarrow$ **`Diambil`**
  * *Catatan*: Pencairan dilakukan secara **Tunai** di lokasi Bank Sampah RW sesuai jadwal (bukan transfer).

---

###  C. Halaman Admin (Pengurus Bank Sampah RW)

#### 1. Dashboard Admin
* **Card Ringkasan (Widget)**:
  * Total Nasabah di RW
  * Antrean Setoran Hari Ini
  * Permintaan Pencairan Menunggu Konfirmasi

#### 2. Manajemen & Detail Nasabah
* **Tabel Daftar Nasabah**:
  * Kolom: `NIK`, `Nama Nasabah`, `RT/RW`, `No. WA`, `Saldo Tabungan`, `Aksi` (*Lihat Detail*).
* **Halaman Detail Nasabah**:
  * Menampilkan informasi profil lengkap (Foto, NIK, No. KK, Alamat, No. WA).
  * Menampilkan riwayat setoran & mutasi saldo khusus nasabah tersebut.

#### 3. Verifikasi & Update Status Setoran Sampah
* **Tabel Daftar Janji Setor (Antrean Setoran)**:
  * Filter berdasarkan Tanggal Setor.
  * Kolom: `ID Setoran`, `Nama Nasabah`, `Tanggal Pengajuan`, `Jenis Sampah`, `Kategori`, `Kondisi`, `Status`, `Aksi`.
* **Form Konfirmasi / Timbang Sampah**:
  * Admin menimbang sampah fisik di lokasi dan menginput:
    * `Berat Riil (kg)`
    * `Total Nominal (Rp)` (Otomatis terhitung dari $Berat \times Harga\ per\ kg$)
  * **Update Status**:
    * Mengubah status dari **`Menunggu Diserahkan`** $\rightarrow$ **`Sudah Setor`** (Saldo nasabah otomatis bertambah).
    * Atau memilih **`Ditolak`** jika sampah tidak sesuai kriteria.

#### 4. Verifikasi Permintaan Pencairan Saldo
* **Tabel Permintaan Pencairan Saldo**:
  * Kolom: `ID Pencairan`, `Nama Nasabah`, `Tanggal Pengajuan`, `Nominal`, `Status`, `Aksi`.
* **Alur Aksi Admin (ACC / Tolak)**:
  * **ACC (Setuju)**: Mengubah status dari **`Menunggu`** $\rightarrow$ **`Belum Diambil`** (Saldo tabungan nasabah otomatis dipotong).
  * **Tolak**: Mengubah status jadi **`Ditolak`** (Input alasan penolakan).
  * **Konfirmasi Penyerahan Uang**: Saat nasabah mengambil uang tunai di lokasi, Admin mengubah status dari **`Belum Diambil`** $\rightarrow$ **`Diambil`** (Selesai).

#### 5. Management Harga Sampah (Harian)
* **Form Update Harga**:
  * Input: `Jenis Sampah`, `Kategori`, `Kondisi (Kotor / Sudah Dibersihkan)`, `Harga per Kg`, `Tanggal Berlaku`.
* **Tabel Daftar Harga Sampah Aktif**:
  * Menampilkan harga harian yang berlaku di Bank Sampah RW tersebut.

#### 6. Management Jadwal Operasional
* **Form & Tabel Jadwal**:
  * Input/Edit: `Hari`, `Tanggal`, `Jam Buka`, `Jam Tutup`, `Status Operasional (Buka / Libur)`.

#### 7. Rekapitulasi Setoran Harian
* **Tabel Rekap Harian**:
  * Menampilkan rekap total berat sampah masuk (kg) dan total transaksi saldo keluar/masuk per hari.

---

### 👑 D. Halaman Super Admin (Kelurahan)

#### 1. Dashboard Super Admin (Kelurahan)
* **Card Ringkasan Wilayah**:
  * Total Bank Sampah Unit Aktif (7 RW)
  * Total Saldo / Pendapatan Keseluruhan
  * Total Berat Sampah Terkelola di Kelurahan

#### 2. Manajemen Unit Bank Sampah Baru
* **Form Tambah Bank Sampah Baru**:
  * Input: `Nama Unit Bank Sampah`, `Pilih RW (1 - 7)`, `Alamat Lokasi Titik Kumpul`.
* **Tabel Daftar Bank Sampah**:
  * Menampilkan daftar bank sampah per RW beserta status keaktifannya.

#### 3. Pilihan RW & Detail Bank Sampah
* **Fitur Pilih RW**: Super Admin dapat memilih RW tertentu untuk melihat detail operasionalnya.
* **Detail Bank Sampah RW**:
  * Menampilkan **Struktur Pengurus** (Nama, Jabatan, No. WA).
  * Menampilkan **Pendapatan per hari** & grafik tren setoran harian.
  * Menampilkan daftar nasabah aktif di RW tersebut.

#### 4. Buat Akun & Password Khusus Admin Baru
* **Form Pembuatan Akun Admin**:
  * Select: `Pilih Unit Bank Sampah / RW`
  * Input: `Nama Pengurus`, `Username`, `Password Khusus`
* **Manajemen Akun Admin**:
  * Fitur reset password untuk admin RW yang lupa password.

#### 5. Kelola Produk Daur Ulang Online (E-Commerce)
* **Form Tambah Produk**:
  * Input: `Nama Produk Daur Ulang`, `Foto Produk`, `Harga (Rp)`, `Deskripsi`, `Kontak WA Penjual`.
* **Tabel Produk**:
  * Edit, Hapus, dan Atur Status Stok (*Tersedia / Habis*).
