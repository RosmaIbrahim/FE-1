document.addEventListener('DOMContentLoaded', () => {
    const formProfil = document.getElementById('formProfil');
    const inputFoto = document.getElementById('inputFoto');
    const imagePreview = document.getElementById('imagePreview');
    const defaultAvatar = document.getElementById('defaultAvatar');
    const btnBatal = document.getElementById('btnBatal');
    const toast = document.getElementById('toastSukses');

    if (!formProfil) return;

    const MAKS_UKURAN_FOTO = 2 * 1024 * 1024;
    const KUNCI_DATA = 'dataProfil';
    const KUNCI_FOTO = 'fotoProfil';
    const KUNCI_STATUS = 'profilLengkap';

    const dataDefaultHTML = Object.fromEntries(new FormData(formProfil).entries());
    let fotoDataUrl = null;
    let toastTimer;

    // ---------- Helper localStorage ----------
    function bacaStorage(kunci) {
        try { return localStorage.getItem(kunci); } catch { return null; }
    }

    function tulisStorage(kunci, nilai) {
        try { localStorage.setItem(kunci, nilai); return true; } catch { return false; }
    }

    function hapusStorage(kunci) {
        try { localStorage.removeItem(kunci); } catch {}
    }

    // ---------- Toast notifikasi ----------
    function tampilkanToast() {
        if (!toast) return;
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(-2.5rem)';
        }, 3000);
    }

    // ---------- Validasi ----------
    // Return pesan error, atau null kalau semua valid
    function validasiProfil(data) {
        if (!data.nama_lengkap) return 'Nama lengkap wajib diisi.';
        if (!/^\d{16}$/.test(data.no_kk || '')) return 'No. KK harus 16 digit angka.';
        if (!/^08\d{8,11}$/.test(data.no_hp || '')) return 'No. telepon harus diawali 08 dan berisi 10–13 digit.';
        if (!/^\d{1,3}$/.test(data.rt || '')) return 'RT wajib diisi (angka, maksimal 3 digit).';
        if (!data.rw) return 'RW wajib dipilih.';
        if (!data.jenis_kelamin) return 'Jenis kelamin wajib dipilih.';
        if (!data.alamat) return 'Alamat wajib diisi.';
        return null;
    }

    // ---------- Foto profil ----------
    function tampilkanFoto(dataUrl) {
        fotoDataUrl = dataUrl;
        if (imagePreview) {
            imagePreview.src = dataUrl;
            imagePreview.classList.remove('hidden');
        }
        if (defaultAvatar) defaultAvatar.classList.add('hidden');
    }

    function resetFoto() {
        fotoDataUrl = null;
        if (inputFoto) inputFoto.value = '';
        if (imagePreview) {
            imagePreview.src = '';
            imagePreview.classList.add('hidden');
        }
        if (defaultAvatar) defaultAvatar.classList.remove('hidden');
    }

    if (inputFoto) {
        inputFoto.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (!file) return;

            if (!file.type.startsWith('image/')) {
                alert('File yang dipilih harus berupa gambar (JPG atau PNG).');
                resetFoto();
                return;
            }

            if (file.size > MAKS_UKURAN_FOTO) {
                alert('Ukuran foto terlalu besar! Maksimal ukuran file adalah 2 MB.');
                resetFoto();
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => tampilkanFoto(e.target.result);
            reader.readAsDataURL(file);
        });
    }

    // ---------- Kolom angka ----------
    const KOLOM_ANGKA = [
        { name: 'no_kk', maks: 16 },
        { name: 'no_hp', maks: 13 },
        { name: 'rt', maks: 3 },
    ];

    KOLOM_ANGKA.forEach(({ name, maks }) => {
        const el = formProfil.elements[name];
        if (!el) return;
        el.maxLength = maks;
        el.inputMode = 'numeric';
        el.addEventListener('input', () => {
            el.value = el.value.replace(/\D/g, '');
        });
    });

    // ---------- Isi & muat data ----------
    function isiKeForm(dataObj) {
        Object.entries(dataObj).forEach(([name, nilai]) => {
            const el = formProfil.elements[name];
            if (!el || el.type === 'file') return;
            el.value = nilai; // berlaku juga untuk RadioNodeList
        });
    }

    function muatDataTersimpan() {
        try {
            const tersimpan = JSON.parse(bacaStorage(KUNCI_DATA) || 'null');
            isiKeForm(tersimpan || dataDefaultHTML);
        } catch {
            isiKeForm(dataDefaultHTML);
        }

        const foto = bacaStorage(KUNCI_FOTO);
        if (foto) {
            tampilkanFoto(foto);
        } else {
            resetFoto();
        }
    }

    muatDataTersimpan();

    // ---------- Tombol Batal ----------
    if (btnBatal) {
        btnBatal.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            formProfil.reset();
            resetFoto();
            muatDataTersimpan();
        });
    }

    // ---------- Submit ----------
    formProfil.addEventListener('submit', (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(formProfil).entries());
        data.nama_lengkap = (data.nama_lengkap || '').trim();
        data.alamat = (data.alamat || '').trim();
        delete data.foto_profil;

        // Validasi dulu, profil baru dianggap lengkap kalau semua valid
        const pesanError = validasiProfil(data);
        if (pesanError) {
            alert(pesanError);
            return;
        }

        const simpanDataSukses = tulisStorage(KUNCI_DATA, JSON.stringify(data));
        let simpanFotoSukses = true;

        if (fotoDataUrl) {
            simpanFotoSukses = tulisStorage(KUNCI_FOTO, fotoDataUrl);
        } else {
            hapusStorage(KUNCI_FOTO);
        }

        if (!simpanDataSukses || !simpanFotoSukses) {
            alert('Gagal menyimpan! Ukuran foto terlalu besar.');
            return;
        }

        tulisStorage(KUNCI_STATUS, 'true');

        // Sembunyikan semua label "profil belum lengkap" (banner + badge sidebar)
        if (window.updateLabelProfil) window.updateLabelProfil();

        tampilkanToast();
    });
});