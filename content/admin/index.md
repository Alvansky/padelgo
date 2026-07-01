---
title: "Admin Dashboard"
date: 2026-06-29
draft: false
layout: "admin"
---

<div class="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950">
<div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

<!-- Header -->
<div class="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
<div>
<p class="text-sm font-extrabold uppercase tracking-wide text-teal-700 dark:text-teal-300">Admin Console</p>
<h1 class="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">PadelGo Operations</h1>
<p class="mt-1 sm:mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">Kelola booking, approval, court, gambar lapangan, user, dan pendapatan dari satu dashboard.</p>
</div>
<div class="flex flex-wrap gap-2">
<button type="button" id="refreshBtn" onclick="refreshData()" class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-extrabold text-slate-700 shadow-sm hover:bg-slate-100 active:scale-95 transition dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
<svg id="refreshIcon" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
<span class="hidden sm:inline">Refresh</span>
</button>
<button type="button" onclick="openAdminBookingModal()" class="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-4 py-2 text-sm font-extrabold text-white shadow-sm hover:bg-teal-800 active:scale-95 transition">
<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
<span class="hidden sm:inline">Booking Manual</span>
<span class="sm:hidden">Manual</span>
</button>
<a href="/order/" class="rounded-xl bg-slate-100 px-4 py-2 text-sm font-extrabold text-slate-700 shadow-sm hover:bg-slate-200 active:scale-95 transition dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">Lihat Page</a>
</div>
</div>

<!-- Tabs -->
<div class="mb-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-900">
<div class="flex min-w-max gap-2">
<button type="button" class="admin-tab rounded-xl bg-slate-950 px-3 sm:px-4 py-2 text-xs sm:text-sm font-extrabold text-white dark:bg-white dark:text-slate-950 whitespace-nowrap" data-tab="overview">📅 Overview</button>
<button type="button" class="admin-tab rounded-xl px-3 sm:px-4 py-2 text-xs sm:text-sm font-extrabold text-slate-600 dark:text-slate-300 whitespace-nowrap" data-tab="bookings">📋 Bookings</button>
<button type="button" class="admin-tab rounded-xl px-3 sm:px-4 py-2 text-xs sm:text-sm font-extrabold text-slate-600 dark:text-slate-300 whitespace-nowrap" data-tab="courts">🏀 Courts</button>
<button type="button" class="admin-tab rounded-xl px-3 sm:px-4 py-2 text-xs sm:text-sm font-extrabold text-slate-600 dark:text-slate-300 whitespace-nowrap" data-tab="finance">💰 Finance</button>
<button type="button" class="admin-tab rounded-xl px-3 sm:px-4 py-2 text-xs sm:text-sm font-extrabold text-slate-600 dark:text-slate-300 whitespace-nowrap" data-tab="users">👥 Users</button>
</div>
</div>

<!-- Messages -->
<p id="adminError" class="mb-4 sm:mb-6 hidden rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700 dark:bg-red-950/40 dark:text-red-300" role="alert"></p>
<p id="adminSuccess" class="mb-4 sm:mb-6 hidden rounded-xl bg-emerald-50 p-3 text-sm font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300" role="status"></p>

<!-- Overview Tab -->
<section id="overview" class="admin-section space-y-6">

<!-- Stats Cards -->
<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
<div class="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
<p class="text-[10px] sm:text-xs font-bold uppercase text-slate-500">Bookings</p>
<p id="statTotal" class="mt-1 sm:mt-2 text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">-</p>
</div>
<div class="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
<p class="text-[10px] sm:text-xs font-bold uppercase text-slate-500">Pending</p>
<p id="statPending" class="mt-1 sm:mt-2 text-2xl sm:text-3xl font-extrabold text-amber-600">-</p>
</div>
<div class="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
<p class="text-[10px] sm:text-xs font-bold uppercase text-slate-500">Approved</p>
<p id="statApproved" class="mt-1 sm:mt-2 text-2xl sm:text-3xl font-extrabold text-emerald-600">-</p>
</div>
<div class="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
<p class="text-[10px] sm:text-xs font-bold uppercase text-slate-500">Revenue</p>
<p id="statRevenue" class="mt-1 sm:mt-2 text-lg sm:text-2xl font-extrabold text-slate-950 dark:text-white">-</p>
</div>
<div class="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
<p class="text-[10px] sm:text-xs font-bold uppercase text-slate-500">Courts</p>
<p id="statCourts" class="mt-1 sm:mt-2 text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">-</p>
</div>
</div>

<!-- Calendar View -->
<div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
<div class="flex items-center justify-between border-b border-slate-200 px-4 sm:px-6 py-4 dark:border-slate-800">
<h2 class="text-lg font-extrabold text-slate-950 dark:text-white flex items-center gap-2">
<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
Calendar Booking
</h2>
<div class="flex items-center gap-2">
<button type="button" onclick="changeMonth(-1)" class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
</button>
<span id="calendarMonth" class="font-bold text-slate-900 dark:text-white min-w-[140px] text-center text-sm sm:text-base"></span>
<button type="button" onclick="changeMonth(1)" class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
</button>
</div>
</div>
<div class="p-3 sm:p-4">
<!-- Calendar Grid -->
<div class="grid grid-cols-7 gap-1 sm:gap-2">
<div class="text-center text-[10px] sm:text-xs font-bold text-slate-500 py-2">Min</div>
<div class="text-center text-[10px] sm:text-xs font-bold text-slate-500 py-2">Sen</div>
<div class="text-center text-[10px] sm:text-xs font-bold text-slate-500 py-2">Sel</div>
<div class="text-center text-[10px] sm:text-xs font-bold text-slate-500 py-2">Rab</div>
<div class="text-center text-[10px] sm:text-xs font-bold text-slate-500 py-2">Kam</div>
<div class="text-center text-[10px] sm:text-xs font-bold text-slate-500 py-2">Jum</div>
<div class="text-center text-[10px] sm:text-xs font-bold text-slate-500 py-2">Sab</div>
</div>
<div id="calendarGrid" class="grid grid-cols-7 gap-1 sm:gap-2"></div>
<!-- Legend -->
<div class="mt-4 flex flex-wrap items-center justify-center gap-3 text-[10px] sm:text-xs text-slate-600 dark:text-slate-400">
<span class="flex items-center gap-1"><span class="h-2.5 w-2.5 rounded-full bg-emerald-500"></span> Approved</span>
<span class="flex items-center gap-1"><span class="h-2.5 w-2.5 rounded-full bg-amber-500"></span> Pending</span>
<span class="flex items-center gap-1"><span class="h-2.5 w-2.5 rounded-full bg-red-500"></span> Cancelled</span>
</div>
</div>
</div>

