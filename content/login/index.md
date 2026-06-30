---
title: "Login"
date: 2026-06-29
draft: false
layout: "login"
---

<section class="min-h-[calc(100vh-3.5rem)] bg-slate-50 dark:bg-slate-950">
<div class="mx-auto grid min-h-[calc(100vh-3.5rem)] max-w-7xl lg:grid-cols-[1.05fr_0.95fr]">
<div class="hidden lg:flex flex-col justify-between bg-teal-950 text-white px-12 py-10">
<div>
<div class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-teal-100"><span class="h-2 w-2 rounded-full bg-lime-300"></span>LOGIN</div>
<div class="mt-16 max-w-xl">
<h1 class="text-5xl font-extrabold leading-tight">Masuk, lanjut booking, dan pantau jadwal main.</h1>
<p class="mt-5 text-lg leading-8 text-teal-100">Akses dashboard personal, cek riwayat booking, dan lanjutkan reservasi lapangan favorit.</p>
</div>
</div>
<div class="grid grid-cols-3 gap-4 text-sm">
<div class="rounded-2xl bg-white/10 p-4"><p class="text-2xl font-extrabold">4</p><p class="mt-1 text-slate-300">Court aktif</p></div>
<div class="rounded-2xl bg-white/10 p-4"><p class="text-2xl font-extrabold">24</p><p class="mt-1 text-slate-300">Jam bermain</p></div>
<div class="rounded-2xl bg-white/10 p-4"><p class="text-2xl font-extrabold">24/7</p><p class="mt-1 text-slate-300">Booking online</p></div>
</div>
</div>
<div class="flex items-center justify-center px-4 py-10 sm:px-8">
<div class="w-full max-w-md">
<div class="mb-8 text-center lg:text-left">
<h2 class="text-3xl font-extrabold text-slate-950 dark:text-white">Selamat datang kembali</h2>
<p class="mt-2 text-slate-600 dark:text-slate-400">Gunakan akun Anda untuk masuk ke PadelGo.</p>
</div>
<form id="loginForm" class="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none" onsubmit="handleLogin(event)" novalidate>
<div>
<label for="email" class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">Email</label>
<div class="relative">
<svg class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12H8m8 0a4 4 0 10-8 0m8 0a4 4 0 01-8 0m14 0a10 10 0 11-20 0 10 10 0 0120 0z"/></svg>
<input id="email" name="email" type="email" required autocomplete="email" placeholder="nama@email.com" class="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
</div>
</div>
<div>
<label for="password" class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">Password</label>
<div class="relative">
<svg class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
<input id="password" name="password" type="password" required autocomplete="current-password" placeholder="Minimal 8 karakter" class="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
</div>
</div>
<div id="loginError" class="hidden rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700 dark:bg-red-950/40 dark:text-red-300" role="alert"></div>
<div id="loginSuccess" class="hidden rounded-xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300" role="status"></div>
<button id="loginSubmit" type="submit" class="w-full rounded-xl bg-teal-700 py-3.5 text-base font-extrabold text-white shadow-lg shadow-teal-700/20 transition hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-500/25">Masuk</button>
</form>
<p class="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">Belum punya akun? <a href="/register/" class="font-extrabold text-teal-700 hover:text-teal-800 dark:text-teal-300">Daftar sekarang</a></p>
</div>
</div>
</div>
</section>

<script src="/js/shared.js"></script>
<script>
async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('email').value.trim().toLowerCase();
  const password = document.getElementById('password').value;
  const errorEl = document.getElementById('loginError');
  const successEl = document.getElementById('loginSuccess');
  const submitBtn = document.getElementById('loginSubmit');
  errorEl.classList.add('hidden');
  successEl.classList.add('hidden');
  errorEl.textContent = '';
  successEl.textContent = '';
  if (!email || !password) {
    errorEl.textContent = 'Email dan password wajib diisi.';
    errorEl.classList.remove('hidden');
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errorEl.textContent = 'Format email tidak valid.';
    errorEl.classList.remove('hidden');
    return;
  }
  try {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Memeriksa akun...';
    const supabase = await PadelGo.Supabase.init();
    if (!supabase) throw new Error('Supabase belum dikonfigurasi');
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message || 'Login gagal');
    PadelGo.Auth.setSession(data.session);
    const { data: profileRow } = await supabase.from('profiles').select('name, role').eq('id', data.user.id).single();
    const profile = data.user;
    PadelGo.Auth.setUser({
      email: profile.email || email,
      name: profileRow?.name || profile.user_metadata?.name || profile.email?.split('@')[0] || email.split('@')[0],
      role: profileRow?.role || profile.user_metadata?.role || 'user'
    });
    const params = new URLSearchParams(window.location.search);
    const requestedNext = params.get('next') || '/dashboard/';
    const next = requestedNext.startsWith('/') && !requestedNext.startsWith('//') ? requestedNext : '/dashboard/';
    successEl.textContent = 'Login berhasil. Mengarahkan ke dashboard...';
    successEl.classList.remove('hidden');
    PadelGo.UI.toast('Login berhasil.');
    window.setTimeout(() => { window.location.href = next; }, 700);
  } catch (err) {
    errorEl.textContent = err.message || 'Terjadi kesalahan. Coba lagi.';
    errorEl.classList.remove('hidden');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Masuk';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  if (params.get('registered') === '1') {
    const successEl = document.getElementById('loginSuccess');
    successEl.textContent = 'Pendaftaran berhasil. Silakan login untuk melanjutkan.';
    successEl.classList.remove('hidden');
  }
});
</script>
