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

const tabs = document.querySelectorAll('.price-tab');
const typesPanel = document.getElementById('typesPanel');
const pricesPanel = document.getElementById('pricesPanel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(item => item.classList.remove('active'));
    tab.classList.add('active');
    const showTypes = tab.dataset.tab === 'types';
    typesPanel.classList.toggle('active', showTypes);
    pricesPanel.classList.toggle('active', !showTypes);
  });
});

// ===== DATA SAMPAH =====
let wasteData = [
  {id: 1, category: 'Plastik', type: 'Botol PET', variant: 'Botol Tebal', brand: 'Aqua, Club', hasCondition: true, status: 'active'},
  {id: 2, category: 'Plastik', type: 'Botol PET', variant: 'Botol Sedang', brand: 'Cheers', hasCondition: true, status: 'active'},
  {id: 3, category: 'Plastik', type: 'Botol PET', variant: 'Botol Tipis', brand: '', hasCondition: true, status: 'active'},
  {id: 4, category: 'Plastik', type: 'HDPE', variant: '', brand: '', hasCondition: true, status: 'active'},
  {id: 5, category: 'Logam', type: 'Aluminium', variant: '', brand: '', hasCondition: false, status: 'active'},
  {id: 6, category: 'Kertas', type: 'Kardus', variant: '', brand: '', hasCondition: false, status: 'active'}
];

let nextWasteId = 7;
let editingWasteId = null;

// ===== ELEMENT DATA =====
const wasteForm = document.getElementById('wasteTypeForm');
const wasteTable = document.getElementById('wasteTypeTableBody');
const wasteCategory = document.getElementById('wasteCategory');
const wasteName = document.getElementById('wasteName');
const wasteVariant = document.getElementById('wasteVariant');
const wasteBrand = document.getElementById('wasteBrand');
const wasteCondition = document.getElementById('wasteCondition');
const wasteStatus = document.getElementById('wasteStatus');
const wasteSubmit = document.getElementById('wasteSubmit');

// ===== RENDER DATA =====
function renderWasteTable() {
  wasteTable.innerHTML = '';
  wasteData.forEach(item => {
    const row = document.createElement('tr');
    const active = item.status === 'active';
    row.innerHTML = `
      <td>${item.category}</td>
      <td class="font-semibold text-slate-900">${item.type}</td>
      <td>${item.variant || '-'}</td>
      <td>${item.brand || '-'}</td>
      <td>${item.hasCondition ? 'Bersih & Kotor' : 'Tanpa Kondisi'}</td>
      <td><span class="admin-status ${active ? 'status-active' : 'status-inactive'}">${active ? 'Aktif' : 'Nonaktif'}</span></td>
      <td>
        <div class="price-actions">
          <button type="button" class="price-edit" data-action="edit" data-id="${item.id}">Edit</button>
          <span></span>
          <button type="button" class="price-delete" data-action="delete" data-id="${item.id}">Hapus</button>
        </div>
      </td>
    `;

    wasteTable.appendChild(row);
  });
  updatePriceCategories();
}

