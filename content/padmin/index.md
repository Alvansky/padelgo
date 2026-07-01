---
title: "Admin Dashboard"
date: 2026-07-02
draft: false
layout: "padmin"
---

<div id="admin" class="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950">
  
  <div id="admin-loading" class="flex items-center justify-center min-h-[50vh]">
    <div class="text-center">
      <div class="h-12 w-12 mx-auto border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      <p class="mt-4 text-slate-600 dark:text-slate-400">Memuat...</p>
    </div>
  </div>

  <div id="admin-error" class="hidden max-w-md mx-auto mt-20 px-4 text-center">
    <div class="h-16 w-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
      <svg class="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
    </div>
    <h2 class="text-xl font-bold text-slate-900 dark:text-white">Akses Ditolak</h2>
    <p id="admin-error-msg" class="mt-2 text-slate-600 dark:text-slate-400"></p>
    <a href="/login/" class="mt-6 inline-block rounded-xl bg-teal-600 px-6 py-3 font-bold text-white hover:bg-teal-700">Login</a>
  </div>

  <div id="admin-content" class="hidden">
    <div class="max-w-7xl mx-auto px-4 py-6">
      
      <div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p class="text-xs font-bold uppercase tracking-wide text-orange-600 dark:text-orange-400">Admin Console</p>
          <h1 class="text-2xl font-extrabold text-slate-900 dark:text-white">PadelGo Dashboard</h1>
        </div>
        <div class="flex gap-2">
          <button onclick="adminRefresh()" class="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            Refresh
          </button>
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div class="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <p class="text-xs font-bold uppercase text-slate-500">Total</p>
          <p id="stat-total" class="text-2xl font-extrabold text-slate-900 dark:text-white">-</p>
        </div>
        <div class="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <p class="text-xs font-bold uppercase text-slate-500">Pending</p>
          <p id="stat-pending" class="text-2xl font-extrabold text-amber-600">-</p>
        </div>
        <div class="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <p class="text-xs font-bold uppercase text-slate-500">Approved</p>
          <p id="stat-approved" class="text-2xl font-extrabold text-emerald-600">-</p>
        </div>
        <div class="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <p class="text-xs font-bold uppercase text-slate-500">Revenue</p>
          <p id="stat-revenue" class="text-lg font-extrabold text-slate-900 dark:text-white">-</p>
        </div>
        <div class="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <p class="text-xs font-bold uppercase text-slate-500">Courts</p>
          <p id="stat-courts" class="text-2xl font-extrabold text-slate-900 dark:text-white">-</p>
        </div>
      </div>

      <div class="grid lg:grid-cols-3 gap-6">
        
        <div class="lg:col-span-2 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <div class="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
            <h2 class="text-lg font-bold text-slate-900 dark:text-white">Booking Terbaru</h2>
            <span id="pending-badge" class="hidden rounded-full bg-amber-500 px-2 py-0.5 text-xs font-bold text-white">0</span>
          </div>
          <div id="bookings-list" class="p-6">
            <p class="text-center text-slate-500">Memuat...</p>
          </div>
        </div>

        <div class="space-y-4">
          <div class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Aksi Cepat</h3>
            <div class="space-y-3">
              <button onclick="adminSwitchTab('bookings')" class="w-full flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 text-left hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700">
                <div class="h-10 w-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                </div>
                <div>
                  <p class="font-bold text-slate-900 dark:text-white">Kelola Booking</p>
                  <p class="text-xs text-slate-500">Approve & Cancel</p>
                </div>
              </button>
              <button onclick="adminSwitchTab('courts')" class="w-full flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 text-left hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700">
                <div class="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"/></svg>
                </div>
                <div>
                  <p class="font-bold text-slate-900 dark:text-white">Kelola Lapangan</p>
                  <p class="text-xs text-slate-500">Tambah & Edit Court</p>
                </div>
              </button>
              <button onclick="adminSwitchTab('users')" class="w-full flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 text-left hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700">
                <div class="h-10 w-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
                </div>
                <div>
                  <p class="font-bold text-slate-900 dark:text-white">Kelola Users</p>
                  <p class="text-xs text-slate-500">Edit Role & Data</p>
                </div>
              </button>
            </div>
          </div>

          <div class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Keuangan</h3>
            <div class="space-y-3">
              <div class="flex justify-between rounded-xl bg-emerald-50 p-3 dark:bg-emerald-900/30">
                <span class="text-emerald-800 dark:text-emerald-200">Approved</span>
                <strong id="fin-approved" class="font-extrabold text-emerald-700 dark:text-emerald-300">-</strong>
              </div>
              <div class="flex justify-between rounded-xl bg-amber-50 p-3 dark:bg-amber-900/30">
                <span class="text-amber-800 dark:text-amber-200">Pending</span>
                <strong id="fin-pending" class="font-extrabold text-amber-700 dark:text-amber-300">-</strong>
              </div>
              <div class="flex justify-between rounded-xl bg-red-50 p-3 dark:bg-red-900/30">
                <span class="text-red-800 dark:text-red-200">Cancelled</span>
                <strong id="fin-cancelled" class="font-extrabold text-red-700 dark:text-red-300">-</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="tab-bookings" class="tab-section hidden mt-6">
        <div class="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 px-6 py-4 dark:border-slate-800">
            <h2 class="text-lg font-bold text-slate-900 dark:text-white">Semua Booking</h2>
            <div class="flex gap-2">
              <select id="filter-status" onchange="adminFilterBookings()" class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold dark:border-slate-700 dark:bg-slate-950">
                <option value="all">Semua Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select id="filter-court" onchange="adminFilterBookings()" class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold dark:border-slate-700 dark:bg-slate-950">
                <option value="all">Semua Court</option>
              </select>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full min-w-[800px]">
              <thead>
                <tr class="bg-slate-50 text-left text-xs uppercase text-slate-500 dark:bg-slate-950">
                  <th class="px-4 py-3">User</th>
                  <th class="px-4 py-3">Court</th>
                  <th class="px-4 py-3">Tanggal</th>
                  <th class="px-4 py-3">Waktu</th>
                  <th class="px-4 py-3">Status</th>
                  <th class="px-4 py-3">Jumlah</th>
                  <th class="px-4 py-3">Aksi</th>
                </tr>
              </thead>
              <tbody id="bookings-table" class="divide-y divide-slate-100 dark:divide-slate-800">
                <tr><td colspan="7" class="px-4 py-12 text-center text-slate-500">Memuat...</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div id="tab-courts" class="tab-section hidden mt-6">
        <div class="grid lg:grid-cols-2 gap-6">
          <div class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Tambah Lapangan</h2>
            <form id="court-form" onsubmit="adminSaveCourt(event)" class="space-y-4">
              <div>
                <label class="mb-1 block text-sm font-bold">Nama</label>
                <input id="court-name" required class="w-full rounded-xl border border-slate-200 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-950">
              </div>
              <div>
                <label class="mb-1 block text-sm font-bold">Harga/Jam</label>
                <input id="court-price" required type="number" class="w-full rounded-xl border border-slate-200 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-950">
              </div>
              <div>
                <label class="mb-1 block text-sm font-bold">Tipe</label>
                <input id="court-type" class="w-full rounded-xl border border-slate-200 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-950">
              </div>
              <button type="submit" class="w-full rounded-xl bg-teal-600 py-3 font-bold text-white hover:bg-teal-700">Simpan</button>
            </form>
          </div>
          <div class="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <div class="border-b border-slate-200 px-6 py-4 dark:border-slate-800">
              <h2 class="text-lg font-bold text-slate-900 dark:text-white">Daftar Lapangan</h2>
            </div>
            <div id="courts-list" class="divide-y divide-slate-100 dark:divide-slate-800">
              <p class="px-6 py-12 text-center text-slate-500">Memuat...</p>
            </div>
          </div>
        </div>
      </div>

      <div id="tab-users" class="tab-section hidden mt-6">
        <div class="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <div class="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
            <h2 class="text-lg font-bold text-slate-900 dark:text-white">Users</h2>
            <span id="users-count" class="rounded-full bg-teal-100 px-3 py-1 text-xs font-bold text-teal-800">0</span>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full min-w-[700px]">
              <thead>
                <tr class="bg-slate-50 text-left text-xs uppercase text-slate-500 dark:bg-slate-950">
                  <th class="px-4 py-3">Nama</th>
                  <th class="px-4 py-3">Email</th>
                  <th class="px-4 py-3">Role</th>
                  <th class="px-4 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody id="users-table" class="divide-y divide-slate-100 dark:divide-slate-800">
                <tr><td colspan="4" class="px-4 py-12 text-center text-slate-500">Memuat...</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>

