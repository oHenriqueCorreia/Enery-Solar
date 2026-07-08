import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Sun, Plant, CarProfile, BatteryCharging, ArrowRight, ShieldCheck, Lightning, Leaf } from '@phosphor-icons/react'
import './Home.css'

function Home() {
  const [stats, setStats] = useState({ projects: 0, year: 2000 })
  const [billAmount, setBillAmount] = useState(2500)

  const monthlySavings = billAmount * 0.95
  const yearlySavings = monthlySavings * 12
  const paybackYears = (billAmount > 10000 ? 3.5 : 4.2).toFixed(1)
  const twentyYearSavings = yearlySavings * 20

  useEffect(() => {
    // Simple counter animation for stats
    const duration = 2000
    const steps = 60
    const stepTime = duration / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      setStats({
        projects: Math.min(Math.round((780 / steps) * currentStep), 780),
        year: Math.min(Math.round(2000 + ((18 / steps) * currentStep)), 2018)
      })
      if (currentStep >= steps) clearInterval(timer)
    }, stepTime)

    return () => clearInterval(timer)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <>
      <Helmet>
        <title>SolarEnergy | Energia que Impulsiona Negócios</title>
        <meta name="description" content="Projetamos, instalamos e gerenciamos soluções energéticas inteligentes para quem busca independência, eficiência e crescimento sustentável." />
      </Helmet>

      {/* Hero Section */}
      <section className="hero">
        <iframe
          src="https://www.youtube.com/embed/qSIq8vPbIFw?autoplay=1&mute=1&loop=1&playlist=qSIq8vPbIFw&controls=0&showinfo=0&rel=0"
          title="Vídeo institucional Solar Energy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="hero-bg-video"
        />
        <div className="hero-bg-overlay"></div>
        <div className="container hero-container" style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center' }}
          >
            <h1 className="hero-title" style={{ maxWidth: '1000px', margin: '0 auto', textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>A ENERGIA QUE IMPULSIONA NEGÓCIOS E CIDADES.</h1>
          </motion.div>
        </div>
      </section>

      {/* Credibility Section */}
      <section className="credibility bg-card">
        <div className="container">
          <div className="credibility-grid">
            <motion.div 
              className="credibility-stats"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={containerVariants}
            >
              <motion.div className="stat-item" variants={itemVariants}>
                <h2 className="stat-number">{stats.projects}+</h2>
                <p className="stat-label">Projetos Executados</p>
              </motion.div>
              <motion.div className="stat-item" variants={itemVariants}>
                <h2 className="stat-number">Desde {stats.year}</h2>
                <p className="stat-label">estabelecendo inteligência energética</p>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="credibility-image-wrapper"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ flex: 1.5 }}
            >
              <img src="/imagem-01.jpg" alt="Liderança" style={{ width: '100%', height: 'auto', borderRadius: '16px', boxShadow: 'var(--shadow-subtle)' }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solutions Preview */}
      <section className="solutions">
        <div className="container">
          <div className="section-header text-center mx-auto">
            <span className="section-subtitle">Nossos Pilares</span>
            <h2 className="section-title">Soluções Completas</h2>
            <p className="section-description">Atendemos às mais complexas demandas de engenharia elétrica e solar do mercado corporativo e do agronegócio.</p>
          </div>

          <motion.div 
            className="solutions-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {[
              { icon: <Sun size={48} />, title: "Energia Solar", desc: "Soluções completas para indústrias, empresas e residências." },
              { icon: <Plant size={48} />, title: "Agronegócio", desc: "Sistemas para irrigação, aviários, secadores e armazéns." },
              { icon: <CarProfile size={48} />, title: "Mobilidade Elétrica", desc: "Infraestrutura corporativa de carregamento veicular." },
              { icon: <BatteryCharging size={48} />, title: "Armazenamento", desc: "Baterias inteligentes para autonomia e segurança total." }
            ].map((sol, index) => (
              <motion.div key={index} className="solution-card" variants={itemVariants}>
                <div className="solution-icon">{sol.icon}</div>
                <h3 className="solution-title">{sol.title}</h3>
                <p className="solution-text">{sol.desc}</p>
                <Link to="/solucoes" className="solution-link">SAIBA MAIS <ArrowRight size={16} /></Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="calculator bg-card">
        <div className="container">
          <div className="section-header text-center mx-auto">
            <span className="section-subtitle">Calculadora de ROI</span>
            <h2 className="section-title">Simule sua Economia</h2>
            <p className="section-description">Descubra o potencial de retorno financeiro ao investir em uma usina solar para sua empresa.</p>
          </div>

          <motion.div 
            className="calc-container"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="calc-input-area">
              <h3>Qual o valor médio da sua conta de luz?</h3>
              <div className="slider-wrapper">
                <input 
                  type="range" 
                  min="500" max="50000" step="500" 
                  value={billAmount} 
                  onChange={(e) => setBillAmount(Number(e.target.value))}
                  className="calc-slider"
                />
              </div>
              <div className="calc-bill-value">
                R$ {billAmount.toLocaleString('pt-BR')}<span>/mês</span>
              </div>
            </div>

            <div className="calc-results">
              <div className="result-card">
                <p>Economia Mensal</p>
                <h4>R$ {monthlySavings.toLocaleString('pt-BR', {maximumFractionDigits: 0})}</h4>
              </div>
              <div className="result-card">
                <p>Payback Estimado</p>
                <h4>{paybackYears} Anos</h4>
              </div>
              <div className="result-card highlight">
                <p>Economia em 20 Anos</p>
                <h4>R$ {twentyYearSavings.toLocaleString('pt-BR', {maximumFractionDigits: 0})}</h4>
              </div>
            </div>
            
            <div className="calc-cta text-center mt-md">
              <Link to="/contato" className="btn btn-primary">RECEBER ESTUDO DETALHADO</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partners Banner */}
      <section className="partners bg-darker">
        <div className="container">
          <p className="partners-title">PARCEIROS ESTRATÉGICOS DE TECNOLOGIA</p>
          <div className="partners-list">
            {['WEG', 'BYD', 'Fronius', 'Sungrow', 'Intelbras', 'CanadianSolar', 'Jinko'].map(partner => (
              <span key={partner} className="partner-logo">{partner}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
