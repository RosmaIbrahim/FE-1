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

const periodFilter = document.getElementById('periodFilter');
const customDateFilter = document.getElementById('customDateFilter');
const startDate = document.getElementById('startDate');
const endDate = document.getElementById('endDate');
const recapRows = document.querySelectorAll('#recapTableBody tr');
const recapEmpty = document.getElementById('recapEmpty');

function formatRupiah(value) {
  return `Rp ${value.toLocaleString('id-ID')}`;
}

function updateRecap() {
  let totalSetoran = 0;
  let totalWeight = 0;
  let totalIncome = 0;
  let totalPencairan = 0;
  let totalExpense = 0;
  let visibleRows = 0;

  const referenceDate = new Date('2026-09-18T00:00:00');
  const startOfWeek = new Date(referenceDate);
  const day = startOfWeek.getDay();
  const difference = day === 0 ? -6 : 1 - day;

  startOfWeek.setDate(startOfWeek.getDate() + difference);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  recapRows.forEach(row => {
    const rowDate = new Date(`${row.dataset.date}T00:00:00`);
    let showRow = true;

    if (periodFilter.value === 'week') {
      showRow = rowDate >= startOfWeek && rowDate <= endOfWeek;
    }

    if (periodFilter.value === 'month') {
      showRow =
        rowDate.getMonth() === referenceDate.getMonth() &&
        rowDate.getFullYear() === referenceDate.getFullYear();
    }

    if (periodFilter.value === 'custom') {
      if (startDate.value) {
        showRow = rowDate >= new Date(`${startDate.value}T00:00:00`);
      }
      if (showRow && endDate.value) {
        showRow = rowDate <= new Date(`${endDate.value}T00:00:00`);
      }
    }

    row.hidden = !showRow;
    if (!showRow) return;
    visibleRows++;
    totalSetoran += Number(row.dataset.setoran);
    totalWeight += Number(row.dataset.weight);
    totalIncome += Number(row.dataset.income);
    totalPencairan += Number(row.dataset.pencairan);
    totalExpense += Number(row.dataset.expense);
  });

  document.getElementById('totalSetoranRecap').textContent = `${totalSetoran} transaksi`;
  document.getElementById('totalBeratRecap').textContent = `${totalWeight.toLocaleString('id-ID')} kg`;
  document.getElementById('totalPencairanRecap').textContent = formatRupiah(totalExpense);
  document.getElementById('tableTotalSetoran').textContent = `${totalSetoran} transaksi`;
  document.getElementById('tableTotalWeight').textContent = `${totalWeight.toLocaleString('id-ID')} kg`;
  document.getElementById('tableTotalIncome').textContent = formatRupiah(totalIncome);
  document.getElementById('tableTotalPencairan').textContent = `${totalPencairan} transaksi`;
  document.getElementById('tableTotalExpense').textContent = formatRupiah(totalExpense);
  recapEmpty.hidden = visibleRows > 0;
}
periodFilter.addEventListener('change', () => {
  customDateFilter.hidden = periodFilter.value !== 'custom';
  updateRecap();
});

startDate.addEventListener('change', updateRecap);
endDate.addEventListener('change', updateRecap);

updateRecap();