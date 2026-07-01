---
title: "Book a Court"
date: 2026-06-29
draft: false
layout: "order"
---

<section class="min-h-[calc(100vh-3.5rem)] bg-slate-50 dark:bg-slate-950">
<div class="mx-auto max-w-7xl px-4 py-8 sm:py-10 sm:px-6 lg:px-8">

<!-- Header -->
<div class="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
<div>
<div class="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300">
<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
Booking Court
</div>
<h1 class="text-3xl font-extrabold text-slate-950 dark:text-white sm:text-4xl">Book Your Court</h1>
<p class="mt-2 max-w-xl text-slate-600 dark:text-slate-400">Pilih tanggal, lapangan, dan waktu bermain Anda.</p>
</div>
<div class="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
<svg class="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
<span class="text-sm font-bold text-slate-700 dark:text-slate-200">Operasional:</span>
<span class="text-sm font-extrabold text-teal-700 dark:text-teal-300">24 Jam</span>
</div>
</div>

<!-- Auth Notice -->
<div id="authNotice" class="mb-6 rounded-xl border border-amber-100 bg-gradient-to-r from-amber-50 to-orange-50 p-4 dark:border-amber-900/60 dark:from-amber-950/40 dark:to-orange-950/40">
<div class="flex items-start gap-3">
<svg class="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
<div>
<p class="text-sm font-semibold text-amber-800 dark:text-amber-200">Login diperlukan untuk booking</p>
<p class="mt-0.5 text-xs text-amber-700 dark:text-amber-300">Silakan <a href="/login/?next=/order/" class="font-extrabold underline">login</a> atau <a href="/register/" class="font-extrabold underline">daftar</a> terlebih dahulu.</p>
</div>
</div>
</div>

<div class="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
<!-- Booking Form -->
<div class="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
<form id="orderForm" class="space-y-6" onsubmit="handleBooking(event)" novalidate>

<!-- Date -->
<div>
<label for="date" class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">
<svg class="mr-1.5 inline h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
Tanggal
</label>
<div class="relative">
<input id="date" type="date" required class="w-full rounded-xl border border-slate-200 bg-white py-3 px-4 text-slate-950 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/15 dark:border-slate-700 dark:bg-slate-950 dark:text-white active:scale-[0.98]">
</div>
</div>

<!-- Duration -->
<div>
<label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">
<svg class="mr-1.5 inline h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
Durasi
</label>
<div class="grid grid-cols-4 gap-2" id="durationGrid">
<button type="button" data-hours="1" class="duration-btn rounded-xl border-2 border-slate-200 bg-white px-3 py-3 text-sm font-extrabold text-slate-600 transition hover:border-teal-500 hover:bg-teal-50 active:scale-95 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-teal-500 dark:hover:bg-teal-500/10">1 Jam</button>
<button type="button" data-hours="2" class="duration-btn rounded-xl border-2 border-slate-200 bg-white px-3 py-3 text-sm font-extrabold text-slate-600 transition hover:border-teal-500 hover:bg-teal-50 active:scale-95 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-teal-500 dark:hover:bg-teal-500/10">2 Jam</button>
<button type="button" data-hours="3" class="duration-btn rounded-xl border-2 border-slate-200 bg-white px-3 py-3 text-sm font-extrabold text-slate-600 transition hover:border-teal-500 hover:bg-teal-50 active:scale-95 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-teal-500 dark:hover:bg-teal-500/10">3 Jam</button>
<button type="button" data-hours="4" class="duration-btn rounded-xl border-2 border-slate-200 bg-white px-3 py-3 text-sm font-extrabold text-slate-600 transition hover:border-teal-500 hover:bg-teal-50 active:scale-95 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-teal-500 dark:hover:bg-teal-500/10">4 Jam</button>
</div>
<input type="hidden" id="duration" value="1">
</div>

