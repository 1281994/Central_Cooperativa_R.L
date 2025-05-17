"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"
import "./ImageMarquee.css"

export default function ImageMarquee() {
  // Estado para el contador regresivo
  const [countdown, setCountdown] = useState({
    days: 6,
    hours: 8,
    minutes: 50,
    seconds: 0,
  })

  // Efecto para el contador regresivo
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        // Reiniciar el contador cuando llegue a cero
        return { days: 6, hours: 8, minutes: 50, seconds: 0 }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Formatear el contador para mostrarlo
  const formattedCountdown = `${countdown.days.toString().padStart(2, "0")}d : ${countdown.hours
    .toString()
    .padStart(2, "0")}h : ${countdown.minutes.toString().padStart(2, "0")}m : ${countdown.seconds
    .toString()
    .padStart(2, "0")}s`

  // Imágenes para el carrusel (primera fila)
  const images1 = [
    "/assets/imagenes/galeria/campo de frijoles.jpeg",
    "/assets/imagenes/galeria/campo de arroz.jpeg",
    "/assets/imagenes/galeria/arboles.jpeg",
   "/assets/imagenes/galeria/campo de flores2.jpeg",
    "/assets/imagenes/galeria/campo de frijol2.jpeg",
    "/assets/imagenes/galeria/campo de frijol.jpeg",
    "/assets/imagenes/galeria/campo de maiz.jpeg",
    "/assets/imagenes/galeria/capacitacion.jpeg",
    "/assets/imagenes/galeria/diplomas de las diosas.jpeg",
    "/assets/imagenes/galeria/entrega de herramientas.jpeg",
  ]

  // Imágenes para el carrusel (segunda fila)
  const images2 = [
    "/assets/imagenes/galeria/entrevista.jpeg",
    "/assets/imagenes/galeria/feria.jpeg",
    "/assets/imagenes/galeria/feria2.jpeg",
    "/assets/imagenes/galeria/flores.jpeg",
    "/assets/imagenes/galeria/juventud.jpeg",
    "/assets/imagenes/galeria/miel.jpeg",
    "/assets/imagenes/galeria/presentacion.jpeg",
    "/assets/imagenes/galeria/trabajo.jpeg",
    "/assets/imagenes/galeria/entrega de herramientas.jpeg",
    "/assets/imagenes/galeria/aceite de girasol.jpeg",
  ]

  return (
    <section id="content" className="image-marquee-section">
      <div className="block">
        <div className="inner">
          <div className="c-heading text-center">
            <div className="c-heading__top">
              <span className="budget-tag budget-tag--big">Nuestra actividades y lugares</span>
            </div>
            <div className="c-heading__middle">
              <h1 className="heading-3">
                Descubre nuestra comunidad trabadora
                <br />
                de mujeres rurales
              </h1>
            </div>
            <div className="c-heading__bottom">
              <div className="c-heading__large-desc">
                <span>conoce y enamorate de nuestra tierra nicaraguense, llena de mujeres emprendedoras.</span>
              </div>
             
            </div>
          </div>
        </div>

        {/* Carrusel de imágenes */}
        <div className="header-marquees">
          <div className="header-marquees__grid">
            <div className="header-marquees__track" style={{ "--slides-speed": "200s" } as React.CSSProperties}>
              {/* Primera fila de imágenes - duplicadas para crear efecto infinito */}
              {[...images1, ...images1].map((src, index) => (
                <div className="header-marquees__item" key={`row1-${index}`}>
                  <figure className="header-marquees__figure">
                    <img
                      className="header-marquees__img"
                      src={src || "/placeholder.svg"}
                      alt={`Producto ${index + 1}`}
                    />
                  </figure>
                </div>
              ))}
            </div>
          </div>

          <div className="header-marquees__grid">
            <div
              className="header-marquees__track"
              style={{ "--slides-speed": "200s", "--slides-direction": "reverse" } as React.CSSProperties}
            >
              {/* Segunda fila de imágenes - duplicadas para crear efecto infinito */}
              {[...images2, ...images2].map((src, index) => (
                <div className="header-marquees__item" key={`row2-${index}`}>
                  <figure className="header-marquees__figure">
                    <img
                      className="header-marquees__img"
                      src={src || "/placeholder.svg"}
                      alt={`Producto ${index + 11}`}
                    />
                  </figure>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sección circular con logo */}
        <div className="inner inner--xl">
          <div className="hero-discover">
            <div className="ring-text">
              <svg className="ring-text__svg" width="100" height="1000" viewBox="0 0 500 500">
                <defs>
                  <path
                    d="M50,250c0-110.5,89.5-200,200-200s200,89.5,200,200s-89.5,200-200,200S50,360.5,50,250"
                    id="textcircle"
                  ></path>
                </defs>
                <text dy="30" textLength="1220">
                  <textPath xlinkHref="#textcircle">CENTRAL DE COPERATIVA LAS DIOSAS R.L.</textPath>
                </text>
              </svg>
              <img
                width="1000"
                className="ring-text__logo"
                src="/assets/imagenes/logos/logoLasDiosas-remove.png"
                alt="Logo Cooperativa"
              />
            </div>
            <h2 className="hero-discover__heading">
              Únete a nuestra comunidad de apoyo a las mujeres rurales y disfruta de productos orgánicos de alta calidad
            </h2>
            <p className="hero-discover__desc">Más de 400 mujeres campesinas trabajando juntas</p>
            <div className="hero-discover__users">
              <img src="/assets/imagenes/cooperativa/mujer1.jpeg" width="40" height="40" alt="Miembro 1" />
              <img src="/assets/imagenes/cooperativa/mujer2.jpeg" width="40" height="40" alt="Miembro 2" />
              <img src="/assets/imagenes/cooperativa/mujer3.jpeg" width="40" height="40" alt="Miembro 3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
