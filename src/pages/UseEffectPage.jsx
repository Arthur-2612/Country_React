import { useState, useEffect, useRef } from 'react';
import { Clock, Database, Eye, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import ConceptHeader from '../components/ConceptHeader.jsx';

// Demo 1: Live clock
function LiveClock() {
  const [time, setTime] = useState(new Date());
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id); // cleanup!
  }, [running]);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="demo-card">
      <h3 className="demo-title">⏰ Relógio em tempo real</h3>
      <p className="demo-desc">useEffect com intervalo e função de cleanup.</p>
      <div className="clock-display">
        <span>{pad(time.getHours())}</span>
        <span className="clock-sep">:</span>
        <span>{pad(time.getMinutes())}</span>
        <span className="clock-sep">:</span>
        <span>{pad(time.getSeconds())}</span>
      </div>
      <button
        className={`ctrl-btn ${running ? 'ctrl-red' : 'ctrl-green'}`}
        onClick={() => setRunning((r) => !r)}
        style={{ margin: '8px auto 0', display: 'flex' }}
      >
        <RefreshCw size={14} /> {running ? 'Pausar' : 'Retomar'}
      </button>
      <div className="code-snippet">
        <code>{'useEffect(() => {'}</code>
        <code>{'  const id = setInterval(() => setTime(new Date()), 1000);'}</code>
        <code>{'  return () => clearInterval(id); // cleanup'}</code>
        <code>{'}, [running]);'}</code>
      </div>
    </div>
  );
}

// Demo 2: localStorage persistence
function PersistenceDemo() {
  const KEY = 'useeffect-demo-note';
  const [note, setNote] = useState(() => localStorage.getItem(KEY) || '');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!note.trim()) return;
    const t = setTimeout(() => {
      localStorage.setItem(KEY, note);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 800);
    return () => clearTimeout(t);
  }, [note]);

  return (
    <div className="demo-card">
      <h3 className="demo-title">
        <Database size={16} /> Persistência com localStorage
      </h3>
      <p className="demo-desc">
        Salva automaticamente após 0.8s sem digitar. Reload e a nota continua!
      </p>
      <textarea
        className="persist-textarea"
        value={note}
        onChange={(e) => { setNote(e.target.value); setSaved(false); }}
        placeholder="Digite algo — será salvo automaticamente..."
        rows={4}
      />
      <div className={`persist-status${saved ? ' persist-saved' : ''}`}>
        {saved ? '✓ Salvo no localStorage!' : 'Aguardando digitação...'}
      </div>
      <button className="ctrl-btn ctrl-ghost" onClick={() => { localStorage.removeItem(KEY); setNote(''); }}>
        <RefreshCw size={13} /> Limpar
      </button>
      <div className="code-snippet">
        <code>useEffect(() =&gt; {'{'}</code>
        <code>{'  const t = setTimeout(() => localStorage.setItem(KEY, note), 800);'}</code>
        <code>{'  return () => clearTimeout(t);'}</code>
        <code>{'}, [note]);'}</code>
      </div>
    </div>
  );
}

// Demo 3: Document title
function TitleChanger() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = count > 0 ? `(${count}) React Hooks Demo` : 'React Hooks Demo';
    return () => { document.title = 'Rota Aberta'; };
  }, [count]);

  return (
    <div className="demo-card">
      <h3 className="demo-title">📄 document.title dinâmico</h3>
      <p className="demo-desc">
        useEffect sincroniza o estado com o título da aba do navegador.
      </p>
      <div className="counter-display" style={{ fontSize: 48, color: '#3aafe0' }}>{count}</div>
      <div className="counter-controls">
        <button className="ctrl-btn ctrl-red" onClick={() => setCount((c) => Math.max(0, c - 1))}>- 1</button>
        <button className="ctrl-btn ctrl-green" onClick={() => setCount((c) => c + 1)}>+ 1</button>
      </div>
      <p style={{ fontSize: 11, color: '#888', marginTop: 8, textAlign: 'center' }}>
        Olhe a aba do navegador!
      </p>
      <div className="code-snippet">
        <code>useEffect(() =&gt; {'{'}</code>
        <code>{'  document.title = count > 0 ? `(${count}) Demo` : "Demo";'}</code>
        <code>{'}, [count]);'}</code>
      </div>
    </div>
  );
}

// Demo 4: Network status
function NetworkStatus() {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => {
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
    };
  }, []);

  return (
    <div className="demo-card">
      <h3 className="demo-title">
        {online ? <Wifi size={16} /> : <WifiOff size={16} />} Status de rede
      </h3>
      <p className="demo-desc">
        useEffect com event listeners e cleanup — sem memory leaks.
      </p>
      <div className={`network-badge ${online ? 'net-online' : 'net-offline'}`}>
        {online ? <Wifi size={20} /> : <WifiOff size={20} />}
        {online ? 'Você está online' : 'Você está offline'}
      </div>
      <p style={{ fontSize: 11, color: '#888', marginTop: 8, textAlign: 'center' }}>
        Desative o Wi-Fi para testar!
      </p>
      <div className="code-snippet">
        <code>useEffect(() =&gt; {'{'}</code>
        <code>{'  window.addEventListener("online", handleOnline);'}</code>
        <code>{'  return () => window.removeEventListener("online", handleOnline);'}</code>
        <code>{'}, []);'}</code>
      </div>
    </div>
  );
}

// Demo 5: Render counter
function RenderCounter() {
  const [val, setVal] = useState('');
  const renderCount = useRef(0);
  const effectCount = useRef(0);

  renderCount.current += 1;

  useEffect(() => {
    effectCount.current += 1;
  });

  useEffect(() => {}, [val]);

  return (
    <div className="demo-card">
      <h3 className="demo-title"><Eye size={16} /> Contador de renders</h3>
      <p className="demo-desc">
        Diferença entre renders e execuções de useEffect com diferentes deps.
      </p>
      <input
        className="form-input"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder="Digite para causar renders..."
      />
      <div className="render-stats">
        <div className="render-stat">
          <strong>{renderCount.current}</strong>
          <span>Renders totais</span>
        </div>
        <div className="render-stat">
          <strong>{effectCount.current}</strong>
          <span>Execuções de useEffect</span>
        </div>
      </div>
      <div className="code-snippet">
        <code>useEffect(() =&gt; {'{ /* roda todo render */ }'})</code>
        <code>useEffect(() =&gt; {'{ /* roda 1x */ }'}, [])</code>
        <code>useEffect(() =&gt; {'{ /* roda se val mudar */ }'}, [val])</code>
      </div>
    </div>
  );
}

export default function UseEffectPage() {
  return (
    <div className="concept-page">
      <ConceptHeader
        num="09"
        color="#3aafe0"
        title="useEffect"
        subtitle="Como sincronizar componentes com sistemas externos"
        desc="useEffect executa código após a renderização — ideal para buscar dados, configurar assinaturas ou modificar o DOM. A função de cleanup evita memory leaks."
      />
      <div className="demos-grid">
        <LiveClock />
        <PersistenceDemo />
        <TitleChanger />
        <NetworkStatus />
        <RenderCounter />
      </div>
    </div>
  );
}
