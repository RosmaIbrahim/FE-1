// Data Dummy Dashboard
const dashboardData = {
  ringkasan: {
    unitAktif: 6,
    totalUnit: 7,
    totalNasabah: 1346,
    totalPendapatan: 'Rp 23,2 Jt',
    totalSampah: '48,2 ton',
    bulan: 'September 2026'
  },
  units: [
    { id: 'rw01', rw: 'RW 01', nama: 'Bank Sampah Melati', nasabah: 247, pendapatan: 'Rp 4,2 Jt', status: 'AKTIF' },
    { id: 'rw02', rw: 'RW 02', nama: 'Bank Sampah Mawar', nasabah: 183, pendapatan: 'Rp 3,1 Jt', status: 'AKTIF' },
    { id: 'rw03', rw: 'RW 03', nama: 'Bank Sampah Kenanga', nasabah: 210, pendapatan: 'Rp 3,8 Jt', status: 'AKTIF' },
    { id: 'rw04', rw: 'RW 04', nama: 'Bank Sampah Dahlia', nasabah: 95, pendapatan: 'Rp 1,4 Jt', status: 'NONAKTIF' },
    { id: 'rw05', rw: 'RW 05', nama: 'Bank Sampah Anggrek', nasabah: 312, pendapatan: 'Rp 5,6 Jt', status: 'AKTIF' },
    { id: 'rw06', rw: 'RW 06', nama: 'Bank Sampah Kamboja', nasabah: 178, pendapatan: 'Rp 2,9 Jt', status: 'AKTIF' },
    { id: 'rw07', rw: 'RW 07', nama: 'Bank Sampah Flamboyan', nasabah: 121, pendapatan: 'Rp 2,2 Jt', status: 'AKTIF' }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  initSidebarToggle();
  renderStatCards();
  renderUnitTable();
});

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

function renderStatCards() {
  const container = document.getElementById('statCards');
  if (!container) return;

  const { ringkasan } = dashboardData;

  container.innerHTML = `
    <!-- Card 1 -->
    <div class="sa-stat-card sa-stat-blue">
      <p class="sa-stat-label-blue">Unit Bank Sampah Aktif</p>
      <p class="sa-stat-value-blue">
        ${ringkasan.unitAktif} <span class="text-slate-400 font-semibold text-xl">/ ${ringkasan.totalUnit}</span>
      </p>
      <p class="sa-stat-sub">dari ${ringkasan.totalUnit} RW Jambangan</p>
    </div>

    <!-- Card 2 -->
    <div class="sa-stat-card sa-stat-emerald">
      <p class="sa-stat-label-emerald">Total Nasabah Terdaftar</p>
      <p class="sa-stat-value-emerald">
        ${new Intl.NumberFormat('id-ID').format(ringkasan.totalNasabah)}
      </p>
      <p class="sa-stat-sub">seluruh RW</p>
    </div>

    <!-- Card 3 -->
    <div class="sa-stat-card sa-stat-amber">
      <p class="sa-stat-label-amber">Total Pendapatan Kelurahan</p>
      <p class="sa-stat-value-amber">${ringkasan.totalPendapatan}</p>
      <p class="sa-stat-sub">bulan ${ringkasan.bulan}</p>
    </div>

    <!-- Card 4 -->
    <div class="sa-stat-card sa-stat-blue">
      <p class="sa-stat-label-blue">Total Sampah Terkelola</p>
      <p class="sa-stat-value-blue">${ringkasan.totalSampah}</p>
      <p class="sa-stat-sub">bulan ${ringkasan.bulan}</p>
    </div>
  `;
}

function renderUnitTable() {
  const tbody = document.getElementById('dashboardUnitBody');
  if (!tbody) return;

  tbody.innerHTML = dashboardData.units.map(unit => {
    const isAktif = unit.status === 'AKTIF';
    const badgeClass = isAktif ? 'sa-badge-active' : 'sa-badge-inactive';

    return `
      <tr class="sa-tr hover:bg-slate-50/80 transition">
        <td class="sa-td-rw">${unit.rw}</td>
        <td class="sa-td-strong">${unit.nama}</td>
        <td class="sa-td">${unit.nasabah}</td>
        <td class="sa-td-money">${unit.pendapatan}</td>
        <td class="sa-td">
          <span class="sa-badge ${badgeClass}">${unit.status}</span>
        </td>
        <td class="sa-td text-right">
          <a href="unit-rw.html?rw=${unit.id}" class="sa-link-blue">Lihat Detail</a>
        </td>
      </tr>
    `;
  }).join('');
}
