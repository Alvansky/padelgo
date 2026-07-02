---
title: "Admin Dashboard"
date: 2026-07-02
draft: false
layout: "padmin"
---

<div id="adminApp" class="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-950 dark:to-slate-900">
  
  <!-- Loading State -->
  <div id="adminLoading" class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <div class="relative">
        <div class="h-16 w-16 animate-spin rounded-full border-4 border-slate-200 border-t-teal-500"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <svg class="h-8 w-8 text-teal-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16c3.5-4.5 6.5-7.5 10-9m-8 12 8-8m-8 0 8 8"/>
          </svg>
        </div>
      </div>
      <p class="mt-6 text-lg font-medium text-slate-600 dark:text-slate-400">Memuat Dashboard...</p>
    </div>
  </div>

  <!-- Auth Error State -->
  <div id="adminAuthError" class="hidden min-h-screen flex items-center justify-center p-4">
    <div class="text-center max-w-md">
      <div class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/40 dark:to-red-800/40">
        <svg class="h-10 w-10 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Akses Ditolak</h2>
      <p id="adminErrorText" class="mt-3 text-slate-600 dark:text-slate-400">Anda harus login sebagai admin untuk mengakses halaman ini.</p>
      <a href="/login/" class="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-3 font-bold text-white shadow-lg shadow-teal-500/30 hover:from-teal-600 hover:to-teal-700 transition-all">
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
        </svg>
        Login Sekarang
      </a>
    </div>
  </div>

  <!-- Admin Content -->
  <div id="adminContent" class="hidden">
    
    <!-- Top Bar -->
    <header class="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/95">
      <div class="flex h-16 items-center justify-between px-4 lg:px-6">
        <div class="flex items-center gap-4">
          <!-- Mobile Menu Toggle -->
          <button onclick="toggleAdminSidebar()" class="lg:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
          
          <!-- Logo -->
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 text-white shadow-lg shadow-teal-500/30">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16c3.5-4.5 6.5-7.5 10-9m-8 12 8-8m-8 0 8 8"/>
              </svg>
            </div>
            <div class="hidden sm:block">
              <h1 class="text-lg font-bold text-slate-900 dark:text-white">PadelGo</h1>
              <p class="text-xs font-medium text-slate-500">Admin Panel</p>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <!-- Refresh Button -->
          <button onclick="adminRefresh()" id="refreshBtn" class="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 active:scale-95 transition-all dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
            <svg id="refreshIcon" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            <span class="hidden sm:inline">Refresh</span>
          </button>
          
          <!-- Admin Badge -->
          <div class="hidden sm:flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-50 to-emerald-50 px-3 py-2 border border-teal-100 dark:from-teal-950/40 dark:to-emerald-950/40 dark:border-teal-800/50">
            <div class="h-6 w-6 rounded-full bg-teal-500 flex items-center justify-center">
              <svg class="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <span class="text-sm font-bold text-teal-700 dark:text-teal-300">Admin</span>
          </div>
        </div>
      </div>
    </header>

    <div class="flex">
      <!-- Sidebar -->
      <aside id="adminSidebar" class="fixed inset-y-0 left-0 z-50 w-64 transform -translate-x-full bg-white transition-transform duration-300 lg:relative lg:translate-x-0 dark:bg-slate-950 border-r border-slate-200/80 dark:border-slate-800/80 pt-16">
        
        <!-- Sidebar Header -->
        <div class="border-b border-slate-100 p-4 dark:border-slate-800/80">
          <div class="flex items-center gap-3">
            <div id="adminAvatar" class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-teal-600 text-white font-bold">
              A
            </div>
            <div class="flex-1 min-w-0">
              <p id="adminName" class="text-sm font-bold text-slate-900 dark:text-white truncate">Admin</p>
              <p class="text-xs text-slate-500 dark:text-slate-400">Administrator</p>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="p-3 space-y-1">
          <p class="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-400">Menu Utama</p>
          
          <button onclick="adminNavigate('overview')" class="admin-nav-btn w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all" data-page="overview">
            <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-sm">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/>
              </svg>
            </div>
            <div>
              <p class="text-sm font-bold">Overview</p>
              <p class="text-xs text-slate-500 dark:text-slate-400">Dashboard utama</p>
            </div>
          </button>

          <button onclick="adminNavigate('bookings')" class="admin-nav-btn w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all" data-page="bookings">
            <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-sm">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-sm font-bold">Booking List</p>
              <p class="text-xs text-slate-500 dark:text-slate-400">Kelola pesanan</p>
            </div>
            <span id="sidebarPendingBadge" class="hidden rounded-full bg-amber-500 px-2 py-0.5 text-xs font-bold text-white"></span>
          </button>

          <button onclick="adminNavigate('manual-booking')" class="admin-nav-btn w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all" data-page="manual-booking">
            <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-sm">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
            </div>
            <div>
              <p class="text-sm font-bold">Booking Manual</p>
              <p class="text-xs text-slate-500 dark:text-slate-400">Tambah pesanan</p>
            </div>
          </button>

          <button onclick="adminNavigate('finance')" class="admin-nav-btn w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all" data-page="finance">
            <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-sm">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <p class="text-sm font-bold">Keuangan</p>
              <p class="text-xs text-slate-500 dark:text-slate-400">Laporan keuangan</p>
            </div>
          </button>

          <button onclick="adminNavigate('reports')" class="admin-nav-btn w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all" data-page="reports">
            <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-sm">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <div>
              <p class="text-sm font-bold">Laporan</p>
              <p class="text-xs text-slate-500 dark:text-slate-400">Download laporan</p>
            </div>
          </button>

          <div class="my-3 border-t border-slate-100 dark:border-slate-800/80"></div>
          <p class="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-400">Kelola</p>

          <button onclick="adminNavigate('courts')" class="admin-nav-btn w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all" data-page="courts">
            <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-slate-500 to-slate-600 text-white shadow-sm">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"/>
              </svg>
            </div>
            <div>
              <p class="text-sm font-bold">Lapangan</p>
              <p class="text-xs text-slate-500 dark:text-slate-400">Kelola courts</p>
            </div>
          </button>

          <button onclick="adminNavigate('users')" class="admin-nav-btn w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all" data-page="users">
            <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-sm">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
            </div>
            <div>
              <p class="text-sm font-bold">Users</p>
              <p class="text-xs text-slate-500 dark:text-slate-400">Kelola member</p>
            </div>
          </button>
        </nav>

        <!-- Sidebar Footer -->
        <div class="absolute bottom-0 left-0 right-0 border-t border-slate-100 p-4 dark:border-slate-800/80">
          <button onclick="logout(); toggleAdminSidebar();" class="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-all dark:text-red-400 dark:hover:bg-red-950/30">
            <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-red-100 dark:bg-red-950/50">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
            </div>
            <div>
              <p class="text-sm font-bold">Logout</p>
              <p class="text-xs text-slate-500 dark:text-slate-400">Keluar akun</p>
            </div>
          </button>
        </div>
      </aside>

      <!-- Sidebar Overlay -->
      <div id="sidebarOverlay" onclick="toggleAdminSidebar()" class="fixed inset-0 z-40 bg-black/50 opacity-0 invisible transition-all lg:hidden"></div>

      <!-- Main Content -->
      <main class="flex-1 min-h-screen p-4 lg:p-6">
        
        <!-- Messages -->
        <div id="adminErrorMsg" class="mb-4 hidden rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800/50 dark:bg-red-950/30" role="alert">
          <div class="flex items-center gap-3">
            <svg class="h-5 w-5 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <p class="text-sm font-semibold text-red-800 dark:text-red-200"></p>
          </div>
        </div>
        <div id="adminSuccessMsg" class="mb-4 hidden rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800/50 dark:bg-emerald-950/30" role="status">
          <div class="flex items-center gap-3">
            <svg class="h-5 w-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <p class="text-sm font-semibold text-emerald-800 dark:text-emerald-200"></p>
          </div>
        </div>

        <!-- ============ OVERVIEW PAGE ============ -->
        <section id="page-overview" class="admin-page">
          <div class="mb-6">
            <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
            <p class="mt-1 text-slate-600 dark:text-slate-400">Selamat datang di PadelGo Admin Panel</p>
          </div>

          <!-- Stats Cards -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div class="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/80 backdrop-blur-sm hover:shadow-md transition-shadow">
              <div class="flex items-center justify-between">
                <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 text-white shadow-lg shadow-teal-500/30">
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                </div>
                <span class="rounded-full bg-teal-100 px-2 py-1 text-xs font-bold text-teal-700 dark:bg-teal-900/50 dark:text-teal-300">Total</span>
              </div>
              <p id="stat-total" class="mt-4 text-3xl font-extrabold text-slate-900 dark:text-white">-</p>
              <p class="mt-1 text-sm text-slate-500">Total Booking</p>
            </div>

            <div class="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/80 backdrop-blur-sm hover:shadow-md transition-shadow">
              <div class="flex items-center justify-between">
                <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-lg shadow-amber-500/30">
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <span class="rounded-full bg-amber-100 px-2 py-1 text-xs font-bold text-amber-700 dark:bg-amber-900/50 dark:text-amber-300">Pending</span>
              </div>
              <p id="stat-pending" class="mt-4 text-3xl font-extrabold text-amber-600">-</p>
              <p class="mt-1 text-sm text-slate-500">Menunggu Approval</p>
            </div>

            <div class="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/80 backdrop-blur-sm hover:shadow-md transition-shadow">
              <div class="flex items-center justify-between">
                <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-lg shadow-emerald-500/30">
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <span class="rounded-full bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">Approved</span>
              </div>
              <p id="stat-approved" class="mt-4 text-3xl font-extrabold text-emerald-600">-</p>
              <p class="mt-1 text-sm text-slate-500">Sudah Disetujui</p>
            </div>

            <div class="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/80 backdrop-blur-sm hover:shadow-md transition-shadow">
              <div class="flex items-center justify-between">
                <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 text-white shadow-lg shadow-purple-500/30">
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <span class="rounded-full bg-purple-100 px-2 py-1 text-xs font-bold text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">Revenue</span>
              </div>
              <p id="stat-revenue" class="mt-4 text-xl lg:text-2xl font-extrabold text-purple-600">-</p>
              <p class="mt-1 text-sm text-slate-500">Total Pendapatan</p>
            </div>
          </div>

          <!-- Calendar Section -->
          <div class="grid gap-6 lg:grid-cols-3">
            <!-- Calendar -->
            <div class="lg:col-span-2 rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800/80 dark:bg-slate-900/80 backdrop-blur-sm overflow-hidden">
              <div class="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800/80">
                <h2 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <svg class="h-5 w-5 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  Kalender Booking
                </h2>
                <div class="flex items-center gap-2">
                  <button onclick="adminCalPrev()" class="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <svg class="h-5 w-5 text-slate-600 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                    </svg>
                  </button>
                  <span id="cal-month" class="min-w-[140px] text-center font-bold text-slate-900 dark:text-white"></span>
                  <button onclick="adminCalNext()" class="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <svg class="h-5 w-5 text-slate-600 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div class="p-4 lg:p-6">
                <div class="grid grid-cols-7 gap-1 mb-2">
                  <div class="text-center py-2 text-xs font-bold text-slate-400">Min</div>
                  <div class="text-center py-2 text-xs font-bold text-slate-500">Sen</div>
                  <div class="text-center py-2 text-xs font-bold text-slate-500">Sel</div>
                  <div class="text-center py-2 text-xs font-bold text-slate-500">Rab</div>
                  <div class="text-center py-2 text-xs font-bold text-slate-500">Kam</div>
                  <div class="text-center py-2 text-xs font-bold text-slate-500">Jum</div>
                  <div class="text-center py-2 text-xs font-bold text-slate-400">Sab</div>
                </div>
                <div id="cal-grid" class="grid grid-cols-7 gap-1 lg:gap-2"></div>
                <div class="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600 dark:text-slate-400">
                  <span class="flex items-center gap-1.5">
                    <span class="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                    <span>Approved</span>
                  </span>
                  <span class="flex items-center gap-1.5">
                    <span class="h-2.5 w-2.5 rounded-full bg-amber-500"></span>
                    <span>Pending</span>
                  </span>
                  <span class="flex items-center gap-1.5">
                    <span class="h-2.5 w-2.5 rounded-full bg-red-400"></span>
                    <span>Cancelled</span>
                  </span>
                </div>
              </div>
            </div>

            <!-- Quick Info -->
            <div class="space-y-4">
              <!-- Quick Stats -->
              <div class="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/80 backdrop-blur-sm">
                <h3 class="text-base font-bold text-slate-900 dark:text-white mb-4">Ringkasan Cepat</h3>
                <div class="space-y-3">
                  <div class="flex items-center justify-between rounded-xl bg-emerald-50 p-3 dark:bg-emerald-950/30">
                    <span class="text-sm font-medium text-emerald-800 dark:text-emerald-200">Revenue Approved</span>
                    <strong id="fin-approved" class="font-extrabold text-emerald-600 dark:text-emerald-400">-</strong>
                  </div>
                  <div class="flex items-center justify-between rounded-xl bg-amber-50 p-3 dark:bg-amber-950/30">
                    <span class="text-sm font-medium text-amber-800 dark:text-amber-200">Pipeline Pending</span>
                    <strong id="fin-pending" class="font-extrabold text-amber-600 dark:text-amber-400">-</strong>
                  </div>
                  <div class="flex items-center justify-between rounded-xl bg-red-50 p-3 dark:bg-red-950/30">
                    <span class="text-sm font-medium text-red-800 dark:text-red-200">Cancelled</span>
                    <strong id="fin-cancelled" class="font-extrabold text-red-600 dark:text-red-400">-</strong>
                  </div>
                </div>
              </div>

              <!-- Recent Bookings -->
              <div class="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/80 backdrop-blur-sm">
                <div class="mb-4 flex items-center justify-between">
                  <h3 class="text-base font-bold text-slate-900 dark:text-white">Booking Terbaru</h3>
                  <button onclick="adminNavigate('bookings')" class="text-xs font-semibold text-teal-600 hover:text-teal-700 dark:text-teal-400">Lihat semua →</button>
                </div>
                <div id="recent-list" class="space-y-3">
                  <div class="flex items-center justify-center py-8">
                    <div class="h-6 w-6 animate-spin rounded-full border-2 border-slate-200 border-t-teal-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ============ BOOKINGS PAGE ============ -->
        <section id="page-bookings" class="admin-page hidden">
          <div class="mb-6">
            <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Booking List</h1>
            <p class="mt-1 text-slate-600 dark:text-slate-400">Kelola dan approve pesanan dari user</p>
          </div>

          <!-- Filters -->
          <div class="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div class="flex flex-wrap gap-2">
              <select id="filter-status" onchange="adminFilterBookings()" class="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold dark:border-slate-700 dark:bg-slate-900">
                <option value="all">Semua Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select id="filter-court" onchange="adminFilterBookings()" class="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold dark:border-slate-700 dark:bg-slate-900">
                <option value="all">Semua Lapangan</option>
              </select>
              <input type="date" id="filter-date-from" onchange="adminFilterBookings()" class="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold dark:border-slate-700 dark:bg-slate-900" placeholder="Dari Tanggal">
              <input type="date" id="filter-date-to" onchange="adminFilterBookings()" class="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold dark:border-slate-700 dark:bg-slate-900" placeholder="Sampai Tanggal">
            </div>
            <button onclick="adminOpenBookingModal()" class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-teal-500/30 hover:from-teal-600 hover:to-teal-700 transition-all">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              Booking Manual
            </button>
          </div>

          <!-- Bookings Table -->
          <div class="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800/80 dark:bg-slate-900/80">
            <div class="overflow-x-auto">
              <table class="w-full min-w-[1000px]">
                <thead>
                  <tr class="border-b border-slate-100 bg-slate-50/80 dark:border-slate-800/80 dark:bg-slate-900">
                    <th class="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">User</th>
                    <th class="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Lapangan</th>
                    <th class="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Tanggal</th>
                    <th class="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Waktu</th>
                    <th class="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                    <th class="px-4 py-3.5 text-right text-xs font-bold uppercase tracking-wider text-slate-500">Jumlah</th>
                    <th class="px-4 py-3.5 text-center text-xs font-bold uppercase tracking-wider text-slate-500">Aksi</th>
                  </tr>
                </thead>
                <tbody id="bookings-table" class="divide-y divide-slate-100 dark:divide-slate-800/80">
                  <tr>
                    <td colspan="7" class="px-4 py-12 text-center">
                      <div class="flex justify-center">
                        <div class="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-teal-500"></div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- ============ MANUAL BOOKING PAGE ============ -->
        <section id="page-manual-booking" class="admin-page hidden">
          <div class="mb-6">
            <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Booking Manual</h1>
            <p class="mt-1 text-slate-600 dark:text-slate-400">Tambahkan pesanan secara manual (wajib: Nama, Email, No. Telepon)</p>
          </div>

          <div class="max-w-3xl">
            <form id="manual-booking-form" onsubmit="adminSubmitManualBooking(event)" class="space-y-6">
              
              <!-- Customer Info Card -->
              <div class="rounded-2xl border border-teal-200/80 bg-gradient-to-br from-teal-50 to-white p-6 dark:border-teal-800/50 dark:from-teal-950/30 dark:to-slate-900">
                <h3 class="flex items-center gap-2 text-lg font-bold text-teal-800 dark:text-teal-200 mb-4">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                  Data Customer (Wajib)
                </h3>
                <div class="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">Nama Lengkap *</label>
                    <input id="mb-name" required placeholder="Masukkan nama lengkap" class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all">
                  </div>
                  <div>
                    <label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">Email *</label>
                    <input id="mb-email" type="email" required placeholder="email@example.com" class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all">
                  </div>
                  <div>
                    <label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">No. Telepon *</label>
                    <input id="mb-phone" type="tel" required placeholder="08xxxxxxxxxx" class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all">
                  </div>
                </div>
              </div>

              <!-- Booking Details Card -->
              <div class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/80">
                <h3 class="flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-white mb-4">
                  <svg class="h-5 w-5 text-slate-600 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  Detail Booking
                </h3>
                
                <div class="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">Tanggal *</label>
                    <input id="mb-date" type="date" required class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all">
                  </div>
                  <div>
                    <label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">Lapangan *</label>
                    <select id="mb-court" required class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all">
                      <option value="">Pilih Lapangan</option>
                    </select>
                  </div>
                </div>

                <div class="mt-4">
                  <label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">Durasi</label>
                  <div class="flex gap-2" id="mb-durations">
                    <button type="button" onclick="adminSetMbDuration(1)" class="mb-dur-btn flex-1 rounded-xl border-2 border-teal-500 bg-teal-500 py-3 text-sm font-extrabold text-white transition-all" data-hours="1">1 Jam</button>
                    <button type="button" onclick="adminSetMbDuration(2)" class="mb-dur-btn flex-1 rounded-xl border-2 border-slate-200 py-3 text-sm font-extrabold text-slate-600 dark:border-slate-700 dark:text-slate-300 transition-all" data-hours="2">2 Jam</button>
                    <button type="button" onclick="adminSetMbDuration(3)" class="mb-dur-btn flex-1 rounded-xl border-2 border-slate-200 py-3 text-sm font-extrabold text-slate-600 dark:border-slate-700 dark:text-slate-300 transition-all" data-hours="3">3 Jam</button>
                    <button type="button" onclick="adminSetMbDuration(4)" class="mb-dur-btn flex-1 rounded-xl border-2 border-slate-200 py-3 text-sm font-extrabold text-slate-600 dark:border-slate-700 dark:text-slate-300 transition-all" data-hours="4">4 Jam</button>
                  </div>
                  <input type="hidden" id="mb-duration" value="1">
                </div>

                <div class="mt-4">
                  <label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">Waktu Mulai</label>
                  <div id="mb-times" class="grid grid-cols-4 sm:grid-cols-6 gap-2"></div>
                  <input type="hidden" id="mb-time" required>
                </div>
              </div>

              <!-- Summary -->
              <div id="mb-summary" class="hidden rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-800/50 dark:bg-emerald-950/30">
                <h4 class="font-bold text-emerald-800 dark:text-emerald-200 mb-3">Ringkasan Booking</h4>
                <div id="mb-summary-content" class="space-y-2 text-sm"></div>
                <div class="mt-4 pt-4 border-t border-emerald-200 dark:border-emerald-800/50">
                  <div class="flex justify-between items-center">
                    <span class="font-bold text-emerald-800 dark:text-emerald-200">Total</span>
                    <span id="mb-total" class="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">-</span>
                  </div>
                </div>
              </div>

              <!-- Error Message -->
              <div id="mb-error" class="hidden rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800/50 dark:bg-red-950/30">
                <p class="text-sm font-semibold text-red-700 dark:text-red-300"></p>
              </div>

              <!-- Submit Button -->
              <button type="submit" class="w-full rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 py-4 text-base font-bold text-white shadow-lg shadow-teal-500/30 hover:from-teal-600 hover:to-teal-700 active:scale-[0.98] transition-all">
                Buat Booking (Auto-Approved)
              </button>
            </form>
          </div>
        </section>

        <!-- ============ FINANCE PAGE ============ -->
        <section id="page-finance" class="admin-page hidden">
          <div class="mb-6">
            <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Keuangan</h1>
            <p class="mt-1 text-slate-600 dark:text-slate-400">Filter dan lihat laporan keuangan berdasarkan periode</p>
          </div>

          <!-- Date Filter -->
          <div class="mb-6 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/80">
            <h3 class="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 mb-4">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
              </svg>
              Filter Periode
            </h3>
            <div class="flex flex-wrap items-end gap-3">
              <!-- Quick Filters -->
              <div class="flex flex-wrap gap-2">
                <button onclick="adminSetFinancePeriod('today')" class="fin-period-btn rounded-lg border border-teal-500 bg-teal-100 px-3 py-1.5 text-xs font-bold text-teal-700 dark:bg-teal-900/50 dark:border-teal-700 dark:text-teal-300" data-period="today">Hari Ini</button>
                <button onclick="adminSetFinancePeriod('week')" class="fin-period-btn rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 dark:border-slate-700 dark:text-slate-300" data-period="week">Minggu Ini</button>
                <button onclick="adminSetFinancePeriod('month')" class="fin-period-btn rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 dark:border-slate-700 dark:text-slate-300" data-period="month">Bulan Ini</button>
                <button onclick="adminSetFinancePeriod('year')" class="fin-period-btn rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 dark:border-slate-700 dark:text-slate-300" data-period="year">Tahun Ini</button>
              </div>
              
              <!-- Custom Range -->
              <div class="flex flex-wrap items-center gap-2">
                <input type="date" id="fin-from" class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white">
                <span class="text-slate-500">s/d</span>
                <input type="date" id="fin-to" class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white">
                <select id="fin-court" onchange="adminRenderFinance()" class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white">
                  <option value="">Semua Lapangan</option>
                </select>
                <button onclick="adminRenderFinance()" class="rounded-xl bg-teal-500 px-4 py-2 text-sm font-bold text-white hover:bg-teal-600 transition-colors">
                  Filter
                </button>
              </div>
            </div>
          </div>

          <!-- Summary Cards -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div class="rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50 to-white p-5 dark:border-emerald-800/50 dark:from-emerald-950/30 dark:to-slate-900">
              <p class="text-sm font-bold text-emerald-700 dark:text-emerald-300">Total Approved</p>
              <p id="fin-total-approved" class="mt-2 text-xl lg:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">-</p>
              <p class="mt-1 text-xs text-emerald-600/70 dark:text-emerald-400/70">Pendapatan confirmed</p>
            </div>
            <div class="rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50 to-white p-5 dark:border-amber-800/50 dark:from-amber-950/30 dark:to-slate-900">
              <p class="text-sm font-bold text-amber-700 dark:text-amber-300">Pending Pipeline</p>
              <p id="fin-total-pending" class="mt-2 text-xl lg:text-2xl font-extrabold text-amber-600 dark:text-amber-400">-</p>
              <p class="mt-1 text-xs text-amber-600/70 dark:text-amber-400/70">Menunggu approval</p>
            </div>
            <div class="rounded-2xl border border-red-200/80 bg-gradient-to-br from-red-50 to-white p-5 dark:border-red-800/50 dark:from-red-950/30 dark:to-slate-900">
              <p class="text-sm font-bold text-red-700 dark:text-red-300">Cancelled</p>
              <p id="fin-total-cancelled" class="mt-2 text-xl lg:text-2xl font-extrabold text-red-600 dark:text-red-400">-</p>
              <p class="mt-1 text-xs text-red-600/70 dark:text-red-400/70">Booking dibatalkan</p>
            </div>
            <div class="rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-slate-800/80 dark:bg-slate-900/80">
              <p class="text-sm font-bold text-slate-700 dark:text-slate-300">Total Booking</p>
              <p id="fin-total-count" class="mt-2 text-xl lg:text-2xl font-extrabold text-slate-600 dark:text-slate-400">-</p>
              <p class="mt-1 text-xs text-slate-500">Booking dalam periode</p>
            </div>
          </div>

          <!-- Finance Table -->
          <div class="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800/80 dark:bg-slate-900/80">
            <div class="overflow-x-auto">
              <table class="w-full min-w-[800px]">
                <thead>
                  <tr class="border-b border-slate-100 bg-slate-50/80 dark:border-slate-800/80 dark:bg-slate-900">
                    <th class="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Lapangan</th>
                    <th class="px-4 py-3.5 text-right text-xs font-bold uppercase tracking-wider text-slate-500">Total Booking</th>
                    <th class="px-4 py-3.5 text-right text-xs font-bold uppercase tracking-wider text-slate-500">Approved</th>
                    <th class="px-4 py-3.5 text-right text-xs font-bold uppercase tracking-wider text-slate-500">Pending</th>
                    <th class="px-4 py-3.5 text-right text-xs font-bold uppercase tracking-wider text-slate-500">Cancelled</th>
                  </tr>
                </thead>
                <tbody id="finance-table" class="divide-y divide-slate-100 dark:divide-slate-800/80">
                  <tr>
                    <td colspan="5" class="px-4 py-12 text-center">
                      <div class="flex justify-center">
                        <div class="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-teal-500"></div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- ============ REPORTS PAGE ============ -->
        <section id="page-reports" class="admin-page hidden">
          <div class="mb-6">
            <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Laporan</h1>
            <p class="mt-1 text-slate-600 dark:text-slate-400">Download laporan booking dalam format Excel atau CSV</p>
          </div>

          <!-- Report Filters -->
          <div class="mb-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/80">
            <h3 class="flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-white mb-5">
              <svg class="h-5 w-5 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
              </svg>
              Filter Laporan
            </h3>
            
            <!-- Quick Period -->
            <div class="flex flex-wrap gap-2 mb-5">
              <button onclick="adminSetReportPeriod('today')" class="rep-period-btn rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 dark:border-slate-700 dark:text-slate-300" data-period="today">Hari Ini</button>
              <button onclick="adminSetReportPeriod('week')" class="rep-period-btn rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 dark:border-slate-700 dark:text-slate-300" data-period="week">Minggu Ini</button>
              <button onclick="adminSetReportPeriod('month')" class="rep-period-btn rounded-lg border border-teal-500 bg-teal-100 px-3 py-1.5 text-xs font-bold text-teal-700 dark:bg-teal-900/50 dark:border-teal-700 dark:text-teal-300" data-period="month">Bulan Ini</button>
              <button onclick="adminSetReportPeriod('year')" class="rep-period-btn rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 dark:border-slate-700 dark:text-slate-300" data-period="year">Tahun Ini</button>
            </div>

            <!-- Date Range -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
              <div>
                <label class="mb-2 block text-xs font-bold text-slate-600 dark:text-slate-400">Dari Tanggal</label>
                <input type="date" id="rep-from" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white">
              </div>
              <div>
                <label class="mb-2 block text-xs font-bold text-slate-600 dark:text-slate-400">Sampai Tanggal</label>
                <input type="date" id="rep-to" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white">
              </div>
              <div>
                <label class="mb-2 block text-xs font-bold text-slate-600 dark:text-slate-400">Lapangan</label>
                <select id="rep-court" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white">
                  <option value="">Semua</option>
                </select>
              </div>
              <div>
                <label class="mb-2 block text-xs font-bold text-slate-600 dark:text-slate-400">Status</label>
                <select id="rep-status" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white">
                  <option value="">Semua</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <button onclick="adminGenerateReport()" class="rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-teal-500/30 hover:from-teal-600 hover:to-teal-700 transition-all">
              Generate Laporan
            </button>
          </div>

          <!-- Report Summary -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div class="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/80">
              <p class="text-xs font-bold uppercase text-slate-500">Total Booking</p>
              <p id="rep-total" class="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">0</p>
            </div>
            <div class="rounded-2xl border border-emerald-200/80 bg-emerald-50/50 p-5 dark:border-emerald-800/50 dark:bg-emerald-950/20">
              <p class="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400">Total Revenue</p>
              <p id="rep-revenue" class="mt-2 text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">Rp 0</p>
            </div>
            <div class="rounded-2xl border border-amber-200/80 bg-amber-50/50 p-5 dark:border-amber-800/50 dark:bg-amber-950/20">
              <p class="text-xs font-bold uppercase text-amber-600 dark:text-amber-400">Pending</p>
              <p id="rep-pending" class="mt-2 text-2xl font-extrabold text-amber-600 dark:text-amber-400">0</p>
            </div>
            <div class="rounded-2xl border border-purple-200/80 bg-purple-50/50 p-5 dark:border-purple-800/50 dark:bg-purple-950/20">
              <p class="text-xs font-bold uppercase text-purple-600 dark:text-purple-400">User Aktif</p>
              <p id="rep-users" class="mt-2 text-2xl font-extrabold text-purple-600 dark:text-purple-400">0</p>
            </div>
          </div>

          <!-- Report Table -->
          <div class="mb-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800/80 dark:bg-slate-900/80">
            <div class="overflow-x-auto max-h-[500px]">
              <table class="w-full min-w-[1200px]">
                <thead class="sticky top-0">
                  <tr class="border-b border-slate-100 bg-slate-50/95 backdrop-blur-sm dark:border-slate-800/80 dark:bg-slate-900/95">
                    <th class="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">#</th>
                    <th class="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">User</th>
                    <th class="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Lapangan</th>
                    <th class="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Tanggal</th>
                    <th class="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Waktu</th>
                    <th class="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Durasi</th>
                    <th class="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                    <th class="px-4 py-3.5 text-right text-xs font-bold uppercase tracking-wider text-slate-500">Jumlah</th>
                  </tr>
                </thead>
                <tbody id="report-table" class="divide-y divide-slate-100 dark:divide-slate-800/80">
                  <tr>
                    <td colspan="8" class="px-4 py-12 text-center text-slate-500">Klik "Generate Laporan" untuk melihat data</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="flex items-center justify-between border-t border-slate-100 px-4 py-3 dark:border-slate-800/80">
              <p id="rep-count" class="text-sm text-slate-500"></p>
              <div class="flex gap-2">
                <button id="rep-prev" onclick="adminReportPage(-1)" class="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800" disabled>←</button>
                <button id="rep-next" onclick="adminReportPage(1)" class="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800" disabled>→</button>
              </div>
            </div>
          </div>

          <!-- Export Buttons -->
          <div class="flex flex-wrap gap-3">
            <button onclick="adminExportCSV()" class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 active:scale-[0.98] transition-all dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              Download CSV
            </button>
            <button onclick="adminExportExcel()" class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 hover:from-emerald-600 hover:to-emerald-700 active:scale-[0.98] transition-all">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              Download Excel
            </button>
          </div>
        </section>

        <!-- ============ COURTS PAGE ============ -->
        <section id="page-courts" class="admin-page hidden">
          <div class="mb-6">
            <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Kelola Lapangan</h1>
            <p class="mt-1 text-slate-600 dark:text-slate-400">Tambah, edit, atau nonaktifkan lapangan</p>
          </div>

          <div class="grid gap-6 lg:grid-cols-2">
            <!-- Add/Edit Form -->
            <div class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/80">
              <h2 class="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white mb-5">
                <svg class="h-5 w-5 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                Tambah / Edit Lapangan
              </h2>
              <form id="court-form" onsubmit="adminSaveCourt(event)" class="space-y-4">
                <input type="hidden" id="court-edit-id">
                <div>
                  <label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">Nama Lapangan</label>
                  <input id="court-name" required placeholder="Court A1" class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all">
                </div>
                <div>
                  <label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">Harga per Jam (Rp)</label>
                  <input id="court-price" required type="number" min="10000" step="10000" placeholder="150000" class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all">
                </div>
                <div>
                  <label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">Tipe</label>
                  <input id="court-type" placeholder="Premium indoor court" class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all">
                </div>
                <div>
                  <label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">Surface</label>
                  <input id="court-surface" placeholder="Artificial Grass" class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all">
                </div>
                <button type="submit" id="court-submit" class="w-full rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 py-3 text-sm font-bold text-white shadow-lg shadow-teal-500/30 hover:from-teal-600 hover:to-teal-700 transition-all">
                  Simpan
                </button>
                <button type="button" id="court-cancel" onclick="adminCancelCourtEdit()" class="hidden w-full rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 transition-all">
                  Batal
                </button>
              </form>
            </div>

            <!-- Courts List -->
            <div class="rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800/80 dark:bg-slate-900/80 overflow-hidden">
              <div class="border-b border-slate-100 px-6 py-4 dark:border-slate-800/80">
                <h2 class="text-lg font-bold text-slate-900 dark:text-white">Daftar Lapangan</h2>
              </div>
              <div class="divide-y divide-slate-100 dark:divide-slate-800/80 max-h-[500px] overflow-y-auto" id="courts-list">
                <div class="flex items-center justify-center py-12">
                  <div class="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-teal-500"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ============ USERS PAGE ============ -->
        <section id="page-users" class="admin-page hidden">
          <div class="mb-6">
            <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Kelola Users</h1>
            <p class="mt-1 text-slate-600 dark:text-slate-400">Edit profile dan role user</p>
          </div>

          <div class="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800/80 dark:bg-slate-900/80">
            <div class="border-b border-slate-100 px-6 py-4 dark:border-slate-800/80 flex items-center justify-between">
              <h2 class="text-lg font-bold text-slate-900 dark:text-white">Daftar User</h2>
              <span id="users-count" class="rounded-full bg-teal-100 px-3 py-1 text-xs font-bold text-teal-800 dark:bg-teal-900/50 dark:text-teal-200">-</span>
            </div>
            <div class="overflow-x-auto max-h-[600px]">
              <table class="w-full min-w-[900px]">
                <thead class="sticky top-0">
                  <tr class="border-b border-slate-100 bg-slate-50/95 backdrop-blur-sm dark:border-slate-800/80 dark:bg-slate-900/95">
                    <th class="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">User</th>
                    <th class="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Email</th>
                    <th class="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">No. HP</th>
                    <th class="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Role</th>
                    <th class="px-4 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Bergabung</th>
                    <th class="px-4 py-3.5 text-right text-xs font-bold uppercase tracking-wider text-slate-500">Aksi</th>
                  </tr>
                </thead>
                <tbody id="users-table" class="divide-y divide-slate-100 dark:divide-slate-800/80">
                  <tr>
                    <td colspan="6" class="px-4 py-12 text-center">
                      <div class="flex justify-center">
                        <div class="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-teal-500"></div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>

  <!-- ============ MODALS ============ -->

  <!-- Day Detail Modal -->
  <div id="day-modal" class="fixed inset-0 z-50 hidden">
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" onclick="adminCloseDayModal()"></div>
    <div class="absolute inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
      <div class="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-900">
        <div>
          <h3 id="day-title" class="text-lg font-bold text-slate-900 dark:text-white"></h3>
          <p id="day-subtitle" class="text-sm text-slate-500"></p>
        </div>
        <button onclick="adminCloseDayModal()" class="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <svg class="h-5 w-5 text-slate-600 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      <div id="day-content" class="p-6"></div>
    </div>
  </div>

  <!-- Edit User Modal -->
  <div id="user-modal" class="fixed inset-0 z-50 hidden">
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" onclick="adminCloseUserModal()"></div>
    <div class="absolute inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
      <div class="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-900">
        <h3 class="text-lg font-bold text-slate-900 dark:text-white">Edit User</h3>
        <button onclick="adminCloseUserModal()" class="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <svg class="h-5 w-5 text-slate-600 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      <form id="user-form" onsubmit="adminSaveUser(event)" class="p-6 space-y-4">
        <input type="hidden" id="user-id">
        <div id="user-preview" class="flex items-center gap-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
          <img id="user-avatar" src="" class="h-14 w-14 rounded-full object-cover">
          <div>
            <p id="user-name-preview" class="font-bold text-slate-900 dark:text-white"></p>
            <p id="user-email-preview" class="text-sm text-slate-500"></p>
          </div>
        </div>
        <div>
          <label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">Nama</label>
          <input id="user-name" required class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all">
        </div>
        <div>
          <label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">Email</label>
          <input id="user-email" type="email" required class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all">
        </div>
        <div>
          <label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">No. HP</label>
          <input id="user-phone" class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all">
        </div>
        <div>
          <label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">Role</label>
          <select id="user-role" class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div id="user-error" class="hidden rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700 dark:bg-red-950/30 dark:text-red-300"></div>
        <div class="flex gap-3 pt-2">
          <button type="submit" class="flex-1 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 py-3 font-bold text-white hover:from-teal-600 hover:to-teal-700 transition-all">
            Simpan
          </button>
          <button type="button" onclick="adminDeleteUser()" class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-bold text-red-700 hover:bg-red-100 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300 transition-all">
            Hapus
          </button>
        </div>
      </form>
    </div>
  </div>

