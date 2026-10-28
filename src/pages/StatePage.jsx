import { useState } from 'react';
import { Sun, Moon, Plus, Minus, Heart, Star, Trash2, RefreshCw } from 'lucide-react';
import ConceptHeader from '../components/ConceptHeader.jsx';

const COLORS = ['#7c6af0', '#e06f3a', '#3aafe0', '#3ac07a', '#d94f7a', '#f0c14a', '#8b5cf6'];

function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  return (
    <div className="demo-card">
      <h3 className="demo-title">🔢 Contador com useState</h3>
      <div className="counter-display" style={{ color: count < 0 ? '#d94f7a' : count > 0 ? '#3ac07a' : '#888' }}>
        {count}
      </div>
      <div className="counter-step-row">
        <span>Passo:</span>
        {[1, 5, 10].map((s) => (
          <button
            key={s}
            className={`step-btn${step === s ? ' active' : ''}`}
            onClick={() => setStep(s)}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="counter-controls">
        <button className="ctrl-btn ctrl-red" onClick={() => setCount((c) => c - step)}>
          <Minus size={18} /> Diminuir
        </button>
        <button className="ctrl-btn ctrl-ghost" onClick={() => setCount(0)}>
          <RefreshCw size={15} /> Reset
        </button>
        <button className="ctrl-btn ctrl-green" onClick={() => setCount((c) => c + step)}>
          <Plus size={18} /> Aumentar
        </button>
      </div>
      <div className="code-snippet">
        <code>const [count, setCount] = useState(0);</code>
      </div>
    </div>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState(false);

  return (
    <div className={`demo-card theme-demo${dark ? ' theme-dark' : ' theme-light'}`}>
      <h3 className="demo-title">🌗 Toggle de Tema</h3>
      <p className="demo-desc">
        Estado booleano controlando a aparência do componente em tempo real.
      </p>
      <button className="theme-btn" onClick={() => setDark((d) => !d)}>
        {dark ? <Sun size={20} /> : <Moon size={20} />}
        {dark ? ' Modo claro' : ' Modo escuro'}
      </button>
      <div className="code-snippet">
        <code>const [dark, setDark] = useState(false);</code>
      </div>
    </div>
  );
}

function FavoriteList() {
  const [items] = useState(['Paris', 'Tóquio', 'Nova York', 'Lisboa', 'Buenos Aires', 'Bangcoc']);
  const [favorites, setFavorites] = useState([]);

  const toggle = (item) =>
    setFavorites((f) => f.includes(item) ? f.filter((x) => x !== item) : [...f, item]);

  return (
    <div className="demo-card">
      <h3 className="demo-title">❤️ Lista de Favoritos</h3>
      <p className="demo-desc">
        Array no estado — adicionar e remover itens com imutabilidade.
      </p>
      <div className="fav-grid">
        {items.map((item) => (
          <button
            key={item}
            className={`fav-chip${favorites.includes(item) ? ' fav-active' : ''}`}
            onClick={() => toggle(item)}
          >
            <Heart size={13} fill={favorites.includes(item) ? 'currentColor' : 'none'} />
            {item}
          </button>
        ))}
      </div>
      <div className="fav-count">
        {favorites.length > 0
          ? `${favorites.length} favorito${favorites.length > 1 ? 's' : ''}: ${favorites.join(', ')}`
          : 'Nenhum favorito ainda'}
      </div>
      <div className="code-snippet">
        <code>setFavorites(f =&gt; f.includes(item) ? f.filter(...) : [...f, item])</code>
      </div>
    </div>
  );
}

function ColorPicker() {
  const [color, setColor] = useState(COLORS[0]);
  const [stars, setStars] = useState(3);

  return (
    <div className="demo-card">
      <h3 className="demo-title">🎨 Multi-estado</h3>
      <p className="demo-desc">Múltiplos estados independentes no mesmo componente.</p>
      <div className="color-preview" style={{ background: color }} />
      <div className="color-swatches">
        {COLORS.map((c) => (
          <button
            key={c}
            className={`swatch${color === c ? ' swatch-active' : ''}`}
            style={{ background: c }}
            onClick={() => setColor(c)}
          />
        ))}
      </div>
      <div className="star-row">
        {[1, 2, 3, 4, 5].map((s) => (
          <button key={s} className="star-btn" onClick={() => setStars(s)}>
            <Star size={22} fill={s <= stars ? color : 'none'} color={s <= stars ? color : '#ccc'} />
          </button>
        ))}
        <span style={{ color: '#888', fontSize: 12 }}>{stars}/5</span>
      </div>
      <div className="code-snippet">
        <code>const [color, setColor] = useState(COLORS[0]);</code>
        <code>const [stars, setStars] = useState(3);</code>
      </div>
    </div>
  );
}

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Reservar hotel', done: true },
    { id: 2, text: 'Comprar passagem', done: false },
    { id: 3, text: 'Fazer mala', done: false },
  ]);
  const [input, setInput] = useState('');

  const add = () => {
    if (!input.trim()) return;
    setTodos((t) => [...t, { id: Date.now(), text: input.trim(), done: false }]);
    setInput('');
  };

  const toggle = (id) =>
    setTodos((t) => t.map((item) => item.id === id ? { ...item, done: !item.done } : item));

  const remove = (id) =>
    setTodos((t) => t.filter((item) => item.id !== id));

  return (
    <div className="demo-card demo-full">
      <h3 className="demo-title">📋 Lista de tarefas (estado complexo)</h3>
      <div className="todo-input-row">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && add()}
          placeholder="Nova tarefa de viagem..."
          className="todo-input"
        />
        <button className="todo-add-btn" onClick={add}>
          <Plus size={18} />
        </button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={`todo-item${todo.done ? ' todo-done' : ''}`}>
            <button className="todo-check" onClick={() => toggle(todo.id)}>
              {todo.done ? '✓' : '○'}
            </button>
            <span>{todo.text}</span>
            <button className="todo-delete" onClick={() => remove(todo.id)}>
              <Trash2 size={14} />
            </button>
          </li>
        ))}
      </ul>
      <div className="todo-summary">
        {todos.filter((t) => t.done).length}/{todos.length} concluídas
      </div>
    </div>
  );
}

export default function StatePage() {
  return (
    <div className="concept-page">
      <ConceptHeader
        num="07"
        color="#7c6af0"
        title="State & useState"
        subtitle="Como armazenar e atualizar informações na interface"
        desc="useState é o hook fundamental do React. Ele permite que componentes funcionais 'lembrem' informações entre re-renderizações e atualizem a UI de forma reativa."
      />
      <div className="demos-grid">
        <Counter />
        <ThemeToggle />
        <FavoriteList />
        <ColorPicker />
        <TodoList />
      </div>
    </div>
  );
}
