---
title: "Book a Court"
date: 2026-06-29
draft: false
layout: "order"
---

<section class="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-6 sm:py-8">
<div class="mx-auto max-w-6xl px-4 lg:px-8">

<!-- Header -->
<div class="mb-6">
<div class="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 dark:border-teal-800 dark:bg-teal-950 dark:text-teal-300">
<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
Booking Court
</div>
<h1 class="mt-3 text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">Reservasi Lapangan</h1>
<p class="mt-1 text-sm text-slate-600 dark:text-slate-400">Pilih tanggal, lapangan, dan waktu favorit Anda</p>
</div>

<!-- Auth Notice -->
<div id="authNotice" class="mb-6 rounded-xl border border-amber-200 bg-amber-50/50 p-4 dark:border-amber-800 dark:bg-amber-950/30">
<div class="flex items-center gap-3">
<svg class="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
<div>
<p class="text-sm font-semibold text-amber-800 dark:text-amber-200">Login required to book</p>
<p class="mt-0.5 text-xs text-amber-700 dark:text-amber-300">
  Please <a href="/login/?next=/order/" class="font-bold underline">login</a> or <a href="/register/" class="font-bold underline">register</a> first.
</p>
</div>
</div>
</div>

<div class="grid gap-6 lg:grid-cols-3">
<!-- Main Booking Form -->
<div class="lg:col-span-2 space-y-5">

<!-- Step 1: Date & Court -->
<div class="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
<div class="mb-4 flex items-center gap-2">
<span class="flex h-7 w-7 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white">1</span>
<h3 class="text-base font-semibold text-slate-950 dark:text-white">Pilih Tanggal & Lapangan</h3>
</div>

<!-- Date Input -->
<div class="mb-4">
<label for="date" class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Tanggal Main</label>
<input id="date" type="date" required class="w-full rounded-xl border border-slate-200 bg-white py-3 px-4 text-sm text-slate-950 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
</div>

<!-- Court Grid -->
<label class="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Pilih Lapangan</label>
<div class="grid grid-cols-2 gap-3" id="courtGrid">
<div class="col-span-2 rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
Loading...
</div>
</div>
<input type="hidden" id="court" required>
</div>

<!-- Step 2: Time & Duration -->
<div class="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
<div class="mb-4 flex items-center gap-2">
<span class="flex h-7 w-7 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white">2</span>
<h3 class="text-base font-semibold text-slate-950 dark:text-white">Pilih Waktu</h3>
</div>

<!-- Time Selection -->
<div class="mb-4">
<div class="mb-2 flex items-center justify-between">
<label class="text-sm font-medium text-slate-700 dark:text-slate-300">Jam Mulai</label>
<span id="availabilityStatus" class="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400">Pilih tanggal & lapangan</span>
</div>
<div id="timeGrid" class="grid grid-cols-6 gap-2"></div>
<div id="timePlaceholder" class="rounded-xl border border-slate-100 bg-slate-50 p-4 text-center text-sm text-slate-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-500">
Pilih tanggal dan lapangan terlebih dahulu
</div>
<input type="hidden" id="time" required>
</div>

<!-- Duration -->
<div>
<label class="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Durasi</label>
<div class="flex flex-wrap gap-2" id="durationGrid">
<button type="button" data-hours="1" class="duration-btn rounded-lg border border-teal-500 bg-teal-500 px-4 py-2 text-sm font-semibold text-white transition">1 Jam</button>
<button type="button" data-hours="2" class="duration-btn rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-500 hover:bg-teal-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">2 Jam</button>
<button type="button" data-hours="3" class="duration-btn rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-500 hover:bg-teal-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">3 Jam</button>
<button type="button" data-hours="4" class="duration-btn rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-500 hover:bg-teal-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">4 Jam</button>
<button type="button" data-hours="5" class="duration-btn rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-500 hover:bg-teal-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">5 Jam</button>
<button type="button" data-hours="6" class="duration-btn rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-500 hover:bg-teal-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">6 Jam</button>
</div>
<input type="hidden" id="duration" value="1">
</div>
</div>

