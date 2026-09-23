/**
 * setoran.js
 * Halaman "Detail Setoran" (riwayat setoran nasabah):
 * - Tabel riwayat setoran, yang terbaru di atas
 * - Tombol "Lihat Detail" membuka jendela rincian
 * - Tampilan khusus kalau belum ada setoran
 */

document.addEventListener('DOMContentLoaded', () => {
    // TODO: kalau sudah ada backend, ganti data contoh ini dengan hasil fetch, misalnya:
    // const RIWAYAT_SETORAN = await (await fetch('/api/nasabah/setoran')).json();
    //
    // status  : "menunggu" | "diverifikasi" | "ditolak"
    // berat   : dalam kg, null kalau belum ditimbang
    const RIWAYAT_SETORAN = [
        {
            id: 1,
            tanggal: '2026-09-16',
            jenis: 'Botol Plastik PET',
            kategori: 'Non-Organik',
            kondisi: 'Sudah Dibersihkan',
            status: 'diverifikasi',
            bank: 'Bank Sampah Jambangan Utama',
            berat: 2.5,
            catatan: 'Botol sudah dipress.',
        },
        {
            id: 2,
            tanggal: '2026-09-10',
            jenis: 'Kardus / Karton',
            kategori: 'Non-Organik',
            kondisi: 'Sudah Dibersihkan',
            status: 'diverifikasi',
            bank: 'Bank Sampah Jambangan Utama',
            berat: 4,
            catatan: '',
        },
        {
            id: 3,
            tanggal: '2026-09-03',
            jenis: 'Kaleng Aluminium',
            kategori: 'Non-Organik',
            kondisi: 'Kotor',
            status: 'diverifikasi',
            bank: 'Bank Sampah RW 02',
            berat: 1.2,
            catatan: 'Masih ada sisa minuman di beberapa kaleng.',
        },
        {
            id: 4,
            tanggal: '2026-09-17',
            jenis: 'Kertas HVS',
            kategori: 'Non-Organik',
            kondisi: 'Sudah Dibersihkan',
            status: 'menunggu',
            bank: 'Bank Sampah Jambangan Utama',
            berat: null,
            catatan: '',
        },
    ];

    // Tampilan tiap status. Tulis nama class lengkap (jangan digabung dari potongan)
    // supaya Tailwind bisa mendeteksinya saat build.
    const STATUS = {
        menunggu: {
            teks: 'Menunggu Diserahkan',
            kelas: 'badge-warning',
            petunjuk: 'Bawa sampah ke bank sampah sesuai jadwal operasional.',
        },
        diverifikasi: { teks: 'Diverifikasi', kelas: 'badge-success', petunjuk: '' },
        ditolak: { teks: 'Ditolak', kelas: 'badge-danger', petunjuk: '' },
    };

    const tabelBody = document.getElementById('setoranBody');
    const tabelWrap = document.getElementById('setoranTabel');
    const kosong = document.getElementById('setoranKosong');
    const modal = document.getElementById('modalDetail');
    const modalJudul = document.getElementById('modalJudul');
    const modalIsi = document.getElementById('modalIsi');

    // ---------- Fungsi bantu ----------
    function bacaTanggal(iso) {
        // Dibuat manual (bukan new Date("2026-09-16")) supaya tidak bergeser karena zona waktu
        const [tahun, bulan, hari] = iso.split('-').map(Number);
        return new Date(tahun, bulan - 1, hari);
    }

    function formatTanggalPendek(iso) {
        return bacaTanggal(iso).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    }

    function formatTanggalPanjang(iso) {
        return bacaTanggal(iso).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    }

    // Jaga-jaga kalau data nanti datang dari backend / input pengguna
    function escapeHtml(teks) {
        const pengganti = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
        return String(teks).replace(/[&<>"']/g, (c) => pengganti[c]);
    }

    function infoStatus(kode) {
        return STATUS[kode] || { teks: kode, kelas: 'badge-neutral', petunjuk: '' };
    }

    // ---------- Tabel riwayat ----------
    function tampilkanTabel() {
        if (RIWAYAT_SETORAN.length === 0) {
            tabelWrap.hidden = true;
            kosong.hidden = false;
            return;
        }

        tabelWrap.hidden = false;
        kosong.hidden = true;

        // Terbaru di atas
        const urut = [...RIWAYAT_SETORAN].sort((a, b) => b.tanggal.localeCompare(a.tanggal));

        tabelBody.innerHTML = urut
            .map((s) => {
                const st = infoStatus(s.status);
                return `
        <tr class="hover:bg-slate-50/60 transition">
          <td class="table-td">${formatTanggalPendek(s.tanggal)}</td>
          <td class="table-td-strong">${escapeHtml(s.jenis)}</td>
          <td class="table-td">${escapeHtml(s.kategori)}</td>
          <td class="table-td">${escapeHtml(s.kondisi)}</td>
          <td class="table-td"><span class="${st.kelas}">${escapeHtml(st.teks)}</span></td>
          <td class="table-td">
            <button type="button" class="link-action" data-id="${s.id}">Lihat Detail</button>
          </td>
        </tr>`;
            })
            .join('');
    }

    // ---------- Jendela detail ----------
    let pemicuModal = null; // tombol yang membuka jendela, supaya fokus bisa dikembalikan

    function baris(label, nilaiHtml) {
        return `
      <div class="detail-row">
        <span class="detail-label">${label}</span>
        <span class="detail-value">${nilaiHtml}</span>
      </div>`;
    }

    function bukaDetail(setoran, tombol) {
        const st = infoStatus(setoran.status);
        const berat =
            setoran.berat === null
                ? 'Belum ditimbang'
                : `${setoran.berat.toLocaleString('id-ID')} kg`;
        const catatan = setoran.catatan ? escapeHtml(setoran.catatan) : '—';

        modalJudul.textContent = setoran.jenis;
        modalIsi.innerHTML =
            baris('Tanggal Setor', formatTanggalPanjang(setoran.tanggal)) +
            baris('Bank Sampah Tujuan', escapeHtml(setoran.bank)) +
            baris('Kategori', escapeHtml(setoran.kategori)) +
            baris('Kondisi', escapeHtml(setoran.kondisi)) +
            baris('Berat Ditimbang', berat) +
            baris('Status', `<span class="${st.kelas}">${escapeHtml(st.teks)}</span>`) +
            baris('Catatan', catatan) +
            (st.petunjuk
                ? `<p class="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mt-3">${escapeHtml(st.petunjuk)}</p>`
                : '');

        pemicuModal = tombol || null;
        modal.hidden = false;
        modal.querySelector('[data-tutup-modal]').focus();
    }

    function tutupDetail() {
        modal.hidden = true;
        if (pemicuModal) pemicuModal.focus();
        pemicuModal = null;
    }

    // Klik "Lihat Detail" (satu listener untuk semua baris)
    tabelBody.addEventListener('click', (e) => {
        const tombol = e.target.closest('[data-id]');
        if (!tombol) return;
        const setoran = RIWAYAT_SETORAN.find((s) => String(s.id) === tombol.dataset.id);
        if (setoran) bukaDetail(setoran, tombol);
    });

    // Tutup: tombol X / Tutup, klik di luar kotak, atau tombol Esc
    modal.querySelectorAll('[data-tutup-modal]').forEach((el) => {
        el.addEventListener('click', tutupDetail);
    });
    modal.addEventListener('click', (e) => {
        if (e.target === modal) tutupDetail();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.hidden) tutupDetail();
    });

    tampilkanTabel();
});