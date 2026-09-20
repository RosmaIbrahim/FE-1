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

const scheduleForm = document.getElementById('scheduleForm');
const scheduleTableBody = document.getElementById('scheduleTableBody');
const scheduleDay = document.getElementById('scheduleDay');
const scheduleDate = document.getElementById('scheduleDate');
const openTime = document.getElementById('openTime');
const closeTime = document.getElementById('closeTime');
const scheduleStatus = document.getElementById('scheduleStatus');
const submitButton = document.querySelector('.schedule-submit');

let editingRow = null;

function formatDate(date) {
  const value = new Date(`${date}T00:00:00`);
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(value);
}

function createStatus(status) {
  const className = status === 'Buka'
    ? 'admin-status-success'
    : 'admin-status-danger';
  return `
    <span class="admin-status ${className}">
      ${status}
    </span>
  `;
}

function resetScheduleForm() {
  scheduleForm.reset();
  editingRow = null;
  submitButton.textContent = 'Tambah Jadwal';
}

scheduleForm.addEventListener('submit', event => {
  event.preventDefault();
  if (editingRow) {
    editingRow.dataset.date = scheduleDate.value;
    editingRow.children[0].textContent = scheduleDay.value;
    editingRow.children[1].textContent = formatDate(scheduleDate.value);
    editingRow.children[2].textContent = openTime.value;
    editingRow.children[3].textContent = closeTime.value;
    editingRow.children[4].innerHTML = createStatus(
      scheduleStatus.value
    );
    resetScheduleForm();
    return;
  }

  const row = document.createElement('tr');
  row.dataset.date = scheduleDate.value;
  row.innerHTML = `
    <td class="schedule-day">${scheduleDay.value}</td>
    <td>${formatDate(scheduleDate.value)}</td>
    <td>${openTime.value}</td>
    <td>${closeTime.value}</td>
    <td>
      ${createStatus(scheduleStatus.value)}
    </td>
    <td>
      <div class="schedule-actions">
        <button type="button" class="schedule-edit">
          Edit
        </button>
        <span></span>
        <button type="button" class="schedule-delete">
          Hapus
        </button>
      </div>
    </td>
  `;
  scheduleTableBody.appendChild(row);
  resetScheduleForm();
});

scheduleTableBody.addEventListener('click', event => {
  const row = event.target.closest('tr');
  if (!row) return;
  if (event.target.classList.contains('schedule-delete')) {
    row.remove();
    if (editingRow === row) {
      resetScheduleForm();
    }
    return;
  }
  if (event.target.classList.contains('schedule-edit')) {
    editingRow = row;
    scheduleDay.value = row.children[0].textContent.trim();
    scheduleDate.value = row.dataset.date;
    openTime.value = row.children[2].textContent.trim();
    closeTime.value = row.children[3].textContent.trim();
    scheduleStatus.value = row.children[4].textContent.trim();
    submitButton.textContent = 'Simpan Perubahan';
    scheduleForm.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  }
});