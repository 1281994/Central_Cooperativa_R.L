"use client"

import type React from "react"
import "../../app/registro.css"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

// Mapeo de departamentos y municipios
const departamentosYMunicipios = {
  boaco: ["Boaco", "Camoapa", "San Lorenzo", "Santa Lucía", "Teustepe"],
  carazo: [
    "Diriamba",
    "Dolores",
    "El Rosario",
    "Jinotepe",
    "La Conquista",
    "La Paz de Carazo",
    "San Marcos",
    "Santa Teresa",
  ],
  chinandega: [
    "Chinandega",
    "Corinto",
    "El Realejo",
    "El Viejo",
    "Posoltega",
    "Puerto Morazán",
    "San Francisco del Norte",
    "San Pedro del Norte",
    "Somotillo",
    "Villanueva",
  ],
  chontales: [
    "Acoyapa",
    "Comalapa",
    "Cuapa",
    "El Coral",
    "Juigalpa",
    "La Libertad",
    "San Francisco de Cuapa",
    "San Pedro de Lóvago",
    "Santo Domingo",
    "Santo Tomás",
    "Villa Sandino",
  ],
  esteli: ["Estelí", "Condega", "La Trinidad", "Pueblo Nuevo", "San Juan de Limay", "San Nicolás"],
  granada: ["Granada", "Diriá", "Diriomo", "Nandaime"],
  jinotega: [
    "Jinotega",
    "El Cuá",
    "La Concordia",
    "San José de Bocay",
    "San Rafael del Norte",
    "San Sebastián de Yalí",
    "Santa María de Pantasma",
    "Wiwilí de Jinotega",
  ],
  leon: [
    "León",
    "Achuapa",
    "El Jicaral",
    "El Sauce",
    "La Paz Centro",
    "Quezalguaque",
    "Santa Rosa del Peñón",
    "Telica",
    "Nagarote",
    "Malpaisillo",
  ],
  madriz: [
    "Somoto",
    "Las Sabanas",
    "Palacagüina",
    "San José de Cusmapa",
    "San Juan de Río Coco",
    "San Lucas",
    "Telpaneca",
    "Totogalpa",
    "Yalagüina",
  ],
  managua: [
    "Managua",
    "Ciudad Sandino",
    "El Crucero",
    "Mateare",
    "San Francisco Libre",
    "San Rafael del Sur",
    "Ticuantepe",
    "Tipitapa",
    "Villa El Carmen",
  ],
  masaya: [
    "Masaya",
    "Catarina",
    "La Concepción",
    "Masatepe",
    "Nandasmo",
    "Nindirí",
    "Niquinohomo",
    "San Juan de Oriente",
    "Tisma",
  ],
  matagalpa: [
    "Matagalpa",
    "Ciudad Darío",
    "Esquipulas",
    "Matiguás",
    "Muy Muy",
    "Rancho Grande",
    "Río Blanco",
    "San Dionisio",
    "San Isidro",
    "San Ramón",
    "Sébaco",
    "Terrabona",
  ],
  nuevaSegovia: [
    "Ocotal",
    "Ciudad Antigua",
    "Dipilto",
    "El Jícaro",
    "Jalapa",
    "Macuelizo",
    "Mozonte",
    "Quilalí",
    "San Fernando",
    "Santa María",
    "Wiwilí de Nueva Segovia",
  ],
  rioSanJuan: ["San Carlos", "El Almendro", "El Castillo", "Morrito", "San Juan de Nicaragua", "San Miguelito"],
  rivas: [
    "Rivas",
    "Altagracia",
    "Belén",
    "Buenos Aires",
    "Cárdenas",
    "Moyogalpa",
    "Potosí",
    "San Jorge",
    "San Juan del Sur",
    "Tola",
  ],
  raan: ["Bilwi (Puerto Cabezas)", "Bonanza", "Prinzapolka", "Rosita", "Siuna", "Waslala", "Waspam"],
  raas: [
    "Bluefields",
    "Corn Island",
    "Desembocadura de Río Grande",
    "El Ayote",
    "El Rama",
    "Kukra Hill",
    "La Cruz de Río Grande",
    "Laguna de Perlas",
    "Muelle de los Bueyes",
    "Nueva Guinea",
    "Paiwas",
  ],
}

