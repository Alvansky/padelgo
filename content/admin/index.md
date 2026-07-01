---
title: "Admin Dashboard"
date: 2026-06-29
draft: false
layout: "admin"
---

<div class="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950">
<div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
<div class="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
<div>
<p class="text-sm font-extrabold uppercase tracking-wide text-teal-700 dark:text-teal-300">Admin Console</p>
<h1 class="mt-1 text-3xl font-extrabold text-slate-950 dark:text-white">PadelGo Operations</h1>
<p class="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">Kelola booking, approval, court, gambar lapangan, user, dan pendapatan dari satu dashboard.</p>
</div>
<div class="flex flex-wrap gap-2">
<button type="button" onclick="loadAdminData()" class="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-extrabold text-slate-700 shadow-sm hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">Refresh</button>
<a href="/order/" class="rounded-xl bg-teal-700 px-4 py-2 text-sm font-extrabold text-white shadow-sm hover:bg-teal-800">Lihat Booking Page</a>
</div>
</div>

<div class="mb-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-900">
<div class="flex min-w-max gap-2">
<button type="button" class="admin-tab rounded-xl bg-slate-950 px-4 py-2 text-sm font-extrabold text-white dark:bg-white dark:text-slate-950" data-tab="overview">Overview</button>
<button type="button" class="admin-tab rounded-xl px-4 py-2 text-sm font-extrabold text-slate-600 dark:text-slate-300" data-tab="bookings">Bookings</button>
<button type="button" class="admin-tab rounded-xl px-4 py-2 text-sm font-extrabold text-slate-600 dark:text-slate-300" data-tab="courts">Courts</button>
<button type="button" class="admin-tab rounded-xl px-4 py-2 text-sm font-extrabold text-slate-600 dark:text-slate-300" data-tab="finance">Finance</button>
<button type="button" class="admin-tab rounded-xl px-4 py-2 text-sm font-extrabold text-slate-600 dark:text-slate-300" data-tab="users">Users</button>
</div>
</div>

<p id="adminError" class="mb-6 hidden rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700 dark:bg-red-950/40 dark:text-red-300" role="alert"></p>
<p id="adminSuccess" class="mb-6 hidden rounded-xl bg-emerald-50 p-3 text-sm font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300" role="status"></p>

<section id="overview" class="admin-section space-y-6">
<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"><p class="text-xs font-bold uppercase text-slate-500">Bookings</p><p id="statTotal" class="mt-2 text-3xl font-extrabold text-slate-950 dark:text-white">-</p></div>
<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"><p class="text-xs font-bold uppercase text-slate-500">Pending</p><p id="statPending" class="mt-2 text-3xl font-extrabold text-amber-600">-</p></div>
<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"><p class="text-xs font-bold uppercase text-slate-500">Approved</p><p id="statApproved" class="mt-2 text-3xl font-extrabold text-emerald-600">-</p></div>
<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"><p class="text-xs font-bold uppercase text-slate-500">Revenue</p><p id="statRevenue" class="mt-2 text-2xl font-extrabold text-slate-950 dark:text-white">-</p></div>
<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"><p class="text-xs font-bold uppercase text-slate-500">Courts</p><p id="statCourts" class="mt-2 text-3xl font-extrabold text-slate-950 dark:text-white">-</p></div>
</div>
<div class="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
<div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
<div class="border-b border-slate-200 px-5 py-4 dark:border-slate-800"><h2 class="text-lg font-extrabold text-slate-950 dark:text-white">Recent Bookings</h2></div>
<div class="overflow-x-auto"><table class="w-full min-w-[760px]"><thead><tr class="bg-slate-50 text-left text-xs uppercase text-slate-500 dark:bg-slate-950"><th class="px-5 py-3">User</th><th class="px-5 py-3">Court</th><th class="px-5 py-3">Date</th><th class="px-5 py-3">Status</th><th class="px-5 py-3">Amount</th><th class="px-5 py-3">Action</th></tr></thead><tbody id="recentTable" class="divide-y divide-slate-100 dark:divide-slate-800"></tbody></table></div>
</div>
<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
<h2 class="text-lg font-extrabold text-slate-950 dark:text-white">Finance Snapshot</h2>
<div class="mt-4 space-y-3 text-sm">
<div class="flex justify-between rounded-xl bg-slate-50 p-3 dark:bg-slate-950"><span>Approved revenue</span><strong id="financeApproved">-</strong></div>
<div class="flex justify-between rounded-xl bg-slate-50 p-3 dark:bg-slate-950"><span>Pending pipeline</span><strong id="financePending">-</strong></div>
<div class="flex justify-between rounded-xl bg-slate-50 p-3 dark:bg-slate-950"><span>Cancelled value</span><strong id="financeCancelled">-</strong></div>
</div>
</div>
</div>
</section>

