---
title: "Book a Court"
date: 2026-06-29
draft: false
layout: "order"
---

<section class="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-50 via-slate-100 to-teal-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-teal-950/20 py-6 sm:py-8">
<div class="mx-auto max-w-6xl px-4 lg:px-8">

<!-- Header - Simple Centered -->
<div class="mb-6 text-center">
<h1 class="text-2xl font-bold text-slate-900 dark:text-white">Book a Court</h1>
<p class="text-sm text-slate-500 dark:text-slate-400">PadelGo Courts</p>
</div>

<!-- Auth Notice -->
<div id="authNotice" class="mb-6 rounded-xl border border-amber-200/80 bg-gradient-to-r from-amber-50 to-orange-50 p-4 shadow-sm dark:border-amber-800/50 dark:from-amber-950/50 dark:to-orange-950/50">
<div class="flex items-center gap-3">
<div class="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/50">
<svg class="h-4 w-4 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
</div>
<div>
<p class="text-sm font-semibold text-amber-800 dark:text-amber-200">Login Required</p>
<p class="mt-0.5 text-xs text-amber-600 dark:text-amber-400">
  <a href="/login/?next=/order/" class="font-bold underline underline-offset-2 hover:text-amber-700">Login</a> atau <a href="/register/" class="font-bold underline underline-offset-2 hover:text-amber-700">Register</a> untuk booking
</p>
</div>
</div>
</div>

<div class="grid gap-6 lg:grid-cols-12">
<!-- Main Content -->
<div class="lg:col-span-7 space-y-4">

<!-- Step 1: Date & Court -->
<div class="rounded-2xl border border-slate-200/60 bg-white/80 backdrop-blur-sm shadow-sm dark:border-slate-800/60 dark:bg-slate-900/80">
<div class="flex items-center gap-3 border-b border-slate-100/80 px-5 py-4 dark:border-slate-800/80">
<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-400 to-teal-500 text-sm font-bold text-white shadow-md shadow-teal-500/30">1</div>
<div>
<h3 class="font-semibold text-slate-900 dark:text-white">Pilih Tanggal & Lapangan</h3>
<p class="text-xs text-slate-500 dark:text-slate-400">Pilih jadwal yang tersedia</p>
</div>
</div>

<div class="p-5 space-y-5">
<!-- Date -->
<div>
<label for="date" class="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
<svg class="h-4 w-4 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
Tanggal Main
</label>
<input id="date" type="date" required class="w-full rounded-xl border border-slate-200 bg-white py-3 px-4 text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500">
</div>

<!-- Court Selection -->
<div>
<label class="mb-3 flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
<svg class="h-4 w-4 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
Lapangan
</label>
<div class="grid grid-cols-2 gap-3" id="courtGrid">
<div class="col-span-2 rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-400 dark:border-slate-700">
Memuat...
</div>
</div>
<input type="hidden" id="court" required>
</div>
</div>
</div>

<!-- Step 2: Time -->
<div class="rounded-2xl border border-slate-200/60 bg-white/80 backdrop-blur-sm shadow-sm dark:border-slate-800/60 dark:bg-slate-900/80">
<div class="flex items-center gap-3 border-b border-slate-100/80 px-5 py-4 dark:border-slate-800/80">
<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-400 to-teal-500 text-sm font-bold text-white shadow-md shadow-teal-500/30">2</div>
<div class="flex-1">
<h3 class="font-semibold text-slate-900 dark:text-white">Pilih Waktu</h3>
<p class="text-xs text-slate-500 dark:text-slate-400">Jam operasional 06:00 - 22:00</p>
</div>
<span id="availabilityStatus" class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">-</span>
</div>

<div class="p-5">
<div id="timeGrid" class="grid grid-cols-5 gap-2 sm:grid-cols-6 md:grid-cols-8"></div>
<div id="timePlaceholder" class="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-8 text-center dark:border-slate-800 dark:bg-slate-950/50">
<svg class="mb-3 h-10 w-10 text-slate-300 dark:text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
<p class="text-sm font-medium text-slate-500 dark:text-slate-400">Pilih tanggal & lapangan terlebih dahulu</p>
</div>
<input type="hidden" id="time" required>
</div>
</div>

