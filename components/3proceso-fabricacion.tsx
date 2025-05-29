"use client"

import { useState, useEffect, useRef } from "react";
import "./proceso-fabricacion.css";

// Extender la interfaz HTMLDivElement para incluir la propiedad timer
interface DragContainer extends HTMLDivElement {
  timer?: number;
  autoRotateTimer?: number;
}

// Datos para los procesos
const procesos = [
  {
    id: 1,
    titulo: "Proceso del Café",
    descripcion: "Proceso completo de fabricación del café desde la planta hasta la taza",
    imagen: "/assets/imagenes/productos/cafe.png",
    color: "#8b5cf6",
    etapas: [
      {
        titulo: "First Step",
        descripcion: "Faucibus tempus mauris nunc tincidunt faucibus netus.",
        imagen: "/assets/imagenes/vino.jpg",
      },
      {
        titulo: "Second Step",
        descripcion: "Massa lectus vestibulum scelerisque malesuada turpis a dolor praesent.",
        imagen: "/assets/imagenes/h.jpg",
      },
      {
        titulo: "Third Step",
        descripcion: "Sit morbi laoreet volutpat volutpat.",
        imagen: "/assets/imagenes/h.jpg",
      },
      {
        titulo: "Fourth Step",
        descripcion: "Additional step for coffee production process.",
        imagen: "/assets/imagenes/h.jpg",
      },
      {
        titulo: "Fifth Step",
        descripcion: "Final step in the coffee production process.",
        imagen: "/assets/imagenes/h.jpg",
      },
    ],
    cooperativas: ["Cooperativa 1", "Cooperativa 2", "Cooperativa 3", "Cooperativa 4"],
  },
  {
    id: 2,
    titulo: "Proceso de la Mermelada de Jamaica",
    descripcion: "Elaboración artesanal de mermelada de flor de Jamaica",
    imagen: "/assets/imagenes/productos/mermelada.png",
    color: "#3b82f6",
    etapas: [
      {
        titulo: "First Step",
        descripcion: "Faucibus tempus mauris nunc tincidunt faucibus netus.",
        imagen: "/assets/imagenes/h.jpg",
      },
      {
        titulo: "Second Step",
        descripcion: "Massa lectus vestibulum scelerisque malesuada turpis a dolor praesent.",
        imagen: "/assets/imagenes/h.jpg",
      },
      {
        titulo: "Third Step",
        descripcion: "Sit morbi laoreet volutpat volutpat.",
        imagen: "/assets/imagenes/h.jpg",
      },
    ],
    cooperativas: ["Cooperativa 1", "Cooperativa 2"],
  },
  {
    id: 3,
    titulo: "Proceso del Vino de Jamaica",
    descripcion: "Proceso de fermentación para obtener vino de flor de Jamaica",
    imagen: "/assets/imagenes/productos/vino.png",
    color: "#ef4444",
    etapas: [
      {
        titulo: "First Step",
        descripcion: "Faucibus tempus mauris nunc tincidunt faucibus netus.",
        imagen: "/assets/imagenes/h.jpg",
      },
      {
        titulo: "Second Step",
        descripcion: "Massa lectus vestibulum scelerisque malesuada turpis a dolor praesent.",
        imagen: "/assets/imagenes/h.jpg",
      },
      {
        titulo: "Third Step",
        descripcion: "Sit morbi laoreet volutpat volutpat.",
        imagen: "/assets/imagenes/h.jpg",
      },
      {
        titulo: "Fourth Step",
        descripcion: "Extra step for wine fermentation process.",
        imagen: "/assets/imagenes/h.jpg",
      },
    ],
    cooperativas: ["Cooperativa 3", "Cooperativa 4"],
  },
  {
    id: 4,
    titulo: "Proceso de la Flor de Jamaica",
    descripcion: "Descripción del proceso 4",
    imagen: "/assets/imagenes/productos/flordejamaica.png",
    color: "#f59e0b",
    etapas: [
      {
        titulo: "First Step",
        descripcion: "Faucibus tempus mauris nunc tincidunt faucibus netus.",
        imagen: "/assets/imagenes/h.jpg",
      },
      {
        titulo: "Second Step",
        descripcion: "Massa lectus vestibulum scelerisque malesuada turpis a dolor praesent.",
        imagen: "/assets/imagenes/h.jpg",
      },
      {
        titulo: "Third Step",
        descripcion: "Sit morbi laoreet volutpat volutpat.",
        imagen: "/assets/imagenes/h.jpg",
      },
    ],
    cooperativas: ["Cooperativa 1"],
  },
  {
    id: 5,
    titulo: "Proceso de la Miel",
    descripcion: "Descripción del proceso 5",
    imagen: "/assets/imagenes/productos/miel2.png",
    color: "#10b981",
    etapas: [
      {
        titulo: "First Step",
        descripcion: "Faucibus tempus mauris nunc tincidunt faucibus netus.",
        imagen: "/assets/imagenes/h.jpg",
      },
      {
        titulo: "Second Step",
        descripcion: "Massa lectus vestibulum scelerisque malesuada turpis a dolor praesent.",
        imagen: "/assets/imagenes/h.jpg",
      },
      {
        titulo: "Third Step",
        descripcion: "Sit morbi laoreet volutpat volutpat.",
        imagen: "/assets/imagenes/h.jpg",
      },
    ],
    cooperativas: ["Cooperativa 2", "Cooperativa 3"],
  },
  {
    id: 6,
    titulo: "Proceso del abono orgánico",
    descripcion: "Descripción del proceso 6",
    imagen: "/assets/imagenes/productos/flordejamaica.png",
    color: "#6366f1",
    etapas: [
      {
        titulo: "First Step",
        descripcion: "Faucibus tempus mauris nunc tincidunt faucibus netus.",
        imagen: "/assets/imagenes/h.jpg",
      },
      {
        titulo: "Second Step",
        descripcion: "Massa lectus vestibulum scelerisque malesuada turpis a dolor praesent.",
        imagen: "/assets/imagenes/h.jpg",
      },
      {
        titulo: "Third Step",
        descripcion: "Sit morbi laoreet volutpat volutpat.",
        imagen: "/assets/imagenes/h.jpg",
      },
    ],
    cooperativas: [],
  },
];

