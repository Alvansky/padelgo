---
title: "Our Courts"
date: 2026-06-29
draft: false
layout: "courts"
---

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <div class="text-center mb-12">
    <h1 class="text-4xl font-extrabold text-gray-900 mb-4">Our Premium Courts</h1>
    <p class="text-lg text-gray-600 max-w-2xl mx-auto">Professional-grade padel courts designed for the ultimate playing experience.</p>
  </div>

  <div id="courtList" class="grid md:grid-cols-2 gap-6">
    <div class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <span class="ml-3 text-gray-500">Loading courts...</span>
    </div>
  </div>

  <div class="mt-12 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 text-center">
    <h2 class="text-3xl font-extrabold text-white mb-4">Ready to Play?</h2>
    <p class="text-white/90 text-lg mb-8 max-w-2xl mx-auto">Choose your preferred court and book your slot today.</p>
    <a href="/order/" class="bg-white text-slate-900 px-8 py-3 rounded-full font-bold text-lg hover:shadow-xl transition inline-block">Book a Court</a>
  </div>
</div>

<script src="/js/shared.js"></script>
<script>
async function loadCourts() {
  try {
    const supabase = await PadelGo.Supabase.init();
    if (!supabase) throw new Error('Supabase belum dikonfigurasi');
    const { data, error } = await supabase.from('courts').select('*');
    if (error) throw new Error(error.message || 'Gagal memuat data court');
    renderCourts(data || []);
  } catch (err) {
    document.getElementById('courtList').innerHTML = `
      <div class="col-span-2 text-center py-12 text-red-600">
        Gagal memuat courts. <button onclick="loadCourts()" class="underline">Coba lagi</button>
      </div>`;
  }
}

function renderCourts(courts) {
  const container = document.getElementById('courtList');
  container.innerHTML = '';
  if (courts.length === 0) {
    container.innerHTML = '<div class="col-span-2 text-center py-12 text-gray-500">Belum ada court tersedia.</div>';
    return;
  }
  const typeColors = {
    'Premium': 'from-blue-500 to-blue-600',
    'Standard': 'from-orange-500 to-orange-600',
    'Interior Premium': 'from-violet-500 to-violet-600',
    'Exterior': 'from-emerald-500 to-emerald-600',
    'Interior Elite': 'from-pink-500 to-pink-600',
  };
  courts.forEach(court => {
    const div = document.createElement('div');
    div.className = 'bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex items-center gap-6 hover:-translate-y-1 transition';
    const gradient = typeColors[court.type] || 'from-gray-400 to-gray-600';
    div.innerHTML = `
      <div class="w-20 h-20 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center text-white font-extrabold text-xl shrink-0 shadow-lg">${escapeHtml(court.id)}</div>
      <div class="flex-1">
        <h3 class="text-xl font-extrabold text-gray-900">${escapeHtml(court.name)}</h3>
        <p class="text-gray-600 text-sm mt-1">${escapeHtml(court.type)} - ${escapeHtml(court.surface || '-')}</p>
        <p class="text-xl font-extrabold text-gray-900 mt-2">Rp ${(court.price_per_hour || 0).toLocaleString('id-ID')} <span class="text-sm font-medium text-gray-500">/ hour</span></p>
      </div>
      <a href="/order/" class="shrink-0 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition">Book</a>
    `;
    container.appendChild(div);
  });
}

function escapeHtml(text) {
  const map = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'};
  return String(text || '').replace(/[&<>"']/g, m => map[m]);
}

document.addEventListener('DOMContentLoaded', loadCourts);
</script>
