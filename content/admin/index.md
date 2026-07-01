---
title: "Admin Dashboard"
date: 2026-06-29
draft: false
layout: "admin"
---

<div id="adminApp" class="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950">
  
  <!-- Loading State -->
  <div id="adminLoading" class="flex items-center justify-center min-h-[calc(100vh-4rem)]">
    <div class="text-center">
      <div class="inline-block h-12 w-12 animate-spin rounded-full border-4 border-teal-500 border-t-transparent"></div>
      <p class="mt-4 text-slate-600 dark:text-slate-400">Memuat dashboard...</p>
    </div>
  </div>

  <!-- Auth Error State -->
  <div id="adminAuthError" class="hidden flex items-center justify-center min-h-[calc(100vh-4rem)]">
    <div class="text-center max-w-md mx-auto px-4">
      <div class="inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
        <svg class="h-8 w-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
      </div>
      <h2 class="text-xl font-bold text-slate-900 dark:text-white">Akses Ditolak</h2>
      <p class="mt-2 text-slate-600 dark:text-slate-400">Anda harus login sebagai admin untuk mengakses halaman ini.</p>
      <a href="/login/?next=/admin/" class="mt-6 inline-block rounded-xl bg-teal-600 px-6 py-3 font-bold text-white hover:bg-teal-700">Login Sekarang</a>
    </div>
  </div>

  <!-- Admin Content -->
  <div id="adminContent" class="hidden">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

      <!-- Header -->
      <div class="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p class="text-sm font-extrabold uppercase tracking-wide text-teal-700 dark:text-teal-300">Admin Console</p>
          <h1 class="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">PadelGo Operations</h1>
          <p class="mt-1 sm:mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">Kelola booking, lapangan, user, dan pendapatan.</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <button type="button" id="refreshBtn" onclick="adminRefresh()" class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-extrabold text-slate-700 shadow-sm hover:bg-slate-100 active:scale-95 transition dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
            <svg id="refreshIcon" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            <span class="hidden sm:inline">Refresh</span>
          </button>
          <button type="button" onclick="adminOpenBookingModal()" class="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-4 py-2 text-sm font-extrabold text-white shadow-sm hover:bg-teal-800 active:scale-95 transition">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
            <span class="hidden sm:inline">Booking Manual</span>
            <span class="sm:hidden">Manual</span>
          </button>
        </div>
      </div>

      <!-- Tabs Navigation -->
      <div class="mb-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div class="flex min-w-max gap-2">
          <button type="button" class="admin-tab rounded-xl bg-slate-950 px-3 sm:px-4 py-2 text-xs sm:text-sm font-extrabold text-white dark:bg-white dark:text-slate-950 whitespace-nowrap flex items-center gap-2" data-tab="overview">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
            <span>Overview</span>
          </button>
          <button type="button" class="admin-tab rounded-xl px-3 sm:px-4 py-2 text-xs sm:text-sm font-extrabold text-slate-600 dark:text-slate-300 whitespace-nowrap flex items-center gap-2" data-tab="bookings">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>
            <span>Bookings</span>
            <span id="pendingBadge" class="hidden rounded-full bg-amber-500 px-1.5 py-0.5 text-[10px] font-bold text-white"></span>
          </button>
          <button type="button" class="admin-tab rounded-xl px-3 sm:px-4 py-2 text-xs sm:text-sm font-extrabold text-slate-600 dark:text-slate-300 whitespace-nowrap flex items-center gap-2" data-tab="courts">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"/></svg>
            <span>Lapangan</span>
          </button>
          <button type="button" class="admin-tab rounded-xl px-3 sm:px-4 py-2 text-xs sm:text-sm font-extrabold text-slate-600 dark:text-slate-300 whitespace-nowrap flex items-center gap-2" data-tab="finance">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span>Keuangan</span>
          </button>
          <button type="button" class="admin-tab rounded-xl px-3 sm:px-4 py-2 text-xs sm:text-sm font-extrabold text-slate-600 dark:text-slate-300 whitespace-nowrap flex items-center gap-2" data-tab="users">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
            <span>Users</span>
          </button>
          <button type="button" class="admin-tab rounded-xl px-3 sm:px-4 py-2 text-xs sm:text-sm font-extrabold text-slate-600 dark:text-slate-300 whitespace-nowrap flex items-center gap-2" data-tab="reports">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            <span>Laporan</span>
          </button>
        </div>
      </div>

      <!-- Messages -->
      <div id="adminErrorMsg" class="mb-4 hidden rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700 dark:bg-red-950/40 dark:text-red-300" role="alert"></div>
      <div id="adminSuccessMsg" class="mb-4 hidden rounded-xl bg-emerald-50 p-3 text-sm font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300" role="status"></div>

      <!-- ============ OVERVIEW TAB ============ -->
      <section id="tab-overview" class="admin-section space-y-6">
        
        <!-- Stats Cards -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          <div class="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p class="text-[10px] sm:text-xs font-bold uppercase text-slate-500">Total Booking</p>
            <p id="stat-total" class="mt-1 sm:mt-2 text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">-</p>
          </div>
          <div class="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p class="text-[10px] sm:text-xs font-bold uppercase text-slate-500">Pending</p>
            <p id="stat-pending" class="mt-1 sm:mt-2 text-2xl sm:text-3xl font-extrabold text-amber-600">-</p>
          </div>
          <div class="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p class="text-[10px] sm:text-xs font-bold uppercase text-slate-500">Approved</p>
            <p id="stat-approved" class="mt-1 sm:mt-2 text-2xl sm:text-3xl font-extrabold text-emerald-600">-</p>
          </div>
          <div class="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p class="text-[10px] sm:text-xs font-bold uppercase text-slate-500">Revenue</p>
            <p id="stat-revenue" class="mt-1 sm:mt-2 text-lg sm:text-2xl font-extrabold text-slate-950 dark:text-white">-</p>
          </div>
          <div class="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p class="text-[10px] sm:text-xs font-bold uppercase text-slate-500">Lapangan</p>
            <p id="stat-courts" class="mt-1 sm:mt-2 text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">-</p>
          </div>
        </div>

        <!-- Calendar + Recent Bookings -->
        <div class="grid gap-6 lg:grid-cols-1 xl:grid-cols-3">
          
          <!-- Calendar -->
          <div class="xl:col-span-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div class="flex items-center justify-between border-b border-slate-200 px-4 sm:px-6 py-4 dark:border-slate-800">
              <h2 class="text-lg font-extrabold text-slate-950 dark:text-white flex items-center gap-2">
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                Kalender Booking
              </h2>
              <div class="flex items-center gap-2">
                <button type="button" onclick="adminCalPrev()" class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
                </button>
                <span id="cal-month" class="font-bold text-slate-900 dark:text-white min-w-[120px] text-center text-sm"></span>
                <button type="button" onclick="adminCalNext()" class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>
            <div class="p-3 sm:p-4">
              <div class="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
                <div class="text-center text-[10px] sm:text-xs font-bold text-slate-500 py-2">Min</div>
                <div class="text-center text-[10px] sm:text-xs font-bold text-slate-500 py-2">Sen</div>
                <div class="text-center text-[10px] sm:text-xs font-bold text-slate-500 py-2">Sel</div>
                <div class="text-center text-[10px] sm:text-xs font-bold text-slate-500 py-2">Rab</div>
                <div class="text-center text-[10px] sm:text-xs font-bold text-slate-500 py-2">Kam</div>
                <div class="text-center text-[10px] sm:text-xs font-bold text-slate-500 py-2">Jum</div>
                <div class="text-center text-[10px] sm:text-xs font-bold text-slate-500 py-2">Sab</div>
              </div>
              <div id="cal-grid" class="grid grid-cols-7 gap-1 sm:gap-2"></div>
              <div class="mt-4 flex items-center justify-center gap-4 text-[10px] sm:text-xs text-slate-600 dark:text-slate-400">
                <span class="flex items-center gap-1"><span class="h-2.5 w-2.5 rounded-full bg-emerald-500"></span> Approved</span>
                <span class="flex items-center gap-1"><span class="h-2.5 w-2.5 rounded-full bg-amber-500"></span> Pending</span>
                <span class="flex items-center gap-1"><span class="h-2.5 w-2.5 rounded-full bg-red-500"></span> Cancelled</span>
              </div>
            </div>
          </div>

          <!-- Quick Stats -->
          <div class="space-y-4">
            <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 class="text-lg font-extrabold text-slate-950 dark:text-white mb-4">Ringkasan Keuangan</h3>
              <div class="space-y-3">
                <div class="flex justify-between items-center rounded-xl bg-emerald-50 p-3 dark:bg-emerald-950/30">
                  <span class="text-sm text-emerald-800 dark:text-emerald-200">Revenue Approved</span>
                  <strong id="fin-approved" class="font-extrabold text-emerald-700 dark:text-emerald-300">-</strong>
                </div>
                <div class="flex justify-between items-center rounded-xl bg-amber-50 p-3 dark:bg-amber-950/30">
                  <span class="text-sm text-amber-800 dark:text-amber-200">Pipeline Pending</span>
                  <strong id="fin-pending" class="font-extrabold text-amber-700 dark:text-amber-300">-</strong>
                </div>
                <div class="flex justify-between items-center rounded-xl bg-red-50 p-3 dark:bg-red-950/30">
                  <span class="text-sm text-red-800 dark:text-red-200">Cancelled</span>
                  <strong id="fin-cancelled" class="font-extrabold text-red-700 dark:text-red-300">-</strong>
                </div>
              </div>
            </div>

            <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 class="text-lg font-extrabold text-slate-950 dark:text-white mb-4">Booking Terbaru</h3>
              <div id="recent-list" class="space-y-3">
                <p class="text-sm text-slate-500 text-center py-4">Memuat...</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ BOOKINGS TAB ============ -->
      <section id="tab-bookings" class="admin-section hidden">
        <div class="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 class="text-xl font-extrabold text-slate-950 dark:text-white">Kelola Booking</h2>
            <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Approve atau cancel booking dari user.</p>
          </div>
          <div class="flex flex-wrap gap-2">
            <select id="filter-status" onchange="adminFilterBookings()" class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold dark:border-slate-700 dark:bg-slate-900">
              <option value="all">Semua Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select id="filter-court" onchange="adminFilterBookings()" class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold dark:border-slate-700 dark:bg-slate-900">
              <option value="all">Semua Lapangan</option>
            </select>
          </div>
        </div>

        <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div class="overflow-x-auto">
            <table class="w-full min-w-[900px]">
              <thead>
                <tr class="bg-slate-50 text-left text-xs uppercase text-slate-500 dark:bg-slate-950">
                  <th class="px-4 py-3">User</th>
                  <th class="px-4 py-3">Lapangan</th>
                  <th class="px-4 py-3">Tanggal</th>
                  <th class="px-4 py-3">Waktu</th>
                  <th class="px-4 py-3">Status</th>
                  <th class="px-4 py-3">Jumlah</th>
                  <th class="px-4 py-3">Aksi</th>
                </tr>
              </thead>
              <tbody id="bookings-table" class="divide-y divide-slate-100 dark:divide-slate-800">
                <tr><td colspan="7" class="px-4 py-12 text-center text-slate-500">Memuat data...</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- ============ COURTS TAB ============ -->
      <section id="tab-courts" class="admin-section hidden">
        <div class="grid gap-6 lg:grid-cols-2">
          
          <!-- Add/Edit Form -->
          <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 class="text-xl font-extrabold text-slate-950 dark:text-white mb-4">Tambah Lapangan</h2>
            <form id="court-form" onsubmit="adminSaveCourt(event)" class="space-y-4">
              <input type="hidden" id="court-edit-id">
              <div>
                <label class="mb-1 block text-sm font-bold">Nama Lapangan</label>
                <input id="court-name" required placeholder="Court A1" class="w-full rounded-xl border border-slate-200 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-950">
              </div>
              <div>
                <label class="mb-1 block text-sm font-bold">Harga per Jam (Rp)</label>
                <input id="court-price" required type="number" min="10000" step="10000" placeholder="150000" class="w-full rounded-xl border border-slate-200 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-950">
              </div>
              <div>
                <label class="mb-1 block text-sm font-bold">Tipe</label>
                <input id="court-type" placeholder="Premium indoor court" class="w-full rounded-xl border border-slate-200 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-950">
              </div>
              <div>
                <label class="mb-1 block text-sm font-bold">Surface</label>
                <input id="court-surface" placeholder="Artificial Grass" class="w-full rounded-xl border border-slate-200 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-950">
              </div>
              <div>
                <label class="mb-1 block text-sm font-bold">Gambar</label>
                <input id="court-image" type="file" accept="image/*" class="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950">
              </div>
              <button type="submit" id="court-submit" class="w-full rounded-xl bg-teal-700 py-3 font-extrabold text-white hover:bg-teal-800">Simpan</button>
              <button type="button" id="court-cancel" onclick="adminCancelCourtEdit()" class="hidden w-full rounded-xl border border-slate-200 py-3 font-extrabold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">Batal</button>
            </form>
          </div>

          <!-- Courts List -->
          <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div class="border-b border-slate-200 px-6 py-4 dark:border-slate-800">
              <h2 class="text-xl font-extrabold text-slate-950 dark:text-white">Daftar Lapangan</h2>
            </div>
            <div class="divide-y divide-slate-100 dark:divide-slate-800" id="courts-list">
              <div class="px-6 py-12 text-center text-slate-500">Memuat...</div>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ FINANCE TAB ============ -->
      <section id="tab-finance" class="admin-section hidden">
        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 class="text-2xl font-extrabold text-slate-950 dark:text-white mb-6">Laporan Keuangan</h2>
          
          <div class="grid gap-4 md:grid-cols-3 mb-6">
            <div class="rounded-xl bg-emerald-50 p-5 dark:bg-emerald-950/30">
              <p class="text-sm font-bold text-emerald-800 dark:text-emerald-200">Total Approved</p>
              <p id="finance-total-approved" class="mt-2 text-2xl font-extrabold text-emerald-700 dark:text-emerald-300">Rp 0</p>
            </div>
            <div class="rounded-xl bg-amber-50 p-5 dark:bg-amber-950/30">
              <p class="text-sm font-bold text-amber-800 dark:text-amber-200">Pending Pipeline</p>
              <p id="finance-total-pending" class="mt-2 text-2xl font-extrabold text-amber-700 dark:text-amber-300">Rp 0</p>
            </div>
            <div class="rounded-xl bg-red-50 p-5 dark:bg-red-950/30">
              <p class="text-sm font-bold text-red-800 dark:text-red-200">Cancelled Value</p>
              <p id="finance-total-cancelled" class="mt-2 text-2xl font-extrabold text-red-700 dark:text-red-300">Rp 0</p>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full min-w-[800px]">
              <thead>
                <tr class="bg-slate-50 text-left text-xs uppercase text-slate-500 dark:bg-slate-950">
                  <th class="px-4 py-3">Lapangan</th>
                  <th class="px-4 py-3">Total Booking</th>
                  <th class="px-4 py-3">Approved Revenue</th>
                  <th class="px-4 py-3">Pending Pipeline</th>
                </tr>
              </thead>
              <tbody id="finance-table" class="divide-y divide-slate-100 dark:divide-slate-800">
                <tr><td colspan="4" class="px-4 py-8 text-center text-slate-500">Memuat...</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- ============ USERS TAB ============ -->
      <section id="tab-users" class="admin-section hidden">
        <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div class="border-b border-slate-200 px-6 py-4 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h2 class="text-xl font-extrabold text-slate-950 dark:text-white">Kelola Users</h2>
              <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Edit role dan data user.</p>
            </div>
            <span id="users-count" class="rounded-full bg-teal-100 px-3 py-1 text-xs font-extrabold text-teal-800 dark:bg-teal-900/50 dark:text-teal-200">0 users</span>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full min-w-[900px]">
              <thead>
                <tr class="bg-slate-50 text-left text-xs uppercase text-slate-500 dark:bg-slate-950">
                  <th class="px-4 py-3">User</th>
                  <th class="px-4 py-3">Email</th>
                  <th class="px-4 py-3">No. HP</th>
                  <th class="px-4 py-3">Role</th>
                  <th class="px-4 py-3">Bergabung</th>
                  <th class="px-4 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody id="users-table" class="divide-y divide-slate-100 dark:divide-slate-800">
                <tr><td colspan="6" class="px-4 py-12 text-center text-slate-500">Memuat...</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- ============ REPORTS TAB ============ -->
      <section id="tab-reports" class="admin-section hidden">
        <div class="space-y-6">
          
          <!-- Filter Controls -->
          <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 class="text-lg font-extrabold text-slate-950 dark:text-white mb-4 flex items-center gap-2">
              <svg class="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
              Filter Laporan
            </h3>
            
            <!-- Quick Filters -->
            <div class="flex flex-wrap gap-2 mb-4">
              <button type="button" onclick="adminSetPeriod('today')" class="report-btn rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800" data-period="today">Hari Ini</button>
              <button type="button" onclick="adminSetPeriod('week')" class="report-btn rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800" data-period="week">Minggu Ini</button>
              <button type="button" onclick="adminSetPeriod('month')" class="report-btn rounded-lg border border-teal-500 bg-teal-100 px-3 py-1.5 text-xs font-bold text-teal-700 dark:bg-teal-900/50 dark:border-teal-700 dark:text-teal-300" data-period="month">Bulan Ini</button>
              <button type="button" onclick="adminSetPeriod('year')" class="report-btn rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800" data-period="year">Tahun Ini</button>
            </div>

            <!-- Date Range -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="mb-1 block text-xs font-bold text-slate-600 dark:text-slate-400">Dari Tanggal</label>
                <input type="date" id="report-from" onchange="adminApplyFilter()" class="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950">
              </div>
              <div>
                <label class="mb-1 block text-xs font-bold text-slate-600 dark:text-slate-400">Sampai Tanggal</label>
                <input type="date" id="report-to" onchange="adminApplyFilter()" class="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950">
              </div>
              <div>
                <label class="mb-1 block text-xs font-bold text-slate-600 dark:text-slate-400">Lapangan</label>
                <select id="report-court" onchange="adminApplyFilter()" class="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950">
                  <option value="">Semua</option>
                </select>
              </div>
              <div>
                <label class="mb-1 block text-xs font-bold text-slate-600 dark:text-slate-400">Status</label>
                <select id="report-status" onchange="adminApplyFilter()" class="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950">
                  <option value="">Semua</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Summary Cards -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p class="text-xs font-bold text-slate-500 uppercase">Total Booking</p>
              <p id="report-total" class="mt-1 text-xl font-extrabold text-slate-950 dark:text-white">0</p>
            </div>
            <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p class="text-xs font-bold text-slate-500 uppercase">Total Revenue</p>
              <p id="report-revenue" class="mt-1 text-xl font-extrabold text-emerald-600">Rp 0</p>
            </div>
            <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p class="text-xs font-bold text-slate-500 uppercase">Pending</p>
              <p id="report-pending" class="mt-1 text-xl font-extrabold text-amber-600">0</p>
            </div>
            <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p class="text-xs font-bold text-slate-500 uppercase">User Aktif</p>
              <p id="report-users" class="mt-1 text-xl font-extrabold text-purple-600">0</p>
            </div>
          </div>

          <!-- Report Table -->
          <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div class="overflow-x-auto">
              <table class="w-full min-w-[1000px]">
                <thead>
                  <tr class="bg-slate-50 text-left text-xs uppercase text-slate-500 dark:bg-slate-950">
                    <th class="px-4 py-3">#</th>
                    <th class="px-4 py-3">User</th>
                    <th class="px-4 py-3">Lapangan</th>
                    <th class="px-4 py-3">Tanggal</th>
                    <th class="px-4 py-3">Waktu</th>
                    <th class="px-4 py-3">Durasi</th>
                    <th class="px-4 py-3">Status</th>
                    <th class="px-4 py-3 text-right">Jumlah</th>
                  </tr>
                </thead>
                <tbody id="report-table" class="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr><td colspan="8" class="px-4 py-12 text-center text-slate-500">Pilih filter dan klik tab Laporan</td></tr>
                </tbody>
              </table>
            </div>
            <div class="flex items-center justify-between border-t border-slate-200 px-4 py-3 dark:border-slate-800">
              <p id="report-count" class="text-sm text-slate-500"></p>
              <div class="flex gap-2">
                <button type="button" id="report-prev" onclick="adminReportPage(-1)" class="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800" disabled>←</button>
                <button type="button" id="report-next" onclick="adminReportPage(1)" class="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800" disabled>→</button>
              </div>
            </div>
          </div>

          <!-- Export Buttons -->
          <div class="flex flex-wrap gap-3">
            <button type="button" onclick="adminExportCSV()" class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              Export CSV
            </button>
            <button type="button" onclick="adminExportExcel()" class="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-700">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              Export Excel
            </button>
          </div>
        </div>
      </section>

    </div>
  </div>

  <!-- ============ MODALS ============ -->

  <!-- Edit User Modal -->
  <div id="user-modal" class="fixed inset-0 z-50 hidden overflow-y-auto">
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" onclick="adminCloseUserModal()"></div>
    <div class="absolute inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
      <div class="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-900">
        <div>
          <h3 class="text-lg font-extrabold text-slate-950 dark:text-white">Edit User</h3>
          <p class="text-sm text-slate-500 dark:text-slate-400">Update data dan role user</p>
        </div>
        <button onclick="adminCloseUserModal()" class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
      <form id="user-form" onsubmit="adminSaveUser(event)" class="p-6 space-y-4">
        <input type="hidden" id="user-id">
        <div id="user-preview" class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
          <img id="user-avatar" src="" class="h-12 w-12 rounded-full object-cover">
          <div>
            <p id="user-name-preview" class="font-bold text-slate-900 dark:text-white"></p>
            <p id="user-email-preview" class="text-sm text-slate-500"></p>
          </div>
        </div>
        <div>
          <label class="mb-1 block text-sm font-bold">Nama</label>
          <input id="user-name" required class="w-full rounded-xl border border-slate-200 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-950">
        </div>
        <div>
          <label class="mb-1 block text-sm font-bold">Email</label>
          <input id="user-email" type="email" required class="w-full rounded-xl border border-slate-200 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-950">
        </div>
        <div>
          <label class="mb-1 block text-sm font-bold">No. HP</label>
          <input id="user-phone" class="w-full rounded-xl border border-slate-200 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-950">
        </div>
        <div>
          <label class="mb-1 block text-sm font-bold">Role</label>
          <select id="user-role" class="w-full rounded-xl border border-slate-200 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-950">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div id="user-error" class="hidden rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700 dark:bg-red-950/40 dark:text-red-300"></div>
        <div class="flex gap-3 pt-2">
          <button type="submit" class="flex-1 rounded-xl bg-teal-700 py-3 font-extrabold text-white hover:bg-teal-800">Simpan</button>
          <button type="button" onclick="adminDeleteUser()" class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-extrabold text-red-700 hover:bg-red-100 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300">Hapus</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Day Detail Modal -->
  <div id="day-modal" class="fixed inset-0 z-50 hidden">
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" onclick="adminCloseDayModal()"></div>
    <div class="absolute inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
      <div class="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
        <div>
          <h3 id="day-title" class="text-lg font-extrabold text-slate-950 dark:text-white"></h3>
          <p id="day-subtitle" class="text-sm text-slate-500 dark:text-slate-400"></p>
        </div>
        <button onclick="adminCloseDayModal()" class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
      <div id="day-content" class="p-6"></div>
    </div>
  </div>

  <!-- Manual Booking Modal -->
  <div id="booking-modal" class="fixed inset-0 z-50 hidden overflow-y-auto">
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" onclick="adminCloseBookingModal()"></div>
    <div class="absolute inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
      <div class="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-900">
        <div>
          <h3 class="text-lg font-extrabold text-slate-950 dark:text-white">Booking Manual (Admin)</h3>
          <p class="text-sm text-slate-500 dark:text-slate-400">Buat booking untuk customer</p>
        </div>
        <button onclick="adminCloseBookingModal()" class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
      <form id="booking-form" onsubmit="adminSubmitBooking(event)" class="p-6 space-y-5">
        
        <!-- Customer Info -->
        <div class="rounded-xl border border-teal-100 bg-teal-50 p-4 dark:border-teal-900/60 dark:bg-teal-950/20">
          <h4 class="font-extrabold text-teal-800 dark:text-teal-200 mb-3">Data Customer</h4>
          <div class="space-y-3">
            <div>
              <label class="mb-1 block text-xs font-bold text-teal-700 dark:text-teal-300">Nama *</label>
              <input id="booking-name" required placeholder="Nama lengkap" class="w-full rounded-lg border border-teal-200 bg-white px-3 py-2 dark:border-teal-800 dark:bg-slate-950">
            </div>
            <div>
              <label class="mb-1 block text-xs font-bold text-teal-700 dark:text-teal-300">Email *</label>
              <input id="booking-email" type="email" required placeholder="email@example.com" class="w-full rounded-lg border border-teal-200 bg-white px-3 py-2 dark:border-teal-800 dark:bg-slate-950">
            </div>
          </div>
        </div>

        <!-- Booking Details -->
        <div class="space-y-4">
          <div>
            <label class="mb-1 block text-sm font-bold">Tanggal *</label>
            <input id="booking-date" type="date" required class="w-full rounded-xl border border-slate-200 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-950">
          </div>
          <div>
            <label class="mb-2 block text-sm font-bold">Lapangan *</label>
            <div id="booking-courts" class="grid grid-cols-2 gap-2"></div>
            <input type="hidden" id="booking-court" required>
          </div>
          <div>
            <label class="mb-2 block text-sm font-bold">Durasi</label>
            <div class="flex gap-2" id="booking-durations">
              <button type="button" data-hours="1" class="dur-btn flex-1 rounded-xl border-2 border-teal-500 bg-teal-500 py-2 text-sm font-extrabold text-white">1 Jam</button>
              <button type="button" data-hours="2" onclick="adminSetDuration(2)" class="dur-btn flex-1 rounded-xl border border-slate-200 py-2 text-sm font-extrabold text-slate-600 dark:text-slate-300">2 Jam</button>
              <button type="button" data-hours="3" onclick="adminSetDuration(3)" class="dur-btn flex-1 rounded-xl border border-slate-200 py-2 text-sm font-extrabold text-slate-600 dark:text-slate-300">3 Jam</button>
              <button type="button" data-hours="4" onclick="adminSetDuration(4)" class="dur-btn flex-1 rounded-xl border border-slate-200 py-2 text-sm font-extrabold text-slate-600 dark:text-slate-300">4 Jam</button>
            </div>
            <input type="hidden" id="booking-duration" value="1">
          </div>
          <div>
            <label class="mb-2 block text-sm font-bold">Waktu Mulai</label>
            <div id="booking-times" class="grid grid-cols-6 gap-2"></div>
            <input type="hidden" id="booking-time" required>
          </div>
        </div>

        <div id="booking-summary" class="hidden rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-500/30 dark:bg-emerald-500/10">
          <p id="booking-summary-text" class="text-center text-sm font-extrabold text-emerald-800 dark:text-emerald-200"></p>
        </div>

        <div id="booking-error" class="hidden rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700 dark:bg-red-950/40 dark:text-red-300"></div>

        <button type="submit" class="w-full rounded-xl bg-teal-700 py-3.5 text-base font-extrabold text-white shadow-lg hover:bg-teal-800">Buat Booking (Approved)</button>
      </form>
    </div>
  </div>

