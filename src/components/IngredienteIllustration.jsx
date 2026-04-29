/**
 * Illustrazioni SVG inline degli ingredienti.
 * Servono come placeholder estetici. Quando il cliente avrà le foto reali,
 * basta sostituire il return di IngredienteIllustration con <img src={...} />
 */

const PALETTE = {
  bg: '#8a3623',
  bgLight: '#c2553a',
  accent: '#c89c4a',
  cream: '#f4ecdc',
  dark: '#2b1f15',
  olive: '#5c6b3a',
  oliveLight: '#7a8c47',
}

// 01 — Manzo Rendena: profilo stilizzato di mucca
function ManzoSVG() {
  return (
    <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
      {/* Pascolo */}
      <line x1="0" y1="170" x2="300" y2="170" stroke={PALETTE.cream} strokeWidth="0.8" opacity="0.3" strokeDasharray="3 4" />
      {/* Montagne in lontananza */}
      <path d="M 0 130 L 60 90 L 100 110 L 150 80 L 200 105 L 260 85 L 300 100 L 300 170 L 0 170 Z" fill={PALETTE.cream} opacity="0.08" />
      {/* Corpo mucca */}
      <ellipse cx="155" cy="115" rx="70" ry="38" fill={PALETTE.cream} opacity="0.92" />
      {/* Macchie */}
      <ellipse cx="135" cy="100" rx="14" ry="11" fill={PALETTE.dark} opacity="0.85" />
      <ellipse cx="180" cy="120" rx="18" ry="13" fill={PALETTE.dark} opacity="0.85" />
      <ellipse cx="120" cy="130" rx="9" ry="6" fill={PALETTE.dark} opacity="0.85" />
      {/* Testa */}
      <ellipse cx="92" cy="105" rx="22" ry="20" fill={PALETTE.cream} opacity="0.92" />
      {/* Muso */}
      <ellipse cx="80" cy="115" rx="10" ry="8" fill="#e8b8a0" opacity="0.7" />
      <circle cx="76" cy="113" r="1.2" fill={PALETTE.dark} />
      <circle cx="84" cy="113" r="1.2" fill={PALETTE.dark} />
      {/* Occhio */}
      <circle cx="95" cy="98" r="1.8" fill={PALETTE.dark} />
      {/* Orecchio */}
      <ellipse cx="105" cy="88" rx="6" ry="9" fill={PALETTE.cream} opacity="0.92" transform="rotate(20 105 88)" />
      {/* Corno */}
      <path d="M 100 88 Q 108 78, 112 80" stroke={PALETTE.dark} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.8" />
      {/* Zampe */}
      <rect x="108" y="148" width="6" height="22" fill={PALETTE.cream} opacity="0.92" />
      <rect x="135" y="148" width="6" height="22" fill={PALETTE.cream} opacity="0.92" />
      <rect x="170" y="148" width="6" height="22" fill={PALETTE.cream} opacity="0.92" />
      <rect x="200" y="148" width="6" height="22" fill={PALETTE.cream} opacity="0.92" />
      {/* Coda */}
      <path d="M 224 110 Q 240 100, 235 130" stroke={PALETTE.cream} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.92" />
      <circle cx="234" cy="132" r="3.5" fill={PALETTE.dark} opacity="0.85" />
      {/* Sole/luna decorativa */}
      <circle cx="245" cy="50" r="14" fill={PALETTE.accent} opacity="0.4" />
    </svg>
  )
}