</div>

<!-- Toast Container -->
<div id="admin-toast" class="fixed top-20 right-4 z-50"></div>

<script>
// ============================================
// Admin Dashboard JavaScript
// ============================================

// Helper to safely set textContent
function adminSetText(id, text) {
  var el = document.getElementById(id);
  if (el) el.textContent = text || '';
}

// Helper to safely set innerHTML
function adminSetHTML(id, html) {
  var el = document.getElementById(id);
  if (el) el.innerHTML = html || '';
}

// Helper to safely set display
function adminSetDisplay(id, display) {
  var el = document.getElementById(id);
  if (el) el.style.display = display || 'none';
}

// Helper to safely get element
function adminEl(id) {
  return document.getElementById(id);
}

// State
var adminBookings = [];
var adminCourts = [];
var adminUsers = [];
var adminProfileById = new Map();
var adminCalDate = new Date();
var adminSelCourt = null;
var adminSelDuration = 1;
var adminSelTime = null;
var adminBookedSlots = {};
var adminReportData = [];
var adminReportFiltered = [];
var adminReportPageNum = 1;
var adminReportSize = 20;
var adminCurrentPage = 'overview';

// Initialize - wrapped in try-catch
function adminInit() {
  try {
    if (typeof PadelGo === 'undefined' || typeof PadelGo.Supabase === 'undefined') {
      setTimeout(adminInit, 200);
      return;
    }
    adminLoad();
  } catch (err) {
    console.error('adminInit error:', err);
    adminShowError('Error initializing: ' + (err.message || 'Unknown error'));
  }
}

