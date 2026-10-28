/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  Phone,
  MapPin,
  MessageCircle,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Calendar,
  Sparkles,
  Info
} from 'lucide-react';

// Contact and Location Configuration
const CONTACT_PHONE_RAW = '9265145093';
const CONTACT_PHONE_DISPLAY = '+91 92651 45093';
const CONTACT_PERSON_NAME = 'GULAMMOHAMMAD RAFAI';
const CONTACT_PHOTO = '/assets/gulammohammad-rafai.jpg';
const DARGAH_NAME = 'Hazrat Gaibanshah Peer (R.A.) Dargah';
const URS_DATES_DISPLAY = '10th Safar & 11th Safar';
const MAPS_LINK = 'https://maps.app.goo.gl/oRHZEsagzzhv17TH7';
const MAPS_DIR_URL = 'https://www.google.com/maps/dir/?api=1&destination=22.5470017,70.8888798';
const MAPS_EMBED_URL = 'https://maps.google.com/maps?q=22.5470017,70.8888798+(Gaibanshah%20Peer%20Dargah)&t=&z=16&ie=UTF8&iwloc=B&output=embed';

// Navigation links
const NAV_ITEMS: [string, string][] = [
  ['About', 'about'],
  ['History', 'history'],
  ['Urs', 'urs'],
  ['Facilities', 'facilities'],
  ['Gallery', 'gallery'],
  ['Contact', 'contact'],
];

// Interactive Reveal on Scroll Hook
function useRevealOnScroll() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
          }
        });
      },
      { threshold: 0.12 }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

// Golden Floating Particle Canvas
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.8 + 0.4,
      v: Math.random() * 0.0006 + 0.0002,
      phase: Math.random() * Math.PI * 2,
    }));

    const render = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.y -= p.v;
        if (p.y < 0) p.y = 1;
        const alpha = 0.35 + 0.35 * Math.sin(time / 900 + p.phase);
        ctx.beginPath();
        ctx.fillStyle = `rgba(232, 196, 110, ${alpha})`;
        ctx.shadowColor = 'rgba(232, 196, 110, 0.9)';
        ctx.shadowBlur = 8;
        ctx.arc(
          p.x * canvas.width + Math.sin(time / 2000 + p.phase) * 12,
          p.y * canvas.height,
          p.r,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />;
}

// Sacred 8-Point Islamic Star Rosette
function IslamicRosette({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" stroke="currentColor" strokeWidth="1">
      <rect x="40" y="40" width="120" height="120" />
      <rect x="40" y="40" width="120" height="120" transform="rotate(45 100 100)" />
      <circle cx="100" cy="100" r="58" />
      <circle cx="100" cy="100" r="30" />
      <rect x="70" y="70" width="60" height="60" transform="rotate(22.5 100 100)" />
      <rect x="70" y="70" width="60" height="60" transform="rotate(67.5 100 100)" />
    </svg>
  );
}

// 3D Perspective Tilt Container
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.transform = `perspective(900px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateZ(10px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = '';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-300 ease-out [transform-style:preserve-3d] ${className}`}
    >
      {children}
    </div>
  );
}

// Section Header Component
function SectionHeader({ kicker, title, arabic }: { kicker: string; title: string; arabic?: string }) {
  return (
    <div className="reveal mb-14 text-center">
      {arabic && <p className="mb-3 font-arabic text-2xl text-gold">{arabic}</p>}
      <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">{kicker}</p>
      <h2 className="mt-3 text-4xl font-semibold text-gold-gradient md:text-6xl">{title}</h2>
      <div className="mx-auto mt-5 flex items-center justify-center gap-3 text-gold">
        <span className="h-px w-16 bg-gold/50" />
        <span className="rotate-45 border border-gold p-1" />
        <span className="h-px w-16 bg-gold/50" />
      </div>
    </div>
  );
}