<section id="bookings" class="admin-section hidden">
<div class="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
<div><h2 class="text-2xl font-extrabold text-slate-950 dark:text-white">Booking Approval</h2><p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Klik centang hijau untuk approve. User akan melihat status approved.</p></div>
<div class="flex flex-wrap gap-2">
<select id="statusFilter" class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold dark:border-slate-700 dark:bg-slate-900"><option value="all">All Status</option><option value="pending">Pending</option><option value="approved">Approved</option><option value="cancelled">Cancelled</option></select>
<select id="courtFilter" class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold dark:border-slate-700 dark:bg-slate-900"><option value="all">All Courts</option></select>
</div>
</div>
<div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"><div class="overflow-x-auto"><table class="w-full min-w-[900px]"><thead><tr class="bg-slate-50 text-left text-xs uppercase text-slate-500 dark:bg-slate-950"><th class="px-5 py-3">User</th><th class="px-5 py-3">Court</th><th class="px-5 py-3">Date</th><th class="px-5 py-3">Time</th><th class="px-5 py-3">Status</th><th class="px-5 py-3">Amount</th><th class="px-5 py-3">Actions</th></tr></thead><tbody id="ordersTable" class="divide-y divide-slate-100 dark:divide-slate-800"></tbody></table></div></div>
</section>

<section id="courts" class="admin-section hidden">
<div class="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
<form id="courtForm" class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900" onsubmit="saveCourt(event)">
<h2 class="text-xl font-extrabold text-slate-950 dark:text-white">Tambah Lapangan</h2>
<p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Lapangan baru otomatis muncul di Home dan Booking.</p>
<div class="mt-5 space-y-4">
<div><label class="mb-1 block text-sm font-bold">Nama Lapangan</label><input id="courtName" required placeholder="Court C1" class="w-full rounded-xl border border-slate-200 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-950"></div>
<div><label class="mb-1 block text-sm font-bold">Harga per Jam</label><input id="courtPrice" required type="number" min="1" step="1000" placeholder="150000" class="w-full rounded-xl border border-slate-200 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-950"></div>
<div><label class="mb-1 block text-sm font-bold">Tipe</label><input id="courtType" placeholder="Premium indoor court" class="w-full rounded-xl border border-slate-200 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-950"></div>
<div><label class="mb-1 block text-sm font-bold">Surface</label><input id="courtSurface" placeholder="Artificial Grass" class="w-full rounded-xl border border-slate-200 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-950"></div>
<div><label class="mb-1 block text-sm font-bold">Gambar Lapangan</label><input id="courtImage" type="file" accept="image/*" class="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"></div>
<button id="courtSubmit" type="submit" class="w-full rounded-xl bg-teal-700 py-3 font-extrabold text-white hover:bg-teal-800">Simpan Lapangan</button>
</div>
</form>
<div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"><div class="overflow-x-auto"><table class="w-full min-w-[760px]"><thead><tr class="bg-slate-50 text-left text-xs uppercase text-slate-500 dark:bg-slate-950"><th class="px-5 py-3">Lapangan</th><th class="px-5 py-3">Harga</th><th class="px-5 py-3">Status</th><th class="px-5 py-3">Actions</th></tr></thead><tbody id="courtTable" class="divide-y divide-slate-100 dark:divide-slate-800"></tbody></table></div></div>
</div>
</section>

