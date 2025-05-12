"use client"

import { Target } from "lucide-react"
import "./NuestraVision.css"

export default function NuestraVision() {
  return (
    <section className="nuestra-vision-container">
      <div className="vision-content">
        <div className="vision-image-container">
          <img
            src="/assets/imagenes/niños1.jpeg"
            alt="Agricultura sostenible con campos cultivados, paneles solares y molinos de viento"
            className="vision-image"
          />
          <img
            src="/assets/imagenes/niños.jpeg"
            alt="Agricultura sostenible con campos cultivados, paneles solares y molinos de viento"
            className="vision-image"
          />
        </div>

        <div className="vision-text-container">
          <div className="vision-badge">
            <Target className="vision-icon" size={18} />
            <span>Recreación sana</span>
          </div>

          <h2 className="vision-title">Fortalecemos la recreación sana y el buen vivir.</h2>

          <p className="vision-description">
            Creamos espacios donde los niños y jóvenes puedan disfrutar de actividades recreativas y deportivas,
            promoviendo un estilo de vida saludable y el desarrollo integral de la comunidad. Fomentamos la
            participación activa de los jóvenes compartiendo con ellos
            contribuyendo así con su desarrollo integral y su bienestar. Nuestro enfoque se basa en la importancia de la
            recreación sana como un medio para fortalecer los lazos comunitarios y promover un estilo de vida activo y
            saludable.
             </p>

          <div className="vision-objective">
            <h3 className="objective-title">Promovemos la recreación sana</h3>
            <p className="objective-description">
                La recreación sana es fundamental para el desarrollo integral de los niños y jóvenes. A través de
                actividades deportivas, culturales y recreativas, buscamos fomentar la convivencia, el trabajo en
                equipo y el respeto por los demás. Creemos que la recreación no solo es un derecho, sino también una
                herramienta poderosa para construir comunidades más fuertes y saludables.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
