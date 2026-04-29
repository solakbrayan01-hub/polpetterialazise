import { useState, useEffect, Suspense } from 'react'
import StepIcon from './components/StepIcon'
import CustomCursor from './components/CustomCursor'
import ErrorBoundary from './components/ErrorBoundary'
import IngredienteIllustration from './components/IngredienteIllustration'
import HeroIllustration from './components/HeroIllustration'
import OpenStatus from './components/OpenStatus'
import Cartoline from './components/Cartoline'
import Carrello from './components/Carrello'
import CallFab from './components/CallFab'
import useScrollReveal from './components/useScrollReveal'

const MENU = {
  classiche: [
    { id: 'nonna', name: "La Nonna Maria", ital: "", desc: "Manzo di razza Rendena, pane raffermo, parmigiano 24 mesi, prezzemolo del nostro orto. Sugo di pomodoro San Marzano cotto sei ore.", price: "€ 2.50/cad", priceVal: 2.50, tags: ['house'] },
    { id: 'bianca', name: "Polpetta", ital: "Bianca", desc: "Vitello, ricotta di malga, scorza di limone del Garda, mandorle tostate. Salsa di burro e salvia.", price: "€ 3.00/cad", priceVal: 3.00, tags: [] },
    { id: 'diavola', name: "Diavola", ital: "del Lago", desc: "Maiale, 'nduja calabra, peperoncino, finocchietto selvatico. Per chi non ha paura.", price: "€ 2.80/cad", priceVal: 2.80, tags: ['spicy'] },
    { id: 'tonno', name: "Tonno", ital: "& Capperi", desc: "Tonno dell'Adriatico, capperi di Pantelleria, olive taggiasche, pinoli. Su crema di patate.", price: "€ 3.20/cad", priceVal: 3.20, tags: [] },
  ],
  vegetariane: [
    { id: 'melanzana', name: "Melanzana", ital: "Affumicata", desc: "Melanzana grigliata, scamorza, basilico genovese, pomodoro confit. Croccante fuori, morbida dentro.", price: "€ 2.50/cad", priceVal: 2.50, tags: ['veggie'] },
    { id: 'zucca', name: "Zucca", ital: "& Amaretto", desc: "Zucca mantovana arrostita, amaretti, mostarda, parmigiano. Una poesia d'autunno tutto l'anno.", price: "€ 2.60/cad", priceVal: 2.60, tags: ['veggie'] },
    { id: 'cacio', name: "Cacio", ital: "& Pepe", desc: "Pecorino romano stagionato, pepe Tellicherry, pangrattato all'olio. Roma incontra Lazise.", price: "€ 2.80/cad", priceVal: 2.80, tags: ['veggie', 'house'] },
    { id: 'funghi', name: "Funghi", ital: "del Baldo", desc: "Porcini freschi (in stagione) o secchi, ricotta, timo, nocciole. Profumo di bosco.", price: "€ 3.20/cad", priceVal: 3.20, tags: ['veggie'] },
  ],
  speciali: [
    { id: 'pescatore', name: "Polpetta", ital: "del Pescatore", desc: "Persico del Garda, patate, prezzemolo, scorza di limone. Sugo leggero al pomodoro fresco.", price: "€ 3.50/cad", priceVal: 3.50, tags: ['house'] },
    { id: 'cervo', name: "Cervo", ital: "& Mirtilli", desc: "Cervo della Lessinia, mirtilli, ginepro, vino rosso ridotto. Selvaggia e raffinata.", price: "€ 3.80/cad", priceVal: 3.80, tags: [] },
    { id: 'veneziana', name: "Polpetta", ital: "Veneziana", desc: "Sarde in saor reinterpretate: sarde, cipolla, uvetta, pinoli. Aceto di mele invecchiato.", price: "€ 3.20/cad", priceVal: 3.20, tags: ['house'] },
    { id: 'mix', name: "Mix", ital: "del Mò'", desc: "Tre polpette miste a tua scelta, in vaschetta. La via di mezzo perfetta.", price: "€ 9.00", priceVal: 9.00, tags: ['house'] },
  ]
}

