import { useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  Trophy, Users, Calendar, Clock, Menu, X, Star,
  MapPin, Phone, Mail, DollarSign, Activity,
  ArrowRight, Shield, Zap, Award, Coffee,
  Settings, Bell, Search, Check, Eye, EyeOff,
  Instagram, Facebook, Youtube, LayoutDashboard,
  BookOpen, Layers, FileText, LogOut,
  CircleCheck,
} from "lucide-react";

type Page = "home" | "admin" | "order" | "login" | "register";

// ─── Data ───────────────────────────────────────────────────────────────────

const revenueData = [
  { day: "Lun", revenue: 1240, bookings: 18 },
  { day: "Mar", revenue: 980, bookings: 14 },
  { day: "Mié", revenue: 1580, bookings: 22 },
  { day: "Jue", revenue: 1320, bookings: 19 },
  { day: "Vie", revenue: 2100, bookings: 31 },
  { day: "Sáb", revenue: 2840, bookings: 42 },
  { day: "Dom", revenue: 2560, bookings: 38 },
];

const courts = [
  {
    id: 1, name: "Pista Norte", type: "Exterior", price: 18,
    img: "https://images.unsplash.com/photo-1658491830143-72808ca237e3?w=600&h=400&fit=crop&auto=format",
    available: true, surface: "Artificial Grass",
  },
  {
    id: 2, name: "Pista Sur", type: "Exterior", price: 18,
    img: "https://images.unsplash.com/photo-1767128890626-6b76ebe6b02d?w=600&h=400&fit=crop&auto=format",
    available: true, surface: "Artificial Grass",
  },
  {
    id: 3, name: "Pista Central", type: "Interior Premium", price: 24,
    img: "https://images.unsplash.com/photo-1775993167393-f2add1f8eec2?w=600&h=400&fit=crop&auto=format",
    available: true, surface: "Panoramic Glass",
  },
  {
    id: 4, name: "Pista Elite", type: "Interior Elite", price: 30,
    img: "https://images.unsplash.com/photo-1774600328263-c52a77bd7408?w=600&h=400&fit=crop&auto=format",
    available: false, surface: "Panoramic Glass",
  },
];

const timeSlots = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00",
  "18:00", "19:00", "20:00", "21:00", "22:00",
];

const bookingsData = [
  { id: "BK-1041", member: "Carlos Ruiz", court: "Pista Central", time: "10:00–11:00", date: "29 Jun", status: "confirmed", amount: "€24" },
  { id: "BK-1040", member: "María García", court: "Pista Norte", time: "09:00–10:00", date: "29 Jun", status: "confirmed", amount: "€18" },
  { id: "BK-1039", member: "Javier López", court: "Pista Elite", time: "18:00–19:00", date: "29 Jun", status: "pending", amount: "€30" },
  { id: "BK-1038", member: "Ana Martínez", court: "Pista Sur", time: "12:00–13:00", date: "29 Jun", status: "confirmed", amount: "€18" },
  { id: "BK-1037", member: "Pablo Sánchez", court: "Pista Norte", time: "20:00–21:00", date: "29 Jun", status: "cancelled", amount: "€18" },
  { id: "BK-1036", member: "Laura Torres", court: "Pista Central", time: "08:00–09:00", date: "29 Jun", status: "confirmed", amount: "€24" },
];

const testimonials = [
  { name: "Carlos R.", role: "Miembro Pro", text: "Las pistas de Hugo Padel son increíbles. La calidad de las instalaciones y el trato del equipo son inigualables en Madrid.", rating: 5, avatar: "CR" },
  { name: "María G.", role: "Miembro Club", text: "Llevo 3 años entrenando aquí y cada visita supera a la anterior. El sistema de reservas online hace todo mucho más fácil.", rating: 5, avatar: "MG" },
  { name: "Javier L.", role: "Casual", text: "Las clases con los entrenadores son excelentes. Mejoré mi juego enormemente en solo dos meses de práctica.", rating: 5, avatar: "JL" },
];

const features = [
  { icon: Shield, label: "4 Pistas Profesionales", desc: "Cristal panorámico y césped artificial de última generación" },
  { icon: Award, label: "Entrenadores Certificados", desc: "Clases individuales y grupales con pro-players titulados" },
  { icon: Zap, label: "Equipación de Elite", desc: "Alquiler de palas Babolat, Wilson y Head disponible" },
  { icon: Trophy, label: "Torneos Mensuales", desc: "Liga interna y torneos abiertos para todos los niveles" },
  { icon: Coffee, label: "Bar & Lounge", desc: "Zona de descanso con bebidas energéticas y snacks saludables" },
  { icon: Clock, label: "Horario Extendido", desc: "Abierto de 08:00 a 23:00 los 365 días del año" },
];