// ===== EDIT / HAPUS DATA =====
wasteTable.addEventListener('click', event => {
  const button = event.target.closest('[data-action]');
  if (!button) return;

  const id = Number(button.dataset.id);
  const item = wasteData.find(data => data.id === id);
  if (!item) return;

  if (button.dataset.action === 'edit') {
    editingWasteId = item.id;
    wasteCategory.value = item.category;
    wasteName.value = item.type;
    wasteVariant.value = item.variant;
    wasteBrand.value = item.brand;
    wasteCondition.value = item.hasCondition ? 'yes' : 'no';
    wasteStatus.value = item.status;
    wasteSubmit.textContent = 'Simpan Perubahan';
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  if (button.dataset.action === 'delete') {
    const label = `${item.type}${item.variant ? ` - ${item.variant}` : ''}`;
    if (!confirm(`Hapus ${label}?`)) return;
    wasteData = wasteData.filter(data => data.id !== id);
    if (editingWasteId === id) {
      resetWasteForm();
    }
    renderWasteTable();
  }
});

// ===== TAMBAH / EDIT DATA =====
wasteForm.addEventListener('submit', event => {
  event.preventDefault();

  const data = {
    category: wasteCategory.value,
    type: wasteName.value.trim(),
    variant: wasteVariant.value.trim(),
    brand: wasteBrand.value.trim(),
    hasCondition: wasteCondition.value === 'yes',
    status: wasteStatus.value
  };

  if (!data.category || !data.type) return;
  if (editingWasteId !== null) {
    const item = wasteData.find(item => item.id === editingWasteId);
    if (!item) return;
    Object.assign(item, data);
  } else {
    wasteData.push({id: nextWasteId++, ...data});
  }
  resetWasteForm();
  renderWasteTable();
});

function resetWasteForm() {
  wasteForm.reset();
  wasteStatus.value = 'active';
  editingWasteId = null;
  wasteSubmit.textContent = 'Tambah Data';
}

// ===== ELEMENT HARGA =====
const priceForm = document.getElementById('priceForm');
const priceCategory = document.getElementById('priceCategory');
const priceWasteType = document.getElementById('priceWasteType');
const variantField = document.getElementById('variantField');
const priceVariant = document.getElementById('priceVariant');
const singlePriceField = document.getElementById('singlePriceField');
const cleanPriceField = document.getElementById('cleanPriceField');
const dirtyPriceField = document.getElementById('dirtyPriceField');
const pricePerKg = document.getElementById('pricePerKg');
const cleanPrice = document.getElementById('cleanPrice');
const dirtyPrice = document.getElementById('dirtyPrice');
const effectiveDate = document.getElementById('effectiveDate');
const priceHistoryBody = document.getElementById('priceHistoryBody');

// ===== DROPDOWN KATEGORI =====
function updatePriceCategories() {
  const previousCategory = priceCategory.value;
  const categories = [...new Set(
    wasteData
      .filter(item => item.status === 'active')
      .map(item => item.category)
  )];
  priceCategory.innerHTML = '<option value="">Pilih kategori</option>';
  categories.forEach(category => {
    priceCategory.insertAdjacentHTML('beforeend', `<option value="${category}">${category}</option>`);
  });
  if (categories.includes(previousCategory)) {
    priceCategory.value = previousCategory;
    updatePriceTypes();
  } else {
    resetTypeDropdown();
  }
}

// ===== DROPDOWN JENIS =====
function updatePriceTypes() {
  const category = priceCategory.value;
  priceWasteType.innerHTML = '<option value="">Pilih jenis sampah</option>';
  hideVariantField();
  hidePriceFields();
  if (!category) {
    priceWasteType.disabled = true;
    return;
  }
  const types = [...new Set(
    wasteData
      .filter(item => item.status === 'active' && item.category === category)
      .map(item => item.type)
  )];
  types.forEach(type => {
    priceWasteType.insertAdjacentHTML('beforeend', `<option value="${type}">${type}</option>`);
  });
  priceWasteType.disabled = false;
}

function resetTypeDropdown() {
  priceWasteType.innerHTML = '<option value="">Pilih jenis sampah</option>';
  priceWasteType.disabled = true;
  hideVariantField();
  hidePriceFields();
}

// ===== DROPDOWN VARIAN =====
function updatePriceVariants() {
  const variants = [...new Set(
    wasteData
      .filter(item =>
        item.status === 'active' &&
        item.category === priceCategory.value &&
        item.type === priceWasteType.value &&
        item.variant
      )
      .map(item => item.variant)
  )];

  if (!variants.length) {
    hideVariantField();
    updatePriceFields();
    return;
  }

  priceVariant.innerHTML = '<option value="">Pilih varian</option>';

  variants.forEach(variant => {
    priceVariant.insertAdjacentHTML('beforeend', `<option value="${variant}">${variant}</option>`);
  });

  variantField.hidden = false;
  priceVariant.required = true;
  updatePriceFields();
}

function hideVariantField() {
  variantField.hidden = true;
  priceVariant.required = false;
  priceVariant.innerHTML = '<option value="">Pilih varian</option>';
}

// ===== FIELD HARGA =====
function updatePriceFields() {
  let item;
  if (!variantField.hidden && priceVariant.value) {
    item = wasteData.find(data =>
      data.status === 'active' &&
      data.category === priceCategory.value &&
      data.type === priceWasteType.value &&
      data.variant === priceVariant.value
    );
  } else if (variantField.hidden && priceWasteType.value) {
    item = wasteData.find(data =>
      data.status === 'active' &&
      data.category === priceCategory.value &&
      data.type === priceWasteType.value &&
      !data.variant
    );
  }
  hidePriceFields();
  if (!item) return;
  if (item.hasCondition) {
    cleanPriceField.hidden = false;
    dirtyPriceField.hidden = false;
    cleanPrice.required = true;
    dirtyPrice.required = true;
  } else {
    singlePriceField.hidden = false;
    pricePerKg.required = true;
  }
}

function hidePriceFields() {
  singlePriceField.hidden = true;
  cleanPriceField.hidden = true;
  dirtyPriceField.hidden = true;
  pricePerKg.required = false;
  cleanPrice.required = false;
  dirtyPrice.required = false;
}

priceCategory.addEventListener('change', updatePriceTypes);
priceWasteType.addEventListener('change', updatePriceVariants);
priceVariant.addEventListener('change', updatePriceFields);

// ===== DATA HARGA =====
const priceHistory = [
  {category: 'Plastik', type: 'Botol PET', variant: 'Botol Tebal', hasCondition: true, cleanPrice: 3500, dirtyPrice: 2500, price: null, date: '2026-09-01'},
  {category: 'Plastik', type: 'Botol PET', variant: 'Botol Sedang', hasCondition: true, cleanPrice: 2500, dirtyPrice: 1800, price: null, date: '2026-09-01'},
  {category: 'Plastik', type: 'Botol PET', variant: 'Botol Tipis', hasCondition: true, cleanPrice: 1500, dirtyPrice: 1000, price: null, date: '2026-09-01'},
  {category: 'Plastik', type: 'HDPE', variant: '', hasCondition: true, cleanPrice: 4000, dirtyPrice: 3000, price: null, date: '2026-09-01'},
  {category: 'Logam', type: 'Aluminium', variant: '', hasCondition: false, cleanPrice: null, dirtyPrice: null, price: 12000, date: '2026-09-01'},
  {category: 'Kertas', type: 'Kardus', variant: '', hasCondition: false, cleanPrice: null, dirtyPrice: null, price: 1800, date: '2026-09-01'}
];

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

// ===== RENDER RIWAYAT HARGA =====
function renderPriceHistory() {
  priceHistoryBody.innerHTML = '';
  priceHistory.forEach(item => {
    const row = document.createElement('tr');
    const priceDisplay = item.hasCondition
      ? `<div class="flex flex-col gap-0.5">
          <span><strong>Bersih: </strong><span class="price-value">${formatRupiah(item.cleanPrice)}</span></span>
          <span><strong>Kotor: </strong><span class="price-value">${formatRupiah(item.dirtyPrice)}</span></span>
        </div>`
      : `<span class="price-value">${formatRupiah(item.price)}</span>`;
    row.innerHTML = `
      <td>${item.category}</td>
      <td class="font-semibold text-slate-900">${item.type}</td>
      <td>${item.variant || '-'}</td>
      <td>${priceDisplay}</td>
      <td>${formatDate(item.date)}</td>
    `;
    priceHistoryBody.appendChild(row);
  });
}

// ===== SIMPAN HARGA =====
priceForm.addEventListener('submit', event => {
  event.preventDefault();
  const category = priceCategory.value;
  const type = priceWasteType.value;
  const variant = variantField.hidden ? '' : priceVariant.value;
  const date = effectiveDate.value;
  if (!category || !type || !date) return;
  if (!variantField.hidden && !variant) return;
  const item = wasteData.find(data =>
    data.status === 'active' &&
    data.category === category &&
    data.type === type &&
    data.variant === variant
  );
  if (!item) return;
  const data = {
    category: category,
    type: type,
    variant: variant,
    hasCondition: item.hasCondition,
    cleanPrice: item.hasCondition ? Number(cleanPrice.value) : null,
    dirtyPrice: item.hasCondition ? Number(dirtyPrice.value) : null,
    price: item.hasCondition ? null : Number(pricePerKg.value),
    date: date
  };
  if (item.hasCondition && (!data.cleanPrice || !data.dirtyPrice)) return;
  if (!item.hasCondition && !data.price) return;
  priceHistory.unshift(data);
  renderPriceHistory();
  priceForm.reset();
  resetTypeDropdown();
});

// ===== INITIAL RENDER =====
renderWasteTable();
renderPriceHistory();