// 02 — Pomodoro San Marzano: tre pomodori allungati con foglia
function PomodoroSVG() {
  return (
    <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
      {/* Tavolo */}
      <line x1="20" y1="170" x2="280" y2="170" stroke={PALETTE.cream} strokeWidth="0.8" opacity="0.3" strokeDasharray="3 4" />
      {/* Pomodoro grande centrale */}
      <ellipse cx="150" cy="115" rx="38" ry="55" fill="#d65a3a" />
      <ellipse cx="138" cy="100" rx="10" ry="14" fill="#e88a6a" opacity="0.5" />
      {/* Foglie verdi */}
      <path d="M 150 60 L 135 50 L 138 65 L 150 60" fill={PALETTE.olive} />
      <path d="M 150 60 L 165 50 L 162 65 L 150 60" fill={PALETTE.olive} />
      <path d="M 150 60 L 150 45 L 145 60" fill={PALETTE.oliveLight} />
      <path d="M 150 60 L 150 45 L 155 60" fill={PALETTE.olive} />
      {/* Pomodoro a sinistra */}
      <ellipse cx="80" cy="135" rx="28" ry="38" fill="#c2553a" />
      <ellipse cx="72" cy="125" rx="7" ry="10" fill="#e88a6a" opacity="0.5" />
      <path d="M 80 100 L 70 92 L 73 102 Z" fill={PALETTE.olive} />
      <path d="M 80 100 L 90 92 L 87 102 Z" fill={PALETTE.olive} />
      <path d="M 80 100 L 80 88 L 76 100" fill={PALETTE.oliveLight} />
      {/* Pomodoro a destra */}
      <ellipse cx="220" cy="138" rx="30" ry="40" fill="#b04a32" />
      <ellipse cx="212" cy="128" rx="7" ry="10" fill="#d68070" opacity="0.5" />
      <path d="M 220 102 L 208 95 L 212 105 Z" fill={PALETTE.olive} />
      <path d="M 220 102 L 232 95 L 228 105 Z" fill={PALETTE.olive} />
      <path d="M 220 102 L 220 88 L 215 100" fill={PALETTE.oliveLight} />
      {/* Etichetta DOP */}
      <g transform="translate(40, 40)">
        <circle r="14" fill="none" stroke={PALETTE.accent} strokeWidth="1" opacity="0.6" />
        <text textAnchor="middle" y="3" fontSize="8" fill={PALETTE.accent} fontFamily="DM Mono, monospace" letterSpacing="1">DOP</text>
      </g>
    </svg>
  )
}

// 03 — Olio EVO: bottiglia con ramoscello d'olivo
function OlioSVG() {
  return (
    <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
      <line x1="20" y1="180" x2="280" y2="180" stroke={PALETTE.cream} strokeWidth="0.8" opacity="0.3" strokeDasharray="3 4" />
      {/* Bottiglia */}
      <g transform="translate(150, 30)">
        {/* Tappo */}
        <rect x="-8" y="0" width="16" height="14" fill={PALETTE.dark} rx="1" />
        {/* Collo */}
        <rect x="-6" y="14" width="12" height="22" fill={PALETTE.olive} opacity="0.85" />
        {/* Corpo bottiglia */}
        <path d="M -25 36 Q -25 30, -18 30 L 18 30 Q 25 30, 25 36 L 25 130 Q 25 140, 15 140 L -15 140 Q -25 140, -25 130 Z" 
              fill={PALETTE.olive} opacity="0.85" />
        {/* Riflesso luce */}
        <rect x="-20" y="45" width="4" height="80" fill={PALETTE.cream} opacity="0.25" rx="2" />
        {/* Etichetta */}
        <rect x="-18" y="65" width="36" height="40" fill={PALETTE.cream} opacity="0.95" rx="1" />
        <text textAnchor="middle" y="78" fontSize="5" fill={PALETTE.dark} fontFamily="DM Mono, monospace" letterSpacing="1">EVO</text>
        <line x1="-12" y1="83" x2="12" y2="83" stroke={PALETTE.dark} strokeWidth="0.4" opacity="0.5" />
        <text textAnchor="middle" y="92" fontSize="4" fill={PALETTE.dark} fontFamily="DM Mono, monospace" letterSpacing="0.5">GARDA</text>
        <text textAnchor="middle" y="100" fontSize="3.5" fill={PALETTE.dark} fontFamily="Fraunces, serif" fontStyle="italic" opacity="0.7">2025</text>
      </g>

      {/* Ramoscello d'olivo a sinistra */}
      <g transform="translate(60, 100)">
        <path d="M 0 0 Q 20 -10, 50 -5" stroke={PALETTE.dark} strokeWidth="1.5" fill="none" />
        <ellipse cx="10" cy="-3" rx="6" ry="2.5" fill={PALETTE.oliveLight} transform="rotate(-15 10 -3)" />
        <ellipse cx="22" cy="-8" rx="6" ry="2.5" fill={PALETTE.olive} transform="rotate(-10 22 -8)" />
        <ellipse cx="34" cy="-7" rx="6" ry="2.5" fill={PALETTE.oliveLight} transform="rotate(-5 34 -7)" />
        <ellipse cx="46" cy="-4" rx="6" ry="2.5" fill={PALETTE.olive} transform="rotate(0 46 -4)" />
        {/* Olive */}
        <ellipse cx="18" cy="3" rx="3" ry="4" fill={PALETTE.dark} opacity="0.8" />
        <ellipse cx="38" cy="2" rx="3" ry="4" fill={PALETTE.dark} opacity="0.8" />
      </g>

      {/* Goccia d'olio */}
      <g transform="translate(220, 110)">
        <path d="M 0 0 C -6 0, -8 8, 0 14 C 8 8, 6 0, 0 0 Z" fill={PALETTE.accent} opacity="0.7" />
        <ellipse cx="-2" cy="6" rx="1.5" ry="2" fill={PALETTE.cream} opacity="0.6" />
      </g>
    </svg>
  )
}

