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

setBadge('pencairanBadge', 1);

document.querySelectorAll('.admin-nav-item').forEach(item => {
  item.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      closeSidebar();
    }
  });
});

const wastePrices = [
  {category: 'Plastik', type: 'Botol PET', variant: 'Botol Tebal', brand: 'Aqua, Club', hasCondition: true, cleanPrice: 3500, dirtyPrice: 2500},
  {category: 'Plastik', type: 'Botol PET', variant: 'Botol Sedang', brand: 'Cheers', hasCondition: true, cleanPrice: 2500, dirtyPrice: 1800},
  {category: 'Plastik', type: 'Botol PET', variant: 'Botol Tipis', brand: '', hasCondition: true, cleanPrice: 1500, dirtyPrice: 1000},
  {category: 'Plastik', type: 'HDPE', variant: '', brand: '', hasCondition: true, cleanPrice: 4000, dirtyPrice: 3000},
  {category: 'Logam', type: 'Aluminium', variant: '', brand: '', hasCondition: false, price: 12000},
  {category: 'Kertas', type: 'Kardus', variant: '', brand: '', hasCondition: false, price: 1800}
];

const deposits = [
  {id: 'SET-001', customer: 'Budi Santoso', date: '2026-09-23', type: 'Botol PET', category: 'Plastik', condition: 'clean', status: 'waiting'},
  {id: 'SET-002', customer: 'Siti Rahayu', date: '2026-09-22', type: 'Kardus', category: 'Kertas', condition: null, status: 'done'},
  {id: 'SET-003', customer: 'Ahmad Fauzi', date: '2026-09-21', type: 'Aluminium', category: 'Logam', condition: null, status: 'rejected'}
];

const depositSearch = document.getElementById('depositSearch');
const depositTableBody = document.getElementById('depositTableBody');
const depositModal = document.getElementById('depositModal');
const depositModalTitle = document.getElementById('depositModalTitle');
const depositInfo = document.getElementById('depositInfo');
const acceptModeButton = document.getElementById('acceptModeButton');
const rejectModeButton = document.getElementById('rejectModeButton');
const acceptPanel = document.getElementById('acceptPanel');
const rejectPanel = document.getElementById('rejectPanel');
const weighingFields = document.getElementById('weighingFields');
const totalWeight = document.getElementById('totalWeight');
const totalNominal = document.getElementById('totalNominal');
const rejectReason = document.getElementById('rejectReason');
const saveDepositButton = document.getElementById('saveDepositButton');

let activeDeposit = null;
let modalMode = 'accept';

function formatRupiah(value) {
  return `Rp ${value.toLocaleString('id-ID')}`;
}

