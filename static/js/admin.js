// PadelGo Admin Dashboard
(function() {
  'use strict';

  // Config
  var SUPABASE_URL = 'https://fgjmqqdwyvawtvfkzgrr.supabase.co';
  var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnam1xcWR3eXZhd3R2Zmt6Z3JyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI4MTkzNTksImV4cCI6MjA5ODM5NTM1OX0.rEGjOsJ3oIY2SryTdPFSOt3lxjsycxbHtifzeUnwYlE';

  // State
  var supabase = null;
  var session = null;
  var profile = null;
  var bookings = [];
  var courts = [];
  var users = [];
  var currentPage = 'overview';

  // Init
  async function init() {
    try {
      showLoading(true);
      await loadSupabase();
      await checkAuth();
      await loadData();
      showLoading(false);
      showContent(true);
      renderAll();
    } catch (err) {
      console.error('Init error:', err);
      showError(err.message || 'Gagal memuat dashboard');
    }
  }

  // Load Supabase
  async function loadSupabase() {
    if (typeof window.supabase !== 'undefined') {
      supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      return;
    }

    return new Promise(function(resolve, reject) {
      var script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
      script.onload = function() {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        resolve();
      };
      script.onerror = function() {
        reject(new Error('Gagal memuat Supabase'));
      };
      document.head.appendChild(script);
    });
  }

  // Check auth
  async function checkAuth() {
    var res = await supabase.auth.getSession();
    if (!res.data || !res.data.session) {
      throw new Error('Anda harus login terlebih dahulu');
    }
    session = res.data.session;

    var profileRes = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
    if (!profileRes.data) {
      throw new Error('Profile tidak ditemukan');
    }
    profile = profileRes.data;

    if (profile.role !== 'admin') {
      throw new Error('Akses ditolak. Anda bukan admin.');
    }
  }

  // Load data
  async function loadData() {
    var bRes = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
    var cRes = await supabase.from('courts').select('*').order('name');
    var uRes = await supabase.from('profiles').select('*').order('created_at', { ascending: false });

    bookings = bRes.data || [];
    courts = cRes.data || [];
    users = uRes.data || [];
  }

  // Render all
  function renderAll() {
    renderOverview();
    renderSidebar();
  }

  // Render sidebar
  function renderSidebar() {
    var nameEl = document.getElementById('adminName');
    var avatarEl = document.getElementById('adminAvatar');
    if (nameEl) nameEl.textContent = profile.name || profile.email || 'Admin';
    if (avatarEl) avatarEl.textContent = (profile.name || 'A').charAt(0).toUpperCase();

    var badge = document.getElementById('pendingBadge');
    var pending = bookings.filter(function(b) { return b.status === 'pending'; });
    if (badge) {
      if (pending.length > 0) {
        badge.textContent = pending.length;
        badge.classList.remove('hidden');
      } else {
        badge.classList.add('hidden');
      }
    }
  }

  // Render overview
  function renderOverview() {
    var approved = bookings.filter(function(b) { return b.status === 'approved'; });
    var pending = bookings.filter(function(b) { return b.status === 'pending'; });
    var revenue = approved.reduce(function(s, b) { return s + (b.amount || 0); }, 0);

    setText('statTotal', bookings.length);
    setText('statPending', pending.length);
    setText('statApproved', approved.length);
    setText('statRevenue', formatRupiah(revenue));

    setText('finApproved', formatRupiah(revenue));
    setText('finPending', formatRupiah(pending.reduce(function(s, b) { return s + (b.amount || 0); }, 0)));
    setText('finCancelled', formatRupiah(bookings.filter(function(b) { return b.status === 'cancelled'; }).reduce(function(s, b) { return s + (b.amount || 0); }, 0)));

    renderCalendar();
    renderRecentBookings();
    populateCourtSelects();
  }

  // Render calendar
  function renderCalendar() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth();
    var months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    setText('calMonth', months[month] + ' ' + year);

    var grid = document.getElementById('calGrid');
    if (!grid) return;

    var firstDay = new Date(year, month, 1).getDay();
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var today = now.toISOString().split('T')[0];

    var byDate = {};
    bookings.forEach(function(b) {
      if (!byDate[b.date]) byDate[b.date] = { approved: 0, pending: 0, cancelled: 0 };
      if (b.status === 'approved') byDate[b.date].approved++;
      else if (b.status === 'pending') byDate[b.date].pending++;
      else byDate[b.date].cancelled++;
    });

    var html = '';
    for (var i = 0; i < firstDay; i++) {
      html += '<div></div>';
    }
    for (var d = 1; d <= daysInMonth; d++) {
      var ds = year + '-' + String(month + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0');
      var isToday = ds === today;
      var bd = byDate[ds] || {};
      var bgClass = '';
      if (bd.approved > 0) bgClass = 'bg-emerald-500 text-white';
      else if (bd.pending > 0) bgClass = 'bg-amber-500 text-white';
      else if (isToday) bgClass = 'bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300';

      html += '<div class="p-2 text-center rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 ' + bgClass + '" onclick="adminShowDay(\'' + ds + '\')">' + d + '</div>';
    }
    grid.innerHTML = html;
  }

  // Render recent bookings
  function renderRecentBookings() {
    var list = document.getElementById('recentList');
    if (!list) return;

    var recent = bookings.slice(0, 5);
    if (recent.length === 0) {
      list.innerHTML = '<p class="text-center py-8 text-slate-500">Belum ada booking</p>';
      return;
    }

    var html = '';
    recent.forEach(function(b) {
      var statusClass = b.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : b.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700';
      html += '<div class="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">';
      html += '<div><p class="font-semibold text-sm">' + escapeHtml(b.court_name) + '</p><p class="text-xs text-slate-500">' + b.date + ' • ' + b.start_time + '-' + b.end_time + '</p></div>';
      html += '<span class="px-2 py-1 rounded-full text-xs font-bold ' + statusClass + '">' + b.status + '</span>';
      html += '</div>';
    });
    list.innerHTML = html;
  }

  // Navigate pages
  function navigate(page) {
    currentPage = page;
    document.querySelectorAll('.admin-page').forEach(function(p) {
      p.classList.add('hidden');
    });
    var target = document.getElementById('page-' + page);
    if (target) target.classList.remove('hidden');

    document.querySelectorAll('.nav-btn').forEach(function(btn) {
      if (btn.dataset.page === page) {
        btn.classList.add('bg-teal-100', 'dark:bg-teal-900/50', 'text-teal-700', 'dark:text-teal-300');
      } else {
        btn.classList.remove('bg-teal-100', 'dark:bg-teal-900/50', 'text-teal-700', 'dark:text-teal-300');
      }
    });

    if (page === 'bookings') renderBookingsTable();
    if (page === 'finance') renderFinance();
    if (page === 'reports') initReports();
    if (page === 'courts') renderCourts();
    if (page === 'users') renderUsers();
    if (page === 'manual') initManualBooking();

    closeSidebar();
  }

  // Render bookings table
  function renderBookingsTable() {
    var tbody = document.getElementById('bookingsBody');
    if (!tbody) return;

    if (bookings.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" class="px-4 py-12 text-center text-slate-500">Belum ada booking</td></tr>';
      return;
    }

    var html = '';
    bookings.forEach(function(b) {
      var statusClass = b.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : b.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700';
      var userProfile = users.find(function(u) { return u.id === b.user_id; });
      var userName = userProfile ? (userProfile.name || userProfile.email) : b.user_id;

      html += '<tr class="border-b border-slate-100 dark:border-slate-800">';
      html += '<td class="px-4 py-3 text-sm">' + escapeHtml(userName) + '</td>';
      html += '<td class="px-4 py-3 text-sm">' + escapeHtml(b.court_name) + '</td>';
      html += '<td class="px-4 py-3 text-sm">' + b.date + '</td>';
      html += '<td class="px-4 py-3 text-sm">' + b.start_time + '-' + b.end_time + '</td>';
      html += '<td class="px-4 py-3"><span class="px-2 py-1 rounded-full text-xs font-bold ' + statusClass + '">' + b.status + '</span></td>';
      html += '<td class="px-4 py-3 text-sm font-bold">' + formatRupiah(b.amount) + '</td>';
      html += '<td class="px-4 py-3 text-center">';

      if (b.status === 'pending') {
        html += '<button onclick="adminApprove(\'' + b.id + '\')" class="px-3 py-1 rounded-lg bg-emerald-500 text-white text-xs font-bold mr-1 hover:bg-emerald-600">Approve</button>';
        html += '<button onclick="adminReject(\'' + b.id + '\')" class="px-3 py-1 rounded-lg bg-red-500 text-white text-xs font-bold hover:bg-red-600">Reject</button>';
      } else {
        html += '<span class="text-slate-400 text-xs">-</span>';
      }

      html += '</td></tr>';
    });
    tbody.innerHTML = html;
  }

  // Approve booking
  async function approveBooking(id) {
    try {
      await supabase.from('bookings').update({ status: 'approved' }).eq('id', id);
      toast('Booking disetujui!');
      await loadData();
      renderAll();
      renderBookingsTable();
    } catch (err) {
      toast('Gagal: ' + (err.message || 'Error'), 'error');
    }
  }

  // Reject booking
  async function rejectBooking(id) {
    try {
      await supabase.from('bookings').update({ status: 'cancelled' }).eq('id', id);
      toast('Booking dibatalkan');
      await loadData();
      renderAll();
      renderBookingsTable();
    } catch (err) {
      toast('Gagal: ' + (err.message || 'Error'), 'error');
    }
  }

  // Render finance
  function renderFinance() {
    var approved = bookings.filter(function(b) { return b.status === 'approved'; });
    var pending = bookings.filter(function(b) { return b.status === 'pending'; });
    var cancelled = bookings.filter(function(b) { return b.status === 'cancelled'; });

    setText('finTotalApproved', formatRupiah(approved.reduce(function(s, b) { return s + (b.amount || 0); }, 0)));
    setText('finTotalPending', formatRupiah(pending.reduce(function(s, b) { return s + (b.amount || 0); }, 0)));
    setText('finTotalCancelled', formatRupiah(cancelled.reduce(function(s, b) { return s + (b.amount || 0); }, 0)));
    setText('finTotalCount', bookings.length + ' booking');

    var tbody = document.getElementById('financeBody');
    if (!tbody) return;

    var byCourt = {};
    bookings.forEach(function(b) {
      if (!byCourt[b.court_name]) byCourt[b.court_name] = { total: 0, approved: 0, pending: 0, cancelled: 0 };
      byCourt[b.court_name].total++;
      if (b.status === 'approved') byCourt[b.court_name].approved++;
      else if (b.status === 'pending') byCourt[b.court_name].pending++;
      else byCourt[b.court_name].cancelled++;
    });

    var html = '';
    Object.keys(byCourt).forEach(function(court) {
      var data = byCourt[court];
      html += '<tr class="border-b border-slate-100 dark:border-slate-800">';
      html += '<td class="px-4 py-3 text-sm font-semibold">' + escapeHtml(court) + '</td>';
      html += '<td class="px-4 py-3 text-sm text-center">' + data.total + '</td>';
      html += '<td class="px-4 py-3 text-sm text-center text-emerald-600 font-bold">' + data.approved + '</td>';
      html += '<td class="px-4 py-3 text-sm text-center text-amber-600 font-bold">' + data.pending + '</td>';
      html += '<td class="px-4 py-3 text-sm text-center text-red-600 font-bold">' + data.cancelled + '</td>';
      html += '</tr>';
    });

    if (html === '') html = '<tr><td colspan="5" class="px-4 py-12 text-center text-slate-500">Tidak ada data</td></tr>';
    tbody.innerHTML = html;
  }

  // Render courts
  function renderCourts() {
    var list = document.getElementById('courtsList');
    if (!list) return;

    if (courts.length === 0) {
      list.innerHTML = '<p class="text-center py-12 text-slate-500">Belum ada lapangan</p>';
      return;
    }

    var html = '';
    courts.forEach(function(c) {
      html += '<div class="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">';
      html += '<div class="flex justify-between items-start">';
      html += '<div><h4 class="font-bold text-lg">' + escapeHtml(c.name) + '</h4><p class="text-sm text-slate-500">' + escapeHtml(c.type) + '</p></div>';
      html += '<span class="px-2 py-1 rounded-full text-xs font-bold ' + (c.available ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700') + '">' + (c.available ? 'Aktif' : 'Nonaktif') + '</span>';
      html += '</div>';
      html += '<div class="mt-3 flex justify-between items-center">';
      html += '<span class="font-bold text-teal-600">' + formatRupiah(c.price_per_hour) + '/jam</span>';
      html += '<span class="text-sm text-slate-500">' + escapeHtml(c.surface || '-') + '</span>';
      html += '</div>';
      html += '</div>';
    });
    list.innerHTML = html;
  }

  // Render users
  function renderUsers() {
    var tbody = document.getElementById('usersBody');
    if (!tbody) return;

    if (users.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" class="px-4 py-12 text-center text-slate-500">Belum ada user</td></tr>';
      return;
    }

    var html = '';
    users.forEach(function(u) {
      var roleClass = u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-700';
      html += '<tr class="border-b border-slate-100 dark:border-slate-800">';
      html += '<td class="px-4 py-3 text-sm">' + escapeHtml(u.name || '-') + '</td>';
      html += '<td class="px-4 py-3 text-sm">' + escapeHtml(u.email || '-') + '</td>';
      html += '<td class="px-4 py-3 text-sm">' + escapeHtml(u.phone || '-') + '</td>';
      html += '<td class="px-4 py-3"><span class="px-2 py-1 rounded-full text-xs font-bold ' + roleClass + '">' + (u.role || 'user') + '</span></td>';
      html += '<td class="px-4 py-3 text-sm">' + (u.created_at ? u.created_at.split('T')[0] : '-') + '</td>';
      html += '</tr>';
    });
    tbody.innerHTML = html;
  }

  // Init manual booking
  function initManualBooking() {
    var dateInput = document.getElementById('mbDate');
    if (dateInput) {
      var today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
      dateInput.value = today;
    }
    populateCourtSelect('mbCourt');
  }

  // Submit manual booking
  async function submitManualBooking(e) {
    e.preventDefault();

    var name = document.getElementById('mbName').value.trim();
    var email = document.getElementById('mbEmail').value.trim();
    var phone = document.getElementById('mbPhone').value.trim();
    var date = document.getElementById('mbDate').value;
    var courtId = document.getElementById('mbCourt').value;
    var duration = parseInt(document.getElementById('mbDuration').value) || 1;
    var time = document.getElementById('mbTime').value;

    if (!name || !email || !phone || !date || !courtId || !time) {
      toast('Lengkapi semua data!', 'error');
      return;
    }

    try {
      var court = courts.find(function(c) { return c.id === courtId; });
      var endHour = parseInt(time.split(':')[0]) + duration;
      var amount = (court ? court.price_per_hour : 150000) * duration;
      var bookingId = 'BK' + Date.now();

      // Find or create user
      var userRes = await supabase.from('profiles').select('id').eq('email', email).single();
      var userId;

      if (userRes.data) {
        userId = userRes.data.id;
      } else {
        toast('User dengan email ini tidak ditemukan. Harap daftar dulu.', 'error');
        return;
      }

      await supabase.from('bookings').insert({
        id: bookingId,
        user_id: userId,
        court_id: courtId,
        court_name: court ? court.name : courtId,
        date: date,
        start_time: time,
        end_time: String(endHour).padStart(2, '0') + ':00',
        duration_hours: duration,
        amount: amount,
        status: 'approved',
        notes: 'Booking manual oleh admin untuk: ' + name
      });

      toast('Booking berhasil dibuat!');
      await loadData();
      renderAll();
      navigate('bookings');
    } catch (err) {
      toast('Gagal: ' + (err.message || 'Error'), 'error');
    }
  }

  // Init reports
  function initReports() {
    var today = new Date();
    var firstDay = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
    var lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0];

    var fromInput = document.getElementById('repFrom');
    var toInput = document.getElementById('repTo');
    if (fromInput) fromInput.value = firstDay;
    if (toInput) toInput.value = lastDay;

    populateCourtSelect('repCourt');
    generateReport();
  }

  // Generate report
  function generateReport() {
    var from = document.getElementById('repFrom').value;
    var to = document.getElementById('repTo').value;
    var courtFilter = document.getElementById('repCourt').value;
    var statusFilter = document.getElementById('repStatus').value;

    var filtered = bookings.filter(function(b) {
      if (from && b.date < from) return false;
      if (to && b.date > to) return false;
      if (courtFilter && b.court_id !== courtFilter) return false;
      if (statusFilter && b.status !== statusFilter) return false;
      return true;
    });

    var approved = filtered.filter(function(b) { return b.status === 'approved'; });
    var revenue = approved.reduce(function(s, b) { return s + (b.amount || 0); }, 0);
    var userSet = new Set(filtered.map(function(b) { return b.user_id; }));

    setText('repTotal', filtered.length);
    setText('repRevenue', formatRupiah(revenue));
    setText('repPending', filtered.filter(function(b) { return b.status === 'pending'; }).length);
    setText('repUsers', userSet.size);

    var tbody = document.getElementById('reportBody');
    if (!tbody) return;

    if (filtered.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" class="px-4 py-12 text-center text-slate-500">Tidak ada data</td></tr>';
      return;
    }

    var html = '';
    filtered.forEach(function(b, i) {
      var statusClass = b.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : b.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700';
      html += '<tr class="border-b border-slate-100 dark:border-slate-800">';
      html += '<td class="px-4 py-3 text-sm">' + (i + 1) + '</td>';
      html += '<td class="px-4 py-3 text-sm">' + escapeHtml(b.court_name) + '</td>';
      html += '<td class="px-4 py-3 text-sm">' + b.date + '</td>';
      html += '<td class="px-4 py-3 text-sm">' + b.start_time + '-' + b.end_time + '</td>';
      html += '<td class="px-4 py-3 text-sm">' + b.duration_hours + ' jam</td>';
      html += '<td class="px-4 py-3"><span class="px-2 py-1 rounded-full text-xs font-bold ' + statusClass + '">' + b.status + '</span></td>';
      html += '<td class="px-4 py-3 text-sm font-bold">' + formatRupiah(b.amount) + '</td>';
      html += '</tr>';
    });
    tbody.innerHTML = html;
  }

  // Export CSV
  function exportCSV() {
    var from = document.getElementById('repFrom').value;
    var to = document.getElementById('repTo').value;
    var courtFilter = document.getElementById('repCourt').value;
    var statusFilter = document.getElementById('repStatus').value;

    var filtered = bookings.filter(function(b) {
      if (from && b.date < from) return false;
      if (to && b.date > to) return false;
      if (courtFilter && b.court_id !== courtFilter) return false;
      if (statusFilter && b.status !== statusFilter) return false;
      return true;
    });

    var csv = 'No,Lapangan,Tanggal,Waktu,Durasi,Status,Jumlah\n';
    filtered.forEach(function(b, i) {
      csv += (i + 1) + ',' + b.court_name + ',' + b.date + ',' + b.start_time + '-' + b.end_time + ',' + b.duration_hours + ' jam,' + b.status + ',' + b.amount + '\n';
    });

    var blob = new Blob([csv], { type: 'text/csv' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'laporan-padelgo-' + new Date().toISOString().split('T')[0] + '.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  // Populate court select
  function populateCourtSelect(selectId) {
    var sel = document.getElementById(selectId);
    if (!sel) return;

    var html = '<option value="">Semua Lapangan</option>';
    courts.forEach(function(c) {
      html += '<option value="' + c.id + '">' + escapeHtml(c.name) + ' - ' + formatRupiah(c.price_per_hour) + '/jam</option>';
    });
    sel.innerHTML = html;
  }

  // Populate court select for booking
  function populateCourtSelectForBooking(selectId) {
    var sel = document.getElementById(selectId);
    if (!sel) return;

    var html = '<option value="">Pilih Lapangan</option>';
    courts.forEach(function(c) {
      if (c.available) {
        html += '<option value="' + c.id + '">' + escapeHtml(c.name) + ' - ' + formatRupiah(c.price_per_hour) + '/jam</option>';
      }
    });
    sel.innerHTML = html;
  }

  // Show day bookings
  function showDay(dateStr) {
    var dayBookings = bookings.filter(function(b) { return b.date === dateStr; });
    var dayTitle = document.getElementById('dayTitle');
    var dayContent = document.getElementById('dayContent');
    var dayModal = document.getElementById('dayModal');

    if (dayTitle) dayTitle.textContent = 'Booking ' + dateStr;
    if (!dayContent) return;

    if (dayBookings.length === 0) {
      dayContent.innerHTML = '<p class="text-center py-12 text-slate-500">Tidak ada booking</p>';
    } else {
      var html = '';
      dayBookings.forEach(function(b) {
        var statusClass = b.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : b.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700';
        html += '<div class="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 mb-3">';
        html += '<div class="flex justify-between"><span class="font-bold">' + escapeHtml(b.court_name) + '</span><span class="px-2 py-1 rounded-full text-xs font-bold ' + statusClass + '">' + b.status + '</span></div>';
        html += '<p class="text-sm text-slate-500 mt-1">' + b.start_time + ' - ' + b.end_time + ' • ' + formatRupiah(b.amount) + '</p>';
        html += '</div>';
      });
      dayContent.innerHTML = html;
    }

    if (dayModal) dayModal.classList.remove('hidden');
  }

  // Close day modal
  function closeDayModal() {
    var modal = document.getElementById('dayModal');
    if (modal) modal.classList.add('hidden');
  }

  // Sidebar toggle
  function toggleSidebar() {
    var sidebar = document.getElementById('adminSidebar');
    var overlay = document.getElementById('sidebarOverlay');
    if (sidebar) sidebar.classList.toggle('-translate-x-full');
    if (overlay) {
      overlay.classList.toggle('opacity-0');
      overlay.classList.toggle('invisible');
    }
  }

  function closeSidebar() {
    if (window.innerWidth < 1024) toggleSidebar();
  }

  // Refresh
  async function refresh() {
    try {
      showLoading(true);
      await loadData();
      showLoading(false);
      renderAll();
      toast('Data di-refresh!');
    } catch (err) {
      toast('Gagal refresh: ' + err.message, 'error');
    }
  }

  // Helpers
  function setText(id, text) {
    var el = document.getElementById(id);
    if (el) el.textContent = text || '';
  }

  function formatRupiah(val) {
    return 'Rp ' + Number(val || 0).toLocaleString('id-ID');
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>"']/g, function(c) {
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }

  function showLoading(show) {
    var loading = document.getElementById('adminLoading');
    var content = document.getElementById('adminContent');
    var error = document.getElementById('adminError');

    if (loading) loading.style.display = show ? 'flex' : 'none';
    if (content) content.style.display = show ? 'none' : 'block';
    if (error) error.style.display = 'none';
  }

  function showContent(show) {
    var content = document.getElementById('adminContent');
    if (content) content.style.display = show ? 'block' : 'none';
  }

  function showError(msg) {
    var loading = document.getElementById('adminLoading');
    var content = document.getElementById('adminContent');
    var error = document.getElementById('adminError');
    var errorText = document.getElementById('adminErrorText');

    if (loading) loading.style.display = 'none';
    if (content) content.style.display = 'none';
    if (error) {
      error.style.display = 'flex';
      if (errorText) errorText.textContent = msg;
    }
  }

  function toast(msg, type) {
    type = type || 'success';
    var toastEl = document.getElementById('toastContainer');
    if (!toastEl) return;

    var bg = type === 'error' ? 'bg-red-500' : 'bg-emerald-500';
    toastEl.innerHTML = '<div class="' + bg + ' text-white px-6 py-3 rounded-xl shadow-lg font-bold">' + escapeHtml(msg) + '</div>';
    toastEl.classList.remove('hidden');

    setTimeout(function() {
      toastEl.classList.add('hidden');
    }, 3000);
  }

  // Logout
  function logout() {
    if (supabase) supabase.auth.signOut();
    window.location.href = '/login/';
  }

  // Global functions
  window.adminInit = init;
  window.adminNavigate = navigate;
  window.adminShowDay = showDay;
  window.adminCloseDayModal = closeDayModal;
  window.adminApprove = approveBooking;
  window.adminReject = rejectBooking;
  window.adminRefresh = refresh;
  window.adminLogout = logout;
  window.adminToggleSidebar = toggleSidebar;
  window.adminSubmitManualBooking = submitManualBooking;
  window.adminGenerateReport = generateReport;
  window.adminExportCSV = exportCSV;
  window.adminPopulateCourtSelect = populateCourtSelectForBooking;

  // Auto init when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 100);
  }

})();
