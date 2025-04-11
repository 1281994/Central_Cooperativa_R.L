"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"

// Extender la interfaz HTMLDivElement para incluir la propiedad timer
interface DragContainer extends HTMLDivElement {
  timer?: number
}
// Datos para los slides
const slidesData = [
  {
    type: "video",
    src: "/assets/videos/Cooperativa Central.mp4",
    title: "Cooperativa 01",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, neque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, ex.",
  },
  {
    type: "image",
    src: "/assets/imagenes/logoLasDiosas.png",
    title: "Cooperativa 02",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, neque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, ex.",
  },
  {
    type: "image",
    src: "/assets/imagenes/cooperativa 1.jpg",
    title: "Cooperativa 03",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, neque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, ex.",
  },
  {
    type: "image",
    src: "/assets/imagenes/centraldiosas.jpg",
    title: "Cooperativa 04",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, neque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, ex.",
  },
  {
    type: "image",
    src: "/assets/imagenes/cooperativa 2.jpg",
    title: "Cooperativa 05",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, neque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, ex.",
  },
  {
    type: "image",
    src: "/assets/imagenes/cooperativa 3.jpg",
    title: "Cooperativa 06",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, neque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, ex.",
  },
  {
    type: "image",
    src: "/assets/imagenes/cooperativa 4.jpg",
    title: "Cooperativa 07",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, neque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, ex.",
  },
  {
    type: "image",
    src: "/assets/imagenes/cooperativa 5.jpg",
    title: "Cooperativa 08",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, neque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, ex.",
  },
  {
    type: "image",
    src: "/assets/imagenes/productos/granos.jpg",
    title: "Cooperativa 09",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, neque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, ex.",
  },
  {
    type: "image",
    src: "/assets/imagenes/cooperativa.jpg",
    title: "Cooperativa 10",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, neque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, ex.",
  },
]

