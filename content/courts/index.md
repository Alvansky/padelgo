---
title: "Our Courts"
date: 2026-06-29
draft: false
layout: "courts"
---

<div class="min-h-[calc(100vh-3.5rem)] bg-slate-50 dark:bg-slate-950">
<div class="mx-auto max-w-7xl px-4 py-8 sm:py-10 sm:px-6 lg:px-8">

<!-- Header -->
<div class="mb-8 text-center sm:text-left sm:flex sm:items-end sm:justify-between">
<div>
<div class="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700 dark:border-teal-900/60 dark:bg-teal-950/40 dark:text-teal-300">
<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
Courts
</div>
<h1 class="text-3xl font-extrabold text-slate-950 dark:text-white sm:text-4xl">Our Premium Courts</h1>
<p class="mt-2 max-w-xl text-slate-600 dark:text-slate-400">Professional-grade padel courts designed for the ultimate playing experience.</p>
</div>
<a href="/order/" class="mt-4 sm:mt-0 inline-flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-teal-700/25 transition hover:bg-teal-800 hover:shadow-xl active:scale-95">
<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
Book Court
</a>
</div>

<!-- Courts Grid -->
<div id="courtList" class="grid gap-4 sm:grid-cols-2">
<div class="col-span-2 flex items-center justify-center py-16">
<div class="flex items-center gap-3 text-slate-500 dark:text-slate-400">
<svg class="h-6 w-6 animate-spin text-teal-600" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
<span class="text-sm font-medium">Memuat courts...</span>
</div>
</div>
</div>

<!-- CTA Section -->
<div class="mt-12 overflow-hidden rounded-3xl bg-gradient-to-br from-teal-800 to-teal-950 p-8 text-center shadow-xl sm:p-12">
<div class="mx-auto max-w-2xl">
<h2 class="text-2xl font-extrabold text-white sm:text-3xl">Ready to Play?</h2>
<p class="mx-auto mt-3 max-w-lg text-teal-100 text-lg">Choose your preferred court and book your slot today.</p>
<div class="mt-8 flex flex-wrap justify-center gap-3">
<a href="/order/" class="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-extrabold text-teal-800 shadow-lg transition hover:bg-teal-50 hover:shadow-xl active:scale-95">
<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
Book a Court
</a>
<a href="/register/" class="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-6 py-3 text-sm font-extrabold text-white backdrop-blur-sm transition hover:bg-white/20 active:scale-95">
Create Account
</a>
</div>
</div>
</div>

</div>
</div>

<script src="/js/shared.js"></script>
<script>
const typeColors = {
  'Premium': { bg: 'from-blue-500 to-blue-600', badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200' },
  'Standard': { bg: 'from-orange-500 to-orange-600', badge: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-200' },
  'Interior Premium': { bg: 'from-violet-500 to-violet-600', badge: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-200' },
  'Exterior': { bg: 'from-emerald-500 to-emerald-600', badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200' },
  'Interior Elite': { bg: 'from-pink-500 to-pink-600', badge: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-200' },
  'Premium indoor court': { bg: 'from-blue-500 to-blue-600', badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200' },
  'Standard indoor court': { bg: 'from-orange-500 to-orange-600', badge: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-200' },
  'Premium glass court': { bg: 'from-violet-500 to-violet-600', badge: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-200' },
  'Standard glass court': { bg: 'from-emerald-500 to-emerald-600', badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200' },
};

function renderCourts(courts) {
  const container = document.getElementById('courtList');
  if (!courts || courts.length === 0) {
    container.innerHTML = `
      <div class="col-span-2 rounded-2xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-700">
        <svg class="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
        <p class="mt-4 font-medium text-slate-500 dark:text-slate-400">Belum ada court tersedia.</p>
      </div>`;
    return;
  }

  container.innerHTML = courts.map(court => {
    const colors = typeColors[court.type] || { bg: 'from-slate-500 to-slate-600', badge: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200' };
    return `
      <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
        <div class="flex flex-col sm:flex-row">
          <div class="relative h-40 w-full sm:h-auto sm:w-48 shrink-0">
            <img src="${escapeAttr(court.image_url || '/images/padel1.jpg')}" alt="${escapeHtml(court.name || court.id)}"
              class="h-full w-full object-cover">
            <div class="absolute top-3 left-3">
              <span class="inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 text-xs font-extrabold ${colors.badge} backdrop-blur-sm">
                ${escapeHtml(court.type || 'Court')}
              </span>
            </div>
          </div>
          <div class="flex flex-1 flex-col justify-between p-4 sm:p-5">
            <div>
              <h3 class="text-lg font-extrabold text-slate-950 dark:text-white">${escapeHtml(court.name || court.id)}</h3>
              <p class="mt-1 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
                ${escapeHtml(court.surface || '-')}
              </p>
            </div>
            <div class="mt-4 flex items-end justify-between">
              <div>
                <span class="text-2xl font-extrabold text-teal-700 dark:text-teal-300">${PadelGo.Format.rupiah(court.price_per_hour)}</span>
                <span class="text-sm font-medium text-slate-500 dark:text-slate-400"> / jam</span>
              </div>
              <a href="/order/" class="inline-flex items-center gap-1.5 rounded-xl bg-teal-700 px-4 py-2 text-sm font-extrabold text-white transition hover:bg-teal-800 active:scale-95">
                Book
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

async function loadCourts() {
  try {
    const supabase = await PadelGo.Supabase.init();
    if (!supabase) throw new Error('Supabase belum dikonfigurasi');
    const { data, error } = await supabase.from('courts').select('*').eq('available', true).order('name', { ascending: true });
    if (error) throw new Error(error.message || 'Gagal memuat data court');
    renderCourts(data || []);
  } catch (err) {
    // Use fallback courts
    renderCourts([
      { id: 'A1', name: 'Court A1', type: 'Premium indoor court', surface: 'Artificial Grass', price_per_hour: 150000, image_url: '/images/padel1.jpg' },
      { id: 'A2', name: 'Court A2', type: 'Standard indoor court', surface: 'Artificial Grass', price_per_hour: 100000, image_url: '/images/padel2.jpg' },
      { id: 'B1', name: 'Court B1', type: 'Premium glass court', surface: 'Panoramic Glass', price_per_hour: 150000, image_url: '/images/padel3.jpg' },
      { id: 'B2', name: 'Court B2', type: 'Standard glass court', surface: 'Panoramic Glass', price_per_hour: 100000, image_url: '/images/padel4.jpg' },
    ]);
  }
}

function escapeHtml(text) {
  const map = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'};
  return String(text || '').replace(/[&<>"']/g, m => map[m]);
}

function escapeAttr(text) {
  return escapeHtml(text).replace(/`/g, '&#096;');
}

document.addEventListener('DOMContentLoaded', loadCourts);
</script>
