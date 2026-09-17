# Dokumentasi Design System

## A. Warna Netral (Base & Background)

- **Background Utama App:** `#F8FAFC` (`bg-slate-50`)
- **Card & White Container:** `#FFFFFF` (`bg-white`)
- **Border Standard:** `#E2E8F0` (`border-slate-200`)
- **Border Active / Focus:** `#94A3B8` (`border-slate-400`)
- **Teks Utama:** `#0F172A` (`text-slate-900`)
- **Teks Sekunder / Muted:** `#64748B` (`text-slate-500`)

## B. Warna Role & Branding

### Branding Utama & Role Nasabah (Emerald)
- **Primary Main:** `#047857` (`bg-emerald-700` / `text-emerald-700`)
- **Primary Hover:** `#065F46` (`hover:bg-emerald-800`)
- **Primary Light / Badge:** `#ECFDF5` (`bg-emerald-50`), `#A7F3D0` (`border-emerald-200`)
- **Hero Gradient:** `from-emerald-900 to-emerald-700`

### Role Admin RW (Amber / Slate Accent)
- **Accent Warning / RW:** `#D97706` (`text-amber-600`)
- **Background Card Admin:** `#FFFBEB` (`bg-amber-50`)
- **Border Admin:** `#FDE68A` (`border-amber-200`)

### Role Kelurahan / Super Admin (Blue)
- **Primary Super Admin:** `#1E40AF` (`bg-blue-800` / `text-blue-900`)
- **Hover Super Admin:** `#1E3A8A` (`hover:bg-blue-900`)
- **Background Light:** `#EFF6FF` (`bg-blue-50`)
- **Border Light:** `#BFDBFE` (`border-blue-200`)

## 3. Radius, Shadow, & Spacing

### A. Border Radius (Kebulatan Sudut)
- **Tombol, Form Input, & Badge:** `rounded-lg` (8px)
- **Card, Container Modal, & Frame Gambar:** `rounded-2xl` (16px)
- **Logo Badge / Avatar:** `rounded-xl` (12px) atau `rounded-full`

### B. Bayangan (Box Shadow)
- **Default Card:** `shadow-sm`
- **Card Hover / Dropdown:** `shadow-md`
- **Modal Overlay / Form Card Auth:** `shadow-xl`

### C. Container Width Max (Layout Max-Width)
- **Landing Page & Dashboard Container:** `max-w-6xl` (1152px) + `px-4`
- **Form Auth / Modal Sederhana:** `max-w-md` (448px)
- **Modal Luas (Tabel/Detail Transaksi):** `max-w-2xl` (672px)

## 4. Ukuran Gambar, Card, & Layout Komponen

### A. Katalog Produk Daur Ulang
- **Layout Grid:** `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6`
- **Card Container:** `bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition`
- **Aspek Rasio Gambar:** Tinggi tetap `h-48` (192px), objek `object-cover w-full`
- **Badge Kategori:** Position Absolute (`top-3 left-3`), `bg-white/90 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm`
- **Padding Konten Card:** `p-5`

### B. Navbar / Header
- **Tinggi Header:** `h-16` (64px)
- **Position:** `sticky top-0 z-50 bg-white border-b border-slate-200`
- **Logo App:** Box `w-10 h-10 bg-emerald-700 text-white font-extrabold rounded-xl`

### C. Form Input & Field
- **Tinggi Input:** `py-2 px-3` (Teks `text-sm`)
- **Style Default:** `border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none transition`
- **Label Input:** `block text-xs font-semibold text-slate-700 mb-1`

### D. Tabel Data (Jadwal, Riwayat, & Rekapitulasi)
- **Container Tabel:** `bg-white border border-slate-200 rounded-2xl overflow-hidden`
- **Header Tabel (thead):** `bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider`
- **Cell Padding:** `px-4 py-3 text-xs md:text-sm`
- **Border Antar Baris:** `border-b border-slate-100`

## 5. Pedoman Transisi & Interaksi

- **Hover Effect Tombol Utama:** `transition transform hover:-translate-y-0.5 active:translate-y-0`
- **Hover Effect Card / Link:** `transition-all duration-200 hover:border-slate-300 hover:shadow-md`
- **Tab Switcher Role (Auth/Dashboard):**
  - Tab Aktif: `bg-white text-slate-900 shadow-sm font-bold`
  - Tab Inaktif: `text-slate-500 hover:text-slate-800 font-semibold`