</div>

<script src="/js/shared.js"></script>
<script>
// ============================================
// Admin Dashboard JavaScript
// ============================================

// State
let adminBookings = [];
let adminCourts = [];
let adminUsers = [];
let adminProfileById = new Map();
let adminCalDate = new Date();
let adminSelCourt = null;
let adminSelDuration = 1;
let adminSelTime = null;
let adminBookedSlots = {};
let adminReportData = [];
let adminReportFiltered = [];
let adminReportPage = 1;
const adminReportSize = 20;

// Initialize with delay to ensure shared.js is loaded
function initAdmin() {
  if (typeof PadelGo === 'undefined' || typeof PadelGo.Supabase === 'undefined') {
    setTimeout(initAdmin, 100);
    return;
  }
  adminInit();
}

async function adminInit() {
  try {
    // Show loading
    document.getElementById('adminLoading').style.display = 'flex';
    document.getElementById('adminAuthError').style.display = 'none';
    document.getElementById('adminContent').style.display = 'none';
    
    const supabase = await PadelGo.Supabase.init();
    if (!supabase) {
      adminShowAuthError('Supabase belum dikonfigurasi.');
      return;
    }
    
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) throw sessionError;
    
    if (!session) {
      adminShowAuthError('Anda harus login terlebih dahulu.');
      return;
    }
    
    // Check admin role
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role, name, email')
      .eq('id', session.user.id)
      .single();
    
    if (profileError) throw profileError;
    
    if (!profile || profile.role !== 'admin') {
      adminShowAuthError('Anda tidak memiliki akses admin. Role Anda: ' + (profile?.role || 'tidak ada'));
      return;
    }
    
    // Load data
    await adminLoadData();
    
    // Setup tabs
    document.querySelectorAll('.admin-tab').forEach(btn => {
      btn.addEventListener('click', () => adminSwitchTab(btn.dataset.tab));
    });
    
    // Show content
    document.getElementById('adminLoading').style.display = 'none';
    document.getElementById('adminContent').style.display = 'block';
    
  } catch (err) {
    adminShowAuthError('Error: ' + (err.message || err.toString()));
  }
}