// 04 — Parmigiano: forma intera con triangolo tagliato
function ParmigianoSVG() {
  return (
    <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
      <line x1="20" y1="170" x2="280" y2="170" stroke={PALETTE.cream} strokeWidth="0.8" opacity="0.3" strokeDasharray="3 4" />
      {/* Forma di parmigiano (vista 3/4) */}
      <g transform="translate(150, 100)">
        {/* Lato superiore (ellisse) */}
        <ellipse cx="0" cy="-30" rx="80" ry="22" fill={PALETTE.accent} />
        {/* Lato (rettangolo curvo) */}
        <path d="M -80 -30 L -80 20 Q -80 42, 0 42 Q 80 42, 80 20 L 80 -30" fill="#a87a3a" />
        {/* Top con texture */}
        <ellipse cx="0" cy="-30" rx="80" ry="22" fill={PALETTE.accent} />
        {/* Crosta scura sopra */}
        <ellipse cx="0" cy="-30" rx="74" ry="18" fill="#e2b766" />
        {/* Marchio DOP/scritte sulla crosta laterale */}
        <text x="0" y="-2" textAnchor="middle" fontSize="6" fontFamily="DM Mono, monospace" fill={PALETTE.dark} opacity="0.5" letterSpacing="2">PARMIGIANO</text>
        <text x="0" y="6" textAnchor="middle" fontSize="6" fontFamily="DM Mono, monospace" fill={PALETTE.dark} opacity="0.5" letterSpacing="2">REGGIANO</text>
        <text x="0" y="22" textAnchor="middle" fontSize="4.5" fontFamily="Fraunces, serif" fontStyle="italic" fill={PALETTE.dark} opacity="0.45">24 mesi</text>
        {/* Punti decorativi */}
        <circle cx="-50" cy="-30" r="0.8" fill={PALETTE.cream} opacity="0.4" />
        <circle cx="50" cy="-30" r="0.8" fill={PALETTE.cream} opacity="0.4" />
        <circle cx="0" cy="-40" r="0.8" fill={PALETTE.cream} opacity="0.4" />
      </g>
      {/* Triangolo tagliato a destra */}
      <g transform="translate(240, 130)">
        <path d="M 0 0 L 30 -20 L 30 5 Z" fill={PALETTE.accent} />
        <path d="M 0 0 L 30 5 L 22 10 L 0 5 Z" fill="#a87a3a" />
        {/* Granuli */}
        <circle cx="14" cy="-5" r="0.6" fill={PALETTE.cream} />
        <circle cx="20" cy="-10" r="0.6" fill={PALETTE.cream} />
        <circle cx="10" cy="-2" r="0.6" fill={PALETTE.cream} />
      </g>
      {/* Coltello stilizzato */}
      <g transform="translate(50, 140)" opacity="0.7">
        <rect x="0" y="0" width="40" height="3" fill={PALETTE.cream} />
        <rect x="40" y="-2" width="14" height="7" fill={PALETTE.dark} rx="1" />
      </g>
    </svg>
  )
}