<!-- Recent Bookings & Finance -->
<div class="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
<div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
<div class="border-b border-slate-200 px-4 sm:px-5 py-3 sm:py-4 dark:border-slate-800 flex items-center justify-between">
<h2 class="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">Recent Bookings</h2>
<button type="button" onclick="switchTab('bookings')" class="text-xs font-bold text-teal-600 hover:text-teal-800 dark:text-teal-400">Lihat semua →</button>
</div>
<div class="overflow-x-auto"><table class="w-full min-w-[700px]"><thead><tr class="bg-slate-50 text-left text-[10px] sm:text-xs uppercase text-slate-500 dark:bg-slate-950"><th class="px-3 sm:px-5 py-2 sm:py-3">User</th><th class="px-3 sm:px-5 py-2 sm:py-3">Court</th><th class="px-3 sm:px-5 py-2 sm:py-3 hidden sm:table-cell">Date</th><th class="px-3 sm:px-5 py-2 sm:py-3">Status</th><th class="px-3 sm:px-5 py-2 sm:py-3">Amount</th><th class="px-3 sm:px-5 py-2 sm:py-3">Action</th></tr></thead><tbody id="recentTable" class="divide-y divide-slate-100 dark:divide-slate-800"></tbody></table></div>
</div>
<div class="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
<h2 class="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white flex items-center gap-2">
<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
Finance Snapshot
</h2>
<div class="mt-3 sm:mt-4 space-y-2 sm:space-y-3 text-xs sm:text-sm">
<div class="flex justify-between rounded-xl bg-emerald-50 p-3 dark:bg-emerald-950/30"><span>Approved revenue</span><strong id="financeApproved" class="font-extrabold">-</strong></div>
<div class="flex justify-between rounded-xl bg-amber-50 p-3 dark:bg-amber-950/30"><span>Pending pipeline</span><strong id="financePending" class="font-extrabold">-</strong></div>
<div class="flex justify-between rounded-xl bg-red-50 p-3 dark:bg-red-950/30"><span>Cancelled value</span><strong id="financeCancelled" class="font-extrabold">-</strong></div>
</div>
</div>
</div>
</section>

<!-- Bookings Tab -->
<section id="bookings" class="admin-section hidden">
<div class="mb-4 sm:mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
<div>
<h2 class="text-xl font-extrabold text-slate-950 dark:text-white">Booking Approval</h2>
<p class="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">Klik centang hijau untuk approve. User akan melihat status approved.</p>
</div>
<div class="flex flex-wrap gap-2">
<select id="statusFilter" class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm font-bold dark:border-slate-700 dark:bg-slate-900">
<option value="all">All Status</option>
<option value="pending">Pending</option>
<option value="approved">Approved</option>
<option value="cancelled">Cancelled</option>
</select>
<select id="courtFilter" class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm font-bold dark:border-slate-700 dark:bg-slate-900">
<option value="all">All Courts</option>
</select>
</div>
</div>
<div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
<div class="overflow-x-auto">
<table class="w-full min-w-[900px]">
<thead>
<tr class="bg-slate-50 text-left text-[10px] sm:text-xs uppercase text-slate-500 dark:bg-slate-950">
<th class="px-4 sm:px-5 py-3">User</th>
<th class="px-4 sm:px-5 py-3">Court</th>
<th class="px-4 sm:px-5 py-3">Date</th>
<th class="px-4 sm:px-5 py-3">Time</th>
<th class="px-4 sm:px-5 py-3">Status</th>
<th class="px-4 sm:px-5 py-3">Amount</th>
<th class="px-4 sm:px-5 py-3">Actions</th>
</tr>
</thead>
<tbody id="ordersTable" class="divide-y divide-slate-100 dark:divide-slate-800"></tbody>
</table>
</div>
</div>
</section>

<!-- Courts Tab -->
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
<div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
<div class="overflow-x-auto">
<table class="w-full min-w-[760px]">
<thead>
<tr class="bg-slate-50 text-left text-[10px] sm:text-xs uppercase text-slate-500 dark:bg-slate-950">
<th class="px-4 sm:px-5 py-3">Lapangan</th>
<th class="px-4 sm:px-5 py-3">Harga</th>
<th class="px-4 sm:px-5 py-3">Status</th>
<th class="px-4 sm:px-5 py-3">Actions</th>
</tr>
</thead>
<tbody id="courtTable" class="divide-y divide-slate-100 dark:divide-slate-800"></tbody>
</table>
</div>
</div>
</div>
</section>

<!-- Finance Tab -->
<section id="finance" class="admin-section hidden">
<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
<h2 class="text-2xl font-extrabold text-slate-950 dark:text-white">Keuangan</h2>
<div class="mt-5 grid gap-4 md:grid-cols-3">
<div class="rounded-xl bg-emerald-50 p-4 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200"><p class="text-sm font-bold">Approved</p><p id="financeCardApproved" class="mt-2 text-2xl font-extrabold">-</p></div>
<div class="rounded-xl bg-amber-50 p-4 text-amber-800 dark:bg-amber-950/40 dark:text-amber-200"><p class="text-sm font-bold">Pending</p><p id="financeCardPending" class="mt-2 text-2xl font-extrabold">-</p></div>
<div class="rounded-xl bg-red-50 p-4 text-red-800 dark:bg-red-950/40 dark:text-red-200"><p class="text-sm font-bold">Cancelled</p><p id="financeCardCancelled" class="mt-2 text-2xl font-extrabold">-</p></div>
</div>
<div class="mt-6 overflow-x-auto">
<table class="w-full min-w-[760px]">
<thead>
<tr class="bg-slate-50 text-left text-[10px] sm:text-xs uppercase text-slate-500 dark:bg-slate-950">
<th class="px-4 sm:px-5 py-3">Court</th>
<th class="px-4 sm:px-5 py-3">Bookings</th>
<th class="px-4 sm:px-5 py-3">Approved Revenue</th>
<th class="px-4 sm:px-5 py-3">Pending Pipeline</th>
</tr>
</thead>
<tbody id="financeTable" class="divide-y divide-slate-100 dark:divide-slate-800"></tbody>
</table>
</div>
</div>
</section>

<!-- Users Tab -->
<section id="users" class="admin-section hidden">
<div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
<div class="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
<h2 class="text-xl font-extrabold text-slate-950 dark:text-white">Users</h2>
</div>
<div class="overflow-x-auto">
<table class="w-full min-w-[760px]">
<thead>
<tr class="bg-slate-50 text-left text-[10px] sm:text-xs uppercase text-slate-500 dark:bg-slate-950">
<th class="px-4 sm:px-5 py-3">User</th>
<th class="px-4 sm:px-5 py-3">Email</th>
<th class="px-4 sm:px-5 py-3">Role</th>
<th class="px-4 sm:px-5 py-3">Joined</th>
</tr>
</thead>
<tbody id="usersTable" class="divide-y divide-slate-100 dark:divide-slate-800"></tbody>
</table>
</div>
</div>
</section>

