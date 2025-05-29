"use client"

import { useEffect } from "react"
import Header from "@/components/Header"
import ParallaxCooperativa from "@/components/ParallaxCooperativa"
import ProcesoFabricacion from "@/components/ProcesoFabricacion"
import MisionVisionValores from "@/components/MisionVisionValores"
import NuestraMision from "@/components/NuestraMision"
import NuestraVision from "@/components/NuestraVision"
import ImageMarquee from "@/components/ImageMarquee"
import Slider from "@/components/Slider"
import ProductosCards from "@/components/ProductosCards"
import ProcesoProduccion from "@/components/ProcesoProduccion"
import InteractiveGeoLocation from "@/components/InteractiveGeoLocation"
import Footer from "@/components/Footer"
import BackToTop from "@/components/BackToTop"
//import { BeeModel3D } from "@/components/BeeModel3D"







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


 
  <div id="parallax-cooperativa">
    <ParallaxCooperativa />
  </div>

    {/* Ejemplo de uso del componente 3D - puedes ponerlo donde quieras 
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <BeeModel3D height="600px" />
          </div>
        </div>
      </section>*/}
      
  <div id="proceso-fabricacion">
    <ProcesoFabricacion />
  </div>
  
  <div>
    <MisionVisionValores />
  </div>

  <div id="image-marquee">
    <ImageMarquee />
  </div>
<div id="slider">
    <Slider />
  </div>
  <div id="productos">
    <ProductosCards />
  </div>
  <div id="proceso-produccion">
    <ProcesoProduccion />
  </div>

 <div id="nuestra-mision">
    <NuestraMision />
</div>
 <div id="nuestra-vision">
    <NuestraVision />
</div>

<div id="interactive-geo-location">
    {/* <InteractiveGeoLocation /> */}
  <InteractiveGeoLocation />
</div>




  <div id="footer">
    <Footer />
  </div>

  <BackToTop />
</main>
  )
}