function adminShowAuthError(msg) {
  document.getElementById('adminLoading').style.display = 'none';
  document.getElementById('adminAuthError').style.display = 'flex';
  const el = document.querySelector('#adminAuthError p:nth-child(3)');
  if (el) el.textContent = msg;
}

async function adminLoadData() {
  try {
    const supabase = await PadelGo.Supabase.init();
    
    const [bRes, cRes, uRes] = await Promise.all([
      supabase.from('bookings').select('*').order('date', { ascending: false }),
      supabase.from('courts').select('*').order('name'),
      supabase.from('profiles').select('id, name, email, phone, role, avatar_url, created_at').order('created_at', { ascending: false })
    ]);
    
    if (bRes.error) console.error('Bookings error:', bRes.error);
    if (cRes.error) console.error('Courts error:', cRes.error);
    if (uRes.error) console.error('Profiles error:', uRes.error);
    
    adminBookings = bRes.data || [];
    adminCourts = cRes.data || [];
    adminUsers = uRes.data || [];
    adminProfileById = new Map(adminUsers.map(u => [u.id, u]));
    
    adminUpdatePendingBadge();
    adminRenderAll();
  } catch (err) {
    console.error('Load data error:', err);
    adminToast('Error loading data: ' + err.message, 'error');
  }
}

