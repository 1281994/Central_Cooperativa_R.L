"use client"

import type React from "react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import "./Header.css" // Importar el CSS separado

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
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section
            break
          }
        }
      }

      setActiveSection(currentSection)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname])

  // Función para manejar el scroll suave
  const scrollToSection = (sectionId: string, e: React.MouseEvent) => {
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
    return pathname === "/" && activeSection === section || pathname === `/${section}`
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        {/* Logo y Título sin animaciones */}
        <Link href="/" className="navbar-brand nav-item-custom">
          <img
            src="/assets/imagenes/logos/logo-las-diosas1.png"
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

        {/* Enlaces de navegación centrados */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("top") ? "active" : ""}`}
                href={pathname === "/" ? "#slider" : "/"}
                onClick={(e) => scrollToSection("top", e)}
              >
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("sec") ? "active" : ""}`}
                href={pathname === "/" ? "#sec" : "/"}
                onClick={(e) => scrollToSection("sec", e)}
              >
                Conocenos
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("slider") ? "active" : ""}`}
                href={pathname === "/" ? "#slider" : "/slider"}
                onClick={(e) => scrollToSection("slider", e)}
              >
                Cooperativa
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("productos") ? "active" : ""}`}
                href={pathname === "/" ? "#productos" : "/productos"}
                onClick={(e) => scrollToSection("productos", e)}
              >
                Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("interactive-geo-location") ? "active" : ""}`}
                href={pathname === "/" ? "#interactive-geo-location" : "/interactive-geo-location"}
                onClick={(e) => scrollToSection("interactive-geo-location", e)}
              >
                Geolocalización
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("footer") ? "active" : ""}`}
                href={pathname === "/" ? "#footer" : "/contacto"}
                onClick={(e) => scrollToSection("footer", e)}
              >
                Información
              </Link>
            </li>
          </ul>

          {/* Iconos de redes sociales a la derecha */}
          {/* Iconos de redes sociales a la derecha */}
          <div className="social-icons ms-auto">
            <a
              href="https://www.facebook.com/share/19B83YdUk3/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://www.tiktok.com/@lasdiosascooperat?_t=ZM-8wuesP8evAL&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="TikTok"
            >
              <i className="fab fa-tiktok"></i>
            </a>
            <a
              href="https://www.instagram.com/lasdiosascooperativacentral/profilecard/?igsh=amk3NmN3ZmtsMHh5"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}