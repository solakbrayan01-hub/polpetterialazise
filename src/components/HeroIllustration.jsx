/**
 * Illustrazione hero: piattino di carta visto dall'alto con tre polpette
 * infilzate da stuzzicadenti. Stile editoriale coerente con le illustrazioni
 * degli ingredienti.
 *
 * Tutto SVG inline + animazioni CSS — nessun 3D, niente WebGL,
 * funziona ovunque ed è LEGGIBILE: si vedono che sono polpette.
 */
export default function HeroIllustration() {
  return (
    <div className="hero-illustration">
      <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" aria-label="Piattino con polpette">
        <defs>
          {/* Texture grain leggera per le polpette */}
          <filter id="grain" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" />
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" />
            <feComposite in2="SourceGraphic" operator="in" />
          </filter>

          {/* Gradiente carta del piattino */}
          <radialGradient id="paperGrad" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#f4ead2" />
            <stop offset="80%" stopColor="#ede0c2" />
            <stop offset="100%" stopColor="#d8c8a4" />
          </radialGradient>

          {/* Gradiente polpetta — sfumatura per dare volume */}
          <radialGradient id="polpettaGrad" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#b85f48" />
            <stop offset="50%" stopColor="#8a3623" />
            <stop offset="100%" stopColor="#5a2818" />
          </radialGradient>

          {/* Gradiente glaze sugo (riflesso lucido) */}
          <radialGradient id="glazeGrad" cx="35%" cy="30%" r="40%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#ffb8a0" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>

          {/* Gradiente foglia basilico */}
          <radialGradient id="basilicoGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#7a8c47" />
            <stop offset="100%" stopColor="#3d4a23" />
          </radialGradient>
        </defs>

        {/* Ombra sottile sotto il piattino */}
        <ellipse cx="300" cy="500" rx="240" ry="20" fill="#2b1f15" opacity="0.12" />

        {/* === PIATTINO DI CARTA === */}
        <g className="piatto-anim">
          {/* Cerchio esterno (bordo carta) */}
          <circle cx="300" cy="300" r="230" fill="url(#paperGrad)" />
          
          {/* Bordo decorativo terracotta */}
          <circle cx="300" cy="300" r="225" fill="none" stroke="#b04a32" strokeWidth="1.5" opacity="0.4" />
          <circle cx="300" cy="300" r="218" fill="none" stroke="#b04a32" strokeWidth="0.6" opacity="0.3" strokeDasharray="2 4" />
          
          {/* Anello interno (zona dove appoggiamo le polpette) */}
          <circle cx="300" cy="300" r="170" fill="none" stroke="#c89c4a" strokeWidth="0.8" opacity="0.25" />

          {/* Texture leggera della carta */}
          <g opacity="0.15">
            <circle cx="200" cy="220" r="1.2" fill="#8a6a3a" />
            <circle cx="380" cy="180" r="0.8" fill="#8a6a3a" />
            <circle cx="430" cy="350" r="1" fill="#8a6a3a" />
            <circle cx="170" cy="380" r="0.9" fill="#8a6a3a" />
            <circle cx="280" cy="420" r="1.1" fill="#8a6a3a" />
            <circle cx="350" cy="270" r="0.7" fill="#8a6a3a" />
            <circle cx="220" cy="320" r="0.8" fill="#8a6a3a" />
          </g>
        </g>

        {/* === BRICIOLE DI PEPE/SPEZIE — sparse sul piatto === */}
        <g className="briciole">
          <circle cx="180" cy="240" r="1.8" fill="#3d2818" />
          <circle cx="450" cy="210" r="1.5" fill="#3d2818" />
          <circle cx="160" cy="350" r="2" fill="#3d2818" />
          <circle cx="420" cy="380" r="1.6" fill="#3d2818" />
          <circle cx="350" cy="450" r="1.4" fill="#3d2818" />
          <circle cx="220" cy="180" r="1.2" fill="#3d2818" />
          <circle cx="480" cy="290" r="1.5" fill="#3d2818" />
          <circle cx="380" cy="160" r="1" fill="#5c3a22" />
          <circle cx="135" cy="280" r="1.3" fill="#5c3a22" />
          <circle cx="295" cy="155" r="1.6" fill="#5c3a22" />
        </g>

        {/* === MACCHIE DI SUGO sul piatto === */}
        <g opacity="0.5">
          <ellipse cx="265" cy="385" rx="14" ry="9" fill="#a8443a" transform="rotate(-15 265 385)" />
          <ellipse cx="380" cy="320" rx="11" ry="7" fill="#a8443a" transform="rotate(35 380 320)" />
          <ellipse cx="220" cy="260" rx="9" ry="6" fill="#a8443a" transform="rotate(-40 220 260)" />
        </g>

        {/* === POLPETTA 1 — IN ALTO A SINISTRA === */}
        <g className="polpetta polpetta-1" transform="translate(225, 235)">
          {/* Stuzzicadenti che esce dalla polpetta */}
          <line x1="0" y1="-65" x2="3" y2="-15" stroke="#c4a677" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="-1" y1="-68" x2="-3" y2="-58" stroke="#a88860" strokeWidth="2.5" strokeLinecap="round" />
          
          {/* Polpetta — base */}
          <circle r="55" fill="url(#polpettaGrad)" />
          {/* Texture grain */}
          <circle r="55" fill="#000" filter="url(#grain)" opacity="0.3" />
          {/* Glaze sugo lucido */}
          <circle r="55" fill="url(#glazeGrad)" />
          {/* Macchie/imperfezioni di carne */}
          <ellipse cx="-12" cy="8" rx="9" ry="6" fill="#5a2818" opacity="0.5" />
          <ellipse cx="18" cy="-8" rx="6" ry="4" fill="#7a3220" opacity="0.6" />
          <ellipse cx="-5" cy="-18" rx="5" ry="3" fill="#a8543a" opacity="0.5" />
          {/* Bordo scuro della polpetta (definizione) */}
          <circle r="55" fill="none" stroke="#3d1e10" strokeWidth="1.5" opacity="0.4" />
          {/* Highlight in alto a sinistra */}
          <ellipse cx="-15" cy="-20" rx="14" ry="10" fill="#d68070" opacity="0.4" />
        </g>

        {/* === POLPETTA 2 — IN ALTO A DESTRA === */}
        <g className="polpetta polpetta-2" transform="translate(380, 250)">
          <line x1="0" y1="-72" x2="-2" y2="-18" stroke="#c4a677" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="2" y1="-75" x2="6" y2="-65" stroke="#a88860" strokeWidth="2.5" strokeLinecap="round" />
          
          <circle r="60" fill="url(#polpettaGrad)" />
          <circle r="60" fill="#000" filter="url(#grain)" opacity="0.3" />
          <circle r="60" fill="url(#glazeGrad)" />
          <ellipse cx="14" cy="6" rx="10" ry="6" fill="#5a2818" opacity="0.5" />
          <ellipse cx="-16" cy="-10" rx="7" ry="5" fill="#7a3220" opacity="0.6" />
          <ellipse cx="8" cy="-22" rx="5" ry="3" fill="#a8543a" opacity="0.5" />
          <circle r="60" fill="none" stroke="#3d1e10" strokeWidth="1.5" opacity="0.4" />
          <ellipse cx="-20" cy="-22" rx="16" ry="11" fill="#d68070" opacity="0.4" />
        </g>

        {/* === POLPETTA 3 — IN BASSO AL CENTRO (la più grande) === */}
        <g className="polpetta polpetta-3" transform="translate(295, 360)">
          <line x1="0" y1="-78" x2="-1" y2="-18" stroke="#c4a677" strokeWidth="2.8" strokeLinecap="round" />
          <line x1="-2" y1="-82" x2="-6" y2="-72" stroke="#a88860" strokeWidth="2.8" strokeLinecap="round" />
          
          <circle r="65" fill="url(#polpettaGrad)" />
          <circle r="65" fill="#000" filter="url(#grain)" opacity="0.3" />
          <circle r="65" fill="url(#glazeGrad)" />
          <ellipse cx="-15" cy="12" rx="12" ry="7" fill="#5a2818" opacity="0.5" />
          <ellipse cx="20" cy="-5" rx="8" ry="6" fill="#7a3220" opacity="0.6" />
          <ellipse cx="-8" cy="-25" rx="6" ry="4" fill="#a8543a" opacity="0.5" />
          <ellipse cx="25" cy="20" rx="5" ry="3" fill="#a8543a" opacity="0.4" />
          <circle r="65" fill="none" stroke="#3d1e10" strokeWidth="1.5" opacity="0.4" />
          <ellipse cx="-22" cy="-26" rx="18" ry="13" fill="#d68070" opacity="0.4" />
        </g>

        {/* === FOGLIA DI BASILICO sopra la polpetta in basso === */}
        <g className="basilico" transform="translate(330, 305)">
          <path
            d="M 0 0 C 12 -8, 22 -22, 18 -42 C 14 -55, 4 -55, -2 -42 C -6 -22, -12 -8, 0 0 Z"
            fill="url(#basilicoGrad)"
            transform="rotate(15)"
          />
          {/* Nervatura della foglia */}
          <path d="M 2 -2 L 8 -38" stroke="#2d3d1d" strokeWidth="0.6" fill="none" opacity="0.7" transform="rotate(15)" />
          {/* Steli laterali */}
          <path d="M 4 -10 L 10 -14" stroke="#2d3d1d" strokeWidth="0.4" fill="none" opacity="0.5" transform="rotate(15)" />
          <path d="M 4 -20 L 12 -22" stroke="#2d3d1d" strokeWidth="0.4" fill="none" opacity="0.5" transform="rotate(15)" />
          <path d="M 4 -30 L 11 -30" stroke="#2d3d1d" strokeWidth="0.4" fill="none" opacity="0.5" transform="rotate(15)" />
        </g>

        {/* === PICCOLA FOGLIA DI BASILICO sopra polpetta 1 === */}
        <g className="basilico-piccolo" transform="translate(258, 195)">
          <path
            d="M 0 0 C 6 -4, 11 -12, 9 -22 C 7 -28, 2 -28, -1 -22 C -3 -12, -6 -4, 0 0 Z"
            fill="url(#basilicoGrad)"
            transform="rotate(-30)"
          />
          <path d="M 1 -1 L 4 -20" stroke="#2d3d1d" strokeWidth="0.4" fill="none" opacity="0.6" transform="rotate(-30)" />
        </g>

        {/* === GOCCIA D'OLIO sul piatto === */}
        <g transform="translate(420, 330)" opacity="0.7">
          <ellipse cx="0" cy="0" rx="6" ry="3" fill="#c89c4a" />
          <ellipse cx="-1" cy="-0.5" rx="2" ry="1" fill="#f4d089" opacity="0.8" />
        </g>

        {/* === Etichetta scritta a mano "fatta a mano" === */}
        <g transform="translate(135, 480)" opacity="0.6">
          <text
            fontFamily="Caveat, cursive"
            fontSize="22"
            fill="#8a3623"
            transform="rotate(-8)"
          >
            fatte a mano ✦
          </text>
        </g>
      </svg>
    </div>
  )
}
