"use client"

import { useEffect, useState } from "react"
import { ChevronUp } from "lucide-react"

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility)

    // Reemplazar el comportamiento del botón estático en el footer
    const staticBackToTop = document.getElementById("backToTop")
    if (staticBackToTop) {
      staticBackToTop.addEventListener("click", scrollToTop)
    }

    return () => {
      window.removeEventListener("scroll", toggleVisibility)
      if (staticBackToTop) {
        staticBackToTop.removeEventListener("click", scrollToTop)
      }
    }
  }, [])

  return (
    <div
      className={`back-to-top ${visible ? "visible" : ""}`}
      onClick={scrollToTop}
      role="button"
      aria-label="Volver arriba"
    >
      <ChevronUp size={24} />
    </div>
  )
}

