---
title: "Admin Dashboard"
date: 2026-06-29
draft: false
layout: "admin"
---

<div class="flex min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950">
<aside class="hidden w-72 shrink-0 border-r border-slate-800 bg-slate-950 p-6 text-slate-300 md:block">
<div class="mb-8">
<h2 class="text-white font-extrabold text-lg">Admin Console</h2>
<p class="text-slate-500 text-xs mt-1">Supabase booking management</p>
</div>
<nav class="space-y-1">
<a href="#dashboard" class="admin-nav flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800 text-white font-semibold" data-tab="dashboard">
<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
Dashboard
</a>
<a href="#bookings" class="admin-nav flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 transition" data-tab="bookings">
<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
Bookings
</a>
<a href="#courts" class="admin-nav flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 transition" data-tab="courts">
<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
Courts
</a>
</nav>
</aside>

<main class="flex-1 overflow-auto p-4 sm:p-8">
<div id="dashboard" class="admin-section">
<div class="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
<div>
<p class="text-sm font-extrabold uppercase tracking-wide text-teal-700 dark:text-teal-300">Admin</p>
<h1 class="mt-1 text-3xl font-extrabold text-slate-950 dark:text-white">Operations Dashboard</h1>
<p class="mt-2 text-slate-600 dark:text-slate-400">Kelola booking, court, dan status operasional langsung dari Supabase.</p>
</div>
<button onclick="loadAdminData()" class="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-extrabold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">Refresh</button>
</div>
<div class="grid gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
<div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
<p class="text-sm text-slate-500 dark:text-slate-400">Total Bookings</p>
<p class="mt-1 text-3xl font-extrabold text-slate-950 dark:text-white" id="statTotal">-</p>
<p class="mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-300">Live from Supabase</p>
</div>
<div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
<p class="text-sm text-slate-500 dark:text-slate-400">Active Courts</p>
<p class="mt-1 text-3xl font-extrabold text-slate-950 dark:text-white" id="statCourts">4</p>
<p class="mt-2 text-xs text-slate-500 dark:text-slate-400">Mengikuti tabel courts</p>
</div>
<div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
<p class="text-sm text-slate-500 dark:text-slate-400">Revenue (est.)</p>
<p class="mt-1 text-3xl font-extrabold text-slate-950 dark:text-white" id="statRevenue">-</p>
<p class="mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-300">Confirmed + pending</p>
</div>
</div>
<div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
<div class="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
<h2 class="text-xl font-extrabold text-slate-950 dark:text-white">Recent Bookings</h2>
</div>
<div class="overflow-x-auto">
<table class="w-full">
<thead>
<tr class="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
<th class="text-left py-3.5 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">User</th>
<th class="text-left py-3.5 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Court</th>
<th class="text-left py-3.5 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
<th class="text-left py-3.5 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Time</th>
<th class="text-left py-3.5 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
<th class="text-left py-3.5 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
</tr>
</thead>
<tbody id="dashTable" class="divide-y divide-slate-100 dark:divide-slate-800"></tbody>
</table>
</div>
</div>
</div>

<div id="bookings" class="admin-section hidden">
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
<h1 class="text-3xl font-extrabold text-slate-950 dark:text-white">Booking Management</h1>
<div class="flex flex-wrap gap-3">
<select id="statusFilter" class="px-4 py-2 bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-600 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none">
<option value="all">All Status</option>
<option value="confirmed">Confirmed</option>
<option value="pending">Pending</option>
<option value="cancelled">Cancelled</option>
</select>
<select id="courtFilter" class="px-4 py-2 bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-600 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none">
<option value="all">All Courts</option>
<option value="A1">A1</option>
<option value="A2">A2</option>
<option value="B1">B1</option>
<option value="B2">B2</option>
</select>
</div>
</div>
<div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
<div class="overflow-x-auto">
<table class="w-full">
<thead>
<tr class="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
<th class="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">User</th>
<th class="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Court</th>
<th class="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
<th class="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Time</th>
<th class="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
<th class="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
<th class="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
</tr>
</thead>
<tbody id="ordersTable" class="divide-y divide-slate-100 dark:divide-slate-800"></tbody>
</table>
</div>
<p id="adminError" class="text-sm text-red-600 bg-red-50 p-3 rounded-xl hidden m-6" role="alert"></p>
</div>
</div>