<!-- Summary & Submit -->
<div class="lg:col-span-1">
<div class="sticky top-20 space-y-4">

<!-- Booking Summary -->
<div id="selectedSummary" class="hidden rounded-2xl border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-emerald-50 p-5 dark:border-teal-800 dark:from-teal-950/50 dark:to-emerald-950/50">
<div class="mb-4 flex items-center gap-2">
<span class="flex h-7 w-7 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white">3</span>
<h3 class="text-base font-semibold text-slate-950 dark:text-white">Ringkasan</h3>
</div>

<div class="space-y-3">
<div class="flex items-center gap-3">
<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 dark:bg-teal-900/50">
<svg class="h-5 w-5 text-teal-600 dark:text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
</div>
<div class="flex-1">
<p class="text-xs text-slate-500 dark:text-slate-400">Lapangan</p>
<p id="summaryCourt" class="font-semibold text-slate-900 dark:text-white">-</p>
</div>
</div>

<div class="flex items-center gap-3">
<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/50">
<svg class="h-5 w-5 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
</div>
<div class="flex-1">
<p class="text-xs text-slate-500 dark:text-slate-400">Tanggal</p>
<p id="summaryDate" class="font-semibold text-slate-900 dark:text-white">-</p>
</div>
</div>

<div class="flex items-center gap-3">
<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/50">
<svg class="h-5 w-5 text-purple-600 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
</div>
<div class="flex-1">
<p class="text-xs text-slate-500 dark:text-slate-400">Waktu</p>
<p id="summaryTime" class="font-semibold text-slate-900 dark:text-white">-</p>
</div>
</div>

<div class="flex items-center gap-3">
<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/50">
<svg class="h-5 w-5 text-amber-600 dark:text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
</div>
<div class="flex-1">
<p class="text-xs text-slate-500 dark:text-slate-400">Total Bayar</p>
<p id="summaryPrice" class="text-lg font-bold text-teal-600 dark:text-teal-400">-</p>
</div>
</div>
</div>
</div>

<!-- Error Message -->
<p id="bookingError" class="hidden rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300" role="alert"></p>

<!-- Success Panel -->
<div id="bookingSuccessPanel" class="hidden">
<div class="rounded-2xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-5 dark:border-emerald-800 dark:from-emerald-950/50 dark:to-teal-950/50">
<div class="mb-4 flex items-center gap-2">
<div class="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500">
<svg class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
</div>
<h3 class="text-lg font-bold text-emerald-800 dark:text-emerald-200">Booking Berhasil!</h3>
</div>

<div class="mb-4 rounded-lg bg-white/80 p-4 dark:bg-slate-900/80">
<p class="mb-1 text-xs text-slate-500 dark:text-slate-400">ID Booking</p>
<p id="successBookingId" class="font-mono text-xl font-bold text-teal-600 dark:text-teal-400"></p>
</div>

<div id="successDetails" class="mb-4 rounded-lg bg-white/80 p-4 dark:bg-slate-900/80 text-sm"></div>

<p class="mb-4 flex items-center gap-2 text-xs font-medium text-amber-700 dark:text-amber-400">
<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
Menunggu approval dari admin
</p>

<div class="flex flex-col gap-2">
<a href="/dashboard/" class="flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-teal-700">
<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
Lihat Booking Saya
</a>
<button type="button" onclick="resetAndContinue()" class="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">
<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
Booking Lagi
</button>
</div>
</div>
</div>

<!-- Submit Button -->
<button type="submit" id="submitBtn" form="orderForm" class="w-full rounded-xl bg-gradient-to-r from-teal-600 to-teal-700 py-4 text-base font-bold text-white shadow-lg transition hover:from-teal-700 hover:to-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed">
<span id="submitText">Konfirmasi Booking</span>
</button>

