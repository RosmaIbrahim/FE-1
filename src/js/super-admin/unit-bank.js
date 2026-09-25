// Data Unit Bank Sampah
let unitsData = [
  { id: 'rw01', rw: 'RW 01', nama: 'Bank Sampah Melati', alamat: 'Jl. Jambangan No. 5, Depan Balai RW 01', status: 'AKTIF' },
  { id: 'rw02', rw: 'RW 02', nama: 'Bank Sampah Mawar', alamat: 'Jl. Jambangan Kebon No. 12, RW 02', status: 'AKTIF' },
  { id: 'rw03', rw: 'RW 03', nama: 'Bank Sampah Kenanga', alamat: 'Jl. Jambangan Indah Blok A/3', status: 'AKTIF' },
  { id: 'rw04', rw: 'RW 04', nama: 'Bank Sampah Dahlia', alamat: 'Balai RW 04 Jambangan', status: 'NONAKTIF' },
  { id: 'rw05', rw: 'RW 05', nama: 'Bank Sampah Anggrek', alamat: 'Jl. Karah Agung No. 8', status: 'AKTIF' },
  { id: 'rw06', rw: 'RW 06', nama: 'Bank Sampah Kamboja', alamat: 'Samping Pos Kamling RW 06', status: 'AKTIF' },
  { id: 'rw07', rw: 'RW 07', nama: 'Bank Sampah Flamboyan', alamat: 'Gedung Serbaguna RW 07', status: 'AKTIF' }
];

document.addEventListener('DOMContentLoaded', () => {
  initSidebarToggle();
  renderUnitTable();
  initFormValidation();
});

// Sidebar Mobile Toggle
function initSidebarToggle() {
  const btnMenu = document.getElementById('btnMenu');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');

  if (!btnMenu || !sidebar || !overlay) return;

  const toggle = () => {
    const isExpanded = btnMenu.getAttribute('aria-expanded') === 'true';
    btnMenu.setAttribute('aria-expanded', !isExpanded);
    sidebar.classList.toggle('-translate-x-full');
    overlay.classList.toggle('hidden');
  };

  btnMenu.addEventListener('click', toggle);
  overlay.addEventListener('click', toggle);
}

// Render Tabel Unit
function renderUnitTable() {
  const tbody = document.getElementById('unitBody');
  if (!tbody) return;

  tbody.innerHTML = unitsData.map((unit, index) => {
    const isAktif = unit.status === 'AKTIF';
    const badgeClass = isAktif ? 'sa-badge-active' : 'sa-badge-inactive';

    const btnActionClass = isAktif 
      ? 'px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 transition cursor-pointer inline-block' 
      : 'px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200 transition cursor-pointer inline-block';

    return `
      <tr class="sa-tr hover:bg-slate-50/80 transition">
        <td class="sa-td-rw">${unit.rw}</td>
        <td class="sa-td-strong">${unit.nama}</td>
        <td class="sa-td text-slate-600">${unit.alamat}</td>
        <td class="sa-td">
          <span class="sa-badge ${badgeClass}">${unit.status}</span>
        </td>
        <td class="sa-td text-center">
          <button type="button" onclick="toggleStatus(${index})" class="${btnActionClass}">
            ${isAktif ? 'Nonaktifkan' : 'Aktifkan'}
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

// Validasi Form & Tambah Unit
function initFormValidation() {
  const namaInput = document.getElementById('unitNama');
  const rwSelect = document.getElementById('unitRw');
  const alamatInput = document.getElementById('unitAlamat');
  const btnTambah = document.getElementById('btnTambahUnit');

  if (!namaInput || !rwSelect || !alamatInput || !btnTambah) return;

  const checkValidation = () => {
    const isValid = namaInput.value.trim() !== '' &&
                    rwSelect.value !== '' &&
                    alamatInput.value.trim() !== '';
    btnTambah.disabled = !isValid;
  };

  namaInput.addEventListener('input', checkValidation);
  rwSelect.addEventListener('change', checkValidation);
  alamatInput.addEventListener('input', checkValidation);

  btnTambah.addEventListener('click', () => {
    const rwLabel = rwSelect.options[rwSelect.selectedIndex].text;
    
    // Tambah Ke Data
    unitsData.push({
      id: rwSelect.value,
      rw: rwLabel,
      nama: namaInput.value.trim(),
      alamat: alamatInput.value.trim(),
      status: 'AKTIF'
    });

    // Reset Form
    namaInput.value = '';
    rwSelect.value = '';
    alamatInput.value = '';
    btnTambah.disabled = true;

    renderUnitTable();
  });
}

// Toggle Status Unit (Aktif / Nonaktif)
window.toggleStatus = function(index) {
  if (unitsData[index]) {
    unitsData[index].status = unitsData[index].status === 'AKTIF' ? 'NONAKTIF' : 'AKTIF';
    renderUnitTable();
  }
};