<div id="courts" class="admin-section hidden">
<div class="flex items-center justify-between mb-8">
<h1 class="text-3xl font-extrabold text-slate-950 dark:text-white">Court Management</h1>
</div>
<div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
<div class="overflow-x-auto">
<table class="w-full">
<thead>
<tr class="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
<th class="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">ID</th>
<th class="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Name</th>
<th class="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
<th class="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Price/Hr</th>
<th class="text-left py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
</tr>
</thead>
<tbody id="courtTable" class="divide-y divide-slate-100 dark:divide-slate-800"></tbody>
</table>
</div>
</div>
</div>
</main>
</div>

<script src="/js/shared.js"></script>
<script>
let allBookings = [];
let allCourts = [];
let currentUserRole = 'user';

async function loadAdminData() {
  const supabase = await PadelGo.Supabase.init();
  if (!supabase) { window.location.href = '/login/?next=/admin/'; return; }
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) { window.location.href = '/login/?next=/admin/'; return; }
  const uid = session.user.id;
  const { data: profile, error: profileError } = await supabase.from('profiles').select('role').eq('id', uid).single();
  if (profileError || !profile || profile.role !== 'admin') {
    window.location.href = '/dashboard/';
    return;
  }
  currentUserRole = profile.role;
  try {
    const [bookingsRes, courtsRes] = await Promise.all([
      supabase.from('bookings').select('*').order('date', { ascending: false }),
      supabase.from('courts').select('*')
    ]);
    if (bookingsRes.error) throw new Error(bookingsRes.error.message || 'Gagal memuat bookings');
    if (courtsRes.error) throw new Error(courtsRes.error.message || 'Gagal memuat courts');
    allBookings = bookingsRes.data || [];
    allCourts = courtsRes.data || [];
    const totalAmount = allBookings.reduce((sum, b) => sum + (b.amount || 0), 0);
    document.getElementById('statTotal').textContent = allBookings.length;
    document.getElementById('statCourts').textContent = allCourts.filter(c => c.available).length || allCourts.length;
    document.getElementById('statRevenue').textContent = 'Rp ' + totalAmount.toLocaleString('id-ID');
    renderDashTable(allBookings.slice(0, 5));
    renderOrders(allBookings);
    renderCourts();
  } catch (err) {
    document.getElementById('adminError').textContent = err.message || 'Gagal memuat data admin.';
    document.getElementById('adminError').classList.remove('hidden');
  }
}

function renderDashTable(bookings) {
  const tbody = document.getElementById('dashTable');
  tbody.innerHTML = '';
  bookings.slice(0, 5).forEach((order) => {
    const courtColors = {'A1': 'bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-200', 'A2': 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200', 'B1': 'bg-violet-100 text-violet-800 dark:bg-violet-900/50 dark:text-violet-200', 'B2': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200'};
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-slate-50 transition dark:hover:bg-slate-800/60';
    tr.innerHTML = `
      <td class="py-4 px-6"><span class="font-semibold text-slate-900 dark:text-slate-100">${escapeHtml(order.user_id || 'User')}</span></td>
      <td class="py-4 px-6"><span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${courtColors[order.court_id] || 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200'}">${escapeHtml(order.court_name || order.court_id)}</span></td>
      <td class="py-4 px-6 font-medium text-slate-700 dark:text-slate-300">${order.date}</td>
      <td class="py-4 px-6 font-medium text-slate-700 dark:text-slate-300">${order.start_time || ''}</td>
      <td class="py-4 px-6"><span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${statusClass(order.status)}">${escapeHtml(order.status)}</span></td>
  <td class="py-4 px-6 font-semibold text-slate-900 dark:text-slate-100">Rp ${(order.amount || 0).toLocaleString('id-ID')}</td>
`;
tbody.appendChild(tr);
});
}

