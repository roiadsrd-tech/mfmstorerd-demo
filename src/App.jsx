import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ArrowUpRight,
  MapPin,
  Phone,
  Instagram
} from 'lucide-react';
import {
  EditorialSurface,
  RevealText,
  ClipRevealImage,
  MagneticButton,
  HoverPreviewList,
  StickyEditorialSplit,
  HorizontalShowcase,
  EditorialMarquee,
  EditorialAccordion,
  ScrollProgressBar,
  CounterMetric
} from './craft';

const WHATSAPP_URL =
  'https://wa.me/18099953799?text=Hola%2C%20vi%20el%20cat%C3%A1logo%20de%20MFM%20Store%20y%20me%20gustar%C3%ADa%20recibir%20asesor%C3%ADa%20sobre%20suplementos.';
const INSTAGRAM_URL = 'https://www.instagram.com/mfmstorerd/';

// Verified showcase products with zenith lighting aesthetic (The Moment)
const ZENITH_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Creatine Micronized',
    brand: 'Naughty Boy Lifestyle',
    badge: '100% Pura',
    spec: '450g / 90 Servicios',
    photo: './media/web_6.jpg',
    actionText: 'Consultar dosis'
  },
  {
    id: 'prod-2',
    name: 'Whey Protein Isolate',
    brand: 'Nutrex Research',
    badge: 'Aislado Premium',
    spec: '25g Proteína / 0g Azúcar',
    photo: './media/web_3.jpg',
    actionText: 'Ver sabores'
  },
  {
    id: 'prod-3',
    name: 'Naughty Boy Energy',
    brand: 'Naughty Boy Lifestyle',
    badge: 'Pre-Workout Pro',
    spec: 'Enfoque & Vasodilatación',
    photo: './media/web_21.jpg',
    actionText: 'Consultar stock'
  },
  {
    id: 'prod-4',
    name: 'Pure Creatine 300g',
    brand: 'GAT Sport',
    badge: 'Fuerza ATP',
    spec: '5g Monohidrato Micronizado',
    photo: './media/web_10.jpg',
    actionText: 'Pedir por WhatsApp'
  },
  {
    id: 'prod-5',
    name: 'Total Voltage Formula',
    brand: 'Voltage Nutrition',
    badge: 'Energía Explosiva',
    spec: 'Potencia Neurosensorial',
    photo: './media/web_24.jpg',
    actionText: 'Consultar disponibilidad'
  }
];

// Anti-card discipline index items for HoverPreviewList
const DISCIPLINE_ITEMS = [
  {
    id: 'disc-1',
    number: '01',
    title: 'Suplementación Deportiva',
    meta: 'Original 100% · Marcas Internacionales',
    description: 'Proteínas whey, creatinas micronizadas, pre-entrenos y aminoácidos originales.',
    photo: './media/web_18.jpg',
    caption: 'Fórmulas puras certificadas de distribución oficial.'
  },
  {
    id: 'disc-2',
    number: '02',
    title: 'Accesorios & Equipo Pro',
    meta: 'Alta Resistencia · Grado Gimnasio',
    description: 'Manerales de acero, agarres metálicos, cuerdas para polea y shakers herméticos.',
    photo: './media/web_22.jpg',
    caption: 'Herramientas de agarre construidas para entrenamiento pesado continuo.'
  },
  {
    id: 'disc-3',
    number: '03',
    title: 'Snacks & Recuperación',
    meta: 'Energía Limpia · Cero Grasas Trans',
    description: 'Barras proteicas y opciones nutricionales rápidas para complementar tu sesión.',
    photo: './media/web_20.jpg',
    caption: 'Aporte de nutrientes inmediato post-entreno en cualquier lugar.'
  },
  {
    id: 'disc-4',
    number: '04',
    title: 'Texturas & Pureza',
    meta: 'Micronizado · Solubilidad Inmediata',
    description: 'Suplementos sin grumos, sin rellenos y con rápida tasa de asimilación muscular.',
    photo: './media/web_16.jpg',
    caption: 'Cada lote es inspeccionado para asegurar máxima solubilidad y pureza.'
  }
];