</div>
</div>

<!-- Day Detail Modal -->
<div id="dayModal" class="fixed inset-0 z-50 hidden">
<div class="absolute inset-0 bg-black/50 backdrop-blur-sm" onclick="closeDayModal()"></div>
<div class="absolute inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-2xl max-h-[85vh] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 flex flex-col">
<div class="flex items-center justify-between border-b border-slate-200 px-4 sm:px-6 py-4 dark:border-slate-800">
<div>
<h3 id="dayModalTitle" class="text-lg font-extrabold text-slate-950 dark:text-white">Booking Details</h3>
<p id="dayModalSubtitle" class="text-sm text-slate-500 dark:text-slate-400"></p>
</div>
<button type="button" onclick="closeDayModal()" class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
</button>
</div>
<div id="dayModalContent" class="flex-1 overflow-y-auto p-4 sm:p-6"></div>
<div class="border-t border-slate-200 px-4 sm:px-6 py-4 dark:border-slate-800 flex justify-end">
<button type="button" onclick="closeDayModal()" class="rounded-xl bg-slate-100 px-4 py-2 text-sm font-extrabold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">Tutup</button>
</div>
</div>
</div>

<!-- Edit Booking Modal -->
<div id="editModal" class="fixed inset-0 z-50 hidden">
<div class="absolute inset-0 bg-black/50 backdrop-blur-sm" onclick="closeEditModal()"></div>
<div class="absolute inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
<div class="flex items-center justify-between border-b border-slate-200 px-4 sm:px-6 py-4 dark:border-slate-800">
<h3 class="text-lg font-extrabold text-slate-950 dark:text-white">Edit Booking</h3>
<button type="button" onclick="closeEditModal()" class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
</button>
</div>
<form id="editBookingForm" onsubmit="submitEditBooking(event)" class="p-4 sm:p-6 space-y-4">
<input type="hidden" id="editBookingId">
<div>
<label class="mb-1 block text-sm font-bold">Tanggal</label>
<input id="editDate" type="date" required class="w-full rounded-xl border border-slate-200 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-950">
</div>
<div>
<label class="mb-1 block text-sm font-bold">Court</label>
<select id="editCourt" required class="w-full rounded-xl border border-slate-200 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-950"></select>
</div>
<div class="grid grid-cols-2 gap-3">
<div>
<label class="mb-1 block text-sm font-bold">Jam Mulai</label>
<select id="editStartTime" required class="w-full rounded-xl border border-slate-200 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-950"></select>
</div>
<div>
<label class="mb-1 block text-sm font-bold">Durasi (Jam)</label>
<select id="editDuration" required class="w-full rounded-xl border border-slate-200 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-950">
<option value="1">1 Jam</option>
<option value="2">2 Jam</option>
<option value="3">3 Jam</option>
<option value="4">4 Jam</option>
</select>
</div>
</div>
<div>
<label class="mb-1 block text-sm font-bold">Catatan / Usher</label>
<input id="editNotes" type="text" placeholder="Nama usher atau catatan khusus" class="w-full rounded-xl border border-slate-200 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-950">
</div>
<div class="flex gap-3 pt-2">
<button type="submit" class="flex-1 rounded-xl bg-teal-700 py-3 font-extrabold text-white hover:bg-teal-800">Simpan</button>
<button type="button" onclick="deleteCurrentBooking()" class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-extrabold text-red-700 hover:bg-red-100 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300">Hapus</button>
</div>
</form>
</div>
</div>

<!-- Admin Manual Booking Modal -->
<div id="adminBookingModal" class="fixed inset-0 z-50 hidden overflow-y-auto">
<div class="absolute inset-0 bg-black/50 backdrop-blur-sm" onclick="closeAdminBookingModal()"></div>
<div class="absolute inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
<div class="flex items-center justify-between border-b border-slate-200 px-4 sm:px-6 py-4 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-900">
<div>
<h3 class="text-lg font-extrabold text-slate-950 dark:text-white">Booking Manual (Admin)</h3>
<p class="text-sm text-slate-500 dark:text-slate-400">Buat booking untuk customer</p>
</div>
<button type="button" onclick="closeAdminBookingModal()" class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
</button>
</div>
<form id="adminBookingForm" onsubmit="submitAdminBooking(event)" class="p-4 sm:p-6 space-y-5">
<!-- Customer Info -->
<div class="rounded-xl border border-teal-100 bg-teal-50 p-4 dark:border-teal-900/60 dark:bg-teal-950/20">
<h4 class="font-extrabold text-teal-800 dark:text-teal-200 mb-3 flex items-center gap-2">
<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
Data Customer
</h4>
<div class="space-y-3">
<div>
<label class="mb-1 block text-xs font-bold text-teal-700 dark:text-teal-300">Nama Customer *</label>
<input id="adminCustomerName" type="text" required placeholder="Nama lengkap" class="w-full rounded-lg border border-teal-200 bg-white px-3 py-2 dark:border-teal-800 dark:bg-slate-950">
</div>
<div>
<label class="mb-1 block text-xs font-bold text-teal-700 dark:text-teal-300">Email *</label>
<input id="adminCustomerEmail" type="email" required placeholder="email@example.com" class="w-full rounded-lg border border-teal-200 bg-white px-3 py-2 dark:border-teal-800 dark:bg-slate-950">
</div>
<div>
<label class="mb-1 block text-xs font-bold text-teal-700 dark:text-teal-300">No. HP *</label>
<input id="adminCustomerPhone" type="tel" required placeholder="08xxxxxxxxxx" class="w-full rounded-lg border border-teal-200 bg-white px-3 py-2 dark:border-teal-800 dark:bg-slate-950">
</div>
</div>
</div>

