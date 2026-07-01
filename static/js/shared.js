window.PadelGo = window.PadelGo || {};

PadelGo.Config = {
  SUPABASE_URL: window.PadelGo.Config?.SUPABASE_URL || 'https://YOUR_PROJECT.supabase.co',
  SUPABASE_ANON_KEY: window.PadelGo.Config?.SUPABASE_ANON_KEY || 'YOUR_ANON_KEY',
  API_BASE: window.PadelGo.Config?.API_BASE || '/api',
};

// Supabase will be loaded dynamically
PadelGo.Supabase = {
  client: null,
  async init() {
    if (this.client) return this.client;
    if (!window.supabase) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }
    const url = window.PadelGo.Config.SUPABASE_URL;
    const key = window.PadelGo.Config.SUPABASE_ANON_KEY;
    if (!url || !key || url.includes('YOUR_PROJECT')) {
      console.warn('Supabase credentials not configured.Set SUPABASE_URL and SUPABASE_ANON_KEY.');
      return null;
    }
    this.client = window.supabase.createClient(url, key);
    return this.client;
  },
  async getSession() {
    const client = await this.init();
    if (!client) return null;
    const { data } = await client.auth.getSession();
    return data?.session || null;
  }
};

PadelGo.Cookies = {
  get(name) {
    try {
      const value = document.cookie.split('; ').find(row => row.startsWith(name + '='));
      return value ? decodeURIComponent(value.split('=')[1]) : null;
    } catch {
      return null;
    }
  },
  set(name, value, maxAgeSeconds, options = {}) {
    const parts = [
      `${name}=${encodeURIComponent(value)}`,
      `Max-Age=${maxAgeSeconds}`,
      'Path=/',
      ...(options.secure ? ['Secure'] : []),
      'SameSite=Lax',
    ];
    document.cookie = parts.join('; ');
  },
  remove(name) {
    document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
  },
};