// Load all data
async function adminLoad() {
  try {
    // Ensure PadelGo is ready
    if (typeof PadelGo === 'undefined' || typeof PadelGo.Supabase === 'undefined') {
      throw new Error('Supabase belum dimuat. Refresh halaman.');
    }
    
    var supabase = await PadelGo.Supabase.init();
    if (!supabase) {
      throw new Error('Supabase belum dikonfigurasi. Hubungi administrator.');
    }
    
    var res = await supabase.auth.getSession();
    if (!res.data || !res.data.session) {
      throw new Error('Anda harus login terlebih dahulu.');
    }
    
    // Get admin profile
    var profileRes = await supabase.from('profiles').select('*').eq('id', res.data.session.user.id).single();
    console.log('Profile response:', profileRes);
    
    if (!profileRes.data) {
      throw new Error('Profile tidak ditemukan.');
    }
    
    if (profileRes.data.role !== 'admin') {
      throw new Error('Anda bukan admin. Role Anda: ' + (profileRes.data.role || 'tidak ditemukan') + '. Hubungi super admin untuk akses.');
    }
    
    // Update admin info in sidebar
    var adminName = profileRes.data.name || profileRes.data.email || 'Admin';
    adminSetText('adminName', adminName);
    adminSetText('adminAvatar', adminName.charAt(0).toUpperCase());
    
    // Load all data
    var bRes = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
    var cRes = await supabase.from('courts').select('*').order('name');
    var uRes = await supabase.from('profiles').select('id, name, email, phone, role, avatar_url, created_at').order('created_at', { ascending: false });
    
    adminBookings = bRes.data || [];
    adminCourts = cRes.data || [];
    adminUsers = uRes.data || [];
    adminProfileById = new Map(adminUsers.map(function(u) { return [u.id, u]; }));
    
    adminSetDisplay('adminLoading', 'none');
    adminSetDisplay('adminContent', 'block');
    
    adminRenderAll();
  } catch (err) {
    console.error('Admin load error:', err);
    var errorMsg = err.message || 'Terjadi kesalahan.';
    adminShowError(errorMsg);
  }
}