function adminUpdatePendingBadge() {
  const pending = adminBookings.filter(b => b.status === 'pending').length;
  const badge = document.getElementById('pendingBadge');
  if (pending > 0) {
    badge.textContent = pending;
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
  }
}

function adminRenderAll() {
  // Stats
  const approved = adminBookings.filter(b => b.status === 'approved');
  const pending = adminBookings.filter(b => b.status === 'pending');
  const revenue = approved.reduce((s, b) => s + (b.amount || 0), 0);
  
  document.getElementById('stat-total').textContent = adminBookings.length;
  document.getElementById('stat-pending').textContent = pending.length;
  document.getElementById('stat-approved').textContent = approved.length;
  document.getElementById('stat-revenue').textContent = adminRupiah(revenue);
  document.getElementById('stat-courts').textContent = adminCourts.filter(c => c.available).length;
  
  document.getElementById('fin-approved').textContent = adminRupiah(revenue);
  document.getElementById('fin-pending').textContent = adminRupiah(pending.reduce((s, b) => s + (b.amount || 0), 0));
  document.getElementById('fin-cancelled').textContent = adminRupiah(adminBookings.filter(b => b.status === 'cancelled').reduce((s, b) => s + (b.amount || 0), 0));
  
  adminRenderCalendar();
  adminRenderRecentBookings();
  adminRenderBookings();
  adminRenderCourts();
  adminRenderFinance();
  adminRenderUsers();
  adminPopulateFilters();
}

function adminSwitchTab(tab) {
  document.querySelectorAll('.admin-section').forEach(s => s.classList.add('hidden'));
  document.querySelectorAll('.admin-tab').forEach(b => {
    const isActive = b.dataset.tab === tab;
    if (isActive) {
      b.classList.add('bg-slate-950', 'text-white', 'dark:bg-white', 'dark:text-slate-950');
      b.classList.remove('text-slate-600', 'dark:text-slate-300');
    } else {
      b.classList.remove('bg-slate-950', 'text-white', 'dark:bg-white', 'dark:text-slate-950');
      b.classList.add('text-slate-600', 'dark:text-slate-300');
    }
  });
  
  document.getElementById('tab-' + tab)?.classList.remove('hidden');
  
  if (tab === 'reports') {
    adminInitReports();
  }
}

// Calendar
function adminCalPrev() {
  adminCalDate.setMonth(adminCalDate.getMonth() - 1);
  adminRenderCalendar();
}

function adminCalNext() {
  adminCalDate.setMonth(adminCalDate.getMonth() + 1);
  adminRenderCalendar();
}

