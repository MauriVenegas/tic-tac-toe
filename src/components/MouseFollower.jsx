import { useState, useEffect } from 'react'

export default function MouseFollower() {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  // Segundo parámetro del useEffect
  // [] -> solo se ejecuta una vez cuando se monta el componente
  // [enabled] -> se ejecuta cuando cambia enabled y cuando se monta el componente
  // undefined o no colocar nada -> se ejecuta cada vez que se renderiza el componente
  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event
      setPosition({ x: clientX, y: clientY })
    }
    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }

    // cleanup:
    // -> cuando el componente se desmonta
    // -> cuando cambian las dependencias, antes de ejecutar
    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])

  // Quita en símbolo del mouse
  useEffect(() => {
    document.documentElement.classList.toggle('no-cursor', enabled)
    return () => {
      document.documentElement.classList.remove('no-cursor')
    }
  }, [enabled])

  return (
    <>
      {enabled && (
        <div
          style={{
            position: 'absolute',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            border: '1px solid #fff',
            borderRadius: '50%',
            opacity: 0.8,
            pointerEvents: 'none',
            left: -25,
            top: -25,
            width: 50,
            height: 50,
            transform: `translate(${position.x}px, ${position.y}px)`,
          }}
        />
      )}
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'No seguir' : 'Seguir'} puntero
      </button>
    </>
  )
}
