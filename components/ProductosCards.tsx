"use client"

import { useEffect, useRef } from "react"
import "./ProductosCards.css"

interface ProductCard {
  id: number
  title: string
  description: string
  timeAgo: string
  readTime: number
  views: number
  comments: number
  image: string
  color: string
}

export default function ProductosCards() {
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Datos de las tarjetas de productos
  const productCards: ProductCard[] = [
    {
      id: 1,
      title: "Café Orgánico",
      description:
        "Nuestro café orgánico es cultivado por mujeres campesinas bajo sombra, respetando los ciclos naturales y sin utilizar productos químicos.",
      timeAgo: "1 semana",
      readTime: 4,
      views: 5123,
      comments: 32,
      image: "/assets/imagenes/productos/cafe organico molido.png",
      color: "#e91e63", // Rosa
    },
    {
      id: 2,
      title: "Miel Natural",
      description:
        "Miel 100% natural producida por abejas que se alimentan de flores silvestres, sin aditivos ni conservantes, manteniendo todas sus propiedades.",
      timeAgo: "2 semanas",
      readTime: 7,
      views: 7152,
      comments: 21,
      image: "/assets/imagenes/productos/miel.jpeg",
      color: "#ff5722", // Naranja
    },
    {
      id: 3,
      title: "Flor de Jamaica",
      description:
        "Flor de jamaica deshidratada orgánica, perfecta para preparar refrescantes bebidas, tés e infusiones con propiedades antioxidantes.",
      timeAgo: "3 semanas",
      readTime: 5,
      views: 3021,
      comments: 15,
      image: "/assets/imagenes/productos/jamaica.jpeg",
      color: "#4caf50", // Verde
    },
    {
      id: 4,
      title: "Vino de Jamaica",
      description:
        "Delicioso vino artesanal elaborado a partir de flor de jamaica, con un sabor único y un proceso de fermentación natural y tradicional.",
      timeAgo: "1 mes",
      readTime: 6,
      views: 4562,
      comments: 27,
      image: "/assets/imagenes/productos/vino.jpeg",
      color: "#9c27b0", // Púrpura
    },
    {
      id: 5,
      title: "Café Molido",
      description:
        "Café molido de altura, tostado artesanalmente para resaltar sus notas de chocolate y frutos secos. Ideal para un despertar perfecto.",
      timeAgo: "2 meses",
      readTime: 3,
      views: 6789,
      comments: 18,
      image: "/assets/imagenes/productos/cafe-molido.jpeg",
      color: "#ff9800", // Ámbar
    },
    {
      id: 6,
      title: "Mermelada de Jamaica",
      description:
        "Mermelada artesanal de flor de jamaica, elaborada con ingredientes naturales. Deliciosa combinación de dulzura y acidez para tus desayunos.",
      timeAgo: "3 meses",
      readTime: 5,
      views: 2468,
      comments: 14,
      image: "/assets/imagenes/productos/mermelada.jpeg",
      color: "#8bc34a", // Verde claro
    },
  ]

  useEffect(() => {
    // Implementación del fondo animado con cajas
    if (!wrapperRef.current) return

    const wrapper = wrapperRef.current
    const createBox = () => {
      const box = document.createElement("div")
      box.classList.add("box")

      // Tamaño aleatorio entre 15 y 75px
      const size = Math.floor(Math.random() * (75 - 15)) + 15
      box.style.width = `${size}px`
      box.style.height = `${size}px`

      // Posición inicial
      const maxX = wrapper.clientWidth
      const y = wrapper.clientHeight + size
      const x = Math.floor(Math.random() * maxX)

      // Velocidades aleatorias
      const speedX = Math.random() * 2 - 1 // Entre -1 y 1
      const speedY = Math.random() * -2 - 0.2 // Entre -2.2 y -0.2
      const speedAngle = Math.random() * 6 - 3 // Entre -3 y 3

      // Ángulo inicial aleatorio
      const angle = Math.floor(Math.random() * 360)

      box.style.transform = `translateX(${x}px) translateY(${y}px) rotateZ(${angle}deg)`

      // Añadir la caja al wrapper
      wrapper.appendChild(box)

      // Animar la caja
      let posX = x
      let posY = y
      let currentAngle = angle

      const animateBox = () => {
        if (!wrapper.contains(box)) return

        posX += speedX
        posY += speedY
        currentAngle += speedAngle

        box.style.transform = `translateX(${posX}px) translateY(${posY}px) rotateZ(${currentAngle}deg)`

        // Eliminar la caja si sale de la pantalla
        if (posY < -size || posX < -size || posX > wrapper.clientWidth + size) {
          wrapper.removeChild(box)
          return
        }

        requestAnimationFrame(animateBox)
      }

      animateBox()
    }

    // Crear cajas periódicamente
    const interval = setInterval(() => {
      if (Math.random() < 0.25) {
        // 25% de probabilidad de crear una caja
        createBox()
      }
    }, 250)

    // Crear algunas cajas iniciales
    for (let i = 0; i < 10; i++) {
      createBox()
    }

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="productos-section">
      <div id="wrapper" ref={wrapperRef}></div>

      <div className="content-container">
        <h2 className="section-title">Nuestros Productos</h2>
        <p className="section-description">
          Descubre nuestra variedad de productos elaborados por mujeres campesinas con métodos tradicionales y
          sostenibles, respetando el medio ambiente y promoviendo el comercio justo.
        </p>

        <div className="product-cards-container">
          {productCards.map((card) => (
            <div key={card.id} className="product-card">
              <div className="card-image">
                <img src={card.image || "/placeholder.svg"} alt={card.title} />
              </div>
              <div className="card-content">
                <span className="time-ago">{card.timeAgo}</span>
                <h3 className="card-title">{card.title}</h3>
                <p className="card-description">{card.description}</p>
              </div>
              <div className="card-footer" style={{ backgroundColor: card.color }}>
                <div className="stat">
                  <span className="stat-value">
                    {card.readTime}
                    <sup>m</sup>
                  </span>
                  <span className="stat-label">LECTURA</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{card.views}</span>
                  <span className="stat-label">VISTAS</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{card.comments}</span>
                  <span className="stat-label">COMENTARIOS</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
