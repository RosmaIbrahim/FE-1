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

const withdrawalData = [
  {id: 'CAI-001', nasabah: 'Ahmad Fauzi', tanggal: '18 Sep 2026', saldo: 78900, nominal: 30000, status: 'waiting'},
  {id: 'CAI-002', nasabah: 'Budi Santoso', tanggal: '18 Sep 2026', saldo: 35650, nominal: 15000, status: 'pickup'},
  {id: 'CAI-003', nasabah: 'Siti Rahayu', tanggal: '15 Sep 2026', saldo: 12300, nominal: 10000, status: 'done'}
];

const withdrawalTableBody = document.getElementById('withdrawalTableBody');
function formatRupiah(value) {
  return `Rp ${value.toLocaleString('id-ID')}`;
}

// modal(pop up blur)
const approveModal = document.getElementById('approveModal');
const rejectModal = document.getElementById('rejectModal');
const handoverModal = document.getElementById('handoverModal');
const confirmApprove = document.getElementById('confirmApprove');
const confirmReject = document.getElementById('confirmReject');
const confirmHandover = document.getElementById('confirmHandover');
const rejectReason = document.getElementById('rejectReason');
const rejectError = document.getElementById('rejectError');

let selectedWithdrawal = null;
let lastActionButton = null;

function openModal(modal) {
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeModal() {
  const activeModal = document.querySelector('.withdrawal-modal.show');
  if (!activeModal) return;
  if (activeModal.contains(document.activeElement)) {
    document.activeElement.blur();
  }
  activeModal.classList.remove('show');
  activeModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  selectedWithdrawal = null;
  if (lastActionButton && document.body.contains(lastActionButton)) {
    lastActionButton.focus();
  }
}

// isi modal
function openApproveModal(item) {
  selectedWithdrawal = item;
  document.getElementById('approveId').textContent = item.id;
  document.getElementById('approveName').textContent = item.nasabah;
  document.getElementById('approveSaldo').textContent = formatRupiah(item.saldo);
  document.getElementById('approveNominal').textContent = formatRupiah(item.nominal);
  document.getElementById('approveTextNominal').textContent = formatRupiah(item.nominal);
  openModal(approveModal);
}
function openRejectModal(item) {
  selectedWithdrawal = item;
  document.getElementById('rejectId').textContent = item.id;
  document.getElementById('rejectName').textContent = item.nasabah;
  document.getElementById('rejectSaldo').textContent = formatRupiah(item.saldo);
  document.getElementById('rejectNominal').textContent = formatRupiah(item.nominal);
  rejectReason.value = '';
  rejectError.classList.add('hidden');
  openModal(rejectModal);
}
function openHandoverModal(item) {
  selectedWithdrawal = item;
  document.getElementById('handoverId').textContent = item.id;
  document.getElementById('handoverName').textContent = item.nasabah;
  document.getElementById('handoverNominal').textContent = formatRupiah(item.nominal);
  document.getElementById('handoverTextName').textContent = item.nasabah;
  document.getElementById('handoverTextNominal').textContent = formatRupiah(item.nominal);
  openModal(handoverModal);
}

// render tabel
function renderWithdrawals() {
  withdrawalTableBody.innerHTML = '';
  withdrawalData.forEach(item => {
    const row = document.createElement('tr');
    let statusHtml = '';
    let actionHtml = '';
    if (item.status === 'waiting') {
      statusHtml = `<span class="withdrawal-status withdrawal-waiting">Menunggu</span>`;
      actionHtml = `
        <div class="flex items-center gap-2">
          <button type="button" class="withdrawal-action text-emerald-700" data-action="accept" data-id="${item.id}">Setujui</button>
          <span class="h-4 w-px bg-slate-200"></span>
          <button type="button" class="withdrawal-action text-red-600" data-action="reject" data-id="${item.id}">Tolak</button>
        </div>`;
    }
    if (item.status === 'pickup') {
      statusHtml = `<span class="withdrawal-status withdrawal-pickup">Belum Diambil</span>`;
      actionHtml = `<button type="button" class="withdrawal-action text-amber-600" data-action="handover" data-id="${item.id}">Konfirmasi Serah</button>`;
    }
    if (item.status === 'done') {
      statusHtml = `<span class="withdrawal-status withdrawal-done">Diambil</span>`;
      actionHtml = `<span class="text-xs text-slate-400">Selesai</span>`;
    }
    row.innerHTML = `
      <td class="font-mono text-xs">${item.id}</td>
      <td class="font-semibold text-slate-900">${item.nasabah}</td>
      <td>${item.tanggal}</td>
      <td class="font-semibold text-emerald-700">${formatRupiah(item.saldo)}</td>
      <td class="font-bold text-slate-900">${formatRupiah(item.nominal)}</td>
      <td>${statusHtml}</td>
      <td>${actionHtml}</td>`;
    withdrawalTableBody.appendChild(row);
  });
  addActionEvents();
}

// buka modal (aksi)
function addActionEvents() {
  document.querySelectorAll('[data-action]').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.dataset.id;
      const action = button.dataset.action;
      const item = withdrawalData.find(data => data.id === id);
      if (!item) return;
      lastActionButton = button;
      if (action === 'accept') {openApproveModal(item);}
      if (action === 'reject') {openRejectModal(item);}
      if (action === 'handover') {openHandoverModal(item);}
    });
  });
}

// konf setujui
confirmApprove.addEventListener('click', () => {
  if (!selectedWithdrawal) return;
  selectedWithdrawal.status = 'pickup';
  closeModal();
  renderWithdrawals();
});
// konf tolak
confirmReject.addEventListener('click', () => {
  if (!selectedWithdrawal) return;
  const reason = rejectReason.value.trim();
  if (!reason) {
    rejectError.classList.remove('hidden');
    rejectReason.focus();
    return;
  }
  const index = withdrawalData.findIndex(
    item => item.id === selectedWithdrawal.id
  );
  if (index !== -1) {
    withdrawalData.splice(index, 1);
  }
  closeModal();
  renderWithdrawals();
});
rejectReason.addEventListener('input', () => {
  if (rejectReason.value.trim()) {
    rejectError.classList.add('hidden');
  }
});
// konf serah
confirmHandover.addEventListener('click', () => {
  if (!selectedWithdrawal) return;
  selectedWithdrawal.status = 'done';
  closeModal();
  renderWithdrawals();
});

// tutup modal
document.querySelectorAll('[data-close-modal]').forEach(button => {
  button.addEventListener('click', closeModal);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

renderWithdrawals();