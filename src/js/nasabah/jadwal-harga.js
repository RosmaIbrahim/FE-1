/**
 * jadwal-harga.js
 * Bagian "Jadwal Operasional" dan "Info Harga" di dashboard nasabah:
 * - Tabel jadwal bank sampah, bisa difilter per RW
 * - Tabel daftar harga sampah harian
 */

// TODO: kalau nanti diambil dari database, ganti kedua daftar ini dengan hasil fetch, misalnya:
// const JADWAL_BANK_SAMPAH = await (await fetch('/api/jadwal')).json();
// const DAFTAR_HARGA = await (await fetch('/api/harga')).json();

// Tanggal memakai format YYYY-MM-DD. Nama hari dihitung otomatis dari tanggal.
const JADWAL_BANK_SAMPAH = [
  { tanggal: "2026-09-21", buka: "07.00", tutup: "10.00", rwAwal: 1, rwAkhir: 2, wilayah: "RW 01 & RW 02" },
  { tanggal: "2026-09-23", buka: "07.00", tutup: "10.00", rwAwal: 3, rwAkhir: 4, wilayah: "RW 03 & RW 04" },
  { tanggal: "2026-09-25", buka: "07.00", tutup: "11.00", rwAwal: 5, rwAkhir: 7, wilayah: "RW 05 – RW 06" },
  { tanggal: "2026-09-26", buka: "08.00", tutup: "12.00", rwAwal: 8, rwAkhir: 12, wilayah: "RW 07" },
];

// kondisi: "bersih" | "kotor" | null (kalau tidak berlaku). satuan: "kg" | "ltr"
const DAFTAR_HARGA = [
  { tanggal: "2026-09-18", jenis: "Botol Plastik PET", kondisi: "bersih", harga: 3500, satuan: "kg" },
  { tanggal: "2026-09-18", jenis: "Botol Plastik PET", kondisi: "kotor", harga: 2800, satuan: "kg" },
  { tanggal: "2026-09-18", jenis: "Kardus / Karton", kondisi: "bersih", harga: 1500, satuan: "kg" },
  { tanggal: "2026-09-18", jenis: "Kertas HVS / Koran", kondisi: "bersih", harga: 1200, satuan: "kg" },
];

const JUMLAH_RW = 12;

// Tampilan label kondisi. Tulis class lengkap (jangan digabung dari potongan)
// supaya Tailwind bisa mendeteksinya saat build.
const LABEL_KONDISI = {
  bersih: { teks: "Sudah Dibersihkan", kelas: "bg-emerald-50 text-emerald-700" },
  kotor: { teks: "Belum Dibersihkan", kelas: "bg-amber-50 text-amber-700" },
};

// ---------- Fungsi bantu ----------
function bacaTanggal(iso) {
  // Dibuat manual (bukan new Date("2026-09-21")) supaya tidak bergeser karena zona waktu.
  const [tahun, bulan, hari] = iso.split("-").map(Number);
  return new Date(tahun, bulan - 1, hari);
}

function formatTanggalPendek(tgl) {
  return tgl.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

function formatTanggalPanjang(tgl) {
  return tgl.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

// Jaga-jaga kalau data nanti datang dari backend/input pengguna
function escapeHtml(teks) {
  const pengganti = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return String(teks).replace(/[&<>"']/g, (c) => pengganti[c]);
}

document.addEventListener("DOMContentLoaded", () => {
  // =====================================================
  // JADWAL OPERASIONAL
  // =====================================================
  const filterRw = document.getElementById("filterRw");
  const jadwalBody = document.getElementById("jadwalBody");

  function tampilkanJadwal() {
    const rw = filterRw.value;
    const daftar = JADWAL_BANK_SAMPAH.filter(
      (j) => rw === "semua" || (Number(rw) >= j.rwAwal && Number(rw) <= j.rwAkhir),
    );

    if (daftar.length === 0) {
      const namaRw = filterRw.options[filterRw.selectedIndex].text;
      jadwalBody.innerHTML = `
        <tr>
          <td colspan="5" class="px-5 py-8 text-center text-xs text-slate-400">
            Belum ada jadwal untuk ${escapeHtml(namaRw)}.
          </td>
        </tr>`;
      return;
    }

    jadwalBody.innerHTML = daftar
      .map((j) => {
        const tgl = bacaTanggal(j.tanggal);
        const hari = tgl.toLocaleDateString("id-ID", { weekday: "long" });
        return `
        <tr class="hover:bg-slate-50/60 transition">
          <td class="px-5 py-3.5 font-bold text-slate-900 whitespace-nowrap">${escapeHtml(hari)}</td>
          <td class="px-5 py-3.5 text-slate-600 whitespace-nowrap">${formatTanggalPendek(tgl)}</td>
          <td class="px-5 py-3.5 text-slate-600 whitespace-nowrap">${escapeHtml(j.buka)}</td>
          <td class="px-5 py-3.5 text-slate-600 whitespace-nowrap">${escapeHtml(j.tutup)}</td>
          <td class="px-5 py-3.5">
            <span class="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold border bg-emerald-50 text-emerald-700 border-emerald-200 whitespace-nowrap">${escapeHtml(j.wilayah)}</span>
          </td>
        </tr>`;
      })
      .join("");
  }

  // Isi pilihan filter: Semua, RW 01 ... RW 12
  for (let i = 1; i <= JUMLAH_RW; i++) {
    filterRw.add(new Option(`RW ${String(i).padStart(2, "0")}`, String(i)));
  }
  filterRw.addEventListener("change", tampilkanJadwal);
  tampilkanJadwal();

  // =====================================================
  // INFO HARGA
  // =====================================================
  const hargaBody = document.getElementById("hargaBody");
  const hargaKeterangan = document.getElementById("hargaKeterangan");

  function badgeKondisi(kondisi) {
    const info = LABEL_KONDISI[kondisi];
    if (!info) {
      return '<span class="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-400">—</span>';
    }
    return `<span class="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold ${info.kelas}">${info.teks}</span>`;
  }

  function tampilkanHarga() {
    if (DAFTAR_HARGA.length === 0) {
      hargaBody.innerHTML = `
        <tr>
          <td colspan="4" class="px-5 py-8 text-center text-xs text-slate-400">
            Daftar harga hari ini belum tersedia.
          </td>
        </tr>`;
      return;
    }

    // Keterangan "Per <tanggal terbaru>"
    const terbaru = DAFTAR_HARGA.map((h) => h.tanggal).sort().pop();
    hargaKeterangan.textContent = `Per ${formatTanggalPanjang(bacaTanggal(terbaru))} · Harga dapat berubah sewaktu-waktu`;

    hargaBody.innerHTML = DAFTAR_HARGA.map((h) => {
      const satuan = h.satuan === "kg" ? "" : ` / ${escapeHtml(h.satuan)}`;
      return `
        <tr class="hover:bg-slate-50/60 transition">
          <td class="px-5 py-3.5 text-slate-500 whitespace-nowrap">${formatTanggalPendek(bacaTanggal(h.tanggal))}</td>
          <td class="px-5 py-3.5 font-bold text-slate-900 whitespace-nowrap">${escapeHtml(h.jenis)}</td>
          <td class="px-5 py-3.5">${badgeKondisi(h.kondisi)}</td>
          <td class="px-5 py-3.5 font-bold text-emerald-700 whitespace-nowrap">${formatRupiah(h.harga)}${satuan}</td>
        </tr>`;
    }).join("");
  }

  tampilkanHarga();
});