<section id="finance" class="admin-section hidden">
<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
<h2 class="text-2xl font-extrabold text-slate-950 dark:text-white">Keuangan</h2>
<div class="mt-5 grid gap-4 md:grid-cols-3"><div class="rounded-xl bg-emerald-50 p-4 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200"><p class="text-sm font-bold">Approved</p><p id="financeCardApproved" class="mt-2 text-2xl font-extrabold">-</p></div><div class="rounded-xl bg-amber-50 p-4 text-amber-800 dark:bg-amber-950/40 dark:text-amber-200"><p class="text-sm font-bold">Pending</p><p id="financeCardPending" class="mt-2 text-2xl font-extrabold">-</p></div><div class="rounded-xl bg-red-50 p-4 text-red-800 dark:bg-red-950/40 dark:text-red-200"><p class="text-sm font-bold">Cancelled</p><p id="financeCardCancelled" class="mt-2 text-2xl font-extrabold">-</p></div></div>
<div class="mt-6 overflow-x-auto"><table class="w-full min-w-[760px]"><thead><tr class="bg-slate-50 text-left text-xs uppercase text-slate-500 dark:bg-slate-950"><th class="px-5 py-3">Court</th><th class="px-5 py-3">Bookings</th><th class="px-5 py-3">Approved Revenue</th><th class="px-5 py-3">Pending Pipeline</th></tr></thead><tbody id="financeTable" class="divide-y divide-slate-100 dark:divide-slate-800"></tbody></table></div>
</div>
</section>

<section id="users" class="admin-section hidden">
<div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"><div class="border-b border-slate-200 px-5 py-4 dark:border-slate-800"><h2 class="text-xl font-extrabold text-slate-950 dark:text-white">Users</h2></div><div class="overflow-x-auto"><table class="w-full min-w-[760px]"><thead><tr class="bg-slate-50 text-left text-xs uppercase text-slate-500 dark:bg-slate-950"><th class="px-5 py-3">User</th><th class="px-5 py-3">Email</th><th class="px-5 py-3">Role</th><th class="px-5 py-3">Joined</th></tr></thead><tbody id="usersTable" class="divide-y divide-slate-100 dark:divide-slate-800"></tbody></table></div></div>
</section>
</div>
</div>

<script src="/js/shared.js"></script>
<script>
let allBookings = [];
let allCourts = [];
let allProfiles = [];
let profileById = new Map();

function rupiah(value) {
  return 'Rp ' + Number(value || 0).toLocaleString('id-ID');
}

function showAdminMessage(message, type = 'success') {
  const success = document.getElementById('adminSuccess');
  const error = document.getElementById('adminError');
  success.classList.add('hidden');
  error.classList.add('hidden');
  const target = type === 'error' ? error : success;
  target.textContent = message;
  target.classList.remove('hidden');
}

async function requireAdmin(supabase) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) { window.location.href = '/login/?next=/admin/'; return null; }
  const { data: profile, error } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();
  if (error || profile?.role !== 'admin') { window.location.href = '/dashboard/'; return null; }
  return session;
}

async function loadAdminData() {
  try {
    const supabase = await PadelGo.Supabase.init();
    if (!supabase) throw new Error('Supabase belum dikonfigurasi.');
    const session = await requireAdmin(supabase);
    if (!session) return;
    const [bookingsRes, courtsRes, profilesRes] = await Promise.all([
      supabase.from('bookings').select('*').order('date', { ascending: false }).order('start_time', { ascending: false }),
      supabase.from('courts').select('*').order('name', { ascending: true }),
      supabase.from('profiles').select('id, name, email, role, avatar_url, created_at').order('created_at', { ascending: false })
    ]);
    if (bookingsRes.error) throw new Error(bookingsRes.error.message);
    if (courtsRes.error) throw new Error(courtsRes.error.message);
    if (profilesRes.error) throw new Error(profilesRes.error.message);
    allBookings = bookingsRes.data || [];
    allCourts = courtsRes.data || [];
    allProfiles = profilesRes.data || [];
    profileById = new Map(allProfiles.map(profile => [profile.id, profile]));
    hydrateCourtFilter();
    renderAll();
  } catch (err) {
    showAdminMessage(err.message || 'Gagal memuat admin dashboard.', 'error');
  }
}

