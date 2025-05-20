"use client";

import { useEffect, useRef } from "react";
import "./ProductosCards.css";

interface ProductCard {
  id: number;
  title: string;
  description: string;
  timeAgo: string;
  medida: string;
  medidaSup?: string;
  precio: string;
  cantidad: number;
  image: string;
  color: string;
}

export default function ProductosCards() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const productCards: ProductCard[] = [
    {
      id: 1,
      title: "Café Orgánico",
      description: "Café orgánico molido, cultivado en la región de Esteli.",
      timeAgo: "1 semana",
      medida: "400",
      medidaSup: "gr",
      precio: "C$450.00",
      cantidad: 1,
      image: "/assets/imagenes/productos/cafe.png",
      color: "#bf6805",
    },
    {
      id: 2,
      title: "Miel de Abeja multifloral",
      description: "Producida por abejas que polinizan flores de Jamaica.",
      timeAgo: "2 semanas",
      medida: "365",
      medidaSup: "ml",
      precio: "C$110.00",
      cantidad: 1,
      image: "/assets/imagenes/productos/miel1.png",
      color: "#bfb705",
    },
    {
      id: 3,
      title: "Flor de Jamaica",
      description: "Producto natural, rico en antioxidantes y vitaminas.",
      timeAgo: "3 semanas",
      medida: "",
      precio: "C$450.00",
      cantidad: 1,
      image: "/assets/imagenes/productos/flordejamaica.png",
      color: "#bf055f",
    },
    {
      id: 4,
      title: "Vino de Jamaica",
      description: "Vino elaborado con flor de Jamaica y añejado naturalmente.",
      timeAgo: "1 mes",
      medida: "750",
      medidaSup: "ml",
      precio: "C$220.00",
      cantidad: 1,
      image: "/assets/imagenes/productos/vino.png",
      color: "#9c27b0",
    },
    {
      id: 5,
      title: "Miel de Abeja edición grande",
      description: "Producto natural, rico en antioxidantes y vitaminas.",
      timeAgo: "2 meses",
      medida: "",
      precio: "C$450.00",
      cantidad: 1,
      image: "/assets/imagenes/productos/miel2.png",
      color: "#ff9800",
    },
    {
      id: 6,
      title: "Mermelada de Jamaica",
      description: "Deliciosa mermelada elaborada con flor de Jamaica.",
      timeAgo: "3 meses",
      medida: "60",
      medidaSup: "gr",
      precio: "C$80.00",
      cantidad: 1,
      image: "/assets/imagenes/productos/mermelada.png",
      color: "#bf055a",
    },
  ];

  useEffect(() => {
    if (!wrapperRef.current) return;

    const wrapper = wrapperRef.current;
    let animationFrameIds: number[] = [];
    let isMounted = true;

    const createBox = () => {
      const box = document.createElement("div");
      box.classList.add("box");

      const size = Math.floor(Math.random() * (75 - 15)) + 15;
      box.style.width = `${size}px`;
      box.style.height = `${size}px`;

      const maxX = wrapper.clientWidth;
      const y = wrapper.clientHeight + size;
      const x = Math.floor(Math.random() * maxX);

      const speedX = Math.random() * 2 - 1;
      const speedY = Math.random() * -2 - 0.2;
      const speedAngle = Math.random() * 6 - 3;

      let angle = Math.floor(Math.random() * 360);
      box.style.transform = `translateX(${x}px) translateY(${y}px) rotateZ(${angle}deg)`;

      wrapper.appendChild(box);

      let posX = x;
      let posY = y;
      let currentAngle = angle;

      const animateBox = () => {
        if (!isMounted || !wrapper.contains(box)) {
          return;
        }

        posX += speedX;
        posY += speedY;
        currentAngle += speedAngle;

        box.style.transform = `translateX(${posX}px) translateY(${posY}px) rotateZ(${currentAngle}deg)`;

        if (posY < -size || posX < -size || posX > wrapper.clientWidth + size) {
          if (wrapper.contains(box)) {
            wrapper.removeChild(box);
          }
          return;
        }

        const animationId = requestAnimationFrame(animateBox);
        animationFrameIds.push(animationId);
      };

      animateBox();
    };

    const interval = setInterval(() => {
      if (Math.random() < 0.25) {
        createBox();
      }
    }, 250);

    for (let i = 0; i < 10; i++) {
      createBox();
    }

    return () => {
      isMounted = false;
      clearInterval(interval);
      animationFrameIds.forEach((id) => cancelAnimationFrame(id));
      if (wrapper) {
        wrapper.innerHTML = "";
      }
    };
  }, []);

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
                <span className="time-ago" style={{ color: card.color }}>{card.timeAgo}</span>
                <h3 className="card-title">{card.title}</h3>
                <p className="card-description">{card.description}</p>
              </div>
              <div className="card-footer" style={{ backgroundColor: card.color }}>
                <div className="stat">
                  <span className="stat-value">
                    {card.medida}
                    <sup>{card.medidaSup}</sup>

                  </span>
                  <span className="stat-label">MEDIDA</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{card.precio}</span>
                  <span className="stat-label">PRECIO</span>
                </div>
                <div className="stat">
                  <span className="stat-value">{card.cantidad}</span>
                  <span className="stat-label">CANTIDAD</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}