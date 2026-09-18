# Style Guide — Bank Sampah Kelurahan Jambangan

Panduan visual untuk seluruh antarmuka aplikasi Bank Sampah Kelurahan Jambangan (landing page, dashboard Nasabah, Admin RW, dan Super Admin Kelurahan). Semua kelas menggunakan utilitas **Tailwind CSS**.
## Icon
https://heroicons.com/ (2.1.5)
## 1. Tipografi

### 1.1 Font

Ada dua font yang digunakan, keduanya dari Google Fonts.

| Font | Dipakai untuk | Karakteristik |
|------|---------------|---------------|
| **DM Serif Display** | Judul besar di landing page (hero dan section header) | Serif elegan, mendukung italic, memberi kesan otoritatif dan dekat dengan komunitas |
| **Plus Jakarta Sans** | Semua teks body, label, tombol, tabel, form, navigasi, dan heading di dalam dashboard | Sans-serif modern, bersih, sangat terbaca di ukuran kecil |

### 1.2 Import CSS

```css
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
```

### 1.3 Skala Ukuran Teks

| Elemen | Style |
|--------|-------|
| Judul Hero (Landing) | `font-display`, `text-4xl`–`text-5xl` (36–48px), `text-white`, `leading-tight` |
| Section Header Landing | `font-display`, `text-3xl` (30px), `text-slate-900` |
| Judul Halaman Dashboard | `font-bold`, `text-xl` (20px), `text-slate-900` |
| Sub-label Section | `font-bold`, `text-xs` (12px), `uppercase`, `tracking-widest` (warna sesuai role, lihat di bawah) |
| Body / Paragraf | `text-sm` (14px), `text-slate-600`, `leading-relaxed` |
| Label Form | `font-semibold`, `text-xs` (12px), `text-slate-700` |
| Header Tabel | `font-bold`, `text-xs` (12px), `uppercase`, `tracking-wider`, `text-slate-700` |
| Isi Tabel | `text-xs`–`text-sm` (12–14px), `text-slate-600` / `text-slate-900` |
| Badge / Chip Kecil | `text-[10px]`, `font-bold`, `uppercase`, `tracking-wide` |
| Caption / Sub-info | `text-xs` (12px), `text-slate-400`–`text-slate-500` |
| Nominal / Angka Penting | `font-extrabold`, `text-2xl`–`text-3xl` |

**Warna sub-label section per role:**

| Role | Warna |
|------|-------|
| Nasabah | `text-emerald-700` |
| Admin RW | `text-amber-600` |
| Kelurahan | `text-blue-700` |

---

## 2. Palet Warna

### 2.1 Warna Netral (semua role)

| Kegunaan | Hex | Tailwind |
|----------|-----|----------|
| Background halaman | `#F8FAFC` | `slate-50` |
| Card / panel putih | `#FFFFFF` | `white` |
| Border default | `#E2E8F0` | `slate-200` |
| Border hover / focus | `#94A3B8` | `slate-400` |
| Divider ringan | `#F1F5F9` | `slate-100` |
| Teks utama | `#0F172A` | `slate-900` |
| Teks sekunder | `#64748B` | `slate-500` |
| Teks muted / caption | `#94A3B8` | `slate-400` |
| Background header tabel | `#F1F5F9` | `slate-100` |
| Stripe baris genap | `#F8FAFC` (50% opacity) | `slate-50/50` |

### 2.2 Role Nasabah — Emerald (Hijau)

| Kegunaan | Hex | Tailwind |
|----------|-----|----------|
| Primary utama | `#047857` | `emerald-700` |
| Primary hover | `#065F46` | `emerald-800` |
| Background ringan | `#ECFDF5` | `emerald-50` |
| Border ringan | `#A7F3D0` | `emerald-200` |
| Teks hijau | `#047857` | `emerald-700` |
| Hero gradient dari | `#064E3B` | `emerald-900` |
| Hero gradient ke | `#047857` | `emerald-700` |
| Teks di atas primary | `#FFFFFF` | `white` |
| Teks muted di hero | `#6EE7B7` (opacity 70–80%) | `emerald-300` |

### 2.3 Role Admin RW — Amber (Kuning/Emas)

| Kegunaan | Hex | Tailwind |
|----------|-----|----------|
| Primary utama | `#D97706` | `amber-600` |
| Primary hover | `#B45309` | `amber-700` |
| Background ringan | `#FFFBEB` | `amber-50` |
| Border ringan | `#FDE68A` | `amber-200` |
| Teks amber | `#D97706` | `amber-600` |
| Teks di atas primary | `#FFFFFF` | `white` |