function renderAll() {
  const approved = allBookings.filter(b => b.status === 'approved' || b.status === 'confirmed');
  const pending = allBookings.filter(b => b.status === 'pending');
  const cancelled = allBookings.filter(b => b.status === 'cancelled');
  const approvedRevenue = approved.reduce((sum, b) => sum + Number(b.amount || 0), 0);
  const pendingRevenue = pending.reduce((sum, b) => sum + Number(b.amount || 0), 0);
  const cancelledRevenue = cancelled.reduce((sum, b) => sum + Number(b.amount || 0), 0);
  document.getElementById('statTotal').textContent = allBookings.length;
  document.getElementById('statPending').textContent = pending.length;
  document.getElementById('statApproved').textContent = approved.length;
  document.getElementById('statRevenue').textContent = rupiah(approvedRevenue);
  document.getElementById('statCourts').textContent = allCourts.filter(c => c.available).length;
  ['financeApproved', 'financeCardApproved'].forEach(id => document.getElementById(id).textContent = rupiah(approvedRevenue));
  ['financePending', 'financeCardPending'].forEach(id => document.getElementById(id).textContent = rupiah(pendingRevenue));
  ['financeCancelled', 'financeCardCancelled'].forEach(id => document.getElementById(id).textContent = rupiah(cancelledRevenue));
  renderBookings(allBookings.slice(0, 6), 'recentTable');
  filterBookings();
  renderCourts();
  renderFinance();
  renderUsers();
}

function hydrateCourtFilter() {
  const filter = document.getElementById('courtFilter');
  const current = filter.value || 'all';
  filter.innerHTML = '<option value="all">All Courts</option>' + allCourts.map(court => `<option value="${escapeHtml(court.id)}">${escapeHtml(court.name || court.id)}</option>`).join('');
  filter.value = [...filter.options].some(option => option.value === current) ? current : 'all';
}

function renderBookings(bookings, targetId) {
  const tbody = document.getElementById(targetId);
  if (!bookings.length) {
    tbody.innerHTML = `<tr><td colspan="${targetId === 'ordersTable' ? '7' : '6'}" class="px-5 py-10 text-center text-sm text-slate-500">Belum ada booking.</td></tr>`;
    return;
  }
  tbody.innerHTML = bookings.map(order => `
    <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/60">
      <td class="px-5 py-4">${renderUserCell(order.user_id)}</td>
      <td class="px-5 py-4"><span class="font-bold text-slate-900 dark:text-slate-100">${escapeHtml(order.court_name || order.court_id)}</span></td>
      <td class="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">${escapeHtml(order.date || '-')}</td>
      ${targetId === 'ordersTable' ? `<td class="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">${escapeHtml(order.start_time || '')} - ${escapeHtml(order.end_time || '')}</td>` : ''}
      <td class="px-5 py-4"><span class="inline-flex rounded-full px-2.5 py-1 text-xs font-extrabold ${statusClass(order.status)}">${statusLabel(order.status)}</span></td>
      <td class="px-5 py-4 font-extrabold text-slate-900 dark:text-slate-100">${rupiah(order.amount)}</td>
      <td class="px-5 py-4">${renderBookingActions(order)}</td>
    </tr>
  `).join('');
}

function renderBookingActions(order) {
  if (order.status === 'approved' || order.status === 'confirmed') {
    return '<span class="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-extrabold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-200">approved</span>';
  }
  if (order.status === 'cancelled') {
    return '<span class="inline-flex rounded-full bg-red-50 px-2.5 py-1 text-xs font-extrabold text-red-700 dark:bg-red-950/50 dark:text-red-200">cancelled</span>';
  }
  return `
    <div class="flex items-center gap-2">
      <button type="button" onclick="setBookingStatus('${escapeAttr(order.id)}','approved')" class="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-lg font-extrabold text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-200" title="Approve">✓</button>
      <button type="button" onclick="setBookingStatus('${escapeAttr(order.id)}','cancelled')" class="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-red-100 text-lg font-extrabold text-red-700 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-200" title="Cancel">×</button>
    </div>`;
}

async function setBookingStatus(bookingId, status) {
  if (status === 'cancelled' && !confirm('Batalkan booking ini?')) return;
  try {
    const supabase = await PadelGo.Supabase.init();
    const { error } = await supabase.from('bookings').update({ status }).eq('id', bookingId);
    if (error) throw new Error(error.message || 'Gagal update booking.');
    showAdminMessage(status === 'approved' ? 'Booking approved.' : 'Booking cancelled.');
    await loadAdminData();
  } catch (err) {
    showAdminMessage(err.message || 'Gagal update booking.', 'error');
  }
}