function adminRenderCalendar() {
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  document.getElementById('cal-month').textContent = months[adminCalDate.getMonth()] + ' ' + adminCalDate.getFullYear();
  
  const year = adminCalDate.getFullYear();
  const month = adminCalDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  
  const byDate = {};
  adminBookings.forEach(b => {
    if (!byDate[b.date]) byDate[b.date] = { approved: 0, pending: 0, cancelled: 0 };
    if (b.status === 'approved') byDate[b.date].approved++;
    else if (b.status === 'pending') byDate[b.date].pending++;
    else byDate[b.date].cancelled++;
  });
  
  let html = '';
  for (let i = 0; i < firstDay; i++) html += '<div></div>';
  for (let d = 1; d <= daysInMonth; d++) {
    const ds = year + '-' + String(month + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0');
    const isToday = ds === todayStr;
    const bd = byDate[ds] || {};
    const total = bd.approved + bd.pending + bd.cancelled;
    html += `<button type="button" onclick="adminShowDay('${ds}')" class="aspect-square flex flex-col items-center justify-center rounded-lg border p-1 sm:p-2 transition hover:border-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/20 ${isToday ? 'border-teal-500 bg-teal-50 dark:border-teal-400 dark:bg-teal-900/30' : 'border-slate-200 dark:border-slate-700'}">
      <span class="text-xs sm:text-sm font-bold ${isToday ? 'text-teal-700 dark:text-teal-300' : 'text-slate-700 dark:text-slate-300'}">${d}</span>
      ${total > 0 ? `<div class="flex gap-0.5 mt-0.5">${bd.approved ? '<span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>' : ''}${bd.pending ? '<span class="h-1.5 w-1.5 rounded-full bg-amber-500"></span>' : ''}${bd.cancelled ? '<span class="h-1.5 w-1.5 rounded-full bg-red-500"></span>' : ''}</div>` : ''}
    </button>`;
  }
  document.getElementById('cal-grid').innerHTML = html;
}

function adminShowDay(dateStr) {
  const dayBookings = adminBookings.filter(b => b.date === dateStr);
  const d = new Date(dateStr + 'T00:00:00');
  const formatted = d.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  
  document.getElementById('day-title').textContent = 'Booking ' + formatted;
  document.getElementById('day-subtitle').textContent = dayBookings.length + ' booking';
  
  if (!dayBookings.length) {
    document.getElementById('day-content').innerHTML = '<p class="text-center py-8 text-slate-500">Tidak ada booking.</p>';
  } else {
    document.getElementById('day-content').innerHTML = dayBookings.map(b => {
      const u = adminProfileById.get(b.user_id);
      const name = u?.name || u?.email || 'User';
      return `<div class="mb-3 rounded-xl border border-slate-200 p-4 dark:border-slate-700 dark:bg-slate-800/50">
        <div class="flex items-center justify-between">
          <div>
            <span class="font-bold text-slate-900 dark:text-white">${adminEsc(b.court_name || b.court_id)}</span>
            <span class="ml-2 rounded-full px-2 py-0.5 text-xs font-bold ${adminStatusClass(b.status)}">${adminStatusLabel(b.status)}</span>
            <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">${b.start_time} - ${b.end_time}</p>
            <p class="text-xs text-slate-500">${adminEsc(name)}</p>
            <p class="mt-1 font-bold text-teal-600">${adminRupiah(b.amount)}</p>
          </div>
          <div class="flex gap-1">
            ${b.status === 'pending' ? `<button onclick="adminSetStatus('${b.id}','approved');adminCloseDayModal();" class="rounded-lg bg-emerald-100 p-2 text-emerald-700 hover:bg-emerald-200"><svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg></button>` : ''}
            ${b.status !== 'cancelled' ? `<button onclick="adminSetStatus('${b.id}','cancelled');adminCloseDayModal();" class="rounded-lg bg-red-100 p-2 text-red-700 hover:bg-red-200"><svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>` : ''}
          </div>
        </div>
      </div>`;
    }).join('');
  }
  
  document.getElementById('day-modal').classList.remove('hidden');
}

function adminCloseDayModal() {
  document.getElementById('day-modal').classList.add('hidden');
}

function adminRenderRecentBookings() {
  const recent = adminBookings.slice(0, 5);
  if (!recent.length) {
    document.getElementById('recent-list').innerHTML = '<p class="text-sm text-slate-500 text-center py-4">Belum ada booking.</p>';
    return;
  }
  document.getElementById('recent-list').innerHTML = recent.map(b => {
    const u = adminProfileById.get(b.user_id);
    const name = u?.name || u?.email || 'User';
    return `<div class="flex items-center justify-between rounded-lg border border-slate-100 p-3 dark:border-slate-800">
      <div class="flex items-center gap-3">
        <div class="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center text-sm font-bold text-teal-700">${(name || 'U')[0].toUpperCase()}</div>
        <div>
          <p class="font-bold text-sm text-slate-900 dark:text-white">${adminEsc(name)}</p>
          <p class="text-xs text-slate-500">${adminEsc(b.court_name || b.court_id)} • ${b.date}</p>
        </div>
      </div>
      <div class="text-right">
        <span class="rounded-full px-2 py-0.5 text-xs font-bold ${adminStatusClass(b.status)}">${adminStatusLabel(b.status)}</span>
        <p class="mt-1 text-sm font-bold text-teal-600">${adminRupiah(b.amount)}</p>
      </div>
    </div>`;
  }).join('');
}

// Bookings Tab
function adminFilterBookings() {
  const status = document.getElementById('filter-status').value;
  const court = document.getElementById('filter-court').value;
  const filtered = adminBookings.filter(b => {
    if (status !== 'all' && b.status !== status) return false;
    if (court !== 'all' && b.court_id !== court) return false;
    return true;
  });
  adminRenderBookingsTable(filtered);
}

function adminRenderBookings() {
  adminRenderBookingsTable(adminBookings);
}

function adminRenderBookingsTable(bookings) {
  if (!bookings.length) {
    document.getElementById('bookings-table').innerHTML = '<tr><td colspan="7" class="px-4 py-12 text-center text-slate-500">Tidak ada booking.</td></tr>';
    return;
  }
  document.getElementById('bookings-table').innerHTML = bookings.map(b => {
    const u = adminProfileById.get(b.user_id);
    const name = u?.name || u?.email || 'User';
    return `<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/60">
      <td class="px-4 py-3">
        <div class="flex items-center gap-2">
          <div class="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center text-xs font-bold text-teal-700">${(name || 'U')[0].toUpperCase()}</div>
          <span class="font-bold text-sm text-slate-900 dark:text-white">${adminEsc(name)}</span>
        </div>
      </td>
      <td class="px-4 py-3 font-bold text-sm">${adminEsc(b.court_name || b.court_id)}</td>
      <td class="px-4 py-3 text-sm">${b.date}</td>
      <td class="px-4 py-3 text-sm">${b.start_time} - ${b.end_time}</td>
      <td class="px-4 py-3"><span class="rounded-full px-2.5 py-1 text-xs font-bold ${adminStatusClass(b.status)}">${adminStatusLabel(b.status)}</span></td>
      <td class="px-4 py-3 font-bold text-sm">${adminRupiah(b.amount)}</td>
      <td class="px-4 py-3">
        ${b.status === 'pending' ? `<button onclick="adminSetStatus('${b.id}','approved')" class="rounded-lg bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700 hover:bg-emerald-200 mr-1">✓</button>` : ''}
        ${b.status !== 'cancelled' ? `<button onclick="adminSetStatus('${b.id}','cancelled')" class="rounded-lg bg-red-100 px-3 py-1.5 text-xs font-bold text-red-700 hover:bg-red-200">✗</button>` : ''}
      </td>
    </tr>`;
  }).join('');
}

async function adminSetStatus(id, status) {
  if (status === 'cancelled' && !confirm('Batalkan booking ini?')) return;
  try {
    const supabase = await PadelGo.Supabase.init();
    const { error } = await supabase.from('bookings').update({ status }).eq('id', id);
    if (error) throw error;
    adminToast(status === 'approved' ? 'Booking approved!' : 'Booking cancelled');
    await adminLoadData();
  } catch (err) {
    adminToast(err.message || 'Error', 'error');
  }
}

// Courts Tab
function adminRenderCourts() {
  if (!adminCourts.length) {
    document.getElementById('courts-list').innerHTML = '<div class="px-6 py-12 text-center text-slate-500">Belum ada lapangan.</div>';
    return;
  }
  document.getElementById('courts-list').innerHTML = adminCourts.map(c => `<div class="flex items-center justify-between px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50">
    <div class="flex items-center gap-3">
      <img src="${c.image_url || '/images/padel1.jpg'}" class="h-14 w-20 rounded-lg object-cover">
      <div>
        <p class="font-extrabold text-slate-900 dark:text-white">${adminEsc(c.name)}</p>
        <p class="text-sm text-slate-500">${adminEsc(c.type || c.surface || '')}</p>
      </div>
    </div>
    <div class="flex items-center gap-3">
      <div class="text-right">
        <p class="font-bold text-teal-600">${adminRupiah(c.price_per_hour)}/jam</p>
        <span class="rounded-full px-2 py-0.5 text-xs font-bold ${c.available ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}">${c.available ? 'Aktif' : 'Hidden'}</span>
      </div>
      <button onclick="adminEditCourt('${c.id}')" class="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">Edit</button>
    </div>
  </div>`).join('');
}

function adminEditCourt(id) {
  const c = adminCourts.find(x => x.id === id);
  if (!c) return;
  document.getElementById('court-edit-id').value = id;
  document.getElementById('court-name').value = c.name;
  document.getElementById('court-price').value = c.price_per_hour;
  document.getElementById('court-type').value = c.type || '';
  document.getElementById('court-surface').value = c.surface || '';
  document.getElementById('court-submit').textContent = 'Update';
  document.getElementById('court-cancel').classList.remove('hidden');
}

function adminCancelCourtEdit() {
  document.getElementById('court-form').reset();
  document.getElementById('court-edit-id').value = '';
  document.getElementById('court-submit').textContent = 'Simpan';
  document.getElementById('court-cancel').classList.add('hidden');
}

async function adminSaveCourt(e) {
  e.preventDefault();
  const supabase = await PadelGo.Supabase.init();
  const id = document.getElementById('court-edit-id').value;
  const name = document.getElementById('court-name').value.trim();
  const price = parseInt(document.getElementById('court-price').value);
  const type = document.getElementById('court-type').value.trim();
  const surface = document.getElementById('court-surface').value.trim();
  const imageFile = document.getElementById('court-image').files[0];
  
  try {
    let imageUrl = '';
    if (imageFile) {
      if (imageFile.size > 5 * 1024 * 1024) throw new Error('Ukuran gambar maks 5MB');
      const ext = imageFile.name.split('.').pop() || 'jpg';
      const fileName = Date.now() + '-' + name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.' + ext;
      const { error: upErr } = await supabase.storage.from('court-images').upload(fileName, imageFile, { upsert: true });
      if (upErr) throw upErr;
      imageUrl = supabase.storage.from('court-images').getPublicUrl(fileName).data.publicUrl;
    }
    
    const courtId = id || name.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8) || 'C' + Date.now();
    const data = { id: courtId, name, type, surface, price_per_hour: price, available: true };
    if (imageUrl) data.image_url = imageUrl;
    
    const { error } = await supabase.from('courts').upsert(data, { onConflict: 'id' });
    if (error) throw error;
    
    adminToast(id ? 'Lapangan diupdate!' : 'Lapangan ditambahkan!');
    adminCancelCourtEdit();
    await adminLoadData();
  } catch (err) {
    adminToast(err.message || 'Error', 'error');
  }
}

