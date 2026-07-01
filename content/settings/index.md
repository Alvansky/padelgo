---
title: "Account Settings"
date: 2026-06-29
draft: false
layout: "settings"
---

<div class="mx-auto max-w-3xl px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
<div class="mb-6 sm:mb-8">
<h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Pengaturan Akun</h1>
<p class="mt-1 sm:mt-2 text-sm sm:text-base text-slate-500 dark:text-slate-400">Kelola nama, foto profil, dan password Anda.</p>
</div>

<div class="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
<div class="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-start">
<div class="flex flex-col items-center">
<div class="relative">
<img id="avatarPreview" src="" alt="Profile" class="h-20 w-20 sm:h-24 sm:w-24 rounded-full border-4 border-slate-100 object-cover shadow-lg dark:border-slate-800">
<label for="avatarInput" class="absolute bottom-0 right-0 flex h-7 w-7 sm:h-8 sm:w-8 cursor-pointer items-center justify-center rounded-full bg-teal-700 transition hover:bg-teal-800">
<svg class="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
</label>
<input id="avatarInput" type="file" accept="image/*" class="hidden" onchange="previewAvatar(event)">
</div>
<p class="mt-2 sm:mt-3 text-center text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">Klik ikon kamera<br>Format: JPG, PNG. Maks 2MB.</p>
</div>

<form id="settingsForm" class="flex-1 space-y-5 sm:space-y-6" onsubmit="handleSaveSettings(event)" novalidate>
<div>
<label for="name" class="mb-1.5 sm:mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">Nama Lengkap</label>
<input id="name" type="text" required autocomplete="name" placeholder="Nama Anda" class="w-full rounded-xl border border-slate-200 bg-white py-2.5 sm:py-3 px-3 sm:px-4 text-sm sm:text-base text-slate-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/15 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
<p id="nameError" class="mt-1 hidden text-xs font-semibold text-red-600 dark:text-red-300" role="alert"></p>
</div>

<div>
<label for="email" class="mb-1.5 sm:mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">Email</label>
<input id="email" type="email" class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 sm:py-3 px-3 sm:px-4 text-sm sm:text-base text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400" disabled>
<p class="mt-1 text-xs text-slate-500 dark:text-slate-400">Email tidak dapat diubah.</p>
</div>

<div class="border-t border-slate-200 pt-5 sm:pt-6 dark:border-slate-800">
<h3 class="mb-3 sm:mb-4 text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">Ubah Password</h3>

<div class="space-y-3 sm:space-y-4">
<div>
<label for="currentPassword" class="mb-1.5 sm:mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">Password Saat Ini</label>
<input id="currentPassword" type="password" placeholder="Kosongkan jika tidak ingin mengganti password" class="w-full rounded-xl border border-slate-200 bg-white py-2.5 sm:py-3 px-3 sm:px-4 text-sm sm:text-base text-slate-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/15 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
</div>

<div>
<label for="newPassword" class="mb-1.5 sm:mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">Password Baru</label>
<input id="newPassword" type="password" placeholder="Minimal 8 karakter" minlength="8" class="w-full rounded-xl border border-slate-200 bg-white py-2.5 sm:py-3 px-3 sm:px-4 text-sm sm:text-base text-slate-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/15 dark:border-slate-700 dark:bg-slate-950 dark:text-white" oninput="renderPasswordStrength(this.value)">
<div id="passwordRules" class="mt-2 sm:mt-3 space-y-2"></div>
</div>
</div>
</div>

<div id="successMessage" class="hidden rounded-xl bg-emerald-50 p-3 sm:p-4 text-sm font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300" role="status"></div>
<div id="errorMessage" class="hidden rounded-xl bg-red-50 p-3 sm:p-4 text-sm font-bold text-red-700 dark:bg-red-950/40 dark:text-red-300" role="alert"></div>

<div class="flex flex-col gap-3 pt-3 sm:pt-4 sm:flex-row">
<button type="submit" class="flex-1 rounded-xl bg-teal-700 py-3 sm:py-3.5 text-sm sm:text-base font-extrabold text-white shadow-lg shadow-teal-700/20 transition hover:bg-teal-800">Simpan Perubahan</button>
<button type="button" onclick="if(confirm('Keluar dari akun?')){PadelGo.Auth.clear();window.location.href='/login/';}" class="flex-1 rounded-xl border-2 border-red-200 py-3 sm:py-3.5 text-sm sm:text-base font-extrabold text-red-600 transition hover:bg-red-50 dark:border-red-900 dark:text-red-300 dark:hover:bg-red-950/40">Logout</button>
</div>
</form>
</div>
</div>
</div>

<script src="/js/shared.js"></script>
<script>
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

function renderPasswordStrength(password) {
  const container = document.getElementById('passwordRules');
  if (!container) return;
  container.innerHTML = '';
  PadelGo.PasswordStrength.renderUI(password, 'passwordRules');
}

function hideMessages() {
  const successEl = document.getElementById('successMessage');
  const errorEl = document.getElementById('errorMessage');
  const nameEl = document.getElementById('nameError');
  if (successEl) { successEl.classList.add('hidden'); successEl.textContent = ''; }
  if (errorEl) { errorEl.classList.add('hidden'); errorEl.textContent = ''; }
  if (nameEl) { nameEl.classList.add('hidden'); nameEl.textContent = ''; }
}

async function uploadAvatarToStorage(supabase, userId, file) {
  const ext = file.name.split('.').pop() || 'jpg';
  const fileName = `avatars/${userId}/avatar-${Date.now()}.${ext}`;

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: true
    });

  if (uploadError) {
    if (uploadError.message && uploadError.message.includes('bucket')) {
      throw new Error('Storage bucket "avatars" belum dibuat. Silakan buat di Supabase Dashboard > Storage.');
    }
    throw new Error(uploadError.message || 'Gagal upload foto');
  }

  const { data: publicUrlData } = supabase.storage
    .from('avatars')
    .getPublicUrl(fileName);

  return publicUrlData?.publicUrl || null;
}

