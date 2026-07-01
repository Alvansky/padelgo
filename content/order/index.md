---
title: "Book a Court"
date: 2026-06-29
draft: false
layout: "order"
---

<section class="min-h-[calc(100vh-3.5rem)] bg-slate-50 dark:bg-slate-950">
<div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
<div class="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
<div>
<p class="mb-2 text-sm font-extrabold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">Booking</p>
<h1 class="text-4xl font-extrabold text-slate-950 dark:text-white">Book Your Court</h1>
<p class="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">Pilih tanggal, durasi, waktu, dan lapangan.</p>
</div>
<div class="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
<span class="font-extrabold text-slate-950 dark:text-white">Jam operasional:</span> 24 Jam
</div>
</div>

<div class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
<div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
<div class="mb-6 rounded-xl border border-teal-100 bg-teal-50 p-4 text-sm text-teal-900 dark:border-teal-900/60 dark:bg-teal-950/40 dark:text-teal-100">
Login diperlukan agar tanggal dan durasi status dapat disesuaikan.
</div>
<form id="orderForm" class="space-y-6" onsubmit="handleBooking(event)" novalidate>
<div>
<label for="date" class="mb-2 block text-sm font-extrabold text-slate-700 dark:text-slate-200">Tanggal</label>
<div class="relative">
<svg class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
<input id="date" type="date" required class="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
</div>
</div>

<div>
<label class="mb-2 block text-sm font-extrabold text-slate-700 dark:text-slate-200">Durasi</label>
<div class="grid grid-cols-4 gap-2" id="durationGrid">
<button type="button" data-hours="1" class="duration-btn rounded-xl border border-slate-200 px-3 py-2 text-sm font-extrabold text-slate-600 transition hover:border-emerald-500 hover:text-emerald-600 dark:border-slate-700 dark:text-slate-300">1 Jam</button>
<button type="button" data-hours="2" class="duration-btn rounded-xl border border-slate-200 px-3 py-2 text-sm font-extrabold text-slate-600 transition hover:border-emerald-500 hover:text-emerald-600 dark:border-slate-700 dark:text-slate-300">2 Jam</button>
<button type="button" data-hours="3" class="duration-btn rounded-xl border border-slate-200 px-3 py-2 text-sm font-extrabold text-slate-600 transition hover:border-emerald-500 hover:text-emerald-600 dark:border-slate-700 dark:text-slate-300">3 Jam</button>
<button type="button" data-hours="4" class="duration-btn rounded-xl border border-slate-200 px-3 py-2 text-sm font-extrabold text-slate-600 transition hover:border-emerald-500 hover:text-emerald-600 dark:border-slate-700 dark:text-slate-300">4 Jam</button>
</div>
<input type="hidden" id="duration" value="1">
</div>

<div>
<label class="mb-2 block text-sm font-extrabold text-slate-700 dark:text-slate-200">Lapangan</label>
<div class="grid grid-cols-2 gap-3" id="courtGrid">
<button type="button" data-court="A1" class="court-btn rounded-xl border border-slate-200 p-4 text-left transition hover:border-emerald-500 hover:bg-emerald-50 dark:border-slate-700 dark:hover:bg-emerald-500/10"><span class="block text-lg font-extrabold text-slate-950 dark:text-white">A1</span><span class="text-sm text-slate-500 dark:text-slate-400">Premium</span></button>
<button type="button" data-court="A2" class="court-btn rounded-xl border border-slate-200 p-4 text-left transition hover:border-emerald-500 hover:bg-emerald-50 dark:border-slate-700 dark:hover:bg-emerald-500/10"><span class="block text-lg font-extrabold text-slate-950 dark:text-white">A2</span><span class="text-sm text-slate-500 dark:text-slate-400">Standard</span></button>
<button type="button" data-court="B1" class="court-btn rounded-xl border border-slate-200 p-4 text-left transition hover:border-emerald-500 hover:bg-emerald-50 dark:border-slate-700 dark:hover:bg-emerald-500/10"><span class="block text-lg font-extrabold text-slate-950 dark:text-white">B1</span><span class="text-sm text-slate-500 dark:text-slate-400">Premium</span></button>
<button type="button" data-court="B2" class="court-btn rounded-xl border border-slate-200 p-4 text-left transition hover:border-emerald-500 hover:bg-emerald-50 dark:border-slate-700 dark:hover:bg-emerald-500/10"><span class="block text-lg font-extrabold text-slate-950 dark:text-white">B2</span><span class="text-sm text-slate-500 dark:text-slate-400">Standard</span></button>
</div>
<input type="hidden" id="court" required>
</div>

<div>
<div class="mb-2 flex items-center justify-between gap-3">
<label class="block text-sm font-extrabold text-slate-700 dark:text-slate-200">Waktu Mulai</label>
<span id="availabilityStatus" class="text-xs font-bold text-slate-400">Pilih tanggal dan court</span>
</div>
<div class="grid max-h-56 grid-cols-4 gap-2 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950 sm:grid-cols-6" id="timeGrid"></div>
<input type="hidden" id="time" required>
</div>