export default function Slider() {
  const [itemActive, setItemActive] = useState(0)
  const [autoplayInterval, setAutoplayInterval] = useState<NodeJS.Timeout | null>(null)
  const dragContainerRef = useRef<DragContainer>(null)
  const spinContainerRef = useRef<HTMLDivElement>(null)
  const groundRef = useRef<HTMLDivElement>(null)

  // Función para mostrar slides
  const showSlider = (index: number) => {
    setItemActive(index)
  }

  // Función para ir al siguiente slide
  const nextSlide = () => {
    const newActive = (itemActive + 1) % slidesData.length
    showSlider(newActive)
  }

  // Función para ir al slide anterior
  const prevSlide = () => {
    const newActive = (itemActive - 1 + slidesData.length) % slidesData.length
    showSlider(newActive)
  }

  // Inicializar carrusel 3D
  useEffect(() => {
    // Variables para el carrusel 3D
    let radius = 340
    const rotateSpeed = 60
    let imgWidth = 150
    let imgHeight = 220
    const autoRotate = true
    let tX = 0
    // Variable tY declarada pero no utilizada, la comentamos para evitar el error
    // let tY = 10

    // Función para ajustar tamaño de thumbnails según pantalla
    const adjustThumbnailSize = () => {
      // Obtener el ancho de la ventana
      const windowWidth = window.innerWidth

      // Ajustar el radio según el ancho de la ventana
      if (windowWidth <= 400) {
        radius = 180
        imgWidth = 60
        imgHeight = 90
      } else if (windowWidth <= 480) {
        radius = 200
        imgWidth = 70
        imgHeight = 105
      } else if (windowWidth <= 576) {
        radius = 220
        imgWidth = 80
        imgHeight = 120
      } else if (windowWidth <= 768) {
        radius = 240
        imgWidth = 90
        imgHeight = 135
      } else if (windowWidth <= 992) {
        radius = 280
        imgWidth = 100
        imgHeight = 150
      } else {
        radius = 320
        imgWidth = 120
        imgHeight = 180
      }

      // Aplicar los cambios a los elementos
      if (spinContainerRef.current) {
        spinContainerRef.current.style.width = imgWidth + "px"
        spinContainerRef.current.style.height = imgHeight + "px"
      }

      if (groundRef.current) {
        groundRef.current.style.width = radius * 3 + "px"
        groundRef.current.style.height = radius * 3 + "px"
      }

      // Ajustar la posición vertical del carrusel
      const thumbnailContainer = document.querySelector(".thumbnail")
      if (thumbnailContainer) {
        // Ajustar la posición según el tamaño de la pantalla
        if (windowWidth <= 400) {
          ;(thumbnailContainer as HTMLElement).style.bottom = "200px"
        } else if (windowWidth <= 480) {
          ;(thumbnailContainer as HTMLElement).style.bottom = "180px"
        } else if (windowWidth <= 576) {
          ;(thumbnailContainer as HTMLElement).style.bottom = "150px"
        } else if (windowWidth <= 768) {
          ;(thumbnailContainer as HTMLElement).style.bottom = "120px"
        } else if (windowWidth <= 992) {
          ;(thumbnailContainer as HTMLElement).style.bottom = "90px"
        } else {
          ;(thumbnailContainer as HTMLElement).style.bottom = "100px"
        }
      }

      // Reinicializar el carrusel con los nuevos tamaños
      initCarousel(0.1)
    }

    // Inicializar el carrusel 3D
    const initCarousel = (delayTime?: number) => {
      const thumbnails = document.querySelectorAll(".thumbnail .item")
      thumbnails.forEach((thumbnail, i) => {
        const element = thumbnail as HTMLElement
        element.style.transform = `rotateY(${i * (360 / thumbnails.length)}deg) translateZ(${radius}px)`
        element.style.transition = "transform 1s"
        element.style.transitionDelay = delayTime ? `${delayTime}s` : `${(thumbnails.length - i) / 4}s`
      })
    }

    // Aplicar transformación
    const applyTransform = (obj: HTMLElement) => {
      obj.style.transform = `rotateX(-10deg) rotateY(${tX}deg)`
    }

    // Evento de rotación automática
    if (autoRotate && spinContainerRef.current) {
      const animationName = "spin"
      spinContainerRef.current.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`
    }

    // Inicializar
    adjustThumbnailSize()
    setTimeout(() => initCarousel(), 1000)

    // Eventos de arrastre
    let sX: number,
      sY: number,
      nX: number,
      nY: number,
      desX = 0,
      desY = 0
    const odrag = dragContainerRef.current

    const handlePointerDown = (e: PointerEvent) => {
      if (odrag && odrag.timer) {
        clearInterval(odrag.timer)
      }

      e = e || window.event
      sX = e.clientX
      sY = e.clientY

      // Usar estas funciones para manejar los eventos
      const handlePointerMove = (e: PointerEvent) => {
        e = e || window.event
        nX = e.clientX
        nY = e.clientY
        desX = nX - sX
        desY = nY - sY
        tX += desX * 0.1
        // tY += desY * 0.1 - No usamos tY para evitar el error

        if (odrag) applyTransform(odrag)

        sX = nX
        sY = nY
      }

      const handlePointerUp = () => {
        if (odrag) {
          odrag.timer = window.setInterval(() => {
            desX *= 0.95
            desY *= 0.95
            tX += desX * 0.1
            // tY += desY * 0.1 - No usamos tY para evitar el error

            applyTransform(odrag)

            if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
              clearInterval(odrag.timer)

              // Reiniciar animación
              if (spinContainerRef.current && autoRotate) {
                const animationName = "spin"
                spinContainerRef.current.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`
              }
            }
          }, 17)
        }

        // Eliminar los event listeners cuando se suelta el puntero
        window.removeEventListener("pointermove", handlePointerMove)
        window.removeEventListener("pointerup", handlePointerUp)
      }

      // Agregar event listeners solo mientras se arrastra
      window.addEventListener("pointermove", handlePointerMove)
      window.addEventListener("pointerup", handlePointerUp)

      return false
    }

    // Asignar el evento solo al contenedor del carrusel
    if (dragContainerRef.current) {
      dragContainerRef.current.onpointerdown = handlePointerDown
    }

    // Resize event
    window.addEventListener("resize", adjustThumbnailSize)

    return () => {
      // Limpiar el evento al desmontar
      if (dragContainerRef.current) {
        dragContainerRef.current.onpointerdown = null
      }
      window.removeEventListener("resize", adjustThumbnailSize)
      if (odrag && odrag.timer) {
        clearInterval(odrag.timer)
      }
    }
  }, [])

  // Configurar el autoplay para avanzar por todos los slides
  useEffect(() => {
    // Limpiar cualquier intervalo existente
    if (autoplayInterval) {
      clearInterval(autoplayInterval)
    }

    // Configurar un nuevo intervalo
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    setAutoplayInterval(interval)

    // Limpiar el intervalo cuando el componente se desmonte
    return () => {
      if (autoplayInterval) {
        clearInterval(autoplayInterval)
      }
    }
  }, [itemActive, autoplayInterval])

  // Efecto para mostrar botones con animación al cambiar de slide
  useEffect(() => {
    const buttons = document.querySelectorAll(`.slider .list .item:nth-child(${itemActive + 1}) .buttons button`)
    buttons.forEach((button) => {
      button.classList.remove("show")
      setTimeout(() => {
        button.classList.add("show")
      }, 100)
    })
  }, [itemActive])

  // Función para renderizar el contenido del slide según su tipo
  const renderSlideContent = (slide: (typeof slidesData)[0], index: number, isThumbnail = false) => {
    if (slide.type === "video") {
      return <video src={slide.src} controls autoPlay muted loop className="video-class" />
    } else {
      // Para imágenes
      try {
        if (isThumbnail) {
          return (
            <Image
              src={slide.src || "/placeholder.svg"}
              alt={slide.title}
              width={150}
              height={220}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
          )
        } else {
          return (
            <div style={{ width: "100%", height: "100%", position: "relative" }}>
              <Image src={slide.src || "/placeholder.svg"} alt={slide.title} fill style={{ objectFit: "cover" }} />
            </div>
          )
        }
      } catch (_error) {
        // Fallback para imágenes que no se encuentran (cambiamos 'error' por '_error' para evitar el error de variable no utilizada)
        if (isThumbnail) {
          return (
            <Image
              src={`/placeholder.svg?height=220&width=150&text=Coop ${index + 1}`}
              alt={`Cooperativa ${index + 1}`}
              width={150}
              height={220}
              style={{ objectFit: "cover" }}
            />
          )
        } else {
          return (
            <div style={{ width: "100%", height: "100%", position: "relative" }}>
              <Image
                src={`/placeholder.svg?height=1080&width=1920&text=Cooperativa ${index + 1}`}
                alt={`Cooperativa ${index + 1}`}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          )
        }
      }
    }
  }

  return (
    <div className="slider">
      {/* List Items */}
      <div className="list">
        {slidesData.map((slide, index) => (
          <div key={index} className={`item ${index === itemActive ? "active" : ""}`}>
            {renderSlideContent(slide, index)}
            <div className="content">
              <p>{">Alex Design<<"}</p>
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
              <div className="buttons">
                <button className="btn-17">
                  <span className="text-container">
                    <span className="text">Ir al Sitio</span>
                  </span>
                </button>
                <button className="btn-17">
                  <span className="text-container">
                    <span className="text">SUBSCRIBE</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Button arrows */}
      <div className="arrows">
        <button id="prev" onClick={prevSlide}>
          {"<"}
        </button>
        <button id="next" onClick={nextSlide}>
          {">"}
        </button>
      </div>

      {/* Thumbnail (carrusel 3D) */}
      <div className="thumbnail">
        <div id="drag-container" ref={dragContainerRef}>
          <div id="spin-container" ref={spinContainerRef}>
            {slidesData.map((slide, index) => (
              <div
                key={index}
                className={`item ${index === itemActive ? "active" : ""}`}
                onClick={() => showSlider(index)}
              >
                {renderSlideContent(slide, index, true)}
                <div className="content">{slide.title}</div>
              </div>
            ))}
            {/* Texto en el centro del carrusel */}
            <p>Cooperativa Las Diosas</p>
          </div>
          <div id="ground" ref={groundRef}></div>
        </div>
      </div>
    </div>
  )
}
