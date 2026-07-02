---
title: "Book a Court"
date: 2026-06-29
draft: false
layout: "order"
---

<section class="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950">
<div class="mx-auto max-w-7xl px-4 py-8 sm:py-12 lg:px-8">

<!-- Header -->
<div class="mb-8">
<div class="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-xs font-semibold text-teal-700 dark:border-teal-800 dark:bg-teal-950 dark:text-teal-300">
<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
Book a Court
</div>
<h1 class="mt-4 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">Reserve Your Court</h1>
<p class="mt-2 max-w-xl text-slate-600 dark:text-slate-400">Select your preferred date, court, and time slot.</p>
</div>

<!-- Auth Notice -->
<div id="authNotice" class="mb-6 rounded-xl border border-amber-200 bg-amber-50/50 p-4 dark:border-amber-800 dark:bg-amber-950/30">
<div class="flex items-center gap-3">
<svg class="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
<div>
<p class="text-sm font-semibold text-amber-800 dark:text-amber-200">Login required to book</p>
<p class="mt-0.5 text-xs text-amber-700 dark:text-amber-300">Please <a href="/login/?next=/order/" class="font-bold underline">login</a> or <a href="/register/" class="font-bold underline">register</a> first.</p>
</div>
</div>
</div>

<div class="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
<!-- Booking Form -->
<div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
<form id="orderForm" class="space-y-6" onsubmit="handleBooking(event)" novalidate>

<!-- Date -->
<div>
<label for="date" class="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Date</label>
<input id="date" type="date" required class="w-full rounded-xl border border-slate-200 bg-white py-3.5 px-4 text-slate-950 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-tealal-500 dark:focus:ring-teal-500/20">
</div>

<!-- Court Selection -->
<div>
<label class="mb-3 block text-sm font-semibold text-slate-700 dark:text-slate-200">Court</label>
<div class="grid grid-cols-2 gap-3" id="courtGrid">
<div class="col-span-2 rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
Loading courts...
</div>
</div>
<input type="hidden" id="court" required>
</div>

<!-- Time Selection -->
<div>
<div class="mb-3 flex items-center justify-between">
<label class="text-sm font-semibold text-slate-700 dark:text-slate-200">Start Time</label>
<span id="availabilityStatus" class="text-xs text-slate-500">Select date and court</span>
</div>
<div id="timeGrid" class="grid grid-cols-4 gap-2 sm:grid-cols-6"></div>
<div id="timePlaceholder" class="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
Select date and court to see available times
</div>
<input type="hidden" id="time" required>
</div>

<!-- Duration -->
<div>
<label class="mb-3 block text-sm font-semibold text-slate-700 dark:text-slate-200">Duration</label>
<div class="flex flex-wrap gap-2" id="durationGrid">
<button type="button" data-hours="1" class="duration-btn rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-teal-500 hover:bg-teal-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-teal-500 dark:hover:bg-teal-500/10">1 hour</button>
<button type="button" data-hours="2" class="duration-btn rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-teal-500 hover:bg-teal-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-teal-500 dark:hover:bg-teal-500/10">2 hours</button>
<button type="button" data-hours="3" class="duration-btn rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-teal-500 hover:bg-teal-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-teal-500 dark:hover:bg-teal-500/10">3 hours</button>
<button type="button" data-hours="4" class="duration-btn rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-teal-500 hover:bg-teal-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-teal-500 dark:hover:bg-teal-500/10">4 hours</button>
<button type="button" data-hours="5" class="duration-btn rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-teal-500 hover:bg-teal-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-teal-500 dark:hover:bg-teal-500/10">5 hours</button>
<button type="button" data-hours="6" class="duration-btn rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-teal-500 hover:bg-teal-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-teal-500 dark:hover:bg-teal-500/10">6 hours</button>
</div>
<input type="hidden" id="duration" value="1">
</div>

<!-- Summary -->
<div id="selectedSummary" class="hidden rounded-xl border border-teal-200 bg-tealal-50/50 p-4 dark:border-teal-800 dark:bg-teal-950/30">
<div class="flex items-center gap-4">
<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 dark:bg-teal-900/50">
<svg class="h-5 w-5 text-teal-600 dark:text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
</div>
<div>
<p class="font-semibold text-slate-900 dark:text-white" id="summaryText"></p>
<p class="mt-1 text-sm font-bold text-teal-600 dark:text-teal-400" id="summaryPrice"></p>
</div>
</div>
</div>

