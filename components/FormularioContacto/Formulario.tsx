"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { departamentosYMunicipios } from "./data/nicaragua-data"
import "./formulario.css"

export default function FormularioContacto() {
  // Estados para los campos del formulario
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [edad, setEdad] = useState("")
  const [sexo, setSexo] = useState("masculino")
  const [departamento, setDepartamento] = useState("")
  const [municipio, setMunicipio] = useState("")
  const [telefono, setTelefono] = useState("")
  const [correo, setCorreo] = useState("")
  const [mensaje, setMensaje] = useState("")

  // Estado para los municipios disponibles según el departamento seleccionado
  const [municipiosDisponibles, setMunicipiosDisponibles] = useState<string[]>([])

  // Estado para mensajes de error
  const [errores, setErrores] = useState<{ [key: string]: string }>({})
  const [formEnviado, setFormEnviado] = useState(false)

  // Actualizar municipios cuando cambia el departamento
  useEffect(() => {
    if (departamento && departamentosYMunicipios[departamento]) {
      setMunicipiosDisponibles(departamentosYMunicipios[departamento])
      setMunicipio("") // Resetear municipio al cambiar de departamento
    } else {
      setMunicipiosDisponibles([])
    }
  }, [departamento])

  // Función para validar el formulario
  const validarFormulario = () => {
    const nuevosErrores: { [key: string]: string } = {}

    // Validar campos obligatorios
    if (!nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio"
    if (!apellido.trim()) nuevosErrores.apellido = "El apellido es obligatorio"

    // Validar edad
    if (!edad) {
      nuevosErrores.edad = "La edad es obligatoria"
    } else if (isNaN(Number(edad)) || Number(edad) <= 0) {
      nuevosErrores.edad = "Ingrese una edad válida"
    }

    // Validar selección de departamento y municipio
    if (!departamento) nuevosErrores.departamento = "Seleccione un departamento"
    if (!municipio) nuevosErrores.municipio = "Seleccione un municipio"

    // Validar teléfono (formato Nicaragua: +505 8888-8888)
    if (!telefono) {
      nuevosErrores.telefono = "El teléfono es obligatorio"
    } else {
      const telefonoRegex = /^\+505\s\d{4}-\d{4}$/
      if (!telefonoRegex.test(telefono)) {
        nuevosErrores.telefono = "Formato inválido. Ej: +505 8888-8888"
      }
    }

    // Validar correo electrónico
    if (!correo) {
      nuevosErrores.correo = "El correo es obligatorio"
    } else {
      const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!correoRegex.test(correo)) {
        nuevosErrores.correo = "Ingrese un correo electrónico válido"
      }
    }

    // Validar mensaje
    if (!mensaje.trim()) nuevosErrores.mensaje = "El mensaje es obligatorio"

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  // Manejar envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validarFormulario()) {
      // Aquí puedes implementar la lógica para enviar los datos
      console.log("Formulario enviado con éxito", {
        nombre,
        apellido,
        edad,
        sexo,
        departamento,
        municipio,
        telefono,
        correo,
        mensaje,
      })

      // Mostrar mensaje de éxito
      setFormEnviado(true)

      // Resetear formulario después de 3 segundos
      setTimeout(() => {
        setNombre("")
        setApellido("")
        setEdad("")
        setSexo("masculino")
        setDepartamento("")
        setMunicipio("")
        setTelefono("")
        setCorreo("")
        setMensaje("")
        setFormEnviado(false)
      }, 3000)
    }
  }

  return (
    <div className="contact-form">
      <h2 className="form-title">Formulario de Contacto</h2>

      {formEnviado && <div className="mensaje-exito">¡Formulario enviado correctamente!</div>}

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
              className={errores.nombre ? "input-error" : ""}
            />
            {errores.nombre && <span className="error-message">{errores.nombre}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="apellido">Apellido</label>
            <input
              type="text"
              id="apellido"
              placeholder="Ingrese su apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              className={errores.apellido ? "input-error" : ""}
            />
            {errores.apellido && <span className="error-message">{errores.apellido}</span>}
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
              className={errores.edad ? "input-error" : ""}
            />
            {errores.edad && <span className="error-message">{errores.edad}</span>}
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
            <select
              id="departamento"
              value={departamento}
              onChange={(e) => setDepartamento(e.target.value)}
              className={errores.departamento ? "input-error" : ""}
            >
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
            {errores.departamento && <span className="error-message">{errores.departamento}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="municipio">Municipio</label>
            <select
              id="municipio"
              value={municipio}
              onChange={(e) => setMunicipio(e.target.value)}
              className={errores.municipio ? "input-error" : ""}
              disabled={!departamento}
            >
              <option value="">Seleccione municipio</option>
              {municipiosDisponibles.map((muni) => (
                <option key={muni} value={muni.toLowerCase().replace(/\s+/g, "-")}>
                  {muni}
                </option>
              ))}
            </select>
            {errores.municipio && <span className="error-message">{errores.municipio}</span>}
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
              className={errores.telefono ? "input-error" : ""}
            />
            {errores.telefono && <span className="error-message">{errores.telefono}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="correo">Correo Electrónico</label>
            <input
              type="email"
              id="correo"
              placeholder="ejemplo@correo.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className={errores.correo ? "input-error" : ""}
            />
            {errores.correo && <span className="error-message">{errores.correo}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="mensaje">Escribe un mensaje o sugerencia para mejorar nuestros servicios</label>
          <textarea
            id="mensaje"
            placeholder="Escribe su mensaje aquí..."
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            className={errores.mensaje ? "input-error" : ""}
          ></textarea>
          {errores.mensaje && <span className="error-message">{errores.mensaje}</span>}
        </div>

        <button type="submit" className="submit-btn">
          Registrar
        </button>
      </form>
    </div>
  )
}
