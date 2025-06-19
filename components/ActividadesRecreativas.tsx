"use client"

import { Target } from "lucide-react"
import "./ActividadesRecreativas.css"

export default function ActividadesRecreativas() {
  return (
    <section className="actividades-recreativas-container">
      {/* Primera sección: imagen izquierda, texto derecha */}
      <div className="actividades-section">
        <div className="actividades-image-container">
          <img
            src="/assets/imagenes/niños1.jpeg"
            alt="Niños participando en actividades recreativas"
            className="actividades-image"
          />
        </div>

        <div className="actividades-text-container">
          <div className="vision-badge">
            <Target className="vision-icon" size={18} />
            <span>Recreación sana</span>
          </div>

          <h2 className="vision-title">Fortalecemos la recreación sana y el buen vivir.</h2>

          <p className="vision-description">
            Creamos espacios donde los niños y jóvenes puedan disfrutar de actividades recreativas y deportivas,
            promoviendo un estilo de vida saludable y el desarrollo integral de la comunidad. Fomentamos la
            participación activa de los jóvenes compartiendo con ellos contribuyendo así con su desarrollo integral y su
            bienestar. Nuestro enfoque se basa en la importancia de la recreación sana como un medio para fortalecer los
            lazos comunitarios y promover un estilo de vida activo y saludable.
          </p>
        </div>
      </div>

      {/* Segunda sección: texto izquierda, imagen derecha */}
      <div className="actividades-section reverse">
        <div className="actividades-text-container">
           <div className="vision-badge">
            <Target className="vision-icon" size={18} />
            <span>Convivencia social</span>
          </div>
          <div className="vision-objective">
            <h3 className="objective-title">Promovemos la convivencia social</h3>
            <p className="objective-description">
              La convivencia social es fundamental para el desarrollo integral de los niños y jóvenes. A través de
              actividades deportivas, culturales y recreativas, buscamos fomentar la convivencia, el trabajo en equipo y
              el respeto por los demás. Creemos que la recreación no solo es un derecho, sino también una herramienta
              poderosa para construir lazos fuertes con las comunidades.
            </p>
          </div>
        </div>

        <div className="actividades-image-container">
          <img
            src="/assets/imagenes/niños.jpeg"
            alt="Jóvenes en actividades deportivas y recreativas"
            className="actividades-image"
          />
        </div>
      </div>

      {/* Tercera sección: imagen izquierda, texto derecha */}
      <div className="actividades-section">
        <div className="actividades-image-container">
          <img
            src="/assets/imagenes/niños3.jpeg"
            alt="Actividades deportivas en comunidad"
            className="actividades-image"
          />
        </div>

        <div className="actividades-text-container">
           <div className="vision-badge">
            <Target className="vision-icon" size={18} />
            <span>Desarrollo integral</span>
          </div>
          <div className="vision-objective">
            <h3 className="objective-title">Desarrollo integral comunitario</h3>
            <p className="objective-description">
              Nuestras actividades recreativas van más allá del entretenimiento, son espacios de formación donde los
              participantes desarrollan habilidades sociales, físicas y emocionales. Creamos programas inclusivos que
              atienden las diferentes edades y necesidades de nuestra comunidad, garantizando que todos tengan la
              oportunidad de participar y crecer juntos en un ambiente seguro y divertido.
            </p>
          </div>
        </div>
      </div>

      {/* Cuarta sección: texto izquierda, imagen derecha */}
      <div className="actividades-section reverse">
        <div className="actividades-text-container">
           <div className="vision-badge">
            <Target className="vision-icon" size={18} />
            <span>Fortalecimiento</span>
          </div>
          <div className="vision-objective">
            <h3 className="objective-title">Fortalecimiento de vínculos familiares</h3>
            <p className="objective-description">
              Promovemos actividades que involucran a toda la familia, creando momentos especiales de conexión y
              aprendizaje compartido. Nuestros programas familiares fortalecen los lazos entre padres e hijos, abuelos y
              nietos, creando memorias duraderas y transmitiendo valores importantes como el respeto, la solidaridad y
              el trabajo en equipo a través del juego y la recreación.
            </p>
          </div>
        </div>

        <div className="actividades-image-container">
          <img
            src="/assets/imagenes/entregamaterial.jpeg"
            alt="Familias participando en actividades recreativas"
            className="actividades-image"
          />
        </div>
      </div>
    </section>
  )
}