document.addEventListener('DOMContentLoaded', () => {
  // --- DATA DUMMY ---
  const dataUnit = [
    { id: 'rw01', name: 'BSRW 01 - Jambangan Sejahtera' },
    { id: 'rw02', name: 'BSRW 02 - Asri Mandiri' },
    { id: 'rw03', name: 'BSRW 03 - Mawar Bersih' },
    { id: 'rw04', name: 'BSRW 04 - Hijau Lestari' },
    { id: 'rw05', name: 'BSRW 05 - Melati Bersih' }
  ];

  let dataAdmin = [
    { id: 1, nama: 'Pak Budi', username: 'admin_rw01', unit: 'BSRW 01 - Jambangan Sejahtera', status: 'Aktif' },
    { id: 2, nama: 'Bu Siti', username: 'admin_rw02', unit: 'BSRW 02 - Asri Mandiri', status: 'Aktif' },
    { id: 3, nama: 'Pak Bambang', username: 'admin_rw03', unit: 'BSRW 03 - Mawar Bersih', status: 'Aktif' }
  ];

  // --- ELEMENT SELECTOR ---
  const selectUnit = document.getElementById('akunUnit');
  const tableBody = document.getElementById('akunBody');
  const inputNama = document.getElementById('akunNama');
  const inputUsername = document.getElementById('akunUsername');
  const inputPassword = document.getElementById('akunPassword');
  const btnBuatAkun = document.getElementById('btnBuatAkun');

  // --- 1. RENDER DROPDOWN UNIT ---
  function renderUnitOptions() {
    if (!selectUnit) return;
    let html = '<option value="" disabled selected>-- Pilih Unit / RW --</option>';
    dataUnit.forEach(unit => {
      html += `<option value="${unit.name}">${unit.name}</option>`;
    });
    selectUnit.innerHTML = html;
  }

  // --- 2. RENDER TABEL ADMIN ---
  function renderTable() {
    if (!tableBody) return;
    if (dataAdmin.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="5" class="p-4 text-center text-slate-400">Belum ada data admin.</td></tr>`;
      return;
    }

    let html = '';
    dataAdmin.forEach(admin => {
      html += `
        <tr class="border-b border-slate-100 hover:bg-slate-50">
          <td class="sa-td font-medium text-slate-800">${admin.nama}</td>
          <td class="sa-td text-slate-600">${admin.username}</td>
          <td class="sa-td text-slate-600">${admin.unit}</td>
          <td class="sa-td">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
              ${admin.status}
            </span>
          </td>
          <td class="sa-td">
            <button type="button" onclick="bukaModalReset('${admin.nama}')" class="text-xs text-blue-600 hover:text-blue-800 font-semibold">
              Reset Password
            </button>
          </td>
        </tr>
      `;
    });
    tableBody.innerHTML = html;
  }

  // --- 3. VALIDASI INPUT (ENABLE/DISABLE BUTTON) ---
  function checkFormValidity() {
    const isUnitSelected = selectUnit.value !== '';
    const isNamaFilled = inputNama.value.trim() !== '';
    const isUsernameFilled = inputUsername.value.trim() !== '';
    const isPasswordFilled = inputPassword.value.trim() !== '';

    if (isUnitSelected && isNamaFilled && isUsernameFilled && isPasswordFilled) {
      btnBuatAkun.removeAttribute('disabled');
      btnBuatAkun.classList.add('cursor-pointer');
    } else {
      btnBuatAkun.setAttribute('disabled', 'true');
      btnBuatAkun.classList.remove('cursor-pointer');
    }
  }

  [selectUnit, inputNama, inputUsername, inputPassword].forEach(el => {
    if (el) el.addEventListener('input', checkFormValidity);
    if (el) el.addEventListener('change', checkFormValidity);
  });

  // --- 4. TAMBAH AKUN ADMIN BARU ---
  if (btnBuatAkun) {
    btnBuatAkun.addEventListener('click', () => {
      const newAdmin = {
        id: Date.now(),
        nama: inputNama.value.trim(),
        username: inputUsername.value.trim(),
        unit: selectUnit.value,
        status: 'Aktif'
      };

      dataAdmin.push(newAdmin);
      renderTable();

      // Reset Form
      selectUnit.value = '';
      inputNama.value = '';
      inputUsername.value = '';
      inputPassword.value = '';
      checkFormValidity();

      alert('Akun Admin berhasil dibuat!');
    });
  }

  // --- 5. TOGGLE SHOW/HIDE PASSWORD ---
  document.querySelectorAll('[data-toggle-password]').forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-toggle-password');
      const input = document.getElementById(targetId);
      const iconShow = button.querySelector('[data-icon-show]');
      const iconHide = button.querySelector('[data-icon-hide]');

      if (input.type === 'password') {
        input.type = 'text';
        iconShow?.classList.add('hidden');
        iconHide?.classList.remove('hidden');
      } else {
        input.type = 'password';
        iconShow?.classList.remove('hidden');
        iconHide?.classList.add('hidden');
      }
    });
  });

  // --- 6. HANDLER MODAL RESET PASSWORD ---
  const resetModal = document.getElementById('resetModal');
  const resetModalTitle = document.getElementById('resetModalTitle');
  const resetModalDesc = document.getElementById('resetModalDesc');
  const resetPasswordInput = document.getElementById('resetPassword');
  const btnSimpanReset = document.getElementById('btnSimpanReset');

  window.bukaModalReset = function(nama) {
    if (!resetModal) return;
    resetModalTitle.textContent = `Reset Password - ${nama}`;
    resetModalDesc.textContent = `Masukkan password baru untuk akun ${nama}.`;
    resetPasswordInput.value = '';
    btnSimpanReset.setAttribute('disabled', 'true');
    resetModal.classList.remove('hidden');
  };

  document.querySelectorAll('[data-tutup-reset]').forEach(btn => {
    btn.addEventListener('click', () => {
      resetModal.classList.add('hidden');
    });
  });

  if (resetPasswordInput && btnSimpanReset) {
    resetPasswordInput.addEventListener('input', () => {
      if (resetPasswordInput.value.trim().length > 0) {
        btnSimpanReset.removeAttribute('disabled');
      } else {
        btnSimpanReset.setAttribute('disabled', 'true');
      }
    });

    btnSimpanReset.addEventListener('click', () => {
      alert('Password berhasil diperbarui!');
      resetModal.classList.add('hidden');
    });
  }

  // --- INISIALISASI AWAL ---
  renderUnitOptions();
  renderTable();
});