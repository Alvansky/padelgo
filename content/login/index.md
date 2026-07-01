---
title: "Login"
date: 2026-06-29
draft: false
layout: "login"
---

<section class="min-h-[calc(100vh-3.5rem)] bg-slate-50 dark:bg-slate-950">
<div class="mx-auto grid min-h-[calc(100vh-3.5rem)] max-w-7xl lg:grid-cols-[1fr_1fr]">

<!-- Left Panel - Branding -->
<div class="hidden lg:flex flex-col justify-between bg-gradient-to-br from-teal-900 via-teal-800 to-teal-950 text-white px-8 xl:px-12 py-8 xl:py-10 relative overflow-hidden">
<!-- Decorative Elements -->
<div class="absolute top-0 right-0 w-64 h-64 bg-teal-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
<div class="absolute bottom-0 left-0 w-48 h-48 bg-emerald-600/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

<div class="relative z-10">
<div class="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-teal-100 backdrop-blur-sm">
<span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>LOGIN
</div>

<div class="mt-12 xl:mt-16 max-w-lg">
<h1 class="text-4xl xl:text-5xl font-extrabold leading-tight">Masuk, lanjut booking, dan pantau jadwal main.</h1>
<p class="mt-5 text-base xl:text-lg leading-7 text-teal-100">Akses dashboard personal, cek riwayat booking, dan lanjutkan reservasi lapangan favorit.</p>
</div>
</div>

<div class="relative z-10 grid grid-cols-3 gap-3 xl:gap-4">
<div class="rounded-2xl bg-white/10 backdrop-blur-sm p-3 xl:p-4 text-center border border-white/10">
<p class="text-2xl xl:text-3xl font-extrabold">4</p>
<p class="mt-1 text-xs xl:text-sm text-teal-200">Court Aktif</p>
</div>
<div class="rounded-2xl bg-white/10 backdrop-blur-sm p-3 xl:p-4 text-center border border-white/10">
<p class="text-2xl xl:text-3xl font-extrabold">24</p>
<p class="mt-1 text-xs xl:text-sm text-teal-200">Jam Bermain</p>
</div>
<div class="rounded-2xl bg-white/10 backdrop-blur-sm p-3 xl:p-4 text-center border border-white/10">
<p class="text-2xl xl:text-3xl font-extrabold">24/7</p>
<p class="mt-1 text-xs xl:text-sm text-teal-200">Online Booking</p>
</div>
</div>
</div>

<!-- Right Panel - Form -->
<div class="flex items-center justify-center px-5 py-10 sm:px-8 sm:py-12">
<div class="w-full max-w-md">

<div class="mb-8 text-center lg:text-left">
<div class="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-700 text-white shadow-lg shadow-teal-700/30 mx-auto lg:mx-0">
<svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/></svg>
</div>
<h2 class="text-3xl font-extrabold text-slate-950 dark:text-white">Selamat datang kembali</h2>
<p class="mt-2 text-slate-600 dark:text-slate-400">Gunakan akun Anda untuk masuk ke PadelGo.</p>
</div>

<form id="loginForm" onsubmit="handleLogin(event)" novalidate class="space-y-5">
<!-- Email -->
<div>
<label for="email" class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">Email</label>
<div class="relative">
<span class="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400">
<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/></svg>
</span>
<input id="email" name="email" type="email" required autocomplete="email" placeholder="nama@email.com"
  class="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-slate-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/15 dark:border-slate-700 dark:bg-slate-950 dark:text-white active:scale-[0.98]">
</div>
</div>

<!-- Password -->
<div>
<label for="password" class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">Password</label>
<div class="relative">
<span class="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400">
<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
</span>
<input id="password" name="password" type="password" required autocomplete="current-password" placeholder="Masukkan password"
  class="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-slate-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/15 dark:border-slate-700 dark:bg-slate-950 dark:text-white active:scale-[0.98]">
</div>
</div>

<!-- Messages -->
<div id="loginError" class="hidden rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300" role="alert"></div>
<div id="loginSuccess" class="hidden rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300" role="status"></div>

<!-- Submit -->
<button id="loginSubmit" type="submit" class="w-full rounded-xl bg-teal-700 py-4 text-base font-extrabold text-white shadow-lg shadow-teal-700/25 transition hover:bg-teal-800 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-teal-500/25 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed">
Masuk
</button>
</form>

<p class="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
Belum punya akun? <a href="/register/" class="font-extrabold text-teal-700 hover:text-teal-800 dark:text-teal-300 hover:underline">Daftar sekarang</a>
</p>

<!-- Divider -->
<div class="mt-8 relative">
<div class="absolute inset-0 flex items-center"><div class="w-full border-t border-slate-200 dark:border-slate-800"></div></div>
<div class="relative flex justify-center text-xs uppercase"><span class="bg-slate-50 px-2 text-slate-500 dark:bg-slate-950 dark:text-slate-400">Atau</span></div>
</div>

<!-- Register CTA -->
<div class="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-center dark:border-slate-700 dark:bg-slate-900">
<p class="text-sm text-slate-600 dark:text-slate-400">Ingin booking lapangan?</p>
<a href="/order/" class="mt-2 inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-800 dark:text-teal-300">
<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
Booking tanpa login
</a>
</div>

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
    PadelGo.UI.toast('Login berhasil!');

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