// Finance Tab
function adminRenderFinance() {
  document.getElementById('finance-total-approved').textContent = adminRupiah(adminBookings.filter(b => b.status === 'approved').reduce((s, b) => s + (b.amount || 0), 0));
  document.getElementById('finance-total-pending').textContent = adminRupiah(adminBookings.filter(b => b.status === 'pending').reduce((s, b) => s + (b.amount || 0), 0));
  document.getElementById('finance-total-cancelled').textContent = adminRupiah(adminBookings.filter(b => b.status === 'cancelled').reduce((s, b) => s + (b.amount || 0), 0));
  
  document.getElementById('finance-table').innerHTML = adminCourts.map(c => {
    const items = adminBookings.filter(b => b.court_id === c.id);
    const approved = items.filter(b => b.status === 'approved').reduce((s, b) => s + (b.amount || 0), 0);
    const pending = items.filter(b => b.status === 'pending').reduce((s, b) => s + (b.amount || 0), 0);
    return `<tr>
      <td class="px-4 py-3 font-bold">${adminEsc(c.name)}</td>
      <td class="px-4 py-3">${items.length}</td>
      <td class="px-4 py-3 font-bold text-emerald-600">${adminRupiah(approved)}</td>
      <td class="px-4 py-3 font-bold text-amber-600">${adminRupiah(pending)}</td>
    </tr>`;
  }).join('') || '<tr><td colspan="4" class="px-4 py-8 text-center text-slate-500">Tidak ada data.</td></tr>';
}

// Users Tab
function adminRenderUsers() {
  const users = adminUsers;
  const nonAdmin = users.filter(u => u.role !== 'admin').length;
  const adminCnt = users.filter(u => u.role === 'admin').length;
  document.getElementById('users-count').textContent = `${nonAdmin} user${nonAdmin !== 1 ? 's' : ''} • ${adminCnt} admin`;
  
  if (!users.length) {
    document.getElementById('users-table').innerHTML = '<tr><td colspan="6" class="px-4 py-12 text-center text-slate-500">Belum ada user.</td></tr>';
    return;
  }
  document.getElementById('users-table').innerHTML = users.map(u => {
    const name = u.name || u.email || 'User';
    const initials = name.split(' ').map(p => p[0]).join('').toUpperCase().slice(0, 2);
    return `<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/60">
      <td class="px-4 py-3">
        <div class="flex items-center gap-3">
          ${u.avatar_url ? `<img src="${u.avatar_url}" class="h-10 w-10 rounded-full object-cover">` : `<div class="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center text-sm font-bold text-teal-700">${initials}</div>`}
          <span class="font-extrabold text-sm text-slate-900 dark:text-white">${adminEsc(name)}</span>
        </div>
      </td>
      <td class="px-4 py-3 text-sm">${adminEsc(u.email || '-')}</td>
      <td class="px-4 py-3 text-sm">${adminEsc(u.phone || '-')}</td>
      <td class="px-4 py-3"><span class="rounded-full px-2.5 py-1 text-xs font-bold ${u.role === 'admin' ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-700'}">${u.role || 'user'}</span></td>
      <td class="px-4 py-3 text-xs text-slate-500">${u.created_at ? u.created_at.slice(0, 10) : '-'}</td>
      <td class="px-4 py-3 text-right">
        <button onclick="adminOpenUserModal('${u.id}')" class="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">Edit</button>
      </td>
    </tr>`;
  }).join('');
}

function adminOpenUserModal(id) {
  const u = adminUsers.find(x => x.id === id);
  if (!u) return;
  const name = u.name || u.email || 'User';
  document.getElementById('user-id').value = id;
  document.getElementById('user-name').value = u.name || '';
  document.getElementById('user-email').value = u.email || '';
  document.getElementById('user-phone').value = u.phone || '';
  document.getElementById('user-role').value = u.role || 'user';
  document.getElementById('user-name-preview').textContent = name;
  document.getElementById('user-email-preview').textContent = u.email || '-';
  document.getElementById('user-avatar').src = u.avatar_url || PadelGo.UI.defaultAvatar();
  document.getElementById('user-error').classList.add('hidden');
  document.getElementById('user-modal').classList.remove('hidden');
}

function adminCloseUserModal() {
  document.getElementById('user-modal').classList.add('hidden');
}

async function adminSaveUser(e) {
  e.preventDefault();
  const supabase = await PadelGo.Supabase.init();
  const id = document.getElementById('user-id').value;
  const name = document.getElementById('user-name').value.trim();
  const email = document.getElementById('user-email').value.trim();
  const phone = document.getElementById('user-phone').value.trim();
  const role = document.getElementById('user-role').value;
  
  try {
    const { error } = await supabase.from('profiles').update({ name, email, phone, role }).eq('id', id);
    if (error) throw error;
    adminToast('User diupdate!');
    adminCloseUserModal();
    await adminLoadData();
  } catch (err) {
    document.getElementById('user-error').textContent = err.message || 'Error';
    document.getElementById('user-error').classList.remove('hidden');
  }
}

async function adminDeleteUser() {
  const id = document.getElementById('user-id').value;
  if (!confirm('Hapus user ini? Semua booking juga akan dihapus.')) return;
  try {
    const supabase = await PadelGo.Supabase.init();
    await supabase.from('bookings').delete().eq('user_id', id);
    const { error } = await supabase.from('profiles').delete().eq('id', id);
    if (error) throw error;
    adminToast('User dihapus!');
    adminCloseUserModal();
    await adminLoadData();
  } catch (err) {
    adminToast(err.message || 'Error', 'error');
  }
}

