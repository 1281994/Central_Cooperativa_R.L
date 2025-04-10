"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

// Tipos de datos
type ProductType = "Todos" | "Consumo" | "Orgánico" | "Especial" | "Premium"
type CurrencyType = "C$" | "$" | "€" | "£"

interface Product {
  id: number
  name: string
  type: ProductType
  rating: number
  price: number
  currency: CurrencyType
  image: string
  description: string
  tag?: string
  premium?: boolean
  unit?: string
  cooperativa?: string
  contacto?: string
}

interface SliderProduct {
  id: number
  name: string
  price: number
  salePrice: number
  rating: number
  image: string
  ratingCount?: string
  description?: string
  cooperativa?: string
  contacto?: string
  currency?: CurrencyType
  unit?: string
}

// Datos de productos de café (ahora con campo de moneda)
const initialProducts: Product[] = [
  {
    id: 1,
    name: "Café Arábica Miraflor",
    type: "Consumo",
    rating: 5,
    price: 120.00,
    currency: "C$",
    image: "/assets/imagenes/productos/cafe-arabica.jpg",
    description:
      "Café de altura con notas de chocolate, caramelo y frutas cítricas. Cultivado bajo sombre en las montañas de Miraflor.",
    tag: "Consumo",
    unit: "lb",
    cooperativa: "Cooperativa Multisectorial Tierra Nuestra R.L",
    contacto: "info@lasdiosas.org | +505 8888-8888",
  },
  {
    id: 2,
    name: "Abono Orgánico Certificado",
    type: "Orgánico",
    rating: 5,
    price: 300.00,
    currency: "C$",
    image: "/assets/imagenes/productos/abono.jpeg",
    description: "Abono Organico sin químicos, con certificación orgánica.",
    tag: "Orgánico",
    unit: "100 Libras",
    cooperativa: "Central de Cooperativa Multisectoriales Mujeres Feministas Ecológistas Las Diosas R.L.",
    contacto: "centrallasdiosas@gmail.com | +505 7777-7777",
  },
  {
    id: 3,
    name: "Bebida de Café nuestra tierra",
    type: "Especial",
    rating: 4,
    price: 15.00,
    currency: "C$",
    image: "/assets/imagenes/productos/cafe.png",
    description:
      "Taza de café con notas de chocolate y caramelo. Ideal para disfrutar en cualquier momento del día.",
    tag: "Especial",
    unit: "Taza",
    cooperativa: "Cooperativa Multisectorial Tierra Nuestra R.L",
    contacto: "info@lasdiosas.org | +505 8888-8888",
  },
  {
    id: 4,
    name: "Vino",
    type: "Consumo",
    rating: 5,
    price: 300.00,
    currency: "C$",
    image: "/assets/imagenes/productos/vino1.png",
    description: "Excelente calidad y sabor ofrecemos este producto ya que es uno de nuestro productos Premium.",
    tag: "Premium",
    premium: true,
    unit: "botella",
    cooperativa: "Central de Cooperativa Multisectoriales Mujeres Feministas Ecológistas Las Diosas R.L.",
    contacto: "centrallasdiosas@gmail.com | +505 7777-7777",
  },
  {
    id: 5,
    name: "Miel de Abeja",
    type: "Consumo",
    rating: 5,
    price: 120.00,
    currency: "C$",
    image: "/assets/imagenes/productos/miel1.png",
    description: "Producto 100% natural, cosechado de forma sostenible. Ideal para endulzar bebidas y postres.",
    tag: "Especial",
    unit: "Unidad",
    cooperativa: "Cooperativa Agropecuaria Mujeres al Proceso RL",
    contacto: "mujeresagropecuaria@gmail.com | +505 8234-5678",
  },
  {
    id: 6,
    name: "Rosas de Jamaica",
    type: "Orgánico",
    rating: 4,
    price: 60.00,
    currency: "C$",
    image: "/assets/imagenes/productos/rosasdejamaicalasdiosas.jpg",
    description: "Rosas de Jamaica deshidratadas, ideales para infusiones y postres. Cultivadas sin pesticidas.",
    tag: "Especial",
    unit: "Unidad",
    cooperativa: "Cooperativa Multisectorial Paz y Amor Entre Mujeres R.L",
    contacto: "lasdiosaspazyamor@gmail.com | +505 5555-5555",
  },
  {
    id: 7,
    name: "Miel de la flor de Jamaica",
    type: "Consumo",
    rating: 5,
    price: 24.99,
    currency: "C$",
    image: "/assets/imagenes/productos/miel.png",
    description: "Miel pura de la flor de Jamaica, con propiedades antioxidantes. Ideal para endulzar y disfrutar.",
    tag: "Premium",
    premium: true,
    unit: "Unidad",
    cooperativa: "Cooperativa Multisectorial Mujeres del Norte R.L",
    contacto: "Mujeresdelnorte@gmail.com | +505 4444-4444",
  },
  {
    id: 8,
    name: "Abono Orgánico",
    type: "Orgánico",
    rating: 4,
    price: 400.00,
    currency: "C$",
    image: "/assets/imagenes/productos/abono2.jpg",
    description: "Abono orgánico para mejorar la calidad del suelo y aumentar la producción agrícola. Ideal para cultivos sostenibles.",
    tag: "Orgánico",
    unit: "100 Libras",
    cooperativa: "Central de Cooperativa Multisectoriales Mujeres Feministas Ecológistas Las Diosas R.L.",
    contacto: "centrallasdiosas@gmail.com | +505 7777-7777",
  },
]