<div id="user-modal" class="fixed inset-0 z-50 hidden">
  <div class="absolute inset-0 bg-black/50" onclick="adminCloseUserModal()"></div>
  <div class="absolute inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-md rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
    <div class="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
      <h3 class="text-lg font-bold text-slate-900 dark:text-white">Edit User</h3>
      <button onclick="adminCloseUserModal()" class="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>
    <form id="user-form" onsubmit="adminSaveUser(event)" class="p-6 space-y-4">
      <input type="hidden" id="edit-user-id">
      <div>
        <label class="mb-1 block text-sm font-bold">Nama</label>
        <input id="edit-user-name" required class="w-full rounded-xl border border-slate-200 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-950">
      </div>
      <div>
        <label class="mb-1 block text-sm font-bold">Role</label>
        <select id="edit-user-role" class="w-full rounded-xl border border-slate-200 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-950">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div id="user-edit-error" class="hidden rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700"></div>
      <div class="flex gap-3 pt-2">
        <button type="submit" class="flex-1 rounded-xl bg-teal-600 py-3 font-bold text-white hover:bg-teal-700">Simpan</button>
        <button type="button" onclick="adminDeleteUser()" class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-bold text-red-700 hover:bg-red-100">Hapus</button>
      </div>
    </form>
  </div>