<!-- Step 3: Duration -->
<div class="rounded-2xl border border-slate-200/60 bg-white/80 backdrop-blur-sm shadow-sm dark:border-slate-800/60 dark:bg-slate-900/80">
<div class="flex items-center gap-3 border-b border-slate-100/80 px-5 py-4 dark:border-slate-800/80">
<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-400 to-teal-500 text-sm font-bold text-white shadow-md shadow-teal-500/30">3</div>
<div>
<h3 class="font-semibold text-slate-900 dark:text-white">Durasi Bermain</h3>
<p class="text-xs text-slate-500 dark:text-slate-400">Pilih durasi yang diinginkan</p>
</div>
</div>

<div class="p-5">
<div class="flex flex-wrap gap-2" id="durationGrid">
<button type="button" data-hours="1" class="duration-btn flex items-center gap-2 rounded-xl border-2 border-teal-500 bg-gradient-to-r from-teal-500 to-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-teal-500/20 transition-all hover:shadow-lg">
<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
1 Jam
</button>
<button type="button" data-hours="2" class="duration-btn flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-teal-400 hover:bg-teal-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
2 Jam
</button>
<button type="button" data-hours="3" class="duration-btn flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-teal-400 hover:bg-teal-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
3 Jam
</button>
<button type="button" data-hours="4" class="duration-btn flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-teal-400 hover:bg-teal-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
4 Jam
</button>
<button type="button" data-hours="5" class="duration-btn flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-teal-400 hover:bg-teal-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
5 Jam
</button>
<button type="button" data-hours="6" class="duration-btn flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-teal-400 hover:bg-teal-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
6 Jam
</button>
</div>
<input type="hidden" id="duration" value="1">
</div>
</div>

</div>

<!-- Sidebar -->
<div class="lg:col-span-5">
<div class="sticky top-20 space-y-4">

<!-- Summary Card -->
<div id="selectedSummary" class="hidden">
<div class="overflow-hidden rounded-2xl border border-teal-200/60 bg-gradient-to-br from-teal-50 via-emerald-50/50 to-teal-50/50 shadow-lg shadow-teal-500/10 dark:border-teal-800/60 dark:from-teal-950/50 dark:via-emerald-950/30 dark:to-teal-950/50">
<div class="flex items-center gap-3 border-b border-teal-200/60 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 px-5 py-4 dark:border-teal-800/60 dark:from-teal-500/10 dark:to-emerald-500/10">
<div class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 shadow-lg shadow-teal-500/30">
<svg class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
</div>
<div>
<h3 class="font-bold text-teal-800 dark:text-teal-200">Ringkasan Booking</h3>
<p class="text-xs text-teal-600/80 dark:text-teal-400/80">Periksa detail sebelum konfirmasi</p>
</div>
</div>

<div class="p-5 space-y-4">
<!-- Court -->
<div class="flex items-center gap-3 rounded-xl bg-white/80 p-3 dark:bg-slate-900/50">
<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-teal-100 to-emerald-100 dark:from-teal-900/50 dark:to-emerald-900/50">
<svg class="h-5 w-5 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
</div>
<div class="flex-1">
<p class="text-xs text-slate-500 dark:text-slate-400">Lapangan</p>
<p id="summaryCourt" class="font-semibold text-slate-900 dark:text-white">-</p>
</div>
<span id="summaryCourtPrice" class="text-sm font-bold text-teal-600 dark:text-teal-400">-</span>
</div>

<!-- Date -->
<div class="flex items-center gap-3 rounded-xl bg-white/80 p-3 dark:bg-slate-900/50">
<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50">
<svg class="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
</div>
<div class="flex-1">
<p class="text-xs text-slate-500 dark:text-slate-400">Tanggal</p>
<p id="summaryDate" class="font-semibold text-slate-900 dark:text-white">-</p>
</div>
</div>

<!-- Time -->
<div class="flex items-center gap-3 rounded-xl bg-white/80 p-3 dark:bg-slate-900/50">
<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50">
<svg class="h-5 w-5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
</div>
<div class="flex-1">
<p class="text-xs text-slate-500 dark:text-slate-400">Waktu</p>
<p id="summaryTime" class="font-semibold text-slate-900 dark:text-white">-</p>
</div>
<span id="summaryDuration" class="rounded-full bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">-</span>
</div>

<!-- Total -->
<div class="flex items-center justify-between rounded-xl border-2 border-teal-200/80 bg-gradient-to-r from-teal-50 to-emerald-50 p-4 dark:border-teal-800/60 dark:from-teal-950/50 dark:to-emerald-950/50">
<div class="flex items-center gap-3">
<div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 shadow-lg shadow-teal-500/30">
<svg class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
</div>
<div>
<p class="text-xs text-slate-500 dark:text-slate-400">Total Bayar</p>
<p class="text-xs text-slate-400 dark:text-slate-500">(Termasuk semua biaya)</p>
</div>
</div>
<p id="summaryPrice" class="text-2xl font-bold text-teal-600 dark:text-teal-400">-</p>
</div>
</div>
</div>
</div>

