// Data Detail per RW
const detailRwData = [
  { id: 'rw01', rw: 'RW 01', namaUnit: 'Bank Sampah Melati', nasabah: 120, totalSampah: 1450, status: 'SANGAT AKTIF' },
  { id: 'rw02', rw: 'RW 02', namaUnit: 'Bank Sampah Mawar', nasabah: 98, totalSampah: 1120, status: 'AKTIF' },
  { id: 'rw03', rw: 'RW 03', namaUnit: 'Bank Sampah Kenanga', nasabah: 85, totalSampah: 940, status: 'AKTIF' },
  { id: 'rw04', rw: 'RW 04', namaUnit: 'Bank Sampah Dahlia', nasabah: 30, totalSampah: 210, status: 'PASIF' },
  { id: 'rw05', rw: 'RW 05', namaUnit: 'Bank Sampah Anggrek', nasabah: 110, totalSampah: 1300, status: 'SANGAT AKTIF' },
  { id: 'rw06', rw: 'RW 06', namaUnit: 'Bank Sampah Kamboja', nasabah: 75, totalSampah: 800, status: 'AKTIF' },
  { id: 'rw07', rw: 'RW 07', namaUnit: 'Bank Sampah Flamboyan', nasabah: 92, totalSampah: 1050, status: 'AKTIF' }
];

document.addEventListener('DOMContentLoaded', () => {
  initSidebarToggle();
  initRwFilter();
  renderDetailRwTable('all');
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

// Inisialisasi Event Listener pada Dropdown Filter RW
function initRwFilter() {
  const filterRw = document.getElementById('filterRw');
  if (!filterRw) return;

  filterRw.addEventListener('change', (e) => {
    const selectedRw = e.target.value;
    renderDetailRwTable(selectedRw);
  });
}

// Render Tabel Berdasarkan Filter
function renderDetailRwTable(selectedRw = 'all') {
  const tbody = document.getElementById('detailRwBody');
  if (!tbody) return;

  // Filter Data
  const filteredData = selectedRw === 'all' 
    ? detailRwData 
    : detailRwData.filter(item => item.id === selectedRw);

  if (filteredData.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="text-center py-6 text-slate-500">
          Data untuk wilayah RW ini tidak ditemukan.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filteredData.map(item => {
    const isSangAtAktif = item.status === 'SANGAT AKTIF';
    const isPasif = item.status === 'PASIF';
    
    let badgeClass = 'sa-badge-active';
    if (isSangAtAktif) badgeClass = 'bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-0.5 rounded-full text-xs';
    if (isPasif) badgeClass = 'sa-badge-inactive';

    return `
      <tr class="sa-tr hover:bg-slate-50/80 transition">
        <td class="sa-td-rw">${item.rw}</td>
        <td class="sa-td-strong">${item.namaUnit}</td>
        <td class="sa-td text-slate-700">${item.nasabah} Orang</td>
        <td class="sa-td font-semibold text-slate-800">${item.totalSampah.toLocaleString('id-ID')} Kg</td>
        <td class="sa-td">
          <span class="sa-badge ${badgeClass}">${item.status}</span>
        </td>
      </tr>
    `;
  }).join('');
}