// Reports Tab
function adminInitReports() {
  adminReportData = [...adminBookings];
  adminReportFiltered = [...adminReportData];
  adminReportPage = 1;
  
  // Set default date range to current month
  const now = new Date();
  const first = new Date(now.getFullYear(), now.getMonth(), 1);
  const last = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  
  document.getElementById('report-from').value = first.toISOString().split('T')[0];
  document.getElementById('report-to').value = last.toISOString().split('T')[0];
  
  // Populate court filter
  const sel = document.getElementById('report-court');
  sel.innerHTML = '<option value="">Semua</option>' + adminCourts.map(c => `<option value="${c.id}">${adminEsc(c.name)}</option>`).join('');
  
  adminSetPeriod('month');
}

function adminSetPeriod(period) {
  document.querySelectorAll('.report-btn').forEach(b => {
    b.classList.remove('border-teal-500', 'bg-teal-100', 'text-teal-700', 'dark:bg-teal-900/50', 'dark:border-teal-700', 'dark:text-teal-300');
    b.classList.add('border-slate-200', 'text-slate-600', 'dark:border-slate-700', 'dark:text-slate-300');
  });
  const btn = document.querySelector(`.report-btn[data-period="${period}"]`);
  if (btn) {
    btn.classList.remove('border-slate-200', 'text-slate-600', 'dark:border-slate-700', 'dark:text-slate-300');
    btn.classList.add('border-teal-500', 'bg-teal-100', 'text-teal-700', 'dark:bg-teal-900/50', 'dark:border-teal-700', 'dark:text-teal-300');
  }
  
  const now = new Date();
  let from, to;
  switch(period) {
    case 'today': from = to = now; break;
    case 'week': from = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay()); to = new Date(from); to.setDate(to.getDate() + 6); break;
    case 'month': from = new Date(now.getFullYear(), now.getMonth(), 1); to = new Date(now.getFullYear(), now.getMonth() + 1, 0); break;
    case 'year': from = new Date(now.getFullYear(), 0, 1); to = new Date(now.getFullYear(), 11, 31); break;
  }
  
  document.getElementById('report-from').value = from.toISOString().split('T')[0];
  document.getElementById('report-to').value = to.toISOString().split('T')[0];
  adminApplyFilter();
}

function adminApplyFilter() {
  const from = document.getElementById('report-from').value;
  const to = document.getElementById('report-to').value;
  const court = document.getElementById('report-court').value;
  const status = document.getElementById('report-status').value;
  
  adminReportFiltered = adminReportData.filter(b => {
    if (from && b.date < from) return false;
    if (to && b.date > to) return false;
    if (court && b.court_id !== court) return false;
    if (status && b.status !== status) return false;
    return true;
  });
  
  adminReportPage = 1;
  adminRenderReport();
}

function adminRenderReport() {
  const total = adminReportFiltered.length;
  const revenue = adminReportFiltered.filter(b => b.status === 'approved').reduce((s, b) => s + (b.amount || 0), 0);
  const pending = adminReportFiltered.filter(b => b.status === 'pending').length;
  const users = new Set(adminReportFiltered.map(b => b.user_id)).size;
  
  document.getElementById('report-total').textContent = total;
  document.getElementById('report-revenue').textContent = adminRupiah(revenue);
  document.getElementById('report-pending').textContent = pending;
  document.getElementById('report-users').textContent = users;
  
  const start = (adminReportPage - 1) * adminReportSize;
  const page = adminReportFiltered.slice(start, start + adminReportSize);
  const totalPages = Math.ceil(total / adminReportSize) || 1;
  
  if (!page.length) {
    document.getElementById('report-table').innerHTML = '<tr><td colspan="8" class="px-4 py-12 text-center text-slate-500">Tidak ada data.</td></tr>';
  } else {
    document.getElementById('report-table').innerHTML = page.map((b, i) => {
      const u = adminProfileById.get(b.user_id);
      const name = u?.name || u?.email || 'User';
      return `<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
        <td class="px-4 py-3 text-sm text-slate-500">${start + i + 1}</td>
        <td class="px-4 py-3 text-sm">${adminEsc(name)}</td>
        <td class="px-4 py-3 text-sm">${adminEsc(b.court_name || b.court_id)}</td>
        <td class="px-4 py-3 text-sm">${b.date}</td>
        <td class="px-4 py-3 text-sm">${b.start_time} - ${b.end_time}</td>
        <td class="px-4 py-3 text-sm">${b.duration_hours || 1} jam</td>
        <td class="px-4 py-3"><span class="rounded-full px-2.5 py-0.5 text-xs font-bold ${adminStatusClass(b.status)}">${adminStatusLabel(b.status)}</span></td>
        <td class="px-4 py-3 text-right font-bold text-sm">${adminRupiah(b.amount)}</td>
      </tr>`;
    }).join('');
  }
  
  document.getElementById('report-count').textContent = `${start + 1}-${Math.min(start + adminReportSize, total)} dari ${total}`;
  document.getElementById('report-prev').disabled = adminReportPage <= 1;
  document.getElementById('report-next').disabled = adminReportPage >= totalPages;
}

function adminReportPage(delta) {
  adminReportPage = Math.max(1, adminReportPage + delta);
  adminRenderReport();
}

function adminExportCSV() {
  if (!adminReportFiltered.length) return adminToast('Tidak ada data', 'error');
  const headers = ['No', 'Nama', 'Email', 'Lapangan', 'Tanggal', 'Waktu', 'Durasi', 'Status', 'Jumlah'];
  const rows = adminReportFiltered.map((b, i) => {
    const u = adminProfileById.get(b.user_id);
    return [i+1, u?.name || 'User', u?.email || '-', b.court_name || b.court_id, b.date, b.start_time + '-' + b.end_time, b.duration_hours + ' jam', adminStatusLabel(b.status), b.amount];
  });
  const csv = [headers, ...rows].map(r => r.map(c => `"${c || ''}"`).join(',')).join('\n');
  adminDownload(csv, `padelgo-report-${Date.now()}.csv`, 'text/csv');
  adminToast('CSV exported!');
}

function adminExportExcel() {
  if (!adminReportFiltered.length) return adminToast('Tidak ada data', 'error');
  const total = adminReportFiltered.filter(b => b.status === 'approved').reduce((s, b) => s + (b.amount || 0), 0);
  let html = `<html><head><meta charset="utf-8"><title>PadelGo Report</title><style>th{background:#0d9488;color:white;padding:8px;}td,th{border:1px solid #ddd;padding:8px;}</style></head><body>
    <h2>PadelGo Booking Report</h2>
    <p>Total: ${adminReportFiltered.length} | Approved Revenue: ${adminRupiah(total)}</p>
    <table><tr><th>No</th><th>Nama</th><th>Lapangan</th><th>Tanggal</th><th>Waktu</th><th>Status</th><th>Jumlah</th></tr>`;
  adminReportFiltered.forEach((b, i) => {
    const u = adminProfileById.get(b.user_id);
    html += `<tr><td>${i+1}</td><td>${u?.name || 'User'}</td><td>${b.court_name || b.court_id}</td><td>${b.date}</td><td>${b.start_time}-${b.end_time}</td><td>${adminStatusLabel(b.status)}</td><td>${b.amount}</td></tr>`;
  });
  html += '</table></body></html>';
  adminDownload(html, `padelgo-report-${Date.now()}.xls`, 'application/vnd.ms-excel');
  adminToast('Excel exported!');
}

function adminDownload(content, filename, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
}

// Filters
function adminPopulateFilters() {
  const sel = document.getElementById('filter-court');
  sel.innerHTML = '<option value="all">Semua Lapangan</option>' + adminCourts.map(c => `<option value="${c.id}">${adminEsc(c.name)}</option>`).join('');
}

// Manual Booking Modal
function adminOpenBookingModal() {
  adminSelCourt = null;
  adminSelTime = null;
  adminSelDuration = 1;
  adminBookedSlots = {};
  document.getElementById('booking-form').reset();
  document.getElementById('booking-court').value = '';
  document.getElementById('booking-time').value = '';
  document.getElementById('booking-duration').value = '1';
  document.getElementById('booking-summary').classList.add('hidden');
  document.getElementById('booking-error').classList.add('hidden');
  document.getElementById('booking-date').min = new Date().toISOString().split('T')[0];
  adminSetDuration(1);
  
  // Render courts
  document.getElementById('booking-courts').innerHTML = adminCourts.filter(c => c.available).map(c => `<button type="button" onclick="adminSelectCourt('${c.id}', this)" class="court-btn rounded-xl border border-slate-200 p-3 text-left hover:border-teal-500 dark:border-slate-700">
    <span class="block font-bold text-sm">${adminEsc(c.name)}</span>
    <span class="text-xs text-slate-500">${adminRupiah(c.price_per_hour)}/jam</span>
  </button>`).join('');
  
  // Render time slots
  adminRenderTimeSlots();
  
  document.getElementById('booking-modal').classList.remove('hidden');
}