PadelGo.API = {
  async request(path, options = {}) {
    const response = await fetch(`${PadelGo.Config.API_BASE}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'same-origin',
      cache: 'no-store',
    });
    if (response.status === 401) {
      PadelGo.Auth.clear();
      window.location.href = '/login/?next=' + encodeURIComponent(window.location.pathname);
      throw new Error('Sesi berakhir. Silakan login kembali.');
    }
    return response;
  },
  async get(path) { return this.request(path, { method: 'GET' }); },
  async post(path, body) { return this.request(path, { method: 'POST', body: JSON.stringify(body) }); },
};

PadelGo.Auth = {
  getUser() {
    try { return JSON.parse(PadelGo.Cookies.get('padelgo_user') || '{}') || {}; } catch { return {}; }
  },
  setUser(user) {
    PadelGo.Cookies.set('padelgo_user', JSON.stringify(user), 2 * 60 * 60);
  },
  setSession(session) {
    if (session?.access_token) {
      PadelGo.Cookies.set('sess', 'active', 2 * 60 * 60, { secure: location.protocol === 'https:' });
    }
  },
  clear() {
    PadelGo.Cookies.remove('sess');
    PadelGo.Cookies.remove('padelgo_user');
  },
  isLoggedIn() {
    return !!PadelGo.Cookies.get('sess');
  },
};

PadelGo.Storage = {
  setAvatar(url) { try { localStorage.setItem('padelgo_avatar', url); } catch { /* quota exceeded */ } },
  getAvatar() { try { return localStorage.getItem('padelgo_avatar') || ''; } catch { return ''; } },
  clearAvatar() { try { localStorage.removeItem('padelgo_avatar'); } catch {} },
};

PadelGo.Format = {
  rupiah(value) {
    return 'Rp ' + Number(value || 0).toLocaleString('id-ID');
  },
  date(value) {
    if (!value) return '-';
    return new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value + 'T00:00:00'));
  },
};

PadelGo.UI = {
  avatar(name) {
    const initials = String(name || 'U').trim().split(/\s+/).map(part => part[0]).join('').toUpperCase().slice(0, 2) || 'U';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><rect width="96" height="96" rx="24" fill="#0f766e"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="800" fill="white">${initials}</text></svg>`;
    return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
  },
  applyTheme() {
    const preferred = localStorage.getItem('theme') || localStorage.getItem('darkMode');
    const isDark = preferred === 'dark' || preferred === 'true' || (!preferred && window.matchMedia?.('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', isDark);
    document.querySelectorAll('[data-theme-icon="sun"]').forEach(el => el.classList.toggle('hidden', !isDark));
    document.querySelectorAll('[data-theme-icon="moon"]').forEach(el => el.classList.toggle('hidden', isDark));
  },
  toggleTheme() {
    const isDark = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    localStorage.setItem('darkMode', String(isDark));
    this.applyTheme();
  },
  async hydrateAuthNav() {
    const client = await PadelGo.Supabase.init();
    let user = PadelGo.Auth.getUser() || {};
    if (client) {
      const { data: { session } } = await client.auth.getSession();
      if (session) {
        PadelGo.Auth.setSession(session);
        const { data: profile } = await client.from('profiles').select('name, role, avatar_url, email').eq('id', session.user.id).single();
        const avatar = profile?.avatar_url || session.user.user_metadata?.avatar || '';
        if (avatar) PadelGo.Storage.setAvatar(avatar);
        user = {
          email: profile?.email || session.user.email,
          name: profile?.name || session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
          role: profile?.role || 'user',
          avatar,
        };
        PadelGo.Auth.setUser(user);
      }
    }
    this.updateNav(user);
  },
  updateNav(user = PadelGo.Auth.getUser() || {}) {
    const hasSession = !!PadelGo.Cookies.get('sess');
    const role = user.role || 'user';
    const displayName = user.name || user.email || 'User';
    const initials = String(displayName).trim().split(/\s+/).map(p => p[0]).join('').toUpperCase().slice(0, 2) || 'U';

    document.querySelectorAll('.nav-admin-link').forEach(el => el.classList.toggle('hidden', !hasSession || role !== 'admin'));
    document.querySelectorAll('.nav-dashboard-link').forEach(el => el.classList.toggle('hidden', !hasSession));
    document.querySelectorAll('.nav-login-link, .nav-register-link').forEach(el => el.classList.toggle('hidden', hasSession));
    document.querySelectorAll('.nav-user-menu').forEach(el => {
      el.classList.toggle('hidden', !hasSession);
      el.classList.toggle('flex', hasSession);
    });
    document.querySelectorAll('.nav-user-name').forEach(el => { el.textContent = displayName; });
    document.querySelectorAll('.nav-user-link').forEach(el => { el.href = role === 'admin' ? '/admin/' : '/dashboard/'; });

    // Avatar with fallback: show img if URL exists, otherwise show initials
    const storedAvatar = PadelGo.Storage.getAvatar();
    const avatarUrl = storedAvatar || user.avatar || '';
    document.querySelectorAll('.nav-user-avatar').forEach(el => {
      const wrapper = el.closest('.nav-user-avatar-wrapper');
      const fallback = wrapper ? wrapper.querySelector('.nav-user-avatar-fallback') : null;
      if (avatarUrl) {
        el.src = avatarUrl;
        el.classList.remove('hidden');
        el.alt = displayName;
        if (fallback) fallback.classList.add('hidden');
      } else {
        el.classList.add('hidden');
        if (fallback) {
          fallback.textContent = initials;
          fallback.classList.remove('hidden');
        }
      }
    });

    // Mobile nav sync
    document.querySelectorAll('.nav-dashboard-link-mobile').forEach(el => el.classList.toggle('hidden', !hasSession));
    document.querySelectorAll('.nav-admin-link-mobile').forEach(el => el.classList.toggle('hidden', !hasSession || role !== 'admin'));
    document.querySelectorAll('.nav-settings-link-mobile').forEach(el => el.classList.toggle('hidden', !hasSession));
    document.querySelectorAll('.nav-login-link-mobile, .nav-register-link-mobile').forEach(el => el.classList.toggle('hidden', hasSession));
    document.querySelectorAll('.nav-logout-btn-mobile').forEach(el => el.classList.toggle('hidden', !hasSession));
  },
  toast(message, type = 'success') {
    let holder = document.getElementById('toastHost');
    if (!holder) {
      holder = document.createElement('div');
      holder.id = 'toastHost';
      holder.className = 'fixed right-2 sm:right-4 top-20 z-[80] space-y-3 w-[calc(100%-16px)] sm:w-auto max-w-sm';
      document.body.appendChild(holder);
    }
    const node = document.createElement('div');
    const color = type === 'error' ? 'border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200' : 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200';
    node.className = `max-w-sm rounded-xl border px-4 py-3 text-sm font-bold shadow-xl ${color} w-full sm:w-auto`;
    node.textContent = message;
    holder.appendChild(node);
    window.setTimeout(() => {
      node.style.transition = 'opacity 0.3s';
      node.style.opacity = '0';
      setTimeout(() => node.remove(), 300);
    }, 3600);
  },
};

window.toggleDarkMode = function toggleDarkMode() {
  PadelGo.UI.toggleTheme();
};

window.getAvatarDataUrl = function getAvatarDataUrl(name) {
  return PadelGo.UI.avatar(name);
};

window.logout = async function logout() {
  try {
    const client = await PadelGo.Supabase.init();
    if (client) {
      const { data: { session } } = await client.auth.getSession();
      if (session) {
        await client.auth.signOut();
      }
    }
  } catch (e) {
    // Continue clearing even if signOut fails
  }
  PadelGo.Auth.clear();
  window.location.href = '/login/';
};

PadelGo.PasswordStrength = {
  MIN_LENGTH: 8,
  RULES: [
    { test: (p) => p.length >= 8, label: 'Minimal 8 karakter' },
    { test: (p) => /[a-z]/.test(p), label: 'Huruf kecil (a-z)' },
    { test: (p) => /[A-Z]/.test(p), label: 'Huruf besar (A-Z)' },
    { test: (p) => /\d/.test(p), label: 'Angka (0-9)' },
    { test: (p) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`]/.test(p), label: 'Simbol (!@#$%...)' },
  ],
  check(password) {
    const result = { valid: false, met: [], missing: [] };
    for (const rule of this.RULES) {
      if (rule.test(password)) { result.met.push(rule.label); } else { result.missing.push(rule.label); }
    }
    result.valid = result.missing.length === 0;
    return result;
  },
  renderUI(password, targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;
    const result = this.check(password || '');
    const score = result.met.length;
    const color = score <= 2 ? 'bg-red-500' : score <= 4 ? 'bg-amber-500' : 'bg-emerald-500';
    target.innerHTML = `
      <div class="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div class="h-full ${color} transition-all" style="width:${(score / this.RULES.length) * 100}%"></div>
      </div>
      <div class="mt-2 grid gap-1 text-xs text-slate-500 dark:text-slate-400 sm:grid-cols-2">
        ${this.RULES.map(rule => {
          const ok = rule.test(password || '');
          return `<span class="${ok ? 'text-emerald-600 dark:text-emerald-300' : ''}">${ok ? 'OK' : '-'} ${rule.label}</span>`;
        }).join('')}
      </div>`;
  },
};

document.addEventListener('DOMContentLoaded', () => {
  PadelGo.UI.applyTheme();
  PadelGo.UI.hydrateAuthNav().catch(() => PadelGo.UI.updateNav());
});
