"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import "./parallax-cooperativa.css"

export default function ParallaxCooperativa() {
  // Referencias para los elementos con animación parallax
  const mountainLeftRef = useRef<HTMLImageElement>(null)
  const mountainRightRef = useRef<HTMLImageElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const manRef = useRef<HTMLImageElement>(null)

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

      if (manRef.current) {
        // Ajustar la altura de manera más suave en dispositivos móviles
        manRef.current.style.height = `${window.innerHeight - (isMobile ? value * 0.7 : value)}px`
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
    <div className="parallax-container">
      {/* Primera sección - Hero con parallax */}
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

      {/* Sección de información */}
      <section id="sec">
        <h2>Conoce acerca de nosotras</h2>
        <p>
          La Central de Cooperativas Las Diosas es una organización cooperativa de segundo grado, integrada por mujeres
          campesinas, que agrupa a ocho cooperativas de base. Las cuales estan ubicadas en los diferentes departamentos
          del pais siendo estos Estelí, Matagalpa, Nueva Segovia y Jinotega al norte de Nicaragua.
        </p>
      </section>

      <footer></footer>

      {/* Secciones del segundo proyecto */}
      <div id="parallax-world-of-ugg">
        <section>
          <div className="title">
            <h3>Central de Cooperativa</h3>
            <h1>Las Diosas R.L</h1>
          </div>
        </section>

        <section>
          <div className="parallax-one">
            <h2>COMPROMISO</h2>
          </div>
        </section>

        <section>
          <div className="block">
            <p className="highlight-paragraph">
              <span className="first-character sc">I</span> Brindamos servicios multisectoriales comprometidas con los
              intereses de las mujeres rurales, sustentada en la economía social, solidaria, popular creativa
              agroecológica y en defensa de los derechos de las mujeres a través del fortalecimiento de tres
              agro-cadenas alimentarías, la producción agroecológica, la conciencia crítica de género y la erradicación
              de las manifestaciones de violencia de género, estableciendo alianzas con organizaciones que comparten los
              principios y valores de las mujeres campesinas.
            </p>
            <p className="line-break margin-top-10"></p>
            <p className="margin-top-10">
              La organizacion esta integrada por más de 400 mujeres que se dedican al procesamiento de café y miel
              generando beneficos ya que la organización les ha permitido salir adelante y ser piezas claves en la
              economía de sus familias y de su comunidad.
            </p>
          </div>
        </section>

        <section>
          <div className="parallax-two">
            <h2>LO QUE NOS HACEMOS</h2>
          </div>
        </section>

        <section>
          <div className="block">
            <p className="colored-paragraph">
              <span className="first-character ny">A</span> la fecha, la cooperativa se dedica a la producción de café,
              miel y la agregación de valor a la flor de jamaica la cual es comercializada en mermelada, té y vino,
              productos que se van posicionando en el mercado nacional y extranjero y mucho más.
            </p>
            <p className="line-break margin-top-10"></p>
            <p className="colored-paragraph margin-top-10">.</p>
          </div>
        </section>

        <section>
          <div className="parallax-three">
            <h2>Nuestra Historia</h2>
          </div>
        </section>

        <section>
          <div className="block">
            <p className="colored-paragraph">
              <span className="first-character atw">L</span>a cooperativa nació en 1995, como una necesidad de las
              mujeres de ser parte activa y demostrar sus capacidades en el campo. Desde entonces, poco a poco han
              venido colocándose a la vanguardia en la actividad productiva a nivel nacional.
            </p>
            <p className="line-break margin-top-10"></p>
            <p className="colored-paragraph margin-top-10">
              Nacimos en el periodo del neoliberalismo donde no había valoración a las mujeres y en una situación muy
              difícil para las mujeres, porque teníamos espacios reducidos, donde únicamente nos limitaban a la cocina,
              cuidar los hijos y es ahí cuando miramos que no era natural y fue así que nos organizamos no solo para la
              venta de café sino para una superación de nosotras.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
