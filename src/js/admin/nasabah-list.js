const menuButton = document.getElementById('menuButton');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function openSidebar() {
  sidebar.classList.add('show');
  sidebarOverlay.classList.add('show');
  menuButton.setAttribute('aria-expanded', 'true');
}
function closeSidebar() {
  sidebar.classList.remove('show');
  sidebarOverlay.classList.remove('show');
  menuButton.setAttribute('aria-expanded', 'false');
}
menuButton.addEventListener('click', () => {
  if (sidebar.classList.contains('show')) {
    closeSidebar();
  } else {
    openSidebar();
  }
});
sidebarOverlay.addEventListener('click', closeSidebar);
function setBadge(id, total) {
  const badge = document.getElementById(id);
  if (!badge) return;
  badge.textContent = total;
  badge.hidden = total <= 0;
}

setBadge('setoranBadge', 3);
setBadge('pencairanBadge', 1);

document.querySelectorAll('.admin-nav-item').forEach(item => {
  item.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      closeSidebar();
    }
  });
});

const searchNasabah = document.getElementById('searchNasabah');
const nasabahRows = document.querySelectorAll('#nasabahTableBody tr');
const nasabahCount = document.getElementById('nasabahCount');
const nasabahEmpty = document.getElementById('nasabahEmpty');
function filterNasabah() {
  const keyword = searchNasabah.value.trim().toLowerCase();
  let visibleRows = 0;
  nasabahRows.forEach(row => {
    const nik = row.children[0].textContent.toLowerCase();
    const name = row.children[1].textContent.toLowerCase();
    const rtRw = row.children[2].textContent.toLowerCase();
    const phone = row.children[3].textContent.toLowerCase();
    const showRow = nik.includes(keyword) || name.includes(keyword) || rtRw.includes(keyword) || phone.includes(keyword);
    row.style.display = showRow ? '' : 'none';
    if (showRow) {
      visibleRows++;
    }
  });
  nasabahCount.textContent = `${visibleRows} nasabah`;
  nasabahEmpty.classList.toggle('hidden', visibleRows > 0);
}
searchNasabah.addEventListener('input', filterNasabah);
filterNasabah();

const nasabahDetailModal = document.getElementById('nasabahDetailModal');
const nasabahDetailBackdrop = document.getElementById('nasabahDetailBackdrop');
const closeNasabahDetail = document.getElementById('closeNasabahDetail');
const setoranDetailBody = document.getElementById('setoranDetailBody');
const mutasiDetailBody = document.getElementById('mutasiDetailBody');
const setoranPagination = document.getElementById('setoranPagination');
const mutasiPagination = document.getElementById('mutasiPagination');
const detailData = {
  budi: {
    name: 'Budi Santoso', nik: '3578010001000001', rtRw: 'RT 003 / RW 01', phone: '081234567890', saldo: 'Rp 35.650', photo: '../assets/images/tentang1.jpg',
    setoran: [
      ['21 Sep 2026', 'Botol Plastik PET', 'Menunggu Diserahkan', 'waiting'],
      ['18 Sep 2026', 'Kardus', 'Selesai', 'success'],
      ['16 Sep 2026', 'Botol Plastik PET', 'Selesai', 'success'],
      ['12 Sep 2026', 'Kertas', 'Selesai', 'success'],
      ['08 Sep 2026', 'Kardus', 'Selesai', 'success'],
      ['04 Sep 2026', 'Botol Plastik PET', 'Selesai', 'success'],
      ['29 Agu 2026', 'Kertas', 'Selesai', 'success']
    ],
    mutasi: [
      ['16 Sep 2026', 'Setoran diverifikasi', 8050],
      ['10 Sep 2026', 'Pencairan tunai', -20000],
      ['08 Sep 2026', 'Setoran diverifikasi', 12300],
      ['04 Sep 2026', 'Setoran diverifikasi', 6500],
      ['29 Agu 2026', 'Setoran diverifikasi', 9200],
      ['25 Agu 2026', 'Pencairan tunai', -15000]
    ]
  },
  siti: {
    name: 'Siti Rahayu', nik: '3578010002000002', rtRw: 'RT 002 / RW 01', phone: '082233445566', saldo: 'Rp 12.300', photo: '../assets/images/tentang1.jpg',
    setoran: [['19 Sep 2026', 'Kardus', 'Selesai', 'success']],
    mutasi: [['19 Sep 2026', 'Setoran diverifikasi', 7300]]
  }
};

