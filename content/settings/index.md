---
title: "Account Settings"
date: 2026-06-29
draft: false
layout: "settings"
---

<div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
<div class="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
<div class="px-8 py-6 border-b border-gray-100">
<h1 class="text-2xl font-extrabold text-gray-900">Account Settings</h1>
<p class="text-gray-500 mt-1">Update your profile information and preferences</p>
</div>

<div class="p-8">
<form id="settingsForm" class="space-y-8" onsubmit="handleSaveSettings(event)" novalidate>
<div class="flex flex-col md:flex-row items-center md:items-start gap-6">
<div class="relative">
<img id="avatarPreview" src="" alt="Profile" class="w-24 h-24 rounded-full border-4 border-gray-100 shadow-lg object-cover bg-blue-100">
<label for="avatarInput" class="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition shadow-md">
<svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
</label>
<input id="avatarInput" type="file" accept="image/*" class="hidden" onchange="previewAvatar(event)">
</div>
<div class="flex-1 text-center md:text-left">
<h3 class="text-lg font-bold text-gray-900">Profile Photo</h3>
<p class="text-sm text-gray-500 mt-1">Click the camera icon to upload a new photo</p>
</div>
</div>

<div class="grid md:grid-cols-2 gap-6">
<div>
<label for="name" class="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
<input id="name" type="text" class="w-full px-4 py-3 bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition">
</div>
<div>
<label for="email" class="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
<input id="email" type="email" class="w-full px-4 py-3 bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" disabled>
<p class="text-xs text-gray-500 mt-1">Email tidak dapat diubah.</p>
</div>
</div>

<div class="border-t border-gray-100 pt-8">
<h3 class="text-lg font-bold text-gray-900 mb-4">Change Password</h3>
<p class="text-sm text-gray-500 mb-6">Minimal 8 karakter dengan huruf besar, kecil, angka dan simbol.</p>
<div class="grid md:grid-cols-2 gap-6">
<div>
<label for="currentPassword" class="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
<input id="currentPassword" type="password" placeholder="Password saat ini" class="w-full px-4 py-3 bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition">
</div>
<div>
<label for="newPassword" type="password" class="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
<input id="newPassword" type="password" placeholder="Minimal 8 karakter" minlength="8" class="w-full px-4 py-3 bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition" oninput="validatePasswordChange(this.value)">
</div>
</div>
<div id="passwordRules" class="mt-4 grid grid-cols-1 gap-1"></div>
</div>

<div id="successMessage" class="hidden bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm"></div>
<div id="errorMessage" class="hidden bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm" role="alert"></div>

<div class="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
<button type="submit" class="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition">Save Changes</button>
<button type="button" onclick="if(confirm('Keluar dari akun?')){PadelGo.Auth.clear();window.location.href='/login/';}" class="flex-1 text-center border-2 border-red-200 text-red-600 py-3 rounded-xl font-bold hover:bg-red-50 transition">Logout</button>
</div>
</form>
</div>
</div>
</div>

<script src="/js/shared.js"></script>
<script>
async function loadProfile() {
const user = PadelGo.Auth.getUser();
if (!user) { window.location.href = '/login/?next=/settings/'; return; }
document.getElementById('name').value = user.name || '';
document.getElementById('email').value = user.email || '';
const avatar = user.avatar || '';
document.getElementById('avatarPreview').src = avatar || getAvatarDataUrl(user.name || user.email || 'U');
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

function validatePasswordChange(password) {
const container = document.getElementById('passwordRules');
const rules = [
  { test: p => p.length >= 8, label: 'Minimal 8 karakter' },
  { test: p => /[a-z]/.test(p), label: 'Huruf kecil (a-z)' },
  { test: p => /[A-Z]/.test(p), label: 'Huruf besar (A-Z)' },
  { test: p => /\d/.test(p), label: 'Angka (0-9)' },
  { test: p => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`]/.test(p), label: 'Simbol (!@#$%...)' },
];
container.innerHTML = '';
for (const rule of rules) {
  const met = rule.test(password);
  const el = document.createElement('div');
  el.className = `text-xs font-medium ${met ? 'text-emerald-600' : 'text-red-500'}`;
  el.textContent = (met ? '✓ ' : '✗ ') + rule.label;
  container.appendChild(el);
}
}

async function handleSaveSettings(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const currentPassword = document.getElementById('currentPassword').value;
  const newPassword = document.getElementById('newPassword').value;
  const successEl = document.getElementById('successMessage');
  const errorEl = document.getElementById('errorMessage');
  successEl.classList.add('hidden');
  errorEl.classList.add('hidden');

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

    if (newPassword) {
      if (!currentPassword) {
        errorEl.textContent = 'Masukkan password saat ini untuk mengganti password.';
        errorEl.classList.remove('hidden');
        return;
      }
      const check = PadelGo.PasswordStrength.check(newPassword);
      if (!check.valid) {
        errorEl.textContent = 'Password baru tidak memenuhi syarat: ' + check.missing.join(', ');
        errorEl.classList.remove('hidden');
        return;
      }
      const { error: reauthError } = await supabase.auth.signInWithPassword({
        email: session.user.email,
        password: currentPassword
      });
      if (reauthError) throw new Error('Password saat ini salah.');
      const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
      if (updateError) throw new Error(updateError.message || 'Gagal update password');
    }

    const { error: profileError } = await supabase
      .from('profiles')
      .update({ name, updated_at: new Date().toISOString() })
      .eq('id', userId);
    if (profileError) throw new Error(profileError.message || 'Gagal menyimpan');

    const user = PadelGo.Auth.getUser();
    user.name = name;
    PadelGo.Auth.setUser(user);
    successEl.classList.remove('hidden');
    setTimeout(() => successEl.classList.add('hidden'), 3000);

    document.getElementById('name').value = '';
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('passwordRules').innerHTML = '';
  } catch (err) {
    errorEl.textContent = err.message || 'Gagal menyimpan perubahan.';
    errorEl.classList.remove('hidden');
  }
}

document.addEventListener('DOMContentLoaded', loadProfile);
</script>