<!-- Court Selection -->
<div>
<label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">
<svg class="mr-1.5 inline h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
Lapangan
</label>
<div class="grid grid-cols-2 gap-3" id="courtGrid">
<div class="col-span-2 rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm font-medium text-slate-500 dark:border-slate-700 dark:text-slate-400">
<svg class="mx-auto mb-2 h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
Memuat lapangan...
</div>
</div>
<input type="hidden" id="court" required>
</div>

<!-- Time Selection -->
<div>
<div class="mb-2 flex items-center justify-between gap-3">
<label class="block text-sm font-bold text-slate-700 dark:text-slate-200">
<svg class="mr-1.5 inline h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
Waktu Mulai
</label>
<span id="availabilityStatus" class="text-xs font-semibold text-slate-400">Pilih tanggal & court</span>
</div>
<div class="max-h-48 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950 sm:grid-cols-6 grid grid-cols-4 gap-2">
<div class="col-span-4 py-4 text-center text-xs text-slate-500">Pilih tanggal dan court terlebih dahulu</div>
</div>
<div id="timeGrid" class="hidden max-h-48 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950 sm:grid sm:grid-cols-6 grid-cols-4 gap-2"></div>
<input type="hidden" id="time" required>
</div>

<!-- Summary -->
<div id="selectedSummary" class="hidden rounded-xl border-2 border-teal-200 bg-gradient-to-r from-teal-50 to-emerald-50 p-4 dark:border-teal-500/30 dark:from-teal-950/40 dark:to-emerald-950/40">
<div class="flex items-center gap-3">
<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 dark:bg-teal-900/50">
<svg class="h-5 w-5 text-teal-600 dark:text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
</div>
<div class="flex-1">
<p class="text-sm font-bold text-teal-800 dark:text-teal-200" id="summaryText"></p>
<p class="mt-0.5 text-xs text-teal-600 dark:text-teal-400" id="summaryPrice"></p>
</div>
</div>
</div>

<!-- Messages -->
<p id="bookingError" class="hidden rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300" role="alert"></p>
<p id="bookingSuccess" class="hidden rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300" role="status"></p>

<!-- Submit -->
<button type="submit" id="submitBtn" class="w-full rounded-xl bg-teal-700 py-4 text-base font-extrabold text-white shadow-lg shadow-teal-700/25 transition hover:bg-teal-800 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-teal-500/25 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-lg">
<span id="submitText">Konfirmasi Booking</span>
</button>
</form>
</div>

<!-- Court Map & Info -->
<div class="space-y-5">

<!-- Court Map -->
<div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
<div class="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-800">
<div>
<h2 class="text-lg font-extrabold text-slate-950 dark:text-white">Court Map</h2>
<p class="mt-0.5 text-sm text-slate-500 dark:text-slate-400">Klik untuk memilih lapangan</p>
</div>
<div id="courtCount" class="rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">0 courts</div>
</div>
<div id="courtMap" class="grid gap-3 p-4 sm:grid-cols-2">
<div class="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm font-medium text-slate-500 dark:border-slate-700 dark:text-slate-400">
<svg class="mx-auto mb-2 h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
Memuat...
</div>
</div>
</div>

<!-- Booking Rules -->
<div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
<div class="px-5 py-4 border-b border-slate-100 dark:border-slate-800">
<h3 class="text-base font-extrabold text-slate-950 dark:text-white">Informasi Booking</h3>
</div>
<div class="grid gap-3 p-4 sm:grid-cols-3">
<div class="rounded-xl bg-slate-50 p-4 dark:bg-slate-950/50">
<div class="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
<svg class="h-4 w-4 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
</div>
<p class="font-bold text-slate-900 dark:text-white text-sm">Login Required</p>
<p class="mt-1 text-xs text-slate-500 dark:text-slate-400">Booking butuh login aktif.</p>
</div>
<div class="rounded-xl bg-slate-50 p-4 dark:bg-slate-950/50">
<div class="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
<svg class="h-4 w-4 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
</div>
<p class="font-bold text-slate-900 dark:text-white text-sm">Anti Double-book</p>
<p class="mt-1 text-xs text-slate-500 dark:text-slate-400">Slot bentrok dicegah otomatis.</p>
</div>
<div class="rounded-xl bg-slate-50 p-4 dark:bg-slate-950/50">
<div class="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
<svg class="h-4 w-4 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
</div>
<p class="font-bold text-slate-900 dark:text-white text-sm">Pending Approval</p>
<p class="mt-1 text-xs text-slate-500 dark:text-slate-400">Admin akan approve booking.</p>
</div>
</div>
</div>
</div>
</div>
</div>
</section>

