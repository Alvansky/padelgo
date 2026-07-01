---
title: "My Dashboard"
date: 2026-06-29
draft: false
layout: "dashboard"
---

<div class="min-h-[calc(100vh-3.5rem)] bg-slate-50 dark:bg-slate-950">

<!-- Profile Header - Clean design with dark background for better contrast -->
<div class="overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 shadow-sm dark:border-slate-700 mb-4 sm:mb-6">
<div class="h-24 sm:h-28 bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 relative"></div>
<div class="px-4 sm:px-6 pb-6 sm:pb-8 md:px-8 -mt-14 sm:-mt-16 relative">
<!-- Profile Header - Rapi dengan Avatar di kiri, Info di kanan -->
<div class="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6">
  <!-- Avatar -->
  <div class="relative flex-shrink-0">
    <img id="userAvatar" src="" alt="Profile" class="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-2xl object-cover bg-slate-200 dark:border-slate-700">
    <div class="absolute bottom-1 right-1 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 ring-4 ring-white dark:ring-slate-800">
      <svg class="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
    </div>
  </div>

  <!-- User Info - White text on dark background -->
  <div class="text-center sm:text-left flex-1 min-w-0">
    <h1 id="userName" class="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-lg">Loading...</h1>
    <p id="userEmail" class="text-sm text-slate-300 mt-1"></p>
    <!-- Badges -->
    <div class="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
      <span class="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold border border-emerald-500/30">
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
        Verified Player
      </span>
      <span class="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-bold border border-amber-500/30">
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
        Active Member
      </span>
    </div>
  </div>

  <!-- Settings & Stats -->
  <div class="flex flex-col sm:items-end gap-3 w-full sm:w-auto">
    <a href="/settings/" class="inline-flex items-center gap-1.5 rounded-lg bg-white/10 backdrop-blur px-4 py-2 text-sm font-bold text-white hover:bg-white/20 transition border border-white/10">
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
      Settings
    </a>
    <div class="bg-white/10 backdrop-blur rounded-xl px-5 py-3 border border-white/10">
      <div class="text-3xl font-extrabold text-white" id="totalBookings">0</div>
      <div class="text-xs text-slate-300 font-medium">Total Bookings</div>
    </div>
  </div>
</div>
</div>
</div>

<!-- Quick Stats -->
<div class="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
<a href="/order/" class="rounded-xl border border-slate-200 bg-white p-3 sm:p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all dark:border-slate-800 dark:bg-slate-900 text-center">
<div class="w-9 h-9 sm:w-11 sm:h-11 bg-teal-100 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-1.5 sm:mb-2">
<svg class="w-4 h-4 sm:w-5 sm:h-5 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
</div>
<p class="text-[11px] sm:text-xs font-extrabold text-slate-950 dark:text-white leading-tight">Booking Baru</p>
</a>
<div class="rounded-xl border border-slate-200 bg-white p-3 sm:p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 text-center">
<div class="w-9 h-9 sm:w-11 sm:h-11 bg-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-1.5 sm:mb-2">
<svg class="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
</div>
<p id="userBookingCount" class="text-[11px] sm:text-xs font-extrabold text-slate-950 dark:text-white leading-tight">0 Booking</p>
</div>
<div class="rounded-xl border border-slate-200 bg-white p-3 sm:p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 text-center">
<div class="w-9 h-9 sm:w-11 sm:h-11 bg-amber-100 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-1.5 sm:mb-2">
<svg class="w-4 h-4 sm:w-5 sm:h-5 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
</div>
<p id="totalSpent" class="text-[11px] sm:text-xs font-extrabold text-slate-950 dark:text-white leading-tight">Rp 0</p>
</div>
</div>

<!-- Booking History Section -->
<div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 mb-4 sm:mb-6">
<div class="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
<div>
<h2 class="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white flex items-center gap-2">
<svg class="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
Booking History
</h2>
<p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Semua booking Anda</p>
</div>
<a href="/order/" class="inline-flex items-center justify-center rounded-xl bg-teal-700 px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-extrabold text-white transition hover:bg-teal-800 active:scale-95">
<svg class="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
Book Court
</a>
</div>

<div id="historyContainer">
<!-- Loading State -->
<div id="historyLoading" class="p-8 text-center">
<div class="inline-flex items-center gap-2 text-slate-500">
<svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
<span class="text-sm">Memuat booking...</span>
</div>
</div>

<!-- Empty State -->
<div id="historyEmpty" class="hidden p-8 sm:p-12 text-center">
<div class="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
<svg class="w-10 h-10 sm:w-12 sm:h-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
</div>
<h3 class="text-lg font-extrabold text-slate-900 dark:text-white mb-2">Belum Ada Booking</h3>
<p class="text-sm text-slate-500 dark:text-slate-400 mb-6">Mulai booking lapangan padel pertama Anda!</p>
<a href="/order/" class="inline-flex items-center justify-center rounded-xl bg-teal-700 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-teal-800">
<svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
Booking Sekarang
</a>
</div>