</div>

<script>
var adminData = { bookings: [], courts: [], users: [] };
var adminProfiles = {};
var currentTab = 'main';

function adminInit() {
  if (typeof PadelGo === 'undefined' || typeof PadelGo.Supabase === 'undefined') {
    setTimeout(adminInit, 100);
    return;
  }
  adminLoad();
}

async function adminLoad() {
  try {
    var supabase = await PadelGo.Supabase.init();
    if (!supabase) {
      adminShowError('Supabase tidak dikonfigurasi.');
      return;
    }

    var res = await supabase.auth.getSession();
    if (!res.data || !res.data.session) {
      adminShowError('Silakan login terlebih dahulu.');
      return;
    }

    var profile = await supabase.from('profiles').select('role').eq('id', res.data.session.user.id).single();
    if (!profile.data || profile.data.role !== 'admin') {
      adminShowError('Anda bukan admin. Role: ' + (profile.data ? profile.data.role : 'tidak ada'));
      return;
    }

    var bRes = await supabase.from('bookings').select('*').order('date', { ascending: false });
    var cRes = await supabase.from('courts').select('*').order('name');
    var uRes = await supabase.from('profiles').select('*').order('created_at', { ascending: false });

    adminData.bookings = bRes.data || [];
    adminData.courts = cRes.data || [];
    adminData.users = uRes.data || [];
    adminProfiles = {};
    adminData.users.forEach(function(u) { adminProfiles[u.id] = u; });

    adminShowContent();
    adminRender();
  } catch (err) {
    adminShowError('Error: ' + err.message);
    console.error(err);
  }
}

function adminShowError(msg) {
  document.getElementById('admin-loading').style.display = 'none';
  document.getElementById('admin-error').style.display = 'block';
  document.getElementById('admin-error-msg').textContent = msg;
}