function formatDate(value) {
  return new Date(`${value}T00:00:00`).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

function getConditionLabel(condition) {
  if (condition === 'clean') return 'Bersih';
  if (condition === 'dirty') return 'Kotor';
  return '-';
}

function getStatus(status) {
  if (status === 'waiting') {
    return '<span class="deposit-status deposit-status-waiting">Menunggu Diserahkan</span>';
  }
  if (status === 'done') {
    return '<span class="deposit-status deposit-status-done">Sudah Setor</span>';
  }
  return '<span class="deposit-status deposit-status-rejected">Ditolak</span>';
}

function renderDeposits(keyword = '') {
  const search = keyword.trim().toLowerCase();
  depositTableBody.innerHTML = '';
  deposits
    .filter(item => {
      const text = [
        item.id,
        item.customer,
        formatDate(item.date),
        item.type,
        item.category,
        getConditionLabel(item.condition),
        item.status === 'waiting' ? 'Menunggu Diserahkan' : item.status === 'done' ? 'Sudah Setor' : 'Ditolak'
      ].join(' ').toLowerCase();
      return text.includes(search);
    })
    .forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.id}</td>
        <td class="font-semibold text-slate-900">${item.customer}</td>
        <td>${formatDate(item.date)}</td>
        <td>${item.type}</td>
        <td>${item.category}</td>
        <td>${getConditionLabel(item.condition)}</td>
        <td>${getStatus(item.status)}</td>
        <td>${item.status === 'waiting' ? `<button type="button" class="deposit-action" data-id="${item.id}">Konfirmasi</button>` : '<span class="text-slate-300">—</span>'}</td>`;
      depositTableBody.appendChild(row);
    });
  updateSetoranBadge();
}

function updateSetoranBadge() {
  const total = deposits.filter(item => item.status === 'waiting').length;
  setBadge('setoranBadge', total);
}
depositSearch.addEventListener('input', () => {
  renderDeposits(depositSearch.value);
});

depositTableBody.addEventListener('click', event => {
  const button = event.target.closest('.deposit-action');
  if (!button) return;
  activeDeposit = deposits.find(item => item.id === button.dataset.id);
  if (!activeDeposit) return;
  openDepositModal();
});

function openDepositModal() {
  depositModalTitle.textContent = `Konfirmasi Setoran · ${activeDeposit.id}`;
  depositInfo.innerHTML = `
    <div><span>Nasabah</span><strong>${activeDeposit.customer}</strong></div>
    <div><span>Kategori</span><strong>${activeDeposit.category}</strong></div>
    <div><span>Jenis</span><strong>${activeDeposit.type}</strong></div>
    ${activeDeposit.condition ? `<div><span>Kondisi</span><strong>${getConditionLabel(activeDeposit.condition)}</strong></div>` : ''}`;

  modalMode = 'accept';
  rejectReason.value = '';
  showAcceptMode();
  renderWeighingFields();
  depositModal.classList.add('show');
  depositModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeDepositModal() {
  if (depositModal.contains(document.activeElement)) {
    document.activeElement.blur();
  }
  depositModal.classList.remove('show');
  depositModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  activeDeposit = null;
}

document.querySelectorAll('[data-close-modal]').forEach(button => {
  button.addEventListener('click', closeDepositModal);
});

document.getElementById('closeDepositModal').addEventListener('click', closeDepositModal);

function showAcceptMode() {
  modalMode = 'accept';
  acceptPanel.hidden = false;
  rejectPanel.hidden = true;
  acceptModeButton.classList.add('active');
  rejectModeButton.classList.remove('active', 'reject-active');
  saveDepositButton.textContent = 'Simpan & Update Status';
  saveDepositButton.className = 'deposit-confirm';
}

function showRejectMode() {
  modalMode = 'reject';
  acceptPanel.hidden = true;
  rejectPanel.hidden = false;
  acceptModeButton.classList.remove('active');
  rejectModeButton.classList.add('active', 'reject-active');
  saveDepositButton.textContent = 'Tolak Setoran';
  saveDepositButton.className = 'deposit-reject';
}

acceptModeButton.addEventListener('click', showAcceptMode);
rejectModeButton.addEventListener('click', showRejectMode);

function getActivePrices() {
  return wastePrices.filter(item =>
    item.category === activeDeposit.category &&
    item.type === activeDeposit.type
  );
}

function getPrice(item) {
  if (!item.hasCondition) return item.price;
  return activeDeposit.condition === 'dirty'
    ? item.dirtyPrice
    : item.cleanPrice;
}

function renderWeighingFields() {
  const items = getActivePrices();
  weighingFields.innerHTML = '';
  if (!items.length) return;
  const hasVariants = items.some(item => item.variant);
  items.forEach((item, index) => {
    const price = getPrice(item);
    const field = document.createElement('div');
    if (hasVariants) {
      field.className = 'deposit-weigh-item';
      field.innerHTML = `
        <div class="deposit-variant-title">
          <strong>${item.variant}</strong>
          ${item.brand ? `<span>Contoh: ${item.brand}</span>` : ''}
        </div>
        <label class="deposit-weight-label" for="weight-${index}">Berat (kg)</label>
        <input id="weight-${index}" type="number" min="0" step="0.01" class="deposit-weight-input" data-price="${price}" placeholder="0">
        <div class="deposit-price-row">
          <span>${formatRupiah(price)}/kg</span><strong class="deposit-subtotal">${formatRupiah(0)}</strong>
        </div>`;
    } else {
      field.innerHTML = `
        <label class="deposit-weight-label" for="weight-${index}">Berat Riil (kg)</label>
        <input id="weight-${index}" type="number" min="0" step="0.01" class="deposit-weight-input" data-price="${price}" placeholder="0">
        <div class="deposit-price-row mt-2">
          <span>Harga/kg</span><strong>${formatRupiah(price)}</strong>
        </div>`;
    }
    weighingFields.appendChild(field);
  });

  document.querySelectorAll('.deposit-weight-input').forEach(input => {
    input.addEventListener('input', calculateDeposit);
  });

  calculateDeposit();
}

function calculateDeposit() {
  let weight = 0;
  let nominal = 0;
  document.querySelectorAll('.deposit-weight-input').forEach(input => {
    const itemWeight = Number(input.value) || 0;
    const price = Number(input.dataset.price);
    weight += itemWeight;
    nominal += itemWeight * price;
    const subtotal = input.closest('.deposit-weigh-item') ?.querySelector('.deposit-subtotal');
    if (subtotal) {
      subtotal.textContent = formatRupiah(itemWeight * price);
    }
  });

  totalWeight.textContent = `${weight.toLocaleString('id-ID', {
    maximumFractionDigits: 2
  })} kg`;

  totalNominal.textContent = formatRupiah(nominal);
}

saveDepositButton.addEventListener('click', () => {
  if (!activeDeposit) return;
  if (modalMode === 'reject') {
    if (!rejectReason.value.trim()) {
      rejectReason.focus();
      return;
    }
    activeDeposit.status = 'rejected';
  } else {
    const total = [...document.querySelectorAll('.deposit-weight-input')]
      .reduce((sum, input) => sum + (Number(input.value) || 0), 0);
    if (total <= 0) return;
    activeDeposit.status = 'done';
  }

  closeDepositModal();
  renderDeposits(depositSearch.value);
});

renderDeposits();