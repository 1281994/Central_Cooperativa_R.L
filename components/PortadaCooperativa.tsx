"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import "./portada-cooperativa.css"

export default function PortadaCooperativa() {
  // Referencias para los elementos con animación parallax
  const mountainLeftRef = useRef<HTMLImageElement>(null)
  const mountainRightRef = useRef<HTMLImageElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)

  // Estado para detectar si el dispositivo es iOS (para manejar el parallax de manera diferente)
  const [isIOS, setIsIOS] = useState(false)
  // Estado para detectar si el dispositivo es móvil
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detectar si es iOS
    const isIOSDevice =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
    setIsIOS(isIOSDevice)

    // Detectar si es móvil
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    setIsMobile(isMobileDevice)

    // Efecto parallax para la primera sección
    const handleScroll = () => {
      const value = window.scrollY

      // Reducir la intensidad del efecto en dispositivos móviles
      const mobileFactor = isMobile ? 0.4 : 0.7

      // En iOS, reducimos aún más la intensidad para evitar problemas de rendimiento
      const iosFactor = isIOS ? 0.3 : mobileFactor

      if (mountainLeftRef.current) {
        mountainLeftRef.current.style.left = `-${value / iosFactor}px`
      }

      if (mountainRightRef.current) {
        mountainRightRef.current.style.left = `${value / iosFactor}px`
      }

      if (textRef.current) {
        // Reducir el efecto en el texto para dispositivos móviles
        const textFactor = isMobile ? value * 0.5 : value
        textRef.current.style.bottom = `-${textFactor}px`
      }
    }

    // Optimización: usar requestAnimationFrame para el scroll
    let ticking = false
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", scrollListener, { passive: true })

    // Manejar cambios de tamaño de ventana
    const handleResize = () => {
      // Actualizar estado de dispositivo móvil
      const isMobileDevice = window.innerWidth < 768
      setIsMobile(isMobileDevice)

      // Forzar una actualización de los efectos parallax
      handleScroll()
    }

    window.addEventListener("resize", handleResize)

    // Ejecutar una vez al inicio para configurar correctamente
    handleScroll()

    return () => {
      window.removeEventListener("scroll", scrollListener)
      window.removeEventListener("resize", handleResize)
    }
  }, [isIOS, isMobile])

  return (
    <section id="top">
      <Image
        src="/assets/imagenes/parallax/fondo2.jpg"
        alt="Fondo"
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover" }}
      />

      <h2 id="text" ref={textRef}>
        Central de Cooperativas <br />
        Las Diosas R.L
        <br />
      </h2>

      <Image
        src="/assets/imagenes/parallax/2.png"
        alt="Montaña izquierda"
        id="mountain_left"
        ref={mountainLeftRef}
        fill
        sizes="100vw"
        style={{ objectFit: "cover" }}
      />

      <Image
        src="/assets/imagenes/parallax/3.png"
        alt="Montaña derecha"
        id="mountain_right"
        ref={mountainRightRef}
        fill
        sizes="100vw"
        style={{ objectFit: "cover" }}
      />
    </section>
  )
}
