import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { List, X } from '@phosphor-icons/react'
import logoBranca from '../assets/logo-branca.png'
import './Navbar.css'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <Link to="/" className="logo">
          <img src={logoBranca} alt="Solar Energy" style={{ height: '45px', objectFit: 'contain' }} />
        </Link>

        <nav className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/sobre" className={location.pathname === '/sobre' ? 'active' : ''}>Sobre a Empresa</Link>
          <Link to="/solucoes" className={location.pathname === '/solucoes' ? 'active' : ''}>Soluções</Link>
          <Link to="/projetos" className={location.pathname === '/projetos' ? 'active' : ''}>Projetos</Link>
          <Link to="/contato" className={location.pathname === '/contato' ? 'active' : ''}>Contato</Link>
          
          <Link to="/contato" className="btn btn-primary nav-cta">Orçamento</Link>
        </nav>

        <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={32} /> : <List size={32} />}
        </button>
      </div>
    </header>
  )
}

export default Navbar
