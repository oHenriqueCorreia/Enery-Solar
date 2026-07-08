import { Link } from 'react-router-dom'
import { InstagramLogo, LinkedinLogo, FacebookLogo, MapPin, Phone, Envelope } from '@phosphor-icons/react'
import logoBranca from '../assets/logo-branca.png'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo">
              <img src={logoBranca} alt="Solar Energy" style={{ height: '60px', objectFit: 'contain' }} />
            </Link>
            <p className="footer-desc mt-sm">
              Engenharia energética inteligente para quem busca independência, eficiência e crescimento sustentável.
            </p>
            <div className="social-icons" style={{ marginTop: '2.5rem' }}>
              <a href="#" aria-label="Instagram"><InstagramLogo size={24} weight="fill" /></a>
              <a href="#" aria-label="LinkedIn"><LinkedinLogo size={24} weight="fill" /></a>
              <a href="#" aria-label="Facebook"><FacebookLogo size={24} weight="fill" /></a>
            </div>
          </div>
          
          <div className="footer-links">
            <h4 className="footer-title">Navegação</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/sobre">Sobre a Empresa</Link></li>
              <li><Link to="/solucoes">Soluções</Link></li>
              <li><Link to="/projetos">Portfólio</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4 className="footer-title">Soluções</h4>
            <ul>
              <li><Link to="/solucoes">Energia Solar</Link></li>
              <li><Link to="/solucoes">Agronegócio</Link></li>
              <li><Link to="/solucoes">Mobilidade Elétrica</Link></li>
              <li><Link to="/solucoes">Armazenamento</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4 className="footer-title">Contato</h4>
            <ul>
              <li>
                <MapPin size={20} className="text-primary" />
                <span>📍 ERMO - SANTA CATARINA - BRASIL<br/><strong className="text-primary">Atuação: SC e RS</strong></span>
              </li>
              <li>
                <Phone size={20} className="text-primary" />
                <span>48 99963-2201</span>
              </li>
              <li>
                <Envelope size={20} className="text-primary" />
                <span>contato@solarenergy.com.br</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} SolarEnergy Engenharia. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
