const RECENSIONI = [
  {
    testo: "Le polpette più buone che abbia mangiato in vacanza. Una merenda perfetta dopo il bagno al lago. Torniamo domani!",
    autore: "Giulia M.",
    luogo: "Milano",
    data: "Agosto 2025",
    rotation: -2.5,
    stamp: "lago",
  },
  {
    testo: "Mi son fermato per caso passeggiando. Ne ho prese tre, le ho mangiate sulla panchina davanti al castello. Non parlavo con nessuno e stavo benissimo.",
    autore: "Marco R.",
    luogo: "Verona",
    data: "Settembre 2025",
    rotation: 3,
    stamp: "polpetta",
  },
  {
    testo: "Siamo in camping qui vicino, ne ordiniamo da quando abbiamo scoperto questo posto. La 'cervo & mirtilli' è una poesia. Grazie davvero.",
    autore: "Famiglia Bertoldi",
    luogo: "Monaco di Baviera",
    data: "Luglio 2025",
    rotation: -1.2,
    stamp: "cuore",
  },
  {
    testo: "Ho chiamato alle 11, alle 11:25 erano pronte. Calde, profumate, perfette. Servizio impeccabile e prezzo onesto. Bravi.",
    autore: "Chiara L.",
    luogo: "Brescia",
    data: "Ottobre 2025",
    rotation: 1.8,
    stamp: "lago",
  },
  {
    testo: "Tipo di posto che ti fa innamorare di Lazise. Mia figlia di 6 anni ne ha mangiate 4 di fila. Mio marito 6. Io ne ho prese altre 8 da portare a casa.",
    autore: "Federica P.",
    luogo: "Padova",
    data: "Agosto 2025",
    rotation: -3.2,
    stamp: "polpetta",
  },
]

const STAMPS = {
  lago: (
    <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="56" height="56" fill="none" stroke="#8a3623" strokeWidth="0.5" strokeDasharray="2 2" />
      <path d="M 8 28 Q 18 22, 28 28 Q 38 34, 52 28" stroke="#6b8a9e" strokeWidth="1" fill="none" />
      <path d="M 8 35 Q 18 29, 28 35 Q 38 41, 52 35" stroke="#6b8a9e" strokeWidth="0.8" fill="none" opacity="0.7" />
      <text x="30" y="14" fontSize="6" textAnchor="middle" fill="#8a3623" fontFamily="DM Mono, monospace" letterSpacing="1">LAZISE</text>
      <text x="30" y="50" fontSize="5" textAnchor="middle" fill="#8a3623" fontFamily="DM Mono, monospace" letterSpacing="1">VR · ITALIA</text>
    </svg>
  ),
  polpetta: (
    <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="56" height="56" fill="none" stroke="#8a3623" strokeWidth="0.5" strokeDasharray="2 2" />
      <circle cx="30" cy="30" r="13" fill="#a8443a" />
      <circle cx="26" cy="26" r="3.5" fill="#c66d5e" opacity="0.6" />
      <text x="30" y="50" fontSize="5" textAnchor="middle" fill="#8a3623" fontFamily="DM Mono, monospace" letterSpacing="1">MÒ'POLPETTA</text>
    </svg>
  ),
  cuore: (
    <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="56" height="56" fill="none" stroke="#8a3623" strokeWidth="0.5" strokeDasharray="2 2" />
      <path d="M 30 42 C 22 35, 14 28, 18 22 C 22 16, 28 18, 30 24 C 32 18, 38 16, 42 22 C 46 28, 38 35, 30 42 Z" fill="#b04a32" />
      <text x="30" y="14" fontSize="5" textAnchor="middle" fill="#8a3623" fontFamily="DM Mono, monospace" letterSpacing="1">GRAZIE</text>
    </svg>
  ),
}

export default function Cartoline() {
  return (
    <div className="cartoline-grid">
      {RECENSIONI.map((r, i) => (
        <div
          key={i}
          className="cartolina fade-up"
          style={{
            transform: `rotate(${r.rotation}deg)`,
            transitionDelay: `${i * 0.08}s`,
          }}
        >
          <div className="cartolina-stamp">{STAMPS[r.stamp]}</div>
          <div className="cartolina-postmark">
            <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
              <circle cx="30" cy="30" r="22" fill="none" stroke="#8a3623" strokeWidth="0.6" opacity="0.5" />
              <circle cx="30" cy="30" r="16" fill="none" stroke="#8a3623" strokeWidth="0.4" opacity="0.5" />
              <text x="30" y="22" fontSize="4.5" textAnchor="middle" fill="#8a3623" fontFamily="DM Mono, monospace" opacity="0.7">LAZISE</text>
              <text x="30" y="33" fontSize="6" textAnchor="middle" fill="#8a3623" fontFamily="DM Mono, monospace" fontWeight="bold" opacity="0.7">{r.data.split(' ')[0].toUpperCase().slice(0, 3)}</text>
              <text x="30" y="42" fontSize="4.5" textAnchor="middle" fill="#8a3623" fontFamily="DM Mono, monospace" opacity="0.7">{r.data.split(' ')[1] || '2025'}</text>
            </svg>
          </div>
          <div className="cartolina-text">
            "{r.testo}"
          </div>
          <div className="cartolina-firma">
            <span className="cartolina-autore">{r.autore}</span>
            <span className="cartolina-luogo">— {r.luogo}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
