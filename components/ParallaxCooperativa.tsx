"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import "./parallax-cooperativa.css"

export default function ParallaxCooperativa() {
  const mountainLeftRef = useRef<HTMLImageElement>(null)
  const mountainRightRef = useRef<HTMLImageElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const manRef = useRef<HTMLImageElement>(null)

  const [isIOS, setIsIOS] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showBirds, setShowBirds] = useState(false)
  const [showDiagonalBirds, setShowDiagonalBirds] = useState(false)
  const timersRef = useRef<NodeJS.Timeout[]>([])

  useEffect(() => {
    const isIOSDevice =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
    setIsIOS(isIOSDevice)

    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    setIsMobile(isMobileDevice)

    const handleScroll = () => {
      const value = window.scrollY
      const mobileFactor = isMobile ? 0.4 : 1.7
      const iosFactor = isIOS ? 7.8 : mobileFactor

      if (mountainLeftRef.current) {
        mountainLeftRef.current.style.left = `-${value / iosFactor}px`
      }

      if (mountainRightRef.current) {
        mountainRightRef.current.style.left = `${value / iosFactor}px`
      }

      if (textRef.current) {
        const textFactor = isMobile ? value * 0.5 : value
        textRef.current.style.bottom = `-${textFactor}px`
      }

      if (manRef.current) {
        manRef.current.style.height = `${window.innerHeight - (isMobile ? value * 0.7 : value)}px`
      }
    }

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

    const handleResize = () => {
      const isMobileDevice = window.innerWidth < 768
      setIsMobile(isMobileDevice)
      handleScroll()
    }

    window.addEventListener("resize", handleResize)
    handleScroll()
    startAnimationSequence()

    return () => {
      window.removeEventListener("scroll", scrollListener)
      window.removeEventListener("resize", handleResize)
      timersRef.current.forEach((timer) => clearTimeout(timer))
    }
  }, [isIOS, isMobile])

  const startAnimationSequence = () => {
    timersRef.current.forEach((timer) => clearTimeout(timer))
    timersRef.current = []

    const firstAnimationDuration = 15000
    const secondAnimationDuration = 15000
    const pauseBetweenAnimations = 3000

    const runAnimationCycle = () => {
      setShowBirds(true)
      setShowDiagonalBirds(false)

      const timer1 = setTimeout(() => {
        setShowBirds(false)
        const timer2 = setTimeout(() => {
          setShowDiagonalBirds(true)
          const timer3 = setTimeout(() => {
            setShowDiagonalBirds(false)
            const timer4 = setTimeout(runAnimationCycle, pauseBetweenAnimations)
            timersRef.current.push(timer4)
          }, secondAnimationDuration)
          timersRef.current.push(timer3)
        }, pauseBetweenAnimations)
        timersRef.current.push(timer2)
      }, firstAnimationDuration)
      timersRef.current.push(timer1)
    }

    runAnimationCycle()
  }

  return (
    <div className="parallax-container">
      <section id="top">
        {/* 1. Background Image (portada-principal.jpg) */}
        <Image
          src="/assets/imagenes/parallax/portada-principal.jpg"
          alt="Fondo"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", zIndex: 1 }}
        />

        {/* 2. Bird Animations */}
        <div className={`flying-birds ${showBirds ? "animate-birds" : ""}`}>
          <Image
            src="/assets/imagenes/parallax/pajaros1.gif"
            alt="Pájaros volando"
            width={90}
            height={75}
            style={{ objectFit: "contain" }}
          />
        </div>

        <div className={`flying-birds-diagonal ${showDiagonalBirds ? "animate-birds-diagonal" : ""}`}>
          <Image
            src="/assets/imagenes/parallax/pajaros3.gif"
            alt="Pájaros volando en diagonal"
            width={90}
            height={75}
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* 3. Text */}
        <h2 id="text" ref={textRef}>
          Central de Cooperativas <br />
          Las Diosas R.L
        </h2>

        {/* 4. Cespe Image */}
        <Image
          src="/assets/imagenes/parallax/cespe.png"
          alt="Cespe"
          id="cespe"
          fill
          sizes="100vw"
          style={{ objectFit: "cover", zIndex: 4 }}
        />

        {/* 5. Mountain Images (2.png and 3.png) */}
        <Image
          src="/assets/imagenes/parallax/2.png"
          alt="Montaña izquierda"
          id="mountain_left"
          ref={mountainLeftRef}
          fill
          sizes="100vw"
          style={{ objectFit: "cover", zIndex: 5 }}
        />

        <Image
          src="/assets/imagenes/parallax/3.png"
          alt="Montaña derecha"
          id="mountain_right"
          ref={mountainRightRef}
          fill
          sizes="100vw"
          style={{ objectFit: "cover", zIndex: 5 }}
        />
      </section>

      <section id="sec">
        <h2>Conoce acerca de nosotras</h2>
        <p>
          La Central de Cooperativas Las Diosas es una organización de segundo grado, integrada por mujeres campesinas,
          que agrupa a ocho cooperativas de base. Las cuales estan ubicadas en los diferentes departamentos del país
          siendo estos Estelí, Matagalpa, Nueva Segovia y Jinotega al norte de Nicaragua.
        </p>
      </section>

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
              <span className="first-character sc">B</span> rindamos servicios multisectoriales comprometidas con los
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
            <p className="colored-paragraph margin-top-10"></p>
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