export default function App() {
  useRevealOnScroll();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroOffset, setHeroOffset] = useState({ x: 0, y: 0 });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null ? (prev + galleryImages.length - 1) % galleryImages.length : null));
      }
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % galleryImages.length : null));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  // Gallery items matching original Lovable site + high quality local shrine assets
  const galleryImages = [
    { src: '/assets/original/night.jpg', alt: 'Dargah illuminated in green at night' },
    { src: '/assets/original/front.jpg', alt: 'Dargah white dome and green parapet by day' },
    { src: '/assets/original/mazar.jpg', alt: 'The blessed Mazar Sharif inside the Dargah' },
    { src: '/assets/original/dome.jpg', alt: 'Golden finial atop the white dome' },
    { src: '/assets/original/door.jpg', alt: 'Carved entrance doors to the Mazar' },
    { src: '/assets/original/arches.jpg', alt: 'Pointed arches and devotees at the Dargah' },
    { src: '/assets/original/day-side.jpg', alt: 'Side view of the Dargah with gardens' },
    { src: '/assets/original/night-side.jpg', alt: 'Dargah glowing at night from the side' },
    { src: '/assets/aistudio/WhatsApp_Image_2026-10-29_at_12.19.31_AM_730fb192.jpeg', alt: 'Full illuminated night view of the Dargah dome and arches' },
    { src: '/assets/aistudio/WhatsApp_Image_2026-10-29_at_12.19.30_AM__1__eda0da9b.jpeg', alt: 'Dargah entrance gateway and minarets in clear daylight' },
    { src: '/assets/aistudio/WhatsApp_Image_2026-10-11_at_6.12.28_PM__3__c9ed0481.jpeg', alt: 'Dargah courtyard view with boundary wall and surrounding trees' },
    { src: '/assets/aistudio/WhatsApp_Image_2026-10-29_at_12.19.30_AM__3__e74c097c.jpeg', alt: 'Sanctum sanctorum and decorated Mazar Mubarak' },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Header / Navbar */}
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled ? 'glass py-3' : 'py-6'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <a href="#top" className="flex min-w-0 items-center gap-3 group">
            <IslamicRosette className="h-8 w-8 shrink-0 animate-spin-slow text-gold group-hover:scale-110 transition-transform" />
            <span className="truncate font-display text-lg font-semibold text-gold-soft tracking-wide">
              Gaibanshah Peer Dargah
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden gap-8 text-sm tracking-wide text-muted-foreground md:flex">
            {NAV_ITEMS.map(([label, href]) => (
              <a
                key={href}
                href={`#${href}`}
                className="transition hover:text-gold"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="rounded-lg p-2 text-gold md:hidden glass hover:bg-gold/10 transition"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="glass mx-4 mt-3 rounded-2xl border border-gold/30 p-6 md:hidden">
            <nav className="flex flex-col gap-4 text-center">
              {NAV_ITEMS.map(([label, href]) => (
                <a
                  key={href}
                  href={`#${href}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 font-display text-lg tracking-wide text-gold-soft transition hover:text-gold"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="top"
        className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24 pb-16"
        onMouseMove={(e) =>
          setHeroOffset({
            x: e.clientX / window.innerWidth - 0.5,
            y: e.clientY / window.innerHeight - 0.5,
          })
        }
      >
        {/* Parallax Hero Background */}
        <div
          className="absolute inset-0 scale-110 transition-transform duration-700 ease-out"
          style={{
            transform: `scale(1.1) translate(${heroOffset.x * -20}px, ${heroOffset.y * -20}px)`,
          }}
        >
          <img
            src="/assets/original/night.jpg"
            alt="Hazrat Gaibanshah Peer Dargah illuminated at night"
            className="h-full w-full object-cover object-[50%_40%] opacity-60"
          />
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
        <div className="absolute left-1/2 top-1/3 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/15 blur-[120px] animate-glow pointer-events-none" />

        {/* Canvas animated particles */}
        <ParticleCanvas />

        {/* Decorative Islamic Background Rosettes */}
        <IslamicRosette className="absolute -left-24 top-24 h-80 w-80 animate-spin-slow text-gold/15 pointer-events-none" />
        <IslamicRosette className="absolute -right-20 bottom-10 h-96 w-96 animate-spin-slow text-emerald/30 [animation-direction:reverse] pointer-events-none" />

        {/* Hero Content */}
        <div
          className="relative z-10 mx-auto max-w-5xl px-6 text-center"
          style={{
            transform: `perspective(1200px) rotateY(${heroOffset.x * 6}deg) rotateX(${-heroOffset.y * 6}deg)`,
          }}
        >
          <p className="mb-6 font-arabic text-3xl text-gold animate-float md:text-4xl">
            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>
          <h1 className="text-5xl font-bold leading-[1.05] text-gold-gradient drop-shadow-2xl md:text-8xl">
            Hazrat Gaibanshah Peer <span className="italic font-medium">(R.A.)</span> Dargah
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg font-light tracking-wide text-ivory/85 md:text-xl">
            A Place of Faith, Peace, Spirituality and Blessings for All
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <a
              href="#about"
              className="rounded-full bg-gold-gradient px-9 py-4 font-medium tracking-wide text-primary-foreground shadow-gold transition hover:scale-105"
            >
              Explore Dargah
            </a>
            <a
              href="#contact"
              className="glass rounded-full px-9 py-4 font-medium tracking-wide text-gold-soft transition hover:scale-105"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.4em] text-gold/70 animate-float pointer-events-none">
          Scroll
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="pattern-bg relative px-6 py-32">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            kicker="The Saint"
            title="About Hazrat"
            arabic="رَحْمَةُ ٱللَّٰهِ عَلَيْه"
          />

          <div className="grid items-center gap-16 md:grid-cols-2">
            <TiltCard className="reveal">
              <div className="relative rounded-[2rem] p-2 bg-gold-gradient shadow-gold">
                <img
                  src="/assets/original/arches.jpg"
                  alt="Arches of the Dargah"
                  loading="lazy"
                  className="aspect-[4/5] w-full rounded-[1.7rem] object-cover"
                />
                <div className="glass absolute -bottom-6 -right-6 rounded-2xl px-6 py-4 [transform:translateZ(40px)]">
                  <p className="font-display text-3xl text-gold">Wali Allah</p>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Friend of Allah</p>
                </div>
              </div>
            </TiltCard>

            <div className="reveal space-y-6 text-lg font-light leading-relaxed text-ivory/80">
              <p>
                Hazrat Gaibanshah Peer (Rahmatullah Alaih) is revered as a Sufi saint whose life was devoted to the remembrance of Allah, service to humanity and the message of love, humility and peace.
              </p>
              <p>
                His blessed resting place — the Aastana-e-Hazrat Gaibanshah Peer Wali — continues to draw devotees of every faith who come seeking peace of heart, du'a and spiritual blessings.
              </p>
              <p className="border-l-2 border-gold/40 pl-4 italic text-gold-soft">
                "Whoever seeks the presence of the beloved shall find serenity, guidance and benevolence at this holy threshold."
              </p>
            </div>
          </div>

          {/* Timeline Grid */}
          <div className="relative mt-28">
            <div className="absolute left-1/2 top-0 hidden h-full w-px bg-gradient-to-b from-gold/0 via-gold/60 to-gold/0 md:block" />
            {[
              ['The Path of Faith', 'A life dedicated to prayer, dhikr and the teachings of Islam.'],
              ['Service to People', 'Known for compassion, guiding seekers and serving all who came.'],
              ['The Blessed Aastana', 'His resting place became a centre of light, peace and devotion.'],
              ['A Living Legacy', 'Today, thousands visit, especially during the Annual Urs Mubarak.'],
            ].map(([title, desc], idx) => (
              <div
                key={title}
                className={`reveal relative mb-10 md:w-1/2 ${
                  idx % 2 ? 'md:ml-auto md:pl-14' : 'md:pr-14'
                }`}
              >
                <span
                  className={`absolute top-8 hidden h-4 w-4 rotate-45 bg-gold shadow-gold md:block ${
                    idx % 2 ? '-left-2' : '-right-2'
                  }`}
                />
                <TiltCard>
                  <div className="glass rounded-2xl p-8 transition hover:border-gold/50">
                    <p className="font-display text-sm text-gold">0{idx + 1}</p>
                    <h3 className="mt-1 text-2xl font-semibold text-gold-soft">{title}</h3>
                    <p className="mt-2 font-light text-muted-foreground">{desc}</p>
                  </div>
                </TiltCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section id="history" className="relative px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            kicker="Story of the Shrine"
            title="History of Dargah"
          />

          {[
            {
              img: '/assets/original/front.jpg',
              title: 'Humble Beginnings',
              desc: 'Devotees gathered around the blessed resting place of Hazrat, offering prayers and flowers. Over generations, love for the saint built a home of light.',
            },
            {
              img: '/assets/original/dome.jpg',
              title: 'The White Dome',
              desc: 'The shrine rose with its pure white dome, crowned by a golden finial, encircled with emerald-green parapets and graceful pointed arches.',
            },
            {
              img: '/assets/original/mazar.jpg',
              title: 'The Heart of the Aastana',
              desc: 'Within rests the Mazar Sharif, adorned with sacred chadars and garlands, where visitors sit in silence and pray for blessings.',
            },
          ].map((item, idx) => (
            <div
              key={item.title}
              className={`reveal mb-24 grid items-center gap-12 md:grid-cols-2 ${
                idx % 2 ? 'md:[&>*:first-child]:order-2' : ''
              }`}
            >
              <TiltCard>
                <div className="overflow-hidden rounded-[2rem] shadow-gold ring-1 ring-gold/30">
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition duration-1000 hover:scale-110"
                  />
                </div>
              </TiltCard>

              <div>
                <p className="font-display text-7xl text-gold/20">0{idx + 1}</p>
                <h3 className="-mt-6 text-4xl font-semibold text-gold-soft">{item.title}</h3>
                <p className="mt-5 text-lg font-light leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Urs Section */}
      <section id="urs" className="relative overflow-hidden px-6 py-32">
        <img
          src="/assets/original/night-side.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-20 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
        <IslamicRosette className="absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 animate-spin-slow text-gold/10 pointer-events-none" />

        <div className="relative mx-auto max-w-5xl">
          <SectionHeader
            kicker="Every Year"
            title="Annual Urs Mubarak"
            arabic="عُرْس مُبَارَك"
          />

          {/* Annual Mubarak Gathering Dates Header */}
          <div className="reveal mb-8 flex justify-center">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-gold/40 bg-card/70 px-6 py-2.5 text-sm md:text-base font-medium text-gold-soft shadow-gold backdrop-blur-md">
              <Calendar className="h-4 w-4 text-gold shrink-0" />
              <span>Annual Mubarak Gathering: <strong className="text-gold font-semibold tracking-wide">10th Safar &amp; 11th Safar</strong></span>
            </div>
          </div>

          {/* Prominent Urs Dates - 10th Safar and 11th Safar */}
          <div className="reveal grid gap-6 md:grid-cols-2">
            {[
              { day: '10th', safar: 'Safar', label: 'Day 1' },
              { day: '11th', safar: 'Safar', label: 'Day 2' },
            ].map((d) => (
              <TiltCard key={d.day}>
                <div className="glass rounded-3xl p-10 text-center border border-gold/30 hover:border-gold/60 transition shadow-gold">
                  <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground flex items-center justify-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-gold" /> {d.label}
                  </p>
                  <p className="mt-3 font-display text-7xl font-bold text-gold-gradient">
                    {d.day}
                  </p>
                  <p className="font-display text-3xl text-gold-soft tracking-wider">
                    {d.safar}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-gold bg-gold/15 border border-gold/35 rounded-full px-4 py-1.5 font-medium shadow-inner">
                    Annual Mubarak Gathering • {d.day} {d.safar}
                  </span>
                </div>
              </TiltCard>
            ))}
          </div>

          {/* Event Details & Visitor Information Cards */}
          <div className="reveal mt-10 grid gap-6 md:grid-cols-2">
            <div className="glass rounded-3xl p-8 border border-gold/20">
              <h3 className="text-2xl font-semibold text-gold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-gold" /> Event Details
              </h3>
              <ul className="mt-4 space-y-3 font-light text-ivory/80">
                <li className="flex items-start gap-2">
                  <span className="text-gold">✦</span> Chadar Poshi &amp; Gul Poshi at the Mazar Sharif
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold">✦</span> Quran Khwani, Fatiha &amp; special Du'a
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold">✦</span> Mehfil-e-Sama and spiritual gatherings
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold">✦</span> Langar served for all visitors
                </li>
              </ul>
            </div>

            <div className="glass rounded-3xl p-8 border border-gold/20">
              <h3 className="text-2xl font-semibold text-gold flex items-center gap-2">
                <Info className="h-5 w-5 text-gold" /> Visitor Information
              </h3>
              <ul className="mt-4 space-y-3 font-light text-ivory/80">
                <li className="flex items-start gap-2">
                  <span className="text-gold">✦</span> All are welcome, regardless of faith
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold">✦</span> Please dress modestly and cover your head
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold">✦</span> Remove footwear before entering the Aastana
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold">✦</span> Contact us in advance for group visits
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section id="facilities" className="pattern-bg px-6 py-32">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            kicker="For Our Visitors"
            title="Facilities"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {[
              ['🕌', 'Chadar Available'],
              ['🚗', 'Parking Available'],
              ['💧', 'Drinking Water Available'],
              ['🪑', 'Sitting Arrangement Available'],
              ['✨', 'Other Facilities Available'],
            ].map(([icon, label], idx) => (
              <TiltCard key={label} className="reveal">
                <div
                  className="glass group relative h-full overflow-hidden rounded-3xl p-8 text-center transition hover:shadow-gold hover:border-gold/50"
                  style={{ transitionDelay: `${idx * 60}ms` }}
                >
                  <div className="absolute inset-x-0 -top-24 mx-auto h-40 w-40 rounded-full bg-gold/20 blur-3xl opacity-0 transition group-hover:opacity-100" />
                  <div className="relative mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gold-gradient text-3xl shadow-gold transition group-hover:-translate-y-2 group-hover:rotate-6">
                    {icon}
                  </div>
                  <p className="relative mt-6 font-display text-xl font-semibold text-gold-soft leading-snug">
                    {label}
                  </p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="px-6 py-32">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            kicker="Visit Us"
            title="Location"
          />

          <div className="reveal glass overflow-hidden rounded-[2rem] p-2 ring-1 ring-gold/30">
            <iframe
              title="Dargah location map"
              src={MAPS_EMBED_URL}
              className="h-[28rem] w-full rounded-[1.6rem] grayscale-[25%] contrast-110"
              loading="lazy"
              allowFullScreen
            />
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={MAPS_DIR_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full bg-gold-gradient px-8 py-4 font-medium text-primary-foreground shadow-gold transition hover:scale-105"
            >
              <MapPin className="h-4 w-4" /> Get Directions
            </a>
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 glass rounded-full px-8 py-4 font-medium text-gold-soft transition hover:scale-105"
            >
              <ExternalLink className="h-4 w-4 text-gold" /> Open in Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeader kicker="Moments of Light" title="Gallery" />

          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {galleryImages.map((img, idx) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setLightboxIndex(idx)}
                className="reveal group mb-5 block w-full overflow-hidden rounded-2xl ring-1 ring-gold/20 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full transition duration-700 group-hover:scale-110 group-hover:brightness-110 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Lightbox Modal */}
        {lightboxIndex !== null && (
          <div
            className="fixed inset-0 z-50 grid place-items-center bg-background/95 p-6 backdrop-blur-xl animate-in fade-in"
            onClick={() => setLightboxIndex(null)}
          >
            <div
              className="relative max-h-[85vh] max-w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages[lightboxIndex]?.src}
                alt={galleryImages[lightboxIndex]?.alt}
                className="max-h-[80vh] max-w-full rounded-2xl shadow-gold animate-in zoom-in-95 object-contain"
              />
              <p className="mt-3 text-center text-sm font-light text-gold-soft/80">
                {galleryImages[lightboxIndex]?.alt}
              </p>
            </div>

            <button
              type="button"
              aria-label="Previous image"
              className="glass absolute left-4 top-1/2 -translate-y-1/2 rounded-full p-4 text-gold transition hover:scale-110"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((lightboxIndex + galleryImages.length - 1) % galleryImages.length);
              }}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              type="button"
              aria-label="Next image"
              className="glass absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-4 text-gold transition hover:scale-110"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((lightboxIndex + 1) % galleryImages.length);
              }}
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <button
              type="button"
              aria-label="Close lightbox"
              className="glass absolute right-6 top-6 rounded-full p-3 text-gold transition hover:scale-110"
              onClick={() => setLightboxIndex(null)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        )}
      </section>

      {/* Contact Section - Updated with Gulammohammad Rafai & Photo */}
      <section id="contact" className="relative px-6 py-32">
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald/30 blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-xl">
          <SectionHeader kicker="Reach Out" title="Contact" />

          <TiltCard className="reveal">
            <div className="glass rounded-[2.5rem] p-8 md:p-12 text-center border border-gold/40 shadow-gold relative overflow-hidden">
              {/* Urs date banner inside contact card */}
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-5 py-2 text-xs md:text-sm font-medium text-gold-soft shadow-inner">
                <Calendar className="h-4 w-4 text-gold shrink-0" />
                <span>Annual Urs Mubarak: <strong className="text-gold tracking-wide">10th Safar &amp; 11th Safar</strong></span>
              </div>

              {/* Gulammohammad Rafai's Portrait Photo with Islamic golden frame & glow */}
              <div className="relative mx-auto mb-6 h-44 w-44 md:h-48 md:w-48 overflow-hidden rounded-full p-1.5 bg-gold-gradient shadow-gold ring-4 ring-gold/30">
                <img
                  src={CONTACT_PHOTO}
                  alt={CONTACT_PERSON_NAME}
                  className="h-full w-full rounded-full object-cover object-top"
                />
              </div>

              <IslamicRosette className="mx-auto h-9 w-9 animate-spin-slow text-gold/80" />

              <p className="mt-4 text-xs uppercase tracking-[0.4em] text-muted-foreground font-semibold">
                Contact Person
              </p>
              <h3 className="mt-2 text-3xl md:text-4xl font-bold tracking-wide text-gold-gradient">
                {CONTACT_PERSON_NAME}
              </h3>
              <p className="mt-1 text-sm text-gold-soft/80 font-light">
                For Ziyarat, Du'a, Chadar &amp; Urs Mubarak Inquiries
              </p>

              <a
                href={`tel:+91${CONTACT_PHONE_RAW}`}
                className="mt-5 inline-block text-2xl md:text-3xl font-light tracking-wider text-ivory hover:text-gold transition font-sans"
              >
                {CONTACT_PHONE_DISPLAY}
              </a>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a
                  href={`tel:+91${CONTACT_PHONE_RAW}`}
                  className="flex items-center gap-2 rounded-full bg-gold-gradient px-8 py-3.5 font-medium text-primary-foreground shadow-gold transition hover:scale-105"
                >
                  <Phone className="h-4 w-4" /> Call Now
                </a>
                <a
                  href={`https://wa.me/91${CONTACT_PHONE_RAW}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-full border border-gold/50 bg-card/50 px-8 py-3.5 font-medium text-gold-soft hover:bg-gold/15 transition hover:scale-105"
                >
                  <MessageCircle className="h-4 w-4 text-emerald" /> WhatsApp
                </a>
              </div>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* Important Notice Section */}
      <section className="px-6 pb-24">
        <div className="reveal mx-auto max-w-4xl rounded-3xl border border-gold/40 bg-secondary/40 p-8 text-center backdrop-blur-md md:p-12 shadow-gold">
          <p className="text-xs uppercase tracking-[0.4em] text-gold">Important Notice</p>
          <p className="mt-4 font-display text-2xl italic leading-relaxed text-ivory/90 md:text-3xl">
            "This Dargah and surrounding premises are private property. Visitors are requested to maintain cleanliness, peace and respect during their visit."
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gold/20 px-6 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <p className="font-display text-2xl text-gold-gradient font-semibold">
              {DARGAH_NAME}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          <div className="flex flex-col gap-2 text-sm text-ivory/80 md:items-end">
            <a
              href={`tel:+91${CONTACT_PHONE_RAW}`}
              className="flex items-center gap-2 hover:text-gold transition"
            >
              <Phone className="h-3.5 w-3.5 text-gold" /> {CONTACT_PHONE_DISPLAY}
            </a>
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-gold transition"
            >
              <MapPin className="h-3.5 w-3.5 text-gold" /> View on Google Maps
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