const itemsPerPage = 5;
let currentNasabah;
let setoranPage = 1;
let mutasiPage = 1;

function createPagination(container, totalItems, currentPage, changePage) {
  container.innerHTML = '';
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return;
  const previousButton = document.createElement('button');
  previousButton.type = 'button';
  previousButton.textContent = '‹';
  previousButton.disabled = currentPage === 1;
  previousButton.addEventListener('click', () => {
    changePage(currentPage - 1);
  });
  container.appendChild(previousButton);
  for (let page = 1; page <= totalPages; page++) {
    const pageButton = document.createElement('button');
    pageButton.type = 'button';
    pageButton.textContent = page;
    if (page === currentPage) {
      pageButton.classList.add('active');
    }
    pageButton.addEventListener('click', () => {
      changePage(page);
    });
    container.appendChild(pageButton);
  }

  const nextButton = document.createElement('button');
  nextButton.type = 'button';
  nextButton.textContent = '›';
  nextButton.disabled = currentPage === totalPages;
  nextButton.addEventListener('click', () => {
    changePage(currentPage + 1);
  });
  container.appendChild(nextButton);
}

function renderSetoran() {
  const start = (setoranPage - 1) * itemsPerPage;
  const data = currentNasabah.setoran.slice(start, start + itemsPerPage);
  setoranDetailBody.innerHTML = '';
  data.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item[0]}</td>
      <td>${item[1]}</td>
      <td><span class="detail-status ${item[3] === 'waiting' ? 'detail-status-waiting' : 'detail-status-success'}">${item[2]}</span></td>
    `;
    setoranDetailBody.appendChild(row);
  });
  createPagination(setoranPagination, currentNasabah.setoran.length, setoranPage,
    page => {
      setoranPage = page;
      renderSetoran();
    }
  );
}

function renderMutasi() {
  const start = (mutasiPage - 1) * itemsPerPage;
  const data = currentNasabah.mutasi.slice(start, start + itemsPerPage);
  mutasiDetailBody.innerHTML = '';
  data.forEach(item => {
    const row = document.createElement('tr');
    const isIncome = item[2] >= 0;
    row.innerHTML = `
      <td>${item[0]}</td>
      <td>${item[1]}</td>
      <td class="font-bold ${isIncome ? 'text-emerald-700' : 'text-red-600'}"> ${isIncome ? '+' : '-'}Rp ${Math.abs(item[2]).toLocaleString('id-ID')}</td>
    `;
    mutasiDetailBody.appendChild(row);
  });

  createPagination(mutasiPagination, currentNasabah.mutasi.length, mutasiPage, page => {
      mutasiPage = page;
      renderMutasi();
    }
  );
}

function openNasabahDetail(key) {
  currentNasabah = detailData[key];
  if (!currentNasabah) return;
  setoranPage = 1;
  mutasiPage = 1;
  document.getElementById('detailPhoto').src = currentNasabah.photo;
  document.getElementById('detailPhoto').alt = `Foto profil ${currentNasabah.name}`;
  document.getElementById('detailName').textContent = currentNasabah.name;
  document.getElementById('detailNik').textContent = currentNasabah.nik;
  document.getElementById('detailRtRw').textContent = currentNasabah.rtRw;
  document.getElementById('detailPhone').textContent = currentNasabah.phone;
  document.getElementById('detailSaldo').textContent = currentNasabah.saldo;
  renderSetoran();
  renderMutasi();
  nasabahDetailModal.classList.add('show');
  nasabahDetailModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeNasabahModal() {
  if (nasabahDetailModal.contains(document.activeElement)) {
    document.activeElement.blur();
  }
  nasabahDetailModal.classList.remove('show');
  nasabahDetailModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

document.querySelectorAll('.nasabah-detail-trigger').forEach(button => {
  button.addEventListener('click', () => {
    openNasabahDetail(button.dataset.nasabah);
  });
});

closeNasabahDetail.addEventListener('click', closeNasabahModal);
nasabahDetailBackdrop.addEventListener('click', closeNasabahModal);

document.addEventListener('keydown', event => {
  if (
    event.key === 'Escape' &&
    nasabahDetailModal.classList.contains('show')
  ) {
    closeNasabahModal();
  }
});