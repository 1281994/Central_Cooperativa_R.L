"use client"

import Image from "next/image"
import { useState } from "react"

export default function AcercaDeNosotras() {
  const [activeTab, setActiveTab] = useState<"mision" | "vision" | "valores">("mision")

  return (
    <section id="abouto" className="about-section">
      <header className="about-header">
        <h2>Acerca de nosotras</h2>
      </header>

      {/* Primera sección - Información principal */}
      <div className="about-main">
        <div className="about-content">
          <h3 className="about-subtitle">Nuestra historia</h3>
          <p className="about-text">
            Somos más de cuatrocientas 34 mujeres productoras y campesinas de los departamentos de Estelí, Matagalpa,
            Jinotega y Nueva Segovia, están aglutinadas en la central regional de Cooperativa Las Diosas, actualmente
            comercializan café orgánico, miel, flor de Jamaica y vinos. Tan solo en este año 2022, las mujeres de Las
            Diosas contabilizan vendidos más de 4 barriles de miel, mil 500 libras de flor de Jamaica deshidratada, 25
            quintales de café orgánico a nivel local, con clientes mayoritarios desde León y Managua. Su presidenta y
            representante legal Ino Alfaro, dijo a La Primerisima que desde 2018 a la fecha, han logrado posicionar sus
            principales productos en el mercado nacional e internacional, consiguiendo empoderar a las mujeres
            campesinas como generadoras de ingresos propios.
          </p>
          <p className="about-text">
            &quot;Hemos mejorado muchísimas las ventas, somos mujeres jóvenes que estamos posicionándonos y
            fortaleciéndonos como generadoras de la economía familiar, ahorita a nivel local tenemos registro sanitario,
            marcas registradas, todos los estatutos conforme a ley y sanidad de nuestros productos&quot;, expresó
            Alfaro. Para el mes de diciembre es temporada alta en comercio y consumo, por lo que las productoras esperan
            superar las 300 libras de café molido semanal, unas 80 libras de miel semanalmente, y unas 300 botellas de
            vino.
          </p>
        </div>
        <div className="about-image">
          <Image
            src="/assets/imagenes/cooperativa 1.jpg"
            alt="Mujeres de la cooperativa"
            width={500}
            height={350}
            className="about-img"
          />
        </div>
      </div>

      {/* Segunda sección - Emprendedoras */}
      <div className="about-entrepreneurs">
        <div className="entrepreneur-left">
          <Image
            src="/assets/imagenes/cooperativa 4.jpg"
            alt="Mujeres emprendedoras"
            width={400}
            height={300}
            className="entrepreneur-img"
          />
          <div className="entrepreneur-content">
            <h3 className="entrepreneur-title">Somos mujeres emprendedoras</h3>
            <p className="entrepreneur-text">
              de los departamentos de Estelí, Matagalpa, Jinotega y Nueva Segovia, están aglutinadas en la central
              regional de Cooperativa Las Diosas, actualmente comercializan café orgánico, miel, flor de Jamaica y
              vinos.
            </p>
          </div>
        </div>
        <div className="entrepreneur-right">
          <div className="entrepreneur-content">
            <h3 className="entrepreneur-title">Productos destacados</h3>
            <p className="entrepreneur-text">
              Las mujeres de Las Diosas han logrado posicionar sus productos en el mercado nacional e internacional,
              consiguiendo empoderar a las mujeres campesinas como generadoras de ingresos propios.
            </p>
          </div>
          <Image
            src="/assets/imagenes/cooperativa 3.jpg"
            alt="Productos de la cooperativa"
            width={400}
            height={300}
            className="entrepreneur-img"
          />
        </div>
      </div>

      {/* Tercera sección - Misión, Visión, Valores */}
      <div className="about-values">
        <div className="values-tabs">
          <button
            className={`value-tab ${activeTab === "mision" ? "active" : ""}`}
            onClick={() => setActiveTab("mision")}
          >
            Misión
          </button>
          <button
            className={`value-tab ${activeTab === "vision" ? "active" : ""}`}
            onClick={() => setActiveTab("vision")}
          >
            Visión
          </button>
          <button
            className={`value-tab ${activeTab === "valores" ? "active" : ""}`}
            onClick={() => setActiveTab("valores")}
          >
            Valores
          </button>
        </div>

        <div className="values-content">
          {activeTab === "mision" && (
            <div className="value-card">
              <h3 className="value-title">Misión</h3>
              <p className="value-text">
                Empoderar a las mujeres campesinas como generadoras de ingresos propios, promoviendo productos de alta
                calidad.
              </p>
            </div>
          )}

          {activeTab === "vision" && (
            <div className="value-card">
              <h3 className="value-title">Visión</h3>
              <p className="value-text">
                Ser líderes en la producción y comercialización de productos orgánicos, fortaleciendo la economía
                familiar.
              </p>
            </div>
          )}

          {activeTab === "valores" && (
            <div className="value-card">
              <h3 className="value-title">Valores</h3>
              <p className="value-text">
                Compromiso, calidad, sostenibilidad y empoderamiento de las mujeres en la economía local.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
