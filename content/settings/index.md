---
title: "Account Settings"
date: 2026-06-29
draft: false
layout: "settings"
---

<div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <div class="mb-8">
    <h1 class="text-3xl font-extrabold text-slate-950 dark:text-white">Account Settings</h1>
    <p class="text-slate-500 dark:text-slate-400 mt-2">Kelola profil, foto, dan keamanan akun Anda.</p>
  </div>

  <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
    <div class="px-6 py-5 border-b border-slate-200 dark:border-slate-800">
      <h2 class="text-xl font-extrabold text-slate-950 dark:text-white">Profil</h2>
      <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Ubah nama dan foto profil Anda.</p>
    </div>
    <div class="p-6">
      <form id="settingsForm" class="space-y-6" onsubmit="handleSaveSettings(event)" novalidate>
        <div class="flex flex-col sm:flex-row items-center gap-6">
          <div class="relative flex-shrink-0">
            <img id="avatarPreview" src="" alt="Profile" class="w-24 h-24 rounded-full border-4 border-slate-100 dark:border-slate-800 shadow-lg object-cover bg-blue-100">
            <label for="avatarInput" class="absolute bottom-0 right-0 w-8 h-8 bg-teal-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-teal-800 transition shadow-md">
              <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            </label>
            <input id="avatarInput" type="file" accept="image/*" class="hidden" onchange="previewAvatar(event)">
          </div>
          <div class="text-center sm:text-left">
            <h3 class="text-lg font-bold text-slate-950 dark:text-white">Foto Profil</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Klik ikon kamera untuk mengganti foto.</p>
          </div>
        </div>

        <div>
          <label for="name" class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">Nama Lengkap</label>
          <div class="relative">
            <svg class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            <input id="name" type="text" required autocomplete="name" placeholder="Nama Anda" class="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-slate-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/15 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
          </div>
        </div>

        <div>
          <label for="email" class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">Email</label>
          <div class="relative">
            <svg class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12H8m8 0a4 4 0 10-8 0m8 0a4 4 0 01-8 0m14 0a10 10 0 11-20 0 10 10 0 0120 0z"/></svg>
            <input id="email" type="email" class="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400" disabled>
          </div>
          <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">Email tidak dapat diubah.</p>
        </div>
      </form>
    </div>
  </div>

  <div class="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
    <div class="px-6 py-5 border-b border-slate-200 dark:border-slate-800">
      <h2 class="text-xl font-extrabold text-slate-950 dark:text-white">Ubah Password</h2>
      <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Minimal 8 karakter dengan huruf besar, kecil, angka dan simbol.</p>
    </div>
    <div class="p-6">
      <form id="passwordForm" class="space-y-6" onsubmit="handlePasswordChange(event)" novalidate>
        <div>
          <label for="currentPassword" class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">Password Saat Ini</label>
          <div class="relative">
            <svg class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
            <input id="currentPassword" type="password" placeholder="Password saat ini" class="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-slate-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/15 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
          </div>
        </div>
        <div>
          <label for="newPassword" class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">Password Baru</label>
          <div class="relative">
            <svg class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
            <input id="newPassword" type="password" placeholder="Minimal 8 karakter" minlength="8" class="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-slate-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/15 dark:border-slate-700 dark:bg-slate-950 dark:text-white" oninput="renderPasswordStrength(this.value)">
          </div>
          <div id="passwordRules" class="mt-3 grid grid-cols-1 gap-1"></div>
        </div>
        <button type="submit" class="w-full rounded-xl bg-teal-700 py-3.5 text-base font-extrabold text-white shadow-lg shadow-teal-700/20 transition hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-500/25">Update Password</button>
      </form>
    </div>
  </div>

  <div id="successMessage" class="hidden mt-6 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm font-bold dark:bg-emerald-950/40 dark:border-emerald-900 dark:text-emerald-300" role="status"></div>
  <div id="errorMessage" class="hidden mt-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-bold dark:bg-red-950/40 dark:border-red-900 dark:text-red-300" role="alert"></div>

  <div class="mt-8 flex flex-col sm:flex-row gap-3">
    <button type="button" onclick="document.getElementById('settingsForm').requestSubmit()" class="flex-1 rounded-xl bg-teal-700 py-3.5 text-base font-extrabold text-white shadow-lg shadow-teal-700/20 transition hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-500/25">Simpan Perubahan Profil</button>
    <button type="button" onclick="if(confirm('Keluar dari akun?')){PadelGo.Auth.clear();window.location.href='/login/';}" class="flex-1 rounded-xl border-2 border-red-200 py-3.5 text-base font-extrabold text-red-600 transition hover:bg-red-50 dark:border-red-900 dark:text-red-300 dark:hover:bg-red-950/40">Logout</button>
  </div>
</div>

