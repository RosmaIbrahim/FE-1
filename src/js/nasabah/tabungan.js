document.addEventListener("DOMContentLoaded", () => {
  // 1. Data Dummy Mutasi Tabungan
  const mockMutasi = [
    {
      tanggal: "16 Sep 2026",
      keterangan: "Setoran Botol #SET-003",
      nominal: "+Rp 8.050",
    },
    {
      tanggal: "10 Sep 2026",
      keterangan: "Pencairan Saldo (Tunai)",
      nominal: "-Rp 15.000",
    },
    {
      tanggal: "02 Sep 2026",
      keterangan: "Setoran Botol #SET-002",
      nominal: "+Rp 12.600",
    },
  ];

  // 2. Render Tabel Mutasi
  const renderTableMutasi = (data) => {
    const tableBody = document.querySelector("tbody");
    if (!tableBody) return;

    tableBody.innerHTML = "";

    data.forEach((item, index) => {
      const row = document.createElement("tr");

      // Baris selang-seling warna background
      if (index % 2 !== 0) {
        row.classList.add("bg-slate-50/50");
      }

      // Warna nominal (+ / -)
      const isPlus = item.nominal.startsWith("+");
      const nominalColorClass = isPlus ? "text-emerald-700" : "text-red-600";

      row.innerHTML = `
        <td class="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">${item.tanggal}</td>
        <td class="px-4 py-3 text-slate-700 text-xs">${item.keterangan}</td>
        <td class="px-4 py-3 font-bold text-xs ${nominalColorClass}">${item.nominal}</td>
      `;

      tableBody.appendChild(row);
    });
  };

  // Jalankan fungsi render
  renderTableMutasi(mockMutasi);
});