async function saveCourt(event) {
  event.preventDefault();
  const button = document.getElementById('courtSubmit');
  const name = document.getElementById('courtName').value.trim();
  const price = Number(document.getElementById('courtPrice').value);
  const type = document.getElementById('courtType').value.trim() || 'Padel court';
  const surface = document.getElementById('courtSurface').value.trim() || '';
  const image = document.getElementById('courtImage').files[0];
  if (!name || !price) return showAdminMessage('Nama lapangan dan harga wajib diisi.', 'error');
  button.disabled = true;
  button.textContent = 'Menyimpan...';
  try {
    const supabase = await PadelGo.Supabase.init();
    const session = await requireAdmin(supabase);
    if (!session) return;
    let imageUrl = '';
    if (image) {
      if (image.size > 5 * 1024 * 1024) throw new Error('Ukuran gambar maksimal 5MB.');
      const ext = image.name.split('.').pop() || 'jpg';
      const fileName = `${Date.now()}-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.${ext}`;
      const { error: uploadError } = await supabase.storage.from('court-images').upload(fileName, image, { upsert: true, cacheControl: '3600' });
      if (uploadError) throw new Error(uploadError.message || 'Gagal upload gambar lapangan.');
      imageUrl = supabase.storage.from('court-images').getPublicUrl(fileName).data?.publicUrl || '';
    }
    const id = name.toUpperCase().replace(/^COURT\s+/, '').replace(/[^A-Z0-9]+/g, '').slice(0, 12) || `C${Date.now()}`;
    const { error } = await supabase.from('courts').upsert({
      id,
      name,
      type,
      surface,
      price_per_hour: price,
      image_url: imageUrl || '/images/padel1.jpg',
      available: true
    }, { onConflict: 'id' });
    if (error) throw new Error(error.message || 'Gagal menyimpan lapangan.');
    document.getElementById('courtForm').reset();
    showAdminMessage('Lapangan berhasil ditambahkan.');
    await loadAdminData();
  } catch (err) {
    showAdminMessage(err.message || 'Gagal menyimpan lapangan.', 'error');
  } finally {
    button.disabled = false;
    button.textContent = 'Simpan Lapangan';
  }
}

async function toggleCourt(courtId, available) {
  try {
    const supabase = await PadelGo.Supabase.init();
    const { error } = await supabase.from('courts').update({ available }).eq('id', courtId);
    if (error) throw new Error(error.message);
    await loadAdminData();
  } catch (err) {
    showAdminMessage(err.message || 'Gagal update lapangan.', 'error');
  }
}

function renderCourts() {
  const tbody = document.getElementById('courtTable');
  if (!allCourts.length) {
    tbody.innerHTML = '<tr><td colspan="4" class="px-5 py-10 text-center text-sm text-slate-500">Belum ada lapangan.</td></tr>';
    return;
  }
  tbody.innerHTML = allCourts.map(court => `
    <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/60">
      <td class="px-5 py-4"><div class="flex items-center gap-3"><img src="${escapeAttr(court.image_url || '/images/padel1.jpg')}" alt="${escapeAttr(court.name || court.id)}" class="h-14 w-20 rounded-xl object-cover"><div><p class="font-extrabold text-slate-950 dark:text-white">${escapeHtml(court.name || court.id)}</p><p class="text-xs text-slate-500">${escapeHtml(court.type || court.surface || court.id)}</p></div></div></td>
      <td class="px-5 py-4 font-bold">${rupiah(court.price_per_hour)} / jam</td>
      <td class="px-5 py-4"><span class="rounded-full px-2.5 py-1 text-xs font-extrabold ${court.available ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}">${court.available ? 'Available' : 'Hidden'}</span></td>
      <td class="px-5 py-4"><button type="button" onclick="toggleCourt('${escapeAttr(court.id)}', ${court.available ? 'false' : 'true'})" class="rounded-lg border border-slate-200 px-3 py-2 text-xs font-extrabold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">${court.available ? 'Hide' : 'Show'}</button></td>
    </tr>`).join('');
}

