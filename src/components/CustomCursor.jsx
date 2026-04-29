import { useEffect, useRef } from 'react'

/**
 * Cursore custom: una mini polpetta che segue il puntatore,
 * lascia briciole dietro mentre si muove, e si ingrandisce sopra
 * gli elementi cliccabili.
 * Solo desktop (su touch è disabilitato via CSS).
 */
export default function CustomCursor() {
  const cursorRef = useRef(null)
  const mouseRef = useRef({ x: -100, y: -100 })
  const lastBreadRef = useRef({ x: -100, y: -100, time: 0 })

  useEffect(() => {
    // Disabilita su touch
    if (window.matchMedia('(hover: none)').matches) return

    const cursor = cursorRef.current
    let breadContainer = document.getElementById('cursor-breadcrumbs')
    if (!breadContainer) {
      breadContainer = document.createElement('div')
      breadContainer.id = 'cursor-breadcrumbs'
      breadContainer.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9997'
      document.body.appendChild(breadContainer)
    }

    const move = (e) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY

      if (cursor) {
        cursor.style.left = e.clientX + 'px'
        cursor.style.top = e.clientY + 'px'
      }

      // Lascia una briciola se ci si è mossi abbastanza e abbastanza tempo è passato
      const now = performance.now()
      const dx = e.clientX - lastBreadRef.current.x
      const dy = e.clientY - lastBreadRef.current.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist > 30 && now - lastBreadRef.current.time > 60) {
        lastBreadRef.current = { x: e.clientX, y: e.clientY, time: now }
        spawnCrumb(breadContainer, e.clientX, e.clientY)
      }
    }

    const handleHover = (e) => {
      const target = e.target
      const isInteractive = target.closest('a, button, .menu-item, .ingredienti-list li, .menu-tab, input, select, [data-cursor-hover]')
      if (cursor) {
        if (isInteractive) cursor.classList.add('cursor-hover')
        else cursor.classList.remove('cursor-hover')
      }
    }

    const handleLeave = () => {
      if (cursor) cursor.style.opacity = '0'
    }
    const handleEnter = () => {
      if (cursor) cursor.style.opacity = '1'
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', handleHover)
    document.addEventListener('mouseleave', handleLeave)
    document.addEventListener('mouseenter', handleEnter)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', handleHover)
      document.removeEventListener('mouseleave', handleLeave)
      document.removeEventListener('mouseenter', handleEnter)
    }
  }, [])

  return (
    <div className="cursor-polpetta" ref={cursorRef} aria-hidden="true">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="#8a3623" />
        <circle cx="12" cy="12" r="9" fill="#a8443a" />
        <circle cx="9" cy="9" r="2.5" fill="#c66d5e" opacity="0.7" />
        <circle cx="15" cy="13" r="1.5" fill="#c66d5e" opacity="0.5" />
        <circle cx="10" cy="14" r="1" fill="#5a2818" opacity="0.6" />
      </svg>
    </div>
  )
}

function spawnCrumb(container, x, y) {
  const crumb = document.createElement('div')
  crumb.className = 'cursor-crumb'
  // Posizione casuale leggermente sfalsata
  const offX = (Math.random() - 0.5) * 16
  const offY = (Math.random() - 0.5) * 16
  crumb.style.left = (x + offX) + 'px'
  crumb.style.top = (y + offY) + 'px'
  // Variazione di forma/colore
  const size = 2 + Math.random() * 3
  crumb.style.width = size + 'px'
  crumb.style.height = size + 'px'
  const colors = ['#c89c4a', '#8a6a3a', '#a87a4a', '#7a5a2a']
  crumb.style.background = colors[Math.floor(Math.random() * colors.length)]
  crumb.style.borderRadius = Math.random() > 0.5 ? '50%' : '20%'
  crumb.style.transform = `rotate(${Math.random() * 360}deg)`

  container.appendChild(crumb)
  // Auto-rimozione
  setTimeout(() => {
    crumb.style.opacity = '0'
    crumb.style.transform += ' translateY(8px) scale(0.5)'
  }, 50)
  setTimeout(() => crumb.remove(), 1200)
}