<!-- Messages -->
<p id="bookingError" class="hidden rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300" role="alert"></p>
<p id="bookingSuccess" class="hidden rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm font-medium text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300" role="status"></p>

<!-- Submit -->
<button type="submit" id="submitBtn" class="w-full rounded-xl bg-teal-600 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed">
<span id="submitText">Confirm Booking</span>
</button>
</form>
</div>

<!-- Court Map -->
<div class="space-y-6">
<div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
<div class="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800">
<div>
<h2 class="text-base font-semibold text-slate-950 dark:text-white">Court Map</h2>
<p class="mt-0.5 text-sm text-slate-500 dark:text-slate-400">Tap to select</p>
</div>
<div id="courtCount" class="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">0 courts</div>
</div>
<div id="courtMap" class="grid gap-3 p-4 sm:grid-cols-2"></div>
</div>

<!-- Info Cards -->
<div class="grid gap-4 sm:grid-cols-3">
<div class="rounded-xl bg-slate-50 p-4 dark:bg-slate-900">
<div class="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
<svg class="h-4 w-4 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
</div>
<p class="text-sm font-semibold text-slate-900 dark:text-white">Login Required</p>
<p class="mt-1 text-xs text-slate-500 dark:text-slate-400">Must be logged in to book</p>
</div>
<div class="rounded-xl bg-slate-50 p-4 dark:bg-slate-900">
<div class="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
<svg class="h-4 w-4 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
</div>
<p class="text-sm font-semibold text-slate-900 dark:text-white">No Double-book</p>
<p class="mt-1 text-xs text-slate-500 dark:text-slate-400">Conflicting slots blocked</p>
</div>
<div class="rounded-xl bg-slate-50 p-4 dark:bg-slate-900">
<div class="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
<svg class="h-4 w-4 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
</div>
<p class="text-sm font-semibold text-slate-900 dark:text-white">24/7 Booking</p>
<p class="mt-1 text-xs text-slate-500 dark:text-slate-400">Book any time slot</p>
</div>
</div>
</div>
</div>
</div>
</section>

<script src="/js/shared.js"></script>
<script>
const OPERATING_HOURS = { start: 6, end: 23 };
let bookedSlots = {};
let selectedDuration = 1;
let selectedCourt = null;
let selectedTime = null;
let isLoggedIn = false;
let courts = [];

function setActiveButton(buttons, activeButton, activeClasses) {
  buttons.forEach(button => {
    button.classList.remove(...activeClasses);
    button.classList.add('border-slate-200', 'dark:border-slate-700', 'bg-white', 'dark:bg-slate-950', 'text-slate-700', 'dark:text-slate-300');
  });
  if (!activeButton) return;
  activeButton.classList.remove('border-slate-200', 'dark:border-slate-700', 'bg-white', 'dark:bg-slate-950', 'text-slate-700', 'dark:text-slate-300');
  activeButton.classList.add(...activeClasses);
}

function selectDuration(hours, button) {
  selectedDuration = hours;
  document.getElementById('duration').value = hours;
  setActiveButton(document.querySelectorAll('.duration-btn'), button, ['border-teal-500', 'bg-teal-500', 'text-white']);
  renderTimeSlots();
  updateSummary();
}