<script src="/js/shared.js"></script>
<script>
const OPERATING_HOURS = { start: 0, end: 24 };
let bookedSlots = {};
let selectedDuration = 1;
let selectedCourt = null;
let selectedTime = null;
let isLoggedIn = false;
let courts = [];

function setActiveButton(buttons, activeButton, activeClasses) {
  buttons.forEach(button => {
    button.classList.remove(...activeClasses, 'text-white');
    button.classList.add('border-slate-200', 'dark:border-slate-700');
  });
  if (!activeButton) return;
  activeButton.classList.remove('border-slate-200', 'dark:border-slate-700');
  activeButton.classList.add(...activeClasses);
}

function selectDuration(hours, button) {
  selectedDuration = hours;
  document.getElementById('duration').value = hours;
  setActiveButton(document.querySelectorAll('.duration-btn'), button, ['border-teal-500', 'bg-teal-600', 'text-white']);
  renderTimeSlots();
  updateSummary();
}

function selectCourt(court, button) {
  selectedCourt = court;
  document.getElementById('court').value = court;
  setActiveButton(document.querySelectorAll('.court-btn'), document.querySelector(`.court-btn[data-court="${court}"]`) || button, ['border-teal-500', 'bg-teal-600', 'text-white']);
  document.querySelectorAll('.court-map-card').forEach(card => {
    card.classList.toggle('ring-2', card.dataset.court === court);
    card.classList.toggle('ring-teal-400', card.dataset.court === court);
  });
  loadAvailability();
  renderTimeSlots();
  updateSummary();
}

async function checkAuth() {
  const supabase = await PadelGo.Supabase.init();
  if (!supabase) return false;
  const { data: { session } } = await supabase.auth.getSession();
  isLoggedIn = !!session;

  const notice = document.getElementById('authNotice');
  if (isLoggedIn) {
    notice.classList.add('hidden');
  } else {
    notice.classList.remove('hidden');
  }
  return isLoggedIn;
}

async function loadCourts() {
  try {
    const supabase = await PadelGo.Supabase.init();
    if (!supabase) throw new Error('Supabase belum dikonfigurasi');
    const { data, error } = await supabase.from('courts').select('*').eq('available', true).order('name', { ascending: true });
    if (error) throw new Error(error.message || 'Gagal memuat lapangan.');
    courts = data || [];
  } catch {
    courts = [
      { id: 'A1', name: 'Court A1', type: 'Premium indoor court', price_per_hour: 150000, image_url: '/images/padel1.jpg' },
      { id: 'A2', name: 'Court A2', type: 'Standard indoor court', price_per_hour: 100000, image_url: '/images/padel2.jpg' },
      { id: 'B1', name: 'Court B1', type: 'Premium glass court', price_per_hour: 150000, image_url: '/images/padel3.jpg' },
      { id: 'B2', name: 'Court B2', type: 'Standard glass court', price_per_hour: 100000, image_url: '/images/padel4.jpg' },
    ];
  }
  renderCourts();
}

