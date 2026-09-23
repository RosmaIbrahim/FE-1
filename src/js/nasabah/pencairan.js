document.addEventListener("DOMContentLoaded", () => {
  // Key unik untuk localStorage
  const STORAGE_KEY = "PENCAIRAN_SALDO_DATA";

  // Data default jika localStorage masih kosong
  const defaultPencairan = [
    { id: "PCR-003", tanggal: "18 Sep 2026", nominal: "Rp 15.000", status: "Menunggu" },
    { id: "PCR-002", tanggal: "10 Sep 2026", nominal: "Rp 20.000", status: "Belum Diambil" },
    { id: "PCR-001", tanggal: "01 Sep 2026", nominal: "Rp 10.000", status: "Diambil" },
  ];

  // 1. Dapatkan Data dari LocalStorage
  const getPencairanData = () => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (!savedData) {
      // Jika pertama kali dibuka, simpan data default ke localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPencairan));
      return defaultPencairan;
    }
    return JSON.parse(savedData);
  };

  // 2. Simpan Data Baru ke LocalStorage
  const savePencairanData = (newData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  };

  // Helper Formatter Rupiah
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(angka);
  };

  // Helper Formatter Tanggal (2026-09-18 -> 18 Sep 2026)
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  // Helper Badge Status berbasis utility main.css
  const getStatusBadge = (status) => {
    switch (status) {
      case "Menunggu":
        return `<span class="badge-neutral">Menunggu</span>`;
      case "Belum Diambil":
        return `<span class="badge-warning">Belum Diambil</span>`;
      case "Diambil":
        return `<span class="badge-success">Diambil</span>`;
      default:
        return `<span class="badge-neutral">${status}</span>`;
    }
  };

  // 3. Render Table Riwayat
  const renderTable = () => {
    const tableBody = document.getElementById("tablePencairanBody");
    if (!tableBody) return;

    const dataList = getPencairanData();

    if (dataList.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="4" class="px-5 py-6 text-center text-slate-400 text-xs">
            Belum ada riwayat pengajuan pencairan.
          </td>
        </tr>
      `;
      return;
    }

    let htmlRows = dataList
      .map(
        (p, i) => `
      <tr class="${i % 2 !== 0 ? "bg-slate-50/50" : ""}">
        <td class="table-td text-xs font-mono">${p.id}</td>
        <td class="table-td text-xs">${p.tanggal}</td>
        <td class="table-td-strong text-xs">${p.nominal}</td>
        <td class="table-td">
          <div class="flex items-center gap-2">${getStatusBadge(p.status)}</div>
        </td>
      </tr>
    `
      )
      .join("");

    // Baris Flow Hint / Alur Status
    htmlRows += `
      <tr class="border-t border-slate-100 bg-slate-50/30">
        <td colSpan="4" class="px-5 py-2">
          <div class="flow-hint">
            <span class="badge-neutral">Menunggu</span>
            <span>→</span>
            <span class="badge-warning">Belum Diambil</span>
            <span>→</span>
            <span class="badge-success">Diambil</span>
          </div>
        </td>
      </tr>
    `;

    tableBody.innerHTML = htmlRows;
  };

  // 4. Form Submission Handler
  const form = document.getElementById("formPencairan");
  const successAlert = document.getElementById("successAlert");
  const btnResetForm = document.getElementById("btnResetForm");

  if (form && successAlert) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Ambil Input Value
      const dateInput = form.querySelector('input[type="date"]').value;
      const amountInput = form.querySelector('input[type="number"]').value;

      if (!amountInput || amountInput <= 0) return;

      // Ambil data lama
      const currentData = getPencairanData();

      // Buat ID Baru (PCR-004, PCR-005, dst)
      const nextIdNumber = currentData.length + 1;
      const newId = `PCR-${String(nextIdNumber).padStart(3, "0")}`;

      // Buat Object Pengajuan Baru
      const newPencairan = {
        id: newId,
        tanggal: formatDate(dateInput),
        nominal: formatRupiah(amountInput),
        status: "Menunggu",
      };

      // Tambahkan ke paling atas array (paling baru di atas)
      const updatedData = [newPencairan, ...currentData];

      // Simpan ke LocalStorage & Re-render Tabel
      savePencairanData(updatedData);
      renderTable();

      // Tampilkan Alert Berhasil
      form.classList.add("hidden");
      successAlert.classList.remove("hidden");
      successAlert.classList.add("flex");
    });
  }

  // Button reset/ajukan lagi
  if (btnResetForm && form && successAlert) {
    btnResetForm.addEventListener("click", () => {
      form.reset();
      form.classList.remove("hidden");
      successAlert.classList.add("hidden");
      successAlert.classList.remove("flex");
    });
  }

  // Initial Render saat pertama dibuka
  renderTable();
});