function adminCloseBookingModal() {
  document.getElementById('booking-modal').classList.add('hidden');
}

function adminSelectCourt(id, btn) {
  adminSelCourt = id;
  document.getElementById('booking-court').value = id;
  document.querySelectorAll('.court-btn').forEach(b => { b.classList.remove('border-teal-500', 'bg-teal-500'); b.classList.add('border-slate-200', 'dark:border-slate-700'); b.querySelector('span:first-child')?.classList.remove('text-white'); b.querySelector('span:first-child')?.classList.add('text-slate-900', 'dark:text-white'); });
  btn.classList.remove('border-slate-200', 'dark:border-slate-700'); btn.classList.add('border-teal-500', 'bg-teal-500'); btn.querySelector('span:first-child')?.classList.remove('text-slate-900', 'dark:text-white'); btn.querySelector('span:first-child')?.classList.add('text-white');
  adminLoadAvailability();
}

async function adminLoadAvailability() {
  const date = document.getElementById('booking-date').value;
  if (!adminSelCourt || !date) { adminBookedSlots[adminSelCourt] = []; adminRenderTimeSlots(); return; }
  const supabase = await PadelGo.Supabase.init();
  const { data } = await supabase.rpc('get_booked_slots', { p_court_id: adminSelCourt, p_date: date });
  adminBookedSlots[adminSelCourt] = [];
  (data || []).forEach(b => {
    const sh = parseInt(String(b.start_time).split(':')[0]);
    const eh = parseInt(String(b.end_time).split(':')[0]);
    for (let h = sh; h < eh; h++) {
      const label = String(h).padStart(2, '0') + ':00';
      if (!adminBookedSlots[adminSelCourt].includes(label)) adminBookedSlots[adminSelCourt].push(label);
    }
  });
  adminRenderTimeSlots();
}

function adminSetDuration(h) {
  adminSelDuration = h;
  document.getElementById('booking-duration').value = h;
  document.querySelectorAll('.dur-btn').forEach(b => { b.classList.remove('border-teal-500', 'bg-teal-500', 'text-white'); b.classList.add('border-slate-200', 'text-slate-600', 'dark:text-slate-300'); });
  document.querySelector(`.dur-btn[data-hours="${h}"]`)?.classList.add('border-teal-500', 'bg-teal-500', 'text-white');
  adminRenderTimeSlots();
  adminUpdateSummary();
}

function adminRenderTimeSlots() {
  const grid = document.getElementById('booking-times');
  grid.innerHTML = '';
  for (let h = 0; h < 24; h++) {
    const label = String(h).padStart(2, '0') + ':00';
    const booked = adminBookedSlots[adminSelCourt]?.includes(label);
    let available = !booked && h + adminSelDuration <= 24;
    if (available) {
      for (let offset = 1; offset < adminSelDuration; offset++) {
        if (adminBookedSlots[adminSelCourt]?.includes(String(h + offset).padStart(2, '0') + ':00')) { available = false; break; }
      }
    }
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = label;
    btn.disabled = !available || !adminSelCourt;
    btn.className = available && adminSelCourt ? 'rounded-lg bg-white border border-slate-200 px-1 py-2 text-xs font-bold text-slate-700 hover:bg-teal-100 dark:bg-slate-800 dark:text-slate-200' : 'rounded-lg bg-slate-100 px-1 py-2 text-xs font-bold text-slate-400 line-through cursor-not-allowed dark:bg-slate-900 dark:text-slate-600';
    btn.onclick = available && adminSelCourt ? () => adminSelectTime(label, btn) : null;
    grid.appendChild(btn);
  }
  adminSelTime = null;
  document.getElementById('booking-time').value = '';
  adminUpdateSummary();
}

function adminSelectTime(time, btn) {
  adminSelTime = time;
  document.getElementById('booking-time').value = time;
  grid.querySelectorAll('button').forEach(b => b.classList.remove('bg-teal-500', 'text-white'));
  btn.classList.add('bg-teal-500', 'text-white');
  adminUpdateSummary();
}

function adminUpdateSummary() {
  const sum = document.getElementById('booking-summary');
  const txt = document.getElementById('booking-summary-text');
  if (adminSelCourt && adminSelTime && adminSelDuration) {
    const c = adminCourts.find(x => x.id === adminSelCourt);
    const endH = parseInt(adminSelTime.split(':')[0]) + adminSelDuration;
    const total = (c?.price_per_hour || 150000) * adminSelDuration;
    txt.textContent = `${c?.name || adminSelCourt} | ${adminSelTime} - ${String(endH).padStart(2, '0')}:00 (${adminSelDuration} jam) = ${adminRupiah(total)}`;
    sum.classList.remove('hidden');
  } else {
    sum.classList.add('hidden');
  }
}

async function adminSubmitBooking(e) {
  e.preventDefault();
  const name = document.getElementById('booking-name').value.trim();
  const email = document.getElementById('booking-email').value.trim();
  const date = document.getElementById('booking-date').value;
  const courtId = document.getElementById('booking-court').value;
  const duration = parseInt(document.getElementById('booking-duration').value);
  const time = document.getElementById('booking-time').value;
  
  if (!name || !email || !date || !courtId || !time) {
    document.getElementById('booking-error').textContent = 'Lengkapi semua data.';
    document.getElementById('booking-error').classList.remove('hidden');
    return;
  }
  
  try {
    const supabase = await PadelGo.Supabase.init();
    const { data: profile } = await supabase.from('profiles').select('id').eq('email', email).single();
    if (!profile) throw new Error('Email tidak ditemukan. User harus register dulu.');
    
    const c = adminCourts.find(x => x.id === courtId);
    const endH = parseInt(time.split(':')[0]) + duration;
    const amount = (c?.price_per_hour || 150000) * duration;
    const bookingId = 'BK-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6).toUpperCase();
    
    const { error } = await supabase.from('bookings').insert({
      id: bookingId, user_id: profile.id, court_id: courtId, court_name: c?.name || courtId,
      date, start_time: time, end_time: String(endH).padStart(2, '0') + ':00',
      duration_hours: duration, amount, status: 'approved',
      notes: `Manual by admin. Customer: ${name}`
    });
    if (error) throw error;
    
    adminToast('Booking berhasil dibuat!');
    adminCloseBookingModal();
    await adminLoadData();
  } catch (err) {
    document.getElementById('booking-error').textContent = err.message;
    document.getElementById('booking-error').classList.remove('hidden');
  }
}

// Refresh
async function adminRefresh() {
  const btn = document.getElementById('refreshBtn');
  const icon = document.getElementById('refreshIcon');
  btn.disabled = true;
  icon.classList.add('animate-spin');
  try {
    await adminLoadData();
    adminToast('Data refreshed!');
  } finally {
    btn.disabled = false;
    icon.classList.remove('animate-spin');
  }
}

// Helpers
function adminRupiah(val) { return 'Rp ' + Number(val || 0).toLocaleString('id-ID'); }

function adminEsc(str) {
  const m = {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'};
  return String(str || '').replace(/[&<>"']/g, c => m[c]);
}

function adminStatusClass(s) {
  if (s === 'approved') return 'bg-emerald-100 text-emerald-700';
  if (s === 'pending') return 'bg-amber-100 text-amber-700';
  return 'bg-red-100 text-red-700';
}

function adminStatusLabel(s) {
  if (s === 'approved') return 'Approved';
  if (s === 'pending') return 'Pending';
  return 'Cancelled';
}

function adminToast(msg, type = 'success') {
  let t = document.getElementById('admin-toast');
  if (!t) { t = document.createElement('div'); t.id = 'admin-toast'; t.className = 'fixed top-20 right-4 z-50'; document.body.appendChild(t); }
  const col = type === 'error' ? 'bg-red-500' : 'bg-emerald-500';
  t.innerHTML = `<div class="rounded-xl px-4 py-3 text-sm font-bold text-white shadow-xl ${col}">${msg}</div>`;
  setTimeout(() => t.innerHTML = '', 3000);
}

// Start initialization
initAdmin();
</script>