function renderOrders(bookings) {
  const tbody = document.getElementById('ordersTable');
  tbody.innerHTML = '';
  bookings.forEach((order) => {
    const courtColors = {'A1': 'bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-200', 'A2': 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200', 'B1': 'bg-violet-100 text-violet-800 dark:bg-violet-900/50 dark:text-violet-200', 'B2': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200'};
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-slate-50 transition dark:hover:bg-slate-800/60';
    tr.innerHTML = `
      <td class="py-4 px-6"><span class="font-semibold text-slate-900 dark:text-slate-100">${escapeHtml(order.user_id || '-')}</span></td>
      <td class="py-4 px-6"><span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${courtColors[order.court_id] || 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200'}">${escapeHtml(order.court_name || order.court_id)}</span></td>
      <td class="py-4 px-6 font-medium text-slate-700 dark:text-slate-300">${order.date}</td>
      <td class="py-4 px-6 font-medium text-slate-700 dark:text-slate-300">${order.start_time || ''} - ${order.end_time || ''}</td>
      <td class="py-4 px-6"><span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${statusClass(order.status)}">${escapeHtml(order.status)}</span></td>
      <td class="py-4 px-6 font-semibold text-slate-900 dark:text-slate-100">Rp ${(order.amount || 0).toLocaleString('id-ID')}</td>
      <td class="py-4 px-6">
        <button onclick="cancelBooking('${order.id}')" class="text-sm font-semibold text-red-600 hover:underline">Cancel</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function renderCourts() {
  const tbody = document.getElementById('courtTable');
  tbody.innerHTML = '';
  allCourts.forEach(court => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-slate-50 transition dark:hover:bg-slate-800/60';
    tr.innerHTML = `
      <td class="py-4 px-6 font-mono text-sm text-slate-500 dark:text-slate-400">${escapeHtml(court.id)}</td>
      <td class="py-4 px-6 font-semibold text-slate-900 dark:text-slate-100">${escapeHtml(court.name)}</td>
      <td class="py-4 px-6 text-slate-700 dark:text-slate-300">${escapeHtml(court.type)}</td>
      <td class="py-4 px-6 text-slate-700 dark:text-slate-300">Rp ${court.price_per_hour.toLocaleString('id-ID')}</td>
      <td class="py-4 px-6"><span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${court.available ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200' : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200'}">${court.available ? 'Available' : 'Unavailable'}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

async function cancelBooking(bookingId) {
  if (!confirm('Batalkan booking ini?')) return;
  try {
    const supabase = await PadelGo.Supabase.init();
    const { error } = await supabase.from('bookings').update({ status: 'cancelled' }).eq('id', bookingId);
    if (error) throw new Error(error.message || 'Gagal membatalkan');
    loadAdminData();
  } catch (err) {
    document.getElementById('adminError').textContent = err.message || 'Gagal membatalkan.';
    document.getElementById('adminError').classList.remove('hidden');
  }
}

document.querySelectorAll('.admin-nav').forEach(link => {
link.addEventListener('click', function(e) {
e.preventDefault();
const tab = this.getAttribute('data-tab');
switchTab(tab);
});
});

function switchTab(tab) {
document.querySelectorAll('.admin-section').forEach(s => s.classList.add('hidden'));
document.getElementById(tab).classList.remove('hidden');
document.querySelectorAll('.admin-nav').forEach(link => {
link.classList.remove('bg-slate-800', 'text-white', 'font-semibold');
link.classList.add('hover:bg-slate-800');
if (link.getAttribute('data-tab') === tab) {
link.classList.add('bg-slate-800', 'text-white', 'font-semibold');
link.classList.remove('hover:bg-slate-800');
}
});
}

document.getElementById('statusFilter').addEventListener('change', filterAdminOrders);
document.getElementById('courtFilter').addEventListener('change', filterAdminOrders);

function filterAdminOrders() {
const status = document.getElementById('statusFilter').value;
const court = document.getElementById('courtFilter').value;
const filtered = allBookings.filter(b => {
const matchStatus = status === 'all' || b.status === status;
const matchCourt = court === 'all' || b.court_id === court;
return matchStatus && matchCourt;
});
renderOrders(filtered);
}

function statusClass(status) {
  if (status === 'confirmed') return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200';
  if (status === 'pending') return 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200';
  return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200';
}

function escapeHtml(text) {
const map = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'};
return String(text || '').replace(/[&<>"']/g, m => map[m]);
}

document.addEventListener('DOMContentLoaded', loadAdminData);
</script>