function adminShowContent() {
  document.getElementById('admin-loading').style.display = 'none';
  document.getElementById('admin-content').style.display = 'block';
}

function adminRender() {
  var approved = adminData.bookings.filter(function(b) { return b.status === 'approved'; });
  var pending = adminData.bookings.filter(function(b) { return b.status === 'pending'; });
  var revenue = approved.reduce(function(s, b) { return s + (b.amount || 0); }, 0);

  document.getElementById('stat-total').textContent = adminData.bookings.length;
  document.getElementById('stat-pending').textContent = pending.length;
  document.getElementById('stat-approved').textContent = approved.length;
  document.getElementById('stat-revenue').textContent = adminRupiah(revenue);
  document.getElementById('stat-courts').textContent = adminData.courts.filter(function(c) { return c.available; }).length;

  var badge = document.getElementById('pending-badge');
  if (pending.length > 0) {
    badge.textContent = pending.length;
    badge.style.display = 'inline-block';
  } else {
    badge.style.display = 'none';
  }

  document.getElementById('fin-approved').textContent = adminRupiah(revenue);
  document.getElementById('fin-pending').textContent = adminRupiah(pending.reduce(function(s, b) { return s + (b.amount || 0); }, 0));
  document.getElementById('fin-cancelled').textContent = adminRupiah(adminData.bookings.filter(function(b) { return b.status === 'cancelled'; }).reduce(function(s, b) { return s + (b.amount || 0); }, 0));

  adminRenderRecentBookings();
  adminRenderBookingsTable();
  adminRenderCourts();
  adminRenderUsers();
  adminPopulateFilters();
}

function adminRenderRecentBookings() {
  var recent = adminData.bookings.slice(0, 8);
  if (!recent.length) {
    document.getElementById('bookings-list').innerHTML = '<p class="text-center text-slate-500">Belum ada booking.</p>';
    return;
  }
  var html = '';
  recent.forEach(function(b) {
    var u = adminProfiles[b.user_id];
    var name = u ? (u.name || u.email) : 'User';
    var statusColor = b.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : b.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700';
    var statusLabel = b.status === 'approved' ? 'Approved' : b.status === 'pending' ? 'Pending' : 'Cancelled';
    html += '<div class="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">';
    html += '<div class="flex items-center gap-3"><div class="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-sm font-bold text-orange-700">' + (name ? name[0].toUpperCase() : 'U') + '</div>';
    html += '<div><p class="font-bold text-sm text-slate-900 dark:text-white">' + adminEsc(name) + '</p><p class="text-xs text-slate-500">' + adminEsc(b.court_name || b.court_id) + ' &bull; ' + b.date + '</p></div></div>';
    html += '<div class="text-right"><span class="inline-block rounded-full px-2 py-0.5 text-xs font-bold ' + statusColor + '">' + statusLabel + '</span><p class="mt-1 text-sm font-bold text-teal-600">' + adminRupiah(b.amount) + '</p></div></div>';
  });
  document.getElementById('bookings-list').innerHTML = html;
}

function adminFilterBookings() {
  var status = document.getElementById('filter-status').value;
  var court = document.getElementById('filter-court').value;
  var filtered = adminData.bookings.filter(function(b) {
    if (status !== 'all' && b.status !== status) return false;
    if (court !== 'all' && b.court_id !== court) return false;
    return true;
  });
  adminRenderBookingsTable(filtered);
}