<!-- Booking Info -->
<div class="space-y-4">
<div>
<label class="mb-1 block text-sm font-bold">Tanggal</label>
<input id="adminBookingDate" type="date" required class="w-full rounded-xl border border-slate-200 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-950">
</div>
<div>
<label class="mb-2 block text-sm font-bold">Court</label>
<div id="adminCourtGrid" class="grid grid-cols-2 gap-2"></div>
<input type="hidden" id="adminBookingCourt" required>
</div>
<div>
<label class="mb-2 block text-sm font-bold">Durasi</label>
<div class="flex gap-2" id="adminDurationGrid">
<button type="button" data-hours="1" class="admin-duration-btn flex-1 rounded-xl border border-slate-200 py-2 text-sm font-extrabold text-slate-600 dark:border-slate-700 dark:text-slate-300">1 Jam</button>
<button type="button" data-hours="2" class="admin-duration-btn flex-1 rounded-xl border border-slate-200 py-2 text-sm font-extrabold text-slate-600 dark:border-slate-700 dark:text-slate-300">2 Jam</button>
<button type="button" data-hours="3" class="admin-duration-btn flex-1 rounded-xl border border-slate-200 py-2 text-sm font-extrabold text-slate-600 dark:border-slate-700 dark:text-slate-300">3 Jam</button>
<button type="button" data-hours="4" class="admin-duration-btn flex-1 rounded-xl border border-slate-200 py-2 text-sm font-extrabold text-slate-600 dark:border-slate-700 dark:text-slate-300">4 Jam</button>
</div>
<input type="hidden" id="adminBookingDuration" value="1">
</div>
<div>
<label class="mb-2 block text-sm font-bold">Waktu Mulai</label>
<div id="adminTimeGrid" class="grid grid-cols-6 gap-2"></div>
<input type="hidden" id="adminBookingTime" required>
</div>
<div id="adminBookingSummary" class="hidden rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-500/30 dark:bg-emerald-500/10">
<p class="text-center text-sm font-extrabold text-emerald-800 dark:text-emerald-200" id="adminSummaryText"></p>
</div>
</div>

<p id="adminBookingError" class="hidden rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700 dark:bg-red-950/40 dark:text-red-300" role="alert"></p>
<button type="submit" class="w-full rounded-xl bg-teal-700 py-3.5 text-base font-extrabold text-white shadow-lg shadow-teal-700/20 hover:bg-teal-800">Buat Booking (Approved)</button>
</form>
</div>
</div>

<script src="/js/shared.js"></script>
<script>
// State
let allBookings = [];
let allCourts = [];
let allProfiles = [];
let profileById = new Map();
let currentCalendarDate = new Date();
let adminSelectedCourt = null;
let adminSelectedDuration = 1;
let adminSelectedTime = null;
let adminBookedSlots = {};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadAdminData();
  initAdminBookingModal();
});

// Tab switching
document.querySelectorAll('.admin-tab').forEach(button => {
  button.addEventListener('click', () => {
    const tab = button.dataset.tab;
    switchTab(tab);
  });
});

function switchTab(tab) {
  document.querySelectorAll('.admin-section').forEach(section => section.classList.toggle('hidden', section.id !== tab));
  document.querySelectorAll('.admin-tab').forEach(item => {
    const isActive = item.dataset.tab === tab;
    item.classList.toggle('bg-slate-950', isActive);
    item.classList.toggle('text-white', isActive);
    item.classList.toggle('dark:bg-white', isActive);
    item.classList.toggle('dark:text-slate-950', isActive);
    item.classList.toggle('text-slate-600', !isActive);
    item.classList.toggle('dark:text-slate-300', !isActive);
  });
  if (tab === 'overview') {
    renderCalendar(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth());
  }
}

document.getElementById('statusFilter').addEventListener('change', filterBookings);
document.getElementById('courtFilter').addEventListener('change', filterBookings);

// Refresh Data
async function refreshData() {
  const btn = document.getElementById('refreshBtn');
  const icon = document.getElementById('refreshIcon');
  btn.disabled = true;
  icon.classList.add('animate-spin');
  try {
    await loadAdminData();
    PadelGo.UI.toast('Data berhasil di-refresh!');
  } finally {
    btn.disabled = false;
    icon.classList.remove('animate-spin');
  }
}

