import { useState, useEffect } from 'react'

/**
 * Orari del locale.
 * 0=Dom, 1=Lun, 2=Mar, 3=Mer, 4=Gio, 5=Ven, 6=Sab
 * Ogni giorno può avere più "fasce" di apertura.
 * Lunedì chiuso → niente fasce.
 */
const ORARI = {
  0: [{ from: '11:30', to: '14:30' }, { from: '17:30', to: '22:30' }], // Dom
  1: [], // Lun chiuso
  2: [{ from: '11:30', to: '14:30' }, { from: '17:30', to: '22:30' }],
  3: [{ from: '11:30', to: '14:30' }, { from: '17:30', to: '22:30' }],
  4: [{ from: '11:30', to: '14:30' }, { from: '17:30', to: '22:30' }],
  5: [{ from: '11:30', to: '14:30' }, { from: '17:30', to: '22:30' }],
  6: [{ from: '11:30', to: '14:30' }, { from: '17:30', to: '22:30' }],
}

const GIORNI = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato']

function timeToMinutes(hhmm) {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

function getStatus(now = new Date()) {
  const day = now.getDay()
  const minutes = now.getHours() * 60 + now.getMinutes()
  const fasce = ORARI[day] || []

  // Aperto adesso?
  for (const fascia of fasce) {
    const from = timeToMinutes(fascia.from)
    const to = timeToMinutes(fascia.to)
    if (minutes >= from && minutes < to) {
      return { open: true, msg: `chiudiamo alle ${fascia.to}` }
    }
  }

  // Chiuso. Cerca la prossima apertura (oggi o nei giorni successivi)
  // Caso 1: oggi c'è una fascia che deve ancora iniziare
  for (const fascia of fasce) {
    const from = timeToMinutes(fascia.from)
    if (minutes < from) {
      return { open: false, msg: `riapriamo oggi alle ${fascia.from}` }
    }
  }

  // Caso 2: cerchiamo nei prossimi 7 giorni
  for (let i = 1; i <= 7; i++) {
    const nextDay = (day + i) % 7
    const nextFasce = ORARI[nextDay] || []
    if (nextFasce.length > 0) {
      const giornoLabel = i === 1 ? 'domani' : GIORNI[nextDay]
      return { open: false, msg: `riapriamo ${giornoLabel} alle ${nextFasce[0].from}` }
    }
  }

  return { open: false, msg: 'al momento chiusi' }
}

export default function OpenStatus() {
  const [status, setStatus] = useState(() => getStatus())

  useEffect(() => {
    // Aggiorna ogni minuto
    const interval = setInterval(() => {
      setStatus(getStatus())
    }, 60_000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`open-status ${status.open ? 'is-open' : 'is-closed'}`}>
      <span className="open-status-dot" />
      <span className="open-status-text">
        <strong>{status.open ? 'aperti' : 'chiusi'}</strong>
        <span className="open-status-msg">{status.msg}</span>
      </span>
    </div>
  )
}