// Protocols by Goal (Program Schedule)
const PROTOCOLS = [
  {
    id: 'volumen',
    tab: '01 / Volumen',
    title: 'Fase de Hipertrofia & Masa',
    target: 'Superar estancamiento calórico y generar masa muscular sólida.',
    combo: 'Mutant Mass 2500 + Creatina Naughty Boy',
    points: [
      'Excedente energético limpio sin picos glicémicos agresivos.',
      'Saturación de fosfocreatina para sostener cargas progresivas.',
      'Asesoría en dosificación según tu peso y tasa metabólica.'
    ],
    photo: './media/web_18.jpg'
  },
  {
    id: 'fuerza',
    tab: '02 / Fuerza',
    title: 'Fuerza Máxima & ATP',
    target: 'Incrementar potencia celular y recuperación inter-series.',
    combo: 'Creatina Micronizada Pura + Aminoácidos Esenciales',
    points: [
      'Resíntesis rápida de ATP en esfuerzos de alta intensidad.',
      'Cero retención extracelular molesta gracias a su micronizado.',
      'Rendimiento constante de 60 a 90 servicios por envase.'
    ],
    photo: './media/web_6.jpg'
  },
  {
    id: 'energia',
    tab: '03 / Enfoque',
    title: 'Energía & Pre-Entrenamiento',
    target: 'Maximizar vasodilatación muscular y concentración mental sostenida.',
    combo: 'Naughty Boy Energy / Total Voltage',
    points: [
      'Estimulación controlada sin choque de fatiga posterior.',
      'Mayor flujo sanguíneo y oxigenación celular durante la serie.',
      'Dosis exactas para entrenamientos de máxima exigencia.'
    ],
    photo: './media/web_24.jpg'
  },
  {
    id: 'articular',
    tab: '04 / Resistencia',
    title: 'Salud Articular & Equipo',
    target: 'Proteger tendones, mejorar el agarre y evitar sobrecargas.',
    combo: 'Agarres Metálicos Pro + Colágeno Hidrolizado',
    points: [
      'Manerales y cuerdas de alta fricción para proteger las muñecas.',
      'Soporte directo para tendones y articulaciones bajo tensión.',
      'Accesorios duraderos testeados en centros de rendimiento.'
    ],
    photo: './media/web_1.jpg'
  }
];

