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
    
      <h2 className="section-title-footer"></h2>

      {/* Onda decorativa superior - Altura reducida */}
    

      <div className="footer-content">
        {/* Información principal */}
        <div className="footer-main">
          {/* Columna 1: Sobre nosotros */}
          <div className="footer-column footer-about">
            <div className="footer-logo">
              <Image
                src="/assets/imagenes/iconos/logo-las-diosas.ico"
                alt="Logo Cooperativa"
                className="footer-logo-img"
                width={50}
                height={50}
              />
              <h3 className="footer-logo-text">Central de Cooperativa R.L</h3>
            </div>
            <p className="footer-description">
              Somos una red de cooperativas comprometidas con el empoderamiento de mujeres nicaragüenses, promoviendo el
              desarrollo sostenible y la igualdad de oportunidades.
            </p>
       {/*      <div className="footer-social">
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
            </div> */}
          </div>

          {/* Columna 2: Enlaces rápidos */}
         

          {/* Columna 3: Contacto */}
          <div className="footer-column footer-contact">
            <h3 className="footer-heading">Contáctanos</h3>
            <ul className="footer-contact-list">
              <li>
                <span className="contact-icon">
                  <MapPin size={16} />
                </span>
                <span>Esteli, Managua, Nicaragua</span>
              </li>
              <li>
                <span className="contact-icon">
                  <Phone size={16} />
                </span>
                <span>+505 8628-8503</span>
              </li>
              <li>
                <span className="contact-icon">
                  <Mail size={16} />
                </span>
                <span> lasdiosasccoop@gmail.com</span>
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
              Suscríbete a nuestro boletín para recibir noticias, sobre nosotras.
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