<!-- Empty State -->
<div id="summaryEmpty" class="overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-white/50 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/50">
<div class="flex flex-col items-center justify-center p-8 text-center">
<div class="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
<svg class="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
</div>
<p class="text-sm font-medium text-slate-500 dark:text-slate-400">Lengkapi form untuk melihat ringkasan</p>
</div>
</div>

<!-- Error -->
<p id="bookingError" class="hidden overflow-hidden rounded-xl border border-red-200 bg-gradient-to-r from-red-50 to-red-100/50 p-4 text-sm text-red-700 dark:border-red-800/50 dark:from-red-950/50 dark:to-red-950/30 dark:text-red-300" role="alert"></p>

<!-- Success Panel -->
<div id="bookingSuccessPanel" class="hidden">
<div class="overflow-hidden rounded-2xl border-2 border-emerald-200/60 bg-gradient-to-br from-emerald-50 via-teal-50/50 to-emerald-50/50 shadow-xl shadow-emerald-500/10 dark:border-emerald-800/60 dark:from-emerald-950/50 dark:via-teal-950/30 dark:to-emerald-950/50">
<div class="flex flex-col items-center border-b border-emerald-200/60 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 px-5 py-6 dark:border-emerald-800/60 dark:from-emerald-500/10 dark:to-teal-500/10">
<div class="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-500/30">
<svg class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
</div>
<h3 class="text-xl font-bold text-emerald-800 dark:text-emerald-200">Booking Berhasil!</h3>
<p class="mt-1 text-sm text-emerald-600/80 dark:text-emerald-400/80">Silakan lakukan pembayaran sesuai total</p>
</div>

<div class="p-5 space-y-4">
<!-- Booking ID -->
<div class="flex flex-col items-center rounded-xl bg-white/80 p-4 dark:bg-slate-900/80">
<p class="mb-1 text-xs font-medium text-slate-500 dark:text-slate-400">ID Booking</p>
<p id="successBookingId" class="font-mono text-2xl font-bold tracking-wider text-teal-600 dark:text-teal-400"></p>
</div>

<!-- Details -->
<div id="successDetails" class="rounded-xl bg-white/80 p-4 dark:bg-slate-900/80"></div>

<!-- Warning -->
<div class="flex items-center gap-3 rounded-xl border border-amber-200/60 bg-gradient-to-r from-amber-50 to-orange-50/50 p-3 dark:border-amber-800/40 dark:from-amber-950/50 dark:to-orange-950/30">
<svg class="h-5 w-5 shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
<p class="text-xs font-medium text-amber-700 dark:text-amber-400">Menunggu approval dari admin. Mohon lakukan pembayaran dan upload bukti transfer.</p>
</div>

<!-- Actions -->
<div class="flex flex-col gap-2">
<a href="/dashboard/" class="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-teal-500/25 transition-all hover:from-teal-600 hover:to-teal-700 hover:shadow-xl">
<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
Lihat Booking Saya
</a>
<button type="button" onclick="resetAndContinue()" class="flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-teal-400 hover:bg-teal-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
Booking Lagi
</button>
</div>
</div>
</div>
</div>

<!-- Submit Button -->
<button type="submit" id="submitBtn" form="orderForm" class="w-full rounded-xl bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 py-4 text-base font-bold text-white shadow-xl shadow-teal-500/25 transition-all hover:from-teal-600 hover:via-teal-700 hover:to-teal-800 hover:shadow-2xl hover:shadow-teal-500/30 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60">
<span id="submitText">Konfirmasi Booking</span>
</button>

</div>
</div>
</div>

</div>
</section>

<!-- Hidden Form -->
<form id="orderForm" onsubmit="handleBooking(event)" novalidate></form>

<script src="/js/shared.js"></script>
<script>
const OPERATING_HOURS = { start: 6, end: 23 };
let bookedSlots = {};
let selectedDuration = 1;
let selectedCourt = null;
let selectedTime = null;
let courts = [];