<!-- Booking List -->
<div id="historyList" class="divide-y divide-slate-100 dark:divide-slate-800 hidden"></div>
</div>

<p id="dashError" class="hidden rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300 dark:border-red-900/50 mx-4 sm:mx-6 mb-4" role="alert"></p>
</div>

<!-- Court Preview -->
<div class="rounded-2xl border border-slate-200 bg-gradient-to-br from-teal-700 to-teal-900 p-5 sm:p-6 shadow-lg">
<div class="flex items-center justify-between gap-4">
<div>
<h3 class="text-lg font-extrabold text-white">Ingin Booking Lagi?</h3>
<p class="text-teal-100 text-sm mt-1">Pilih lapangan dan waktu favorit Anda</p>
</div>
<a href="/order/" class="shrink-0 inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-teal-700 transition hover:bg-teal-50 active:scale-95 shadow-lg">
<svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
Booking Court
</a>
</div>
</div>

</div>
</div>

<script src="/js/shared.js"></script>
<script>
const statusConfig = {
  approved: { label: 'Approved', bg: 'bg-emerald-100', text: 'text-emerald-700', darkBg: 'dark:bg-emerald-900/50', darkText: 'dark:text-emerald-200', icon: '✓', gradient: 'from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30', border: 'border-emerald-200 dark:border-emerald-800' },
  confirmed: { label: 'Confirmed', bg: 'bg-emerald-100', text: 'text-emerald-700', darkBg: 'dark:bg-emerald-900/50', darkText: 'dark:text-emerald-200', icon: '✓', gradient: 'from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30', border: 'border-emerald-200 dark:border-emerald-800' },
  pending: { label: 'Pending', bg: 'bg-amber-100', text: 'text-amber-700', darkBg: 'dark:bg-amber-900/50', darkText: 'dark:text-amber-200', icon: '⏳', gradient: 'from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30', border: 'border-amber-200 dark:border-amber-800' },
  cancelled: { label: 'Cancelled', bg: 'bg-red-100', text: 'text-red-700', darkBg: 'dark:bg-red-900/50', darkText: 'dark:text-red-200', icon: '✗', gradient: 'from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30', border: 'border-red-200 dark:border-red-800' }
};

function getCourtImage(courtId) {
  const images = {
    'A1': '/images/padel1.jpg',
    'A2': '/images/padel2.jpg',
    'B1': '/images/padel3.jpg',
    'B2': '/images/padel4.jpg'
  };
  return images[courtId] || '/images/padel1.jpg';
}

function formatDateShort(dateStr) {
  if (!dateStr) return '-';
  const date = new Date(dateStr + 'T00:00:00');
  const options = { weekday: 'short', day: 'numeric', month: 'short' };
  return date.toLocaleDateString('id-ID', options);
}

function formatDateFull(dateStr) {
  if (!dateStr) return '-';
  const date = new Date(dateStr + 'T00:00:00');
  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('id-ID', options);
}

function isUpcoming(dateStr) {
  if (!dateStr) return false;
  const bookingDate = new Date(dateStr + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return bookingDate >= today;
}

async function loadDashboard() {
  const supabase = await PadelGo.Supabase.init();
  if (!supabase) { window.location.href = '/login/?next=/dashboard/'; return; }

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) { window.location.href = '/login/?next=/dashboard/'; return; }

  const user = session.user;
  const cachedUser = PadelGo.Auth.getUser();
  const displayName = cachedUser.name || user.user_metadata?.name || user.email?.split('@')[0] || 'User';
  const metadataAvatar = user.user_metadata?.avatar_url || user.user_metadata?.avatar || '';

  try {
    const { data: profile } = await supabase.from('profiles').select('name, email, avatar_url, created_at, role').eq('id', user.id).single();
    const profileName = profile?.name || cachedUser.name || displayName;
    const profileEmail = profile?.email || user.email || cachedUser.email || '';
    const avatar = profile?.avatar_url || metadataAvatar || cachedUser.avatar || '';

    document.getElementById('userName').textContent = profileName;
    document.getElementById('userEmail').textContent = profileEmail;
    document.getElementById('userAvatar').src = avatar || PadelGo.UI.defaultAvatar();
    if (avatar && !avatar.startsWith('data:')) {
      PadelGo.Storage.setAvatar(avatar);
    } else {
      PadelGo.Storage.clearAvatar();
    }

    const cookieUser = cachedUser || {};
    cookieUser.name = profileName;
    cookieUser.email = profileEmail;
    cookieUser.role = profile?.role || 'user';
    cookieUser.avatar = avatar;
    PadelGo.Auth.setUser(cookieUser);
    PadelGo.UI.updateNav(cookieUser);
  } catch {
    document.getElementById('userName').textContent = displayName;
    document.getElementById('userEmail').textContent = user.email || cachedUser.email || '';
    document.getElementById('userAvatar').src = metadataAvatar || cachedUser.avatar || PadelGo.UI.defaultAvatar();
  }

  try {
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: false })
      .order('start_time', { ascending: false });

    if (error) throw new Error(error.message || 'Gagal memuat booking');

    const list = bookings || [];
    document.getElementById('userBookingCount').textContent = list.length + ' Booking';
    document.getElementById('totalBookings').textContent = list.length;

    const totalSpent = list.filter(b => b.status === 'approved' || b.status === 'confirmed')
      .reduce((sum, b) => sum + (Number(b.amount) || 0), 0);
    document.getElementById('totalSpent').textContent = 'Rp ' + totalSpent.toLocaleString('id-ID');

    // Hide loading, show content
    document.getElementById('historyLoading').classList.add('hidden');

    if (list.length === 0) {
      document.getElementById('historyEmpty').classList.remove('hidden');
    } else {
      document.getElementById('historyList').classList.remove('hidden');
      renderBookingHistory(list);
    }
  } catch (err) {
    document.getElementById('historyLoading').classList.add('hidden');
    document.getElementById('dashError').textContent = err.message || 'Gagal memuat data.';
    document.getElementById('dashError').classList.remove('hidden');
  }
}

