/**
 * setor-sampah.js
 * Logika form "Setor Sampah" di dashboard nasabah:
 * - Jenis sampah menyesuaikan kategori yang dipilih
 * - Tanggal setor tidak boleh sebelum hari ini
 * - Pratinjau foto bukti (maks. 2 MB)
 * - Validasi form, lalu tampilkan kartu sukses
 */

// Daftar jenis sampah per kategori.
// TODO: kalau nanti diambil dari database, ganti dengan hasil fetch.
const JENIS_SAMPAH = {
  plastik: [
    { value: "botol-pet", label: "Botol Plastik PET" },
    { value: "botol-hdpe", label: "Botol Plastik HDPE" },
    { value: "gelas-plastik", label: "Gelas Plastik" },
  ],
  kertas: [
    { value: "kardus", label: "Kardus / Karton" },
    { value: "hvs-koran", label: "Kertas HVS / Koran" },
  ]
};

const MAKS_UKURAN_FOTO = 2 * 1024 * 1024; // 2 MB

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formSetor");
  if (!form) return;

  const formCard = document.getElementById("formCard");
  const successCard = document.getElementById("successCard");
  const btnBaru = document.getElementById("btnPengajuanBaru");
  const formError = document.getElementById("formError");

  const bankSampah = document.getElementById("bankSampah");
  const kategori = document.getElementById("kategori");
  const jenis = document.getElementById("jenis");
  const tanggal = document.getElementById("tanggal");
  const kondisi = document.getElementById("kondisi");

  const fotoBukti = document.getElementById("fotoBukti");
  const uploadPlaceholder = document.getElementById("uploadPlaceholder");
  const imagePreview = document.getElementById("imagePreview");

  // ---------- Tanggal: minimal hari ini (waktu lokal) ----------
  function hariIni() {
    const d = new Date();
    const bulan = String(d.getMonth() + 1).padStart(2, "0");
    const hari = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${bulan}-${hari}`;
  }
  tanggal.min = hariIni();

  // ---------- Kategori -> Jenis ----------
  function isiJenis(kodeKategori) {
    const daftar = JENIS_SAMPAH[kodeKategori] || [];
    jenis.innerHTML = "";

    if (daftar.length === 0) {
      jenis.innerHTML = '<option value="">— Pilih kategori dulu —</option>';
      jenis.disabled = true;
      return;
    }

    jenis.add(new Option("— Pilih Jenis —", ""));
    daftar.forEach((item) => jenis.add(new Option(item.label, item.value)));
    jenis.disabled = false;
  }

  kategori.addEventListener("change", () => isiJenis(kategori.value));

  // ---------- Pratinjau foto ----------
  function resetFoto() {
    fotoBukti.value = "";
    imagePreview.src = "";
    imagePreview.classList.add("hidden");
    uploadPlaceholder.classList.remove("hidden");
  }

  fotoBukti.addEventListener("change", () => {
    const file = fotoBukti.files[0];
    if (!file) {
      resetFoto();
      return;
    }

    if (!file.type.startsWith("image/")) {
      resetFoto();
      tampilkanError("File harus berupa gambar (JPG atau PNG).");
      return;
    }
    if (file.size > MAKS_UKURAN_FOTO) {
      resetFoto();
      tampilkanError("Ukuran foto maksimal 2 MB. Pilih foto yang lebih kecil.");
      return;
    }

    sembunyikanError();
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.src = e.target.result;
      imagePreview.classList.remove("hidden");
      uploadPlaceholder.classList.add("hidden");
    };
    reader.readAsDataURL(file);
  });

  // ---------- Pesan error ----------
  function tampilkanError(pesan) {
    formError.textContent = pesan;
    formError.classList.remove("hidden");
  }
  function sembunyikanError() {
    formError.textContent = "";
    formError.classList.add("hidden");
  }

  // ---------- Validasi ----------
  const WAJIB = [
    { el: bankSampah, nama: "Bank Sampah Tujuan" },
    { el: kategori, nama: "Kategori Sampah" },
    { el: jenis, nama: "Jenis Sampah" },
    { el: tanggal, nama: "Tanggal Pengajuan" },
    { el: kondisi, nama: "Kondisi Sampah" },
  ];
  const KELAS_ERROR = ["ring-2", "ring-red-300"];

  function validasi() {
    const kosong = WAJIB.filter((f) => !f.el.value);

    WAJIB.forEach((f) => f.el.classList.remove(...KELAS_ERROR));
    kosong.forEach((f) => f.el.classList.add(...KELAS_ERROR));

    if (kosong.length > 0) {
      tampilkanError("Lengkapi dulu: " + kosong.map((f) => f.nama).join(", ") + ".");
      kosong[0].el.focus();
      return false;
    }

    if (tanggal.value < hariIni()) {
      tanggal.classList.add(...KELAS_ERROR);
      tampilkanError("Tanggal pengajuan tidak boleh sebelum hari ini.");
      tanggal.focus();
      return false;
    }

    sembunyikanError();
    return true;
  }

  // Hapus tanda error begitu field diubah
  WAJIB.forEach((f) =>
    f.el.addEventListener("input", () => f.el.classList.remove(...KELAS_ERROR)),
  );

  // ---------- Kirim form ----------
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validasi()) return;

    const data = new FormData(form);

    // TODO: kirim ke backend, misalnya:
    // const res = await fetch('/api/nasabah/setoran', { method: 'POST', body: data });
    // if (!res.ok) { tampilkanError('Gagal mengirim pengajuan. Coba lagi.'); return; }
    console.log("Data pengajuan setor:", Object.fromEntries(data.entries()));

    formCard.classList.add("hidden");
    successCard.classList.remove("hidden");
    successCard.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  // ---------- Buat pengajuan baru ----------
  btnBaru.addEventListener("click", () => {
    form.reset();
    isiJenis("");
    resetFoto();
    sembunyikanError();
    WAJIB.forEach((f) => f.el.classList.remove(...KELAS_ERROR));

    successCard.classList.add("hidden");
    formCard.classList.remove("hidden");
    formCard.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});