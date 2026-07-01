---
title: "Home - PadelGo"
date: 2026-06-29
draft: false
---

<section class="relative min-h-[calc(100vh-3.5rem)] overflow-hidden bg-white dark:bg-slate-950">

<!-- Hero Background -->
<div class="slideshow absolute inset-0">
<img src="/images/home-background.webp" alt="Padel court 1" class="slide absolute inset-0 h-full w-full object-cover opacity-100 transition-opacity duration-[2000ms] ease-in-out">
<img src="/images/home-background2.jpg" alt="Padel court 2" class="slide absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-[2000ms] ease-in-out">
</div>
<div class="absolute inset-0 bg-gradient-to-r from-white/40 via-white/20 to-transparent dark:from-slate-950/70 dark:via-slate-950/50 dark:to-transparent"></div>

<!-- Hero Content -->
<div class="relative mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
<div class="grid w-full gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
<div class="max-w-2xl">
<div class="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-200/50 bg-teal-700/90 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm shadow-lg">
<span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
Padel Court Booking Platform
</div>
<h1 class="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl text-slate-950 drop-shadow-lg dark:text-white">Booking lapangan padel lebih cepat dan jelas.</h1>
<p class="mt-6 text-lg leading-relaxed text-slate-700 dark:text-slate-200 drop-shadow-sm">PadelGo membantu pemain memilih jadwal, melihat ketersediaan, dan menyimpan booking Anda dengan mudah.</p>
<div class="mt-8 flex flex-wrap gap-3">
<a href="/order/" class="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-6 py-3.5 font-extrabold text-white shadow-lg shadow-teal-700/30 transition hover:bg-teal-800 hover:shadow-xl active:scale-95">
<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
Book Court
</a>
<a href="/courts/" class="inline-flex items-center gap-2 rounded-xl border border-slate-300/50 bg-white/90 px-6 py-3.5 font-extrabold text-slate-800 backdrop-blur-sm shadow transition hover:bg-white hover:shadow-lg active:scale-95 dark:border-slate-700/50 dark:bg-slate-800/90 dark:text-white">
View Courts
</a>
</div>

<!-- Stats -->
<div class="mt-12 grid max-w-lg grid-cols-3 gap-3">
<div class="rounded-xl border border-white/30 bg-white/80 p-4 backdrop-blur-sm shadow dark:border-slate-700/30 dark:bg-slate-800/80">
<p id="homeCourtCount" class="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">4</p>
<p class="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">Active Courts</p>
</div>
<div class="rounded-xl border border-white/30 bg-white/80 p-4 backdrop-blur-sm shadow dark:border-slate-700/30 dark:bg-slate-800/80">
<p class="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">24</p>
<p class="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">Jam Bermain</p>
</div>
<div class="rounded-xl border border-white/30 bg-white/80 p-4 backdrop-blur-sm shadow dark:border-slate-700/30 dark:bg-slate-800/80">
<p class="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">24/7</p>
<p class="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">Online Booking</p>
</div>
</div>
</div>

<!-- Availability Card -->
<div class="hidden lg:block">
<div class="ml-auto max-w-md rounded-2xl border border-slate-200/50 bg-white/95 p-6 shadow-2xl backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-900/95">
<div class="flex items-center justify-between">
<div>
<p class="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300">Today</p>
<h2 class="mt-1 text-xl font-extrabold text-slate-950 dark:text-white">Court Availability</h2>
</div>
<div class="flex items-center gap-1.5 rounded-xl bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
<span class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
Live
</div>
</div>
<div id="homeAvailabilityList" class="mt-6 space-y-3">
<div class="flex items-center justify-center rounded-xl bg-slate-50 p-6 text-sm font-medium text-slate-500 dark:bg-slate-800/50 dark:text-slate-400">
<svg class="mr-2 h-4 w-4 animate-spin text-teal-600" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
Memuat lapangan...
</div>
</div>
</div>
</div>
</div>
</div>

<!-- Slideshow Dots -->
<div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
<span class="slideshow-dot h-2.5 w-2.5 rounded-full bg-white/90 transition-all duration-300 shadow"></span>
<span class="slideshow-dot h-2.5 w-2.5 rounded-full bg-white/40 transition-all duration-300"></span>
</div>
</section>

<!-- Courts Section -->
<section id="courts" class="bg-slate-50 py-16 sm:py-20 dark:bg-slate-900">
<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
<div class="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
<div>
<div class="mb-2 text-xs font-extrabold uppercase tracking-wider text-teal-700 dark:text-teal-300">Courts</div>
<h2 class="text-2xl font-extrabold text-slate-950 dark:text-white sm:text-3xl lg:text-4xl">Lapangan yang siap dipesan</h2>
<p class="mt-3 max-w-xl text-slate-600 dark:text-slate-400">Setiap court dirancang untuk sesi latihan, friendly match, dan booking rutin dengan harga yang jelas.</p>
</div>
<a href="/order/" class="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-teal-700/25 transition hover:bg-teal-800 hover:shadow-xl active:scale-95 shrink-0">
<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
Book Court
</a>
</div>

