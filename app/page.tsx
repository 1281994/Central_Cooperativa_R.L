"use client"

import { useEffect } from "react"
import Header from "@/components/Header/Header"
import Slider from "@/components/Portada_presentacion/Slider"
import Productos from "@/components/Productos/Productos"
import Footer from "@/components/Footer/Footer"
import BackToTop from "@/components/BackToTop"
import AcercaDeNosotras from "@/components/Acerca_de_nosotras/AcercaDeNosotras"
import FormularioContacto from "@/components/FormularioContacto/Formulario"



export default function Home() {
  // Cargar Bootstrap JS desde CDN y ajustar el carrusel
  useEffect(() => {
    // Crear un elemento script para cargar Bootstrap JS
    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
    script.integrity = "sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
    script.crossOrigin = "anonymous"
    document.body.appendChild(script)


    
    // Forzar un evento de resize después de cargar la página para ajustar el carrusel
    const resizeEvent = () => {
      window.dispatchEvent(new Event("resize"))
    }

    // Ejecutar después de que la página se cargue completamente
    window.addEventListener("load", resizeEvent)

    // También ejecutar después de un breve retraso para asegurar que todos los elementos estén renderizados
    const timeoutId = setTimeout(resizeEvent, 1000)

    // También ejecutar varias veces para asegurar que los ajustes se apliquen correctamente
    const intervalId = setInterval(resizeEvent, 500)
    setTimeout(() => clearInterval(intervalId), 3000) // Detener después de 3 segundos

    // Limpiar
    return () => {
      document.body.removeChild(script)
      window.removeEventListener("load", resizeEvent)
      clearTimeout(timeoutId)
      clearInterval(intervalId)
    }
  }, [])

  return (
    <main className="main-container">
      <Header />
      <Slider />
      {/* Aquí puedes agregar más secciones como "Acerca de Nosotros", "Productos", etc. */}
      <AcercaDeNosotras />
      {/* Componente del mapa 3D de Nicaragua */}


      <Productos />
      <FormularioContacto />
      {/* Aquí puedes agregar más secciones como "Testimonios", "Contacto", etc. */}
      <Footer />
      <BackToTop />
    </main>
  )
}

