/**
 * profile-check.js
 * Dipakai di SEMUA halaman nasabah (dashboard, profil, setoran, tabungan, pencairan).
 * Isinya dua hal:
 *   1. Menampilkan / menyembunyikan peringatan "Profil belum lengkap".
 *   2. Buka / tutup sidebar (drawer) di layar kecil.
 *
 * ---------- 1. Peringatan profil ----------
 * Beri atribut `data-profil-warning` pada elemen apa pun (banner, badge
 * sidebar, dll). Elemen itu akan disembunyikan otomatis kalau profil
 * nasabah sudah lengkap. Status "lengkap" diset oleh profile.js saat
 * profil berhasil disimpan.
 *
 * ---------- 2. Sidebar responsif ----------
 * Dibutuhkan elemen berikut di HTML:
 *   #btnMenu         -> tombol hamburger di header
 *   #sidebar         -> <aside> sidebar
 *   #sidebarOverlay  -> lapisan gelap di belakang sidebar
 * Di laptop (>=1024px) sidebar selalu tampil, bagian ini tidak berpengaruh.
 */

const HALAMAN_LAYANAN = ["setoran.html", "tabungan.html", "pencairan.html"];

/* =========================================================
   1. PERINGATAN PROFIL
   ========================================================= */

// Sementara dibaca dari localStorage (diset oleh profile.js).
// TODO: kalau backend sudah ada, ambil dari server.
function bacaStatusProfil() {
  try {
    return localStorage.getItem("profilLengkap") === "true";
  } catch {
    return false; // localStorage diblokir browser
  }
}

// Dibaca ulang setiap dipanggil, supaya hasilnya selalu terbaru
// setelah profil disimpan.
function updateLabelProfil() {
  const lengkap = bacaStatusProfil();
  document.querySelectorAll("[data-profil-warning]").forEach((el) => {
    // style.display dipakai karena atribut `hidden` kalah oleh class `flex`
    el.style.display = lengkap ? "none" : "";
  });
}

// Dipanggil dari profile.js setelah profil berhasil disimpan
window.updateLabelProfil = updateLabelProfil;

document.addEventListener("DOMContentLoaded", () => {
  updateLabelProfil();

  // Wajib lengkapi profil sebelum akses layanan.
  // Hapus blok ini kalau tidak ingin memaksa redirect.
  const halaman = location.pathname.split("/").pop();
  if (HALAMAN_LAYANAN.includes(halaman) && !bacaStatusProfil()) {
    location.replace("profile.html");
  }
});

/* =========================================================
   2. SIDEBAR RESPONSIF (drawer di hp / tablet)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const btnMenu = document.getElementById("btnMenu");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebarOverlay");

  if (!btnMenu || !sidebar || !overlay) return;

  const SEMBUNYI = "-translate-x-full";

  function sidebarTerbuka() {
    return !sidebar.classList.contains(SEMBUNYI);
  }

  function bukaSidebar() {
    sidebar.classList.remove(SEMBUNYI);
    overlay.classList.remove("hidden");
    btnMenu.setAttribute("aria-expanded", "true");
  }

  function tutupSidebar() {
    sidebar.classList.add(SEMBUNYI);
    overlay.classList.add("hidden");
    btnMenu.setAttribute("aria-expanded", "false");
  }

  btnMenu.addEventListener("click", () => {
    if (sidebarTerbuka()) tutupSidebar();
    else bukaSidebar();
  });

  // Klik area gelap = tutup
  overlay.addEventListener("click", tutupSidebar);

  // Tombol Esc = tutup
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") tutupSidebar();
  });

  // Klik menu di sidebar = tutup
  sidebar
    .querySelectorAll("a")
    .forEach((a) => a.addEventListener("click", tutupSidebar));

  // Kalau layar dibesarkan ke ukuran laptop, reset supaya overlay tidak nyangkut
  window.matchMedia("(min-width: 1024px)").addEventListener("change", (e) => {
    if (e.matches) tutupSidebar();
  });
});