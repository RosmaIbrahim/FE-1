const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const authModal = document.getElementById('authModal');
const registerModal = document.getElementById('registerModal');
const authCard = document.getElementById('authCard');
const authHeader = document.getElementById('authHeader');
const authClose = document.getElementById('authClose');
const registerClose = document.getElementById('registerClose');
const formTitle = document.getElementById('formTitle');
const identityLabel = document.getElementById('identityLabel');
const identity = document.getElementById('identity');
const password = document.getElementById('password');
const loginButton = document.getElementById('loginButton');
const loginFooter = document.getElementById('loginFooter');

const roleConfig = {
  nasabah: {
    title: 'Login sebagai Nasabah',
    label: 'NIK',
    placeholder: '16 digit NIK',
    header: 'auth-header--nasabah',
    button: 'auth-button--nasabah',
    card: 'role-nasabah'
  },
  admin: {
    title: 'Login sebagai Admin',
    label: 'Username',
    placeholder: 'admin_rw01',
    header: 'auth-header--admin',
    button: 'auth-button--admin',
    card: 'role-admin'
  },
  kelurahan: {
    title: 'Login sebagai Super Admin',
    label: 'Username',
    placeholder: 'kelurahan_jambangan',
    header: 'auth-header--kelurahan',
    button: 'auth-button--kelurahan',
    card: 'role-kelurahan'
  }
};

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  menuBtn.setAttribute(
    'aria-expanded',
    String(!mobileMenu.classList.contains('hidden'))
  );
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});

function openModal(modal) {
  authModal.classList.remove('show');
  registerModal.classList.remove('show');
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  mobileMenu.classList.add('hidden');
}

function closeModals() {
  if (
    authModal.contains(document.activeElement) ||
    registerModal.contains(document.activeElement)
  ) {
    document.activeElement.blur();
  }
  authModal.classList.remove('show');
  registerModal.classList.remove('show');
  authModal.setAttribute('aria-hidden', 'true');
  registerModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

document.querySelectorAll('.auth-trigger').forEach(trigger => {
  trigger.addEventListener('click', event => {
    event.preventDefault();

    openModal(
      trigger.dataset.auth === 'register'
        ? registerModal
        : authModal
    );
  });
});

authClose.addEventListener('click', closeModals);
registerClose.addEventListener('click', closeModals);

document
  .querySelector('[data-close-auth]')
  .addEventListener('click', closeModals);

document
  .querySelector('[data-close-register]')
  .addEventListener('click', closeModals);

document.addEventListener('click', event => {
  if (event.target.closest('.register-trigger')) {
    openModal(registerModal);
  }

  if (event.target.closest('.login-trigger')) {
    openModal(authModal);
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeModals();
  }
});

document.querySelectorAll('.role-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const role = tab.dataset.role;
    const config = roleConfig[role];

    document.querySelectorAll('.role-tab').forEach(item => {
      item.classList.remove('active');
    });

    tab.classList.add('active');
    authHeader.className = `auth-header ${config.header}`;
    loginButton.className = `auth-button ${config.button}`;
    authCard.className = `auth-card ${config.card}`;
    formTitle.textContent = config.title;
    identityLabel.textContent = config.label;
    identity.placeholder = config.placeholder;
    identity.value = '';
    password.value = '';

    if (role === 'nasabah') {
      identity.inputMode = 'numeric';
      identity.maxLength = 16;
      loginFooter.innerHTML = `
        <p class="mt-4 mb-0 text-center text-[13px] text-slate-500">
          Belum punya akun?
          <button type="button" class="auth-link register-trigger">
            Daftar sekarang
          </button>
        </p>
      `;
    } else {
      identity.inputMode = 'text';
      identity.removeAttribute('maxlength');
      loginFooter.innerHTML = '';
    }
  });
});

document.querySelectorAll('.password-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const target = button.dataset.target
      ? document.getElementById(button.dataset.target)
      : password;
    target.type =
      target.type === 'password'
        ? 'text'
        : 'password';
  });
});

document
  .getElementById('loginForm')
  .addEventListener('submit', event => {
    event.preventDefault();
    const role = document.querySelector('.role-tab.active').dataset.role;
    if (
      role === 'nasabah' &&
      !/^\d{16}$/.test(identity.value.trim())
    ) {
      alert('NIK harus terdiri dari tepat 16 digit angka.');
      identity.focus();
      return;
    }
  });

document
  .getElementById('registerForm')
  .addEventListener('submit', event => {
    event.preventDefault();
    const nik = document.getElementById('registerNik');
    if (!/^\d{16}$/.test(nik.value.trim())) {
      alert('NIK harus terdiri dari tepat 16 digit angka.');
      nik.focus();
      return;
    }
  });
