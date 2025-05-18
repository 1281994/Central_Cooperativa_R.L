// Este script soluciona el problema de la altura de la ventana en dispositivos móviles
// donde la barra de navegación del navegador puede cambiar la altura disponible

;(() => {
  // Primero definimos una función para establecer la altura correcta
  function setVH() {
    // Obtenemos la altura real de la ventana
    const vh = window.innerHeight * 0.01
    // Establecemos la variable CSS personalizada --vh
    document.documentElement.style.setProperty("--vh", `${vh}px`)
  }

  // Ejecutamos la función inicialmente
  setVH()

  // Agregamos un listener para cuando cambie el tamaño de la ventana o la orientación
  window.addEventListener("resize", setVH)
  window.addEventListener("orientationchange", setVH)

  // También actualizamos después de que la página se haya cargado completamente
  window.addEventListener("load", setVH)
})()
