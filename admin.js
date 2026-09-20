const menuButton = document.getElementById('menuButton');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function openSidebar() {
  sidebar.classList.add('show');
  sidebarOverlay.classList.add('show');
}

function closeSidebar() {
  sidebar.classList.remove('show');
  sidebarOverlay.classList.remove('show');
}

menuButton.addEventListener('click', () => {
  if (sidebar.classList.contains('show')) {
    closeSidebar();
  } else {
    openSidebar();
  }
});
sidebarOverlay.addEventListener('click', closeSidebar);

document.querySelectorAll('.admin-nav-item').forEach(item => {
  item.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      closeSidebar();
    }
  });
});

function setBadge(id, total) {
  const badge = document.getElementById(id);
  if (!badge) return;
  badge.textContent = total;
  badge.hidden = total <= 0;
}

function updateDashboard(data) {
  const totalNasabah = document.getElementById('totalNasabah');
  const pendingSetoran = document.getElementById('totalSetoran');
  const pendingPencairan = document.getElementById('totalPencairan');
  if (totalNasabah) {
    totalNasabah.textContent = data.totalNasabah;
  }
  if (pendingSetoran) {
    pendingSetoran.textContent = data.pendingSetoran;
  }
  if (pendingPencairan) {
    pendingPencairan.textContent = data.pendingPencairan;
  }
  setBadge('setoranBadge', data.pendingSetoran);
  setBadge('pencairanBadge', data.pendingPencairan);
}

updateDashboard({
  totalNasabah: 247,
  pendingSetoran: 3,
  pendingPencairan: 1
});