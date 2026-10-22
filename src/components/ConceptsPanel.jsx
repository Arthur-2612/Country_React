import { BookOpen, Check, ChevronDown, Code2, Layers3, RefreshCw, Repeat2 } from 'lucide-react';
import { useState } from 'react';

const concepts = [
  {
    title: 'Componentes & props', icon: Layers3, badge: 'NO PROJETO',
    code: 'function DestinationCard({ destination, isFavorite }) {\n  return (\n    <article>\n      <h3>{destination.name}</h3>\n      {isFavorite && <span>Favorito</span>}\n    </article>\n  );\n}',
    body: 'DestinationCard é uma peça reutilizável. As props transportam informações e funções do componente pai para o filho — sem duplicar marcação.',
  },
  {
    title: 'Estado & eventos', icon: RefreshCw, badge: 'NO PROJETO',
    code: 'const [favorites, setFavorites] = useState([]);\n\nfunction toggleFavorite(id) {\n  setFavorites((current) =>\n    current.includes(id)\n      ? current.filter((item) => item !== id)\n      : [...current, id]\n  );\n}',
    body: 'useState guarda preferências e roteiro. Ao chamar o setter com um novo array, o React atualiza a interface; handlers respondem aos cliques do viajante.',
  },
  {
    title: 'Listas & chaves', icon: Repeat2, badge: 'NO PROJETO',
    code: '{filteredDestinations.map((destination) => (\n  <DestinationCard\n    key={destination.id}\n    destination={destination}\n  />\n))}',
    body: 'map transforma dados em elementos da interface. A key estável identifica cada destino e ajuda o React a acompanhar inserções, remoções e mudanças de ordem.',
  },
  {
    title: 'Renderização condicional', icon: Code2, badge: 'NO PROJETO',
    code: '{dayPlan.length > 0\n  ? <PlannedDay places={dayPlan} />\n  : <EmptyItinerary />}',
    body: 'Uma condição escolhe qual experiência aparece: o convite para começar quando o dia está vazio ou o roteiro com os lugares quando há planos.',
  },
  {
    title: 'Virtual DOM', icon: Layers3, badge: 'EDIÇÃO',
    code: '// Você escreve uma descrição declarativa:\n<DestinationCard destination={city} />\n\n// O React compara a nova descrição\n// e atualiza o DOM real necessário.',
    body: 'O Virtual DOM não é uma tela ou módulo que montamos à mão: é um modelo interno do React. Quando o estado muda, o React calcula uma nova descrição da UI, reconcilia diferenças com a anterior e atualiza o DOM real de forma eficiente.',
  },
  {
    title: 'Efeitos & persistência', icon: RefreshCw, badge: 'NO PROJETO',
    code: 'useEffect(() => {\n  localStorage.setItem(\n    \'rota-aberta\',\n    JSON.stringify({ favorites, tripDays })\n  );\n}, [favorites, tripDays]);',
    body: 'useEffect sincroniza o estado React com algo externo — aqui, o armazenamento local do navegador. Ao voltar à página, os favoritos e o roteiro continuam salvos.',
  },
];

export default function ConceptsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);

  return (
    <section className="concepts-section" id="conceitos">
      <button className={`concepts-toggle${isOpen ? ' is-open' : ''}`} type="button" aria-expanded={isOpen} onClick={() => setIsOpen((value) => !value)}>
        <span className="concepts-icon"><BookOpen size={18} /></span>
        <span className="concepts-toggle-copy"><strong>Por dentro do React</strong><small>Uma edição interativa: os conceitos da aula 08 em ação.</small></span>
        <span className="concepts-toggle-cta">{isOpen ? 'Fechar edição' : 'Abrir edição'} <ChevronDown size={15} /></span>
      </button>

      {isOpen && (
        <div className="concepts-body">
          <div className="concepts-intro"><span className="section-kicker">CADERNO DE VIAGEM · EDIÇÃO ESPECIAL</span><h2>Um passeio pelos<br /><em>conceitos da aula.</em></h2><p>Algumas ideias aparecem em código. Outras, como o Virtual DOM, vivem nos bastidores. Aqui, as duas ganham lugar no roteiro.</p></div>
          <div className="concept-list">
            {concepts.map(({ title, icon: Icon, badge, code, body }, index) => (
              <article className={`concept-row${expanded === index ? ' is-expanded' : ''}`} key={title}>
                <button className="concept-header" type="button" aria-expanded={expanded === index} onClick={() => setExpanded((current) => current === index ? null : index)}>
                  <span className="concept-number">{String(index + 1).padStart(2, '0')}</span><Icon size={17} /><strong>{title}</strong><span className={`concept-badge${badge === 'EDIÇÃO' ? ' is-editorial' : ''}`}><Check size={11} /> {badge}</span><ChevronDown className="concept-chevron" size={15} />
                </button>
                {expanded === index && <div className="concept-content"><p>{body}</p><pre><code>{code}</code></pre></div>}
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
