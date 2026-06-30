// Supabase client initialization for Hugo static site
// Replace these with your actual Supabase project credentials
window.PadelGo = window.PadelGo || {};

PadelGo.Supabase = {
  client: null,
  async init() {
    if (this.client) return this.client;
    // Load Supabase JS client from CDN
    if (!window.supabase) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }
    // These will be replaced with actual values
    this.client = window.supabase.createClient(
      window.PadelGo.Config.SUPABASE_URL || '',
      window.PadelGo.Config.SUPABASE_ANON_KEY || ''
    );
    return this.client;
  }
};