// Datos para los sliders de productos (ahora con información adicional)
const sliderCategories = [
  {
    id: "featured", // ID de la categoría esto lo uso para el slider Ya que el id de la categoria es el mismo que el id del producto
    title: "Derivados de la miel", // Título de la categoría para el slider
    products: [
      {
        id: 101,
        name: "Jarabe de miel",
        price: 15.0,
        salePrice: 15.0,
        rating: 4.8,
        image: "/assets/imagenes/productos/miel_jarabe.jpg",
        ratingCount: "17k",
        description:
          "Miel pura de abeja, cosechada de forma sostenible. Rica en nutrientes y con propiedades medicinales.",
          cooperativa: "Central de Cooperativa Multisectoriales Mujeres Feministas Ecológistas Las Diosas R.L.",
          contacto: "centrallasdiosas@gmail.com | +505 7777-7777",
        currency: "C$",
        unit: "Botella",
      },
      {
        id: 102,
        name: "Miel de Aveja",
        price: 115.0,
        salePrice: 15.0,
        rating: 4.8,
        image: "/assets/imagenes/productos/miel.png",
        ratingCount: "17k",
        description:
          "Miel pura de abeja, cosechada de forma sostenible. Ideal para endulzar bebidas y postres.",
        cooperativa: "Cooperativa Agropecuaria Mujeres al Proceso RL",
        contacto: "flordelcampo@coop.org | +505 8456-7890",
        currency: "C$",
        unit: "Botella",
      },
      {
        id: 103,
        name: "Miel de Flor de Jamaica",
        price: 115.0,
        salePrice: 15.0,
        rating: 4.8,
        image: "/assets/imagenes/productos/miel1.png",
        ratingCount: "17k",
        description:
          "Miel pura de la flor de Jamaica, con propiedades antioxidantes. Ideal para endulzar y disfrutar.",
        cooperativa: "Cooperativa Viñedos Unidos",
        contacto: "vinedos@coop.org | +505 8901-2345",
        currency: "C$",
        unit: "Botella",
      },
      {
        id: 104,
        name: "Miel de Aveja",
        price: 85.0,
        salePrice: 15.0,
        rating: 4.8,
        image: "/assets/imagenes/productos/miel2.png",
        ratingCount: "17k",
        description: "Café molido fresco, tostado a punto medio. Mezcla de variedades locales con sabor equilibrado.",
        cooperativa: "Cooperativa Las Diosas",
        contacto: "info@lasdiosas.org | +505 8765-4321",
        currency: "C$",
        unit: "Botella",
      },
    ],
  },
  // Agrega más categorías y productos según sea necesario
  {
    id: "topSelling",
    title: "Productos del Café",
    products: [
      {
        id: 201,
        name: "Café Especial",
        price: 150.0,// precio original
        salePrice: 120.0, // precio en oferta
        rating: 4.8,
        image: "/assets/imagenes/productos/cafe-arabica.jpg",
        ratingCount: "17k",
        description: "Café de especialidad con notas cítricas y florales. Cultivado a más de 1,200 metros de altura.",
        cooperativa: "Cooperativa Montaña Verde",
        contacto: "montanaverde@coop.org | +505 8234-5678",
        currency: "C$",
        unit: "lb",
      },
      {
        id: 202,
        name: "Cafe Orgánico",
        price: 150.0,// precio original
        salePrice: 130.0,// precio en oferta
        rating: 4.8,
        image: "/assets/imagenes/productos/cafe1.png",
        ratingCount: "17k",
        description: "Café orgánico de la región de Estelí. Sabor suave y equilibrado, ideal para el consumo diario.",
        cooperativa: "Cooperativa Multisectorial Mujeres del Norte R.L",
        contacto: "mujeresdelnorte@gmail.com | +505 4444-4444",
        currency: "C$",
        unit: "Unidad",
      },
      {
        id: 203,
        name: "Cafe Verde",
        price: 140.0,// precio original
        salePrice: 120.0,// precio en oferta
        rating: 4.8,
        image: "/assets/imagenes/productos/cafe2.jpg",
        ratingCount: "17k",
        description:
          "Té de flor de Jamaica en bolsitas. Listo para preparar, con propiedades antioxidantes y refrescantes.",
        cooperativa: "Cooperativa Flor del Campo",
        contacto: "flordelcampo@coop.org | +505 8456-7890",
        currency: "C$",
        unit: "Caja",
      },
      {
        id: 204,
        name: "Cafe Premium",
        price: 180.0, // precio original
        salePrice: 160.0, // precio en oferta
        rating: 4.8,
        image: "/assets/imagenes/productos/cafe4.jpg",
        ratingCount: "17k",
        description: "Vino artesanal elaborado con técnicas tradicionales. Sabor único y auténtico de nuestra región.",
        cooperativa: "Cooperativa Viñedos Unidos",
        contacto: "vinedos@coop.org | +505 8901-2345",
        currency: "C$",
        unit: "Botella",
      },
    ],
  },
  // Agrega más categorías y productos según sea necesario
  {
    id: "onSale",
    title: "Bebidas",
    products: [
      {
        id: 301,
        name: "Vino",
        price: 180.00,
        salePrice: 150.0,
        rating: 4.8,
        image: "/assets/imagenes/productos/vino1.png",
        ratingCount: "17k",
        description: "Vino artesanal elaborado con técnicas tradicionales. Sabor único y auténtico de nuestra región.",
        cooperativa: "Cooperativa Agropecuaria Mujeres al Proceso RL",
        contacto: "mujeresagropecuaria@gmail.com | +505 8234-5678",
        currency: "C$",
        unit: "Botella",
      },
      {
        id: 302,
        name: "Pinolillo",
        price: 18.0,
        salePrice: 15.0,
        rating: 4.8,
        image: "/assets/imagenes/productos/pinolillo.jpg",
        ratingCount: "17k",
        description: "Pinolillo tradicional nicaragüense. Mezcla de maíz, cacao y especias. Ideal para preparar bebidas resfrescantes.",
        cooperativa: "Cooperativa mujeres del norte",
        contacto: "apicultores@coop.org | +505 8345-6789",
        currency: "C$",
        unit: "Unidad",
      },
      {
        id: 303,
        name: "Vino de Flor de Jamaica",
        price: 230.0,
        salePrice: 190.0,
        rating: 4.8,
        image: "/assets/imagenes/productos/vinodiosas.jpg",
        ratingCount: "17k",
        description: "Vino artesanal elaborado con flor de Jamaica. Refrescante y con un toque dulce.",
        cooperativa: "Cooperativa mujeres del norte",
        contacto: "apicultores@coop.org | +505 8345-6789",
        currency: "C$",
        unit: "Unidad",
      },
      {
        id: 304,
        name: "Vino",
        price: 18.0,
        salePrice: 15.0,
        rating: 4.8,
        image: "/assets/imagenes/productos/vino de uva.png",
        ratingCount: "17k",
        description: "Vino elaborado con naranjas orgánicas. Refrescante y aromático, perfecto para días calurosos.",
        cooperativa: "Cooperativa Viñedos Unidos",
        contacto: "vinedos@coop.org | +505 8901-2345",
        currency: "C$",
        unit: "Botella",
      },
    ],
  },
  {
    id: "topRated",
    title: "Otros productos",
    products: [
      {
        id: 401,
        name: "Fertilizante Orgánico",
        price: 550.0,
        salePrice: 500.0,
        rating: 4.8,
        image: "/assets/imagenes/productos/abono2.jpg",
        ratingCount: "17k",
        description: "Fertilizante orgánico para cultivos. Mejora la calidad del suelo y aumenta la producción agrícola.",
        cooperativa: "Central de Cooperativa Multisectoriales Mujeres Feministas Ecológistas Las Diosas R.L.",
        contacto: "centrallasdiosas@gmail.com | +505 7777-7777",
        currency: "C$",
        unit: "Saco / 100 libras",
      },
      {
        id: 402,
        name: "Abono Orgánico",
        price: 350.0,
        salePrice: 300.0,
        rating: 4.8,
        image: "/assets/imagenes/productos/abono.jpeg",
        ratingCount: "17k",
        description: "Abono orgánico para cultivos. Mejora la calidad del suelo y aumenta la producción agrícola.",
        cooperativa: "Central de Cooperativa Multisectoriales Mujeres Feministas Ecológistas Las Diosas R.L.",
        contacto: "centrallasdiosas@gmail.com | +505 7777-7777",
        currency: "C$",
        unit: "Saco / 100 libras",
      },
      {
        id: 403,
        name: "Tomates",
        price: 4.0,
        salePrice: 3.0,
        rating: 4.8,
        image: "/assets/imagenes/productos/tomates.jpg",
        ratingCount: "17k",
        description: "Tomates frescos y jugosos, cultivados sin pesticidas. Perfectos para ensaladas y salsas.",
        cooperativa: "Cooperativa Multisectorial Mujeres en Desarrolo R.L",
        contacto: "mujeresendesarrollo@gmail.com | +505 7777-7777",
        currency: "C$",
        unit: "Unidad",
      },
      {
        id: 404,
        name: "Granos de Café",
        price: 16.0,
        salePrice: 15.0,
        rating: 4.8,
        image: "/assets/imagenes/productos/granos.jpg",
        ratingCount: "17k",
        description: "Granos de café tostados y molidos. Sabor intenso y aroma envolvente. Ideal para preparar café en casa.",
        cooperativa: "Central de Cooperativa Multisectoriales Mujeres Feministas Ecológistas Las Diosas R.L.",
        contacto: "centrallasdiosas@gmail.com | +505 7777-7777",
        currency: "C$",
        unit: "lb",
      },
    ],
  },
]

