"use client"

// Añadir importación del script de ajuste de altura al inicio del componente
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import "./parallax-cooperativa.css"
// Importar el script de ajuste de altura
import "./vh-fix.js"

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
  // Estados para controlar las animaciones de pájaros
  const [showBirds, setShowBirds] = useState(false)
  const [showDiagonalBirds, setShowDiagonalBirds] = useState(false)
  // Referencia para los temporizadores
  const timersRef = useRef<NodeJS.Timeout[]>([])

  // Modificar la función useEffect que maneja el parallax para mejorar la compatibilidad
  useEffect(() => {
    // Detectar si es iOS con una detección más robusta
    const isIOSDevice =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) ||
      /iPhone|iPad|iPod/.test(navigator.platform)
    setIsIOS(isIOSDevice)

    // Detectar si es móvil con una detección más completa
    const isMobileDevice =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      window.innerWidth < 768
    setIsMobile(isMobileDevice)

    // Detectar navegador para ajustes específicos
    const isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1
    const isEdge = navigator.userAgent.indexOf("Edge") > -1 || navigator.userAgent.indexOf("Edg") > -1
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

    // Efecto parallax para la primera sección con ajustes por navegador
    const handleScroll = () => {
      const value = window.scrollY

      // Factores de ajuste basados en dispositivo y navegador
      let mobileFactor = isMobile ? 0.3 : 0.7
      const iosFactor = isIOS ? 0.2 : mobileFactor

      // Ajustes específicos por navegador
      if (isFirefox) mobileFactor *= 0.8
      if (isEdge) mobileFactor *= 0.9
      if (isSafari) mobileFactor *= 0.7

      // Aplicar transformaciones con mejor rendimiento
      if (mountainLeftRef.current) {
        mountainLeftRef.current.style.transform = `translateX(${-value / iosFactor}px)`
      }

      if (mountainRightRef.current) {
        mountainRightRef.current.style.transform = `translateX(${value / iosFactor}px)`
      }

      if (textRef.current) {
        // Reducir el efecto en el texto para dispositivos móviles
        const textFactor = isMobile ? value * 0.3 : value * 0.5
        textRef.current.style.transform = `translateY(${textFactor}px)`
      }

      if (manRef.current) {
        // Ajustar la altura de manera más suave en dispositivos móviles
        const heightAdjustment = isMobile ? value * 0.5 : value
        const newHeight = Math.max(50, window.innerHeight - heightAdjustment)
        manRef.current.style.height = `${newHeight}px`
      }
    }

    // Optimización: usar requestAnimationFrame para el scroll con throttling
    let lastKnownScrollPosition = 0
    let ticking = false

    const scrollListener = () => {
      lastKnownScrollPosition = window.scrollY

      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", scrollListener, { passive: true })

    // Manejar cambios de tamaño de ventana con debounce
    let resizeTimer
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        // Actualizar estado de dispositivo móvil
        const newIsMobileDevice = window.innerWidth < 768
        setIsMobile(newIsMobileDevice)

        // Forzar una actualización de los efectos parallax
        handleScroll()
      }, 100)
    }

    window.addEventListener("resize", handleResize)

    // Ejecutar una vez al inicio para configurar correctamente
    handleScroll()

    // AÑADIR ESTA LÍNEA: Iniciar la secuencia de animaciones de pájaros
    startAnimationSequence()

    return () => {
      window.removeEventListener("scroll", scrollListener)
      window.removeEventListener("resize", handleResize)
      clearTimeout(resizeTimer)
      // Limpiar todos los temporizadores al desmontar
      timersRef.current.forEach((timer) => clearTimeout(timer))
    }
  }, [isIOS, isMobile])

  // Modificar la función startAnimationSequence para hacerla más robusta

  const startAnimationSequence = () => {
    // Limpiar cualquier temporizador existente
    timersRef.current.forEach((timer) => clearTimeout(timer))
    timersRef.current = []

    // Ajustar duración de animaciones según el dispositivo
    const isMobileView = window.innerWidth < 768

    // Duración de las animaciones (en ms) - más cortas en móviles para mejor rendimiento
    const firstAnimationDuration = isMobileView ? 12000 : 15000
    const secondAnimationDuration = isMobileView ? 12000 : 15000
    const pauseBetweenAnimations = 3000

    // Función recursiva para alternar entre animaciones con mejor manejo de errores
    const runAnimationCycle = () => {
      try {
        // Iniciar primera animación (horizontal)
        console.log("Iniciando animación horizontal de pájaros")
        setShowBirds(true)
        setShowDiagonalBirds(false)

        // Programar el fin de la primera animación y el inicio de la segunda
        const timer1 = setTimeout(() => {
          console.log("Finalizando animación horizontal de pájaros")
          setShowBirds(false)

          // Pausa de 3 segundos antes de la segunda animación
          const timer2 = setTimeout(() => {
            // Iniciar segunda animación (diagonal)
            console.log("Iniciando animación diagonal de pájaros")
            setShowDiagonalBirds(true)

            // Programar el fin de la segunda animación y reiniciar el ciclo
            const timer3 = setTimeout(() => {
              console.log("Finalizando animación diagonal de pájaros")
              setShowDiagonalBirds(false)

              // Pausa de 3 segundos antes de reiniciar el ciclo
              const timer4 = setTimeout(() => {
                console.log("Reiniciando ciclo de animaciones")
                runAnimationCycle()
              }, pauseBetweenAnimations)
              timersRef.current.push(timer4)
            }, secondAnimationDuration)
            timersRef.current.push(timer3)
          }, pauseBetweenAnimations)
          timersRef.current.push(timer2)
        }, firstAnimationDuration)
        timersRef.current.push(timer1)
      } catch (error) {
        console.error("Error en la secuencia de animación:", error)
        // Reintentar la animación después de un tiempo si falla
        const recoveryTimer = setTimeout(runAnimationCycle, 5000)
        timersRef.current.push(recoveryTimer)
      }
    }

    // Iniciar el ciclo de animaciones inmediatamente
    console.log("Iniciando secuencia de animación de pájaros")
    runAnimationCycle()
  }

  // Añadir un useEffect específico para iniciar las animaciones
  useEffect(() => {
    // Iniciar la secuencia de animaciones con un pequeño retraso para asegurar que todo esté cargado
    const initTimer = setTimeout(() => {
      startAnimationSequence()
    }, 1000)

    return () => {
      clearTimeout(initTimer)
    }
  }, []) // Este efecto solo se ejecuta una vez al montar el componente

  return (
    <div className="parallax-container">
      {/* Primera sección - Hero con parallax */}
      <section id="top">
        {/* 1. Imagen de fondo (capa más atrás) */}
        <Image
          src="/assets/imagenes/parallax/portada principal.jpg"
          alt="Fondo"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", zIndex: 1 }}
        />

        {/* 2. Animación de pájaros volando (capa intermedia) */}
        <div className={`flying-birds ${showBirds ? "animate-birds" : ""}`}>
          <Image
            src="/assets/imagenes/parallax/pajaros1.gif"
            alt="Pájaros volando"
            width={90}
            height={75}
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* Animación diagonal de pájaros */}
        <div className={`flying-birds-diagonal ${showDiagonalBirds ? "animate-birds-diagonal" : ""}`}>
          <Image
            src="/assets/imagenes/parallax/pajaros3.gif"
            alt="Pájaros volando en diagonal"
            width={90}
            height={75}
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* 3. Montañas (capa superior) */}
        <Image
          src="/assets/imagenes/parallax/2.png"
          alt="Montaña izquierda"
          id="mountain_left"
          ref={mountainLeftRef}
          fill
          sizes="100vw"
          style={{ objectFit: "cover", zIndex: 3 }}
        />

        <Image
          src="/assets/imagenes/parallax/3.png"
          alt="Montaña derecha"
          id="mountain_right"
          ref={mountainRightRef}
          fill
          sizes="100vw"
          style={{ objectFit: "cover", zIndex: 3 }}
        />

        {/* 4. Texto (capa superior a todo) */}
        <h2 id="text" ref={textRef}>
          Central de Cooperativas <br />
          Las Diosas R.L
          <br />
        </h2>
      </section>

      {/* Sección de información */}
      <section id="sec">
        <h2>Conoce acerca de nosotras</h2>
        <p>
          La Central de Cooperativas Las Diosas es una organización de segundo grado, integrada por mujeres campesinas,
          que agrupa a ocho cooperativas de base. Las cuales estan ubicadas en los diferentes departamentos del país
          siendo estos Estelí, Matagalpa, Nueva Segovia y Jinotega al norte de Nicaragua.
        </p>
      </section>

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
              La organización esta integrada por más de cuatrocientas mujeres que se dedican al procesamiento de café y
              miel generando beneficos ya que la organización les ha permitido salir adelante y ser piezas claves en la
              economía de sus familias y de su comunidad.
            </p>
          </div>
        </section>

        <section>
          <div className="parallax-two">
            <h2>LO QUE HACEMOS</h2>
          </div>
        </section>

        <section>
          <div className="block">
            <p className="colored-paragraph">
              <span className="first-character ny">A</span> la fecha, la cooperativa se dedica a la producción de café,
              miel y la agregación de valor a la flor de jamaica la cual es comercializada en mermelada, té y vino,
              productos que se van posicionando en el mercado nacional e internacional.
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
              <span className="first-character atw">L</span>a Central de Cooperativas Las Diosas es una organización de
              segundo grado integrando mujeres campesinas, que agrupa a ocho cooperativas de base. Las socias están
              ubicadas en diferentes comunidades y zonas productivas de los departamentos de Estelí, Matagalpa, Nueva
              Segovia y Jinotega, al norte de Nicaragua. La Central Las Diosas, organización certificada con el comercio
              justo, producción orgánica y sello a la producción más limpia, surgió el 17 de mayo de 2012 como un sujeto
              insurgente indignado por las desigualdades que padecían las mujeres desde antes del 2004 que se habían
              constituido las primeras cooperativas, con una agenda propia que dio respuestas afirmativas a las mujeres
              campesinas. Promueve el fortalecimiento organizativo de las cooperativas de base asociadas a la central,
              estas se dividen en ocho grupos, aglomeran a cuatrocientos treinta mujeres productoras, apicultoras
              pertenecientes a quince comunidades donde tiene trabajo las Diosas en la región norte del país.
            </p>
            <p className="line-break margin-top-10"></p>
            <p className="colored-paragraph margin-top-10">
              De esta manera, poco a poco hemos ido construyendo una organización que ha logrado posicionarse en el
              mercado nacional e internacional, siendo un referente en la producción de café y miel, así como en la
              comercialización de productos agroecológicos. La Central Las Diosas ha sido reconocida por su compromiso
              con la equidad de género y la defensa de los derechos de las mujeres, convirtiéndose en un modelo a seguir
              para otras organizaciones cooperativas en el país. Logrando asi colocarnos a la vanguardia en la actividad
              productiva a nivel nacional.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
