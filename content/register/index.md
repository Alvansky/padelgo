---
title: "Register"
date: 2026-06-29
draft: false
layout: "register"
---

<section class="min-h-[calc(100vh-3.5rem)] bg-slate-50 dark:bg-slate-950">
<div class="mx-auto grid min-h-[calc(100vh-3.5rem)] max-w-7xl lg:grid-cols-[1fr_1fr]">

<!-- Left Panel - Form -->
<div class="flex items-center justify-center order-2 lg:order-1 px-5 py-10 sm:px-8 sm:py-12">
<div class="w-full max-w-md">

<div class="mb-8 text-center lg:text-left">
<div class="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-600 to-teal-700 text-white shadow-lg shadow-teal-700/30 mx-auto lg:mx-0">
<svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM4 21a8 8 0 0116 0"/></svg>
</div>
<h2 class="text-3xl font-extrabold text-slate-950 dark:text-white">Buat akun PadelGo</h2>
<p class="mt-2 text-slate-600 dark:text-slate-400">Profil otomatis dibuat, jadi akun langsung siap untuk booking.</p>
</div>

<form id="registerForm" onsubmit="handleRegister(event)" novalidate class="space-y-5">

<!-- Name -->
<div>
<label for="name" class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">Nama Lengkap</label>
<div class="relative">
<span class="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400">
<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
</span>
<input id="name" name="name" type="text" required autocomplete="name" placeholder="Nama lengkap Anda"
  class="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-slate-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/15 dark:border-slate-700 dark:bg-slate-950 dark:text-white active:scale-[0.98]">
</div>
</div>

<!-- Email -->
<div>
<label for="email" class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">Email</label>
<div class="relative">
<span class="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400">
<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
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
<input id="password" name="password" type="password" required minlength="8" autocomplete="new-password"
  placeholder="Minimal 8 karakter"
  class="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-slate-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/15 dark:border-slate-700 dark:bg-slate-950 dark:text-white active:scale-[0.98]"
  oninput="updatePasswordStrength(this.value)">
</div>
<div id="passwordStrength" class="mt-3 space-y-1"></div>
</div>

<!-- Messages -->
<div id="registerError" class="hidden rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300" role="alert"></div>
<div id="registerInfo" class="hidden rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300" role="status"></div>

<!-- Submit -->
<button id="registerSubmit" type="submit" class="w-full rounded-xl bg-teal-700 py-4 text-base font-extrabold text-white shadow-lg shadow-teal-700/25 transition hover:bg-teal-800 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-teal-500/25 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed">
Daftar
</button>
</form>

<p class="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
Sudah punya akun? <a href="/login/" class="font-extrabold text-teal-700 hover:text-teal-800 dark:text-teal-300 hover:underline">Masuk</a>
</p>

<!-- Divider -->
<div class="mt-8 relative">
<div class="absolute inset-0 flex items-center"><div class="w-full border-t border-slate-200 dark:border-slate-800"></div></div>
<div class="relative flex justify-center text-xs uppercase"><span class="bg-slate-50 px-2 text-slate-500 dark:bg-slate-950 dark:text-slate-400">atau</span></div>
</div>

<!-- Google Register -->
<button id="googleRegisterBtn" onclick="handleGoogleRegister()" class="mt-6 flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white py-3.5 font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:shadow-md active:scale-[0.98] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed">
<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none">
<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
</svg>
<span>Daftar dengan Google</span>
</button>

<!-- Benefits -->
<div class="mt-8 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
<h4 class="font-bold text-slate-800 dark:text-slate-200 text-sm mb-3">Keuntungan daftar:</h4>
<div class="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400">
<div class="flex items-center gap-2">
<svg class="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
Booking court online
</div>
<div class="flex items-center gap-2">
<svg class="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
Cek jadwal bermain
</div>
<div class="flex items-center gap-2">
<svg class="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
Riwayat booking tersimpan
</div>
<div class="flex items-center gap-2">
<svg class="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
Profil pemain lengkap
</div>
</div>
</div>

</div>
</div>