// Main Data Loader
async function loadAdminData() {
  try {
    const supabase = await PadelGo.Supabase.init();
    if (!supabase) throw new Error('Supabase belum dikonfigurasi.');
    const session = await requireAdmin(supabase);
    if (!session) return;

    const [bookingsRes, courtsRes, profilesRes] = await Promise.all([
      supabase.from('bookings').select('*').order('date', { ascending: false }).order('start_time', { ascending: false }),
      supabase.from('courts').select('*').order('name', { ascending: true }),
      supabase.from('profiles').select('id, name, email, role, avatar_url, created_at, phone').order('created_at', { ascending: false })
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
  renderCalendar(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth());
}

// Calendar Functions
function changeMonth(delta) {
  currentCalendarDate.setMonth(currentCalendarDate.getMonth() + delta);
  renderCalendar(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth());
}

function renderCalendar(year, month) {
  const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

  document.getElementById('calendarMonth').textContent = `${monthNames[month]} ${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  // Group bookings by date
  const bookingsByDate = {};
  allBookings.forEach(b => {
    if (!bookingsByDate[b.date]) bookingsByDate[b.date] = { approved: 0, pending: 0, cancelled: 0 };
    if (b.status === 'approved' || b.status === 'confirmed') bookingsByDate[b.date].approved++;
    else if (b.status === 'pending') bookingsByDate[b.date].pending++;
    else if (b.status === 'cancelled') bookingsByDate[b.date].cancelled++;
  });

  let html = '';

  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    html += '<div class="aspect-square"></div>';
  }

  // Days
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const isToday = dateStr === todayStr;
    const bookings = bookingsByDate[dateStr] || {};
    const totalBookings = (bookings.approved || 0) + (bookings.pending || 0) + (bookings.cancelled || 0);
    const hasBookings = totalBookings > 0;

    html += `
      <button type="button" onclick="showDayModal('${dateStr}')"
        class="aspect-square flex flex-col items-center justify-center rounded-lg border p-1 sm:p-2 transition hover:border-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/20 ${isToday ? 'border-teal-500 bg-teal-50 dark:border-teal-400 dark:bg-teal-900/30' : 'border-slate-200 dark:border-slate-700'} ${hasBookings ? 'cursor-pointer' : 'opacity-50'}">
        <span class="text-xs sm:text-sm font-bold ${isToday ? 'text-teal-700 dark:text-teal-300' : 'text-slate-700 dark:text-slate-300'}">${day}</span>
        ${hasBookings ? `
          <div class="flex gap-0.5 mt-1">
            ${bookings.approved > 0 ? `<span class="h-1.5 w-1.5 rounded-full bg-emerald-500" title="${bookings.approved} approved"></span>` : ''}
            ${bookings.pending > 0 ? `<span class="h-1.5 w-1.5 rounded-full bg-amber-500" title="${bookings.pending} pending"></span>` : ''}
            ${bookings.cancelled > 0 ? `<span class="h-1.5 w-1.5 rounded-full bg-red-500" title="${bookings.cancelled} cancelled"></span>` : ''}
          </div>
        ` : ''}
      </button>
    `;
  }

  document.getElementById('calendarGrid').innerHTML = html;
}

function showDayModal(dateStr) {
  const dayBookings = allBookings.filter(b => b.date === dateStr);
  const modal = document.getElementById('dayModal');
  const title = document.getElementById('dayModalTitle');
  const subtitle = document.getElementById('dayModalSubtitle');
  const content = document.getElementById('dayModalContent');

  const dateObj = new Date(dateStr + 'T00:00:00');
  const formattedDate = dateObj.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  title.textContent = `Booking ${formattedDate}`;
  subtitle.textContent = `${dayBookings.length} booking`;

  if (dayBookings.length === 0) {
    content.innerHTML = `
      <div class="text-center py-12">
        <svg class="h-16 w-16 mx-auto text-slate-300 dark:text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
        <p class="text-slate-500 dark:text-slate-400">Tidak ada booking di tanggal ini</p>
      </div>
    `;
  } else {
    content.innerHTML = `
      <div class="space-y-3">
        ${dayBookings.map(booking => {
          const profile = profileById.get(booking.user_id);
          const customerName = profile?.name || profile?.email || 'User';
          return `
            <div class="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
              <div class="flex items-start justify-between gap-3">
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="font-extrabold text-slate-900 dark:text-white">${escapeHtml(booking.court_name || booking.court_id)}</span>
                    <span class="inline-flex rounded-full px-2 py-0.5 text-[10px] font-extrabold ${statusClass(booking.status)}">${statusLabel(booking.status)}</span>
                  </div>
                  <p class="text-sm text-slate-600 dark:text-slate-300">🕐 ${escapeHtml(booking.start_time)} - ${escapeHtml(booking.end_time)}</p>
                  <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">👤 ${escapeHtml(customerName)}</p>
                  <p class="text-sm font-extrabold text-teal-700 dark:text-teal-300 mt-1">${rupiah(booking.amount)}</p>
                </div>
                <div class="flex flex-col gap-1">
                  ${booking.status === 'pending' ? `
                    <button type="button" onclick="setBookingStatus('${escapeAttr(booking.id)}','approved'); closeDayModal();" class="p-2 rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-200" title="Approve">
                      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    </button>
                  ` : ''}
                  ${booking.status !== 'cancelled' ? `
                    <button type="button" onclick="setBookingStatus('${escapeAttr(booking.id)}','cancelled'); closeDayModal();" class="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-200" title="Cancel">
                      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                  ` : ''}
                  <button type="button" onclick="openEditModal('${escapeAttr(booking.id)}'); closeDayModal();" class="p-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-200" title="Edit">
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                  </button>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  modal.classList.remove('hidden');
}

function closeDayModal() {
  document.getElementById('dayModal').classList.add('hidden');
}

// Edit Booking Modal
function openEditModal(bookingId) {
  const booking = allBookings.find(b => b.id === bookingId);
  if (!booking) return;

  document.getElementById('editBookingId').value = bookingId;
  document.getElementById('editDate').value = booking.date;
  document.getElementById('editNotes').value = booking.notes || '';

  // Populate courts
  const courtSelect = document.getElementById('editCourt');
  courtSelect.innerHTML = allCourts.map(c => `<option value="${escapeAttr(c.id)}" ${c.id === booking.court_id ? 'selected' : ''}>${escapeHtml(c.name || c.id)}</option>`).join('');

  // Populate times
  const timeSelect = document.getElementById('editStartTime');
  timeSelect.innerHTML = '';
  for (let h = 0; h < 24; h++) {
    const label = `${String(h).padStart(2, '0')}:00`;
    timeSelect.innerHTML += `<option value="${label}" ${label === booking.start_time ? 'selected' : ''}>${label}</option>`;
  }

  // Set duration
  const duration = booking.duration_hours || 1;
  document.getElementById('editDuration').value = duration;

  document.getElementById('editModal').classList.remove('hidden');
}

function closeEditModal() {
  document.getElementById('editModal').classList.add('hidden');
}

async function submitEditBooking(e) {
  e.preventDefault();
  const bookingId = document.getElementById('editBookingId').value;
  const date = document.getElementById('editDate').value;
  const courtId = document.getElementById('editCourt').value;
  const startTime = document.getElementById('editStartTime').value;
  const duration = parseInt(document.getElementById('editDuration').value);
  const endHour = parseInt(startTime.split(':')[0]) + duration;
  const endTime = `${String(endHour).padStart(2, '0')}:00`;
  const notes = document.getElementById('editNotes').value;

  try {
    const supabase = await PadelGo.Supabase.init();
    if (!supabase) throw new Error('Supabase belum dikonfigurasi');

    const { data: court } = await supabase.from('courts').select('name, price_per_hour').eq('id', courtId).single();
    const amount = (court?.price_per_hour || 150000) * duration;

    const { error } = await supabase.from('bookings').update({
      court_id: courtId,
      court_name: court?.name || courtId,
      date,
      start_time: startTime,
      end_time: endTime,
      duration_hours: duration,
      amount,
      notes
    }).eq('id', bookingId);

    if (error) throw new Error(error.message);

    closeEditModal();
    showAdminMessage('Booking berhasil diupdate!');
    await loadAdminData();
  } catch (err) {
    showAdminMessage(err.message || 'Gagal update booking.', 'error');
  }
}

async function deleteCurrentBooking() {
  const bookingId = document.getElementById('editBookingId').value;
  if (!confirm('Yakin ingin menghapus booking ini? Tindakan ini tidak dapat dibatalkan.')) return;

  try {
    const supabase = await PadelGo.Supabase.init();
    if (!supabase) throw new Error('Supabase belum dikonfigurasi');

    const { error } = await supabase.from('bookings').delete().eq('id', bookingId);
    if (error) throw new Error(error.message);

    closeEditModal();
    showAdminMessage('Booking berhasil dihapus!');
    await loadAdminData();
  } catch (err) {
    showAdminMessage(err.message || 'Gagal hapus booking.', 'error');
  }
}

// Admin Manual Booking Modal
function initAdminBookingModal() {
  document.getElementById('adminBookingDate').setAttribute('min', getTodayLocalDate());
  document.getElementById('adminBookingDate').addEventListener('change', () => {
    if (adminSelectedCourt) loadAdminAvailability();
  });

  document.querySelectorAll('.admin-duration-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      adminSelectedDuration = parseInt(btn.dataset.hours);
      document.getElementById('adminBookingDuration').value = adminSelectedDuration;
      document.querySelectorAll('.admin-duration-btn').forEach(b => {
        b.classList.remove('border-emerald-500', 'bg-emerald-600', 'text-white');
      });
      btn.classList.add('border-emerald-500', 'bg-emerald-600', 'text-white');
      updateAdminSummary();
    });
  });

  // Set first duration as selected
  document.querySelector('.admin-duration-btn[data-hours="1"]').click();
}

function openAdminBookingModal() {
  adminSelectedCourt = null;
  adminSelectedTime = null;
  adminSelectedDuration = 1;
  document.getElementById('adminBookingForm').reset();
  document.getElementById('adminBookingCourt').value = '';
  document.getElementById('adminBookingTime').value = '';
  document.getElementById('adminBookingDuration').value = '1';
  document.getElementById('adminBookingSummary').classList.add('hidden');
  document.querySelectorAll('.admin-duration-btn').forEach(b => {
    b.classList.remove('border-emerald-500', 'bg-emerald-600', 'text-white');
  });
  document.querySelector('.admin-duration-btn[data-hours="1"]').classList.add('border-emerald-500', 'bg-emerald-600', 'text-white');

  // Render courts
  const courtGrid = document.getElementById('adminCourtGrid');
  courtGrid.innerHTML = allCourts.filter(c => c.available).map(court => `
    <button type="button" onclick="selectAdminCourt('${escapeAttr(court.id)}', this)" class="admin-court-btn rounded-xl border border-slate-200 p-3 text-left hover:border-emerald-500 hover:bg-emerald-50 dark:border-slate-700 dark:hover:bg-emerald-500/10">
      <span class="block font-extrabold text-slate-900 dark:text-white text-sm">${escapeHtml(court.name || court.id)}</span>
      <span class="text-xs text-slate-500 dark:text-slate-400">${PadelGo.Format.rupiah(court.price_per_hour)}/jam</span>
    </button>
  `).join('');

  // Render time slots
  renderAdminTimeSlots();

  document.getElementById('adminBookingModal').classList.remove('hidden');
}

function closeAdminBookingModal() {
  document.getElementById('adminBookingModal').classList.add('hidden');
}

function selectAdminCourt(courtId, btn) {
  adminSelectedCourt = courtId;
  document.getElementById('adminBookingCourt').value = courtId;
  document.querySelectorAll('.admin-court-btn').forEach(b => {
    b.classList.remove('border-emerald-500', 'bg-emerald-600');
    b.classList.add('border-slate-200', 'dark:border-slate-700');
    b.querySelector('span:first-child')?.classList.remove('text-white');
    b.querySelector('span:first-child')?.classList.add('text-slate-900', 'dark:text-white');
  });
  btn.classList.remove('border-slate-200', 'dark:border-slate-700');
  btn.classList.add('border-emerald-500', 'bg-emerald-600');
  btn.querySelector('span:first-child')?.classList.remove('text-slate-900', 'dark:text-white');
  btn.querySelector('span:first-child')?.classList.add('text-white');
  loadAdminAvailability();
}

async function loadAdminAvailability() {
  const date = document.getElementById('adminBookingDate').value;
  if (!adminSelectedCourt || !date) {
    adminBookedSlots[adminSelectedCourt] = [];
    renderAdminTimeSlots();
    return;
  }

  try {
    const supabase = await PadelGo.Supabase.init();
    if (!supabase) return;

    const { data, error } = await supabase.rpc('get_booked_slots', {
      p_court_id: adminSelectedCourt,
      p_date: date
    });

    adminBookedSlots[adminSelectedCourt] = [];
    (data || []).forEach(b => {
      const sh = Number(String(b.start_time).split(':')[0]);
      const eh = Number(String(b.end_time).split(':')[0]);
      for (let h = sh; h < eh; h++) {
        const label = `${String(h).padStart(2, '0')}:00`;
        if (!adminBookedSlots[adminSelectedCourt].includes(label)) {
          adminBookedSlots[adminSelectedCourt].push(label);
        }
      }
    });
  } catch {
    adminBookedSlots[adminSelectedCourt] = [];
  }

  renderAdminTimeSlots();
}

function renderAdminTimeSlots() {
  const grid = document.getElementById('adminTimeGrid');
  grid.innerHTML = '';
  for (let h = 0; h < 24; h++) {
    const label = `${String(h).padStart(2, '0')}:00`;
    const booked = adminBookedSlots[adminSelectedCourt]?.includes(label) || [];
    const endHour = h + adminSelectedDuration;
    const isAvailable = !booked && endHour <= 24;

    // Check if all hours in duration are available
    for (let offset = 1; offset < adminSelectedDuration; offset++) {
      const checkHour = h + offset;
      if (adminBookedSlots[adminSelectedCourt]?.includes(`${String(checkHour).padStart(2, '0')}:00`)) {
        isAvailable = false;
        break;
      }
    }

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = label;
    btn.disabled = !isAvailable || !adminSelectedCourt;
    btn.onclick = isAvailable ? () => selectAdminTime(label, btn) : null;
    btn.className = isAvailable && adminSelectedCourt
      ? 'rounded-lg bg-white px-1 py-2 text-xs font-extrabold text-slate-700 transition hover:bg-emerald-100 hover:text-emerald-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-emerald-500/15 dark:hover:text-emerald-200 border border-slate-200 dark:border-slate-700'
      : 'rounded-lg bg-slate-100 px-1 py-2 text-xs font-extrabold text-slate-400 line-through dark:bg-slate-900 dark:text-slate-600 cursor-not-allowed';
    grid.appendChild(btn);
  }
  adminSelectedTime = null;
  document.getElementById('adminBookingTime').value = '';
  updateAdminSummary();
}

function selectAdminTime(time, btn) {
  adminSelectedTime = time;
  document.getElementById('adminBookingTime').value = time;
  document.querySelectorAll('#adminTimeGrid button').forEach(b => {
    b.classList.remove('bg-emerald-600', 'text-white', 'ring-2', 'ring-emerald-400');
  });
  btn.classList.add('bg-emerald-600', 'text-white', 'ring-2', 'ring-emerald-400');
  updateAdminSummary();
}

function updateAdminSummary() {
  const summary = document.getElementById('adminBookingSummary');
  const text = document.getElementById('adminSummaryText');
  if (adminSelectedCourt && adminSelectedTime && adminSelectedDuration) {
    const endHour = parseInt(adminSelectedTime.split(':')[0]) + adminSelectedDuration;
    const court = allCourts.find(c => c.id === adminSelectedCourt);
    const total = (court?.price_per_hour || 150000) * adminSelectedDuration;
    text.textContent = `${court?.name || adminSelectedCourt} | ${adminSelectedTime} - ${String(endHour).padStart(2, '0')}:00 (${adminSelectedDuration} jam) = ${rupiah(total)}`;
    summary.classList.remove('hidden');
  } else {
    summary.classList.add('hidden');
  }
}

async function submitAdminBooking(e) {
  e.preventDefault();
  const errorEl = document.getElementById('adminBookingError');
  errorEl.classList.add('hidden');

  const customerName = document.getElementById('adminCustomerName').value.trim();
  const customerEmail = document.getElementById('adminCustomerEmail').value.trim();
  const customerPhone = document.getElementById('adminCustomerPhone').value.trim();
  const date = document.getElementById('adminBookingDate').value;
  const courtId = document.getElementById('adminBookingCourt').value;
  const duration = parseInt(document.getElementById('adminBookingDuration').value);
  const startTime = document.getElementById('adminBookingTime').value;

  if (!customerName || !customerEmail || !customerPhone) {
    errorEl.textContent = 'Data customer wajib diisi.';
    errorEl.classList.remove('hidden');
    return;
  }

  if (!courtId || !date || !startTime) {
    errorEl.textContent = 'Pilih tanggal, court, dan waktu.';
    errorEl.classList.remove('hidden');
    return;
  }

  try {
    const supabase = await PadelGo.Supabase.init();
    if (!supabase) throw new Error('Supabase belum dikonfigurasi');

    // Find or create user by email
    let userId;
    const { data: existingProfile } = await supabase.from('profiles').select('id').eq('email', customerEmail).single();

    if (existingProfile) {
      userId = existingProfile.id;
    } else {
      errorEl.textContent = 'Customer belum terdaftar. Gunakan email yang sudah terdaftar.';
      errorEl.classList.remove('hidden');
      return;
    }

    const endHour = parseInt(startTime.split(':')[0]) + duration;
    const endTime = `${String(endHour).padStart(2, '0')}:00`;
    const court = allCourts.find(c => c.id === courtId);
    const amount = (court?.price_per_hour || 150000) * duration;
    const bookingId = `BK-${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    const { error } = await supabase.from('bookings').insert({
      id: bookingId,
      user_id: userId,
      court_id: courtId,
      court_name: court?.name || courtId,
      date,
      start_time: startTime,
      end_time: endTime,
      duration_hours: duration,
      amount,
      status: 'approved',
      notes: `Manual booking oleh admin. Customer: ${customerName} (${customerPhone})`
    });

    if (error) throw new Error(error.message);

    PadelGo.UI.toast('Booking manual berhasil dibuat!');
    closeAdminBookingModal();
    await loadAdminData();
  } catch (err) {
    errorEl.textContent = err.message || 'Gagal membuat booking.';
    errorEl.classList.remove('hidden');
  }
}

// Existing Functions
function showAdminMessage(message, type = 'success') {
  const success = document.getElementById('adminSuccess');
  const error = document.getElementById('adminError');
  success.classList.add('hidden');
  error.classList.add('hidden');
  const target = type === 'error' ? error : success;
  target.textContent = message;
  target.classList.remove('hidden');
  setTimeout(() => target.classList.add('hidden'), 5000);
}

async function requireAdmin(supabase) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) { window.location.href = '/login/?next=/admin/'; return null; }
  const { data: profile, error } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();
  if (error || profile?.role !== 'admin') { window.location.href = '/dashboard/'; return null; }
  return session;
}

function hydrateCourtFilter() {
  const filter = document.getElementById('courtFilter');
  const current = filter.value || 'all';
  filter.innerHTML = '<option value="all">All Courts</option>' + allCourts.map(court => `<option value="${escapeHtml(court.id)}">${escapeHtml(court.name || court.id)}</option>`).join('');
  filter.value = [...filter.options].some(option => option.value === current) ? current : 'all';
}

function renderBookings(bookings, targetId) {
  const tbody = document.getElementById(targetId);
  const isFullTable = targetId === 'ordersTable';
  if (!bookings.length) {
    tbody.innerHTML = `<tr><td colspan="${isFullTable ? '7' : '6'}" class="px-4 sm:px-5 py-8 sm:py-10 text-center text-sm text-slate-500">Belum ada booking.</td></tr>`;
    return;
  }
  tbody.innerHTML = bookings.map(order => `
    <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition">
      <td class="px-3 sm:px-5 py-3 sm:py-4">
        ${isFullTable ? renderUserCell(order.user_id) : renderMiniUserCell(order.user_id)}
      </td>
      <td class="px-3 sm:px-5 py-3 sm:py-4">
        <span class="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">${escapeHtml(order.court_name || order.court_id)}</span>
        ${isFullTable ? `<br><span class="text-[10px] text-slate-500 sm:hidden">${escapeHtml(order.date)}</span>` : ''}
      </td>
      ${isFullTable ? `<td class="px-3 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 hidden sm:table-cell">${escapeHtml(order.date || '-')}</td>` : ''}
      ${isFullTable ? `<td class="px-3 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">${escapeHtml(order.start_time || '')} - ${escapeHtml(order.end_time || '')}</td>` : ''}
      <td class="px-3 sm:px-5 py-3 sm:py-4"><span class="inline-flex rounded-full px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-extrabold ${statusClass(order.status)}">${statusLabel(order.status)}</span></td>
      <td class="px-3 sm:px-5 py-3 sm:py-4 font-extrabold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">${rupiah(order.amount)}</td>
      <td class="px-3 sm:px-5 py-3 sm:py-4">
        ${isFullTable ? renderBookingActions(order) : renderBookingActionsMini(order)}
      </td>
    </tr>
  `).join('');
}

function renderMiniUserCell(userId) {
  const profile = profileById.get(userId);
  const name = profile?.name || profile?.email || 'User';
  const initials = String(name || 'U').trim().split(/\s+/).map(p => p[0]).join('').toUpperCase().slice(0, 2);
  return `<div class="flex items-center gap-2">
    <div class="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center text-xs font-extrabold text-teal-700 dark:bg-teal-900/50 dark:text-teal-200">${initials}</div>
    <span class="font-bold text-slate-900 dark:text-slate-100 text-xs">${escapeHtml(name)}</span>
  </div>`;
}

function renderBookingActionsMini(order) {
  if (order.status === 'approved' || order.status === 'confirmed') {
    return '<span class="inline-flex rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-extrabold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-200">✓</span>';
  }
  if (order.status === 'cancelled') {
    return '<span class="inline-flex rounded-full bg-red-50 px-2 py-1 text-[10px] font-extrabold text-red-700 dark:bg-red-950/50 dark:text-red-200">✗</span>';
  }
  return `
    <div class="flex items-center gap-1">
      <button type="button" onclick="setBookingStatus('${escapeAttr(order.id)}','approved')" class="h-7 w-7 inline-flex items-center justify-center rounded-lg bg-emerald-100 text-sm font-extrabold text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-200" title="Approve">✓</button>
      <button type="button" onclick="setBookingStatus('${escapeAttr(order.id)}','cancelled')" class="h-7 w-7 inline-flex items-center justify-center rounded-lg bg-red-100 text-sm font-extrabold text-red-700 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-200" title="Cancel">✗</button>
    </div>`;
}

function renderBookingActions(order) {
  if (order.status === 'approved' || order.status === 'confirmed') {
    return '<span class="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-extrabold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-200">approved</span>';
  }
  if (order.status === 'cancelled') {
    return '<span class="inline-flex rounded-full bg-red-50 px-2.5 py-1 text-xs font-extrabold text-red-700 dark:bg-red-950/50 dark:text-red-200">cancelled</span>';
  }
  return `
    <div class="flex items-center gap-1 sm:gap-2">
      <button type="button" onclick="setBookingStatus('${escapeAttr(order.id)}','approved')" class="h-8 sm:h-9 w-8 sm:w-9 inline-flex items-center justify-center rounded-lg bg-emerald-100 text-base sm:text-lg font-extrabold text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-200" title="Approve">✓</button>
      <button type="button" onclick="setBookingStatus('${escapeAttr(order.id)}','cancelled')" class="h-8 sm:h-9 w-8 sm:w-9 inline-flex items-center justify-center rounded-lg bg-red-100 text-base sm:text-lg font-extrabold text-red-700 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-200" title="Cancel">✗</button>
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
    tbody.innerHTML = '<tr><td colspan="4" class="px-4 sm:px-5 py-8 sm:py-10 text-center text-sm text-slate-500">Belum ada lapangan.</td></tr>';
    return;
  }
  tbody.innerHTML = allCourts.map(court => `
    <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition">
      <td class="px-4 sm:px-5 py-3 sm:py-4">
        <div class="flex items-center gap-3">
          <img src="${escapeAttr(court.image_url || '/images/padel1.jpg')}" alt="${escapeAttr(court.name || court.id)}" class="h-12 sm:h-14 w-16 sm:w-20 rounded-xl object-cover">
          <div>
            <p class="font-extrabold text-slate-950 dark:text-white text-sm sm:text-base">${escapeHtml(court.name || court.id)}</p>
            <p class="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">${escapeHtml(court.type || court.surface || court.id)}</p>
          </div>
        </div>
      </td>
      <td class="px-4 sm:px-5 py-3 sm:py-4 font-bold text-sm sm:text-base">${rupiah(court.price_per_hour)} / jam</td>
      <td class="px-4 sm:px-5 py-3 sm:py-4"><span class="rounded-full px-2.5 py-1 text-xs font-extrabold ${court.available ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200' : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200'}">${court.available ? 'Available' : 'Hidden'}</span></td>
      <td class="px-4 sm:px-5 py-3 sm:py-4">
        <button type="button" onclick="toggleCourt('${escapeAttr(court.id)}', ${court.available ? 'false' : 'true'})" class="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-extrabold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">${court.available ? 'Hide' : 'Show'}</button>
      </td>
    </tr>`).join('');
}

function renderFinance() {
  const rows = allCourts.map(court => {
    const items = allBookings.filter(b => b.court_id === court.id);
    const approved = items.filter(b => b.status === 'approved' || b.status === 'confirmed').reduce((sum, b) => sum + Number(b.amount || 0), 0);
    const pending = items.filter(b => b.status === 'pending').reduce((sum, b) => sum + Number(b.amount || 0), 0);
    return `<tr><td class="px-4 sm:px-5 py-3 sm:py-4 font-extrabold text-sm sm:text-base">${escapeHtml(court.name || court.id)}</td><td class="px-4 sm:px-5 py-3 sm:py-4">${items.length}</td><td class="px-4 sm:px-5 py-3 sm:py-4 font-bold">${rupiah(approved)}</td><td class="px-4 sm:px-5 py-3 sm:py-4 font-bold">${rupiah(pending)}</td></tr>`;
  });
  document.getElementById('financeTable').innerHTML = rows.join('') || '<tr><td colspan="4" class="px-4 sm:px-5 py-8 sm:py-10 text-center text-sm text-slate-500">Belum ada data.</td></tr>';
}

function renderUsers() {
  const tbody = document.getElementById('usersTable');
  tbody.innerHTML = allProfiles.map(profile => `
    <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition">
      <td class="px-4 sm:px-5 py-3 sm:py-4">${renderUserCell(profile.id)}</td>
      <td class="px-4 sm:px-5 py-3 sm:py-4 text-sm">${escapeHtml(profile.email || '-')}</td>
      <td class="px-4 sm:px-5 py-3 sm:py-4"><span class="rounded-full px-2.5 py-1 text-xs font-extrabold ${profile.role === 'admin' ? 'bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-200' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'}">${escapeHtml(profile.role || 'user')}</span></td>
      <td class="px-4 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm text-slate-500">${escapeHtml(PadelGo.Format.date(String(profile.created_at || '').slice(0, 10)))}</td>
    </tr>`).join('');
}

function renderUserCell(userId) {
  const profile = profileById.get(userId);
  const label = profile?.name || profile?.email || userId || 'User';
  const sub = profile?.email && profile?.name ? profile.email : '';
  const avatar = profile?.avatar_url || PadelGo.UI.defaultAvatar();
  return `<div class="flex items-center gap-3">
    <img src="${escapeAttr(avatar)}" alt="${escapeAttr(label)}" class="h-9 sm:h-10 w-9 sm:w-10 rounded-full object-cover">
    <div>
      <p class="font-extrabold text-slate-950 dark:text-white text-sm sm:text-base">${escapeHtml(label)}</p>
      <p class="max-w-[180px] sm:max-w-[220px] truncate text-[10px] sm:text-xs text-slate-500">${escapeHtml(sub)}</p>
    </div>
  </div>`;
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
  if (status === 'approved' || status === 'confirmed') return 'Approved';
  if (status === 'pending') return 'Pending';
  return 'Cancelled';
}

function statusClass(status) {
  if (status === 'approved' || status === 'confirmed') return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200';
  if (status === 'pending') return 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200';
  return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200';
}

function rupiah(value) {
  return 'Rp ' + Number(value || 0).toLocaleString('id-ID');
}

function getTodayLocalDate() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function escapeHtml(text) {
  const map = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'};
  return String(text || '').replace(/[&<>"']/g, m => map[m]);
}

function escapeAttr(text) {
  return escapeHtml(text).replace(/`/g, '&#096;');
}
</script>