function adminRenderBookingsTable(bookings) {
  bookings = bookings || adminData.bookings;
  if (!bookings.length) {
    document.getElementById('bookings-table').innerHTML = '<tr><td colspan="7" class="px-4 py-12 text-center text-slate-500">Tidak ada booking.</td></tr>';
    return;
  }
  var html = '';
  bookings.forEach(function(b) {
    var u = adminProfiles[b.user_id];
    var name = u ? (u.name || u.email) : 'User';
    var statusColor = b.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : b.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700';
    var statusLabel = b.status === 'approved' ? 'Approved' : b.status === 'pending' ? 'Pending' : 'Cancelled';
    var actions = '';
    if (b.status === 'pending') actions += '<button onclick="adminSetStatus(\'' + b.id + '\',\'approved\')" class="mr-1 rounded-lg bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 hover:bg-emerald-200">&#10003;</button>';
    if (b.status !== 'cancelled') actions += '<button onclick="adminSetStatus(\'' + b.id + '\',\'cancelled\')" class="rounded-lg bg-red-100 px-3 py-1 text-xs font-bold text-red-700 hover:bg-red-200">&#10007;</button>';
    html += '<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">';
    html += '<td class="px-4 py-3 text-sm">' + adminEsc(name) + '</td>';
    html += '<td class="px-4 py-3 text-sm font-bold">' + adminEsc(b.court_name || b.court_id) + '</td>';
    html += '<td class="px-4 py-3 text-sm">' + b.date + '</td>';
    html += '<td class="px-4 py-3 text-sm">' + b.start_time + ' - ' + b.end_time + '</td>';
    html += '<td class="px-4 py-3"><span class="rounded-full px-2.5 py-0.5 text-xs font-bold ' + statusColor + '">' + statusLabel + '</span></td>';
    html += '<td class="px-4 py-3 text-sm font-bold">' + adminRupiah(b.amount) + '</td>';
    html += '<td class="px-4 py-3">' + actions + '</td></tr>';
  });
  document.getElementById('bookings-table').innerHTML = html;
}

function adminRenderCourts() {
  if (!adminData.courts.length) {
    document.getElementById('courts-list').innerHTML = '<p class="px-6 py-12 text-center text-slate-500">Belum ada lapangan.</p>';
    return;
  }
  var html = '';
  adminData.courts.forEach(function(c) {
    var availClass = c.available ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700';
    var availLabel = c.available ? 'Aktif' : 'Hidden';
    html += '<div class="flex items-center justify-between px-6 py-4"><div><p class="font-bold text-slate-900 dark:text-white">' + adminEsc(c.name) + '</p><p class="text-sm text-slate-500">' + adminRupiah(c.price_per_hour) + '/jam</p></div><span class="rounded-full px-2.5 py-0.5 text-xs font-bold ' + availClass + '">' + availLabel + '</span></div>';
  });
  document.getElementById('courts-list').innerHTML = html;
}

function adminRenderUsers() {
  var nonAdmin = adminData.users.filter(function(u) { return u.role !== 'admin'; }).length;
  document.getElementById('users-count').textContent = nonAdmin + ' users';
  if (!adminData.users.length) {
    document.getElementById('users-table').innerHTML = '<tr><td colspan="4" class="px-4 py-12 text-center text-slate-500">Belum ada user.</td></tr>';
    return;
  }
  var html = '';
  adminData.users.forEach(function(u) {
    var roleClass = u.role === 'admin' ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-700';
    var roleLabel = u.role || 'user';
    html += '<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">';
    html += '<td class="px-4 py-3 text-sm font-bold">' + adminEsc(u.name || u.email || 'User') + '</td>';
    html += '<td class="px-4 py-3 text-sm text-slate-500">' + adminEsc(u.email || '-') + '</td>';
    html += '<td class="px-4 py-3"><span class="rounded-full px-2.5 py-0.5 text-xs font-bold ' + roleClass + '">' + roleLabel + '</span></td>';
    html += '<td class="px-4 py-3 text-right"><button onclick="adminOpenUserModal(\'' + u.id + '\')" class="rounded-lg border border-slate-200 px-3 py-1 text-xs font-bold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">Edit</button></td></tr>';
  });
  document.getElementById('users-table').innerHTML = html;
}

function adminPopulateFilters() {
  var sel = document.getElementById('filter-court');
  var html = '<option value="all">Semua Court</option>';
  adminData.courts.forEach(function(c) { html += '<option value="' + c.id + '">' + adminEsc(c.name) + '</option>'; });
  sel.innerHTML = html;
}

