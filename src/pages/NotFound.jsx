import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="nf-content">
        <div className="nf-number">404</div>
        <h1>Rota não encontrada</h1>
        <p>Esta URL não corresponde a nenhuma rota do React Router.</p>
        <code className="nf-route-tip">&lt;Route path="*" element=&lt;NotFound /&gt; /&gt;</code>
        <div className="nf-links">
          <Link to="/" className="hp-cta-primary"><Home size={15} /> Voltar ao início</Link>
          <Link to="/api" className="hp-cta-secondary"><Compass size={15} /> Ver países</Link>
        </div>
      </div>
    </div>
  );
}