function selectDuration(hours, button) {
  selectedDuration = hours;
  document.getElementById('duration').value = hours;
  document.querySelectorAll('.duration-btn').forEach(btn => {
    btn.className = 'duration-btn flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-teal-400 hover:bg-teal-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300';
  });
  button.className = 'duration-btn flex items-center gap-2 rounded-xl border-2 border-teal-500 bg-gradient-to-r from-teal-500 to-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-teal-500/20 transition-all hover:shadow-lg';
  renderTimeSlots();
  updateSummary();
}

function selectCourt(court, courtData, button) {
  selectedCourt = court;
  document.getElementById('court').value = court;
  document.querySelectorAll('.court-btn').forEach(btn => {
    btn.className = 'court-btn group relative overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-100 transition-all hover:border-teal-400 dark:border-slate-700 dark:bg-slate-900';
    btn.querySelector('img').className = 'h-full w-full object-cover opacity-30 dark:opacity-20 group-hover:opacity-40 dark:group-hover:opacity-30 transition-opacity';
  });
  button.className = 'court-btn group relative overflow-hidden rounded-2xl border-2 border-teal-500 bg-gradient-to-br from-teal-500/20 to-emerald-500/20 transition-all dark:from-teal-500/30 dark:to-emerald-500/30';
  button.querySelector('img').className = 'h-full w-full object-cover opacity-50 dark:opacity-40 transition-opacity';
  loadAvailability();
  updateSummary();
}

async function checkAuth() {
  const supabase = await PadelGo.Supabase.init();
  if (!supabase) return false;
  const { data: { session } } = await supabase.auth.getSession();
  const notice = document.getElementById('authNotice');
  if (session) notice.classList.add('hidden');
  else notice.classList.remove('hidden');
  return !!session;
}

async function loadCourts() {
  try {
    const supabase = await PadelGo.Supabase.init();
    if (!supabase) throw new Error();
    const { data, error } = await supabase.from('courts').select('*').eq('available', true).order('name', { ascending: true });
    if (error) throw new Error();
    courts = data || [];
  } catch {
    courts = [
      { id: 'C1', name: 'Court 1 - Premium Indoor', type: 'Premium Indoor', price_per_hour: 150000 },
      { id: 'C2', name: 'Court 2 - Standard Indoor', type: 'Standard Indoor', price_per_hour: 100000 },
      { id: 'C3', name: 'Court 3 - Premium Glass', type: 'Premium Glass', price_per_hour: 150000 },
      { id: 'C4', name: 'Court 4 - Standard Glass', type: 'Standard Glass', price_per_hour: 100000 },
    ];
  }
  renderCourts();
}

function renderCourts() {
  const grid = document.getElementById('courtGrid');
  if (!courts.length) {
    grid.innerHTML = '<div class="col-span-2 rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-400 dark:border-slate-700">Tidak ada lapangan tersedia</div>';
    return;
  }
  
  grid.innerHTML = courts.map(court => {
    const imgUrl = court.image_url || '/images/padel1.jpg';
    return `
    <button type="button" data-court="${court.id}" class="court-btn group relative overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-100 transition-all hover:border-teal-400 dark:border-slate-700 dark:bg-slate-900" onclick="selectCourt('${court.id}', ${JSON.stringify(court).replace(/"/g, '&quot;')}, this)">
      <!-- Background Image with Overlay -->
      <div class="absolute inset-0 overflow-hidden">
        <img src="${imgUrl}" alt="${court.name}" class="h-full w-full object-cover opacity-30 dark:opacity-20 group-hover:opacity-40 dark:group-hover:opacity-30 transition-opacity">
        <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent"></div>
      </div>
      <!-- Content -->
      <div class="relative z-10 p-4">
        <div class="mb-2 flex items-center justify-between">
          <span class="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold text-teal-700 shadow-sm backdrop-blur-sm dark:bg-slate-900/90 dark:text-teal-300">${court.type}</span>
          <span class="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-xs font-bold text-slate-700 shadow-sm backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity dark:bg-slate-900/90">
            <svg class="h-4 w-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
          </span>
        </div>
        <h4 class="mb-1 font-bold text-white drop-shadow-lg">${court.name}</h4>
        <p class="text-xl font-bold text-white drop-shadow-lg">${PadelGo.Format.rupiah(court.price_per_hour)}<span class="text-xs font-normal text-white/70"> /jam</span></p>
      </div>
    </button>
  `}).join('');
}