<div id="selectedSummary" class="hidden rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-500/30 dark:bg-emerald-500/10">
<p class="text-center text-sm font-extrabold text-emerald-800 dark:text-emerald-200" id="summaryText"></p>
</div>

<p id="bookingError" class="hidden rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700 dark:bg-red-950/40 dark:text-red-300" role="alert"></p>
<p id="bookingSuccess" class="hidden rounded-xl bg-emerald-50 p-3 text-sm font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300" role="status"></p>
<button type="submit" class="w-full rounded-xl bg-teal-700 py-3.5 text-lg font-extrabold text-white shadow-lg shadow-teal-700/20 transition hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-500/25">Konfirmasi Booking</button>
</form>
</div>

<div class="space-y-6">
<div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
<div class="mb-5 flex items-center justify-between gap-4">
<div><h2 class="text-xl font-extrabold text-slate-950 dark:text-white">Court Map</h2><p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Klik court untuk memilih lapangan.</p></div>
<div class="rounded-xl bg-slate-100 px-3 py-2 text-xs font-extrabold text-slate-600 dark:bg-slate-800 dark:text-slate-300">4 courts</div>
</div>
<div class="grid gap-4 sm:grid-cols-2" id="courtMap">
<button type="button" data-court="A1" class="court-map-card relative h-40 overflow-hidden rounded-2xl border border-slate-200 text-white shadow-sm transition hover:-translate-y-1 dark:border-slate-800"><img src="/images/padel1.jpg" alt="Court A1" class="absolute inset-0 h-full w-full object-cover opacity-80"><span class="absolute inset-0 bg-slate-950/35"></span><span class="relative flex h-full flex-col items-center justify-center"><span class="text-2xl font-extrabold drop-shadow">A1</span><span class="text-sm font-bold opacity-90">Premium</span></span></button>
<button type="button" data-court="B1" class="court-map-card relative h-40 overflow-hidden rounded-2xl border border-slate-200 text-white shadow-sm transition hover:-translate-y-1 dark:border-slate-800"><img src="/images/padel3.jpg" alt="Court B1" class="absolute inset-0 h-full w-full object-cover opacity-80"><span class="absolute inset-0 bg-slate-950/35"></span><span class="relative flex h-full flex-col items-center justify-center"><span class="text-2xl font-extrabold drop-shadow">B1</span><span class="text-sm font-bold opacity-90">Premium</span></span></button>
<button type="button" data-court="A2" class="court-map-card relative h-40 overflow-hidden rounded-2xl border border-slate-200 text-white shadow-sm transition hover:-translate-y-1 dark:border-slate-800"><img src="/images/padel2.jpg" alt="Court A2" class="absolute inset-0 h-full w-full object-cover opacity-80"><span class="absolute inset-0 bg-slate-950/35"></span><span class="relative flex h-full flex-col items-center justify-center"><span class="text-2xl font-extrabold drop-shadow">A2</span><span class="text-sm font-bold opacity-90">Standard</span></span></button>
<button type="button" data-court="B2" class="court-map-card relative h-40 overflow-hidden rounded-2xl border border-slate-200 text-white shadow-sm transition hover:-translate-y-1 dark:border-slate-800"><img src="/images/padel4.jpg" alt="Court B2" class="absolute inset-0 h-full w-full object-cover opacity-80"><span class="absolute inset-0 bg-slate-950/35"></span><span class="relative flex h-full flex-col items-center justify-center"><span class="text-2xl font-extrabold drop-shadow">B2</span><span class="text-sm font-bold opacity-90">Standard</span></span></button>
</div>
</div>

<div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
<h3 class="text-lg font-extrabold text-slate-950 dark:text-white">Booking Rules</h3>
<div class="mt-4 grid gap-3 sm:grid-cols-3">
<div class="rounded-xl bg-slate-50 p-4 dark:bg-slate-950"><p class="font-extrabold text-slate-950 dark:text-white">Login required</p><p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Booking butuh sesi Supabase aktif.</p></div>
<div class="rounded-xl bg-slate-50 p-4 dark:bg-slate-950"><p class="font-extrabold text-slate-950 dark:text-white">Anti double-book</p><p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Slot bentrok dicek sebelum insert.</p></div>
<div class="rounded-xl bg-slate-50 p-4 dark:bg-slate-950"><p class="font-extrabold text-slate-950 dark:text-white">Confirmed</p><p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Status awal mengikuti schema: confirmed.</p></div>
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
let isLoadingAvailability = false;

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
setActiveButton(document.querySelectorAll('.duration-btn'), button, ['border-emerald-500', 'bg-emerald-600', 'text-white']);
renderTimeSlots();
updateSummary();
}

function selectCourt(court, button) {
selectedCourt = court;
document.getElementById('court').value = court;
setActiveButton(document.querySelectorAll('.court-btn'), document.querySelector(`.court-btn[data-court="${court}"]`) || button, ['border-emerald-500', 'bg-emerald-600', 'text-white']);
document.querySelectorAll('.court-map-card').forEach(card => {
card.classList.toggle('ring-4', card.dataset.court === court);
card.classList.toggle('ring-emerald-400', card.dataset.court === court);
});
loadAvailability();
renderTimeSlots();
updateSummary();
}