function selectCourt(court, button) {
  selectedCourt = court;
  document.getElementById('court').value = court;
  document.querySelectorAll('.court-btn').forEach(btn => {
    btn.classList.remove('border-teal-500', 'bg-teal-500', 'text-white');
    btn.classList.add('border-slate-200', 'bg-white', 'text-slate-700');
  });
  if (button) {
    button.classList.remove('border-slate-200', 'bg-white', 'text-slate-700');
    button.classList.add('border-teal-500', 'bg-teal-500', 'text-white');
  }
  document.querySelectorAll('.court-map-card').forEach(card => {
    card.classList.toggle('ring-2', card.dataset.court === court);
    card.classList.toggle('ring-teal-500', card.dataset.court === court);
  });
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
      { id: 'C1', name: 'Court 1 - Premium Indoor', type: 'Premium indoor', price_per_hour: 150000, image_url: '/images/padel1.jpg' },
      { id: 'C2', name: 'Court 2 - Standard Indoor', type: 'Standard indoor', price_per_hour: 100000, image_url: '/images/padel2.jpg' },
      { id: 'C3', name: 'Court 3 - Premium Glass', type: 'Premium glass', price_per_hour: 150000, image_url: '/images/padel3.jpg' },
      { id: 'C4', name: 'Court 4 - Standard Glass', type: 'Standard glass', price_per_hour: 100000, image_url: '/images/padel4.jpg' },
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
    grid.innerHTML = '<div class="col-span-2 rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-slate-700">No courts available.</div>';
    map.innerHTML = '<div class="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-slate-700">No courts available.</div>';
    return;
  }
  grid.innerHTML = courts.map(court => `
    <button type="button" data-court="${escapeAttr(court.id)}" class="court-btn rounded-xl border-2 border-slate-200 bg-white p-4 text-left transition hover:border-teal-500 hover:bg-teal-50/50 dark:border-slate-700 dark:bg-slate-950">
      <span class="block text-sm font-bold text-slate-950 dark:text-white">${escapeHtml(court.name || court.id)}</span>
      <span class="mt-1 block text-xs text-slate-500 dark:text-slate-400">${escapeHtml(court.type || court.surface || 'Court')}</span>
      <span class="mt-2 block text-sm font-bold text-teal-600 dark:text-teal-400">${PadelGo.Format.rupiah(court.price_per_hour)}/hr</span>
    </button>
  `).join('');
  map.innerHTML = courts.map(court => `
    <button type="button" data-court="${escapeAttr(court.id)}" class="court-map-card relative h-32 overflow-hidden rounded-2xl border-2 border-slate-200 text-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800">
      <img src="${escapeAttr(court.image_url || '/images/padel1.jpg')}" alt="${escapeAttr(court.name)}" class="absolute inset-0 h-full w-full object-cover">
      <span class="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></span>
      <span class="absolute inset-0 flex flex-col items-start justify-end p-4">
        <span class="text-base font-bold drop-shadow-lg">${escapeHtml(court.name || court.id)}</span>
        <span class="text-xs opacity-80">${escapeHtml(court.type || 'Court')}</span>
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
    status.textContent = 'Select date and court';
    status.className = 'text-xs text-slate-500';
    return;
  }
  status.textContent = 'Checking...';
  status.className = 'text-xs text-amber-600';
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
    status.textContent = 'Available';
    status.className = 'text-xs text-emerald-600';
  } catch {
    bookedSlots[selectedCourt] = bookedSlots[selectedCourt] || [];
    status.textContent = 'Checking';
    status.className = 'text-xs text-slate-500';
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
      ? 'rounded-lg bg-slate-100 px-2 py-2.5 text-xs font-semibold text-slate-400 line-through dark:bg-slate-900 dark:text-slate-600 cursor-not-allowed'
      : 'rounded-lg border border-slate-200 bg-white px-2 py-2.5 text-xs font-semibold text-slate-700 transition hover:border-teal-500 hover:bg-teal-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-teal-500';
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
    btn.classList.remove('border-teal-500', 'bg-teal-500', 'text-white');
    btn.classList.add('border-slate-200', 'bg-white', 'text-slate-700', 'dark:border-slate-700', 'dark:bg-slate-950', 'dark:text-slate-300');
  });
  button.classList.remove('border-slate-200', 'bg-white', 'text-slate-700', 'dark:border-slate-700', 'dark:bg-slate-950', 'dark:text-slate-300');
  button.classList.add('border-teal-500', 'bg-teal-500', 'text-white');
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
    text.textContent = court?.name || selectedCourt + ' | ' + selectedTime + ' - ' + String(endHour).padStart(2, '0') + ':00';
    price.textContent = 'Total: ' + PadelGo.Format.rupiah(total) + ' (' + selectedDuration + ' hour' + (selectedDuration > 1 ? 's' : '') + ')';
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
  document.querySelectorAll('.duration-btn').forEach(btn => {
    btn.classList.remove('border-teal-500', 'bg-teal-500', 'text-white');
    btn.classList.add('border-slate-200', 'bg-white', 'text-slate-700', 'dark:border-slate-700', 'dark:bg-slate-950', 'dark:text-slate-300');
  });
  document.querySelector('.duration-btn[data-hours="1"]').classList.add('border-teal-500', 'bg-teal-500', 'text-white');
  document.querySelector('.duration-btn[data-hours="1"]').classList.remove('border-slate-200', 'bg-white', 'text-slate-700', 'dark:border-slate-700', 'dark:bg-slate-950', 'dark:text-slate-300');
  document.querySelectorAll('.court-btn').forEach(btn => {
    btn.classList.remove('border-teal-500', 'bg-teal-500', 'text-white');
    btn.classList.add('border-slate-200', 'bg-white', 'text-slate-700', 'dark:border-slate-700', 'dark:bg-slate-950', 'dark:text-slate-300');
  });
  document.querySelectorAll('.court-map-card').forEach(card => card.classList.remove('ring-2', 'ring-teal-500'));
  document.getElementById('selectedSummary').classList.add('hidden');
  document.getElementById('bookingError').classList.add('hidden');
  document.getElementById('bookingSuccess').classList.add('hidden');
  document.getElementById('timePlaceholder').classList.remove('hidden');
  document.getElementById('timeGrid').classList.add('hidden');
  document.getElementById('timeGrid').innerHTML = '';
}

function getTodayLocalDate() {
  const now = new Date();
  return now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
}

async function handleBooking(e) {
  e.preventDefault();
  const errorEl = document.getElementById('bookingError');
  const successEl = document.getElementById('bookingSuccess');
  const submitBtn = document.getElementById('submitBtn');
  const submitText = document.getElementById('submitText');
  errorEl.classList.add('hidden');
  successEl.classList.add('hidden');

  const supabase = await PadelGo.Supabase.init();
  if (!supabase) {
    errorEl.textContent = 'System not configured.';
    errorEl.classList.remove('hidden');
    return;
  }
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    errorEl.textContent = 'Please login first.';
    errorEl.classList.remove('hidden');
    window.location.href = '/login/?next=/order/';
    return;
  }
  if (!selectedCourt || !selectedTime) {
    errorEl.textContent = 'Select time and court.';
    errorEl.classList.remove('hidden');
    return;
  }
  if (!document.getElementById('date').value) {
    errorEl.textContent = 'Select a date.';
    errorEl.classList.remove('hidden');
    return;
  }

  submitBtn.disabled = true;
  submitText.textContent = 'Processing...';

  try {
    const dateVal = document.getElementById('date').value;
    const startHour = Number(selectedTime.split(':')[0]);
    const endHour = startHour + selectedDuration;
    const endTime = String(endHour).padStart(2, '0') + ':00';
    const { data: court } = await supabase.from('courts').select('name, price_per_hour').eq('id', selectedCourt).single();
    const pricePerHour = court?.price_per_hour || 150000;
    const amount = pricePerHour * selectedDuration;
    const bookingId = 'BK-' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);

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

    if (insertError) throw new Error(insertError.message || 'Booking failed');
    resetFormState();
    successEl.textContent = 'Booking confirmed. Court: ' + (court?.name || selectedCourt) + ', ' + dateVal + ' at ' + selectedTime + '-' + endTime;
    successEl.classList.remove('hidden');
    PadelGo.UI.toast('Booking submitted. Waiting for approval.');
    loadAvailability();
  } catch (err) {
    errorEl.textContent = err.message || 'Booking failed.';
    errorEl.classList.remove('hidden');
  } finally {
    submitBtn.disabled = false;
    submitText.textContent = 'Confirm Booking';
  }
}

document.querySelectorAll('.duration-btn').forEach(button => {
  button.addEventListener('click', () => selectDuration(Number(button.dataset.hours), button));
});
document.getElementById('date').addEventListener('change', () => { loadAvailability(); updateSummary(); });
document.getElementById('date').setAttribute('min', getTodayLocalDate());
document.querySelector('.duration-btn[data-hours="1"]').classList.add('border-teal-500', 'bg-teal-500', 'text-white');
document.querySelector('.duration-btn[data-hours="1"]').classList.remove('border-slate-200', 'bg-white', 'text-slate-700', 'dark:border-slate-700', 'dark:bg-slate-950', 'dark:text-slate-300');
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