<!-- Right Panel - Branding -->
<div class="hidden lg:flex flex-col justify-between order-1 lg:order-2 bg-gradient-to-br from-teal-900 via-teal-800 to-teal-950 text-white px-8 xl:px-12 py-8 xl:py-10 relative overflow-hidden">
<!-- Decorative Elements -->
<div class="absolute top-0 left-0 w-64 h-64 bg-teal-600/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
<div class="absolute bottom-0 right-0 w-48 h-48 bg-emerald-600/20 rounded-full blur-3xl translate-y-1/2 translate-x-1/2"></div>

<div class="relative z-10">
<div class="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-teal-100 backdrop-blur-sm">
<span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>REGISTER
</div>

<div class="mt-12 xl:mt-16 max-w-lg">
<h1 class="text-4xl xl:text-5xl font-extrabold leading-tight">Booking lapangan, pantau jadwal, dan simpan riwayat bermain.</h1>
<p class="mt-5 text-base xl:text-lg leading-7 text-teal-100">Bergabung sekarang, lalu mulai booking dengan status yang jelas dan data tersimpan di Supabase.</p>
</div>
</div>

<div class="relative z-10 rounded-2xl border border-white/10 bg-white/10 p-5 xl:p-6 backdrop-blur-sm">
<p class="text-sm font-bold uppercase tracking-wider text-emerald-200">Yang bisa Anda lakukan</p>
<div class="mt-4 grid grid-cols-2 gap-3 text-sm">
<div class="rounded-xl bg-white/10 p-3 text-center font-semibold border border-white/5">🎾 Booking Court</div>
<div class="rounded-xl bg-white/10 p-3 text-center font-semibold border border-white/5">📅 Cek Jadwal</div>
<div class="rounded-xl bg-white/10 p-3 text-center font-semibold border border-white/5">📋 Riwayat Booking</div>
<div class="rounded-xl bg-white/10 p-3 text-center font-semibold border border-white/5">👤 Profil Pemain</div>
</div>
</div>
</div>

</div>
</section>

<script src="/js/shared.js"></script>
<script>
function persistRegisteredUser(name, email, token) {
  if (token) PadelGo.Cookies.set('sess', 'active', 2 * 60 * 60, { secure: location.protocol === 'https:' });
  PadelGo.Storage.clearAvatar();
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
  const submitBtn = document.getElementById('registerSubmit');

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
    submitBtn.disabled = true;
    submitBtn.textContent = 'Membuat akun...';

    const supabase = await PadelGo.Supabase.init();
    if (!supabase) throw new Error('Supabase belum dikonfigurasi');

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } }
    });

    if (error) throw new Error(error.message || 'Pendaftaran gagal.');

    if (data.user) {
      persistRegisteredUser(name, email, data.session?.access_token || '');
      infoEl.classList.remove('hidden');
      infoEl.textContent = data.session ? 'Daftar berhasil. Mengarahkan ke dashboard...' : 'Daftar berhasil. Silakan cek email untuk konfirmasi, lalu login.';
      PadelGo.UI.toast('Daftar berhasil!');

      window.setTimeout(() => {
        window.location.href = data.session ? '/dashboard/' : '/login/?registered=1';
      }, 900);
    }
  } catch (err) {
    errorEl.textContent = err.message || 'Pendaftaran gagal.';
    errorEl.classList.remove('hidden');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Daftar';
  }
}

// Google OAuth Register
async function handleGoogleRegister() {
  const googleBtn = document.getElementById('googleRegisterBtn');
  const errorEl = document.getElementById('registerError');

  errorEl.classList.add('hidden');

  try {
    googleBtn.disabled = true;
    googleBtn.innerHTML = `
      <svg class="h-5 w-5 animate-spin text-slate-500" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span>Mengalihkan ke Google...</span>
    `;

    const supabase = await PadelGo.Supabase.init();
    if (!supabase) throw new Error('Supabase belum dikonfigurasi');

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard/`
      }
    });

    if (error) throw error;

  } catch (err) {
    errorEl.textContent = err.message || 'Pendaftaran dengan Google gagal. Coba lagi.';
    errorEl.classList.remove('hidden');
    googleBtn.disabled = false;
    googleBtn.innerHTML = `
      <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
      <span>Daftar dengan Google</span>
    `;
  }
}
</script>
