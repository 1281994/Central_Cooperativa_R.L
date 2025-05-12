"use client"
import { useState } from "react"
import "./ProcesoProduccion.css"
import { Leaf, X } from "lucide-react"

export default function ProcesoProduccion() {
  // Estado para las pestañas
  const [activeTab, setActiveTab] = useState("cultivo")

  // Estados para el visor de imágenes
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState({
    src: "",
    alt: "",
  })

  // Función para abrir el visor de imágenes
  const openLightbox = (src: string, alt: string) => {
    setCurrentImage({ src, alt })
    setLightboxOpen(true)
    // Prevenir scroll cuando el lightbox está abierto
    document.body.style.overflow = "hidden"
  }

  // Función para cerrar el visor de imágenes
  const closeLightbox = () => {
    setLightboxOpen(false)
    // Restaurar scroll cuando el lightbox se cierra
    document.body.style.overflow = "auto"
  }

  const tabs = [
    { id: "cultivo", label: "Cultivo" },
    { id: "recolecion", label: "Recolección" },
    { id: "deshidratacion", label: "Deshidratación" },
    { id: "empacado", label: "Empacado" },
    { id: "terminado", label: "Terminado" },
  ]

  const tabContent = {
    cultivo: {
      title: "Cultivo",
      description:
        "El cultivo de la flor de Jamaica se realiza en condiciones óptimas para asegurar su crecimiento saludable y vigoroso.",
      subTitle: "Selección de la flor de Jamaica",
      subDescription:
        "La flor de Jamaica se cultiva a partir de semillas orgánicas certificadas, seleccionadas por su calidad y adaptabilidad a nuestro clima.",
      highlight: "Semillas orgánicas certificadas",
      image: "/assets/imagenes/flordejamaica/cultivo.jpeg",
    },
    recolecion: {
      title: "Recolección",
      description:
        "La recolección de la flor de Jamaica se realiza manualmente, asegurando que cada flor sea cosechada en su punto óptimo de madurez.",
      subTitle: "Técnicas de Recolección",
      subDescription: "Utilizamos técnicas de recolección manual que garantizan la calidad y frescura de la flor.",
      highlight: "Recolección manual en el punto óptimo de madurez",
      image: "/assets/imagenes/flordejamaica/recolecion.jpeg",
    },
    deshidratacion: {
      title: "Deshidratación",
      description:
        "La deshidratación de la flor de Jamaica se realiza mediante un proceso cuidadoso que preserva su color, sabor y propiedades nutricionales.",
      subTitle: "Proceso de Deshidratación",
      subDescription:
        "La flor de Jamaica se deshidrata utilizando métodos naturales, evitando el uso de aditivos químicos.",
      highlight: "Deshidratación natural sin aditivos",
      image: "/assets/imagenes/flordejamaica/proceso.jpeg",
    },
    empacado: {
      title: "Empacado",
      description:
        "El empacado de la flor de Jamaica se realiza en condiciones controladas para mantener su frescura y calidad.",
      subTitle: "Proceso de Empacado",
      subDescription:
        "Utilizamos materiales de empaque de alta calidad que preservan las propiedades de la flor de Jamaica.",
      highlight: "Empaque hermético y de alta calidad",
      image: "/assets/imagenes/flordejamaica/empacado.jpeg",
    },
    terminado: {
      title: "Terminado",
      description:
        "El producto terminado es la flor de Jamaica deshidratada, lista para ser empacada y distribuida a nuestros clientes.",
      subTitle: "Producto Terminado",
      subDescription:
        "La flor de Jamaica deshidratada se presenta en bolsas herméticas que garantizan su frescura y calidad.",
      highlight: "Producto fresco y de alta calidad",
      image: "/assets/imagenes/flordejamaica/terminado.jpeg",
    },
  }

  // Productos de huertos
  const productos = [
    {
      name: "Huerto de zanahorias",
      tipo: "Orgánico",
      description: "Zanahorias frescas y crujientes, cultivadas sin pesticidas ni químicos.",
      image: "/assets/imagenes/huertos/zanahoria.jpeg",
    },
    {
      name: "Repollo",
      tipo: "Orgánico",
      description: "Repollo fresco y crujiente, ideal para ensaladas y guisos, cultivado sin pesticidas ni químicos.",
      image: "/assets/imagenes/huertos/repollo.jpeg",
    },
    {
      name: "Huerto mixto",
      tipo: "Orgánico",
      description: "Variedad de hortalizas frescas, cultivadas sin pesticidas ni químicos.",
      image: "/assets/imagenes/huertos/huerto mixto.jpeg",
    },
    {
      name: "Huerto de tomates",
      tipo: "Orgánico",
      description: "Tomates frescos y jugosos, cultivados sin pesticidas ni químicos.",
      image: "/assets/imagenes/huertos/huerto de tomates.jpeg",
    },
    {
      name: "Huerto de cebollas",
      tipo: "Orgánico",
      description: "Cebollas frescas y crujientes, cultivadas sin pesticidas ni químicos.",
      image: "/assets/imagenes/huertos/cebollas.jpeg",
    },
    {
      name: "Huerto de pipianes",
      tipo: "Orgánico",
      description: "Pipianes frescos y jugosos, cultivados sin pesticidas ni químicos.",
      image: "/assets/imagenes/huertos/pipianes.jpeg",
    },
    {
      name: "Huerto mixto de maiz",
      tipo: "Orgánico",
      description: "Huerto de maiz junto con tomates y sebollas.",
      image: "/assets/imagenes/huertos/huerto mixto de maiz.jpeg",
    },
    {
      name: "Huerto de plántulas de café",
      tipo: "Orgánico",
      description: "Plántulas de café frescas y saludables, cultivadas sin pesticidas ni químicos.",
      image: "/assets/imagenes/huertos/plántulas de café.jpeg",
    },
  ]

  const currentTab = tabContent[activeTab as keyof typeof tabContent]

  return (
    <div className="proceso-produccion-container">
      <h2 className="proceso-title">Proceso de Producción de la Flor de Jamaica</h2>

      <div className="proceso-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="proceso-content">
        <div className="proceso-image">
          <img
            src={currentTab.image || "/placeholder.svg?height=400&width=600"}
            alt={currentTab.title}
            className="tab-image"
            onClick={() => openLightbox(currentTab.image, currentTab.title)}
          />
        </div>

        <div className="proceso-info">
          <div className="proceso-header">
            <Leaf className="leaf-icon" />
            <h3>{currentTab.title}</h3>
          </div>

          <p className="proceso-description">{currentTab.description}</p>

          <h4 className="proceso-subtitle">{currentTab.subTitle}</h4>

          <p className="proceso-subdescription">{currentTab.subDescription}</p>

          <div className="proceso-highlight">
            <span className="check-icon">✓</span>
            <span>{currentTab.highlight}</span>
          </div>
        </div>
      </div>

      <h2 className="hortalizas-title">Huertos y Hortalizas</h2>

      <div className="hortalizas-grid">
        {productos.map((producto, index) => (
          <div key={index} className="hortaliza-card">
            <div className="hortaliza-image-container">
              <img
                src={producto.image || "/placeholder.svg?height=180&width=300"}
                alt={producto.name}
                className="hortaliza-image"
                onClick={() => openLightbox(producto.image, producto.name)}
              />
              <div className="hortaliza-name">
                <h3>{producto.name}</h3>
              </div>
            </div>

            <div className="hortaliza-info">
              <div className="hortaliza-cultivo">
                <span>Tipo:</span> {producto.tipo}
              </div>

              <p className="hortaliza-description">{producto.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Visor de imágenes */}
      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>
              <X size={24} />
            </button>
            <img src={currentImage.src || "/placeholder.svg"} alt={currentImage.alt} className="lightbox-image" />
            <div className="lightbox-caption">{currentImage.alt}</div>
          </div>
        </div>
      )}
    </div>
  )
}
