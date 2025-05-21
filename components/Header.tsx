"use client"

import type React from "react"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const pathname = usePathname()

  // Función para cerrar el menú móvil
  const handleCloseMenu = () => {
    setIsMenuOpen(false)
  }

  // Función para alternar el menú móvil
  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Detectar la sección activa basada en el scroll
  useEffect(() => {
    const handleScroll = () => {
      if (pathname !== "/") return // Solo activar en la página principal

      const sections = ["slider", "sec", "cooperativa", "products", "footer"]
      let currentSection = ""

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          // Si la sección está visible en el viewport
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section
            break
          }
        }
      }

      setActiveSection(currentSection)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [pathname])

  // Función para manejar el scroll suave a las secciones en la página principal
  const scrollToSection = (sectionId: string, e: React.MouseEvent) => {
    // Si estamos en la página principal, hacemos scroll suave
    if (pathname === "/") {
      e.preventDefault()
      const section = document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({ behavior: "smooth" })
        handleCloseMenu()
      }
    }
  }

  // Determinar si un enlace debe ser activo
  const isActive = (section: string) => {
    if (pathname === "/" && activeSection === section) return true
    if (pathname === `/${section}`) return true
    return false
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        {/* Logo */}
        <Link href="/" className="navbar-brand nav-item-custom">
          <img
            src="/assets/imagenes/logos/logo-las-diosas.png"
            alt="Logo Las Diosas"
            className="navbar-logo"
          />
          Las Diosas R.L
        </Link>

        {/* Botón para dispositivos móviles */}
        <button
          className="navbar-toggler"
          type="button"
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
              <Link
                className={`nav-link nav-item-custom ${isActive("top") ? "active" : ""}`}
                href={pathname === "/" ? "#slider" : "/"}
                onClick={(e) => scrollToSection("top", e)}
              >
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link nav-item-custom ${isActive("sec") ? "active" : ""}`}
                href={pathname === "/" ? "#sec" : "/"}
                onClick={(e) => scrollToSection("sec", e)}
              >
                Conocenos
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link nav-item-custom ${isActive("cooperativa") ? "active" : ""}`}
                href={pathname === "/" ? "#cooperativa" : "/cooperativa"}
                onClick={(e) => scrollToSection("cooperativa", e)}
              >
                Cooperativa
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link nav-item-custom ${isActive("products") ? "active" : ""}`}
                href={pathname === "/" ? "#products" : "/productos"}
                onClick={(e) => scrollToSection("products", e)}
              >
                Productos
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link nav-item-custom ${isActive("footer") ? "active" : ""}`}
                href={pathname === "/" ? "#footer" : "/contacto"}
                onClick={(e) => scrollToSection("footer", e)}
              >
                Información
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