export default function Registro() {
  // Estados para el formulario
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [edad, setEdad] = useState("")
  const [sexo, setSexo] = useState("masculino")
  const [departamento, setDepartamento] = useState("")
  const [municipio, setMunicipio] = useState("")
  const [municipios, setMunicipios] = useState<string[]>([])
  const [telefono, setTelefono] = useState("")
  const [correo, setCorreo] = useState("")
  const [mensaje, setMensaje] = useState("")

  // Estados para el slider
  const [currentIndex, setCurrentIndex] = useState(0)
  const autoSlideIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Actualizar municipios cuando cambia el departamento
  useEffect(() => {
    if (departamento && departamentosYMunicipios[departamento as keyof typeof departamentosYMunicipios]) {
      setMunicipios(departamentosYMunicipios[departamento as keyof typeof departamentosYMunicipios])
      setMunicipio("")
    } else {
      setMunicipios([])
      setMunicipio("")
    }
  }, [departamento])

  // Función para mostrar un slide específico
  const showSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Función para avanzar al siguiente slide
  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % 3 // 3 es el número total de slides
    showSlide(newIndex)
  }

  // Función para retroceder al slide anterior
  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + 3) % 3 // 3 es el número total de slides
    showSlide(newIndex)
  }

  // Iniciar y detener el desplazamiento automático
  const startAutoSlide = () => {
    if (autoSlideIntervalRef.current) {
      clearInterval(autoSlideIntervalRef.current)
    }
    autoSlideIntervalRef.current = setInterval(nextSlide, 4000)
  }

  const stopAutoSlide = () => {
    if (autoSlideIntervalRef.current) {
      clearInterval(autoSlideIntervalRef.current)
      autoSlideIntervalRef.current = null
    }
  }

  // Iniciar el desplazamiento automático al cargar el componente
  useEffect(() => {
    startAutoSlide()

    return () => {
      stopAutoSlide()
    }
  }, [])

  // Validar y enviar el formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validar que todos los campos estén llenos
    if (!nombre || !apellido || !edad || !departamento || !municipio || !telefono || !correo || !mensaje) {
      alert("Por favor, complete todos los campos obligatorios.")
      return
    }

    // Validar que la edad sea un número positivo
    if (isNaN(Number(edad)) || Number(edad) <= 0) {
      alert("Por favor, ingrese una edad válida.")
      return
    }

    // Validar el formato del correo electrónico
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!correoRegex.test(correo)) {
      alert("Por favor, ingrese un correo electrónico válido.")
      return
    }

    // Validar el formato del teléfono (ejemplo para Nicaragua)
    const telefonoRegex = /^\+505\s\d{4}-\d{4}$/
    if (!telefonoRegex.test(telefono)) {
      alert("Por favor, ingrese un número de teléfono válido (Ej: +505 8888-8888).")
      return
    }

    // Si todo está correcto, se puede enviar el formulario
    alert("Formulario enviado correctamente.")
    // Aquí iría la lógica para enviar los datos a un servidor
  }

  return (
    <div className="contact-container">
      {/* Formulario de Contacto */}
      <div className="contact-form">
        <h2 className="form-title">Formulario de Contacto</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                placeholder="Ingrese su nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="apellido">Apellido</label>
              <input
                type="text"
                id="apellido"
                placeholder="Ingrese su apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="edad">Edad</label>
              <input
                type="number"
                id="edad"
                placeholder="Ingrese su edad"
                value={edad}
                onChange={(e) => setEdad(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Sexo</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="sexo"
                    value="masculino"
                    checked={sexo === "masculino"}
                    onChange={() => setSexo("masculino")}
                  />{" "}
                  Masculino
                </label>
                <label>
                  <input
                    type="radio"
                    name="sexo"
                    value="femenino"
                    checked={sexo === "femenino"}
                    onChange={() => setSexo("femenino")}
                  />{" "}
                  Femenino
                </label>
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="departamento">Departamento</label>
              <select id="departamento" value={departamento} onChange={(e) => setDepartamento(e.target.value)}>
                <option value="">Seleccione departamento</option>
                <option value="boaco">Boaco</option>
                <option value="carazo">Carazo</option>
                <option value="chinandega">Chinandega</option>
                <option value="chontales">Chontales</option>
                <option value="esteli">Estelí</option>
                <option value="granada">Granada</option>
                <option value="jinotega">Jinotega</option>
                <option value="leon">León</option>
                <option value="madriz">Madriz</option>
                <option value="managua">Managua</option>
                <option value="masaya">Masaya</option>
                <option value="matagalpa">Matagalpa</option>
                <option value="nuevaSegovia">Nueva Segovia</option>
                <option value="rioSanJuan">Río San Juan</option>
                <option value="rivas">Rivas</option>
                <option value="raan">Región Autónoma Atlántico Norte</option>
                <option value="raas">Región Autónoma Atlántico Sur</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="municipio">Municipio</label>
              <select id="municipio" value={municipio} onChange={(e) => setMunicipio(e.target.value)}>
                <option value="">Seleccione municipio</option>
                {municipios.map((mun, index) => (
                  <option key={index} value={mun.toLowerCase().replace(/\s+/g, "-")}>
                    {mun}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="telefono">Teléfono</label>
              <input
                type="tel"
                id="telefono"
                placeholder="Ej: +505 8888-8888"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="correo">Correo Electrónico</label>
              <input
                type="email"
                id="correo"
                placeholder="ejemplo@correo.com"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="mensaje">Escribe un mensaje o sugerencia para mejorar nuestros servicios</label>
            <textarea
              id="mensaje"
              placeholder="Escribe su mensaje aquí..."
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="submit-btn">
            Registrar
          </button>
        </form>
      </div>

      {/* Sección de Atención al Cliente */}
      <div className="service-section">
        <div className="service-card-container">
          <h3 className="contact-subtitle">Atención al Cliente</h3>
          <p className="service-description">
            Para una mayor atención comunicarse con nuestros servicios de atención al cliente
          </p>
          {/* Slider de tarjetas */}
          <div className="service-slider-container">
            <div className="service-slider" id="serviceSlider">
              <div className={`service-slide ${currentIndex === 0 ? "active" : ""}`}>
                <div className="service-card red">
                  <p className="service-card-title">Atención Telefónica</p>
                  <p className="service-card-text">+505 81357859</p>
                  <p className="service-card-text">Correo | info@cooperativa.org</p>
                </div>
              </div>
              <div className={`service-slide ${currentIndex === 1 ? "active" : ""}`}>
                <div className="service-card blue">
                  <p className="service-card-title">Correo Electrónico</p>
                  <p className="service-card-text">soporte@cooperativa.org</p>
                </div>
              </div>
              <div className={`service-slide ${currentIndex === 2 ? "active" : ""}`}>
                <div className="service-card green">
                  <p className="service-card-title">Soporte por WhatsApp</p>
                  <p className="service-card-text">+505 88888888</p>
                </div>
              </div>
            </div>
            <div className="service-slider-controls">
              <button className="service-slider-btn prev-btn" onClick={prevSlide}>
                {"<"}
              </button>
              <button className="service-slider-btn next-btn" onClick={nextSlide}>
                {">"}
              </button>
            </div>
            <div className="service-slider-dots" id="serviceSliderDots">
              <span className={`service-dot ${currentIndex === 0 ? "active" : ""}`} onClick={() => showSlide(0)}></span>
              <span className={`service-dot ${currentIndex === 1 ? "active" : ""}`} onClick={() => showSlide(1)}></span>
              <span className={`service-dot ${currentIndex === 2 ? "active" : ""}`} onClick={() => showSlide(2)}></span>
            </div>
          </div>
        </div>

        {/* Slider de Tarjetas de Contacto */}
        <div className="contact-card-slider" id="contactSlider">
          <div className={`contact-slide ${currentIndex === 0 ? "active" : ""}`}>
            <div className="card" onMouseEnter={stopAutoSlide} onMouseLeave={startAutoSlide}>
              <div className="card-header">
                <div className="wave-container">
                  <svg
                    className="waves"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 24 150 28"
                    preserveAspectRatio="none"
                    shapeRendering="auto"
                  >
                    <defs>
                      <path
                        id="gentle-wave"
                        d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                      />
                    </defs>
                    <g className="parallax">
                      <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
                      <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                      <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                      <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
                    </g>
                  </svg>
                </div>
              </div>
              <div className="profile-image">
                <Image src="/images/alex.jpg" alt="Profile Picture" width={120} height={120} />
              </div>
              <div className="card-content">
                <h2>Alexander Manuel</h2>
                <p>UXUI | Desarrollador Web</p>
                <button className="btn-53">
                  <div className="original">Información</div>
                  <div className="letters">
                    <span>R</span>
                    <span>e</span>
                    <span>g</span>
                    <span>i</span>
                    <span>s</span>
                    <span>t</span>
                    <span>r</span>
                    <span>a</span>
                    <span>t</span>
                    <span>e</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className={`contact-slide ${currentIndex === 1 ? "active" : ""}`}>
            <div className="card" onMouseEnter={stopAutoSlide} onMouseLeave={startAutoSlide}>
              <div className="card-header" style={{ background: "linear-gradient(60deg, #3b82f6 0%, #60a5fa 100%)" }}>
                <div className="wave-container">
                  <svg
                    className="waves"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 24 150 28"
                    preserveAspectRatio="none"
                    shapeRendering="auto"
                  >
                    <defs>
                      <path
                        id="gentle-wave"
                        d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                      />
                    </defs>
                    <g className="parallax">
                      <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
                      <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                      <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                      <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
                    </g>
                  </svg>
                </div>
              </div>
              <div className="profile-image">
                <Image src="/images/perfil4.png" alt="Profile Picture" width={120} height={120} />
              </div>
              <div className="card-content">
                <h2>Maria de Carmen</h2>
                <p>Agente de venta y servicos</p>
                <button className="btn-53">
                  <div className="original">Información</div>
                  <div className="letters">
                    <span>R</span>
                    <span>e</span>
                    <span>g</span>
                    <span>i</span>
                    <span>s</span>
                    <span>t</span>
                    <span>r</span>
                    <span>a</span>
                    <span>t</span>
                    <span>e</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className={`contact-slide ${currentIndex === 2 ? "active" : ""}`}>
            <div className="card" onMouseEnter={stopAutoSlide} onMouseLeave={startAutoSlide}>
              <div className="card-header" style={{ background: "linear-gradient(60deg, #22c55e 0%, #34d399 100%)" }}>
                <div className="wave-container">
                  <svg
                    className="waves"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 24 150 28"
                    preserveAspectRatio="none"
                    shapeRendering="auto"
                  >
                    <defs>
                      <path
                        id="gentle-wave"
                        d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                      />
                    </defs>
                    <g className="parallax">
                      <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
                      <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                      <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                      <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
                    </g>
                  </svg>
                </div>
              </div>
              <div className="profile-image">
                <Image src="/images/perfil3.png" alt="Profile Picture" width={120} height={120} />
              </div>
              <div className="card-content">
                <h2>Juana Zamora</h2>
                <p>Agente de ventas y asesoria</p>
                <button className="btn-53">
                  <div className="original">Información</div>
                  <div className="letters">
                    <span>R</span>
                    <span>e</span>
                    <span>g</span>
                    <span>i</span>
                    <span>s</span>
                    <span>t</span>
                    <span>r</span>
                    <span>a</span>
                    <span>t</span>
                    <span>e</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

