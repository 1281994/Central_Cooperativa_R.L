"use client"

import { useState, useEffect, type RefObject } from "react"

// Extender la interfaz HTMLDivElement para incluir la propiedad timer
interface DragContainer extends HTMLDivElement {
  timer?: number
}

interface UseCarouselProps {
  totalItems: number
  autoPlayInterval?: number
  dragContainerRef: RefObject<DragContainer>
  spinContainerRef: RefObject<HTMLDivElement>
  groundRef: RefObject<HTMLDivElement>
}

interface UseCarouselReturn {
  itemActive: number
  setItemActive: (index: number) => void
  nextSlide: () => void
  prevSlide: () => void
}

export function useCarousel({
  totalItems,
  autoPlayInterval = 5000,
  dragContainerRef,
  spinContainerRef,
  groundRef,
}: UseCarouselProps): UseCarouselReturn {
  const [itemActive, setItemActive] = useState(0)

  // Función para mostrar slides
  const showSlider = (index: number) => {
    setItemActive(index)
  }

  // Función para ir al siguiente slide
  const nextSlide = () => {
    const newActive = (itemActive + 1) % totalItems
    showSlider(newActive)
  }

  // Función para ir al slide anterior
  const prevSlide = () => {
    const newActive = (itemActive - 1 + totalItems) % totalItems
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
    let tY = 10

    // Función para ajustar tamaño de thumbnails según pantalla
    const adjustThumbnailSize = () => {
      if (window.innerWidth <= 768) {
        imgWidth = 120
        imgHeight = 180
        radius = 300
      }
      if (window.innerWidth <= 576) {
        imgWidth = 100
        imgHeight = 150
        radius = 260
      }

      if (spinContainerRef.current) {
        spinContainerRef.current.style.width = imgWidth + "px"
        spinContainerRef.current.style.height = imgHeight + "px"
      }

      if (groundRef.current) {
        groundRef.current.style.width = radius * 3 + "px"
        groundRef.current.style.height = radius * 3 + "px"
      }
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

      document.onpointermove = (e) => {
        e = e || window.event
        nX = e.clientX
        nY = e.clientY
        desX = nX - sX
        desY = nY - sY
        tX += desX * 0.1
        tY += desY * 0.1

        if (odrag) applyTransform(odrag)

        sX = nX
        sY = nY
      }

      document.onpointerup = () => {
        if (odrag) {
          odrag.timer = window.setInterval(() => {
            desX *= 0.95
            desY *= 0.95
            tX += desX * 0.1
            tY += desY * 0.1

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

        document.onpointermove = document.onpointerup = null
      }

      return false
    }

    document.onpointerdown = handlePointerDown

    // Auto run slider
    const refreshInterval = setInterval(nextSlide, autoPlayInterval)

    // Resize event
    window.addEventListener("resize", adjustThumbnailSize)

    return () => {
      document.onpointerdown = null
      window.removeEventListener("resize", adjustThumbnailSize)
      clearInterval(refreshInterval)
      if (odrag && odrag.timer) {
        clearInterval(odrag.timer)
      }
    }
  }, [])

  // Efecto para mostrar botones con animación al cambiar de slide
  useEffect(() => {
    const buttons = document.querySelectorAll(`.slider .list .item:nth-child(${itemActive + 1}) .buttons button`)
    buttons.forEach((button) => {
      button.classList.remove("show")
      setTimeout(() => {
        button.classList.add("show")
      }, 100)
    })

    // Resetear intervalo de autoplay
    const refreshInterval = setInterval(nextSlide, autoPlayInterval)
    return () => clearInterval(refreshInterval)
  }, [itemActive, autoPlayInterval])

  return { itemActive, setItemActive: showSlider, nextSlide, prevSlide }
}

