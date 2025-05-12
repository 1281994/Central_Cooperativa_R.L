"use client"

import { LightbulbIcon, CheckCircle } from "lucide-react"
import "./NuestraMision.css"

export default function NuestraMision() {
  return (
    <section className="nuestra-mision-container">
      <div className="nuestra-mision-content">
        <div className="nuestra-mision-text">
          <div className="nuestra-mision-badge">
            <LightbulbIcon className="mission-icon" size={18} />
            <span>Logros y Reconocimientos</span>
          </div>

          <h2 className="nuestra-mision-title">Hemos sido participes en eventos sido reconocidas por nuestro esfuerzo</h2>

          <p className="nuestra-mision-description">
           La Central Las Diosas R.L popularmente conocida como Cooperativa Las Diosa R.L, organización certificada con el comercio justo, producción orgánica y 
           sello a la producción más limpia. Con el transcurso de los años, la organización ha logrado
            posicionarse en el mercado nacional e internacional, obteniendo reconocimientos por su
            compromiso con la producción sostenible y el comercio justo. En 2018, la Central fue galardonada
            con el primer lugar en la categoría de "Mejor Producto" en la Feria Internacional de la
            Agricultura Familiar, destacando la calidad de sus productos y su enfoque en la sostenibilidad.
            En 2020, la Central recibió el reconocimiento de la Asociación de Productores Orgánicos de
            Nicaragua (APON) por su compromiso con la producción orgánica y la promoción de prácticas
            agrícolas sostenibles. Este reconocimiento resalta la importancia de la Central en la
            promoción de la agricultura familiar y la defensa de los derechos de las mujeres campesinas.
          </p>

          <div className="nuestra-mision-objectives">
            <div className="objective-item">
              <CheckCircle className="objective-icon" size={20} />
              <p>
                Promover el desarrollo integral del sector, potenciando el uso racional de la tierra, la producción
                agropecuaria y sus derivados.
              </p>
            </div>

            <div className="objective-item">
              <CheckCircle className="objective-icon" size={20} />
              <p>
                Generar relaciones con otras cooperativas y organizaciones similares a nivel local, nacional e
                internacional.
              </p>
            </div>

            <div className="objective-item">
              <CheckCircle className="objective-icon" size={20} />
              <p>
                Impulsar la protección del medio ambiente, mediante programas para el manejo uso y conservación de los
                recursos naturales.
              </p>
            </div>
          </div>
        </div>

        <div className="nuestra-mision-image">
          <img src="/assets/imagenes/reconocimientos.jpeg" alt="Invernadero moderno con cultivos hidropónicos" />
        </div>
      </div>
    </section>
  )
}
