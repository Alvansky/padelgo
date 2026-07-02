// PadelGo Configuration and Utilities
(function() {
  // Ensure PadelGo exists globally
  if (typeof window.PadelGo === 'undefined') {
    window.PadelGo = {};
  }
  var PadelGo = window.PadelGo;

  // Supabase Configuration
  PadelGo.Config = {
    SUPABASE_URL: 'https://fgjmqqdwyvawtvfkzgrr.supabase.co',
    SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnam1xcWR3eXZhd3R2Zmt6Z3JyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI4MTkzNTksImV4cCI6MjA5ODM5NTM1OX0.rEGjOsJ3oIY2SryTdPFSOt3lxjsycxbHtifzeUnwYlE',
    API_BASE: '/api'
  };

  // Supabase Client
  PadelGo.Supabase = {
    client: null,
    async init() {
      if (this.client) return this.client;

      var url = PadelGo.Config.SUPABASE_URL;
      var key = PadelGo.Config.SUPABASE_ANON_KEY;

      if (!url || !key) {
        console.error('PadelGo: Supabase URL or Key not configured');
        return null;
      }

      // Check if supabase library is loaded
      if (typeof window.supabase === 'undefined') {
        console.log('PadelGo: Loading Supabase library...');
        try {
          await new Promise(function(resolve, reject) {
            var script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
            script.onload = resolve;
            script.onerror = function() { reject(new Error('Failed to load Supabase library')); };
            document.head.appendChild(script);
          });
        } catch (e) {
          console.error('PadelGo: Failed to load Supabase library:', e);
          return null;
        }
      }

      try {
        this.client = window.supabase.createClient(url, key);
        console.log('PadelGo: Supabase initialized successfully');
        return this.client;
      } catch (err) {
        console.error('PadelGo: Failed to create Supabase client:', err);
        return null;
      }
    },
    async getSession() {
      try {
        var client = await this.init();
        if (!client) return null;
        var result = await client.auth.getSession();
        return result.data?.session || null;
      } catch (err) {
        console.error('PadelGo: getSession error:', err);
        return null;
      }
    }
  };

  // Cookies Utility
  PadelGo.Cookies = {
    get: function(name) {
      try {
        var value = document.cookie.split('; ').find(function(row) { return row.startsWith(name + '='); });
        return value ? decodeURIComponent(value.split('=')[1]) : null;
      } catch (e) {
        return null;
      }
    },
    set: function(name, value, maxAgeSeconds, options) {
      options = options || {};
      var parts = [
        name + '=' + encodeURIComponent(value),
        'Max-Age=' + maxAgeSeconds,
        'Path=/'
      ];
      if (options.secure) parts.push('Secure');
      parts.push('SameSite=Lax');
      document.cookie = parts.join('; ');
    },
    remove: function(name) {
      document.cookie = name + '=; Max-Age=0; Path=/; SameSite=Lax';
    }
  };

  // Auth Utility
  PadelGo.Auth = {
    getUser: function() {
      try { return JSON.parse(PadelGo.Cookies.get('padelgo_user') || '{}') || {}; } catch (e) { return {}; }
    },
    setUser: function(user) {
      PadelGo.Cookies.set('padelgo_user', JSON.stringify(user), 2 * 60 * 60);
    },
    setSession: function(session) {
      if (session?.access_token) {
        PadelGo.Cookies.set('sess', 'active', 2 * 60 * 60, { secure: location.protocol === 'https:' });
      }
    },
    clear: function() {
      PadelGo.Cookies.remove('sess');
      PadelGo.Cookies.remove('padelgo_user');
      PadelGo.Storage.clearAvatar();
    },
    isLoggedIn: function() {
      return !!PadelGo.Cookies.get('sess');
    }
  };

  // Storage Utility
  PadelGo.Storage = {
    setAvatar: function(url) { try { localStorage.setItem('padelgo_avatar', url); } catch (e) {} },
    getAvatar: function() { try { return localStorage.getItem('padelgo_avatar') || ''; } catch (e) { return ''; } },
    clearAvatar: function() { try { localStorage.removeItem('padelgo_avatar'); } catch (e) {} }
  };

  // Format Utility
  PadelGo.Format = {
    rupiah: function(value) {
      return 'Rp ' + Number(value || 0).toLocaleString('id-ID');
    },
    date: function(value) {
      if (!value) return '-';
      return new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value + 'T00:00:00'));
    }
  };

  // UI Utility
  PadelGo.UI = {
    defaultAvatar: function() {
      var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><rect width="96" height="96" rx="48" fill="#0f766e"/><circle cx="48" cy="38" r="17" fill="#ccfbf1"/><path d="M18 84c5.8-17.8 17-26.7 30-26.7S72.2 66.2 78 84" fill="#ccfbf1"/></svg>';
      return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
    },
    avatar: function(name) {
      var initials = String(name || 'U').trim().split(/\s+/).map(function(part) { return part[0]; }).join('').toUpperCase().slice(0, 2) || 'U';
      var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><rect width="96" height="96" rx="24" fill="#0f766e"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="800" fill="white">' + initials + '</text></svg>';
      return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
    },
    applyTheme: function() {
      var preferred = localStorage.getItem('theme') || localStorage.getItem('darkMode');
      var isDark = preferred === 'dark' || preferred === 'true' || (!preferred && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
      document.documentElement.classList.toggle('dark', isDark);
      document.querySelectorAll('[data-theme-icon="sun"]').forEach(function(el) { el.classList.toggle('hidden', !isDark); });
      document.querySelectorAll('[data-theme-icon="moon"]').forEach(function(el) { el.classList.toggle('hidden', isDark); });
    },
    toggleTheme: function() {
      var isDark = !document.documentElement.classList.contains('dark');
      document.documentElement.classList.toggle('dark', isDark);
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      localStorage.setItem('darkMode', String(isDark));
      this.applyTheme();
    },
    hydrateAuthNav: async function() {
      try {
        var client = await PadelGo.Supabase.init();
        var user = PadelGo.Auth.getUser() || {};

        if (client) {
          var sessionResult = await client.auth.getSession();
          if (sessionResult.data?.session) {
            PadelGo.Auth.setSession(sessionResult.data.session);
            var profileResult = await client.from('profiles').select('name, role, avatar_url, email').eq('id', sessionResult.data.session.user.id).single();
            var profile = profileResult.data;
            var avatar = profile?.avatar_url || sessionResult.data.session.user.user_metadata?.avatar || '';
            if (avatar) PadelGo.Storage.setAvatar(avatar);
            else PadelGo.Storage.clearAvatar();

            user = {
              email: profile?.email || sessionResult.data.session.user.email,
              name: profile?.name || sessionResult.data.session.user.user_metadata?.name || sessionResult.data.session.user.email?.split('@')[0] || 'User',
              role: profile?.role || 'user',
              avatar: avatar
            };
            PadelGo.Auth.setUser(user);
          }
        }
        this.updateNav(user);
      } catch (err) {
        console.error('PadelGo: hydrateAuthNav error:', err);
        this.updateNav(PadelGo.Auth.getUser());
      }
    },
    updateNav: function(user) {
      user = user || PadelGo.Auth.getUser() || {};
      var hasSession = !!PadelGo.Cookies.get('sess');
      var role = user.role || 'user';
      var displayName = user.name || user.email || 'User';
      var displayEmail = user.email || '';

      // Desktop nav
      document.querySelectorAll('.nav-admin-link').forEach(function(el) { el.classList.toggle('hidden', !hasSession || role !== 'admin'); });
      document.querySelectorAll('.nav-dashboard-link').forEach(function(el) { el.classList.toggle('hidden', !hasSession); });
      document.querySelectorAll('.nav-login-link, .nav-register-link').forEach(function(el) { el.classList.toggle('hidden', hasSession); });
      document.querySelectorAll('.nav-user-menu').forEach(function(el) {
        el.classList.toggle('hidden', !hasSession);
        el.classList.toggle('flex', hasSession);
      });
      document.querySelectorAll('.nav-user-name').forEach(function(el) { el.textContent = displayName; });
      document.querySelectorAll('.nav-user-email').forEach(function(el) { el.textContent = displayEmail; });

      // Mobile nav
      document.querySelectorAll('.nav-dashboard-link-mobile').forEach(function(el) { el.classList.toggle('hidden', !hasSession); });
      document.querySelectorAll('.nav-admin-link-mobile').forEach(function(el) { el.classList.toggle('hidden', !hasSession || role !== 'admin'); });
      document.querySelectorAll('.nav-settings-link-mobile').forEach(function(el) { el.classList.toggle('hidden', !hasSession); });
      document.querySelectorAll('.nav-login-link-mobile, .nav-register-link-mobile').forEach(function(el) { el.classList.toggle('hidden', hasSession); });
      document.querySelectorAll('.nav-logout-btn-mobile').forEach(function(el) { el.classList.toggle('hidden', !hasSession); });

      // Avatar
      var storedAvatar = PadelGo.Storage.getAvatar();
      var avatarUrl = user.avatar || storedAvatar || '';
      document.querySelectorAll('.nav-user-avatar').forEach(function(el) {
        var wrapper = el.closest('.nav-user-avatar-wrapper');
        var fallback = wrapper ? wrapper.querySelector('.nav-user-avatar-fallback') : null;
        el.src = avatarUrl || PadelGo.UI.defaultAvatar();
        el.classList.remove('hidden');
        el.alt = displayName;
        if (fallback) fallback.classList.add('hidden');
      });
    },
    toast: function(message, type) {
      type = type || 'success';
      var holder = document.getElementById('toastHost');
      if (!holder) {
        holder = document.createElement('div');
        holder.id = 'toastHost';
        holder.className = 'fixed right-2 sm:right-4 top-20 z-[80] space-y-3 w-[calc(100%-16px)] sm:w-auto max-w-sm';
        document.body.appendChild(holder);
      }
      var node = document.createElement('div');
      var color = type === 'error' ? 'border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200' : 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200';
      node.className = 'max-w-sm rounded-xl border px-4 py-3 text-sm font-bold shadow-xl ' + color + ' w-full sm:w-auto';
      node.textContent = message;
      holder.appendChild(node);
      setTimeout(function() {
        node.style.transition = 'opacity 0.3s';
        node.style.opacity = '0';
        setTimeout(function() { node.remove(); }, 300);
      }, 3600);
    }
  };

  // Global Functions
  window.toggleDarkMode = function() {
    PadelGo.UI.toggleTheme();
  };

  window.getAvatarDataUrl = function(name) {
    return PadelGo.UI.avatar(name);
  };

  window.logout = async function() {
    try {
      var client = await PadelGo.Supabase.init();
      if (client) {
        var sessionResult = await client.auth.getSession();
        if (sessionResult.data?.session) await client.auth.signOut();
      }
    } catch (e) {
      console.log('Logout: signOut error (ignored):', e);
    }
    PadelGo.Auth.clear();
    window.location.href = '/login/';
  };

  // Password Strength Checker
  PadelGo.PasswordStrength = {
    MIN_LENGTH: 8,
    RULES: [
      { test: function(p) { return p.length >= 8; }, label: 'Minimal 8 karakter' },
      { test: function(p) { return /[a-z]/.test(p); }, label: 'Huruf kecil (a-z)' },
      { test: function(p) { return /[A-Z]/.test(p); }, label: 'Huruf besar (A-Z)' },
      { test: function(p) { return /\d/.test(p); }, label: 'Angka (0-9)' },
      { test: function(p) { return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(p); }, label: 'Simbol (!@#$%...)' }
    ],
    check: function(password) {
      var result = { valid: false, met: [], missing: [] };
      for (var i = 0; i < this.RULES.length; i++) {
        var rule = this.RULES[i];
        if (rule.test(password)) result.met.push(rule.label);
        else result.missing.push(rule.label);
      }
      result.valid = result.missing.length === 0;
      return result;
    },
    renderUI: function(password, targetId) {
      var target = document.getElementById(targetId);
      if (!target) return;
      var result = this.check(password || '');
      var score = result.met.length;
      var color = score <= 2 ? 'bg-red-500' : score <= 4 ? 'bg-amber-500' : 'bg-emerald-500';
      var html = '<div class="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"><div class="h-full ' + color + ' transition-all" style="width:' + (score / this.RULES.length * 100) + '%"></div></div><div class="mt-2 grid gap-1 text-xs text-slate-500 dark:text-slate-400 sm:grid-cols-2">';
      for (var j = 0; j < this.RULES.length; j++) {
        var r = this.RULES[j];
        var ok = r.test(password || '');
        html += '<span class="' + (ok ? 'text-emerald-600 dark:text-emerald-300' : '') + '">' + (ok ? '&#10003;' : '&#10007;') + ' ' + r.label + '</span>';
      }
      html += '</div>';
      target.innerHTML = html;
    }
  };

  // Initialize on DOM Ready
  document.addEventListener('DOMContentLoaded', function() {
    PadelGo.UI.applyTheme();
    PadelGo.UI.hydrateAuthNav().catch(function(err) {
      console.log('hydrateAuthNav initial error (normal if not logged in):', err);
      PadelGo.UI.updateNav();
    });
  });

})();