<script src="/js/shared.js"></script>
<script>
const RULES = [
  { test: p => p.length >= 8, label: 'Minimal 8 karakter' },
  { test: p => /[a-z]/.test(p), label: 'Huruf kecil (a-z)' },
  { test: p => /[A-Z]/.test(p), label: 'Huruf besar (A-Z)' },
  { test: p => /\d/.test(p), label: 'Angka (0-9)' },
  { test: p => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`]/.test(p), label: 'Simbol (!@#$%...)' },
];

function renderPasswordStrength(password) {
  const container = document.getElementById('passwordRules');
  if (!container) return;
  container.innerHTML = '';
  RULES.forEach(rule => {
    const met = rule.test(password || '');
    const el = document.createElement('div');
    el.className = `text-xs font-medium ${met ? 'text-emerald-600 dark:text-emerald-300' : 'text-red-500 dark:text-red-300'}`;
    el.textContent = (met ? '✓ ' : '✗ ') + rule.label;
    container.appendChild(el);
  });
}

function previewAvatar(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('avatarPreview').src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function hideMessages() {
  const successEl = document.getElementById('successMessage');
  const errorEl = document.getElementById('errorMessage');
  if (successEl) { successEl.classList.add('hidden'); successEl.textContent = ''; }
  if (errorEl) { errorEl.classList.add('hidden'); errorEl.textContent = ''; }
}

async function handleSaveSettings(e) {
  e.preventDefault();
  hideMessages();
  const name = document.getElementById('name').value.trim();
  const avatarInput = document.getElementById('avatarInput');
  const successEl = document.getElementById('successMessage');
  const errorEl = document.getElementById('errorMessage');

  if (!name) {
    errorEl.textContent = 'Nama tidak boleh kosong.';
    errorEl.classList.remove('hidden');
    return;
  }

  try {
    const supabase = await PadelGo.Supabase.init();
    if (!supabase) throw new Error('Supabase belum dikonfigurasi');
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Sesi berakhir. Login kembali.');
    const userId = session.user.id;

    const avatarFile = avatarInput.files[0];
    let avatarUrl = null;
    if (avatarFile) {
      avatarUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function(e) { resolve(e.target.result); };
        reader.onerror = reject;
        reader.readAsDataURL(avatarFile);
      });
    }

    const updateData = { name, updated_at: new Date().toISOString() };
    if (avatarUrl) updateData.avatar_url = avatarUrl;

    const { error: profileError } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('id', userId);
    if (profileError) throw new Error(profileError.message || 'Gagal menyimpan profil');

    const user = PadelGo.Auth.getUser();
    user.name = name;
    if (avatarUrl) user.avatar = avatarUrl;
    PadelGo.Auth.setUser(user);
    PadelGo.UI.updateNav(user);

    successEl.textContent = 'Profil berhasil diperbarui.';
    successEl.classList.remove('hidden');
    setTimeout(() => successEl.classList.add('hidden'), 3000);

    avatarInput.value = '';
  } catch (err) {
    errorEl.textContent = err.message || 'Gagal menyimpan perubahan.';
    errorEl.classList.remove('hidden');
  }
}

async function handlePasswordChange(e) {
  e.preventDefault();
  hideMessages();
  const currentPassword = document.getElementById('currentPassword').value;
  const newPassword = document.getElementById('newPassword').value;
  const successEl = document.getElementById('successMessage');
  const errorEl = document.getElementById('errorMessage');

  if (!currentPassword || !newPassword) {
    errorEl.textContent = 'Semua field password wajib diisi.';
    errorEl.classList.remove('hidden');
    return;
  }

  const strength = PadelGo.PasswordStrength.check(newPassword);
  if (!strength.valid) {
    errorEl.textContent = 'Password baru tidak memenuhi syarat: ' + strength.missing.join(', ');
    errorEl.classList.remove('hidden');
    return;
  }

  try {
    const supabase = await PadelGo.Supabase.init();
    if (!supabase) throw new Error('Supabase belum dikonfigurasi');
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Sesi berakhir. Login kembali.');

    const { error: reauthError } = await supabase.auth.signInWithPassword({
      email: session.user.email,
      password: currentPassword
    });
    if (reauthError) throw new Error('Password saat ini salah.');

    const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
    if (updateError) throw new Error(updateError.message || 'Gagal update password');

    successEl.textContent = 'Password berhasil diubah.';
    successEl.classList.remove('hidden');
    setTimeout(() => successEl.classList.add('hidden'), 3000);

    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('passwordRules').innerHTML = '';
  } catch (err) {
    errorEl.textContent = err.message || 'Gagal mengubah password.';
    errorEl.classList.remove('hidden');
  }
}

async function loadProfile() {
  const user = PadelGo.Auth.getUser();
  if (!user) { window.location.href = '/login/?next=/settings/'; return; }
  document.getElementById('name').value = user.name || '';
  document.getElementById('email').value = user.email || '';
  const avatar = user.avatar || '';
  document.getElementById('avatarPreview').src = avatar || getAvatarDataUrl(user.name || user.email || 'U');

  try {
    const supabase = await PadelGo.Supabase.init();
    if (supabase) {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase.from('profiles').select('avatar_url').eq('id', session.user.id).single();
        if (profile?.avatar_url) {
          const updatedUser = PadelGo.Auth.getUser();
          updatedUser.avatar = profile.avatar_url;
          PadelGo.Auth.setUser(updatedUser);
          document.getElementById('avatarPreview').src = profile.avatar_url;
        }
      }
    }
  } catch {
    // use cookie value if sync fails
  }
}

document.addEventListener('DOMContentLoaded', loadProfile);
</script>
