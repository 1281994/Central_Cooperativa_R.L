"use client";

import { useEffect, useRef } from "react";
import "./ProductosCards.css";

interface ProductCard {
  id: number;
  title: string;
  description: string;
  timeAgo: string;
  readTime: number;
  views: number;
  comments: number;
  image: string;
  color: string;
}

export default function ProductosCards() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const productCards: ProductCard[] = [
  {
    id: 1,
    title: "Café Orgánico",
    description: "...",
    timeAgo: "1 semana",
    readTime: 4,
    views: 5123,
    comments: 32,
    image: "/assets/imagenes/productos/cafe-organico-molido-P.png",
    color: "#e91e63",
  },
  {
    id: 2,
    title: "Miel Natural",
    description: "...",
    timeAgo: "2 semanas",
    readTime: 7,
    views: 7152,
    comments: 21,
    image: "/assets/imagenes/productos/miel-de-abeja-P.png",
    color: "#ff5722",
  },
  {
    id: 3,
    title: "Flor de Jamaica",
    description: "...",
    timeAgo: "3 semanas",
    readTime: 5,
    views: 3021,
    comments: 15,
    image: "/assets/imagenes/productos/flor-de-jamaica-P.png",
    color: "#4caf50",
  },
  {
    id: 4,
    title: "Vino de Jamaica",
    description: "...",
    timeAgo: "1 mes",
    readTime: 6,
    views: 4562,
    comments: 27,
    image: "/assets/imagenes/productos/vino-de-rosa-de-jamaica-P.png",
    color: "#9c27b0",
  },
  {
    id: 5,
    title: "Café Molido",
    description: "...",
    timeAgo: "2 meses",
    readTime: 3,
    views: 6789,
    comments: 18,
    image: "/assets/imagenes/productos/miel-de-abeja2-P.png",
    color: "#ff9800",
  },
  {
    id: 6,
    title: "Mermelada de Jamaica",
    description: "...",
    timeAgo: "3 meses",
    readTime: 5,
    views: 2468,
    comments: 14,
    image: "/assets/imagenes/productos/mermelada-de-jamaica-P.png",
    color: "#8bc34a",
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
  );
}