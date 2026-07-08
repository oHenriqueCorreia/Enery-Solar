import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'

function Projetos() {
  const projetos = [
    {
      id: 1,
      title: "Usina Solar Industrial",
      cap: "1.2 MWp",
      img: "/portfolio-1.png",
      desc: "Instalação em telhado industrial, garantindo 100% de autonomia para a fábrica."
    },
    {
      id: 2,
      title: "Fazenda Solar no Solo",
      cap: "3.5 MWp",
      img: "/portfolio-2.png",
      desc: "Geração centralizada para compensação de energia em múltiplas filiais de rede atacadista."
    },
    {
      id: 3,
      title: "Armazenamento Comercial",
      cap: "500 kWh",
      img: "/portfolio-3.png",
      desc: "Sistema BESS para operação crítica e peak shaving em horário de ponta."
    }
  ]

  return (
    <>
      <Helmet>
        <title>Portfólio de Projetos | SolarEnergy</title>
      </Helmet>

      <section style={{ paddingTop: 'calc(var(--nav-height) + 4rem)', paddingBottom: '4rem' }}>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-header text-center mx-auto"
          >
            <span className="section-subtitle">Casos de Sucesso</span>
            <h1 className="section-title">Portfólio Premium</h1>
            <p className="section-description">Projetos de alta complexidade executados com excelência.</p>
          </motion.div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '2rem', 
            marginTop: '4rem' 
          }}>
            {projetos.map((proj, i) => (
              <motion.div 
                key={proj.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  backgroundColor: 'var(--color-bg-card)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.05)',
                  boxShadow: 'var(--shadow-subtle)'
                }}
              >
                <div style={{
                  height: '300px',
                  backgroundImage: `url(${proj.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'transform 0.5s ease',
                }} />
                <div style={{ padding: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.3rem' }}>{proj.title}</h3>
                    <span style={{ color: 'var(--color-primary)', fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}>{proj.cap}</span>
                  </div>
                  <p style={{ color: 'var(--color-text-muted)' }}>{proj.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Projetos