async function adminSetStatus(id, status) {
  if (status === 'cancelled' && !confirm('Batalkan booking?')) return;
  try {
    var supabase = await PadelGo.Supabase.init();
    var res = await supabase.from('bookings').update({ status: status }).eq('id', id);
    if (res.error) throw res.error;
    adminToast(status === 'approved' ? 'Approved!' : 'Cancelled!');
    await adminLoad();
  } catch (err) {
    adminToast(err.message, 'error');
  }
}

async function adminSaveCourt(e) {
  e.preventDefault();
  try {
    var supabase = await PadelGo.Supabase.init();
    var name = document.getElementById('court-name').value.trim();
    var price = parseInt(document.getElementById('court-price').value);
    var type = document.getElementById('court-type').value.trim();
    var id = name.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8) || 'C' + Date.now();
    var res = await supabase.from('courts').upsert({ id: id, name: name, type: type, price_per_hour: price, available: true }, { onConflict: 'id' });
    if (res.error) throw res.error;
    adminToast('Court disimpan!');
    e.target.reset();
    await adminLoad();
  } catch (err) {
    adminToast(err.message, 'error');
  }
}

function adminOpenUserModal(id) {
  var u = adminData.users.find(function(x) { return x.id === id; });
  if (!u) return;
  document.getElementById('edit-user-id').value = id;
  document.getElementById('edit-user-name').value = u.name || '';
  document.getElementById('edit-user-role').value = u.role || 'user';
  document.getElementById('user-edit-error').style.display = 'none';
  document.getElementById('user-modal').style.display = 'block';
}

function adminCloseUserModal() {
  document.getElementById('user-modal').style.display = 'none';
}

async function adminSaveUser(e) {
  e.preventDefault();
  try {
    var supabase = await PadelGo.Supabase.init();
    var id = document.getElementById('edit-user-id').value;
    var name = document.getElementById('edit-user-name').value.trim();
    var role = document.getElementById('edit-user-role').value;
    var res = await supabase.from('profiles').update({ name: name, role: role }).eq('id', id);
    if (res.error) throw res.error;
    adminToast('User diupdate!');
    adminCloseUserModal();
    await adminLoad();
  } catch (err) {
    document.getElementById('user-edit-error').textContent = err.message;
    document.getElementById('user-edit-error').style.display = 'block';
  }
}

async function adminDeleteUser() {
  var id = document.getElementById('edit-user-id').value;
  if (!confirm('Hapus user ini?')) return;
  try {
    var supabase = await PadelGo.Supabase.init();
    await supabase.from('bookings').delete().eq('user_id', id);
    var res = await supabase.from('profiles').delete().eq('id', id);
    if (res.error) throw res.error;
    adminToast('User dihapus!');
    adminCloseUserModal();
    await adminLoad();
  } catch (err) {
    adminToast(err.message, 'error');
  }
}

async function adminRefresh() {
  await adminLoad();
  adminToast('Data di-refresh!');
}

function adminSwitchTab(tab) {
  var sections = document.querySelectorAll('.tab-section');
  for (var i = 0; i < sections.length; i++) sections[i].style.display = 'none';
  if (tab !== 'main') {
    var el = document.getElementById('tab-' + tab);
    if (el) el.style.display = 'block';
  }
  currentTab = tab;
}

function adminRupiah(v) { return 'Rp ' + Number(v || 0).toLocaleString('id-ID'); }
function adminEsc(s) { return String(s || '').replace(/[&<>"']/g, function(c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c]; }); }
function adminToast(msg, type) {
  var t = document.getElementById('admin-toast');
  if (!t) { t = document.createElement('div'); t.id = 'admin-toast'; t.className = 'fixed top-20 right-4 z-50'; document.body.appendChild(t); }
  t.innerHTML = '<div class="rounded-xl px-4 py-3 text-sm font-bold text-white shadow-xl ' + (type === 'error' ? 'bg-red-500' : 'bg-orange-500') + '">' + msg + '</div>';
  setTimeout(function() { t.innerHTML = ''; }, 3000);
}

adminInit();
</script>