// ─── Nav ────────────────────────────────────────────────────────────────────

function Nav({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const [open, setOpen] = useState(false);

  const navLinks: { label: string; page: Page }[] = [
    { label: "Inicio", page: "home" },
    { label: "Reservar", page: "order" },
    { label: "Admin", page: "admin" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => setPage("home")}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
            <span className="text-primary-foreground font-black text-sm" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>HP</span>
          </div>
          <span className="text-foreground font-black tracking-widest text-sm hidden sm:block" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            HUGO PADEL
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <button
              key={l.page}
              onClick={() => setPage(l.page)}
              className={`px-4 py-2 text-sm font-semibold tracking-wider uppercase transition-colors rounded-sm ${
                page === l.page
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => setPage("login")}
            className="px-4 py-2 text-sm font-semibold tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Entrar
          </button>
          <button
            onClick={() => setPage("register")}
            className="px-5 py-2 bg-primary text-primary-foreground text-sm font-bold tracking-wider uppercase rounded-sm hover:bg-primary/90 transition-colors"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Registrarse
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground p-2"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-4 py-4 flex flex-col gap-2">
            {navLinks.map((l) => (
              <button
                key={l.page}
                onClick={() => { setPage(l.page); setOpen(false); }}
                className={`text-left px-3 py-2 text-lg font-bold tracking-wider uppercase rounded-sm ${
                  page === l.page ? "text-primary bg-primary/10" : "text-muted-foreground"
                }`}
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {l.label}
              </button>
            ))}
            <div className="flex gap-2 mt-2 pt-2 border-t border-border">
              <button onClick={() => { setPage("login"); setOpen(false); }} className="flex-1 py-2 text-sm font-bold tracking-wider uppercase border border-border rounded-sm text-muted-foreground" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Entrar</button>
              <button onClick={() => { setPage("register"); setOpen(false); }} className="flex-1 py-2 text-sm font-bold tracking-wider uppercase bg-primary text-primary-foreground rounded-sm" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Registrarse</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

// ─── Home Page ───────────────────────────────────────────────────────────────

function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#040710]">
        <img
          src="https://images.unsplash.com/photo-1774600328263-c52a77bd7408?w=1920&h=1080&fit=crop&auto=format"
          alt="Padel players on court"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/10 rounded-sm px-3 py-1 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-primary text-xs font-bold tracking-[0.15em] uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                Madrid · Pistas Disponibles Hoy
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tight leading-[0.95] mb-6" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              EL MEJOR
              <br />
              <span className="text-primary">PADEL</span>
              <br />
              DE MADRID
            </h1>

            <p className="text-muted-foreground text-lg md:text-xl mb-10 max-w-lg font-light leading-relaxed">
              4 pistas profesionales de cristal panorámico. Entrenadores certificados. Reserva online en 30 segundos.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setPage("order")}
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold tracking-widest uppercase text-sm rounded-sm hover:bg-primary/90 transition-all"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Reservar Pista
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => setPage("register")}
                className="flex items-center justify-center gap-2 px-8 py-4 border border-border text-foreground font-bold tracking-widest uppercase text-sm rounded-sm hover:border-primary/50 hover:text-primary transition-all"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Hacerse Socio
              </button>
            </div>
          </div>
        </div>

        {/* Floating stats */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-background/60 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
              {[
                { value: "4", label: "Pistas Pro" },
                { value: "500+", label: "Socios Activos" },
                { value: "8", label: "Años de Experiencia" },
                { value: "120+", label: "Torneos Jugados" },
              ].map((stat) => (
                <div key={stat.label} className="px-6 py-5 text-center">
                  <div className="text-3xl font-black text-primary mb-0.5" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{stat.value}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Courts Section */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-3 block" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Instalaciones</span>
            <h2 className="text-5xl md:text-6xl" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Nuestras Pistas</h2>
          </div>
          <button
            onClick={() => setPage("order")}
            className="flex items-center gap-2 text-primary text-sm font-bold tracking-widest uppercase hover:gap-3 transition-all"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Ver disponibilidad <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {courts.map((court) => (
            <div key={court.id} className="group relative overflow-hidden rounded-sm border border-border bg-card hover:border-primary/30 transition-all duration-300">
              <div className="relative h-48 bg-secondary overflow-hidden">
                <img
                  src={court.img}
                  alt={court.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                <div className={`absolute top-3 right-3 px-2 py-0.5 rounded-sm text-xs font-bold tracking-wider uppercase ${court.available ? "bg-primary text-primary-foreground" : "bg-destructive/20 text-destructive border border-destructive/30"}`} style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  {court.available ? "Disponible" : "Reservada"}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{court.name}</h3>
                <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">{court.type} · {court.surface}</p>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-black text-lg" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>€{court.price}<span className="text-muted-foreground text-sm font-normal">/hr</span></span>
                  <button
                    onClick={() => setPage("order")}
                    disabled={!court.available}
                    className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-secondary hover:bg-primary hover:text-primary-foreground"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    Reservar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-secondary/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-3 block" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Por Qué Elegirnos</span>
            <h2 className="text-5xl md:text-6xl" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Todo lo que<br />necesitas para jugar</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {features.map((f) => (
              <div key={f.label} className="bg-background p-8 group hover:bg-card transition-colors">
                <div className="w-10 h-10 border border-primary/30 rounded-sm flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors">
                  <f.icon size={18} className="text-primary" />
                </div>
                <h3 className="text-xl mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{f.label}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-3 block" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Proceso</span>
          <h2 className="text-5xl md:text-6xl" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Reserva en<br />3 pasos simples</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          {[
            { step: "01", title: "Elige tu Pista", desc: "Selecciona la pista que más se adapte a tu nivel y preferencias de juego." },
            { step: "02", title: "Reserva el Horario", desc: "Escoge fecha y hora disponible. Cancela gratis hasta 2h antes de tu sesión." },
            { step: "03", title: "¡A Jugar!", desc: "Recibe confirmación instantánea por email y llega 10 minutos antes para calentar." },
          ].map((s) => (
            <div key={s.step} className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-sm border border-primary/20 bg-primary/5 flex items-center justify-center mb-6">
                <span className="text-3xl font-black text-primary" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{s.step}</span>
              </div>
              <h3 className="text-2xl mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-3 block" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Testimonios</span>
            <h2 className="text-5xl md:text-6xl" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Lo que dicen<br />nuestros socios</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="p-6 border border-border rounded-sm bg-background hover:border-primary/20 transition-colors">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={14} className="text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{t.avatar}</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-primary" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #000 0px, #000 1px, transparent 1px, transparent 40px)" }} />
        <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-6xl md:text-7xl text-primary-foreground mb-6" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            ¿Listo para empezar a jugar?
          </h2>
          <p className="text-primary-foreground/70 mb-10 text-lg">
            Únete a más de 500 socios que ya disfrutan de las mejores instalaciones de padel en Madrid.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setPage("order")}
              className="px-8 py-4 bg-primary-foreground text-background font-black tracking-widest uppercase text-sm rounded-sm hover:bg-primary-foreground/90 transition-all"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Reservar Ahora
            </button>
            <button
              onClick={() => setPage("register")}
              className="px-8 py-4 border-2 border-primary-foreground/30 text-primary-foreground font-bold tracking-widest uppercase text-sm rounded-sm hover:border-primary-foreground/60 transition-all"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Ver Membresías
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
                  <span className="text-primary-foreground font-black text-sm" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>HP</span>
                </div>
                <span className="font-black tracking-widest text-sm" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>HUGO PADEL</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">El mejor centro de padel de Madrid con instalaciones de primer nivel.</p>
              <div className="flex gap-3">
                {[Instagram, Facebook, Youtube].map((Icon, i) => (
                  <div key={i} className="w-8 h-8 border border-border rounded-sm flex items-center justify-center hover:border-primary/40 hover:text-primary cursor-pointer transition-colors text-muted-foreground">
                    <Icon size={14} />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Instalaciones</h4>
              {["Pista Norte", "Pista Sur", "Pista Central", "Pista Elite", "Bar & Lounge"].map((l) => (
                <div key={l} className="text-sm text-muted-foreground hover:text-foreground cursor-pointer py-1 transition-colors">{l}</div>
              ))}
            </div>
            <div>
              <h4 className="text-sm mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Servicios</h4>
              {["Clases Individuales", "Clases Grupales", "Alquiler de Palas", "Torneos", "Membresías"].map((l) => (
                <div key={l} className="text-sm text-muted-foreground hover:text-foreground cursor-pointer py-1 transition-colors">{l}</div>
              ))}
            </div>
            <div>
              <h4 className="text-sm mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Contacto</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin size={13} className="text-primary shrink-0" />Calle del Padel 42, Madrid</div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground"><Phone size={13} className="text-primary shrink-0" />+34 912 345 678</div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground"><Mail size={13} className="text-primary shrink-0" />hola@hugopadel.es</div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground"><Clock size={13} className="text-primary shrink-0" />08:00 – 23:00 · Todos los días</div>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-xs text-muted-foreground">© 2024 Hugo Padel Center. Todos los derechos reservados.</span>
            <div className="flex gap-6 text-xs text-muted-foreground">
              <span className="hover:text-foreground cursor-pointer transition-colors">Privacidad</span>
              <span className="hover:text-foreground cursor-pointer transition-colors">Términos</span>
              <span className="hover:text-foreground cursor-pointer transition-colors">Cookies</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── Admin Page ──────────────────────────────────────────────────────────────

function AdminPage({ setPage }: { setPage: (p: Page) => void }) {
  const [activeTab, setActiveTab] = useState("dashboard");

  const sidebarLinks = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "bookings", icon: BookOpen, label: "Reservas" },
    { id: "courts", icon: Layers, label: "Pistas" },
    { id: "members", icon: Users, label: "Socios" },
    { id: "reports", icon: FileText, label: "Informes" },
    { id: "settings", icon: Settings, label: "Ajustes" },
  ];

  const kpis = [
    { label: "Ingresos Hoy", value: "€2.184", change: "+12%", icon: DollarSign, up: true },
    { label: "Reservas Hoy", value: "38", change: "+5", icon: Calendar, up: true },
    { label: "Socios Activos", value: "514", change: "+3", icon: Users, up: true },
    { label: "Uso de Pistas", value: "87%", change: "-2%", icon: Activity, up: false },
  ];

  const statusBadge = (s: string) => {
    const styles: Record<string, string> = {
      confirmed: "bg-primary/10 text-primary border border-primary/20",
      pending: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
      cancelled: "bg-destructive/10 text-destructive border border-destructive/20",
    };
    const labels: Record<string, string> = { confirmed: "Confirmado", pending: "Pendiente", cancelled: "Cancelado" };
    return <span className={`px-2 py-0.5 rounded-sm text-xs font-bold tracking-wider uppercase ${styles[s]}`} style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{labels[s]}</span>;
  };

  return (
    <div className="pt-16 min-h-screen flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-56 border-r border-border bg-card flex-col fixed left-0 top-16 bottom-0 z-30">
        <div className="flex-1 py-6 px-3 overflow-y-auto">
          <div className="space-y-0.5">
            {sidebarLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => setActiveTab(l.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-left text-sm font-semibold tracking-wider uppercase transition-all ${
                  activeTab === l.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                <l.icon size={15} />
                {l.label}
              </button>
            ))}
          </div>
        </div>
        <div className="p-3 border-t border-border">
          <button
            onClick={() => setPage("home")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-semibold tracking-wider uppercase text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            <LogOut size={15} />
            Salir
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-56 overflow-auto">
        {/* Top Bar */}
        <div className="sticky top-16 z-20 bg-background/80 backdrop-blur-md border-b border-border px-6 py-3 flex items-center justify-between">
          <div>
            <h2 className="text-2xl" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Dashboard Admin</h2>
            <p className="text-xs text-muted-foreground">Lunes, 29 de junio 2026 · Hugo Martínez</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Buscar..."
                className="bg-secondary border border-border rounded-sm pl-8 pr-4 py-2 text-sm outline-none focus:border-primary/40 w-48"
              />
            </div>
            <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
            </button>
            <div className="w-8 h-8 bg-primary/10 border border-primary/20 rounded-sm flex items-center justify-center">
              <span className="text-xs font-bold text-primary" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>HM</span>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map((kpi) => (
              <div key={kpi.label} className="p-5 border border-border rounded-sm bg-card">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-9 h-9 border border-primary/20 bg-primary/5 rounded-sm flex items-center justify-center">
                    <kpi.icon size={16} className="text-primary" />
                  </div>
                  <span className={`text-xs font-bold tracking-wider uppercase px-2 py-0.5 rounded-sm ${kpi.up ? "text-primary bg-primary/10" : "text-destructive bg-destructive/10"}`} style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    {kpi.change}
                  </span>
                </div>
                <div className="text-3xl font-black mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{kpi.value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">{kpi.label}</div>
              </div>
            ))}
          </div>

          {/* Chart + Court Status */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Revenue Chart */}
            <div className="lg:col-span-2 p-5 border border-border rounded-sm bg-card">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Ingresos Semanales</h3>
                  <p className="text-xs text-muted-foreground">Semana actual vs anterior</p>
                </div>
                <span className="text-primary text-xs font-bold tracking-wider uppercase border border-primary/20 bg-primary/5 px-2 py-1 rounded-sm" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>€13.620</span>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={revenueData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C8F135" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#C8F135" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(239,243,252,0.06)" />
                  <XAxis dataKey="day" tick={{ fill: "#6B7894", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#6B7894", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: "#0D1520", border: "1px solid rgba(239,243,252,0.07)", borderRadius: "2px", color: "#EFF3FC" }}
                    labelStyle={{ color: "#C8F135", fontFamily: "'Barlow Condensed', sans-serif", textTransform: "uppercase" }}
                    formatter={(v: number) => [`€${v}`, "Ingresos"]}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#C8F135" strokeWidth={2} fill="url(#revGrad)" dot={false} activeDot={{ r: 4, fill: "#C8F135" }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Court Status */}
            <div className="p-5 border border-border rounded-sm bg-card">
              <h3 className="text-xl mb-5" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Estado de Pistas</h3>
              <div className="space-y-3">
                {courts.map((c) => (
                  <div key={c.id} className="flex items-center gap-3 p-3 rounded-sm bg-secondary/50 border border-border">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${c.available ? "bg-primary" : "bg-destructive"}`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold truncate">{c.name}</div>
                      <div className="text-xs text-muted-foreground">{c.type}</div>
                    </div>
                    <span className={`text-xs font-bold tracking-wider uppercase ${c.available ? "text-primary" : "text-destructive"}`} style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                      {c.available ? "Libre" : "Ocupada"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bookings Table */}
          <div className="border border-border rounded-sm bg-card overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h3 className="text-xl" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Reservas de Hoy</h3>
              <span className="text-xs text-muted-foreground">{bookingsData.length} reservas</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {["ID", "Socio", "Pista", "Horario", "Estado", "Importe"].map((h) => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-bold tracking-widest uppercase text-muted-foreground" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookingsData.map((b, i) => (
                    <tr key={b.id} className={`border-b border-border hover:bg-secondary/30 transition-colors ${i === bookingsData.length - 1 ? "border-0" : ""}`}>
                      <td className="px-5 py-3 text-muted-foreground text-xs font-mono">{b.id}</td>
                      <td className="px-5 py-3 font-medium">{b.member}</td>
                      <td className="px-5 py-3 text-muted-foreground text-xs">{b.court}</td>
                      <td className="px-5 py-3 text-muted-foreground text-xs">{b.time}</td>
                      <td className="px-5 py-3">{statusBadge(b.status)}</td>
                      <td className="px-5 py-3 font-bold text-primary" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{b.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// ─── Order Page ──────────────────────────────────────────────────────────────

function OrderPage({ setPage }: { setPage: (p: Page) => void }) {
  const [step, setStep] = useState(1);
  const [selectedCourt, setSelectedCourt] = useState<typeof courts[0] | null>(null);
  const [selectedDate, setSelectedDate] = useState("2026-06-29");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const availableTimes = timeSlots.filter((_, i) => i % 3 !== 1);

  const steps = [
    { n: 1, label: "Pista" },
    { n: 2, label: "Horario" },
    { n: 3, label: "Confirmar" },
  ];

  if (confirmed) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-primary/10 border border-primary/30 rounded-sm flex items-center justify-center mx-auto mb-8">
            <CircleCheck size={36} className="text-primary" />
          </div>
          <h2 className="text-5xl mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>¡Reserva Confirmada!</h2>
          <p className="text-muted-foreground mb-2">Tu reserva ha sido procesada correctamente.</p>
          <div className="my-8 p-5 border border-border rounded-sm bg-card text-left space-y-3">
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Pista</span><span className="font-semibold">{selectedCourt?.name}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Fecha</span><span className="font-semibold">{selectedDate}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Horario</span><span className="font-semibold">{selectedTime} – {selectedTime?.split(":")[0] ? `${parseInt(selectedTime.split(":")[0]) + 1}:00` : ""}</span></div>
            <div className="flex justify-between text-sm border-t border-border pt-3"><span className="font-bold text-primary" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Total</span><span className="font-black text-primary text-lg" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>€{selectedCourt?.price}</span></div>
          </div>
          <p className="text-xs text-muted-foreground mb-8">Se ha enviado una confirmación a tu correo electrónico.</p>
          <button
            onClick={() => { setStep(1); setSelectedCourt(null); setSelectedTime(null); setConfirmed(false); setPage("home"); }}
            className="px-8 py-3 bg-primary text-primary-foreground font-bold tracking-widest uppercase text-sm rounded-sm hover:bg-primary/90 transition-all"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-3 block" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Reservas Online</span>
          <h1 className="text-5xl md:text-6xl" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Reservar Pista</h1>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-12">
          {steps.map((s, i) => (
            <div key={s.n} className="flex items-center gap-2">
              <button
                onClick={() => { if (s.n < step) setStep(s.n); }}
                className={`flex items-center gap-2 ${s.n < step ? "cursor-pointer" : "cursor-default"}`}
              >
                <div className={`w-8 h-8 rounded-sm flex items-center justify-center text-sm font-black transition-all ${
                  step === s.n ? "bg-primary text-primary-foreground" :
                  step > s.n ? "bg-primary/20 text-primary border border-primary/30" :
                  "bg-secondary text-muted-foreground border border-border"
                }`} style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  {step > s.n ? <Check size={14} /> : s.n}
                </div>
                <span className={`text-sm font-bold tracking-widest uppercase hidden sm:block ${step === s.n ? "text-foreground" : "text-muted-foreground"}`} style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  {s.label}
                </span>
              </button>
              {i < steps.length - 1 && <div className={`flex-1 h-px mx-2 ${step > s.n ? "bg-primary/30" : "bg-border"}`} style={{ minWidth: 32 }} />}
            </div>
          ))}
        </div>

        {/* Step 1: Select Court */}
        {step === 1 && (
          <div>
            <h3 className="text-2xl mb-6" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Elige tu pista</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {courts.map((court) => (
                <button
                  key={court.id}
                  onClick={() => court.available && setSelectedCourt(court)}
                  disabled={!court.available}
                  className={`text-left group relative overflow-hidden rounded-sm border transition-all duration-200 ${
                    !court.available ? "opacity-40 cursor-not-allowed border-border" :
                    selectedCourt?.id === court.id ? "border-primary bg-primary/5" :
                    "border-border hover:border-primary/40 bg-card"
                  }`}
                >
                  <div className="relative h-36 bg-secondary overflow-hidden">
                    <img src={court.img} alt={court.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                    {selectedCourt?.id === court.id && (
                      <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-sm flex items-center justify-center">
                        <Check size={12} className="text-primary-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-lg" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{court.name}</h4>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">{court.type} · {court.surface}</p>
                      </div>
                      <div className="text-right shrink-0 ml-4">
                        <div className="text-xl font-black text-primary" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>€{court.price}</div>
                        <div className="text-xs text-muted-foreground">/hora</div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => selectedCourt && setStep(2)}
                disabled={!selectedCourt}
                className="px-8 py-3 bg-primary text-primary-foreground font-bold tracking-widest uppercase text-sm rounded-sm hover:bg-primary/90 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Siguiente <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Select Time */}
        {step === 2 && (
          <div>
            <h3 className="text-2xl mb-6" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Elige fecha y horario</h3>
            <div className="mb-6">
              <label className="block text-xs font-bold tracking-widest uppercase text-muted-foreground mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Fecha</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-card border border-border rounded-sm px-4 py-2.5 text-sm outline-none focus:border-primary/50 w-48"
              />
            </div>
            <label className="block text-xs font-bold tracking-widest uppercase text-muted-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Horario Disponible</label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-8">
              {timeSlots.map((t) => {
                const isAvailable = availableTimes.includes(t);
                return (
                  <button
                    key={t}
                    onClick={() => isAvailable && setSelectedTime(t)}
                    disabled={!isAvailable}
                    className={`py-2.5 rounded-sm text-sm font-bold tracking-wider uppercase transition-all ${
                      !isAvailable ? "opacity-25 cursor-not-allowed bg-secondary text-muted-foreground" :
                      selectedTime === t ? "bg-primary text-primary-foreground" :
                      "bg-secondary border border-border hover:border-primary/40 hover:text-primary"
                    }`}
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setStep(1)} className="px-6 py-3 border border-border text-muted-foreground font-bold tracking-widest uppercase text-sm rounded-sm hover:border-primary/40 hover:text-foreground transition-all" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Atrás</button>
              <button
                onClick={() => selectedTime && setStep(3)}
                disabled={!selectedTime}
                className="px-8 py-3 bg-primary text-primary-foreground font-bold tracking-widest uppercase text-sm rounded-sm hover:bg-primary/90 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Siguiente <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirm */}
        {step === 3 && (
          <div>
            <h3 className="text-2xl mb-6" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Confirmar Reserva</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="p-5 border border-border rounded-sm bg-card">
                  <h4 className="text-sm mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Detalles de la Reserva</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Pista</span><span className="font-semibold">{selectedCourt?.name}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Tipo</span><span>{selectedCourt?.type}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Superficie</span><span>{selectedCourt?.surface}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Fecha</span><span className="font-semibold">{selectedDate}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Horario</span><span className="font-semibold">{selectedTime} – {selectedTime ? `${parseInt(selectedTime.split(":")[0]) + 1}:00` : ""}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Duración</span><span>60 min</span></div>
                  </div>
                  <div className="border-t border-border mt-4 pt-4 flex justify-between items-center">
                    <span className="font-bold" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Total</span>
                    <span className="text-2xl font-black text-primary" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>€{selectedCourt?.price}</span>
                  </div>
                </div>
                <div className="p-4 border border-primary/20 rounded-sm bg-primary/5 flex gap-3">
                  <CircleCheck size={16} className="text-primary shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground leading-relaxed">Cancelación gratuita hasta 2 horas antes del inicio de la sesión.</p>
                </div>
              </div>
              <div className="p-5 border border-border rounded-sm bg-card">
                <h4 className="text-sm mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Pago</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase text-muted-foreground mb-1.5" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Número de Tarjeta</label>
                    <input placeholder="1234 5678 9012 3456" className="w-full bg-secondary border border-border rounded-sm px-4 py-2.5 text-sm outline-none focus:border-primary/50" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold tracking-widest uppercase text-muted-foreground mb-1.5" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Vencimiento</label>
                      <input placeholder="MM/AA" className="w-full bg-secondary border border-border rounded-sm px-4 py-2.5 text-sm outline-none focus:border-primary/50" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-widest uppercase text-muted-foreground mb-1.5" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>CVV</label>
                      <input placeholder="123" className="w-full bg-secondary border border-border rounded-sm px-4 py-2.5 text-sm outline-none focus:border-primary/50" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase text-muted-foreground mb-1.5" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Titular</label>
                    <input placeholder="Hugo Martínez" className="w-full bg-secondary border border-border rounded-sm px-4 py-2.5 text-sm outline-none focus:border-primary/50" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3 justify-end mt-6">
              <button onClick={() => setStep(2)} className="px-6 py-3 border border-border text-muted-foreground font-bold tracking-widest uppercase text-sm rounded-sm hover:border-primary/40 hover:text-foreground transition-all" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Atrás</button>
              <button
                onClick={() => setConfirmed(true)}
                className="px-8 py-3 bg-primary text-primary-foreground font-bold tracking-widest uppercase text-sm rounded-sm hover:bg-primary/90 transition-all flex items-center gap-2"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                <Shield size={14} /> Pagar €{selectedCourt?.price}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Login Page ──────────────────────────────────────────────────────────────

function LoginPage({ setPage }: { setPage: (p: Page) => void }) {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="pt-16 min-h-screen flex">
      {/* Left visual */}
      <div className="hidden lg:block flex-1 relative overflow-hidden bg-[#040810]">
        <img
          src="https://images.unsplash.com/photo-1767128890626-6b76ebe6b02d?w=900&h=1200&fit=crop&auto=format"
          alt="Padel players"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background" />
        <div className="absolute bottom-16 left-12">
          <blockquote className="max-w-xs">
            <p className="text-3xl font-black text-foreground mb-3 leading-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              "El padel no es solo un deporte, es un estilo de vida."
            </p>
            <cite className="text-xs text-muted-foreground uppercase tracking-widest">— Hugo Martínez, Fundador</cite>
          </blockquote>
        </div>
      </div>

      {/* Right form */}
      <div className="w-full lg:w-[480px] shrink-0 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2 mb-12">
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
              <span className="text-primary-foreground font-black text-sm" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>HP</span>
            </div>
            <span className="font-black tracking-widest text-sm" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>HUGO PADEL</span>
          </div>

          <h2 className="text-4xl mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Bienvenido de vuelta</h2>
          <p className="text-muted-foreground text-sm mb-10">Inicia sesión para reservar tus pistas.</p>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold tracking-widest uppercase text-muted-foreground mb-1.5" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Correo Electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hugo@ejemplo.com"
                className="w-full bg-secondary border border-border rounded-sm px-4 py-3 text-sm outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold tracking-widest uppercase text-muted-foreground mb-1.5" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Contraseña</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-secondary border border-border rounded-sm px-4 py-3 pr-10 text-sm outline-none focus:border-primary/50 transition-colors"
                />
                <button
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-primary w-3.5 h-3.5 rounded-sm" />
                <span className="text-xs text-muted-foreground">Recordarme</span>
              </label>
              <button className="text-xs text-primary hover:underline">¿Olvidaste tu contraseña?</button>
            </div>

            <button
              onClick={() => setPage("home")}
              className="w-full py-3.5 bg-primary text-primary-foreground font-black tracking-widest uppercase text-sm rounded-sm hover:bg-primary/90 transition-all mt-2"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Iniciar Sesión
            </button>

            <div className="relative text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <span className="relative bg-background px-4 text-xs text-muted-foreground uppercase tracking-widest">o continúa con</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 py-2.5 border border-border rounded-sm text-sm hover:border-primary/30 hover:text-primary transition-all text-muted-foreground font-semibold">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-2 py-2.5 border border-border rounded-sm text-sm hover:border-primary/30 hover:text-primary transition-all text-muted-foreground font-semibold">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </button>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            ¿Sin cuenta?{" "}
            <button onClick={() => setPage("register")} className="text-primary font-semibold hover:underline">
              Regístrate gratis
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Register Page ───────────────────────────────────────────────────────────

function RegisterPage({ setPage }: { setPage: (p: Page) => void }) {
  const [showPass, setShowPass] = useState(false);
  const [membership, setMembership] = useState<"casual" | "pro" | "club">("pro");
  const [agreed, setAgreed] = useState(false);

  const plans = [
    { id: "casual" as const, label: "Casual", price: "€0", desc: "Paga por sesión, sin compromiso" },
    { id: "pro" as const, label: "Pro", price: "€39/mes", desc: "10% dto en reservas + acceso prioritario" },
    { id: "club" as const, label: "Club", price: "€79/mes", desc: "Reservas ilimitadas + entrenador incluido" },
  ];

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 md:px-8 py-12">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
            <span className="text-primary-foreground font-black text-sm" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>HP</span>
          </div>
          <span className="font-black tracking-widest text-sm" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>HUGO PADEL</span>
        </div>

        <h2 className="text-5xl mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Crear tu cuenta</h2>
        <p className="text-muted-foreground text-sm mb-10">Únete a la comunidad de padel más activa de Madrid.</p>

        {/* Membership selector */}
        <div className="mb-8">
          <label className="block text-xs font-bold tracking-widest uppercase text-muted-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Tipo de Membresía</label>
          <div className="grid grid-cols-3 gap-3">
            {plans.map((p) => (
              <button
                key={p.id}
                onClick={() => setMembership(p.id)}
                className={`p-4 rounded-sm border text-left transition-all ${
                  membership === p.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/30 bg-card"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-black uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{p.label}</span>
                  {membership === p.id && <Check size={12} className="text-primary" />}
                </div>
                <div className="text-primary font-black text-lg mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{p.price}</div>
                <div className="text-xs text-muted-foreground leading-snug">{p.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Form fields */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold tracking-widest uppercase text-muted-foreground mb-1.5" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Nombre</label>
              <input placeholder="Hugo" className="w-full bg-secondary border border-border rounded-sm px-4 py-3 text-sm outline-none focus:border-primary/50 transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-bold tracking-widest uppercase text-muted-foreground mb-1.5" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Apellidos</label>
              <input placeholder="Martínez García" className="w-full bg-secondary border border-border rounded-sm px-4 py-3 text-sm outline-none focus:border-primary/50 transition-colors" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold tracking-widest uppercase text-muted-foreground mb-1.5" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Correo Electrónico</label>
              <input type="email" placeholder="hugo@ejemplo.com" className="w-full bg-secondary border border-border rounded-sm px-4 py-3 text-sm outline-none focus:border-primary/50 transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-bold tracking-widest uppercase text-muted-foreground mb-1.5" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Teléfono</label>
              <input placeholder="+34 600 123 456" className="w-full bg-secondary border border-border rounded-sm px-4 py-3 text-sm outline-none focus:border-primary/50 transition-colors" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold tracking-widest uppercase text-muted-foreground mb-1.5" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Contraseña</label>
              <div className="relative">
                <input type={showPass ? "text" : "password"} placeholder="••••••••" className="w-full bg-secondary border border-border rounded-sm px-4 py-3 pr-10 text-sm outline-none focus:border-primary/50 transition-colors" />
                <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold tracking-widest uppercase text-muted-foreground mb-1.5" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Repetir Contraseña</label>
              <input type="password" placeholder="••••••••" className="w-full bg-secondary border border-border rounded-sm px-4 py-3 text-sm outline-none focus:border-primary/50 transition-colors" />
            </div>
          </div>

          <label className="flex items-start gap-3 cursor-pointer pt-2">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="accent-primary w-4 h-4 mt-0.5 shrink-0"
            />
            <span className="text-sm text-muted-foreground leading-relaxed">
              Acepto los{" "}
              <span className="text-primary hover:underline cursor-pointer">Términos y Condiciones</span>
              {" "}y la{" "}
              <span className="text-primary hover:underline cursor-pointer">Política de Privacidad</span>
              {" "}de Hugo Padel Center.
            </span>
          </label>

          <button
            onClick={() => agreed && setPage("home")}
            disabled={!agreed}
            className="w-full py-4 bg-primary text-primary-foreground font-black tracking-widest uppercase text-sm rounded-sm hover:bg-primary/90 transition-all disabled:opacity-30 disabled:cursor-not-allowed mt-2"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Crear Cuenta {membership === "pro" ? "Pro" : membership === "club" ? "Club" : "Gratuita"}
          </button>

          <p className="text-center text-sm text-muted-foreground">
            ¿Ya tienes cuenta?{" "}
            <button onClick={() => setPage("login")} className="text-primary font-semibold hover:underline">
              Inicia sesión
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("home");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav page={page} setPage={setPage} />
      {page === "home" && <HomePage setPage={setPage} />}
      {page === "admin" && <AdminPage setPage={setPage} />}
      {page === "order" && <OrderPage setPage={setPage} />}
      {page === "login" && <LoginPage setPage={setPage} />}
      {page === "register" && <RegisterPage setPage={setPage} />}
    </div>
  );
}
