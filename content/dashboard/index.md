---
title: "My Dashboard"
date: 2026-06-29
draft: false
layout: "dashboard"
---

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
<div class="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-8">
<div class="h-32 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500"></div>
<div class="px-8 pb-8">
<div class="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16">
<div class="relative">
<img id="userAvatar" src="" alt="Profile" class="w-32 h-32 rounded-full border-4 border-white shadow-2xl object-cover bg-blue-100">
<div class="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
</div>
<div class="text-center md:text-left flex-1">
<h1 id="userName" class="text-3xl font-extrabold text-gray-900">User</h1>
<p id="userEmail" class="text-gray-500 mt-1">user@example.com</p>
<div class="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
<span class="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
Verified Player
</span>
<span class="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
Gold Member
</span>
</div>
</div>
<div class="text-center md:text-right">
<div class="text-3xl font-extrabold text-gray-900" id="totalBookings">0</div>
<div class="text-sm text-gray-500">Total Bookings</div>
</div>
</div>
</div>
</div>

<div class="grid md:grid-cols-3 gap-6 mb-8">
<div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
<div class="flex items-center gap-4">
<div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
<svg class="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
</div>
<div>
<p class="text-sm text-gray-500">Booking Anda</p>
<p id="userBookingCount" class="text-2xl font-extrabold text-gray-900">0</p>
</div>
</div>
</div>
</div>

<div class="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
<div class="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
<div>
<h2 class="text-xl font-extrabold text-gray-900">Booking History</h2>
<p class="text-sm text-gray-500 mt-1">Semua booking Anda</p>
</div>
<a href="/order/" class="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 font-extrabold text-white transition hover:bg-blue-700">Book New Court</a>
</div>
<div class="overflow-x-auto">
<table class="w-full">
<thead>
<tr class="bg-gray-50 border-b border-gray-100">
<th class="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Court</th>
<th class="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
<th class="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Time</th>
<th class="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
<th class="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
</tr>
</thead>
<tbody id="historyTable" class="divide-y divide-gray-100"></tbody>
</table>
</div>
<p id="dashError" class="text-sm text-red-600 bg-red-50 p-3 rounded-xl hidden m-6" role="alert"></p>
</div>
</div>
</div>

<script src="/js/shared.js"></script>
<script>
async function loadDashboard() {
  const supabase = await PadelGo.Supabase.init();
  if (!supabase) { window.location.href = '/login/?next=/dashboard/'; return; }
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) { window.location.href = '/login/?next=/dashboard/'; return; }
  const user = session.user;
  document.getElementById('userName').textContent = user.user_metadata?.name || user.email?.split('@')[0] || 'User';
  document.getElementById('userEmail').textContent = user.email || '';
  try {
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: false })
      .order('start_time', { ascending: false });
    if (error) throw new Error(error.message || 'Gagal memuat booking');
    const list = bookings || [];
    document.getElementById('userBookingCount').textContent = list.length;
    document.getElementById('totalBookings').textContent = list.length;
    const tbody = document.getElementById('historyTable');
    tbody.innerHTML = '';
    if (list.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" class="py-8 text-center text-gray-500">Belum ada booking.</td></tr>';
      return;
    }
    const statusColors = {'confirmed': 'bg-green-100 text-green-800', 'pending': 'bg-yellow-100 text-yellow-800', 'cancelled': 'bg-red-100 text-red-800'};
    list.forEach(b => {
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-gray-50 transition';
      tr.innerHTML = `
        <td class="py-4 px-6"><span class="font-semibold text-gray-900">${escapeHtml(b.court_name || b.court_id)}</span></td>
        <td class="py-4 px-6 text-gray-700 font-medium">${b.date}</td>
        <td class="py-4 px-6 text-gray-700 font-medium">${b.start_time || ''} - ${b.end_time || ''}</td>
        <td class="py-4 px-6"><span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${statusColors[b.status] || 'bg-gray-100 text-gray-800'}">${escapeHtml(b.status)}</span></td>
        <td class="py-4 px-6 font-bold text-gray-900">Rp ${(b.amount || 0).toLocaleString('id-ID')}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    document.getElementById('dashError').textContent = err.message || 'Gagal memuat data.';
    document.getElementById('dashError').classList.remove('hidden');
  }
}

function escapeHtml(text) {
  const map = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'};
  return String(text || '').replace(/[&<>"']/g, m => map[m]);
}

document.addEventListener('DOMContentLoaded', loadDashboard);
</script>
