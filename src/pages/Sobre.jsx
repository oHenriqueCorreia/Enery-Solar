import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { CheckCircle } from '@phosphor-icons/react'
import './Sobre.css'

function Sobre() {
  return (
    <>
      <Helmet>
        <title>Sobre Nós | SolarEnergy</title>
        <meta name="description" content="Conheça a história e a capacidade técnica da SolarEnergy." />
      </Helmet>

      <section style={{ paddingTop: 'calc(var(--nav-height) + 4rem)', paddingBottom: '4rem' }}>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-header text-center mx-auto"
          >
            <span className="section-subtitle">Nossa História</span>
            <h1 className="section-title">Engenharia de Ponta</h1>
            <p className="section-description">Desde 2018, transformamos a relação de empresas com a energia, aliando tecnologia de ponta, governança e compromisso socioambiental.</p>
          </motion.div>

          <div className="sobre-grid">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Governança e Precisão</h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>A SolarEnergy não é apenas uma instaladora de painéis solares. Somos uma empresa de engenharia focada em <strong>alta performance e retorno sobre o investimento (ROI)</strong>.</p>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>Nosso CEO, Israel Silveira Dal Toe, estabeleceu como premissa que cada projeto seja tratado como uma obra de arte da engenharia: cálculos precisos, equipamentos Tier 1 e monitoramento constante.</p>
              
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {['Certificação Internacional de Qualidade', 'Equipe Própria de Engenheiros', 'Atendimento Corporativo VIP', 'Monitoramento 24/7'].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-main)' }}>
                    <CheckCircle size={24} color="var(--color-primary)" weight="fill" />
                    <span style={{ fontWeight: 500 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.img
              src="/0202.png"
              alt="Sobre a SolarEnergy"
              className="sobre-image"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ borderRadius: 'var(--radius-lg)' }}
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default Sobre