// Datos de marcas o logos
const brands = [
  { id: 1, name: "Organic Foods", image: "/assets/imagenes/logos/logo1.jpg" },
  { id: 2, name: "The Organic Shop", image: "/assets/imagenes/logos/logo2.jpg" },
  { id: 3, name: "Healthy Food", image: "/assets/imagenes/logos/logo3.jpg" },
  { id: 4, name: "The Best Organic", image: "/assets/imagenes/logos/logo4.jpg" },
  { id: 5, name: "Passion Foods", image: "/assets/imagenes/logos/logo5.jpg" },
  { id: 6, name: "High Quality", image: "/assets/imagenes/logos/logo6.jpg" },
  { id: 7, name: "Organic Quality", image: "/assets/imagenes/logos/logo7.png" },
  { id: 8, name: "Natural Foods", image: "/assets/imagenes/logos/logo8.jpg" },
]

// Datos de hortalizas y tubérculos
const vegetablesImages = [
  "/assets/imagenes/productos/hortalizas 4.jpg",
  "/assets/imagenes/productos/hortalizas3.jpg",
  "/assets/imagenes/productos/hortalizas2.jpg",
  "/assets/imagenes/productos/hortalizas1.jpg",
]

const tuberImages = [
  "/assets/imagenes/productos/tuberculos1.jpg",
  "/assets/imagenes/productos/tuberculos2.jpg",
  "/assets/imagenes/productos/tuberculos3.jpg",
  "/assets/imagenes/productos/tuberculos4.jpg",
]