function renderCourts() {
  const grid = document.getElementById('courtGrid');
  const map = document.getElementById('courtMap');
  const count = document.getElementById('courtCount');
  count.textContent = courts.length + ' courts';
  if (!courts.length) {
    grid.innerHTML = '<div class="col-span-2 rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm font-medium text-slate-500 dark:border-slate-700 dark:text-slate-400">Belum ada lapangan tersedia.</div>';
    map.innerHTML = '<div class="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm font-medium text-slate-500 dark:border-slate-700 dark:text-slate-400">Belum ada court map.</div>';
    return;
  }
  grid.innerHTML = courts.map(court => `
    <button type="button" data-court="${escapeAttr(court.id)}" class="court-btn rounded-xl border-2 border-slate-200 bg-white p-4 text-left transition hover:border-teal-500 hover:bg-teal-50 active:scale-[0.98] dark:border-slate-700 dark:bg-slate-950 dark:hover:border-teal-500 dark:hover:bg-teal-500/10">
      <span class="block text-base font-extrabold text-slate-950 dark:text-white">${escapeHtml(court.name || court.id)}</span>
      <span class="mt-1 block text-xs text-slate-500 dark:text-slate-400">${escapeHtml(court.type || court.surface || 'Padel court')}</span>
      <span class="mt-2 block text-sm font-extrabold text-teal-600 dark:text-teal-400">${PadelGo.Format.rupiah(court.price_per_hour)} / jam</span>
    </button>
  `).join('');
  map.innerHTML = courts.map(court => `
    <button type="button" data-court="${escapeAttr(court.id)}" class="court-map-card relative h-32 overflow-hidden rounded-2xl border-2 border-slate-200 text-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg active:scale-[0.98] dark:border-slate-800">
      <img src="${escapeAttr(court.image_url || '/images/padel1.jpg')}" alt="${escapeAttr(court.name || court.id)}" class="absolute inset-0 h-full w-full object-cover">
      <span class="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent"></span>
      <span class="absolute inset-0 flex h-full flex-col items-center justify-end p-4 text-left">
        <span class="text-xl font-extrabold drop-shadow-lg">${escapeHtml(court.name || court.id)}</span>
        <span class="text-xs font-medium opacity-90">${escapeHtml(court.type || 'Padel court')}</span>
      </span>
    </button>
  `).join('');
  document.querySelectorAll('.court-btn').forEach(button => {
    button.addEventListener('click', () => selectCourt(button.dataset.court, button));
  });
  document.querySelectorAll('.court-map-card').forEach(button => {
    button.addEventListener('click', () => selectCourt(button.dataset.court, button));
  });
}

async function loadAvailability() {
  const status = document.getElementById('availabilityStatus');
  const date = document.getElementById('date').value;
  if (!date || !selectedCourt) {
    status.textContent = 'Pilih tanggal & court';
    status.className = 'text-xs font-semibold text-slate-400';
    return;
  }
  status.textContent = 'Memeriksa...';
  status.className = 'text-xs font-semibold text-amber-600';
  try {
    const supabase = await PadelGo.Supabase.init();
    if (!supabase) throw new Error('Supabase belum dikonfigurasi');
    const { data, error } = await supabase.rpc('get_booked_slots', {
      p_court_id: selectedCourt,
      p_date: date
    });
    if (error) throw new Error(error.message || 'availability failed');
    bookedSlots[selectedCourt] = [];
    (data || []).forEach(b => {
      const sh = Number(String(b.start_time).split(':')[0]);
      const eh = Number(String(b.end_time).split(':')[0]);
      for (let h = sh; h < eh; h++) {
        const label = String(h).padStart(2, '0') + ':00';
        if (!bookedSlots[selectedCourt].includes(label)) bookedSlots[selectedCourt].push(label);
      }
    });
    status.textContent = 'Tersedia';
    status.className = 'text-xs font-semibold text-emerald-600';
  } catch (err) {
    bookedSlots[selectedCourt] = bookedSlots[selectedCourt] || [];
    status.textContent = 'Dicek database';
    status.className = 'text-xs font-semibold text-emerald-600';
  }
  renderTimeSlots();
}