### 2.4 Role Super Admin Kelurahan — Blue (Biru)

| Kegunaan | Hex | Tailwind |
|----------|-----|----------|
| Primary utama | `#1E40AF` | `blue-800` |
| Primary hover | `#1E3A8A` | `blue-900` |
| Background ringan | `#EFF6FF` | `blue-50` |
| Border ringan | `#BFDBFE` | `blue-200` |
| Teks biru | `#1E40AF` | `blue-800` |
| Teks muted biru | `#1D4ED8` | `blue-700` |
| Teks di atas primary | `#FFFFFF` | `white` |

### 2.5 Warna Status / Semantik

| Status | Teks | Background | Border |
|--------|------|------------|--------|
| Sukses / Aktif / Diverifikasi | `text-emerald-700` | `bg-emerald-50` | `border-emerald-200` |
| Peringatan / Menunggu | `text-amber-700` | `bg-amber-50` | `border-amber-200` |
| Bahaya / Ditolak / Error | `text-red-600` | `bg-red-50` | `border-red-200` |
| Info / Netral | `text-slate-600` | `bg-slate-100` | `border-slate-200` |

**Warna nominal transaksi:**

| Jenis | Warna |
|-------|-------|
| Kredit (uang masuk) | `text-emerald-700` |
| Debit (uang keluar) | `text-red-600` |

---

## 3. Border Radius

| Elemen | Kelas | Ukuran |
|--------|-------|--------|
| Tombol, input, badge, select | `rounded-lg` | 8px |
| Card, container, modal, tabel | `rounded-2xl` | 16px |
| Avatar, logo badge | `rounded-xl` atau `rounded-full` | 12px / penuh |
| Chip / tag kecil | `rounded-md` | 6px |
| Thumbnail foto produk | `rounded-lg` | 8px |

---

## 4. Shadow

| Elemen | Kelas |
|--------|-------|
| Card default | `shadow-sm` |
| Card hover / dropdown | `shadow-md` |
| Modal / form auth | `shadow-xl` |
| Tombol utama (opsional) | `shadow-md` |

---

## 5. Spacing & Layout

| Elemen | Kelas / Nilai |
|--------|---------------|
| Max-width halaman landing / dashboard | `max-w-6xl` (1152px) + `px-4` |
| Max-width form auth / modal kecil | `max-w-md` (448px) |
| Max-width modal lebar (tabel / detail) | `max-w-2xl` (672px) |
| Tinggi top bar / header app | `h-14` (56px) |
| Lebar sidebar dashboard | `w-60` (240px) |
| Padding konten halaman | `p-4 md:p-6` |
| Padding card / panel | `p-5` atau `p-6` |
| Padding cell tabel | `px-4 py-3` |
| Gap grid katalog produk | `gap-6` |
| Gap grid card ringkasan | `gap-4` atau `gap-5` |

---

## 6. Komponen

> `{role-color}` diganti dengan warna role yang aktif: `emerald` (Nasabah), `amber` (Admin RW), atau `blue` (Kelurahan).

### 6.1 Tombol

| Jenis | Style |
|-------|-------|
| **Primary** | `bg-{role-color} hover:bg-{role-color-hover} text-white font-bold text-sm rounded-lg px-5 md:px-6 py-2 md:py-2.5 transition transform hover:-translate-y-0.5 active:translate-y-0` |
| **Secondary / Outline** | `border border-slate-300 text-slate-600 bg-white hover:bg-slate-50 font-semibold text-sm rounded-lg px-4 py-2` |
| **Destruktif (Hapus / Tolak)** | `bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-lg` |
| **Teks / Link** | `text-xs font-semibold text-{role-color} hover:underline` (tanpa border) |
| **Disabled** | `opacity-40` (tanpa `pointer-events`) |

### 6.2 Form Input

| Jenis | Style |
|-------|-------|
| **Text / Select / Textarea** | `border border-slate-300 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-{role-color} focus:outline-none transition` (tambahkan `bg-white` untuk select) |
| **Readonly / Disabled** | `border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed` |
| **Label** | `block text-xs font-semibold text-slate-700 mb-1` |
| **Upload foto (drop zone)** | `border-2 border-dashed border-slate-300 rounded-lg hover:border-{role-color}-400 hover:bg-{role-color}-50/50 flex items-center justify-center` |

**Toggle password (ikon mata):**