export default function ProcesoFabricacion() {
  const [procesoSeleccionado, setProcesoSeleccionado] = useState(0);
  const [elementoSeleccionado, setElementoSeleccionado] = useState(0);
  const [etapaActiva, setEtapaActiva] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(0);
  const dragContainerRef = useRef<DragContainer>(null);
  const cellCount = procesos.length;
  const autoRotateSpeed = 0.5;

  const applyTransform = (obj: HTMLElement, angle: number) => {
    obj.style.transform = `translateZ(-500px) rotateY(${angle}deg)`;
  };

  const snapToNearest = () => {
    const anglePerCell = 360 / cellCount;
    const nearestIndex = Math.round(rotationAngle / anglePerCell);
    const newAngle = nearestIndex * anglePerCell;
    setRotationAngle(newAngle);
    const carousel = document.querySelector(".carousel") as HTMLElement;
    if (carousel) {
      applyTransform(carousel, newAngle);
    }
  };

  // Rotación automática
  useEffect(() => {
    const odrag = dragContainerRef.current;

    const startAutoRotate = () => {
      if (odrag && !odrag.autoRotateTimer) {
        odrag.autoRotateTimer = window.setInterval(() => {
          setRotationAngle((prevAngle) => {
            const newAngle = prevAngle - autoRotateSpeed;
            const carousel = document.querySelector(".carousel") as HTMLElement;
            if (carousel) {
              applyTransform(carousel, newAngle);
            }
            return newAngle;
          });
        }, 17);
      }
    };

    startAutoRotate();

    return () => {
      if (odrag && odrag.autoRotateTimer) {
        clearInterval(odrag.autoRotateTimer);
      }
    };
  }, []);

  // Manejo del arrastre
  useEffect(() => {
    let tX = rotationAngle;
    let sX: number, nX: number, desX = 0;
    const odrag = dragContainerRef.current;

    const handlePointerDown = (e: PointerEvent) => {
      if (odrag && odrag.timer) clearInterval(odrag.timer);

      e = e || window.event;
      sX = e.clientX;

      const handlePointerMove = (e: PointerEvent) => {
        e = e || window.event;
        nX = e.clientX;
        desX = nX - sX;
        tX += desX * 0.5;

        if (odrag) applyTransform(odrag, tX);

        sX = nX;
      };

      const handlePointerUp = () => {
        if (odrag) {
          odrag.timer = window.setInterval(() => {
            desX *= 0.95;
            tX += desX * 0.5;

            applyTransform(odrag, tX);

            if (Math.abs(desX) < 0.5) {
              clearInterval(odrag.timer);
              setRotationAngle(tX);
              snapToNearest();
            }
          }, 17);
        }

        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
      };

      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);

      return false;
    };

    if (dragContainerRef.current) {
      dragContainerRef.current.onpointerdown = handlePointerDown;
    }

    return () => {
      if (dragContainerRef.current) {
        dragContainerRef.current.onpointerdown = null;
      }
      if (odrag && odrag.timer) {
        clearInterval(odrag.timer);
      }
    };
  }, []);

  const handleCellClick = (index: number) => {
    setProcesoSeleccionado(index);
    setElementoSeleccionado(index);
    setEtapaActiva(0); // Reiniciar la etapa activa al cambiar de proceso
  };

  const procesoActual = procesos[procesoSeleccionado];

  return (
    <div className="proceso-fabricacion">
      <div className="container">
        {/* Títulos superiores */}
        <div className="top-titles">
          <h2 className="title-primary">Procesos de producción</h2>
          <h2 className="title-secondary">Cooperativas que aportan la materia prima para este producto</h2>
        </div>

        {/* Contenido principal */}
        <div className="main-content">
          {/* Carrusel 3D con Arrastre y Rotación Automática */}
          <div className="carousel-container">
            <div className="wrapper">
              <div className="object">
                <div className="carousel" ref={dragContainerRef}>
                  {procesos.map((proceso, index) => (
                    <div
                      key={index}
                      className={`cell cell-${index + 1} ${index === elementoSeleccionado ? "selected" : ""}`}
                      onClick={() => handleCellClick(index)}
                    >
                      <img
                        src={proceso.imagen || "/placeholder.svg"}
                        alt={proceso.titulo}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                      <h3>{proceso.titulo}</h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contenedores para tarjeta y cooperativas */}
          <div className="right-content">
            <div className="detail-container">
              {procesos.map((proceso, index) => (
                <div
                  key={index}
                  className={`parent card${index + 1} ${index === procesoSeleccionado ? "visible" : "hidden"}`}
                >
                  <div
                    className="card"
                    style={{ backgroundImage: `url(${proceso.imagen || "/placeholder.svg"})` }}
                  >
                    <div className="content-box">
                      <h1 className="card-title">{proceso.titulo}</h1>
                      <p className="card-content">{proceso.descripcion}</p>
                      <button className="see-more">Las Diosas R.L</button>
                    </div>
                    <div className="date-box">
                      <span className="month">Central</span>
                      <span className="date">R.L</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cooperatives-container">
              {procesoActual.cooperativas.length > 0 ? (
                procesoActual.cooperativas.map((cooperativa, index) => (
                  <div key={index} className={`cooperative-item cooperative-item-${index}`}>
                    • {cooperativa}
                  </div>
                ))
              ) : (
                <div className="cooperative-item">No cooperativas disponibles</div>
              )}
            </div>
          </div>
        </div>

        {/* Línea de tiempo */}
        <div className="timeline-section">
          <div className="timeline-steps">
            {procesoActual.etapas.map((etapa, index) => (
              <div
                key={index}
                className={`timeline-step ${index === etapaActiva ? "active" : ""}`}
                onClick={() => setEtapaActiva(index)}
              >
                <div className="step-number">{index + 1}</div>
                <div className="step-content">
                  <h3>{etapa.titulo}</h3>
                  <p>{etapa.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="timeline-image">
            <img
              src={procesoActual.etapas[etapaActiva].imagen || "/placeholder.svg"}
              alt={procesoActual.etapas[etapaActiva].titulo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}