// Verified FAQs from brief
const FAQS = [
  {
    question: '¿Son productos 100% originales?',
    answer:
      'Sí. Suplementos 100% originales, directo de fábrica. Distribuidores oficiales de Naughty Boy Lifestyle.'
  },
  {
    question: '¿Hacen envíos al interior del país?',
    answer:
      'Sí. Entrega rápida en Santo Domingo y envíos a todas las provincias.'
  },
  {
    question: '¿Tienen tienda física para visitar?',
    answer:
      'Sí. Calle La Esperilla #2, San Juan Bosco, detrás del Centro Médico Otorrino.'
  }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeProtocol, setActiveProtocol] = useState(PROTOCOLS[0]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      {/* 2px Hairline Progress Bar */}
      <ScrollProgressBar color="var(--accent)" />

      {/* ===================================================================
          Navigation Header
          =================================================================== */}
      <header className={`mfm-header ${scrolled ? 'mfm-header--scrolled' : ''}`}>
        <div className="mfm-container">
          <div className="mfm-nav-wrap">
            <a href="#" className="mfm-brand" aria-label="MFM Store Home">
              <img
                src="./media/logo_clean.png"
                alt="MFM Store"
                className="mfm-brand-logo"
              />
              <span className="mfm-brand-name">MFM STORE</span>
              <span className="mfm-brand-sub">Santo Domingo · R.D.</span>
            </a>

            <nav aria-label="Navegación principal">
              <ul className="mfm-nav-links">
                <li>
                  <a href="#showcase" className="mfm-nav-link craft-link-underline">
                    Productos
                  </a>
                </li>
                <li>
                  <a href="#disciplinas" className="mfm-nav-link craft-link-underline">
                    Categorías
                  </a>
                </li>
                <li>
                  <a href="#protocolos" className="mfm-nav-link craft-link-underline">
                    Objetivos
                  </a>
                </li>
                <li>
                  <a href="#autenticidad" className="mfm-nav-link craft-link-underline">
                    Garantía
                  </a>
                </li>
                <li>
                  <a href="#sede" className="mfm-nav-link craft-link-underline">
                    Ubicación
                  </a>
                </li>
              </ul>
            </nav>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div className="mfm-header-cta">
                <MagneticButton
                  variant="primary"
                  href={WHATSAPP_URL}
                  target="_blank"
                  style={{ padding: '12px 26px', minHeight: 48, fontSize: '0.9rem' }}
                >
                  Pedir por WhatsApp
                </MagneticButton>
              </div>

              <button
                type="button"
                className="mfm-mobile-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mfm-mobile-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mfm-mobile-drawer__top">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <img
                  src="./media/logo_clean.png"
                  alt="MFM Store"
                  style={{ height: 32, width: 'auto' }}
                />
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                  MFM STORE
                </span>
              </div>
              <button
                type="button"
                onClick={closeMenu}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  cursor: 'pointer',
                  padding: 8
                }}
                aria-label="Cerrar menú"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mfm-mobile-drawer__nav">
              <a
                href="#showcase"
                className="mfm-mobile-drawer__link"
                onClick={closeMenu}
              >
                Productos
                <ArrowUpRight size={22} style={{ opacity: 0.4 }} />
              </a>
              <a
                href="#disciplinas"
                className="mfm-mobile-drawer__link"
                onClick={closeMenu}
              >
                Categorías
                <ArrowUpRight size={22} style={{ opacity: 0.4 }} />
              </a>
              <a
                href="#protocolos"
                className="mfm-mobile-drawer__link"
                onClick={closeMenu}
              >
                Objetivos
                <ArrowUpRight size={22} style={{ opacity: 0.4 }} />
              </a>
              <a
                href="#autenticidad"
                className="mfm-mobile-drawer__link"
                onClick={closeMenu}
              >
                Garantía
                <ArrowUpRight size={22} style={{ opacity: 0.4 }} />
              </a>
              <a
                href="#sede"
                className="mfm-mobile-drawer__link"
                onClick={closeMenu}
              >
                Ubicación
                <ArrowUpRight size={22} style={{ opacity: 0.4 }} />
              </a>
            </div>

            <div style={{ paddingTop: 24, borderTop: '1px solid var(--border-hairline)' }}>
              <MagneticButton
                variant="primary"
                href={WHATSAPP_URL}
                target="_blank"
                style={{ width: '100%' }}
              >
                Escribir a WhatsApp
              </MagneticButton>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginTop: 18,
                  fontSize: '0.84rem',
                  color: 'var(--text-muted)'
                }}
              >
                <MapPin size={16} color="var(--accent)" />
                <span>San Juan Bosco, Santo Domingo</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* ===================================================================
            SECTION 1: HERO CINEMATIC (Full-Bleed Nocturnal Performance)
            Atmosphere: Caucho negro mate, acero cepillado y luz de neón azul
            =================================================================== */}
        <EditorialSurface
          id="hero"
          variant="mesh"
          tone="primary"
          style={{
            minHeight: '100svh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            paddingTop: 'clamp(90px, 12vh, 130px)',
            paddingBottom: 'clamp(44px, 6vh, 72px)',
            position: 'relative'
          }}
        >
          {/* Background Cinematic Visual with Scrim */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 0,
              overflow: 'hidden'
            }}
          >
            <img
              src="./media/web_1.jpg"
              alt="MFM Store Performance"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 42%',
                opacity: 0.42,
                filter: 'brightness(0.72) contrast(1.15)'
              }}
            />
            {/* Scrim calibrated for WCAG AA contrast */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.92) 85%, #000000 100%)'
              }}
            />
          </div>

          <div className="mfm-container" style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ maxWidth: 880 }}>
              {/* Monumental Hero Headline (6 words max, sentence case, 600 weight) */}
              <RevealText
                as="h1"
                immediate
                style={{
                  color: '#ffffff',
                  marginBottom: 'clamp(14px, 2.5vw, 22px)'
                }}
              >
                Suplementos que impulsan tu cambio
              </RevealText>

              {/* Hero Subtitle (1 single phrase, <= 12 words) */}
              <p
                style={{
                  fontSize: 'clamp(1.05rem, 1.8vw, 1.3rem)',
                  lineHeight: 1.45,
                  color: 'rgba(255, 255, 255, 0.85)',
                  maxWidth: 760,
                  marginBottom: 'clamp(28px, 4vw, 40px)'
                }}
              >
                Nutrición deportiva original y asesoría experta en Santo Domingo.
              </p>

              {/* CTAs */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  flexWrap: 'wrap'
                }}
              >
                <MagneticButton variant="primary" href={WHATSAPP_URL} target="_blank">
                  Consultar catálogo
                </MagneticButton>
                <MagneticButton variant="secondary" href="#showcase">
                  Ver productos
                </MagneticButton>
              </div>
            </div>
          </div>
        </EditorialSurface>

        {/* ===================================================================
            SECTION 2: THE SIGNATURE MOMENT
            Marquesina infinita con beneficios cruzando galería 3D cenital
            variant="ambient" tone="secondary"
            =================================================================== */}
        <EditorialSurface
          id="showcase"
          variant="ambient"
          tone="secondary"
          className="mfm-section-pad"
        >
          <div className="mfm-container--wide">
            {/* Top Infinite Marquee */}
            <div style={{ marginBottom: 'clamp(32px, 5vw, 54px)' }}>
              <EditorialMarquee
                items={[
                  'Creatina 100% Micronizada',
                  '0% Rellenos Adulterados',
                  'Proteína Whey Aislada',
                  'Fórmulas Clínicamente Dosificadas',
                  'Entrega Express en Todo el País',
                  'Garantía Oficial de Origen'
                ]}
                durationSeconds={26}
                separator="·"
              />
            </div>

            {/* Section Header */}
            <div className="mfm-container" style={{ paddingLeft: 0, paddingRight: 0, marginBottom: 36 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 16
                }}
              >
                <div>
                  <RevealText as="h2">Rendimiento sin concesiones</RevealText>
                  <p style={{ marginTop: 8, maxWidth: 440 }}>
                    Productos originales, directo de distribuidores oficiales.
                  </p>
                </div>
              </div>
            </div>

            {/* Horizontal Showcase with Zenith 3D Cards */}
            <HorizontalShowcase
              items={ZENITH_PRODUCTS}
              renderItem={(product) => (
                <div
                  className="mfm-zenith-card"
                  style={{ width: 'clamp(280px, 32vw, 360px)' }}
                >
                  <div className="mfm-zenith-card__img-wrap">
                    <img
                      src={product.photo}
                      alt={product.name}
                      className="mfm-zenith-card__img"
                      loading="lazy"
                    />
                  </div>

                  <div className="mfm-zenith-card__title">{product.name}</div>
                  <div style={{ fontSize: '0.86rem', color: 'rgba(255, 255, 255, 0.72)', marginBottom: 4 }}>
                    {product.brand}
                  </div>
                  <div className="mfm-zenith-card__spec">{product.spec}</div>

                  <div className="mfm-zenith-card__footer">
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Asesoría gratis
                    </span>
                    <a
                      href={`https://wa.me/18099953799?text=Hola%2C%20me%20interesa%20informaci%C3%B3n%20sobre%20${encodeURIComponent(
                        product.name + ' - ' + product.brand
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="craft-link-underline"
                      style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 500 }}
                    >
                      {product.actionText}
                      <ArrowUpRight size={15} />
                    </a>
                  </div>
                </div>
              )}
            />

            {/* Bottom Infinite Marquee (Reverse Flow) */}
            <div style={{ marginTop: 'clamp(32px, 5vw, 54px)' }}>
              <EditorialMarquee
                items={[
                  'Santo Domingo',
                  'Distrito Nacional',
                  'San Juan Bosco',
                  'Envíos Seguros a Todo R.D.',
                  'Asesoría de Suplementación',
                  'Marcas Internacionales'
                ]}
                durationSeconds={32}
                separator="—"
              />
            </div>
          </div>
        </EditorialSurface>

        {/* ===================================================================
            SECTION 3: DISCIPLINAS & CATEGORÍAS (Anti-Card HoverPreviewList)
            Band with High Contrast Polar Shift
            variant="contrast" tone="contrast"
            =================================================================== */}
        <EditorialSurface
          id="disciplinas"
          variant="contrast"
          tone="contrast"
          className="mfm-section-pad"
        >
          <div className="mfm-container">
            <div style={{ maxWidth: 680, marginBottom: 'clamp(36px, 5vw, 56px)' }}>
              <RevealText as="h2">Líneas de entrenamiento</RevealText>
              <p
                style={{
                  color: 'var(--text-on-contrast)',
                  opacity: 0.76,
                  marginTop: 10,
                  maxWidth: 480
                }}
              >
                Suplementos y equipo, seleccionados para entrenar.
              </p>
            </div>

            {/* Anti-Card Hover Preview List */}
            <HoverPreviewList items={DISCIPLINE_ITEMS} aspectRatio="4 / 5" />
          </div>
        </EditorialSurface>

        {/* ===================================================================
            SECTION 4: PROTOCOLOS POR OBJETIVO (Program Schedule)
            Sticky Split with Interactive Tab Switcher
            variant="architectural" tone="primary"
            =================================================================== */}
        <EditorialSurface
          id="protocolos"
          variant="architectural"
          tone="primary"
          className="mfm-section-pad"
        >
          <div className="mfm-container">
            <div style={{ marginBottom: 'clamp(32px, 4vw, 48px)' }}>
              <RevealText as="h2">Protocolos por objetivo</RevealText>
              <p style={{ marginTop: 8, maxWidth: 500 }}>
                Tu suplementación, según tu meta.
              </p>

              {/* Tab Selector */}
              <div style={{ marginTop: 24 }}>
                <div className="mfm-tab-bar" role="tablist">
                  {PROTOCOLS.map((proto) => (
                    <button
                      key={proto.id}
                      type="button"
                      role="tab"
                      aria-selected={activeProtocol.id === proto.id}
                      className={`mfm-tab-btn ${
                        activeProtocol.id === proto.id ? 'is-active' : ''
                      }`}
                      onClick={() => setActiveProtocol(proto)}
                    >
                      {proto.tab}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky Split with Protocol Specs and Real Media */}
            <StickyEditorialSplit
              ratio="55/45"
              pinned={
                <div style={{ position: 'relative' }}>
                  <ClipRevealImage
                    key={activeProtocol.photo}
                    src={activeProtocol.photo}
                    alt={activeProtocol.title}
                    aspectRatio="4 / 3"
                    parallax
                  />
                </div>
              }
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <h3 style={{ color: '#ffffff', marginBottom: 10 }}>
                    {activeProtocol.title}
                  </h3>
                  <p style={{ fontSize: '1.05rem', color: '#ffffff', opacity: 0.9 }}>
                    {activeProtocol.target}
                  </p>
                </div>

                <div
                  style={{
                    padding: '18px 0',
                    borderTop: '1px solid var(--border-hairline)',
                    borderBottom: '1px solid var(--border-hairline)'
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.76rem',
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      marginBottom: 8
                    }}
                  >
                    Stack Recomendado
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.15rem',
                      fontWeight: 600,
                      color: '#ffffff'
                    }}
                  >
                    {activeProtocol.combo}
                  </div>
                </div>

                <ul
                  style={{
                    listStyle: 'none',
                    margin: 0,
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12
                  }}
                >
                  {activeProtocol.points.map((point, idx) => (
                    <li
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 12,
                        fontSize: '0.94rem',
                        lineHeight: 1.5,
                        color: 'var(--text-muted)'
                      }}
                    >
                      <span aria-hidden="true" style={{ flexShrink: 0, width: 18, height: 1, background: 'var(--accent)', marginTop: 11 }} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div style={{ paddingTop: 12 }}>
                  <MagneticButton
                    variant="primary"
                    href={`https://wa.me/18099953799?text=Hola%2C%20quiero%20asesor%C3%ADa%20sobre%20el%20protocolo%20de%20${encodeURIComponent(
                      activeProtocol.title
                    )}.`}
                    target="_blank"
                  >
                    Solicitar protocolo
                  </MagneticButton>
                </div>
              </div>
            </StickyEditorialSplit>
          </div>
        </EditorialSurface>

        {/* ===================================================================
            SECTION 5: AUTENTICIDAD & PREGUNTAS CLAVE
            CounterMetrics + Accordion
            variant="ambient" tone="secondary"
            =================================================================== */}
        <EditorialSurface
          id="autenticidad"
          variant="ambient"
          tone="secondary"
          className="mfm-section-pad"
        >
          <div className="mfm-container">
            {/* Top Verified Metrics */}
            <div style={{ maxWidth: 640 }}>
              <RevealText as="h2">Autenticidad comprobada</RevealText>
              <p style={{ marginTop: 10, maxWidth: 500 }}>
                Cero réplicas. Solo producto original.
              </p>
            </div>

            <div className="mfm-metrics-grid">
              <CounterMetric
                value="182K"
                label="Seguidores"
                note="En redes"
              />
              <CounterMetric
                value="4.9 ★"
                label="Calificación Google"
                note="Reseñas de clientes"
              />
              <CounterMetric
                value="1,163"
                label="Productos"
                note="Entregas registradas"
              />
            </div>

            {/* Split Statement & FAQ Accordion */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 'clamp(36px, 6vw, 72px)',
                marginTop: 'clamp(48px, 7vw, 80px)',
                alignItems: 'start'
              }}
            >
              <div>
                <blockquote
                  style={{
                    margin: 0,
                    padding: 0,
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.35rem, 2.4vw, 2.1rem)',
                    lineHeight: 1.25,
                    fontWeight: 500,
                    letterSpacing: '-0.02em',
                    color: '#ffffff'
                  }}
                >
                  "Sin atajos ni imitaciones. Solo lo que usaríamos nosotros."
                </blockquote>

                <div style={{ marginTop: 32 }}>
                  <ClipRevealImage
                    src="./media/web_23.jpg"
                    alt="MFM Store Originalidad"
                    aspectRatio="16 / 9"
                    radius="var(--radius-media)"
                  />
                </div>
              </div>

              <div>
                <EditorialAccordion items={FAQS} defaultOpen={0} />
              </div>
            </div>
          </div>
        </EditorialSurface>

        {/* ===================================================================
            SECTION 6: SEDE SAN JUAN BOSCO & CIERRE
            Location Experience Split + Final Conversion
            variant="mesh" tone="primary"
            =================================================================== */}
        <EditorialSurface
          id="sede"
          variant="mesh"
          tone="primary"
          className="mfm-section-pad"
        >
          <div className="mfm-container">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 'clamp(36px, 5vw, 64px)',
                alignItems: 'center'
              }}
            >
              {/* Left: Location & Details */}
              <div>
                <RevealText as="h2">Sede San Juan Bosco</RevealText>
                <p style={{ marginTop: 12, maxWidth: 480 }}>
                  Visítanos o pide con entrega a domicilio.
                </p>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 18,
                    marginTop: 28,
                    paddingTop: 24,
                    borderTop: '1px solid var(--border-hairline)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <MapPin size={20} color="var(--accent)" style={{ flexShrink: 0, marginTop: 3 }} />
                    <div>
                      <div style={{ fontWeight: 600, color: '#ffffff', marginBottom: 2 }}>
                        Dirección Física
                      </div>
                      <div style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                        Calle La Esperilla #2, San Juan Bosco (Detrás del Centro Médico Otorrino), Santo Domingo, D.N.
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <Phone size={20} color="var(--accent)" style={{ flexShrink: 0, marginTop: 3 }} />
                    <div>
                      <div style={{ fontWeight: 600, color: '#ffffff', marginBottom: 2 }}>
                        WhatsApp Directo
                      </div>
                      <div style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                        809-995-3799
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <Instagram size={20} color="var(--accent)" style={{ flexShrink: 0, marginTop: 3 }} />
                    <div>
                      <div style={{ fontWeight: 600, color: '#ffffff', marginBottom: 2 }}>
                        Instagram Oficial
                      </div>
                      <a
                        href={INSTAGRAM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="craft-link-underline"
                        style={{ fontSize: '0.92rem', color: 'var(--accent)' }}
                      >
                        @mfmstorerd
                      </a>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: 32, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <MagneticButton variant="primary" href={WHATSAPP_URL} target="_blank">
                    Hablar con asesor
                  </MagneticButton>
                  <MagneticButton
                    variant="secondary"
                    href={INSTAGRAM_URL}
                    target="_blank"
                  >
                    Ver Instagram
                  </MagneticButton>
                </div>
              </div>

              {/* Right: Real Editorial Frame */}
              <div>
                <ClipRevealImage
                  src="./media/web_7.jpg"
                  alt="MFM Store Energy & Community"
                  aspectRatio="4 / 3"
                  parallax
                />
              </div>
            </div>

            {/* Giant Monospaced/Display Watermark */}
            <div className="mfm-watermark" aria-hidden="true">
              MFM STORE
            </div>
          </div>
        </EditorialSurface>
      </main>

      {/* ===================================================================
          Editorial Footer
          =================================================================== */}
      <footer
        style={{
          borderTop: '1px solid var(--border-hairline)',
          backgroundColor: '#000000',
          paddingTop: 48,
          paddingBottom: 48
        }}
      >
        <div className="mfm-container">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 24
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <img
                src="./media/logo_clean.png"
                alt="MFM Store"
                style={{ height: 28, width: 'auto' }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '1rem',
                  letterSpacing: '-0.01em'
                }}
              >
                MFM STORE
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 28,
                flexWrap: 'wrap',
                fontSize: '0.88rem'
              }}
            >
              <a href="#hero" className="craft-link-underline" style={{ color: 'var(--text-muted)' }}>
                Inicio
              </a>
              <a href="#showcase" className="craft-link-underline" style={{ color: 'var(--text-muted)' }}>
                Productos
              </a>
              <a href="#disciplinas" className="craft-link-underline" style={{ color: 'var(--text-muted)' }}>
                Categorías
              </a>
              <a href="#protocolos" className="craft-link-underline" style={{ color: 'var(--text-muted)' }}>
                Objetivos
              </a>
              <a href="#sede" className="craft-link-underline" style={{ color: 'var(--text-muted)' }}>
                Ubicación
              </a>
            </div>

            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                color: 'var(--text-muted)'
              }}
            >
              © {new Date().getFullYear()} MFM Store. Santo Domingo, R.D.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