<div id="homeCourtsGrid" class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
<div class="col-span-1 sm:col-span-2 lg:col-span-4 flex items-center justify-center rounded-2xl border border-dashed border-slate-300 py-16 text-slate-500 dark:border-slate-700 dark:text-slate-400">
<svg class="mr-3 h-6 w-6 animate-spin text-teal-600" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
Memuat lapangan...
</div>
</div>
</div>
</section>

<!-- Features Section -->
<section class="bg-white py-16 sm:py-20 dark:bg-slate-950">
<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
<div class="mx-auto mb-12 max-w-3xl text-center">
<div class="mb-2 text-xs font-extrabold uppercase tracking-wider text-teal-700 dark:text-teal-300">Features</div>
<h2 class="text-2xl font-extrabold text-slate-950 dark:text-white sm:text-3xl lg:text-4xl">A cleaner booking flow for serious players</h2>
<p class="mt-4 text-lg text-slate-600 dark:text-slate-400">Tampilan dibuat sederhana, konsisten, dan siap menjadi bagian dari PadelGo.</p>
</div>

<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
<!-- Feature 1 -->
<div class="rounded-2xl border border-slate-200 bg-slate-50 p-7 shadow-sm transition hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
<div class="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700 shadow-sm dark:bg-blue-900/30 dark:text-blue-300">
<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
</div>
<h3 class="text-lg font-extrabold text-slate-950 dark:text-white">Fast Booking</h3>
<p class="mt-3 leading-relaxed text-slate-600 dark:text-slate-400">Pilih tanggal, court, durasi, lalu konfirmasi dengan status yang jelas.</p>
</div>

<!-- Feature 2 -->
<div class="rounded-2xl border border-slate-200 bg-slate-50 p-7 shadow-sm transition hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
<div class="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 shadow-sm dark:bg-emerald-900/30 dark:text-emerald-300">
<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
</div>
<h3 class="text-lg font-extrabold text-slate-950 dark:text-white">Role-Based Access</h3>
<p class="mt-3 leading-relaxed text-slate-600 dark:text-slate-400">Dashboard user dan admin yang akurat dengan kontrol penuh.</p>
</div>

<!-- Feature 3 -->
<div class="rounded-2xl border border-slate-200 bg-slate-50 p-7 shadow-sm transition hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
<div class="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-700 shadow-sm dark:bg-purple-900/30 dark:text-purple-300">
<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
</div>
<h3 class="text-lg font-extrabold text-slate-950 dark:text-white">Dark Mode</h3>
<p class="mt-3 leading-relaxed text-slate-600 dark:text-slate-400">Komponen utama kini punya pasangan warna terang dan gelap yang konsisten.</p>
</div>
</div>
</div>
</section>

<!-- CTA Section -->
<section class="bg-white py-16 sm:py-20 dark:bg-slate-950">
<div class="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
<div class="overflow-hidden rounded-3xl bg-gradient-to-br from-teal-800 via-teal-700 to-teal-900 p-8 text-white shadow-2xl sm:p-12">
<h2 class="text-2xl font-extrabold sm:text-3xl lg:text-4xl">Ready to hit the court?</h2>
<p class="mx-auto mt-4 max-w-xl text-lg text-teal-100">Mulai dari booking court. Fitur login yang privacy kini anda siap bermain.</p>
<div class="mt-8 flex flex-wrap justify-center gap-3">
<a href="/order/" class="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-extrabold text-teal-800 shadow-lg transition hover:bg-teal-50 hover:shadow-xl active:scale-95">
<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
Book a Court
</a>
<a href="/register/" class="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-6 py-3 font-extrabold text-white backdrop-blur-sm transition hover:bg-white/20 active:scale-95">
Create Account
</a>
</div>
</div>
</div>
</section>

<!-- Footer -->
<footer class="bg-slate-50 py-12 dark:bg-slate-900">
<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
<div class="lg:col-span-2">
<div class="mb-4 flex items-center gap-2">
<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-700 text-white shadow-lg">
<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16c3.5-4.5 6.5-7.5 10-9m-8 12 8-8m-8 0 8 8"/></svg>
</div>
<span class="text-xl font-extrabold text-slate-950 dark:text-white">PadelGo</span>
</div>
<p class="max-w-sm text-slate-600 dark:text-slate-400">A clean court booking experience for players and venue operators.</p>
</div>

<div>
<h4 class="mb-4 font-extrabold text-slate-950 dark:text-white">Navigation</h4>
<ul class="space-y-2.5 text-slate-600 dark:text-slate-400">
<li><a href="/" class="transition hover:text-teal-700 dark:hover:text-teal-300">Home</a></li>
<li><a href="/courts/" class="transition hover:text-teal-700 dark:hover:text-teal-300">Courts</a></li>
<li><a href="/order/" class="transition hover:text-teal-700 dark:hover:text-teal-300">Book Court</a></li>
<li><a href="/coaches/" class="transition hover:text-teal-700 dark:hover:text-teal-300">Coaches</a></li>
<li><a href="/login/" class="transition hover:text-teal-700 dark:hover:text-teal-300">Login</a></li>
</ul>
</div>