// 05 — Pane di Lazise: pagnotta rotonda con tagli
function PaneSVG() {
  return (
    <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
      <line x1="20" y1="175" x2="280" y2="175" stroke={PALETTE.cream} strokeWidth="0.8" opacity="0.3" strokeDasharray="3 4" />
      {/* Tagliere */}
      <ellipse cx="150" cy="155" rx="105" ry="14" fill={PALETTE.dark} opacity="0.4" />
      <ellipse cx="150" cy="148" rx="105" ry="14" fill="#7a5a3a" opacity="0.85" />
      {/* Pagnotta principale */}
      <ellipse cx="140" cy="120" rx="65" ry="40" fill="#c89c4a" />
      <ellipse cx="140" cy="115" rx="65" ry="38" fill="#d4a85a" />
      {/* Crosta più scura sopra */}
      <ellipse cx="140" cy="100" rx="55" ry="20" fill="#a87a3a" opacity="0.5" />
      {/* Tagli a croce sulla pagnotta */}
      <path d="M 100 110 Q 140 95, 180 110" stroke="#7a5a2a" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 110 95 Q 140 105, 170 95" stroke="#7a5a2a" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* Farina spruzzata */}
      <circle cx="120" cy="92" r="1" fill={PALETTE.cream} opacity="0.7" />
      <circle cx="135" cy="88" r="0.8" fill={PALETTE.cream} opacity="0.6" />
      <circle cx="150" cy="90" r="1" fill={PALETTE.cream} opacity="0.7" />
      <circle cx="165" cy="89" r="0.8" fill={PALETTE.cream} opacity="0.5" />
      {/* Fetta tagliata davanti */}
      <g transform="translate(220, 130)">
        <ellipse cx="0" cy="0" rx="22" ry="8" fill="#d4a85a" />
        <ellipse cx="0" cy="-3" rx="22" ry="6" fill="#e2b766" />
        {/* Mollica con bolle */}
        <circle cx="-8" cy="-3" r="1.5" fill="#a87a3a" opacity="0.5" />
        <circle cx="0" cy="-2" r="2" fill="#a87a3a" opacity="0.5" />
        <circle cx="8" cy="-4" r="1.2" fill="#a87a3a" opacity="0.5" />
        <circle cx="-3" cy="0" r="1" fill="#a87a3a" opacity="0.4" />
        <circle cx="6" cy="-1" r="1" fill="#a87a3a" opacity="0.4" />
      </g>
      {/* Spiga di grano decorativa */}
      <g transform="translate(60, 60) rotate(-20)">
        <line x1="0" y1="0" x2="0" y2="40" stroke={PALETTE.accent} strokeWidth="1" opacity="0.6" />
        <ellipse cx="-3" cy="5" rx="2.5" ry="4" fill={PALETTE.accent} opacity="0.7" />
        <ellipse cx="3" cy="8" rx="2.5" ry="4" fill={PALETTE.accent} opacity="0.7" />
        <ellipse cx="-3" cy="13" rx="2.5" ry="4" fill={PALETTE.accent} opacity="0.7" />
        <ellipse cx="3" cy="16" rx="2.5" ry="4" fill={PALETTE.accent} opacity="0.7" />
        <ellipse cx="-3" cy="21" rx="2.5" ry="4" fill={PALETTE.accent} opacity="0.7" />
        <ellipse cx="3" cy="24" rx="2.5" ry="4" fill={PALETTE.accent} opacity="0.7" />
      </g>
    </svg>
  )
}