async function loadAvailability() {
  const status = document.getElementById('availabilityStatus');
  const date = document.getElementById('date').value;
  if (!date || !selectedCourt) {
    status.textContent = '-';
    status.className = 'rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400';
    return;
  }
  status.textContent = 'Memuat...';
  status.className = 'rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-600 dark:bg-amber-900/50 dark:text-amber-400';
  try {
    const supabase = await PadelGo.Supabase.init();
    if (!supabase) throw new Error();
    const { data, error } = await supabase.rpc('get_booked_slots', { p_court_id: selectedCourt, p_date: date });
    if (error) throw new Error();
    bookedSlots[selectedCourt] = [];
    (data || []).forEach(b => {
      const sh = Number(String(b.start_time).split(':')[0]);
      const eh = Number(String(b.end_time).split(':')[0]);
      for (let h = sh; h < eh; h++) {
        const label = String(h).padStart(2, '0') + ':00';
        if (!bookedSlots[selectedCourt].includes(label)) bookedSlots[selectedCourt].push(label);
      }
    });
    status.textContent = 'Tersedia';
    status.className = 'rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400';
  } catch {
    status.textContent = 'Error';
    status.className = 'rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-600 dark:bg-red-900/50 dark:text-red-400';
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
  const placeholder = document.getElementById('timePlaceholder');
  if (!selectedCourt || !document.getElementById('date').value) {
    placeholder.classList.remove('hidden');
    grid.classList.add('hidden');
    return;
  }
  placeholder.classList.add('hidden');
  grid.classList.remove('hidden');
  grid.innerHTML = '';
  for (let hour = OPERATING_HOURS.start; hour < OPERATING_HOURS.end; hour++) {
    const timeLabel = String(hour).padStart(2, '0') + ':00';
    const disabled = isRangeBooked(timeLabel);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = timeLabel;
    btn.disabled = disabled;
    btn.onclick = disabled ? null : () => selectTime(timeLabel, btn);
    btn.className = disabled
      ? 'rounded-lg bg-slate-100 py-2.5 text-xs font-medium text-slate-400 line-through dark:bg-slate-900 dark:text-slate-600 cursor-not-allowed'
      : 'rounded-lg border border-slate-200 bg-white py-2.5 text-xs font-medium text-slate-700 transition-all hover:border-teal-400 hover:bg-teal-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-teal-500';
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
    if (!btn.disabled) btn.className = 'rounded-lg border border-slate-200 bg-white py-2.5 text-xs font-medium text-slate-700 transition-all hover:border-teal-400 hover:bg-teal-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-teal-500';
  });
  button.className = 'rounded-lg border-2 border-teal-500 bg-gradient-to-r from-teal-500 to-teal-600 py-2.5 text-xs font-semibold text-white shadow-md';
  updateSummary();
}

