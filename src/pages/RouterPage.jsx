import { Link, useLocation } from 'react-router-dom';
import { Home, Zap, BookOpen, Compass, Globe, Route, ArrowRight, ExternalLink } from 'lucide-react';
import ConceptHeader from '../components/ConceptHeader.jsx';

const routes = [
  {
    path: '/',
    label: 'Home',
    icon: Home,
    desc: 'Página principal com visão geral de todos os conceitos.',
    tip: 'Rota raiz — ponto de entrada da aplicação.',
  },
  {
    path: '/state',
    label: 'State & useState',
    icon: Zap,
    desc: 'Demonstrações interativas do hook useState.',
    tip: 'Rota estática com path fixo.',
  },
  {
    path: '/formularios',
    label: 'Formulários',
    icon: BookOpen,
    desc: 'Formulário controlado com validação e submit assíncrono.',
    tip: 'Rota estática — formulário de viagem.',
  },
  {
    path: '/useeffect',
    label: 'useEffect',
    icon: Compass,
    desc: 'Efeitos colaterais, cleanup e sincronização com sistemas externos.',
    tip: 'Rota estática — múltiplos demos de useEffect.',
  },
  {
    path: '/api',
    label: 'Consumo de APIs',
    icon: Globe,
    desc: 'Busca de países em tempo real via RestCountries API.',
    tip: 'Rota estática — demonstração de fetch + useEffect.',
  },
  {
    path: '/router',
    label: 'React Router',
    icon: Route,
    desc: 'Você está aqui! Demonstração do próprio sistema de rotas.',
    tip: 'Esta página demonstra a si mesma.',
    current: true,
  },
  {
    path: '/pais/Brasil',
    label: 'Rota dinâmica: /pais/:nome',
    icon: ArrowRight,
    desc: 'Parâmetro de URL capturado com useParams() — tente mudar "Brasil"!',
    tip: 'Rota dinâmica com useParams.',
    dynamic: true,
  },
];

function RouteCard({ route }) {
  const Icon = route.icon;
  return (
    <div className={`router-card${route.current ? ' router-card-current' : ''}${route.dynamic ? ' router-card-dynamic' : ''}`}>
      <div className="router-card-top">
        <div className="router-card-icon">
          <Icon size={18} />
        </div>
        <code className="router-path">{route.path}</code>
        {route.current && <span className="router-badge router-badge-current">Você está aqui</span>}
        {route.dynamic && <span className="router-badge router-badge-dynamic">Dinâmica</span>}
      </div>
      <h3>{route.label}</h3>
      <p>{route.desc}</p>
      <div className="router-tip">💡 {route.tip}</div>
      <Link to={route.path} className="router-link">
        Ir para esta rota <ExternalLink size={12} />
      </Link>
    </div>
  );
}

function LocationInfo() {
  const loc = useLocation();
  return (
    <div className="location-card">
      <h3>📍 useLocation() — localização atual</h3>
      <div className="location-grid">
        <div className="location-field">
          <span>pathname</span>
          <code>{loc.pathname}</code>
        </div>
        <div className="location-field">
          <span>search</span>
          <code>{loc.search || '(vazio)'}</code>
        </div>
        <div className="location-field">
          <span>hash</span>
          <code>{loc.hash || '(vazio)'}</code>
        </div>
        <div className="location-field">
          <span>key</span>
          <code>{loc.key}</code>
        </div>
      </div>
    </div>
  );
}

export default function RouterPage() {
  return (
    <div className="concept-page">
      <ConceptHeader
        num="11"
        color="#d94f7a"
        title="React Router"
        subtitle="Como organizar páginas e navegação por URLs"
        desc="React Router: HashRouter, Routes, Route, Link, useParams e useLocation. O trecho # da URL mantém as rotas funcionando em hospedagem estática, sem exigir configuração no servidor."
      />

      <LocationInfo />

      <div className="router-concepts">
        <div className="demo-card">
          <h3 className="demo-title">🗺️ Estrutura de rotas deste projeto</h3>
            <pre className="router-structure">{`<HashRouter>
  <Routes>
    <Route path="/"          element={<HomePage />} />
    <Route path="/state"     element={<StatePage />} />
    <Route path="/formularios" element={<FormsPage />} />
    <Route path="/useeffect" element={<UseEffectPage />} />
    <Route path="/api"       element={<ApiPage />} />
    <Route path="/router"    element={<RouterPage />} />
    <Route path="/pais/:nome" element={<CountryPage />} />
    <Route path="*"          element={<NotFound />} />
  </Routes>
</HashRouter>`}</pre>
        </div>

        <div className="demo-card">
          <h3 className="demo-title">🔗 Link vs {'<a>'} — a diferença crucial</h3>
          <div className="link-comparison">
            <div className="comparison-side comparison-bad">
              <div className="comparison-label">❌ HTML puro (recarrega)</div>
              <code>{'<a href="/api">API</a>'}</code>
              <p>Faz uma requisição HTTP completa ao servidor. Perde o estado da aplicação.</p>
            </div>
            <div className="comparison-side comparison-good">
              <div className="comparison-label">✅ React Router (SPA)</div>
              <code>{'<Link to="/api">API</Link>'}</code>
              <p>Troca o componente sem recarregar. Preserva o estado da aplicação.</p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="router-routes-title">Todas as rotas do projeto</h2>
      <div className="router-grid">
        {routes.map((r) => <RouteCard key={r.path} route={r} />)}
      </div>

      <div className="demo-card" style={{ marginTop: 24 }}>
        <h3 className="demo-title">⚡ Navegação programática com useNavigate</h3>
        <pre className="router-structure">{`import { useNavigate } from 'react-router-dom';

function MeuComponente() {
  const navigate = useNavigate();

  function irParaAPI() {
    navigate('/api');             // navegar para rota
    navigate(-1);                 // voltar no histórico
    navigate('/api', { replace: true }); // substituir no histórico
  }
}`}</pre>
      </div>
    </div>
  );
}