function adminShowError(msg) {
  adminSetDisplay('adminLoading', 'none');
  adminSetDisplay('adminAuthError', 'flex');
  adminSetText('adminErrorText', msg || 'Terjadi kesalahan.');
}

function adminShowMessage(msg, type) {
  var msgEl = adminEl(type === 'error' ? 'adminErrorMsg' : 'adminSuccessMsg');
  if (msgEl && msgEl.querySelector('p')) {
    msgEl.querySelector('p').textContent = msg || '';
    msgEl.classList.remove('hidden');
    setTimeout(function() { msgEl.classList.add('hidden'); }, 5000);
  }
}

// Toggle Sidebar
function toggleAdminSidebar() {
  var sidebar = document.getElementById('adminSidebar');
  var overlay = document.getElementById('sidebarOverlay');
  sidebar.classList.toggle('-translate-x-full');
  overlay.classList.toggle('opacity-0');
  overlay.classList.toggle('invisible');
}

// Navigate
function adminNavigate(page) {
  adminCurrentPage = page;
  document.querySelectorAll('.admin-page').forEach(function(p) { p.classList.add('hidden'); });
  var targetPage = adminEl('page-' + page);
  if (targetPage) targetPage.classList.remove('hidden');
  
  document.querySelectorAll('.admin-nav-btn').forEach(function(btn) {
    if (btn.dataset.page === page) {
      btn.classList.add('bg-slate-100', 'dark:bg-slate-800/80');
      btn.classList.remove('text-slate-600', 'dark:text-slate-400');
    } else {
      btn.classList.remove('bg-slate-100', 'dark:bg-slate-800/80');
      btn.classList.add('text-slate-600', 'dark:text-slate-400');
    }
  });
  
  // Mobile: close sidebar
  if (window.innerWidth < 1024) toggleAdminSidebar();
  
  // Page-specific init
  if (page === 'manual-booking') adminInitManualBooking();
  if (page === 'finance') adminInitFinance();
}

