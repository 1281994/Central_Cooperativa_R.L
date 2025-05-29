"use client"

import { useState, useEffect } from "react";
import "./proceso-fabricacion.css";

// Datos para los procesos
const procesos = [
  {
    id: 1,
    titulo: "Café",
    descripcion: "Proceso completo de fabricación del café desde la planta hasta la taza",
    imagen: "/assets/imagenes/productos/cafe.png",
    color: "#8b5cf6",
    etapas: [
      {
        titulo: "First Step",
        descripcion: "Faucibus tempus mauris nunc tincidunt faucibus netus.",
        imagen: "/assets/imagenes/sacocafe.jpg",
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
    cooperativas: ["Cooperativa Multisectorial Tierra Nuestra R.L", "Cooperativa Multisectorial Paz Y Amor Entre Mujeres R.L", "Cooperativa Multisectorial Mujeres del Norte R,L", "Cooperativa Multisectorial Mujeres en Desarrollo R.L","Cooperativa Multisectorial Luz Entre Mujeres R.L","Cooperativa Multisectorial Mujeres Trabajadoras de Dipilto R.L","Central de Cooperativas Multisectoriales Mujeres Rurales Feministas Ecológicas Las Diosas R.L "],
  },
  {
    id: 2,
    titulo: "Mermelada de Jamaica",
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
    cooperativas: ["Central de Cooperativas Multisectoriales Mujeres Rurales Feministas Ecológicas Las Diosas R.L "],
  },
  {
    id: 3,
    titulo: "Vino de Jamaica",
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
    cooperativas: ["Central de Cooperativas Multisectoriales Mujeres Rurales Feministas Ecológicas Las Diosas R.L "],
  },
  {
    id: 4,
    titulo: "Flor de Jamaica",
    descripcion: "Este producto es elaborado bajo criterios de alta calidad con el fin de garantizar su consumo.",
    imagen: "/assets/imagenes/productos/flordejamaica.png",
    color: "#f59e0b",
    etapas: [
      {
        titulo: "Cultivo",
        descripcion: "El cultivo de la flor de Jamaica se realiza en condiciones óptimas para asegurar su crecimiento saludable y vigoroso.  La flor de Jamaica se cultiva a partir de semillas orgánicas certificadas, seleccionadas por su calidad y adaptabilidad a nuestro clima.",
        imagen: "/assets/imagenes/flordejamaica/cultivo.jpeg",
      },
      {
        titulo: "Recolección",
        descripcion: "La recolección de la flor de Jamaica se realiza manualmente, asegurando que cada flor sea cosechada en su punto óptimo de madurez. Utilizamos técnicas de recolección manual que garantizan la calidad y frescura de la flor. ",
        imagen: "/assets/imagenes/flordejamaica/recolecion.jpeg",
      },
      {
        titulo: "Deshidratación",
        descripcion: "La deshidratación de la flor de Jamaica se realiza mediante un proceso cuidadoso que preserva su color, sabor y propiedades nutricionales. La flor de Jamaica se deshidrata utilizando métodos naturales, evitando el uso de aditivos químicos.",
        imagen: "/assets/imagenes/flordejamaica/proceso.jpeg",
      },
       {
        titulo: "Empacado",
        descripcion: "El empacado de la flor de Jamaica se realiza en condiciones controladas para mantener su frescura y calidad. Utilizamos materiales de empaque de alta calidad que preservan las propiedades de la flor de Jamaica.",
        imagen: "/assets/imagenes/flordejamaica/empacado.jpeg",
      },
             {
        titulo: "Terminado",
        descripcion: "El producto terminado es la flor de Jamaica deshidratada, lista para ser empacada y distribuida a nuestros clientes. La flor de Jamaica deshidratada se presenta en bolsas herméticas que garantizan su frescura y calidad.",
        imagen: "/assets/imagenes/flordejamaica/terminado.jpeg",
      },
    ],
    cooperativas: ["Cooperativa Multisectorial Mujeres del Norte R,L","Cooperativa Multisectorial Tierra Nuestra R.L", "Central de Cooperativas Multisectoriales Mujeres Rurales Feministas Ecológicas Las Diosas R.L "],
  },
  {
    id: 5,
    titulo: "Miel",
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
    cooperativas: ["Cooperativa Agropecuaria de Servicios Mujeres al Progreso R,LMujeres Al Progreso R,L", "Cooperativa Multisectorial Tierra Nuestra R.L","Cooperativa Multisectorial Paz Y Amor Entre Mujeres R.L","Cooperativa Apícola de Mujeres en Acción la Campanita R.L","Cooperativa Multisectorial Mujeres del Norte R,L","Cooperativa Agropecuaria de Servicios Las Perlas Del Horno R,L","Cooperativa Multisectorial Luz Entre Mujeres R.L","Cooperativa Multisectorial Mujeres Trabajadoras de Dipilto R.L","Central de Cooperativas Multisectoriales Mujeres Rurales Feministas Ecológicas Las Diosas R.L"],
  },
  {
    id: 6,
    titulo: "Abono orgánico",
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
    cooperativas: ["Central de Cooperativas Multisectoriales Mujeres Rurales Feministas Ecológicas Las Diosas R.L "],
  },
];

export default function ProcesoFabricacion() {
  const [procesoSeleccionado, setProcesoSeleccionado] = useState(0);
  const [etapaActiva, setEtapaActiva] = useState(0);
  const [animateCooperatives, setAnimateCooperatives] = useState(true);

  const handleProcesoClick = (index: number) => {
    setProcesoSeleccionado(index);
    setEtapaActiva(0); // Reiniciar la etapa activa al cambiar de proceso
    setAnimateCooperatives(false); // Desactivar animación temporalmente
  };

  // Activar animación de cooperativas cuando cambie el proceso seleccionado
  useEffect(() => {
    setAnimateCooperatives(true);
  }, [procesoSeleccionado]);

  const procesoActual = procesos[procesoSeleccionado];

  return (
    <div className="proceso-fabricacion">
      <div className="container">
        {/* Títulos superiores */}
        <div className="top-titles">
          <h2 className="title-primary">Procesos de producción</h2>
        </div>

        {/* Botones de procesos */}
        <div className="process-buttons">
          {procesos.map((proceso, index) => (
            <button
              key={index}
              className={`process-btn ${index === procesoSeleccionado ? "active" : ""}`}
              onClick={() => handleProcesoClick(index)}
            >
              {proceso.titulo}
            </button>
          ))}
        </div>

        {/* Contenido principal */}
        <div className="main-content">
          {/* Tarjeta */}
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

          {/* Cooperativas a la derecha de la tarjeta */}
          <div className="cooperatives-container">
            <h2 className={`cooperatives-title ${animateCooperatives ? "visible" : ""}`}>
              Cooperativas que aportan la materia prima para este producto
            </h2>
            {procesoActual.cooperativas.length > 0 ? (
              procesoActual.cooperativas.map((cooperativa, index) => (
                <div
                  key={index}
                  className={`cooperative-item cooperative-item-${index} ${
                    animateCooperatives ? "visible" : ""
                  }`}
                >
                  • {cooperativa}
                </div>
              ))
            ) : (
              <div className={`cooperative-item ${animateCooperatives ? "visible" : ""}`}>
                No cooperativas disponibles
              </div>
            )}
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