const INGREDIENTI = [
  { num: '01', name: 'Manzo Rendena', origin: 'Val Rendena, Trentino', desc: "Razza autoctona delle Alpi italiane, allevata al pascolo a oltre 1000 metri. Carne magra, dolce, dal sapore inconfondibile. Lavoriamo solo tagli scelti, macinati al momento." },
  { num: '02', name: 'Pomodoro San Marzano', origin: 'Agro Sarnese-Nocerino, Campania', desc: "DOP, raccolto a mano a piena maturazione. Lo cuociamo lentamente per sei ore con basilico, aglio nuovo e olio EVO. Il sugo è l'anima della polpetta." },
  { num: '03', name: 'Olio EVO del Garda', origin: 'Cisano di Bardolino', desc: "Frantoio a due chilometri da noi. Cultivar Casaliva e Frantoio. Spremitura a freddo entro tre ore dalla raccolta. Profumo di mandorla, finale leggermente piccante." },
  { num: '04', name: 'Parmigiano 24 mesi', origin: 'Reggio Emilia', desc: "Da una piccola latteria di montagna. Stagionatura naturale, granulosità perfetta, persistenza lunga. Lo grattugiamo all'ordine — mai prima." },
  { num: '05', name: 'Pane di Lazise', origin: 'Forno Bonometti, Lazise', desc: "Pasta madre viva. Il pane raffermo del giorno prima, ammollato nel latte intero, dà alle nostre polpette quella morbidezza unica." },
  { num: '06', name: 'Erbe del nostro orto', origin: 'Dietro al locale', desc: "Prezzemolo, basilico, timo, salvia, rosmarino. Coltivati senza chimica, raccolti la mattina. Tutto quello che entra nelle polpette nasce a pochi metri dalla cucina." },
]

const PROCESSO = [
  { num: '01', icon: 'macinatore', title: 'Si macina', desc: "Carne fresca, macinata a grana media tutte le mattine. Niente preparati, niente surgelati." },
  { num: '02', icon: 'impasto', title: 'Si impasta', desc: "A mano, con pane ammollato nel latte, parmigiano, uovo, erbe dell'orto. Senza fretta." },
  { num: '03', icon: 'pentola', title: 'Si cuoce', desc: "Rosolata in padella, poi affogata nel sugo che borbotta da sei ore. Fuoco basso, pazienza alta." },
  { num: '04', icon: 'servita', title: 'Si infilza', desc: "Su uno stuzzicadenti, servita calda nel piattino di carta. Pronta da mangiare ovunque tu sia." },
]