</div>
</div>
</div>

</div>
</section>

<!-- Hidden Form -->
<form id="orderForm" onsubmit="handleBooking(event)" novalidate></form>

<script src="/js/shared.js"></script>
<script>
const OPERATING_HOURS = { start: 6, end: 23 };
let bookedSlots = {};
let selectedDuration = 1;
let selectedCourt = null;
let selectedTime = null;
let isLoggedIn = false;
let courts = [];

function selectDuration(hours, button) {
  selectedDuration = hours;
  document.getElementById('duration').value = hours;
  document.querySelectorAll('.duration-btn').forEach(btn => {
    btn.className = 'duration-btn rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-500 hover:bg-teal-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300';
  });
  button.className = 'duration-btn rounded-lg border border-teal-500 bg-teal-500 px-4 py-2 text-sm font-semibold text-white transition';
  renderTimeSlots();
  updateSummary();
}

function selectCourt(court, courtData, button) {
  selectedCourt = court;
  document.getElementById('court').value = court;
  document.querySelectorAll('.court-btn').forEach(btn => {
    btn.className = 'court-btn rounded-xl border-2 border-slate-200 bg-white p-4 text-left transition hover:border-teal-500 dark:border-slate-700 dark:bg-slate-950';
  });
  button.className = 'court-btn rounded-xl border-2 border-teal-500 bg-teal-50 p-4 text-left transition dark:bg-teal-900/30';
  loadAvailability();
  updateSummary();
}

async function checkAuth() {
  const supabase = await PadelGo.Supabase.init();
  if (!supabase) return false;
  const { data: { session } } = await supabase.auth.getSession();
  isLoggedIn = !!session;
  const notice = document.getElementById('authNotice');
  if (isLoggedIn) notice.classList.add('hidden');
  else notice.classList.remove('hidden');
  return isLoggedIn;
}

async function loadCourts() {
  try {
    const supabase = await PadelGo.Supabase.init();
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase.from('courts').select('*').eq('available', true).order('name', { ascending: true });
    if (error) throw new Error(error.message);
    courts = data || [];
  } catch {
    courts = [
      { id: 'C1', name: 'Court 1 - Premium Indoor', type: 'Premium Indoor', price_per_hour: 150000 },
      { id: 'C2', name: 'Court 2 - Standard Indoor', type: 'Standard Indoor', price_per_hour: 100000 },
      { id: 'C3', name: 'Court 3 - Premium Glass', type: 'Premium Glass', price_per_hour: 150000 },
      { id: 'C4', name: 'Court 4 - Standard Glass', type: 'Standard Glass', price_per_hour: 100000 },
    ];
  }
  renderCourts();
}

function renderCourts() {
  const grid = document.getElementById('courtGrid');
  if (!courts.length) {
    grid.innerHTML = '<div class="col-span-2 rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-slate-700">Tidak ada lapangan tersedia</div>';
    return;
  }
  grid.innerHTML = courts.map(court => `
    <button type="button" data-court="${court.id}" class="court-btn rounded-xl border-2 border-slate-200 bg-white p-4 text-left transition hover:border-teal-500 dark:border-slate-700 dark:bg-slate-950" onclick="selectCourt('${court.id}', ${JSON.stringify(court).replace(/"/g, '&quot;')}, this)">
      <div class="flex items-center justify-between mb-2">
        <span class="font-semibold text-slate-900 dark:text-white">${court.name}</span>
        <span class="text-xs font-medium text-teal-600 dark:text-teal-400">${court.type}</span>
      </div>
      <p class="text-lg font-bold text-teal-600 dark:text-teal-400">${PadelGo.Format.rupiah(court.price_per_hour)}<span class="text-xs font-normal text-slate-500">/jam</span></p>
    </button>
  `).join('');
}