export default function Productos() {
  // Estado para el filtro de productos
  const [activeFilter, setActiveFilter] = useState<ProductType>("Todos")

  // Estado para los productos
  const [products, setProducts] = useState<Product[]>(initialProducts)

  // Estado para el modal de productos principales
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  // Estado para el modal de productos del slider
  const [selectedSliderProduct, setSelectedSliderProduct] = useState<SliderProduct | null>(null)

  // Estados para los sliders
  const [isPaused, setIsPaused] = useState({
    brands: false,
    mainSlider: false,
  })

  // Referencias para los contenedores de sliders
  const brandsSliderRef = useRef<HTMLDivElement>(null)
  const mainSliderRef = useRef<HTMLDivElement>(null)
  const brandsInnerRef = useRef<HTMLDivElement>(null)
  const mainSliderInnerRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const sliderModalRef = useRef<HTMLDivElement>(null)

  // Función para filtrar productos
  const filteredProducts =
    activeFilter === "Todos" ? products : products.filter((product) => product.type === activeFilter)

  // Función para renderizar estrellas
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <span key={index} className={`star ${index < rating ? "filled" : "empty"}`}>
        ★
      </span>
    ))
  }

  // Función para manejar el desplazamiento de los sliders
  const handleSlide = (direction: "prev" | "next", ref: React.RefObject<HTMLDivElement>) => {
    if (!ref.current) return

    const container = ref.current
    const scrollAmount = container.clientWidth / 2

    if (direction === "prev") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" })
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  // Función para pausar/reanudar la animación
  const toggleAnimation = (ref: React.RefObject<HTMLDivElement>, isPaused: boolean) => {
    if (!ref.current) return

    ref.current.style.animationPlayState = isPaused ? "paused" : "running"
  }

  // Efecto para controlar las animaciones basado en el estado isPaused
  useEffect(() => {
    toggleAnimation(brandsInnerRef, isPaused.brands)
    toggleAnimation(mainSliderInnerRef, isPaused.mainSlider)
  }, [isPaused])

  // Función para abrir el modal con los detalles del producto principal
  const openProductModal = (product: Product) => {
    setSelectedProduct(product)
    document.body.style.overflow = "hidden" // Prevenir scroll
  }

  // Función para cerrar el modal del producto principal
  const closeProductModal = () => {
    setSelectedProduct(null)
    document.body.style.overflow = "auto" // Restaurar scroll
  }

  // Función para abrir el modal con los detalles del producto del slider
  const openSliderProductModal = (product: SliderProduct) => {
    setSelectedSliderProduct(product)
    document.body.style.overflow = "hidden" // Prevenir scroll
  }

  // Función para cerrar el modal del producto del slider
  const closeSliderProductModal = () => {
    setSelectedSliderProduct(null)
    document.body.style.overflow = "auto" // Restaurar scroll
  }

  // Efecto para cerrar el modal al hacer clic fuera (productos principales)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeProductModal()
      }
    }

    if (selectedProduct) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [selectedProduct])

  // Efecto para cerrar el modal al hacer clic fuera (productos del slider)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sliderModalRef.current && !sliderModalRef.current.contains(event.target as Node)) {
        closeSliderProductModal()
      }
    }

    if (selectedSliderProduct) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [selectedSliderProduct])

  // Duplicar los elementos para el efecto circular
  const duplicatedBrands = [...brands, ...brands, ...brands]
  const duplicatedCategories = [...sliderCategories, ...sliderCategories, ...sliderCategories]

  return (
    <section id="products" className="products-section">
    
      <h2 className="section-title1">Nuestros Productos</h2>

      {/* Slider de marcas */}
      <div className="brands-slider-section">
        <div className="slider-header">
          <h3 className="slider-title">Nuestras Cooperativas</h3>
          <div className="slider-controls">
            <button
              className="slider-control prev"
              onClick={() => handleSlide("prev", brandsSliderRef)}
              aria-label="Previous brands"
            >
              <ChevronLeft size={20} />
            </button>
            <Link href="/brands" className="view-all">
              View All Deals
            </Link>
            <button
              className="slider-control next"
              onClick={() => handleSlide("next", brandsSliderRef)}
              aria-label="Next brands"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div
          className="brands-slider-container"
          ref={brandsSliderRef}
          onMouseEnter={() => setIsPaused((prev) => ({ ...prev, brands: true }))}
          onMouseLeave={() => setIsPaused((prev) => ({ ...prev, brands: false }))}
        >
          <div className="brands-slider-inner" ref={brandsInnerRef}>
            {duplicatedBrands.map((brand, index) => (
              <div key={`${brand.id}-${index}`} className="brand-item">
                <div className="brand-logo">
                  <Image
                    src={brand.image || "/placeholder.svg?height=150&width=150"}
                    alt={brand.name}
                    width={100}
                    height={100}
                    className="brand-img"
                    style={{ objectFit: "contain", width: "100%", height: "100%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filtros de café */}
      <div className="coffee-filters">
        <button
          className={`filter-btn ${activeFilter === "Todos" ? "active" : ""}`}
          onClick={() => setActiveFilter("Todos")}
        >
          Todos
        </button>
        <button
          className={`filter-btn ${activeFilter === "Consumo" ? "active" : ""}`}
          onClick={() => setActiveFilter("Consumo")}
        >
          Consumo
        </button>
        <button
          className={`filter-btn ${activeFilter === "Orgánico" ? "active" : ""}`}
          onClick={() => setActiveFilter("Orgánico")}
        >
          Orgánico
        </button>
        <button
          className={`filter-btn ${activeFilter === "Especial" ? "active" : ""}`}
          onClick={() => setActiveFilter("Especial")}
        >
          Especial
        </button>
      </div>

      {/* Productos de café */}
      <div className="coffee-products">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            {product.tag && (
              <span className={`product-tag ${product.premium ? "premium" : product.tag.toLowerCase()}`}>
                {product.tag}
              </span>
            )}
            <div className="product-image">
              <Image
                src={product.image || "/placeholder.svg?height=300&width=300"}
                alt={product.name}
                width={300}
                height={300}
                className="product-img"
                style={{ objectFit: "contain", width: "100%", height: "100%" }}
              />
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <div className="product-rating">{renderStars(product.rating)}</div>
              <p className="product-description">{product.description}</p>
              <div className="product-footer">
                <span className="product-price">
                  {product.currency}
                  {product.price.toFixed(2)} / {product.unit || "unidad"}
                </span>
                <button onClick={() => openProductModal(product)} className="view-details">
                  Ver Detalles
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slider principal con columnas de productos */}
      <div className="main-slider-container">
        <div className="slider-header">
          <h3 className="slider-title">Nuestros Productos Destacados por Cooperativa</h3>
          <div className="slider-controls">
            <button
              className="slider-control prev"
              onClick={() => handleSlide("prev", mainSliderRef)}
              aria-label="Previous categories"
            >
              <ChevronLeft size={20} />
            </button>
            <Link href="/categories" className="view-all">
              Ver Todo
            </Link>
            <button
              className="slider-control next"
              onClick={() => handleSlide("next", mainSliderRef)}
              aria-label="Next categories"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div
          className="main-slider-wrapper"
          ref={mainSliderRef}
          onMouseEnter={() => setIsPaused((prev) => ({ ...prev, mainSlider: true }))}
          onMouseLeave={() => setIsPaused((prev) => ({ ...prev, mainSlider: false }))}
        >
          <div className="main-slider-inner" ref={mainSliderInnerRef}>
            {duplicatedCategories.map((category, categoryIndex) => (
              <div key={`${category.id}-${categoryIndex}`} className="category-column">
                <div className="category-header">
                  <h3 className="category-title">{category.title}</h3>
                  <Link href={`/categories/${category.id}`} className="view-all">
                    Ver todos →
                  </Link>
                </div>

                <div className="vertical-product-slider">
                  {category.products.map((product, productIndex) => (
                    <div key={`${product.id}-${categoryIndex}-${productIndex}`} className="vertical-product-item">
                      <div className="product-image-small">
                        <Image
                          src={product.image || "/placeholder.svg?height=80&width=80"}
                          alt={product.name}
                          width={80}
                          height={80}
                          className="product-img-small"
                          style={{ objectFit: "contain", width: "100%", height: "100%" }}
                        />
                      </div>
                      <div className="product-info-small">
                        <div className="product-rating-small">
                          <span className="rating-value">{product.rating}</span>
                          <span className="star filled">★</span>
                          <span className="rating-count">({product.ratingCount})</span>
                        </div>
                        <h4 className="product-name-small">{product.name}</h4>
                        <div className="product-price-small">
                          <span className="current-price">
                            {product.currency || "$"}
                            {product.salePrice.toFixed(2)}
                          </span>
                          {product.price > product.salePrice && (
                            <span className="original-price">
                              {product.currency || "$"}
                              {product.price.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <button onClick={() => openSliderProductModal(product)} className="detail-btn">
                          Detalle
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categorías adicionales */}
      <div className="product-categories">
        <div className="category-card">
          <h3 className="category-title">Hortalizas de Hoja Verde</h3>
          <p className="category-description">
            Nuestra selección de hortalizas de hoja verde incluye lechuga, espinaca, zanahorias, tomates y más, todas cultivadas con
            técnicas sostenibles.
          </p>
          <div className="category-images">
            {vegetablesImages.map((image, index) => (
              <div key={index} className="category-image-container">
                <Image
                  src={image || "/placeholder.svg?height=150&width=200"}
                  alt={`Hortaliza ${index + 1}`}
                  width={200}
                  height={150}
                  className="category-img"
                  style={{ objectFit: "contain", width: "100%", height: "100%" }}
                />
              </div>
            ))}
          </div>
          <Link href="/categorias/hortalizas" className="view-collection">
            Ver todos →
          </Link>
        </div>

        <div className="category-card">
          <h3 className="category-title">Tubérculos y Raíces</h3>
          <p className="category-description">
            Nuestra selección de tubérculos incluye papas, zanahorias, remolachas y más, todos cultivados en los
            fértiles suelos de Estelí.
          </p>
          <div className="category-images">
            {tuberImages.map((image, index) => (
              <div key={index} className="category-image-container">
                <Image
                  src={image || "/placeholder.svg?height=150&width=200"}
                  alt={`Tubérculo ${index + 1}`}
                  width={200}
                  height={150}
                  className="category-img"
                  style={{ objectFit: "contain", width: "100%", height: "100%" }}
                />
              </div>
            ))}
          </div>
          <Link href="/categorias/tuberculos" className="view-collection">
            Ver todos →
          </Link>
        </div>
      </div>

      {/* Modal de Producto Principal */}
      {selectedProduct && (
        <div className="product-modal-overlay">
          <div className="product-modal" ref={modalRef}>
            <button className="modal-close-btn" onClick={closeProductModal}>
              <X size={24} />
            </button>

            <div className="product-modal-content">
              <div className="modal-product-image">
                <Image
                  src={selectedProduct.image || "/placeholder.svg?height=400&width=400"}
                  alt={selectedProduct.name}
                  width={400}
                  height={400}
                  className="modal-img"
                  style={{ objectFit: "contain", width: "100%", height: "100%" }}
                />
              </div>
              <div className="modal-product-info">
                <div className="modal-product-header">
                  <h2 className="modal-product-name">{selectedProduct.name}</h2>
                </div>

                <div className="modal-product-tag">
                  <span className={`tag ${selectedProduct.premium ? "premium" : selectedProduct.type.toLowerCase()}`}>
                    {selectedProduct.tag || selectedProduct.type}
                  </span>
                </div>

                <div className="modal-product-rating">
                  {renderStars(selectedProduct.rating)}
                  <span className="rating-value">({selectedProduct.rating}/5)</span>
                </div>

                <div className="modal-product-price">
                  <span className="price-label">Precio:</span>
                  <span className="price-value">
                    {selectedProduct.currency}
                    {selectedProduct.price.toFixed(2)} / {selectedProduct.unit || "unidad"}
                  </span>
                </div>

                <div className="modal-product-description">
                  <h3>Descripción</h3>
                  <p>{selectedProduct.description}</p>
                </div>

                <div className="modal-product-details">
                  <h3>Detalles</h3>
                  <ul>
                    <li>
                      <strong>Tipo:</strong> {selectedProduct.type}
                    </li>
                    <li>
                      <strong>Cooperativa:</strong> {selectedProduct.cooperativa || "Cooperativa Las Diosas"}
                    </li>
                    <li>
                      <strong>Contacto:</strong> {selectedProduct.contacto || "info@cooperativa.org"}
                    </li>
                    {selectedProduct.premium && (
                      <li>
                        <strong>Categoría:</strong> Premium
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Producto del Slider */}
      {selectedSliderProduct && (
        <div className="product-modal-overlay">
          <div className="product-modal" ref={sliderModalRef}>
            <button className="modal-close-btn" onClick={closeSliderProductModal}>
              <X size={24} />
            </button>

            <div className="product-modal-content">
              <div className="modal-product-image">
                <Image
                  src={selectedSliderProduct.image || "/placeholder.svg?height=400&width=400"}
                  alt={selectedSliderProduct.name}
                  width={400}
                  height={400}
                  className="modal-img"
                  style={{ objectFit: "contain", width: "100%", height: "100%" }}
                />
              </div>
              <div className="modal-product-info">
                <div className="modal-product-header">
                  <h2 className="modal-product-name">{selectedSliderProduct.name}</h2>
                </div>

                <div className="modal-product-rating">
                  {renderStars(selectedSliderProduct.rating)}
                  <span className="rating-value">({selectedSliderProduct.rating}/5)</span>
                </div>

                <div className="modal-product-price">
                  <span className="price-label">Precio:</span>
                  <span className="price-value">
                    {selectedSliderProduct.currency || "C$"}
                    {selectedSliderProduct.salePrice.toFixed(2)} / {selectedSliderProduct.unit || "unidad"}
                  </span>
                </div>

                <div className="modal-product-description">
                  <h3>Descripción</h3>
                  <p>{selectedSliderProduct.description || "Información no disponible"}</p>
                </div>

                <div className="modal-product-details">
                  <h3>Detalles</h3>
                  <ul>
                    <li>
                      <strong>Cooperativa:</strong> {selectedSliderProduct.cooperativa || "Cooperativa Las Diosas"}
                    </li>
                    <li>
                      <strong>Contacto:</strong> {selectedSliderProduct.contacto || "info@cooperativa.org"}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

