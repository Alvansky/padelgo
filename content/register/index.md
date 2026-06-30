---
title: "Register"
date: 2026-06-29
draft: false
layout: "register"
---

<section class="min-h-[calc(100vh-3.5rem)] bg-slate-50 dark:bg-slate-950">
<div class="mx-auto grid min-h-[calc(100vh-3.5rem)] max-w-7xl lg:grid-cols-[0.95fr_1.05fr]">
<div class="flex items-center justify-center px-4 py-10 sm:px-8">
<div class="w-full max-w-md">
<div class="mb-8 text-center lg:text-left">
<div class="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 lg:mx-0">
<svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3M12 7a4 4 0 11-8 0 4 4 0 018 0zM4 21a8 8 0 0116 0"/></svg>
</div>
<h2 class="text-3xl font-extrabold text-slate-950 dark:text-white">Buat akun PadelGo</h2>
<p class="mt-2 text-slate-600 dark:text-slate-400">Daftar sebagai user untuk booking lapangan dan melihat dashboard pribadi.</p>
</div>
<form id="registerForm" class="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none" onsubmit="handleRegister(event)" novalidate>
<div>
<label for="name" class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">Nama lengkap</label>
<div class="relative">
<svg class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
<input id="name" name="name" type="text" required autocomplete="name" placeholder="Nama Anda" class="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
</div>
</div>
<div>
<label for="email" class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">Email</label>
<div class="relative">
<svg class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12H8m8 0a4 4 0 10-8 0m8 0a4 4 0 01-8 0m14 0a10 10 0 11-20 0 10 10 0 0120 0z"/></svg>
<input id="email" name="email" type="email" required autocomplete="email" placeholder="nama@email.com" class="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
</div>
</div>
<div>
<label for="password" class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">Password</label>
<div class="relative">
<svg class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
<input id="password" name="password" type="password" required minlength="8" autocomplete="new-password" placeholder="Minimal 8 karakter: huruf besar, kecil, angka & simbol" class="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15 dark:border-slate-700 dark:bg-slate-950 dark:text-white" oninput="updatePasswordStrength(this.value)">
</div>
<div id="passwordStrength" class="mt-3 space-y-1"></div>
</div>
<div id="registerError" class="hidden rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700 dark:bg-red-950/40 dark:text-red-300" role="alert"></div>
<div id="registerInfo" class="hidden rounded-xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300" role="status"></div>
<button type="submit" class="w-full rounded-xl bg-emerald-600 py-3.5 text-base font-extrabold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/25">Daftar</button>
</form>
<p class="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">Sudah punya akun? <a href="/login/" class="font-extrabold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400">Masuk</a></p>
</div>
</div>
<div class="hidden lg:flex flex-col justify-between bg-slate-900 px-12 py-10 text-white">
<div class="ml-auto max-w-xl">
<div class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-emerald-100"><span class="h-2 w-2 rounded-full bg-emerald-400"></span>User account</div>
<h1 class="mt-16 text-5xl font-extrabold leading-tight">Booking lapangan, pantau jadwal, dan simpan riwayat bermain.</h1>
<p class="mt-5 text-lg leading-8 text-slate-300">Bergabung sekarang menjadi bagian dari PadelGo.</p>
</div>
<div class="rounded-2xl border border-white/10 bg-white/10 p-6">
<p class="text-sm font-semibold uppercase tracking-wider text-emerald-200">Yang bisa Anda lakukan</p>
<div class="mt-5 grid grid-cols-2 gap-4 text-sm text-slate-200">
<div class="rounded-xl bg-white/10 p-4">Booking Court</div>
<div class="rounded-xl bg-white/10 p-4">Cek Jadwal</div>
<div class="rounded-xl bg-white/10 p-4">Riwayat Booking</div>
<div class="rounded-xl bg-white/10 p-4">Profil Pemain</div>
</div>
</div>
</div>
</div>
</section>

<script src="/js/shared.js"></script>
<script>
async function persistRegisteredUser(name, email, token) {
  if (!token) throw new Error('missing token');
  PadelGo.Cookies.set('sess', token, 2 * 60 * 60);
  PadelGo.Auth.setUser({ email, name, role: 'user', avatar: '' });
}

function updatePasswordStrength(password) {
  PadelGo.PasswordStrength.renderUI(password, 'passwordStrength');
}

async function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim().toLowerCase();
  const password = document.getElementById('password').value;
  const errorEl = document.getElementById('registerError');
  const infoEl = document.getElementById('registerInfo');
  errorEl.classList.add('hidden');
  infoEl.classList.add('hidden');

  updatePasswordStrength(password);

  if (!name || !email || !password) {
    errorEl.textContent = 'Semua field wajib diisi.';
    errorEl.classList.remove('hidden');
    return;
  }

  const strength = PadelGo.PasswordStrength.check(password);
  if (!strength.valid) {
    errorEl.textContent = 'Password tidak memenuhi syarat: ' + strength.missing.join(', ');
    errorEl.classList.remove('hidden');
    return;
  }

  try {
    const supabase = await PadelGo.Supabase.init();
    if (!supabase) throw new Error('Supabase belum dikonfigurasi');
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name, role: 'user' } }
    });
    if (error) throw new Error(error.message || 'Pendaftaran gagal.');
    if (data.user) {
      persistRegisteredUser(name, email, data.session?.access_token || '');
      infoEl.classList.remove('hidden');
      infoEl.textContent = 'Akun berhasil dibuat. Mengarahkan ke dashboard...';
      window.setTimeout(() => {
        window.location.href = '/dashboard/';
      }, 800);
    }
  } catch (err) {
    errorEl.textContent = err.message || 'Pendaftaran gagal.';
    errorEl.classList.remove('hidden');
  }
}
</script>
