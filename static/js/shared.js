window.PadelGo = window.PadelGo || {};

PadelGo.Config = {
  SUPABASE_URL: 'https://YOUR_PROJECT.supabase.co',
  SUPABASE_ANON_KEY: 'YOUR_ANON_KEY',
  API_BASE: '/api',
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
  clear() {
    PadelGo.Cookies.remove('sess');
    PadelGo.Cookies.remove('padelgo_user');
  },
  isLoggedIn() {
    return !!PadelGo.Cookies.get('sess');
  },
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
};
