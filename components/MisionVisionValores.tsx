"use client"
import "./MisionVisionValores.css"
import { Target, Eye, GemIcon, Check } from "lucide-react"

export default function MisionVisionValores() {
  return (
    <section className="mision-vision-valores-container">
      <div className="mvv-header">
        <div className="mvv-badge">NUESTRA IDENTIDA</div>
        <h2 className="mvv-title">Misión, Visión y Valores</h2>
        <p className="mvv-subtitle">
          Estos principios fundamentales guían nuestro trabajo diario y nuestro compromiso con la comunidad, el medio
          ambiente y la calidad de nuestros procesos.
        </p>
      </div>
      {/* Tarjetas de Misión, Visión y Valores */}
      <div className="mvv-cards">
        <div className="mvv-card mision-card">
          <div className="mvv-card-header">
            <div className="mvv-icon-container">
              <Target className="mvv-icon" />
            </div>
            <h3 className="mvv-card-title">Misión</h3>
          </div>
          <div className="mvv-card-content">
            <p>
              Somos una Central de Cooperativas Multisectoriales comprometidas con los intereses de las mujeres
              campesinas sustentada en la economía solidaria, creativa, circular, popular a través del fortalecimiento
              de las agro cadenas alimentarías, la producción agroecológica, la conciencia crítica de género y la trenza
              de dominación hegemónica para la defensa de los derechos de las mujeres estableciendo alianzas con
              organizaciones que comparten nuestros principios y valores.
            </p>
          </div>
        </div>

        <div className="mvv-card vision-card">
          <div className="mvv-card-header">
            <div className="mvv-icon-container">
              <Eye className="mvv-icon" />
            </div>
            <h3 className="mvv-card-title">Visión</h3>
          </div>
          <div className="mvv-card-content">
            <p>
              Ser una organización líder que apuesta a la autonomía económica de las mujeres campesinas mediante la
              organización cooperativa, auto sostenible, contribuyendo a su desarrollo económico y calidad de vida
              integral de sus socias, fortaleciendo capacidades para la defensa de sus derechos para erradicar la
              desigualdad que enfrentan las mujeres rurales.
            </p>
          </div>
        </div>

        <div className="mvv-card valores-card">
          <div className="mvv-card-header">
            <div className="mvv-icon-container">
              <GemIcon className="mvv-icon" />
            </div>
            <h3 className="mvv-card-title">Valores</h3>
          </div>
          <div className="mvv-card-content valores-content">
            <div className="valores-grid">
              <div className="valor-item">
                <Check className="check-icon" />
                <span>Sostenibilidad</span>
              </div>
              <div className="valor-item">
                <Check className="check-icon" />
                <span>Cooperación</span>
              </div>
              <div className="valor-item">
                <Check className="check-icon" />
                <span>Transparencia</span>
              </div>
              <div className="valor-item">
                <Check className="check-icon" />
                <span>Innovación</span>
              </div>
              <div className="valor-item">
                <Check className="check-icon" />
                <span>Solidaridad</span>
              </div>
              <div className="valor-item">
                <Check className="check-icon" />
                <span>Igualdad</span>
              </div>
              <div className="valor-item">
                <Check className="check-icon" />
                <span>Ayuda Mutua</span>
              </div>
              <div className="valor-item">
                <Check className="check-icon" />
                <span>Compromiso Social</span>
              </div>
              <div className="valor-item">
                <Check className="check-icon" />
                <span>Honestidad</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
