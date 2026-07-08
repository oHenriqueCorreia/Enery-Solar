import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Sun, Plant, CarProfile, BatteryCharging } from '@phosphor-icons/react'
import './Solucoes.css'

function Solucoes() {
  const solucoes = [
    {
      id: "solar",
      icon: <Sun size={40} />,
      title: "Energia Solar Corporativa",
      desc: "Desenvolvemos usinas solares de solo e de telhado para indústrias, comércios e grandes propriedades. Nossos sistemas garantem redução de até 95% na conta de luz, protegendo o caixa da sua empresa contra as flutuações tarifárias.",
      features: ["Módulos Tier 1", "Inversores de Alta Eficiência", "Projetos Turn-key"]
    },
    {
      id: "agro",
      icon: <Plant size={40} />,
      title: "Inteligência para o Agronegócio",
      desc: "O campo não pode parar. Criamos soluções sob medida para irrigação, aviários, secadores e ordenhas. Sistemas robustos que suportam as condições mais adversas, garantindo autonomia para o produtor.",
      features: ["Sistemas Off-grid e On-grid", "Estruturas Reforçadas", "Financiamento Agro"]
    },
    {
      id: "mobilidade",
      icon: <CarProfile size={40} />,
      title: "Mobilidade Elétrica",
      desc: "Preparamos sua empresa ou frota para o futuro. Instalamos infraestrutura completa de carregadores veiculares (Wallbox e Fast Chargers), integrados à geração solar para carregamento a custo zero.",
      features: ["Carregadores Inteligentes", "Gestão de Frota", "Instalação Corporativa"]
    },
    {
      id: "baterias",
      icon: <BatteryCharging size={40} />,
      title: "Armazenamento (BESS)",
      desc: "Sistemas de armazenamento de energia em baterias de lítio. Solução perfeita para backup durante apagões, redução do pico de demanda e maximização do uso da energia solar gerada.",
      features: ["Baterias de Lítio (LiFePO4)", "Peak Shaving", "Backup Crítico"]
    }
  ]

  return (
    <>
      <Helmet>
        <title>Nossas Soluções | SolarEnergy</title>
      </Helmet>

      <section style={{ paddingTop: 'calc(var(--nav-height) + 4rem)', paddingBottom: '4rem' }}>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-header text-center mx-auto"
          >
            <span className="section-subtitle">Pilares de Crescimento</span>
            <h1 className="section-title">Engenharia Integrada</h1>
          </motion.div>

          <div className="solucoes-list">
            {solucoes.map((sol, i) => (
              <motion.div 
                key={sol.id}
                className="solucao-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="solucao-icon-box">
                  {sol.icon}
                </div>
                <div className="solucao-content">
                  <h2>{sol.title}</h2>
                  <p>{sol.desc}</p>
                  <div className="solucao-features">
                    {sol.features.map((feat, j) => (
                      <span key={j} className="solucao-feature-tag">
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Solucoes
