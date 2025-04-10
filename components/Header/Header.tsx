"use client"

import Link from "next/link"
import { useState } from "react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleCloseMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        {/* Logo */}
        <Link href="/" className="navbar-brand nav-item-custom">
          Las Diosas R.L
        </Link>

        {/* Botón para dispositivos móviles */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={isMenuOpen ? "true" : "false"}
          aria-label="Toggle navigation"
          onClick={handleToggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Elementos de la barra */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link nav-item-custom" href="/" onClick={handleCloseMenu}>
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-item-custom" href="#about" onClick={handleCloseMenu}>
                Acerca de Nosotros
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-item-custom" href="#products" onClick={handleCloseMenu}>
                Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-item-custom" href="#registro" onClick={handleCloseMenu}>
                Registrarse
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-item-custom" href="#Testimonios" onClick={handleCloseMenu}>
                Testimonio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-item-custom" href="#footer" onClick={handleCloseMenu}>
                Información
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}