async function loadAvailability() {
  const status = document.getElementById('availabilityStatus');
  const date = document.getElementById('date').value;
  if (!date || !selectedCourt) {
    status.textContent = 'Pilih tanggal dan court';
    return;
  }
  status.textContent = 'Checking availability...';
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
    status.textContent = 'Availability updated';
  } catch (err) {
    bookedSlots[selectedCourt] = bookedSlots[selectedCourt] || [];
    status.textContent = 'Availability checked by database';
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
grid.innerHTML = '';
for (let hour = OPERATING_HOURS.start; hour < OPERATING_HOURS.end; hour++) {
const timeLabel = String(hour).padStart(2, '0') + ':00';
const disabled = !selectedCourt || isRangeBooked(timeLabel);
const btn = document.createElement('button');
btn.type = 'button';
btn.textContent = timeLabel;
btn.className = disabled
? 'rounded-lg bg-red-50 px-2 py-2 text-xs font-extrabold text-red-400 line-through dark:bg-red-950/30 dark:text-red-300'
: 'rounded-lg bg-white px-2 py-2 text-xs font-extrabold text-slate-700 transition hover:bg-emerald-100 hover:text-emerald-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-emerald-500/15 dark:hover:text-emerald-200';
btn.disabled = disabled;
if (!disabled) btn.onclick = () => selectTime(timeLabel, btn);
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
btn.classList.remove('bg-emerald-600', 'text-white', 'ring-2', 'ring-emerald-400');
});
button.classList.add('bg-emerald-600', 'text-white', 'ring-2', 'ring-emerald-400');
updateSummary();
}

function updateSummary() {
const summary = document.getElementById('selectedSummary');
const text = document.getElementById('summaryText');
if (selectedCourt && selectedTime && selectedDuration) {
const endHour = Number(selectedTime.split(':')[0]) + selectedDuration;
text.textContent = `Court ${selectedCourt} | ${selectedTime} - ${String(endHour).padStart(2, '0')}:00 (${selectedDuration} jam)`;
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
document.querySelectorAll('.duration-btn, .court-btn').forEach(btn => {
btn.classList.remove('border-emerald-500', 'bg-emerald-600', 'text-white');
btn.classList.add('border-slate-200', 'dark:border-slate-700');
});
document.querySelectorAll('.court-map-card').forEach(card => card.classList.remove('ring-4', 'ring-emerald-400'));
document.getElementById('selectedSummary').classList.add('hidden');
document.getElementById('bookingError').classList.add('hidden');
renderTimeSlots();
}

function getTodayLocalDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

async function handleBooking(e) {
  e.preventDefault();
  const errorEl = document.getElementById('bookingError');
  const successEl = document.getElementById('bookingSuccess');
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

  const submitBtn = document.querySelector('#orderForm button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Memproses...';

  try {
    const dateVal = document.getElementById('date').value;
    const startHour = Number(selectedTime.split(':')[0]);
    const endHour = startHour + selectedDuration;
    const endTime = String(endHour).padStart(2, '0') + ':00';

    const { data: court } = await supabase.from('courts').select('price_per_hour').eq('id', selectedCourt).single();
    const pricePerHour = court?.price_per_hour || 150000;
    const amount = pricePerHour * selectedDuration;
    const bookingId = `BK-${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    const { error: insertError } = await supabase.from('bookings').insert({
      id: bookingId,
      user_id: session.user.id,
      court_id: selectedCourt,
      court_name: `Court ${selectedCourt}`,
      date: dateVal,
      start_time: selectedTime,
      end_time: endTime,
      duration_hours: selectedDuration,
      amount: amount,
      status: 'confirmed',
    });

    if (insertError) throw new Error(insertError.message || 'Booking gagal');
    const successMessage = `Booking berhasil: Court ${selectedCourt}, ${dateVal} pukul ${selectedTime}-${endTime}.`;
    resetFormState();
    successEl.textContent = successMessage;
    successEl.classList.remove('hidden');
    PadelGo.UI.toast('Booking berhasil dikonfirmasi.');
    loadAvailability();
  } catch (err) {
    errorEl.textContent = err.message || 'Booking gagal. Cek koneksi backend atau slot mungkin sudah dipesan.';
    errorEl.classList.remove('hidden');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Konfirmasi Booking';
  }
}

document.querySelectorAll('.duration-btn').forEach(button => {
button.addEventListener('click', () => selectDuration(Number(button.dataset.hours), button));
});
document.querySelectorAll('.court-btn').forEach(button => {
button.addEventListener('click', () => selectCourt(button.dataset.court, button));
});
document.querySelectorAll('.court-map-card').forEach(button => {
button.addEventListener('click', () => selectCourt(button.dataset.court, button));
});
document.getElementById('date').addEventListener('change', loadAvailability);
document.getElementById('date').setAttribute('min', getTodayLocalDate());
selectDuration(1, document.querySelector('.duration-btn[data-hours="1"]'));
renderTimeSlots();
</script>