function renderFinance() {
  const rows = allCourts.map(court => {
    const items = allBookings.filter(b => b.court_id === court.id);
    const approved = items.filter(b => b.status === 'approved' || b.status === 'confirmed').reduce((sum, b) => sum + Number(b.amount || 0), 0);
    const pending = items.filter(b => b.status === 'pending').reduce((sum, b) => sum + Number(b.amount || 0), 0);
    return `<tr><td class="px-5 py-4 font-extrabold">${escapeHtml(court.name || court.id)}</td><td class="px-5 py-4">${items.length}</td><td class="px-5 py-4 font-bold">${rupiah(approved)}</td><td class="px-5 py-4 font-bold">${rupiah(pending)}</td></tr>`;
  });
  document.getElementById('financeTable').innerHTML = rows.join('') || '<tr><td colspan="4" class="px-5 py-10 text-center text-sm text-slate-500">Belum ada data.</td></tr>';
}

function renderUsers() {
  const tbody = document.getElementById('usersTable');
  tbody.innerHTML = allProfiles.map(profile => `
    <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/60">
      <td class="px-5 py-4">${renderUserCell(profile.id)}</td>
      <td class="px-5 py-4">${escapeHtml(profile.email || '-')}</td>
      <td class="px-5 py-4"><span class="rounded-full px-2.5 py-1 text-xs font-extrabold ${profile.role === 'admin' ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-700'}">${escapeHtml(profile.role || 'user')}</span></td>
      <td class="px-5 py-4 text-sm text-slate-500">${escapeHtml(PadelGo.Format.date(String(profile.created_at || '').slice(0, 10)))}</td>
    </tr>`).join('');
}

function renderUserCell(userId) {
  const profile = profileById.get(userId);
  const label = profile?.name || profile?.email || userId || 'User';
  const sub = profile?.email && profile?.name ? profile.email : userId || '';
  const avatar = profile?.avatar_url || PadelGo.UI.defaultAvatar();
  return `<div class="flex items-center gap-3"><img src="${escapeAttr(avatar)}" alt="${escapeAttr(label)}" class="h-10 w-10 rounded-full object-cover"><div><p class="font-extrabold text-slate-950 dark:text-white">${escapeHtml(label)}</p><p class="max-w-[220px] truncate text-xs text-slate-500">${escapeHtml(sub)}</p></div></div>`;
}

function filterBookings() {
  const status = document.getElementById('statusFilter').value;
  const court = document.getElementById('courtFilter').value;
  const filtered = allBookings.filter(b => {
    const normalizedStatus = b.status === 'confirmed' ? 'approved' : b.status;
    return (status === 'all' || normalizedStatus === status) && (court === 'all' || b.court_id === court);
  });
  renderBookings(filtered, 'ordersTable');
}

function statusLabel(status) {
  if (status === 'approved' || status === 'confirmed') return 'approved';
  if (status === 'pending') return 'pending';
  return 'cancelled';
}

function statusClass(status) {
  if (status === 'approved' || status === 'confirmed') return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200';
  if (status === 'pending') return 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200';
  return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200';
}

function escapeHtml(text) {
  const map = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'};
  return String(text || '').replace(/[&<>"']/g, m => map[m]);
}

function escapeAttr(text) {
  return escapeHtml(text).replace(/`/g, '&#096;');
}

document.querySelectorAll('.admin-tab').forEach(button => {
  button.addEventListener('click', () => {
    const tab = button.dataset.tab;
    document.querySelectorAll('.admin-section').forEach(section => section.classList.toggle('hidden', section.id !== tab));
    document.querySelectorAll('.admin-tab').forEach(item => {
      item.classList.toggle('bg-slate-950', item === button);
      item.classList.toggle('text-white', item === button);
      item.classList.toggle('dark:bg-white', item === button);
      item.classList.toggle('dark:text-slate-950', item === button);
      item.classList.toggle('text-slate-600', item !== button);
      item.classList.toggle('dark:text-slate-300', item !== button);
    });
  });
});

document.getElementById('statusFilter').addEventListener('change', filterBookings);
document.getElementById('courtFilter').addEventListener('change', filterBookings);
document.addEventListener('DOMContentLoaded', loadAdminData);
</script>