async function handleSaveSettings(e) {
  e.preventDefault();
  hideMessages();
  const submitBtn = document.querySelector('#settingsForm button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Menyimpan...';

  const name = document.getElementById('name').value.trim();
  const currentPassword = document.getElementById('currentPassword').value;
  const newPassword = document.getElementById('newPassword').value;
  const avatarInput = document.getElementById('avatarInput');
  const successEl = document.getElementById('successMessage');
  const errorEl = document.getElementById('errorMessage');
  const nameError = document.getElementById('nameError');

  if (!name || name.length < 2) {
    nameError.textContent = name.length < 1 ? 'Nama tidak boleh kosong.' : 'Nama terlalu pendek. Minimal 2 karakter.';
    nameError.classList.remove('hidden');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Simpan Perubahan';
    return;
  }

  const wantsPasswordChange = !!currentPassword || !!newPassword;
  if (wantsPasswordChange && !currentPassword) {
    errorEl.textContent = 'Masukkan password saat ini untuk mengganti password.';
    errorEl.classList.remove('hidden');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Simpan Perubahan';
    return;
  }
  if (wantsPasswordChange && !newPassword) {
    errorEl.textContent = 'Masukkan password baru.';
    errorEl.classList.remove('hidden');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Simpan Perubahan';
    return;
  }
  if (newPassword) {
    const strength = PadelGo.PasswordStrength.check(newPassword);
    if (!strength.valid) {
      errorEl.textContent = 'Password: ' + strength.missing.join(', ');
      errorEl.classList.remove('hidden');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Simpan Perubahan';
      return;
    }
  }

  try {
    const supabase = await PadelGo.Supabase.init();
    if (!supabase) throw new Error('Supabase belum dikonfigurasi');
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Sesi berakhir. Login kembali.');
    const userId = session.user.id;

    let avatarUrl = null;
    const avatarFile = avatarInput.files[0];
    if (avatarFile) {
      if (avatarFile.size > 2 * 1024 * 1024) {
        errorEl.textContent = 'Ukuran foto maksimal 2MB.';
        errorEl.classList.remove('hidden');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Simpan Perubahan';
        return;
      }
      avatarUrl = await uploadAvatarToStorage(supabase, userId, avatarFile);
    }

    if (currentPassword) {
      const { error: reauthError } = await supabase.auth.signInWithPassword({
        email: session.user.email,
        password: currentPassword
      });
      if (reauthError) throw new Error('Password saat ini salah.');
    }

    const updateData = { id: userId, name, email: session.user.email, updated_at: new Date().toISOString() };
    if (avatarUrl) updateData.avatar_url = avatarUrl;

    const { error: profileError } = await supabase.from('profiles').upsert(updateData, { onConflict: 'id' });
    if (profileError) throw new Error(profileError.message || 'Gagal menyimpan.');

    const metadataUpdate = { name };
    if (avatarUrl) metadataUpdate.avatar_url = avatarUrl;
    const { error: metadataError } = await supabase.auth.updateUser({ data: metadataUpdate });
    if (metadataError) throw new Error(metadataError.message || 'Gagal menyinkronkan profil Auth');

    if (newPassword) {
      const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
      if (updateError) throw new Error(updateError.message || 'Gagal update password');
    }

    const user = PadelGo.Auth.getUser();
    user.name = name;
    user.email = session.user.email;
    if (avatarUrl) user.avatar = avatarUrl;
    PadelGo.Auth.setUser(user);
    if (avatarUrl) {
      PadelGo.Storage.setAvatar(avatarUrl);
    }
    PadelGo.UI.updateNav(user);

    PadelGo.UI.toast('Perubahan berhasil disimpan!', 'success');
    successEl.textContent = 'Perubahan berhasil disimpan.';
    successEl.classList.remove('hidden');
    setTimeout(() => successEl.classList.add('hidden'), 4000);

    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('passwordRules').innerHTML = '';
    avatarInput.value = '';
    submitBtn.disabled = false;
    submitBtn.textContent = 'Simpan Perubahan';
  } catch (err) {
    errorEl.textContent = err.message || 'Gagal menyimpan perubahan.';
    errorEl.classList.remove('hidden');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Simpan Perubahan';
  }
}

async function loadProfile() {
  try {
    const supabase = await PadelGo.Supabase.init();
    if (!supabase) throw new Error('Supabase belum dikonfigurasi');
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { window.location.href = '/login/?next=/settings/'; return; }
    const fallbackName = session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User';
    const { data: profile } = await supabase.from('profiles').select('name, email, avatar_url, role').eq('id', session.user.id).single();
    const name = profile?.name || fallbackName;
    const email = profile?.email || session.user.email || '';
    const avatar = profile?.avatar_url || '';
    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
    document.getElementById('avatarPreview').src = avatar || PadelGo.UI.defaultAvatar();
    const user = { name, email, role: profile?.role || 'user', avatar };
    PadelGo.Auth.setUser(user);
    if (profile?.avatar_url) {
      PadelGo.Storage.setAvatar(profile.avatar_url);
    } else {
      PadelGo.Storage.clearAvatar();
    }
    PadelGo.UI.updateNav(user);
  } catch (err) {
    const errorEl = document.getElementById('errorMessage');
    if (errorEl) {
      errorEl.textContent = err.message || 'Gagal memuat profil.';
      errorEl.classList.remove('hidden');
    }
  }
}

document.addEventListener('DOMContentLoaded', loadProfile);
</script>