<div>
<h4 class="mb-4 font-extrabold text-slate-950 dark:text-white">Contact</h4>
<ul class="space-y-2.5 text-slate-600 dark:text-slate-400">
<li class="flex items-center gap-2">
<svg class="h-4 w-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
Jakarta, Indonesia
</li>
<li class="flex items-center gap-2">
<svg class="h-4 w-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
info@padelgo.id
</li>
<li class="flex items-center gap-2">
<svg class="h-4 w-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
+62 812 3456 7890
</li>
</ul>
</div>
</div>

<div class="mt-10 border-t border-slate-200 pt-6 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-500">
© 2026 PadelGo. Created by Alvarabi Khawarizni
</div>
</div>
</footer>

<script>
// Slideshow
(function() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.slideshow-dot');
  if (slides.length < 2) return;

  let current = 0;
  const interval = 5000;

  function show(index) {
    slides.forEach((s, i) => {
      s.classList.toggle('opacity-100', i === index);
      s.classList.toggle('opacity-0', i !== index);
    });
    dots.forEach((d, i) => {
      d.classList.toggle('bg-white/90', i === index);
      d.classList.toggle('bg-white/40', i !== index);
      d.classList.toggle('scale-125', i === index);
      d.classList.toggle('scale-100', i !== index);
    });
    current = index;
  }

  function next() {
    show((current + 1) % slides.length);
  }

  setInterval(next, interval);
  dots.forEach((dot, i) => dot.addEventListener('click', () => show(i)));
})();

// Load courts data
(async function loadHomeData() {
  const fallback = [
    { id: 'A1', name: 'Court A1', type: 'Premium indoor court', surface: 'Artificial Grass', price_per_hour: 150000, image_url: '/images/padel1.jpg' },
    { id: 'A2', name: 'Court A2', type: 'Standard indoor court', surface: 'Artificial Grass', price_per_hour: 100000, image_url: '/images/padel2.jpg' },
    { id: 'B1', name: 'Court B1', type: 'Premium glass court', surface: 'Panoramic Glass', price_per_hour: 150000, image_url: '/images/padel3.jpg' },
    { id: 'B2', name: 'Court B2', type: 'Standard glass court', surface: 'Panoramic Glass', price_per_hour: 100000, image_url: '/images/padel4.jpg' },
  ];

  let courts = fallback;
  try {
    const supabase = await PadelGo.Supabase.init();
    if (supabase) {
      const { data, error } = await supabase.from('courts').select('*').eq('available', true).order('name', { ascending: true });
      if (!error && data?.length) courts = data;
    }
  } catch {}

  // Update stats
  document.getElementById('homeCourtCount').textContent = courts.length;

  // Update availability list
  document.getElementById('homeAvailabilityList').innerHTML = courts.slice(0, 5).map(court => `
    <div class="flex items-center justify-between rounded-xl border border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-800/50">
      <div class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 text-white font-extrabold text-sm shadow">${escapeHtml(court.id)}</div>
        <div>
          <p class="font-bold text-slate-900 dark:text-white">${escapeHtml(court.name || court.id)}</p>
          <p class="text-xs text-slate-500 dark:text-slate-400">${escapeHtml(court.surface || court.type || 'Available')}</p>
        </div>
      </div>
      <div class="text-right">
        <p class="font-extrabold text-teal-700 dark:text-teal-300">${PadelGo.Format.rupiah(court.price_per_hour)}</p>
        <p class="text-xs text-slate-500 dark:text-slate-400">/jam</p>
      </div>
    </div>
  `).join('');

  // Update courts grid
  document.getElementById('homeCourtsGrid').innerHTML = courts.map(court => `
    <article class="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <div class="relative h-44 overflow-hidden">
        <img src="${escapeAttr(court.image_url || '/images/padel1.jpg')}" alt="${escapeAttr(court.name || court.id)}" class="h-full w-full object-cover transition group-hover:scale-105">
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
        <div class="absolute bottom-3 left-3">
          <span class="rounded-full bg-white/90 px-2.5 py-1 text-xs font-extrabold text-slate-900 backdrop-blur-sm">${escapeHtml(court.name || court.id)}</span>
        </div>
      </div>
      <div class="p-4">
        <p class="text-sm text-slate-500 dark:text-slate-400">${escapeHtml(court.type || court.surface || 'Padel court')}</p>
        <div class="mt-3 flex items-end justify-between">
          <div>
            <span class="text-xl font-extrabold text-teal-700 dark:text-teal-300">${PadelGo.Format.rupiah(court.price_per_hour)}</span>
            <span class="text-sm font-medium text-slate-500 dark:text-slate-400"> /jam</span>
          </div>
          <a href="/order/" class="rounded-lg bg-teal-700 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-teal-800 active:scale-95">Book</a>
        </div>
      </div>
    </article>
  `).join('');
})();

function escapeHtml(text) {
  const map = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'};
  return String(text || '').replace(/[&<>"']/g, m => map[m]);
}

function escapeAttr(text) {
  return escapeHtml(text).replace(/`/g, '&#096;');
}
</script>
