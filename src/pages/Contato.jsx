import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { MapPin, Phone, WhatsappLogo, Envelope } from '@phosphor-icons/react'
import './Contato.css'

function Contato() {
  return (
    <>
      <Helmet>
        <title>Fale com Especialistas | SolarEnergy</title>
      </Helmet>

      <section style={{ paddingTop: 'calc(var(--nav-height) + 4rem)', paddingBottom: '4rem', minHeight: '80vh' }}>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-header text-center mx-auto"
          >
            <span className="section-subtitle">Vamos Conversar</span>
            <h1 className="section-title">Inicie seu Projeto</h1>
          </motion.div>

          <div className="contato-grid">
            <motion.div
              className="contato-info"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2>Informações de Contato</h2>
              <p>Nossa equipe de engenharia está pronta para analisar a demanda energética da sua empresa e elaborar um estudo de viabilidade sem compromisso.</p>
              
              <div className="contato-list">
                <div className="contato-item">
                  <MapPin size={28} color="var(--color-primary)" />
                  <div>
                    <h4>Sede Administrativa</h4>
                    <p>Ermo, Santa Catarina - Brasil<br/>Atendemos todo SC e RS</p>
                  </div>
                </div>
                <div className="contato-item">
                  <Phone size={28} color="var(--color-primary)" />
                  <div>
                    <h4>Telefone</h4>
                    <p>48 99963-2201</p>
                  </div>
                </div>
                <div className="contato-item">
                  <Envelope size={28} color="var(--color-primary)" />
                  <div>
                    <h4>E-mail Comercial</h4>
                    <p>contato@solarenergy.com.br</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <form className="contato-form-container">
                <div className="form-group">
                  <label>Nome ou Empresa</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="form-group">
                  <label>E-mail</label>
                  <input type="email" className="form-control" />
                </div>
                <div className="form-group">
                  <label>Mensagem (Demanda)</label>
                  <textarea rows="4" className="form-control" style={{ resize: 'vertical' }}></textarea>
                </div>
                <button type="button" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                  SOLICITAR ORÇAMENTO
                </button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Floating WhatsApp Button */}
        <a href="#" style={{
          position: 'fixed', bottom: '30px', right: '30px',
          backgroundColor: '#25D366', color: '#fff',
          width: '60px', height: '60px', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)',
          zIndex: 1000, transition: 'transform 0.3s ease'
        }}
        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <WhatsappLogo size={36} weight="fill" />
        </a>
      </section>
    </>
  )
}

export default Contato