async function loadAvailability() {
  const status = document.getElementById('availabilityStatus');
  const date = document.getElementById('date').value;
  if (!date || !selectedCourt) {
    status.textContent = 'Pilih tanggal & lapangan';
    status.className = 'rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400';
    return;
  }
  status.textContent = 'Memuat...';
  status.className = 'rounded-full bg-amber-100 px-2.5 py-0.5 text-xs text-amber-600 dark:bg-amber-900/30 dark:text-amber-400';
  try {
    const supabase = await PadelGo.Supabase.init();
    if (!supabase) throw new Error('Not configured');
    const { data, error } = await supabase.rpc('get_booked_slots', { p_court_id: selectedCourt, p_date: date });
    if (error) throw new Error(error.message);
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
    status.className = 'rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400';
  } catch {
    bookedSlots[selectedCourt] = bookedSlots[selectedCourt] || [];
    status.textContent = 'Error';
    status.className = 'rounded-full bg-red-100 px-2.5 py-0.5 text-xs text-red-600 dark:bg-red-900/30 dark:text-red-400';
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
  const placeholder = document.getElementById('timePlaceholder');
  if (!selectedCourt || !document.getElementById('date').value) {
    placeholder.classList.remove('hidden');
    grid.classList.add('hidden');
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
      ? 'rounded-lg bg-slate-100 px-2 py-2 text-xs font-medium text-slate-400 line-through cursor-not-allowed'
      : 'rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs font-medium text-slate-700 transition hover:border-teal-500 hover:bg-teal-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-teal-500';
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
    if (!btn.disabled) {
      btn.className = 'rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs font-medium text-slate-700 transition hover:border-teal-500 hover:bg-teal-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-teal-500';
    }
  });
  button.className = 'rounded-lg border border-teal-500 bg-teal-500 px-2 py-2 text-xs font-medium text-white';
  updateSummary();
}

function updateSummary() {
  const summary = document.getElementById('selectedSummary');
  if (selectedCourt && selectedTime && selectedDuration) {
    const endHour = Number(selectedTime.split(':')[0]) + selectedDuration;
    const court = courts.find(c => c.id === selectedCourt);
    const total = (court?.price_per_hour || 150000) * selectedDuration;
    const dateVal = document.getElementById('date').value;
    const dateDisplay = dateVal ? new Date(dateVal + 'T00:00:00').toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) : '-';
    
    document.getElementById('summaryCourt').textContent = court?.name || '-';
    document.getElementById('summaryDate').textContent = dateDisplay;
    document.getElementById('summaryTime').textContent = selectedTime + ' - ' + String(endHour).padStart(2, '0') + ':00 (' + selectedDuration + ' jam)';
    document.getElementById('summaryPrice').textContent = PadelGo.Format.rupiah(total);
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
  document.querySelectorAll('.duration-btn').forEach((btn, i) => {
    btn.className = i === 0 
      ? 'duration-btn rounded-lg border border-teal-500 bg-teal-500 px-4 py-2 text-sm font-semibold text-white transition'
      : 'duration-btn rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-500 hover:bg-teal-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300';
  });
  document.querySelectorAll('.court-btn').forEach(btn => {
    btn.className = 'court-btn rounded-xl border-2 border-slate-200 bg-white p-4 text-left transition hover:border-teal-500 dark:border-slate-700 dark:bg-slate-950';
  });
  document.getElementById('selectedSummary').classList.add('hidden');
  document.getElementById('bookingError').classList.add('hidden');
  document.getElementById('bookingSuccessPanel').classList.add('hidden');
  document.getElementById('timePlaceholder').classList.remove('hidden');
  document.getElementById('timeGrid').classList.add('hidden');
  document.getElementById('timeGrid').innerHTML = '';
  document.getElementById('submitBtn').classList.remove('hidden');
}

function resetAndContinue() {
  resetFormState();
  document.getElementById('date').focus();
}