function isRangeBooked(startTime) {
  const booked = selectedCourt ? (bookedSlots[selectedCourt] || []) : [];
  const startHour = Number(startTime.split(':')[0]);
  for (let offset = 0; offset < selectedDuration; offset++) {
    const label = String(startHour + offset).padStart(2, '0') + ':00';
    if (booked.includes(label)) return true;
  }
  return startHour + selectedDuration > OPERATING_HOURS.end;
}

function renderTimeSlots() {
  const grid = document.getElementById('timeGrid');
  const placeholder = grid.previousElementSibling;
  if (!selectedCourt || !document.getElementById('date').value) {
    placeholder.classList.remove('hidden');
    grid.classList.add('hidden');
    grid.innerHTML = '';
    return;
  }
  placeholder.classList.add('hidden');
  grid.classList.remove('hidden');
  grid.innerHTML = '';
  for (let hour = OPERATING_HOURS.start; hour < OPERATING_HOURS.end; hour++) {
    const timeLabel = String(hour).padStart(2, '0') + ':00';
    const disabled = isRangeBooked(timeLabel);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = timeLabel;
    btn.disabled = disabled;
    btn.onclick = disabled ? null : () => selectTime(timeLabel, btn);
    btn.className = disabled
      ? 'rounded-lg bg-slate-100 px-2 py-2.5 text-xs font-bold text-slate-400 line-through dark:bg-slate-900 dark:text-slate-600 cursor-not-allowed'
      : 'rounded-lg bg-white px-2 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-teal-100 hover:text-teal-800 active:scale-95 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-teal-500/15 dark:hover:text-teal-200 border border-slate-200 dark:border-slate-700';
    grid.appendChild(btn);
  }
  selectedTime = null;
  document.getElementById('time').value = '';
  updateSummary();
}

function selectTime(time, button) {
  selectedTime = time;
  document.getElementById('time').value = time;
  document.querySelectorAll('#timeGrid button').forEach(btn => {
    btn.classList.remove('bg-teal-600', 'text-white', 'ring-2', 'ring-teal-400');
  });
  button.classList.add('bg-teal-600', 'text-white', 'ring-2', 'ring-teal-400');
  updateSummary();
}

function updateSummary() {
  const summary = document.getElementById('selectedSummary');
  const text = document.getElementById('summaryText');
  const price = document.getElementById('summaryPrice');
  if (selectedCourt && selectedTime && selectedDuration) {
    const endHour = Number(selectedTime.split(':')[0]) + selectedDuration;
    const court = courts.find(c => c.id === selectedCourt);
    const total = (court?.price_per_hour || 150000) * selectedDuration;
    text.textContent = `Court ${court?.name || selectedCourt} | ${selectedTime} - ${String(endHour).padStart(2, '0')}:00 (${selectedDuration} jam)`;
    price.textContent = `Total: ${PadelGo.Format.rupiah(total)}`;
    summary.classList.remove('hidden');
  } else {
    summary.classList.add('hidden');
  }
}

function resetFormState() {
  document.getElementById('orderForm').reset();
  selectedCourt = null;
  selectedTime = null;
  selectedDuration = 1;
  document.getElementById('duration').value = 1;
  document.getElementById('court').value = '';
  document.getElementById('time').value = '';
  document.querySelectorAll('.duration-btn').forEach(btn => btn.classList.remove('border-teal-500', 'bg-teal-600', 'text-white'));
  document.querySelector('.duration-btn[data-hours="1"]').classList.add('border-teal-500', 'bg-teal-600', 'text-white');
  document.querySelectorAll('.court-btn').forEach(btn => btn.classList.remove('border-teal-500', 'bg-teal-600', 'text-white'));
  document.querySelectorAll('.court-map-card').forEach(card => card.classList.remove('ring-2', 'ring-teal-400'));
  document.getElementById('selectedSummary').classList.add('hidden');
  document.getElementById('bookingError').classList.add('hidden');
  document.getElementById('bookingSuccess').classList.add('hidden');
  renderTimeSlots();
}