- Ikon diletakkan di sisi kanan input (`absolute`), dengan warna `text-slate-400 hover:text-slate-600`.
- Mata terbuka berarti password terlihat, mata tercoret berarti password tersembunyi.

### 6.3 Tabel

| Bagian | Style |
|--------|-------|
| Container | `bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm` |
| Header (`thead`) | `bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider` |
| Padding cell | `px-4 py-3` |
| Border baris | `border-t border-slate-100` |
| Stripe baris | `bg-slate-50/50` pada baris genap |
| Footer tabel (baris total / rekap) | `bg-slate-50 border-t-2 border-slate-200` |

Untuk layar kecil, bungkus tabel dengan `div` ber-kelas `overflow-x-auto` agar bisa di-scroll horizontal.

### 6.4 Badge / Status

Format umum:

```
inline-flex items-center px-2.5 py-0.5 rounded-lg
text-[10px] font-bold uppercase tracking-wide border
```

| Varian | Style |
|--------|-------|
| Aktif / Sukses | `bg-emerald-50 text-emerald-700 border-emerald-200` |
| Menunggu / Peringatan | `bg-amber-50 text-amber-700 border-amber-200` |
| Ditolak / Bahaya | `bg-red-50 text-red-600 border-red-200` |
| Netral / Info | `bg-slate-100 text-slate-600 border-slate-200` |
| Biru (Kelurahan) | `bg-blue-50 text-blue-800 border-blue-200` |

### 6.5 Navigasi (Sidebar)

| Elemen | Style |
|--------|-------|
| Item aktif | `bg-{role-color}-50 text-{role-color}-700 font-semibold rounded-lg` |
| Item inaktif | `text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-semibold rounded-lg` |
| Ikon aktif | `text-{role-color}-600` |
| Ikon inaktif | `text-slate-400` |
| Tombol Keluar | `text-slate-500 hover:bg-red-50 hover:text-red-600` |

Sidebar selalu memiliki tinggi penuh (`h-full`) dengan `overflow-y-auto` pada bagian `nav`, sehingga tombol **Keluar** di bagian bawah selalu terlihat tanpa perlu scroll.

### 6.6 Modal

| Bagian | Style |
|--------|-------|
| Overlay | `fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50` (klik di luar modal untuk menutup) |
| Container | `bg-white rounded-2xl shadow-xl w-full max-w-md` (atau `max-w-2xl` untuk modal lebar) |
| Header | `bg-{role-color} px-6 py-4`, teks putih, dan tombol × untuk menutup |
| Body | `p-6 space-y-4` |

---

## 7. Layout App Shell

Struktur dashboard:

```html
<div class="h-screen flex flex-col overflow-hidden">
  <header>  <!-- tinggi tetap h-14, tidak ikut scroll -->
  <div class="flex flex-1 overflow-hidden">
    <aside> <!-- sidebar w-60, h-full, overflow-y-auto internal -->
    <main>  <!-- flex-1, overflow-y-auto → HANYA area ini yang scroll -->
  </div>
</div>
```

Dengan pola ini, header dan sidebar tidak ikut bergeser saat konten utama di-scroll ke bawah.

---

## 8. Transisi & Interaksi

| Elemen | Style |
|--------|-------|
| Hover tombol utama | `transition transform hover:-translate-y-0.5 active:translate-y-0` |
| Hover card | `transition-all duration-200 hover:border-slate-300 hover:shadow-md` |
| Hover link teks | `hover:underline` |
| Hover gambar card | `group-hover:scale-105 transition-transform duration-300` |
| Sidebar slide (mobile) | `transform transition-transform duration-200` |
| Semua elemen umum | `transition` (150–200ms) |
| Scrollbar | Tipis (5px), warna `#94A3B8`, hanya muncul saat scroll |

---

## 9. Identitas Visual per Role

| Role | Warna | Avatar inisial | Label |
|------|-------|----------------|-------|
| Nasabah (Warga) | Emerald | `bg-emerald-100` | — |
| Admin RW (Pengurus) | Amber | `bg-amber-100` | `RW` |
| Super Admin (Lurah) | Blue | `bg-blue-100` | `KL` |

**Logo / badge aplikasi** (tampil di semua halaman):

- Ukuran: `w-7 h-7` (top bar) atau `w-10 h-10` (sidebar).
- Style: `bg-{role-color} text-white font-extrabold rounded-lg` (atau `rounded-xl`).
- Teks: **BS** (Bank Sampah).