function updateSummary() {
  const summary = document.getElementById('selectedSummary');
  const empty = document.getElementById('summaryEmpty');
  if (selectedCourt && selectedTime && selectedDuration) {
    const endHour = Number(selectedTime.split(':')[0]) + selectedDuration;
    const court = courts.find(c => c.id === selectedCourt);
    const total = (court?.price_per_hour || 150000) * selectedDuration;
    const dateVal = document.getElementById('date').value;
    const dateDisplay = dateVal ? new Date(dateVal + 'T00:00:00').toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '-';
    
    document.getElementById('summaryCourt').textContent = court?.name || '-';
    document.getElementById('summaryCourtPrice').textContent = PadelGo.Format.rupiah(court?.price_per_hour || 0) + '/jam';
    document.getElementById('summaryDate').textContent = dateDisplay;
    document.getElementById('summaryTime').textContent = selectedTime + ' - ' + String(endHour).padStart(2, '0') + ':00';
    document.getElementById('summaryDuration').textContent = selectedDuration + ' jam';
    document.getElementById('summaryPrice').textContent = PadelGo.Format.rupiah(total);
    summary.classList.remove('hidden');
    empty.classList.add('hidden');
  } else {
    summary.classList.add('hidden');
    empty.classList.remove('hidden');
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
  document.getElementById('availabilityStatus').textContent = '-';
  document.querySelectorAll('.duration-btn').forEach((btn, i) => {
    btn.className = i === 0 
      ? 'duration-btn flex items-center gap-2 rounded-xl border-2 border-teal-500 bg-gradient-to-r from-teal-500 to-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-teal-500/20 transition-all hover:shadow-lg'
      : 'duration-btn flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-teal-400 hover:bg-teal-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300';
  });
  document.querySelectorAll('.court-btn').forEach(btn => {
    btn.className = 'court-btn rounded-xl border-2 border-slate-200 bg-white p-4 text-left transition-all hover:border-teal-400 hover:bg-teal-50/50 dark:border-slate-700 dark:bg-slate-950';
  });
  document.getElementById('selectedSummary').classList.add('hidden');
  document.getElementById('summaryEmpty').classList.remove('hidden');
  document.getElementById('bookingError').classList.add('hidden');
  document.getElementById('bookingSuccessPanel').classList.add('hidden');
  document.getElementById('timePlaceholder').classList.remove('hidden');
  document.getElementById('timeGrid').classList.add('hidden');
  document.getElementById('timeGrid').innerHTML = '';
  document.getElementById('submitBtn').classList.remove('hidden');
}

function resetAndContinue() {
  resetFormState();
  document.getElementById('date').focus();
}

function getTodayLocalDate() {
  const now = new Date();
  return now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
}

async function handleBooking(e) {
  e.preventDefault();
  const errorEl = document.getElementById('bookingError');
  const successPanel = document.getElementById('bookingSuccessPanel');
  const submitBtn = document.getElementById('submitBtn');
  const submitText = document.getElementById('submitText');
  errorEl.classList.add('hidden');
  successPanel.classList.add('hidden');

  const supabase = await PadelGo.Supabase.init();
  if (!supabase) { errorEl.textContent = 'System not configured.'; errorEl.classList.remove('hidden'); return; }
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) { errorEl.textContent = 'Please login first.'; errorEl.classList.remove('hidden'); window.location.href = '/login/?next=/order/'; return; }
  if (!selectedCourt || !selectedTime) { errorEl.textContent = 'Pilih lapangan dan waktu.'; errorEl.classList.remove('hidden'); return; }
  if (!document.getElementById('date').value) { errorEl.textContent = 'Pilih tanggal.'; errorEl.classList.remove('hidden'); return; }

  submitBtn.disabled = true;
  submitText.textContent = 'Memproses...';

  try {
    const dateVal = document.getElementById('date').value;
    const startHour = Number(selectedTime.split(':')[0]);
    const endHour = startHour + selectedDuration;
    const endTime = String(endHour).padStart(2, '0') + ':00';
    const court = courts.find(c => c.id === selectedCourt);
    const pricePerHour = court?.price_per_hour || 150000;
    const amount = pricePerHour * selectedDuration;

    const { data: newBooking, error: insertError } = await supabase.from('bookings').insert({
      user_id: session.user.id,
      court_id: selectedCourt,
      court_name: court?.name || selectedCourt,
      date: dateVal,
      start_time: selectedTime,
      end_time: endTime,
      duration_hours: selectedDuration,
      amount: amount,
      status: 'pending',
    }).select('booking_id').single();

    if (insertError) throw new Error(insertError.message || 'Booking failed');

    const displayBookingId = newBooking?.booking_id || 'Pending';
    const dateDisplay = new Date(dateVal + 'T00:00:00').toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    document.getElementById('successBookingId').textContent = displayBookingId;
    document.getElementById('successDetails').innerHTML = `
      <div class="space-y-2">
        <div class="flex justify-between"><span class="text-slate-500">Court:</span><span class="font-semibold">${court?.name || selectedCourt}</span></div>
        <div class="flex justify-between"><span class="text-slate-500">Tanggal:</span><span class="font-semibold">${dateDisplay}</span></div>
        <div class="flex justify-between"><span class="text-slate-500">Waktu:</span><span class="font-semibold">${selectedTime} - ${endTime}</span></div>
        <div class="flex justify-between"><span class="text-slate-500">Durasi:</span><span class="font-semibold">${selectedDuration} jam</span></div>
        <div class="flex justify-between border-t pt-2 mt-2"><span class="text-slate-500">Total:</span><span class="font-bold text-teal-600">${PadelGo.Format.rupiah(amount)}</span></div>
      </div>
    `;
    
    successPanel.classList.remove('hidden');
    submitBtn.classList.add('hidden');
    PadelGo.UI.toast('Booking berhasil!');
    loadAvailability();
  } catch (err) {
    errorEl.textContent = err.message || 'Booking failed.';
    errorEl.classList.remove('hidden');
  } finally {
    submitBtn.disabled = false;
    submitText.textContent = 'Konfirmasi Booking';
  }
}

document.querySelectorAll('.duration-btn').forEach((button, i) => {
  button.addEventListener('click', () => selectDuration(Number(button.dataset.hours), button));
});
document.getElementById('date').addEventListener('change', () => { loadAvailability(); updateSummary(); });
document.getElementById('date').setAttribute('min', getTodayLocalDate());
checkAuth();
loadCourts();
</script>