function getTodayLocalDate() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

async function handleBooking(e) {
  e.preventDefault();
  const errorEl = document.getElementById('bookingError');
  const successEl = document.getElementById('bookingSuccess');
  const submitBtn = document.getElementById('submitBtn');
  const submitText = document.getElementById('submitText');
  errorEl.classList.add('hidden');
  successEl.classList.add('hidden');
  errorEl.textContent = '';
  successEl.textContent = '';

  const supabase = await PadelGo.Supabase.init();
  if (!supabase) {
    errorEl.textContent = 'Supabase belum dikonfigurasi.';
    errorEl.classList.remove('hidden');
    return;
  }
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    errorEl.textContent = 'Silakan login terlebih dahulu untuk melakukan booking.';
    errorEl.classList.remove('hidden');
    window.location.href = '/login/?next=/order/';
    return;
  }

  if (!selectedCourt || !selectedTime) {
    errorEl.textContent = 'Pilih waktu dan lapangan terlebih dahulu.';
    errorEl.classList.remove('hidden');
    return;
  }
  if (!document.getElementById('date').value) {
    errorEl.textContent = 'Pilih tanggal booking terlebih dahulu.';
    errorEl.classList.remove('hidden');
    return;
  }

  submitBtn.disabled = true;
  submitText.textContent = 'Memproses...';

  try {
    const dateVal = document.getElementById('date').value;
    const startHour = Number(selectedTime.split(':')[0]);
    const endHour = startHour + selectedDuration;
    const endTime = String(endHour).padStart(2, '0') + ':00';

    const { data: court } = await supabase.from('courts').select('name, price_per_hour').eq('id', selectedCourt).single();
    const pricePerHour = court?.price_per_hour || 150000;
    const amount = pricePerHour * selectedDuration;
    const bookingId = `BK-${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    const { error: insertError } = await supabase.from('bookings').insert({
      id: bookingId,
      user_id: session.user.id,
      court_id: selectedCourt,
      court_name: court?.name || selectedCourt,
      date: dateVal,
      start_time: selectedTime,
      end_time: endTime,
      duration_hours: selectedDuration,
      amount: amount,
      status: 'pending',
    });

    if (insertError) throw new Error(insertError.message || 'Booking gagal');
    const successMessage = `Booking berhasil: Court ${court?.name || selectedCourt}, ${dateVal} pukul ${selectedTime}-${endTime}.`;
    resetFormState();
    successEl.textContent = successMessage;
    successEl.classList.remove('hidden');
    PadelGo.UI.toast('Booking masuk. Menunggu approval admin.');
    loadAvailability();
  } catch (err) {
    errorEl.textContent = err.message || 'Booking gagal. Cek koneksi atau slot mungkin sudah dipesan.';
    errorEl.classList.remove('hidden');
  } finally {
    submitBtn.disabled = false;
    submitText.textContent = 'Konfirmasi Booking';
  }
}

// Init
document.querySelectorAll('.duration-btn').forEach(button => {
  button.addEventListener('click', () => selectDuration(Number(button.dataset.hours), button));
});
document.getElementById('date').addEventListener('change', () => {
  loadAvailability();
  updateSummary();
});
document.getElementById('date').setAttribute('min', getTodayLocalDate());
document.querySelector('.duration-btn[data-hours="1"]').classList.add('border-teal-500', 'bg-teal-600', 'text-white');
checkAuth();
loadCourts();

function escapeHtml(text) {
  const map = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'};
  return String(text || '').replace(/[&<>"']/g, m => map[m]);
}

function escapeAttr(text) {
  return escapeHtml(text).replace(/`/g, '&#096;');
}
</script>