// 06 — Erbe del nostro orto: mazzetto di basilico, prezzemolo, rosmarino
function ErbeSVG() {
  return (
    <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
      <line x1="20" y1="175" x2="280" y2="175" stroke={PALETTE.cream} strokeWidth="0.8" opacity="0.3" strokeDasharray="3 4" />
      
      {/* Vasetto / cordino */}
      <g transform="translate(150, 145)">
        <path d="M -25 0 Q -25 25, 0 25 Q 25 25, 25 0 Z" fill="#7a5a3a" opacity="0.85" />
        <path d="M -25 0 L 25 0" stroke={PALETTE.dark} strokeWidth="1" />
        <path d="M -28 -3 Q 0 -7, 28 -3" stroke="#5a3a22" strokeWidth="2" fill="none" />
      </g>
      
      {/* BASILICO — sinistra */}
      <g transform="translate(110, 90)">
        <line x1="0" y1="55" x2="0" y2="0" stroke={PALETTE.olive} strokeWidth="1.5" />
        {/* Foglie a coppie */}
        <ellipse cx="-10" cy="10" rx="8" ry="14" fill={PALETTE.oliveLight} transform="rotate(-30 -10 10)" />
        <ellipse cx="10" cy="10" rx="8" ry="14" fill={PALETTE.olive} transform="rotate(30 10 10)" />
        <ellipse cx="-12" cy="25" rx="7" ry="12" fill={PALETTE.olive} transform="rotate(-25 -12 25)" />
        <ellipse cx="12" cy="25" rx="7" ry="12" fill={PALETTE.oliveLight} transform="rotate(25 12 25)" />
        <ellipse cx="0" cy="-5" rx="6" ry="10" fill={PALETTE.oliveLight} />
      </g>
      
      {/* ROSMARINO — centro */}
      <g transform="translate(150, 80)">
        <line x1="0" y1="65" x2="0" y2="0" stroke="#3d4a23" strokeWidth="1.5" />
        {/* Aghi */}
        {[5, 12, 19, 26, 33, 40, 47, 54].map((y, i) => (
          <g key={i}>
            <line x1="0" y1={y} x2={-8 + (i % 2) * 2} y2={y - 4} stroke={PALETTE.olive} strokeWidth="1.2" />
            <line x1="0" y1={y} x2={8 - (i % 2) * 2} y2={y - 4} stroke={PALETTE.olive} strokeWidth="1.2" />
          </g>
        ))}
        {/* Punta */}
        <circle cx="0" cy="-2" r="2" fill="#3d4a23" />
      </g>
      
      {/* PREZZEMOLO — destra */}
      <g transform="translate(190, 95)">
        <line x1="0" y1="50" x2="0" y2="0" stroke={PALETTE.olive} strokeWidth="1.5" />
        {/* Foglie ricce arrotondate */}
        <circle cx="-6" cy="0" r="6" fill={PALETTE.oliveLight} />
        <circle cx="6" cy="2" r="6" fill={PALETTE.olive} />
        <circle cx="0" cy="-5" r="6" fill={PALETTE.oliveLight} />
        <circle cx="-3" cy="8" r="5" fill={PALETTE.olive} />
        <circle cx="8" cy="-3" r="5" fill={PALETTE.oliveLight} />
        {/* Texture */}
        <circle cx="-6" cy="0" r="2.5" fill="#3d4a23" opacity="0.6" />
        <circle cx="6" cy="2" r="2" fill="#3d4a23" opacity="0.6" />
        <circle cx="0" cy="-5" r="2" fill="#3d4a23" opacity="0.6" />
      </g>

      {/* Goccia d'acqua sulla foglia */}
      <ellipse cx="120" cy="100" rx="2" ry="3" fill={PALETTE.cream} opacity="0.7" />
      
      {/* Sole / lampadina */}
      <circle cx="50" cy="40" r="12" fill={PALETTE.accent} opacity="0.4" />
      <g stroke={PALETTE.accent} strokeWidth="1" opacity="0.5">
        <line x1="50" y1="20" x2="50" y2="14" />
        <line x1="50" y1="60" x2="50" y2="66" />
        <line x1="30" y1="40" x2="24" y2="40" />
        <line x1="70" y1="40" x2="76" y2="40" />
        <line x1="36" y1="26" x2="32" y2="22" />
        <line x1="64" y1="26" x2="68" y2="22" />
      </g>
    </svg>
  )
}

const COMPONENTS = {
  '01': ManzoSVG,
  '02': PomodoroSVG,
  '03': OlioSVG,
  '04': ParmigianoSVG,
  '05': PaneSVG,
  '06': ErbeSVG,
}

export default function IngredienteIllustration({ num }) {
  const Component = COMPONENTS[num]
  if (!Component) return null
  return <Component />
}
