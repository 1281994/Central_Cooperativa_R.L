"use client"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import "./Cooperativa.css"

export default function Cooperativa() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = 4

  // Función para avanzar al siguiente slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
  }

  // Función para retroceder al slide anterior
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
  }

  // Actualizar el indicador activo cuando cambia el slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 7500) // Cambiar slide cada 7.5 segundos

    return () => clearInterval(interval)
  }, [currentSlide])

  // Datos para los slides
  const slidesData = [
    {
      title: "Cooperativa Mujeres en Desarrollo R.L",
      description:
        "La Cooperativa COPEMUDESA R.L trabajamos bajo un foque agroecológico como proceso, para la promoción y la conservación de los recursos naturales.",
      image: "/assets/imagenes/cooperativa/cooperativa1.jpeg",
      link: "https://cooperativa-multisectorial-mujeres-desarollo.vercel.app/",
    },
    {
      title: "Cooperativa  Luz entre Mujeres R.L",
      description:
        "La cooperativa Multisectorial Luz Entre Mujeres R.L con sus siglas COOPELUZ R.L ubicada en la comunidad Guasuyuca, Municipio Pueblo Nuevo, Departamento Estelí.",
      image: "/assets/imagenes/cooperativa/cooperativa2.jpeg",
      link: "https://coopeluzrl.netlify.app/",
    },
    {
      title: "Cooperativa Mujeres del Norte R.L.",
      description:
        "(COPEMUJER R.L.), ubicada en la comunidad Los Llanos No. 1, municipio de Pueblo Nuevo, Estelí, fue constituida el 18 de noviembre de 2004 por 36 mujeres.",
      image: "/assets/imagenes/cooperativa/cooperativa3.jpeg",
      link: "https://mujeresdelnorte.netlify.app/",
    },
    {
      title: "Cooperativa Mujeres Trabajadoras de Dipilto R.L.",
      description:
        "Forma parte de nuestra comunidad y contribuye al desarrollo económico de las mujeres rurales. Juntas podemos crear un futuro más justo y sostenible para todas.",
      image: "/assets/imagenes/cooperativa/cooperativa4.jpeg",
      link: "https://v0-single-file-styling.vercel.app/",
    },
  ]

  return (
    <div className="cooperativa-container">
      {/* Encabezado superior */}
      <div className="cooperativa-header">
        <h2>Cooperativa Multisectorial</h2>
      </div>

      <div id="slider">
        {/* Botones de navegación */}
        <button className="nav-button prev" onClick={prevSlide} aria-label="Slide anterior">
          <ChevronLeft size={24} />
        </button>
        <button className="nav-button next" onClick={nextSlide} aria-label="Siguiente slide">
          <ChevronRight size={24} />
        </button>

        {/* Overlay estático */}
        <div className="static-legend"></div>

        {/* Slides con imágenes */}
        <div className="slides-container">
          {slidesData.map((slide, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? "active" : ""}`}
              style={{
                transform:
                  index === currentSlide
                    ? "translateX(0)"
                    : index < currentSlide
                      ? `translateX(-100%)`
                      : `translateX(100%)`,
              }}
            >
              <img src={slide.image || "/placeholder.svg"} alt={slide.title} />
            </div>
          ))}
        </div>

        {/* Contenido de texto (títulos, descripción y botón) */}
        <div className="content-overlay">
          {slidesData.map((slide, index) => (
            <div key={index} className={`slide-content ${index === currentSlide ? "active" : ""}`}>
              <h1>{slide.title}</h1>
              <h2>{slide.description}</h2>
              <a href={slide.link} className="site-button">
                Ir al Sitio
              </a>
            </div>
          ))}
        </div>

        {/* Indicadores */}
        <div className="switch">
          <ul>
            {slidesData.map((_, index) => (
              <li key={index} onClick={() => setCurrentSlide(index)}>
                {index === currentSlide && <div className="on"></div>}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Encabezado inferior */}
      <div className="cooperativa-header">
        <h2>COOPERATIVAS</h2>
      </div>
    </div>
  )
}