export default function App() {
  const [activeMenu, setActiveMenu] = useState('classiche')
  const [activeIngrediente, setActiveIngrediente] = useState(0)
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState([])

  useScrollReveal()

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(t)
  }, [])

  function addToCart(item) {
    setCart((prev) => {
      const found = prev.find((p) => p.id === item.id)
      if (found) {
        return prev.map((p) => p.id === item.id ? { ...p, qty: p.qty + 1 } : p)
      }
      return [...prev, {
        id: item.id,
        fullName: item.ital ? `${item.name} ${item.ital}` : item.name,
        priceVal: item.priceVal,
        qty: 1,
      }]
    })
  }

  function changeQty(id, qty) {
    setCart((prev) => {
      if (qty <= 0) return prev.filter((p) => p.id !== id)
      return prev.map((p) => p.id === id ? { ...p, qty } : p)
    })
  }

  function clearCart() {
    setCart([])
  }

  return (
    <>
      <div className={`loader ${!loading ? 'hidden' : ''}`}>
        <div className="loader-inner">
          <div className="loader-circle" />
          <div className="loader-text">stiamo impastando…</div>
        </div>
      </div>

      <CustomCursor />

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-left">
          <div className="nav-logo">
            <div className="logo-mark" />
            <div className="logo-text">
              La Polpetteria<strong>di Lazise</strong>
            </div>
          </div>
          <OpenStatus />
        </div>
        <div className="nav-links">
          <a href="#come-funziona">Come funziona</a>
          <a href="#menu">Menù</a>
          <a href="#processo">Come si fa</a>
          <a href="#ingredienti">Ingredienti</a>
          <a href="#contatti">Contatti</a>
        </div>
        <a href="tel:+393711141745" className="nav-cta">
          ☎ Ordina
        </a>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg-text">polpette</div>

        <div className="hero-content">
          <div className="hero-eyebrow fade-up visible">
            Lazise · Lago di Garda · dal 2017
          </div>
          <h1 className="hero-title fade-up visible delay-1">
            <span className="accent">Polpette</span><br />
            da passeggio,<br />
            <span className="scribble">— sul lago.</span>
          </h1>
          <p className="hero-subtitle fade-up visible delay-2">
            Niente tavoli, niente fretta. Le nostre polpette si mangiano camminando
            per le vie di Lazise, sul lungolago, o te le porti a casa
            (o in camping). Le facciamo, le infilziamo, te le diamo calde.
          </p>

          <div className="hero-pills fade-up visible delay-2">
            <span className="hero-pill"><span className="pill-dot" /> Take-away</span>
            <span className="hero-pill"><span className="pill-dot" /> 15 ricette</span>
            <span className="hero-pill"><span className="pill-dot" /> Lazise (VR)</span>
          </div>

          <div className="hero-cta fade-up visible delay-3">
            <a href="tel:+393711141745" className="btn-primary">
              <span>☎ Ordina al telefono</span>
            </a>
            <button className="btn-secondary" onClick={() => document.getElementById('menu').scrollIntoView()}>
              Sfoglia il menù
            </button>
          </div>
        </div>

        <div className="hero-3d">
          <ErrorBoundary>
            <HeroIllustration />
          </ErrorBoundary>
          <div className="hero-3d-label">
            servite così,<br />su stuzzicadenti
          </div>
        </div>

        <div className="hero-meta">
          <span><strong>15</strong> polpette</span>
          <span><strong>6h</strong> di sugo</span>
          <span>aperti tutti i giorni</span>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-track">
          <span>polpette da passeggio <span className="dot" /></span>
          <span>fatte a mano <span className="dot" /></span>
          <span>servite calde <span className="dot" /></span>
          <span>ottime anche il giorno dopo <span className="dot" /></span>
          <span>chiama e ritira <span className="dot" /></span>
          <span>polpette da passeggio <span className="dot" /></span>
          <span>fatte a mano <span className="dot" /></span>
          <span>servite calde <span className="dot" /></span>
          <span>ottime anche il giorno dopo <span className="dot" /></span>
          <span>chiama e ritira <span className="dot" /></span>
        </div>
      </div>

      {/* COME FUNZIONA — sezione chiave del concept */}
      <section className="come-funziona" id="come-funziona">
        <div className="come-funziona-header">
          <h2 className="fade-up">
            Tre modi per <em>godertele.</em>
          </h2>
          <p className="fade-up delay-1">
            Da noi non c'è il cameriere, non c'è la prenotazione, non c'è il conto col coperto.
            C'è una vetrina, un piattino, e tu che decidi dove mangiarle.
          </p>
        </div>

        <div className="modi-grid">
          <div className="modo fade-up">
            <div className="modo-num">01</div>
            <div className="modo-icon">
              {/* persona che cammina */}
              <svg viewBox="0 0 60 60">
                <circle cx="30" cy="14" r="5" />
                <path d="M30 19 L30 35 M30 35 L24 50 M30 35 L36 48 M30 24 L22 32 M30 24 L40 30" />
              </svg>
            </div>
            <span className="modo-tag">In passeggiata</span>
            <h3>Le mangi <em>a piedi</em>, sul lungolago.</h3>
            <p>
              Ti fermi davanti alla vetrina, scegli, paghi, parti. In meno di tre minuti
              hai un piattino caldo in mano e il lago davanti. Il modo più antico — e più bello — di
              mangiare a Lazise.
            </p>
            <div className="modo-detail">Servizio rapido al banco</div>
          </div>

          <div className="modo fade-up delay-1">
            <div className="modo-num">02</div>
            <div className="modo-icon">
              {/* telefono / cornetta */}
              <svg viewBox="0 0 60 60">
                <path d="M14 14 L14 22 C14 38, 22 46, 38 46 L46 46 L46 38 L40 35 L36 39 C30 36, 24 30, 21 24 L25 20 L22 14 L14 14 Z" />
              </svg>
            </div>
            <span className="modo-tag">Chiama e ritira</span>
            <h3>Le ordini al <em>telefono</em>, passi a prenderle.</h3>
            <p>
              Sei in camping, in casa vacanza, o semplicemente non vuoi aspettare?
              Chiama, dicci quante e quali, e quando arrivi è tutto pronto.
              Confezionato per il viaggio, da scaldare a casa o mangiare subito.
            </p>
            <div className="modo-detail">Pronto in 20 minuti</div>
          </div>

          <div className="modo fade-up delay-2">
            <div className="modo-num">03</div>
            <div className="modo-icon">
              {/* scatola/asporto */}
              <svg viewBox="0 0 60 60">
                <path d="M10 20 L30 12 L50 20 L50 46 L30 54 L10 46 Z" />
                <path d="M10 20 L30 28 L50 20 M30 28 L30 54" />
              </svg>
            </div>
            <span className="modo-tag">Take-away</span>
            <h3>Te le <em>porti via</em>, le mangi anche domani.</h3>
            <p>
              Le nostre polpette sono buone calde, ottime anche tiepide,
              e dopo una notte in frigo stanno ancora meglio. Confezione termica
              per il trasporto. Istruzioni per riscaldarle dentro la scatola.
            </p>
            <div className="modo-detail">Si conservano 2 giorni in frigo</div>
          </div>
        </div>
      </section>

      {/* FILOSOFIA */}
      <section className="section">
        <div className="filosofia">
          <div className="filosofia-image fade-up">
            <div className="filosofia-image-stamp">
              Polpette<br />da passeggio<br />dal 2017
            </div>
            <div className="filosofia-image-label">la polpetta è amore</div>
          </div>

          <div className="filosofia-content">
            <div className="section-label fade-up">Filosofia</div>
            <h2 className="fade-up delay-1">
              Una sola regola: <em>fatte come a casa</em>, ma fatte meglio.
            </h2>
            <p className="fade-up delay-2">
              Abbiamo aperto perché credevamo a un'idea semplice: la polpetta è il
              cibo più democratico che esista. Ti scalda, ti consola, non vuole
              tovaglioli stirati né forchette d'argento. Vuole solo mani pulite,
              uno stuzzicadenti, e magari una panchina sul lago.
            </p>
            <p className="fade-up delay-3">
              Per questo non abbiamo tavoli. Abbiamo una vetrina, una cucina che
              lavora dalle sei del mattino, e quindici ricette che cambiano di
              stagione. Niente fretta in cucina, niente attese fuori.
              Solo polpette, fatte come va fatto.
            </p>
          </div>
        </div>
      </section>

      {/* MENU */}
      <section className="menu-section" id="menu">
        <div className="menu-header">
          <p className="fade-up">La Carta</p>
          <h2 className="fade-up delay-1">
            Le nostre <strong>polpette</strong> <em>quotidiane</em>
          </h2>
        </div>

        <div className="menu-tabs">
          {[
            { id: 'classiche', label: 'Classiche' },
            { id: 'vegetariane', label: 'Vegetariane' },
            { id: 'speciali', label: 'Speciali' },
          ].map((t) => (
            <button
              key={t.id}
              className={`menu-tab ${activeMenu === t.id ? 'active' : ''}`}
              onClick={() => setActiveMenu(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="menu-grid" key={activeMenu}>
          {MENU[activeMenu].map((item, i) => (
            <div className="menu-item fade-up visible" key={item.id} style={{ transitionDelay: `${i * 0.05}s` }}>
              <div className="menu-item-header">
                <div className="menu-item-name">
                  {item.name} {item.ital && <span className="ital">{item.ital}</span>}
                </div>
                <div className="menu-item-dots" />
                <div className="menu-item-price">{item.price}</div>
              </div>
              <div className="menu-item-desc">{item.desc}</div>
              <div className="menu-item-footer">
                {item.tags.length > 0 && (
                  <div className="menu-item-tags">
                    {item.tags.includes('spicy') && <span className="menu-item-tag spicy">piccante</span>}
                    {item.tags.includes('veggie') && <span className="menu-item-tag veggie">veggie</span>}
                    {item.tags.includes('house') && <span className="menu-item-tag house">della casa</span>}
                  </div>
                )}
                <button
                  className="menu-item-add"
                  onClick={() => addToCart(item)}
                  aria-label={`Aggiungi ${item.name} al carrello`}
                >
                  <span aria-hidden="true">+</span> Aggiungi
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Formati di vendita */}
        <div className="menu-formati">
          <div className="menu-formati-title">Come puoi prenderle</div>
          <div className="menu-formati-row">
            <div className="menu-formato">
              <strong>3 polpette</strong>
              piattino da passeggio
            </div>
            <div className="menu-formato">
              <strong>5 polpette</strong>
              vaschetta media
            </div>
            <div className="menu-formato">
              <strong>10+ polpette</strong>
              confezione famiglia
            </div>
          </div>
        </div>
      </section>

      {/* COME SI FA */}
      <section className="processo" id="processo">
        <div className="processo-header">
          <div className="section-label fade-up" style={{ justifyContent: 'center' }}>
            Come la facciamo
          </div>
          <h2 className="fade-up delay-1">
            Quattro passi.<br /><em>Niente di più.</em>
          </h2>
          <p className="fade-up delay-2">
            La nostra ricetta è semplice — ma ogni passaggio fa la differenza.
            Ecco cosa succede dietro la vetrina ogni mattina.
          </p>
        </div>

        <div className="processo-grid">
          {PROCESSO.map((step, i) => (
            <div className="processo-step fade-up" key={step.num} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="processo-step-icon">
                <ErrorBoundary>
                  <Suspense fallback={null}>
                    <StepIcon type={step.icon} />
                  </Suspense>
                </ErrorBoundary>
              </div>
              <span className="processo-step-num">{step.num}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INGREDIENTI */}
      <section className="ingredienti" id="ingredienti">
        <div className="ingredienti-grid">
          <div className="ingredienti-content">
            <div className="section-label fade-up">La Materia</div>
            <h2 className="fade-up delay-1">
              Sei ingredienti.<br /><em>Sei storie.</em>
            </h2>
            <ul className="ingredienti-list">
              {INGREDIENTI.map((ing, i) => (
                <li
                  key={ing.num}
                  className={activeIngrediente === i ? 'active' : ''}
                  onMouseEnter={() => {
                    // Su touch device il mouseenter parte subito prima del click
                    // e fa lampeggiare l'accordion. Lo ignoriamo.
                    if (window.matchMedia('(hover: hover)').matches) {
                      setActiveIngrediente(i)
                    }
                  }}
                  onClick={() => {
                    const isTouch = window.matchMedia('(hover: none)').matches
                    if (isTouch) {
                      setActiveIngrediente(activeIngrediente === i ? -1 : i)
                    } else {
                      setActiveIngrediente(i)
                    }
                  }}
                >
                  <div className="ingredienti-row">
                    <span className="ingredienti-num">{ing.num}</span>
                    <span className="ingredienti-name">{ing.name}</span>
                    <span className="ingredienti-origin">{ing.origin.split(',')[0]}</span>
                    <span className="ingredienti-toggle" aria-hidden="true">
                      {activeIngrediente === i ? '−' : '+'}
                    </span>
                  </div>
                  {/* Pannello accordion che si apre INLINE solo su mobile */}
                  <div className={`ingredienti-accordion ${activeIngrediente === i ? 'open' : ''}`}>
                    <div className="ingredienti-accordion-inner">
                      <div className="ingredienti-accordion-image">
                        <IngredienteIllustration num={ing.num} />
                        <span className="ingredienti-accordion-num-overlay">{ing.num}</span>
                      </div>
                      <div className="ingredienti-accordion-origin">{ing.origin}</div>
                      <p>{ing.desc}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Pannello laterale visibile solo su desktop */}
          <div className="ingredienti-detail" key={activeIngrediente >= 0 ? activeIngrediente : 'none'}>
            {activeIngrediente >= 0 && (
              <>
                <div className="ingredienti-detail-illustration">
                  <IngredienteIllustration num={INGREDIENTI[activeIngrediente].num} />
                </div>
                <div className="ingredienti-detail-num">{INGREDIENTI[activeIngrediente].num}</div>
                <div className="ingredienti-detail-origin">{INGREDIENTI[activeIngrediente].origin}</div>
                <h3>{INGREDIENTI[activeIngrediente].name}</h3>
                <p>{INGREDIENTI[activeIngrediente].desc}</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* CARTOLINE / RECENSIONI */}
      <section className="cartoline-section">
        <div className="cartoline-header">
          <div className="section-label fade-up" style={{ justifyContent: 'center' }}>
            Le vostre cartoline
          </div>
          <h2 className="fade-up delay-1">
            Cosa ci scrivete <em>da Lazise.</em>
          </h2>
          <p className="fade-up delay-2">
            Recensioni vere, lasciate al banco o sui social. Grazie a tutti.
          </p>
        </div>
        <Cartoline />
      </section>

      {/* CONTATTI */}
      <section className="contatti" id="contatti">
        <div className="contatti-content">
          <div>
            <div className="section-label fade-up" style={{ color: 'var(--cream)' }}>
              Vienici a trovare
            </div>
            <h2 className="fade-up delay-1">
              Siamo qui.<br />
              <strong>Calde e pronte.</strong>
            </h2>

            <div className="contatti-info">
              <div className="contatti-info-block">
                <strong>Dove siamo</strong>
                Via Fontana, 12<br />
                37017 Lazise (VR)
              </div>
              <div className="contatti-info-block">
                <strong>Quando siamo aperti</strong>
                Lunedì chiuso<br />
                Mar – Dom · 11:30 — 14:30 / 17:30 — 22:30
              </div>
              <div className="contatti-info-block">
                <strong>Per ordini ed info</strong>
                <a href="tel:+393711141745">+39 371 114 1745</a><br />
                <a href="mailto:ciao@polpetteriadilazise.it">ciao@polpetteriadilazise.it</a>
              </div>
            </div>
          </div>

          <div className="ordina-card fade-up">
            <div className="ordina-card-tag">Ordini al telefono</div>
            <h3>
              Le tue polpette<br />
              <strong>in 20 minuti.</strong>
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.6, opacity: 0.8, marginTop: '0.5rem' }}>
              Sei in camping, in vacanza, o di passaggio? Chiama,
              ordina, passa a ritirare. Niente attesa.
            </p>

            <a href="tel:+393711141745" className="telefono">
              <svg viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <div>
                <span>371 114 1745</span>
                <small>chiamaci ora</small>
              </div>
            </a>

            <ol className="ordina-card-steps">
              <li>Chiamaci e dicci quante polpette vuoi e quali</li>
              <li>Ti diciamo quando passare a ritirare (di solito 20 min)</li>
              <li>Paghi al banco, le porti via calde nella confezione termica</li>
            </ol>
          </div>
        </div>

        {/* MAPPA STILIZZATA DI LAZISE */}
        <div className="mappa fade-up">
          <svg className="mappa-svg" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="acqua" patternUnits="userSpaceOnUse" width="20" height="20">
                <rect width="20" height="20" fill="#6b8a9e" />
                <path d="M 0 10 Q 5 7, 10 10 T 20 10" stroke="#7a99ad" strokeWidth="0.8" fill="none" opacity="0.5" />
                <path d="M 0 18 Q 5 15, 10 18 T 20 18" stroke="#7a99ad" strokeWidth="0.8" fill="none" opacity="0.5" />
              </pattern>
              <pattern id="terra" patternUnits="userSpaceOnUse" width="6" height="6">
                <rect width="6" height="6" fill="#ede0c2" />
                <circle cx="2" cy="2" r="0.4" fill="#b04a32" opacity="0.2" />
                <circle cx="4" cy="5" r="0.3" fill="#5c6b3a" opacity="0.3" />
              </pattern>
            </defs>

            <path d="M 0 80 Q 50 60, 100 75 Q 130 90, 140 130 Q 150 180, 170 220 Q 190 260, 230 280 L 0 280 Z" fill="url(#acqua)" />
            <path d="M 100 0 L 400 0 L 400 280 Q 360 270, 320 250 Q 280 230, 250 200 Q 220 170, 200 140 Q 180 110, 170 90 Q 150 70, 130 60 Q 110 50, 100 30 Z" fill="url(#terra)" />

            <path d="M 200 50 Q 220 100, 240 150 Q 260 200, 280 250" stroke="#8a3623" strokeWidth="1" fill="none" strokeDasharray="3 3" opacity="0.5" />
            <path d="M 150 90 Q 200 130, 270 180" stroke="#8a3623" strokeWidth="1" fill="none" strokeDasharray="3 3" opacity="0.5" />
            <path d="M 280 30 Q 310 100, 350 180" stroke="#8a3623" strokeWidth="1" fill="none" strokeDasharray="3 3" opacity="0.5" />

            <circle cx="220" cy="150" r="30" fill="none" stroke="#8a3623" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.6" />
            <text x="220" y="195" fill="#8a3623" fontFamily="DM Mono, monospace" fontSize="7" textAnchor="middle" letterSpacing="1.5">CENTRO STORICO</text>

            <g transform="translate(200, 130)">
              <rect x="-6" y="-6" width="12" height="12" fill="#8a3623" />
              <rect x="-7" y="-9" width="3" height="3" fill="#8a3623" />
              <rect x="-2" y="-9" width="3" height="3" fill="#8a3623" />
              <rect x="3" y="-9" width="3" height="3" fill="#8a3623" />
            </g>
            <text x="200" y="118" fill="#8a3623" fontFamily="Fraunces, serif" fontStyle="italic" fontSize="8" textAnchor="middle">Castello Scaligero</text>

            <text x="60" y="180" fill="#cdd9e0" fontFamily="Fraunces, serif" fontStyle="italic" fontSize="22" fontWeight="300">Lago</text>
            <text x="50" y="205" fill="#cdd9e0" fontFamily="Fraunces, serif" fontStyle="italic" fontSize="22" fontWeight="300">di Garda</text>

            <g transform="translate(235, 158)">
              <circle r="20" fill="#b04a32" opacity="0.15">
                <animate attributeName="r" values="14;28;14" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0;0.3" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <path d="M 0 -12 C -7 -12, -10 -7, -10 -3 C -10 4, 0 14, 0 14 C 0 14, 10 4, 10 -3 C 10 -7, 7 -12, 0 -12 Z" fill="#b04a32" />
              <circle cx="0" cy="-3" r="3.5" fill="#f4ecdc" />
              <circle cx="-1" cy="-4" r="1" fill="#b04a32" opacity="0.4" />
            </g>
            <g transform="translate(235, 158)">
              <line x1="20" y1="0" x2="50" y2="-10" stroke="#8a3623" strokeWidth="0.7" />
              <text x="55" y="-13" fill="#8a3623" fontFamily="Caveat, cursive" fontSize="18">qui!</text>
              <text x="55" y="0" fill="#8a3623" fontFamily="DM Mono, monospace" fontSize="7" letterSpacing="1.5">VIA FONTANA, 12</text>
            </g>

            <g transform="translate(355, 40)">
              <circle r="18" fill="none" stroke="#2b1f15" strokeWidth="0.6" opacity="0.4" />
              <text y="-8" fill="#2b1f15" fontFamily="DM Mono, monospace" fontSize="6" textAnchor="middle" opacity="0.6">N</text>
              <path d="M 0 -12 L -3 0 L 0 -3 L 3 0 Z" fill="#b04a32" />
              <path d="M 0 12 L -3 0 L 0 3 L 3 0 Z" fill="#2b1f15" opacity="0.3" />
            </g>
          </svg>

          <div className="mappa-info">
            <h3>Siamo nel <strong>cuore di Lazise</strong>, a due passi dal lago.</h3>
            <p>
              Tre minuti a piedi dal Castello Scaligero, cinque dal porto vecchio.
              Si sta in via Fontana, una stradina silenziosa appena dietro la piazza —
              quella dove sentirai sicuramente già il profumo del nostro sugo.
            </p>
            <ul>
              <li>3 min dal Castello Scaligero</li>
              <li>5 min dal porto vecchio</li>
              <li>2 min dal Lago di Garda</li>
              <li>Parcheggio Via Lavanda a 200m</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© 2026 La Polpetteria di Lazise · P.IVA 04567890123</div>
          <div className="socials">
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">TripAdvisor</a>
          </div>
        </div>
      </section>

      {/* Carrello sticky e pulsante chiama mobile */}
      <Carrello
        items={cart}
        onChange={changeQty}
        onClear={clearCart}
      />
      <CallFab hidden={cart.length > 0} />
    </>
  )
}
