import { useState, useEffect } from 'react'

const TELEFONO = '+390451234567'
// WhatsApp vuole il numero senza + e senza spazi
const WHATSAPP_NUMERO = TELEFONO.replace(/[^\d]/g, '')

export default function Carrello({ items, onRemove, onClear, onChange }) {
  const [open, setOpen] = useState(false)

  const totale = items.reduce((sum, i) => sum + i.qty * i.priceVal, 0)
  const totalPolpette = items.reduce((sum, i) => sum + i.qty, 0)

  // Apri automaticamente quando aggiungi qualcosa
  useEffect(() => {
    if (totalPolpette > 0 && !open) {
      // niente, lasciamo che l'utente apra a mano per non disturbare
    }
    if (totalPolpette === 0) setOpen(false)
  }, [totalPolpette])

  function buildMessage() {
    const lines = ['Ciao! Vorrei ordinare:']
    items.forEach(i => {
      lines.push(`• ${i.qty}× ${i.fullName}`)
    })
    lines.push('')
    lines.push(`Totale indicativo: € ${totale.toFixed(2)}`)
    lines.push('')
    lines.push('Quando posso passare a ritirare?')
    return lines.join('\n')
  }

  function ordinaWhatsApp() {
    const msg = encodeURIComponent(buildMessage())
    window.open(`https://wa.me/${WHATSAPP_NUMERO}?text=${msg}`, '_blank')
  }

  function ordinaTelefono() {
    window.location.href = `tel:${TELEFONO}`
  }

  if (totalPolpette === 0) return null

  return (
    <>
      {/* Bar sempre visibile in basso */}
      <div className={`carrello ${open ? 'open' : ''}`}>
        <button className="carrello-toggle" onClick={() => setOpen(!open)} aria-label="Apri carrello">
          <span className="carrello-bag">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 7 L6 5 C6 3, 8 2, 12 2 C16 2, 18 3, 18 5 L18 7 M4 7 L20 7 L19 21 L5 21 Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
            <span className="carrello-badge">{totalPolpette}</span>
          </span>
          <span className="carrello-summary">
            <strong>{totalPolpette} polpett{totalPolpette === 1 ? 'a' : 'e'}</strong>
            <small>€ {totale.toFixed(2)} · clicca per ordinare</small>
          </span>
          <span className="carrello-arrow" aria-hidden="true">{open ? '↓' : '↑'}</span>
        </button>

        {open && (
          <div className="carrello-panel">
            <div className="carrello-header">
              <h3>Il tuo ordine</h3>
              <button className="carrello-clear" onClick={onClear}>svuota</button>
            </div>

            <ul className="carrello-list">
              {items.map((i) => (
                <li key={i.id}>
                  <span className="carrello-item-name">{i.fullName}</span>
                  <span className="carrello-item-controls">
                    <button onClick={() => onChange(i.id, i.qty - 1)} aria-label="Rimuovi uno">−</button>
                    <span className="carrello-item-qty">{i.qty}</span>
                    <button onClick={() => onChange(i.id, i.qty + 1)} aria-label="Aggiungi uno">+</button>
                  </span>
                  <span className="carrello-item-price">€ {(i.qty * i.priceVal).toFixed(2)}</span>
                </li>
              ))}
            </ul>

            <div className="carrello-totale">
              <span>Totale</span>
              <strong>€ {totale.toFixed(2)}</strong>
            </div>

            <p className="carrello-note">
              Conferma l'ordine via WhatsApp o telefono. Ti diciamo quando passare.
            </p>

            <div className="carrello-actions">
              <button className="carrello-btn carrello-btn-wa" onClick={ordinaWhatsApp}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M17.5 14.4 C17.2 14.3, 15.8 13.6, 15.5 13.5 C15.3 13.4, 15.1 13.4, 14.9 13.7 C14.7 13.9, 14.2 14.6, 14 14.8 C13.8 15, 13.7 15, 13.4 14.9 C13.2 14.8, 12.3 14.5, 11.2 13.5 C10.4 12.7, 9.8 11.8, 9.7 11.5 C9.5 11.3, 9.7 11.1, 9.8 11 C9.9 10.9, 10 10.7, 10.2 10.6 C10.3 10.4, 10.4 10.3, 10.5 10.1 C10.6 9.9, 10.5 9.8, 10.5 9.6 C10.4 9.5, 9.9 8.1, 9.7 7.6 C9.5 7.1, 9.3 7.2, 9.2 7.2 C9 7.2, 8.9 7.2, 8.7 7.2 C8.5 7.2, 8.2 7.3, 8 7.5 C7.7 7.8, 7.1 8.4, 7.1 9.7 C7.1 11.1, 8 12.4, 8.2 12.6 C8.3 12.8, 9.9 15.4, 12.5 16.5 C13.1 16.8, 13.6 16.9, 14 17 C14.6 17.2, 15.1 17.2, 15.5 17.1 C16 17 17.1 16.4, 17.4 15.7 C17.6 15.1, 17.6 14.5, 17.6 14.4 C17.6 14.3, 17.7 14.5, 17.5 14.4 Z" fill="currentColor"/>
                  <path d="M12 2 C6.5 2, 2 6.5, 2 12 C2 13.7, 2.5 15.4, 3.3 16.8 L2 22 L7.3 20.7 C8.7 21.5, 10.3 21.9, 12 21.9 C17.5 21.9, 22 17.5, 22 11.9 C22 9.3, 21 6.7, 19.1 4.9 C17.3 3, 14.7 2, 12 2 Z M12 20.2 C10.5 20.2, 9 19.8, 7.7 19 L7.4 18.8 L4.3 19.6 L5.1 16.6 L4.9 16.3 C4 14.9, 3.6 13.4, 3.6 11.9 C3.6 7.4, 7.4 3.6, 12 3.6 C14.2 3.6, 16.3 4.5, 17.9 6 C19.5 7.6, 20.4 9.7, 20.4 11.9 C20.4 16.5, 16.6 20.2, 12 20.2 Z" fill="currentColor"/>
                </svg>
                Ordina su WhatsApp
              </button>
              <button className="carrello-btn carrello-btn-tel" onClick={ordinaTelefono}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/>
                </svg>
                Chiama
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