function getTodayLocalDate() {
  const now = new Date();
  return now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
}

async function handleBooking(e) {
  e.preventDefault();
  const errorEl = document.getElementById('bookingError');
  const successPanel = document.getElementById('bookingSuccessPanel');
  const submitBtn = document.getElementById('submitBtn');
  const submitText = document.getElementById('submitText');
  errorEl.classList.add('hidden');
  successPanel.classList.add('hidden');

  const supabase = await PadelGo.Supabase.init();
  if (!supabase) { errorEl.textContent = 'System not configured.'; errorEl.classList.remove('hidden'); return; }
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) { errorEl.textContent = 'Please login first.'; errorEl.classList.remove('hidden'); window.location.href = '/login/?next=/order/'; return; }
  if (!selectedCourt || !selectedTime) { errorEl.textContent = 'Pilih lapangan dan waktu.'; errorEl.classList.remove('hidden'); return; }
  if (!document.getElementById('date').value) { errorEl.textContent = 'Pilih tanggal.'; errorEl.classList.remove('hidden'); return; }

  submitBtn.disabled = true;
  submitText.textContent = 'Memproses...';

  try {
    const dateVal = document.getElementById('date').value;
    const startHour = Number(selectedTime.split(':')[0]);
    const endHour = startHour + selectedDuration;
    const endTime = String(endHour).padStart(2, '0') + ':00';
    const court = courts.find(c => c.id === selectedCourt);
    const pricePerHour = court?.price_per_hour || 150000;
    const amount = pricePerHour * selectedDuration;

    const { data: newBooking, error: insertError } = await supabase.from('bookings').insert({
      user_id: session.user.id,
      court_id: selectedCourt,
      court_name: court?.name || selectedCourt,
      date: dateVal,
      start_time: selectedTime,
      end_time: endTime,
      duration_hours: selectedDuration,
      amount: amount,
      status: 'pending',
    }).select('booking_id').single();

    if (insertError) throw new Error(insertError.message || 'Booking failed');

    const displayBookingId = newBooking?.booking_id || 'Pending';
    const dateDisplay = new Date(dateVal + 'T00:00:00').toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    document.getElementById('successBookingId').textContent = displayBookingId;
    document.getElementById('successDetails').innerHTML = `
      <div class="space-y-2">
        <div class="flex justify-between"><span class="text-slate-500">Court:</span><span class="font-medium">${court?.name || selectedCourt}</span></div>
        <div class="flex justify-between"><span class="text-slate-500">Tanggal:</span><span class="font-medium">${dateDisplay}</span></div>
        <div class="flex justify-between"><span class="text-slate-500">Waktu:</span><span class="font-medium">${selectedTime} - ${endTime}</span></div>
        <div class="flex justify-between"><span class="text-slate-500">Durasi:</span><span class="font-medium">${selectedDuration} jam</span></div>
        <div class="flex justify-between border-t pt-2 mt-2"><span class="text-slate-500">Total:</span><span class="font-bold text-teal-600">${PadelGo.Format.rupiah(amount)}</span></div>
      </div>
    `;
    
    successPanel.classList.remove('hidden');
    submitBtn.classList.add('hidden');
    PadelGo.UI.toast('Booking berhasil submitted!');
    loadAvailability();
  } catch (err) {
    errorEl.textContent = err.message || 'Booking failed.';
    errorEl.classList.remove('hidden');
  } finally {
    submitBtn.disabled = false;
    submitText.textContent = 'Konfirmasi Booking';
  }
}

document.querySelectorAll('.duration-btn').forEach((button, i) => {
  button.addEventListener('click', () => selectDuration(Number(button.dataset.hours), button));
});
document.getElementById('date').addEventListener('change', () => { loadAvailability(); updateSummary(); });
document.getElementById('date').setAttribute('min', getTodayLocalDate());
checkAuth();
loadCourts();
</script>
