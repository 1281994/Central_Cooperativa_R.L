import Link from "next/link"
import Image from "next/image"
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronUp,
  ArrowRight,
  Apple,
  Play,
} from "lucide-react"

export default function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="section-separator"></div>
      <h2 className="section-title">acerca de nosotros</h2>

      {/* Onda decorativa superior - Altura reducida */}
      <div className="footer-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path
            fill="#555454"
            fillOpacity="1"
            d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,42.7C840,32,960,32,1080,37.3C1200,43,1320,53,1380,58.7L1440,64L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"
          ></path>
        </svg>
      </div>

      <div className="footer-content">
        {/* Información principal */}
        <div className="footer-main">
          {/* Columna 1: Sobre nosotros */}
          <div className="footer-column footer-about">
            <div className="footer-logo">
              <Image
                src="/assets/imagenes/perfil1.png"
                alt="Logo Cooperativa"
                className="footer-logo-img"
                width={50}
                height={50}
              />
              <h3 className="footer-logo-text">Cooperativa de Mujeres</h3>
            </div>
            <p className="footer-description">
              Somos una red de cooperativas comprometidas con el empoderamiento de mujeres nicaragüenses, promoviendo el
              desarrollo sostenible y la igualdad de oportunidades.
            </p>
            <div className="footer-social">
              <Link href="#" className="social-icon" aria-label="Facebook">
                <Facebook size={18} />
              </Link>
              <Link href="#" className="social-icon" aria-label="Twitter">
                <Twitter size={18} />
              </Link>
              <Link href="#" className="social-icon" aria-label="Instagram">
                <Instagram size={18} />
              </Link>
              <Link href="#" className="social-icon" aria-label="LinkedIn">
                <Linkedin size={18} />
              </Link>
              <Link href="#" className="social-icon" aria-label="YouTube">
                <Youtube size={18} />
              </Link>
            </div>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div className="footer-column footer-links">
            <h3 className="footer-heading">Enlaces Rápidos</h3>
            <ul className="footer-links-list">
              <li>
                <Link href="#Nuestra Organización">Nuestra Organización</Link>
              </li>
              <li>
                <Link href="#Productos">Productos</Link>
              </li>
              <li>
                <Link href="#Testimonios">Testimonios</Link>
              </li>
              <li>
                <Link href="#Registro">Únete a Nosotras</Link>
              </li>
              <li>
                <Link href="#">Proyectos Comunitarios</Link>
              </li>
              <li>
                <Link href="#">Noticias y Eventos</Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div className="footer-column footer-contact">
            <h3 className="footer-heading">Contáctanos</h3>
            <ul className="footer-contact-list">
              <li>
                <span className="contact-icon">
                  <MapPin size={16} />
                </span>
                <span>Madrid, Managua, Nicaragua</span>
              </li>
              <li>
                <span className="contact-icon">
                  <Phone size={16} />
                </span>
                <span>+505 2222-3333</span>
              </li>
              <li>
                <span className="contact-icon">
                  <Mail size={16} />
                </span>
                <span>contacto@cooperativaladiosa.org</span>
              </li>
              <li>
                <span className="contact-icon">
                  <Clock size={16} />
                </span>
                <span>Lun - Vie: 8:00 AM - 5:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Columna 4: Suscripción */}
          <div className="footer-column footer-newsletter">
            <h3 className="footer-heading">Mantente Informada</h3>
            <p className="footer-newsletter-text">
              Suscríbete a nuestro boletín para recibir noticias, eventos y oportunidades de empleo.
            </p>
            <form className="footer-form">
              <div className="form-group">
                <input type="email" placeholder="Tu correo electrónico" required />
                <button type="submit" className="subscribe-btn">
                  <span>Suscribirse</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
            <div className="footer-app-download">
              <p>Descarga nuestra aplicación:</p>
              <div className="app-buttons">
                <Link href="#" className="app-button">
                  <Apple size={16} />
                  <span>App Store</span>
                </Link>
                <Link href="#" className="app-button">
                  <Play size={16} />
                  <span>Google Play</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Separador */}
        <div className="footer-divider"></div>

        {/* Pie de página */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>&copy; 2025 Cooperativa de Mujeres. Todos los derechos reservados.</p>
          </div>
          <div className="footer-legal">
            <Link href="#">Términos y Condiciones</Link>
            <Link href="#">Política de Privacidad</Link>
            <Link href="#">Política de Cookies</Link>
          </div>
        </div>
      </div>

      {/* Botón de volver arriba */}
      <div className="back-to-top" id="backToTop">
        <ChevronUp size={24} />
      </div>
    </footer>
  )
}

