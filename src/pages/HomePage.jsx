import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Globe, BookOpen, Zap, Route, Layers } from 'lucide-react';

const features = [
  {
    num: '07',
    icon: Zap,
    title: 'State & useState',
    desc: 'Contador interativo, toggle de tema e gerenciamento de estado em tempo real.',
    link: '/state',
    color: '#7c6af0',
  },
  {
    num: '08',
    icon: BookOpen,
    title: 'Formulários',
    desc: 'Formulário de viagem com validação, feedback visual e controle de campos.',
    link: '/formularios',
    color: '#e06f3a',
  },
  {
    num: '09',
    icon: Compass,
    title: 'useEffect',
    desc: 'Sincronização com localStorage, timers e efeitos colaterais em ação.',
    link: '/useeffect',
    color: '#3aafe0',
  },
  {
    num: '10',
    icon: Globe,
    title: 'Consumo de APIs',
    desc: 'Busca de países em tempo real via RestCountries API com loading e erros.',
    link: '/api',
    color: '#3ac07a',
  },
  {
    num: '11',
    icon: Route,
    title: 'React Router',
    desc: 'Navegação entre páginas, rotas dinâmicas e parâmetros de URL.',
    link: '/router',
    color: '#d94f7a',
  },
];

export default function HomePage() {
  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hp-hero">
        <div className="hp-hero-bg" />
        <div className="hp-hero-content">
          <div className="hp-eyebrow">
            <span className="hp-eyebrow-line" />
            <span>AULA 08 • CONCEITOS REACT</span>
          </div>
          <h1 className="hp-title">
            React na prática —<br />
            <em>cinco conceitos,</em><br />
            um projeto.
          </h1>
          <p className="hp-subtitle">
            Explore cada conceito ensinado pelo professor de forma interativa.
            Cada página demonstra um hook ou recurso do React funcionando de verdade.
          </p>
          <div className="hp-cta-group">
            <Link to="/api" className="hp-cta-primary">
              Explorar API ao vivo <ArrowRight size={16} />
            </Link>
            <Link to="/state" className="hp-cta-secondary">
              Ver useState →
            </Link>
          </div>
        </div>
        <div className="hp-hero-visual">
          <div className="hp-code-card">
            <div className="hp-code-dots">
              <span style={{ background: '#ff6058' }} />
              <span style={{ background: '#ffbd2e' }} />
              <span style={{ background: '#28ca42' }} />
            </div>
            <pre className="hp-code-block">{`import { useState, useEffect } from 'react';
  import { HashRouter, Routes } from 'react-router-dom';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // O proxy adiciona a chave no servidor, sem expô-la no navegador.
    fetch('/api/countries?limit=100')
      .then(res => res.json())
      .then(payload => setData(payload.data.objects));
  }, []);

  return <HashRouter><Routes> ... </Routes></HashRouter>;
}`}</pre>
          </div>
          <div className="hp-badge-float hp-badge-1">
            <Zap size={14} /> useState ativo
          </div>
          <div className="hp-badge-float hp-badge-2">
            <Globe size={14} /> API conectada
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="hp-features">
        <div className="hp-features-header">
          <span className="section-label">OS CONCEITOS DO PROFESSOR</span>
          <h2>Cinco módulos.<br /><em>Tudo funcionando.</em></h2>
        </div>
        <div className="hp-features-grid">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <Link key={f.num} to={f.link} className="hp-feature-card" style={{ '--card-accent': f.color }}>
                <div className="hp-card-num">{f.num}</div>
                <div className="hp-card-icon-wrap">
                  <Icon size={22} />
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <span className="hp-card-cta">
                  Explorar conceito <ArrowRight size={13} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Quick stats */}
      <section className="hp-stats">
        <div className="hp-stat">
          <strong>5</strong>
          <span>Conceitos React</span>
        </div>
        <div className="hp-stat-divider" />
        <div className="hp-stat">
          <strong>1</strong>
          <span>API real integrada</span>
        </div>
        <div className="hp-stat-divider" />
        <div className="hp-stat">
          <strong>∞</strong>
          <span>Interatividade</span>
        </div>
        <div className="hp-stat-divider" />
        <div className="hp-stat">
          <strong>
            <Layers size={24} />
          </strong>
          <span>React Router v6</span>
        </div>
      </section>
    </div>
  );
}