// Render all data
function adminRenderAll() {
  var approved = adminBookings.filter(function(b) { return b.status === 'approved'; });
  var pending = adminBookings.filter(function(b) { return b.status === 'pending'; });
  var revenue = approved.reduce(function(s, b) { return s + (b.amount || 0); }, 0);
  
  // Stats
  adminSetText('stat-total', adminBookings.length);
  adminSetText('stat-pending', pending.length);
  adminSetText('stat-approved', approved.length);
  adminSetText('stat-revenue', adminRupiah(revenue));
  
  adminSetText('fin-approved', adminRupiah(revenue));
  adminSetText('fin-pending', adminRupiah(pending.reduce(function(s, b) { return s + (b.amount || 0); }, 0)));
  adminSetText('fin-cancelled', adminRupiah(adminBookings.filter(function(b) { return b.status === 'cancelled'; }).reduce(function(s, b) { return s + (b.amount || 0); }, 0)));
  
  // Pending badge
  var pendingCount = pending.length;
  var sidebarBadge = adminEl('sidebarPendingBadge');
  if (sidebarBadge) {
    if (pendingCount > 0) {
      sidebarBadge.textContent = pendingCount;
      sidebarBadge.classList.remove('hidden');
    } else {
      sidebarBadge.classList.add('hidden');
    }
  }
  
  adminRenderCalendar();
  adminRenderRecentBookings();
  adminRenderBookingsTable();
  adminRenderCourts();
  adminRenderFinance();
  adminRenderUsers();
  adminPopulateFilters();
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
  var months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  adminSetText('cal-month', months[adminCalDate.getMonth()] + ' ' + adminCalDate.getFullYear());
  
  var year = adminCalDate.getFullYear();
  var month = adminCalDate.getMonth();
  var firstDay = new Date(year, month, 1).getDay();
  var daysInMonth = new Date(year, month + 1, 0).getDate();
  var today = new Date();
  var todayStr = today.toISOString().split('T')[0];
  
  var byDate = {};
  adminBookings.forEach(function(b) {
    if (!byDate[b.date]) byDate[b.date] = { approved: 0, pending: 0, cancelled: 0 };
    if (b.status === 'approved') byDate[b.date].approved++;
    else if (b.status === 'pending') byDate[b.date].pending++;
    else byDate[b.date].cancelled++;
  });
  
  var html = '';
  for (var i = 0; i < firstDay; i++) html += '<div class="aspect-square"></div>';
  for (var d = 1; d <= daysInMonth; d++) {
    var ds = year + '-' + String(month + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0');
    var isToday = ds === todayStr;
    var bd = byDate[ds] || {};
    var total = bd.approved + bd.pending + bd.cancelled;
    
    var bgClass = 'bg-white dark:bg-slate-800';
    var borderClass = 'border-slate-200 dark:border-slate-700';
    var textClass = 'text-slate-700 dark:text-slate-300';
    
    if (isToday) {
      bgClass = 'bg-teal-50 dark:bg-teal-900/30';
      borderClass = 'border-teal-500';
      textClass = 'text-teal-700 dark:text-teal-300';
    }
    
    html += '<button type="button" onclick="adminShowDay(\'' + ds + '\')" class="aspect-square flex flex-col items-center justify-center rounded-lg border ' + borderClass + ' ' + bgClass + ' p-1 lg:p-2 transition-all hover:border-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/20 cursor-pointer">';
    html += '<span class="text-xs lg:text-sm font-bold ' + textClass + '">' + d + '</span>';
    if (total > 0) {
      html += '<div class="flex gap-0.5 mt-0.5">';
      if (bd.approved) html += '<span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>';
      if (bd.pending) html += '<span class="h-1.5 w-1.5 rounded-full bg-amber-500"></span>';
      if (bd.cancelled) html += '<span class="h-1.5 w-1.5 rounded-full bg-red-400"></span>';
      html += '</div>';
    }
    html += '</button>';
  }
  adminSetHTML('cal-grid', html);
}

function adminShowDay(dateStr) {
  var dayBookings = adminBookings.filter(function(b) { return b.date === dateStr; });
  var d = new Date(dateStr + 'T00:00:00');
  var formatted = d.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  
  document.getElementById('day-title').textContent = 'Booking ' + formatted;
  document.getElementById('day-subtitle').textContent = dayBookings.length + ' booking';
  
  if (!dayBookings.length) {
    adminSetHTML('day-content', '<div class="text-center py-12"><svg class="mx-auto h-16 w-16 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg><p class="mt-4 text-slate-500">Tidak ada booking pada hari ini.</p></div>';
  } else {
    var html = '<div class="space-y-3">';
    dayBookings.forEach(function(b) {
      var u = adminProfileById.get(b.user_id);
      var name = u ? (u.name || u.email) : 'User';
      html += '<div class="flex items-center justify-between rounded-xl border border-slate-200 p-4 dark:border-slate-700 dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">';
      html += '<div class="flex items-center gap-3">';
      html += '<div class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-teal-600 text-white font-bold">' + (name ? name.charAt(0).toUpperCase() : 'U') + '</div>';
      html += '<div>';
      html += '<p class="font-bold text-slate-900 dark:text-white">' + adminEsc(name) + '</p>';
      html += '<p class="text-sm text-slate-500">' + adminEsc(b.court_name || b.court_id) + ' &bull; ' + b.start_time + ' - ' + b.end_time + '</p>';
      html += '</div></div>';
      html += '<div class="flex items-center gap-3">';
      html += '<div class="text-right">';
      html += '<span class="inline-flex rounded-full px-2.5 py-1 text-xs font-bold ' + adminStatusClass(b.status) + '">' + adminStatusLabel(b.status) + '</span>';
      html += '<p class="mt-1 font-bold text-teal-600">' + adminRupiah(b.amount) + '</p>';
      html += '</div>';
      if (b.status === 'pending') {
        html += '<button onclick="adminSetStatus(\'' + b.id + '\',\'approved\');adminCloseDayModal();" class="rounded-lg bg-emerald-100 p-2 text-emerald-700 hover:bg-emerald-200 transition-colors" title="Approve"><svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg></button>';
      }
      if (b.status !== 'cancelled') {
        html += '<button onclick="adminSetStatus(\'' + b.id + '\',\'cancelled\');adminCloseDayModal();" class="rounded-lg bg-red-100 p-2 text-red-700 hover:bg-red-200 transition-colors" title="Cancel"><svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>';
      }
      html += '</div></div>';
    });
    html += '</div>';
    adminSetHTML('day-content', html;
  }
  
  document.getElementById('day-modal').classList.remove('hidden');
}

function adminCloseDayModal() {
  document.getElementById('day-modal').classList.add('hidden');
}

// Recent Bookings
function adminRenderRecentBookings() {
  var recent = adminBookings.slice(0, 5);
  if (!recent.length) {
    adminSetHTML('recent-list', '<div class="text-center py-8"><p class="text-sm text-slate-500">Belum ada booking.</p></div>';
    return;
  }
  var html = '';
  recent.forEach(function(b) {
    var u = adminProfileById.get(b.user_id);
    var name = u ? (u.name || u.email) : 'User';
    html += '<div class="flex items-center justify-between rounded-xl border border-slate-100 p-3 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">';
    html += '<div class="flex items-center gap-3">';
    html += '<div class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-teal-600 text-white font-bold text-sm">' + (name ? name.charAt(0).toUpperCase() : 'U') + '</div>';
    html += '<div>';
    html += '<p class="font-bold text-sm text-slate-900 dark:text-white">' + adminEsc(name) + '</p>';
    html += '<p class="text-xs text-slate-500">' + adminEsc(b.court_name || b.court_id) + ' &bull; ' + b.date + '</p>';
    html += '</div></div>';
    html += '<div class="text-right">';
    html += '<span class="inline-flex rounded-full px-2 py-0.5 text-xs font-bold ' + adminStatusClass(b.status) + '">' + adminStatusLabel(b.status) + '</span>';
    html += '<p class="mt-1 text-sm font-bold text-teal-600">' + adminRupiah(b.amount) + '</p>';
    html += '</div></div>';
  });
  adminSetHTML('recent-list', html;
}

// Bookings Table
function adminFilterBookings() {
  var status = document.getElementById('filter-status').value;
  var court = document.getElementById('filter-court').value;
  var dateFrom = document.getElementById('filter-date-from').value;
  var dateTo = document.getElementById('filter-date-to').value;
  
  var filtered = adminBookings.filter(function(b) {
    if (status !== 'all' && b.status !== status) return false;
    if (court !== 'all' && b.court_id !== court) return false;
    if (dateFrom && b.date < dateFrom) return false;
    if (dateTo && b.date > dateTo) return false;
    return true;
  });
  adminRenderBookingsTable(filtered);
}

function adminRenderBookingsTable(bookings) {
  if (!bookings || !bookings.length) {
    adminSetHTML('bookings-table', '<tr><td colspan="7" class="px-4 py-12 text-center text-slate-500">Tidak ada booking.</td></tr>';
    return;
  }
  var html = '';
  bookings.forEach(function(b) {
    var u = adminProfileById.get(b.user_id);
    var name = u ? (u.name || u.email) : 'User';
    var actions = '';
    if (b.status === 'pending') {
      actions += '<button onclick="adminSetStatus(\'' + b.id + '\',\'approved\')" class="rounded-lg bg-emerald-100 p-2 text-emerald-700 hover:bg-emerald-200 mr-1 transition-colors" title="Approve"><svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg></button>';
    }
    if (b.status !== 'cancelled') {
      actions += '<button onclick="adminSetStatus(\'' + b.id + '\',\'cancelled\')" class="rounded-lg bg-red-100 p-2 text-red-700 hover:bg-red-200 transition-colors" title="Cancel"><svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>';
    }
    
    html += '<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">';
    html += '<td class="px-4 py-3"><div class="flex items-center gap-3"><div class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-teal-600 text-white text-xs font-bold">' + (name ? name.charAt(0).toUpperCase() : 'U') + '</div><span class="font-semibold text-sm text-slate-900 dark:text-white">' + adminEsc(name) + '</span></div></td>';
    html += '<td class="px-4 py-3 font-semibold text-sm text-slate-700 dark:text-slate-300">' + adminEsc(b.court_name || b.court_id) + '</td>';
    html += '<td class="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">' + b.date + '</td>';
    html += '<td class="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">' + b.start_time + ' - ' + b.end_time + '</td>';
    html += '<td class="px-4 py-3"><span class="inline-flex rounded-full px-2.5 py-1 text-xs font-bold ' + adminStatusClass(b.status) + '">' + adminStatusLabel(b.status) + '</span></td>';
    html += '<td class="px-4 py-3 text-right font-bold text-sm text-slate-900 dark:text-white">' + adminRupiah(b.amount) + '</td>';
    html += '<td class="px-4 py-3 text-center">' + actions + '</td></tr>';
  });
  adminSetHTML('bookings-table', html;
}

async function adminSetStatus(id, status) {
  if (status === 'cancelled' && !confirm('Batalkan booking ini?')) return;
  try {
    var supabase = await PadelGo.Supabase.init();
    var res = await supabase.from('bookings').update({ status: status }).eq('id', id);
    if (res.error) throw res.error;
    adminToast(status === 'approved' ? 'Booking approved!' : 'Booking cancelled');
    await adminLoad();
  } catch (err) {
    adminToast(err.message || 'Error', 'error');
  }
}

// Courts
function adminRenderCourts() {
  if (!adminCourts.length) {
    adminSetHTML('courts-list', '<div class="px-6 py-12 text-center text-slate-500">Belum ada lapangan.</div>';
    return;
  }
  var html = '';
  adminCourts.forEach(function(c) {
    html += '<div class="flex items-center justify-between px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">';
    html += '<div class="flex items-center gap-3">';
    if (c.image_url) html += '<img src="' + c.image_url + '" class="h-14 w-20 rounded-lg object-cover">';
    else html += '<div class="flex h-14 w-20 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800"><svg class="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"/></svg></div>';
    html += '<div>';
    html += '<p class="font-extrabold text-slate-900 dark:text-white">' + adminEsc(c.name) + '</p>';
    html += '<p class="text-sm text-slate-500">' + adminEsc(c.type || c.surface || '') + '</p>';
    html += '</div></div>';
    html += '<div class="flex items-center gap-3">';
    html += '<div class="text-right">';
    html += '<p class="font-bold text-teal-600">' + adminRupiah(c.price_per_hour) + '/jam</p>';
    html += '<span class="inline-flex rounded-full px-2 py-0.5 text-xs font-bold ' + (c.available ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300' : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300') + '">' + (c.available ? 'Aktif' : 'Nonaktif') + '</span>';
    html += '</div>';
    html += '<button onclick="adminEditCourt(\'' + c.id + '\')" class="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800 transition-colors">Edit</button>';
    html += '</div></div>';
  });
  adminSetHTML('courts-list', html;
}

function adminEditCourt(id) {
  var c = adminCourts.find(function(x) { return x.id === id; });
  if (!c) return;
  document.getElementById('court-edit-id').value = id;
  document.getElementById('court-name').value = c.name;
  document.getElementById('court-price').value = c.price_per_hour;
  document.getElementById('court-type').value = c.type || '';
  document.getElementById('court-surface').value = c.surface || '';
  document.getElementById('court-submit').textContent = 'Update';
  document.getElementById('court-cancel').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function adminCancelCourtEdit() {
  document.getElementById('court-form').reset();
  document.getElementById('court-edit-id').value = '';
  document.getElementById('court-submit').textContent = 'Simpan';
  document.getElementById('court-cancel').classList.add('hidden');
}

async function adminSaveCourt(e) {
  e.preventDefault();
  var supabase = await PadelGo.Supabase.init();
  var id = document.getElementById('court-edit-id').value;
  var name = document.getElementById('court-name').value.trim();
  var price = parseInt(document.getElementById('court-price').value);
  var type = document.getElementById('court-type').value.trim();
  var surface = document.getElementById('court-surface').value.trim();
  
  try {
    var courtId = id || name.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8) || 'C' + Date.now();
    var data = { id: courtId, name: name, type: type, surface: surface, price_per_hour: price, available: true };
    var res = await supabase.from('courts').upsert(data, { onConflict: 'id' });
    if (res.error) throw res.error;
    adminToast(id ? 'Lapangan diupdate!' : 'Lapangan ditambahkan!');
    adminCancelCourtEdit();
    await adminLoad();
  } catch (err) {
    adminToast(err.message || 'Error', 'error');
  }
}

// Finance
function adminInitFinance() {
  adminSetFinancePeriod('month');
  adminPopulateCourtSelect('fin-court');
  adminRenderFinance();
}

function adminSetFinancePeriod(period) {
  document.querySelectorAll('.fin-period-btn').forEach(function(b) {
    b.classList.remove('border-teal-500', 'bg-teal-100', 'text-teal-700', 'dark:bg-teal-900/50', 'dark:border-teal-700', 'dark:text-teal-300');
    b.classList.add('border-slate-200', 'text-slate-600', 'dark:border-slate-700', 'dark:text-slate-300');
  });
  var btn = document.querySelector('.fin-period-btn[data-period="' + period + '"]');
  if (btn) {
    btn.classList.remove('border-slate-200', 'text-slate-600', 'dark:border-slate-700', 'dark:text-slate-300');
    btn.classList.add('border-teal-500', 'bg-teal-100', 'text-teal-700', 'dark:bg-teal-900/50', 'dark:border-teal-700', 'dark:text-teal-300');
  }
  
  var now = new Date();
  var from, to;
  switch(period) {
    case 'today': from = to = now.toISOString().split('T')[0]; break;
    case 'week': from = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay()).toISOString().split('T')[0]; to = now.toISOString().split('T')[0]; break;
    case 'month': from = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]; to = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0]; break;
    case 'year': from = new Date(now.getFullYear(), 0, 1).toISOString().split('T')[0]; to = new Date(now.getFullYear(), 11, 31).toISOString().split('T')[0]; break;
  }
  
  document.getElementById('fin-from').value = from;
  document.getElementById('fin-to').value = to;
  adminRenderFinance();
}

function adminRenderFinance() {
  var from = document.getElementById('fin-from').value;
  var to = document.getElementById('fin-to').value;
  var court = document.getElementById('fin-court').value;
  
  var filtered = adminBookings.filter(function(b) {
    if (from && b.date < from) return false;
    if (to && b.date > to) return false;
    if (court && b.court_id !== court) return false;
    return true;
  });
  
  var approved = filtered.filter(function(b) { return b.status === 'approved'; });
  var pending = filtered.filter(function(b) { return b.status === 'pending'; });
  var cancelled = filtered.filter(function(b) { return b.status === 'cancelled'; });
  
  document.getElementById('fin-total-approved').textContent = adminRupiah(approved.reduce(function(s, b) { return s + (b.amount || 0); }, 0));
  document.getElementById('fin-total-pending').textContent = adminRupiah(pending.reduce(function(s, b) { return s + (b.amount || 0); }, 0));
  document.getElementById('fin-total-cancelled').textContent = adminRupiah(cancelled.reduce(function(s, b) { return s + (b.amount || 0); }, 0));
  document.getElementById('fin-total-count').textContent = filtered.length;
  
  // Group by court
  var courtGroups = {};
  adminCourts.forEach(function(c) { courtGroups[c.id] = { name: c.name, approved: 0, pending: 0, cancelled: 0, count: 0 }; });
  
  filtered.forEach(function(b) {
    if (courtGroups[b.court_id]) {
      courtGroups[b.court_id].count++;
      if (b.status === 'approved') courtGroups[b.court_id].approved += b.amount || 0;
      else if (b.status === 'pending') courtGroups[b.court_id].pending += b.amount || 0;
      else courtGroups[b.court_id].cancelled += b.amount || 0;
    }
  });
  
  var html = '';
  Object.keys(courtGroups).forEach(function(cid) {
    var c = courtGroups[cid];
    html += '<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">';
    html += '<td class="px-4 py-3 font-bold text-slate-900 dark:text-white">' + adminEsc(c.name) + '</td>';
    html += '<td class="px-4 py-3 text-right text-slate-700 dark:text-slate-300">' + c.count + '</td>';
    html += '<td class="px-4 py-3 text-right font-bold text-emerald-600 dark:text-emerald-400">' + adminRupiah(c.approved) + '</td>';
    html += '<td class="px-4 py-3 text-right font-bold text-amber-600 dark:text-amber-400">' + adminRupiah(c.pending) + '</td>';
    html += '<td class="px-4 py-3 text-right font-bold text-red-600 dark:text-red-400">' + adminRupiah(c.cancelled) + '</td>';
    html += '</tr>';
  });
  
  if (!Object.keys(courtGroups).length) {
    html = '<tr><td colspan="5" class="px-4 py-8 text-center text-slate-500">Tidak ada data.</td></tr>';
  }
  adminSetHTML('finance-table', html;
}

// Users
function adminRenderUsers() {
  var nonAdmin = adminUsers.filter(function(u) { return u.role !== 'admin'; }).length;
  var adminCnt = adminUsers.filter(function(u) { return u.role === 'admin'; }).length;
  document.getElementById('users-count').textContent = nonAdmin + ' user' + (nonAdmin !== 1 ? 's' : '') + ' • ' + adminCnt + ' admin';
  
  if (!adminUsers.length) {
    adminSetHTML('users-table', '<tr><td colspan="6" class="px-4 py-12 text-center text-slate-500">Belum ada user.</td></tr>';
    return;
  }
  var html = '';
  adminUsers.forEach(function(u) {
    var name = u.name || u.email || 'User';
    var initials = name.split(' ').map(function(p) { return p[0]; }).join('').toUpperCase().slice(0, 2);
    html += '<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">';
    html += '<td class="px-4 py-3"><div class="flex items-center gap-3">';
    if (u.avatar_url) html += '<img src="' + u.avatar_url + '" class="h-10 w-10 rounded-full object-cover">';
    else html += '<div class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-pink-600 text-white font-bold text-sm">' + initials + '</div>';
    html += '<span class="font-semibold text-sm text-slate-900 dark:text-white">' + adminEsc(name) + '</span></div></td>';
    html += '<td class="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">' + adminEsc(u.email || '-') + '</td>';
    html += '<td class="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">' + adminEsc(u.phone || '-') + '</td>';
    html += '<td class="px-4 py-3"><span class="inline-flex rounded-full px-2.5 py-1 text-xs font-bold ' + (u.role === 'admin' ? 'bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300') + '">' + (u.role || 'user') + '</span></td>';
    html += '<td class="px-4 py-3 text-xs text-slate-500">' + (u.created_at ? u.created_at.slice(0, 10) : '-') + '</td>';
    html += '<td class="px-4 py-3 text-right"><button onclick="adminOpenUserModal(\'' + u.id + '\')" class="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800 transition-colors">Edit</button></td>';
    html += '</tr>';
  });
  adminSetHTML('users-table', html;
}

function adminOpenUserModal(id) {
  var u = adminUsers.find(function(x) { return x.id === id; });
  if (!u) return;
  var name = u.name || u.email || 'User';
  document.getElementById('user-id').value = id;
  document.getElementById('user-name').value = u.name || '';
  document.getElementById('user-email').value = u.email || '';
  document.getElementById('user-phone').value = u.phone || '';
  document.getElementById('user-role').value = u.role || 'user';
  document.getElementById('user-name-preview').textContent = name;
  document.getElementById('user-email-preview').textContent = u.email || '-';
  document.getElementById('user-avatar').src = u.avatar_url || 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="%23ec4899"><circle cx="12" cy="12" r="10"/></svg>';
  document.getElementById('user-error').classList.add('hidden');
  document.getElementById('user-modal').classList.remove('hidden');
}

function adminCloseUserModal() {
  document.getElementById('user-modal').classList.add('hidden');
}

async function adminSaveUser(e) {
  e.preventDefault();
  var supabase = await PadelGo.Supabase.init();
  var id = document.getElementById('user-id').value;
  var name = document.getElementById('user-name').value.trim();
  var email = document.getElementById('user-email').value.trim();
  var phone = document.getElementById('user-phone').value.trim();
  var role = document.getElementById('user-role').value;
  
  try {
    var res = await supabase.from('profiles').update({ name: name, email: email, phone: phone, role: role }).eq('id', id);
    if (res.error) throw res.error;
    adminToast('User diupdate!');
    adminCloseUserModal();
    await adminLoad();
  } catch (err) {
    var errEl = document.getElementById('user-error');
    errEl.querySelector('p').textContent = err.message || 'Error';
    errEl.classList.remove('hidden');
  }
}

async function adminDeleteUser() {
  var id = document.getElementById('user-id').value;
  if (!confirm('Hapus user ini? Semua booking juga akan dihapus.')) return;
  try {
    var supabase = await PadelGo.Supabase.init();
    await supabase.from('bookings').delete().eq('user_id', id);
    var res = await supabase.from('profiles').delete().eq('id', id);
    if (res.error) throw res.error;
    adminToast('User dihapus!');
    adminCloseUserModal();
    await adminLoad();
  } catch (err) {
    adminToast(err.message || 'Error', 'error');
  }
}

// Manual Booking
function adminInitManualBooking() {
  adminSelCourt = null;
  adminSelTime = null;
  adminSelDuration = 1;
  adminBookedSlots = {};
  
  document.getElementById('manual-booking-form').reset();
  document.getElementById('mb-court').value = '';
  document.getElementById('mb-time').value = '';
  document.getElementById('mb-duration').value = '1';
  document.getElementById('mb-summary').classList.add('hidden');
  document.getElementById('mb-error').classList.add('hidden');
  
  var today = new Date().toISOString().split('T')[0];
  document.getElementById('mb-date').min = today;
  document.getElementById('mb-date').value = today;
  
  adminSetMbDuration(1);
  adminPopulateCourtSelect('mb-court');
  adminRenderMbTimes();
}

function adminSetMbDuration(h) {
  adminSelDuration = h;
  document.getElementById('mb-duration').value = h;
  document.querySelectorAll('.mb-dur-btn').forEach(function(b) {
    if (b.dataset.hours == h) {
      b.classList.add('border-teal-500', 'bg-teal-500', 'text-white');
      b.classList.remove('border-slate-200', 'text-slate-600', 'dark:border-slate-700', 'dark:text-slate-300');
    } else {
      b.classList.remove('border-teal-500', 'bg-teal-500', 'text-white');
      b.classList.add('border-slate-200', 'text-slate-600', 'dark:border-slate-700', 'dark:text-slate-300');
    }
  });
  adminRenderMbTimes();
  adminUpdateMbSummary();
}

function adminPopulateCourtSelect(selectId) {
  var sel = document.getElementById(selectId);
  var options = '<option value="">Semua Lapangan</option>';
  adminCourts.forEach(function(c) {
    if (c.available) options += '<option value="' + c.id + '">' + adminEsc(c.name) + ' - ' + adminRupiah(c.price_per_hour) + '/jam</option>';
  });
  if (sel) sel.innerHTML = options;
}

async function adminRenderMbTimes() {
  var date = document.getElementById('mb-date').value;
  var courtId = document.getElementById('mb-court').value;
  adminSelCourt = courtId;
  adminSelTime = null;
  var mbTimeInput = document.getElementById('mb-time');
  if (mbTimeInput) mbTimeInput.value = '';
  
  adminBookedSlots = [];
  if (courtId && date) {
    var supabase = await PadelGo.Supabase.init();
    var res = await supabase.rpc('get_booked_slots', { p_court_id: courtId, p_date: date });
    (res.data || []).forEach(function(b) {
      var sh = parseInt(String(b.start_time).split(':')[0]);
      var eh = parseInt(String(b.end_time).split(':')[0]);
      for (var h = sh; h < eh; h++) {
        var label = String(h).padStart(2, '0') + ':00';
        if (adminBookedSlots.indexOf(label) === -1) adminBookedSlots.push(label);
      }
    });
  }
  
  var grid = document.getElementById('mb-times');
  if (grid) grid.innerHTML = '';
  for (var h = 6; h < 24; h++) {
    var label = String(h).padStart(2, '0') + ':00';
    var booked = adminBookedSlots.indexOf(label) !== -1;
    var available = !booked && h + adminSelDuration <= 24;
    
    if (available) {
      for (var offset = 1; offset < adminSelDuration; offset++) {
        var nextLabel = String(h + offset).padStart(2, '0') + ':00';
        if (adminBookedSlots.indexOf(nextLabel) !== -1) { available = false; break; }
      }
    }
    
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = label;
    btn.disabled = !available || !courtId;
    btn.className = 'rounded-lg border px-2 py-2 text-sm font-bold transition-all';
    
    if (available && courtId) {
      btn.className += ' border-slate-200 bg-white text-slate-700 hover:border-teal-500 hover:bg-teal-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 cursor-pointer';
      btn.onclick = function() { adminSelectMbTime(label, btn); };
    } else {
      btn.className += ' border-slate-100 bg-slate-50 text-slate-400 line-through dark:border-slate-800 dark:bg-slate-900 cursor-not-allowed';
    }
    grid.appendChild(btn);
  }
  
  adminUpdateMbSummary();
}

function adminSelectMbTime(time, btn) {
  adminSelTime = time;
  document.getElementById('mb-time').value = time;
  var btns = document.querySelectorAll('#mb-times button');
  btns.forEach(function(b) { b.classList.remove('border-teal-500', 'bg-teal-500', 'text-white'); b.classList.add('border-slate-200', 'bg-white', 'text-slate-700', 'dark:border-slate-700', 'dark:bg-slate-800', 'dark:text-slate-200'); });
  btn.classList.add('border-teal-500', 'bg-teal-500', 'text-white');
  btn.classList.remove('border-slate-200', 'bg-white', 'text-slate-700', 'dark:border-slate-700', 'dark:bg-slate-800', 'dark:text-slate-200');
  adminUpdateMbSummary();
}

function adminUpdateMbSummary() {
  var summary = adminEl('mb-summary');
  var contentEl = adminEl('mb-summary-content');
  var totalEl = adminEl('mb-total');
  
  var name = adminEl('mb-name') ? adminEl('mb-name').value.trim() : '';
  var email = adminEl('mb-email') ? adminEl('mb-email').value.trim() : '';
  var phone = adminEl('mb-phone') ? adminEl('mb-phone').value.trim() : '';
  var date = adminEl('mb-date') ? adminEl('mb-date').value : '';
  var courtId = adminEl('mb-court') ? adminEl('mb-court').value : '';
  
  if (name && email && phone && date && courtId && adminSelTime) {
    var c = adminCourts.find(function(x) { return x.id === courtId; });
    var endH = parseInt(adminSelTime.split(':')[0]) + adminSelDuration;
    var amount = (c ? c.price_per_hour : 150000) * adminSelDuration;
    var endTime = String(endH).padStart(2, '0') + ':00';
    
    if (contentEl) contentEl.innerHTML = '<div class="flex justify-between text-sm"><span class="text-slate-600 dark:text-slate-400">Nama</span><span class="font-semibold text-slate-900 dark:text-white">' + adminEsc(name) + '</span></div>' +
      '<div class="flex justify-between text-sm"><span class="text-slate-600 dark:text-slate-400">Email</span><span class="font-semibold text-slate-900 dark:text-white">' + adminEsc(email) + '</span></div>' +
      '<div class="flex justify-between text-sm"><span class="text-slate-600 dark:text-slate-400">Telepon</span><span class="font-semibold text-slate-900 dark:text-white">' + adminEsc(phone) + '</span></div>' +
      '<div class="flex justify-between text-sm"><span class="text-slate-600 dark:text-slate-400">Tanggal</span><span class="font-semibold text-slate-900 dark:text-white">' + date + '</span></div>' +
      '<div class="flex justify-between text-sm"><span class="text-slate-600 dark:text-slate-400">Lapangan</span><span class="font-semibold text-slate-900 dark:text-white">' + adminEsc(c ? c.name : courtId) + '</span></div>' +
      '<div class="flex justify-between text-sm"><span class="text-slate-600 dark:text-slate-400">Waktu</span><span class="font-semibold text-slate-900 dark:text-white">' + adminSelTime + ' - ' + endTime + ' (' + adminSelDuration + ' jam)</span></div>';
    if (totalEl) totalEl.textContent = adminRupiah(amount);
    if (summary) summary.classList.remove('hidden');
  } else {
    if (summary) summary.classList.add('hidden');
  }
}

async function adminSubmitManualBooking(e) {
  e.preventDefault();
  var name = document.getElementById('mb-name').value.trim();
  var email = document.getElementById('mb-email').value.trim();
  var phone = document.getElementById('mb-phone').value.trim();
  var date = document.getElementById('mb-date').value;
  var courtId = document.getElementById('mb-court').value;
  var duration = parseInt(document.getElementById('mb-duration').value);
  var time = document.getElementById('mb-time').value;
  
  if (!name || !email || !phone || !date || !courtId || !time) {
    var errEl = document.getElementById('mb-error');
    errEl.querySelector('p').textContent = 'Lengkapi semua data yang wajib diisi.';
    errEl.classList.remove('hidden');
    return;
  }
  
  try {
    var supabase = await PadelGo.Supabase.init();
    
    // Check if user exists by email
    var profileRes = await supabase.from('profiles').select('id, name, phone').eq('email', email).single();
    var userId;
    var userName;
    
    if (!profileRes.data) {
      // Create a temporary profile for the customer
      userId = crypto.randomUUID();
      userName = name;
      // Note: In real scenario, you'd want to create auth user or link to existing
      adminToast('User baru. Booking dibuat tanpa link ke akun.', 'warning');
    } else {
      userId = profileRes.data.id;
      userName = profileRes.data.name || name;
      // Update phone if not set
      if (!profileRes.data.phone && phone) {
        await supabase.from('profiles').update({ phone: phone }).eq('id', userId);
      }
    }
    
    var c = adminCourts.find(function(x) { return x.id === courtId; });
    var endH = parseInt(time.split(':')[0]) + duration;
    var amount = (c ? c.price_per_hour : 150000) * duration;
    var bookingId = 'BK-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6).toUpperCase();
    
    var res = await supabase.from('bookings').insert({
      id: bookingId,
      user_id: userId,
      court_id: courtId,
      court_name: c ? c.name : courtId,
      date: date,
      start_time: time,
      end_time: String(endH).padStart(2, '0') + ':00',
      duration_hours: duration,
      amount: amount,
      status: 'approved',
      notes: 'Manual booking by admin. Customer: ' + name + ' (' + phone + ', ' + email + ')'
    });
    
    if (res.error) throw res.error;
    
    adminToast('Booking berhasil dibuat!');
    adminInitManualBooking();
    await adminLoad();
  } catch (err) {
    var errEl = document.getElementById('mb-error');
    errEl.querySelector('p').textContent = err.message || 'Error';
    errEl.classList.remove('hidden');
  }
}

// Reports
function adminInitReports() {
  adminSetReportPeriod('month');
  adminPopulateCourtSelect('rep-court');
  adminReportData = adminBookings.slice();
  adminReportFiltered = adminReportData.slice();
  adminReportPageNum = 1;
  adminRenderReport();
}

function adminSetReportPeriod(period) {
  document.querySelectorAll('.rep-period-btn').forEach(function(b) {
    b.classList.remove('border-teal-500', 'bg-teal-100', 'text-teal-700', 'dark:bg-teal-900/50', 'dark:border-teal-700', 'dark:text-teal-300');
    b.classList.add('border-slate-200', 'text-slate-600', 'dark:border-slate-700', 'dark:text-slate-300');
  });
  var btn = document.querySelector('.rep-period-btn[data-period="' + period + '"]');
  if (btn) {
    btn.classList.remove('border-slate-200', 'text-slate-600', 'dark:border-slate-700', 'dark:text-slate-300');
    btn.classList.add('border-teal-500', 'bg-teal-100', 'text-teal-700', 'dark:bg-teal-900/50', 'dark:border-teal-700', 'dark:text-teal-300');
  }
  
  var now = new Date();
  var from, to;
  switch(period) {
    case 'today': from = to = now.toISOString().split('T')[0]; break;
    case 'week': from = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay()).toISOString().split('T')[0]; to = now.toISOString().split('T')[0]; break;
    case 'month': from = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]; to = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0]; break;
    case 'year': from = new Date(now.getFullYear(), 0, 1).toISOString().split('T')[0]; to = new Date(now.getFullYear(), 11, 31).toISOString().split('T')[0]; break;
  }
  
  document.getElementById('rep-from').value = from;
  document.getElementById('rep-to').value = to;
}

function adminGenerateReport() {
  var from = document.getElementById('rep-from').value;
  var to = document.getElementById('rep-to').value;
  var court = document.getElementById('rep-court').value;
  var status = document.getElementById('rep-status').value;
  
  adminReportFiltered = adminReportData.filter(function(b) {
    if (from && b.date < from) return false;
    if (to && b.date > to) return false;
    if (court && b.court_id !== court) return false;
    if (status && b.status !== status) return false;
    return true;
  });
  
  adminReportPageNum = 1;
  adminRenderReport();
}

function adminRenderReport() {
  var total = adminReportFiltered.length;
  var revenue = adminReportFiltered.filter(function(b) { return b.status === 'approved'; }).reduce(function(s, b) { return s + (b.amount || 0); }, 0);
  var pending = adminReportFiltered.filter(function(b) { return b.status === 'pending'; }).length;
  var users = new Map();
  adminReportFiltered.forEach(function(b) { users.set(b.user_id, true); });
  
  document.getElementById('rep-total').textContent = total;
  document.getElementById('rep-revenue').textContent = adminRupiah(revenue);
  document.getElementById('rep-pending').textContent = pending;
  document.getElementById('rep-users').textContent = users.size;
  
  var start = (adminReportPageNum - 1) * adminReportSize;
  var page = adminReportFiltered.slice(start, start + adminReportSize);
  var totalPages = Math.ceil(total / adminReportSize) || 1;
  
  if (!page.length) {
    adminSetHTML('report-table', '<tr><td colspan="8" class="px-4 py-12 text-center text-slate-500">Tidak ada data.</td></tr>';
  } else {
    var html = '';
    page.forEach(function(b, i) {
      var u = adminProfileById.get(b.user_id);
      var name = u ? (u.name || u.email) : 'User';
      html += '<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">';
      html += '<td class="px-4 py-3 text-sm text-slate-500">' + (start + i + 1) + '</td>';
      html += '<td class="px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white">' + adminEsc(name) + '</td>';
      html += '<td class="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">' + adminEsc(b.court_name || b.court_id) + '</td>';
      html += '<td class="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">' + b.date + '</td>';
      html += '<td class="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">' + b.start_time + '-' + b.end_time + '</td>';
      html += '<td class="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">' + (b.duration_hours || 1) + ' jam</td>';
      html += '<td class="px-4 py-3"><span class="inline-flex rounded-full px-2.5 py-1 text-xs font-bold ' + adminStatusClass(b.status) + '">' + adminStatusLabel(b.status) + '</span></td>';
      html += '<td class="px-4 py-3 text-right font-bold text-slate-900 dark:text-white">' + adminRupiah(b.amount) + '</td>';
      html += '</tr>';
    });
    adminSetHTML('report-table', html;
  }
  
  document.getElementById('rep-count').textContent = total > 0 ? (Math.min(start + 1, total) + '-' + Math.min(start + adminReportSize, total) + ' dari ' + total) : '';
  document.getElementById('rep-prev').disabled = adminReportPageNum <= 1;
  document.getElementById('rep-next').disabled = adminReportPageNum >= totalPages;
}

function adminReportPage(delta) {
  adminReportPageNum = Math.max(1, adminReportPageNum + delta);
  adminRenderReport();
}

function adminExportCSV() {
  if (!adminReportFiltered.length) return adminToast('Tidak ada data', 'error');
  var headers = ['No', 'Nama', 'Email', 'Lapangan', 'Tanggal', 'Waktu', 'Durasi', 'Status', 'Jumlah'];
  var rows = adminReportFiltered.map(function(b, i) {
    var u = adminProfileById.get(b.user_id);
    return [i+1, u ? (u.name || 'User') : 'User', u ? u.email : '-', b.court_name || b.court_id, b.date, b.start_time + '-' + b.end_time, (b.duration_hours || 1) + ' jam', adminStatusLabel(b.status), b.amount];
  });
  var csv = [headers, rows.map(function(r) { return r.map(function(c) { return '"' + (c || '') + '"'; }).join(','); })].join('\n');
  var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a'); a.href = url; a.download = 'padelgo-report-' + Date.now() + '.csv'; document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
  adminToast('CSV downloaded!');
}

function adminExportExcel() {
  if (!adminReportFiltered.length) return adminToast('Tidak ada data', 'error');
  var total = adminReportFiltered.filter(function(b) { return b.status === 'approved'; }).reduce(function(s, b) { return s + (b.amount || 0); }, 0);
  var html = '<html><head><meta charset="utf-8"><title>PadelGo Report</title><style>th{background:#0d9488;color:white;padding:8px;}td,th{border:1px solid #ddd;padding:8px;}body{font-family:Arial,sans-serif;}</style></head><body>';
  html += '<h2 style="color:#0d9488;">PadelGo Booking Report</h2>';
  html += '<p><strong>Total Booking:</strong> ' + adminReportFiltered.length + ' | <strong>Approved Revenue:</strong> ' + adminRupiah(total) + '</p>';
  html += '<table><tr><th>No</th><th>Nama</th><th>Email</th><th>Lapangan</th><th>Tanggal</th><th>Waktu</th><th>Durasi</th><th>Status</th><th>Jumlah</th></tr>';
  adminReportFiltered.forEach(function(b, i) {
    var u = adminProfileById.get(b.user_id);
    html += '<tr><td>' + (i+1) + '</td><td>' + (u ? (u.name || 'User') : 'User') + '</td><td>' + (u ? u.email : '-') + '</td><td>' + (b.court_name || b.court_id) + '</td><td>' + b.date + '</td><td>' + b.start_time + '-' + b.end_time + '</td><td>' + (b.duration_hours || 1) + ' jam</td><td>' + adminStatusLabel(b.status) + '</td><td>' + b.amount + '</td></tr>';
  });
  html += '</table></body></html>';
  var blob = new Blob([html], { type: 'application/vnd.ms-excel' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a'); a.href = url; a.download = 'padelgo-report-' + Date.now() + '.xls'; document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
  adminToast('Excel downloaded!');
}

// Filters
function adminPopulateFilters() {
  var sel = document.getElementById('filter-court');
  if (sel) sel.innerHTML = '<option value="all">Semua Lapangan</option>' + adminCourts.map(function(c) { return '<option value="' + c.id + '">' + adminEsc(c.name) + '</option>'; }).join('');
}

// Refresh
async function adminRefresh() {
  var btn = document.getElementById('refreshBtn');
  var icon = document.getElementById('refreshIcon');
  if (btn) btn.disabled = true;
  if (icon) icon.classList.add('animate-spin');
  try {
    await adminLoad();
    adminToast('Data di-refresh!');
  } finally {
    if (btn) btn.disabled = false;
    if (icon) icon.classList.remove('animate-spin');
  }
}

// Helpers
function adminRupiah(val) { return 'Rp ' + Number(val || 0).toLocaleString('id-ID'); }
function adminEsc(str) { return String(str || '').replace(/[&<>"']/g, function(c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
function adminStatusClass(s) { return s === 'approved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300' : s === 'pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300' : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'; }
function adminStatusLabel(s) { return s === 'approved' ? 'Approved' : s === 'pending' ? 'Pending' : 'Cancelled'; }
function adminToast(msg, type) {
  type = type || 'success';
  var bgClass = type === 'error' ? 'bg-red-500' : type === 'warning' ? 'bg-amber-500' : 'bg-emerald-500';
  var t = document.getElementById('admin-toast');
  if (t) {
    t.innerHTML = '<div class="rounded-xl px-4 py-3 text-sm font-bold text-white shadow-xl ' + bgClass + ' animate-in slide-in-from-right">' + adminEsc(msg) + '</div>';
    setTimeout(function() { if (t) t.innerHTML = ''; }, 3000);
  }
}

// Event listeners for manual booking
document.addEventListener('DOMContentLoaded', function() {
  var dateInput = document.getElementById('mb-date');
  if (dateInput) dateInput.addEventListener('change', adminRenderMbTimes);
  var courtInput = document.getElementById('mb-court');
  if (courtInput) courtInput.addEventListener('change', adminRenderMbTimes);
  var nameInput = document.getElementById('mb-name');
  if (nameInput) nameInput.addEventListener('input', adminUpdateMbSummary);
  var emailInput = document.getElementById('mb-email');
  if (emailInput) emailInput.addEventListener('input', adminUpdateMbSummary);
  var phoneInput = document.getElementById('mb-phone');
  if (phoneInput) phoneInput.addEventListener('input', adminUpdateMbSummary);
});

// Start
adminInit();
</script>