function renderBookingHistory(bookings) {
  const container = document.getElementById('historyList');
  container.innerHTML = '';

  // Sort: upcoming first, then by date desc
  const sorted = [...bookings].sort((a, b) => {
    const aUp = isUpcoming(a.date);
    const bUp = isUpcoming(b.date);
    if (aUp && !bUp) return -1;
    if (!aUp && bUp) return 1;
    return new Date(b.date) - new Date(a.date);
  });

  // Group by upcoming/past
  const upcoming = sorted.filter(b => isUpcoming(b.date));
  const past = sorted.filter(b => !isUpcoming(b.date));

  // Upcoming Section
  if (upcoming.length > 0) {
    const upcomingHeader = document.createElement('div');
    upcomingHeader.className = 'px-4 sm:px-6 py-3 bg-teal-50 dark:bg-teal-950/30 border-b border-teal-100 dark:border-teal-900/50';
    upcomingHeader.innerHTML = `<p class="text-xs font-extrabold text-teal-700 dark:text-teal-300 uppercase tracking-wide flex items-center gap-2">
      <span class="h-2 w-2 rounded-full bg-teal-500 animate-pulse"></span>
      Upcoming Bookings (${upcoming.length})
    </p>`;
    container.appendChild(upcomingHeader);

    upcoming.forEach(b => container.appendChild(createBookingCard(b, true)));
  }

  // Past Section
  if (past.length > 0) {
    const pastHeader = document.createElement('div');
    pastHeader.className = 'px-4 sm:px-6 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-700';
    pastHeader.innerHTML = `<p class="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Riwayat Booking (${past.length})</p>`;
    container.appendChild(pastHeader);

    past.forEach(b => container.appendChild(createBookingCard(b, false)));
  }
}

function createBookingCard(booking, isUpcoming) {
  const config = statusConfig[booking.status] || statusConfig.pending;
  const card = document.createElement('div');
  card.className = `p-4 sm:p-5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition cursor-pointer group`;

  card.innerHTML = `
    <div class="flex gap-3 sm:gap-4">
      <!-- Court Image -->
      <div class="shrink-0 relative">
        <img src="${getCourtImage(booking.court_id)}" alt="${escapeHtml(booking.court_name || booking.court_id)}"
          class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shadow-sm">
        ${isUpcoming && (booking.status === 'approved' || booking.status === 'confirmed') ? `
          <div class="absolute -top-1 -right-1 h-5 w-5 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
            <svg class="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
          </div>
        ` : ''}
      </div>

      <!-- Info -->
      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between gap-2">
          <div>
            <h4 class="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base leading-tight">${escapeHtml(booking.court_name || booking.court_id)}</h4>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              ${formatDateFull(booking.date)}
            </p>
          </div>
          <span class="shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] sm:text-xs font-extrabold ${config.bg} ${config.text} ${config.darkBg} ${config.darkText}">
            ${config.icon} ${config.label}
          </span>
        </div>

        <div class="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
          <div class="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-300">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span class="font-medium">${escapeHtml(booking.start_time)} - ${escapeHtml(booking.end_time)}</span>
          </div>
          <div class="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-300">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span class="font-extrabold text-teal-700 dark:text-teal-300">${rupiah(booking.amount)}</span>
          </div>
        </div>

        ${isUpcoming && booking.status === 'pending' ? `
          <p class="mt-2 text-[10px] sm:text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            Menunggu approval admin
          </p>
        ` : ''}

        ${booking.notes ? `
          <p class="mt-2 text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 italic truncate">${escapeHtml(booking.notes)}</p>
        ` : ''}
      </div>
    </div>
  `;

  return card;
}

function rupiah(value) {
  return 'Rp ' + Number(value || 0).toLocaleString('id-ID');
}

function escapeHtml(text) {
  const map = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'};
  return String(text || '').replace(/[&<>"']/g, m => map[m]);
}

document.addEventListener('DOMContentLoaded', loadDashboard);
</script>
