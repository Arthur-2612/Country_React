import { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Compass, Heart, Leaf, Menu, Plane, Search, Sparkles } from 'lucide-react';
import { destinations, filters } from './data/destinations.js';
import DestinationCard from './components/DestinationCard.jsx';
import FilterBar from './components/FilterBar.jsx';
import Itinerary from './components/Itinerary.jsx';
import ConceptsPanel from './components/ConceptsPanel.jsx';

const STORAGE_KEY = 'rota-aberta-v1';
const initial = (() => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved && typeof saved === 'object' ? saved : {};
  } catch {
    return {};
  }
})();

export default function App() {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState(Array.isArray(initial.favorites) ? initial.favorites : []);
  const [days, setDays] = useState(Math.min(14, Math.max(1, Number(initial.days) || 4)));
  const [selectedDay, setSelectedDay] = useState(1);
  const [tripDays, setTripDays] = useState(initial.tripDays && typeof initial.tripDays === 'object' ? initial.tripDays : {});

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ favorites, tripDays, days }));
  }, [favorites, tripDays, days]);

  const filteredDestinations = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase('pt-BR');
    return destinations.filter((destination) => {
      const matchesStyle = activeFilter === 'Todos' || destination.style.includes(activeFilter);
      const matchesFavorite = !onlyFavorites || favorites.includes(destination.id);
      const matchesSearch = !query || `${destination.name} ${destination.country} ${destination.region} ${destination.style.join(' ')}`.toLocaleLowerCase('pt-BR').includes(query);
      return matchesStyle && matchesFavorite && matchesSearch;
    });
  }, [activeFilter, onlyFavorites, favorites, searchQuery]);

  const totalDays = Object.values(tripDays).filter(Array.isArray).reduce((sum, places) => sum + (places.length ? 1 : 0), 0);
  const destinationCount = Object.values(tripDays).filter(Array.isArray).reduce((sum, places) => sum + places.length, 0);

  function toggleFavorite(id) {
    setFavorites((current) => current.includes(id) ? current.filter((favorite) => favorite !== id) : [...current, id]);
  }

  function addToTrip(id) {
    setTripDays((current) => {
      const dayPlaces = current[selectedDay] || [];
      if (dayPlaces.includes(id)) return current;
      if (dayPlaces.length) return { ...current, [selectedDay]: [...dayPlaces, id] };
      const nextEmptyDay = Array.from({ length: days }, (_, index) => index + 1).find((day) => !current[day]?.length);
      const day = nextEmptyDay || selectedDay;
      setSelectedDay(day);
      return { ...current, [day]: [...(current[day] || []), id] };
    });
  }

  function removeFromTrip(day, id) {
    setTripDays((current) => ({ ...current, [day]: (current[day] || []).filter((place) => place !== id) }));
  }

  function moveInTrip(day, index, direction) {
    setTripDays((current) => {
      const places = [...(current[day] || [])];
      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= places.length) return current;
      [places[index], places[nextIndex]] = [places[nextIndex], places[index]];
      return { ...current, [day]: places };
    });
  }

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Rota Aberta — início"><span className="brand-mark"><Compass size={19} /></span><span>rota<span className="brand-light">aberta</span><i>.</i></span></a>
        <nav className="main-nav" aria-label="Navegação principal"><a href="#destinos">Destinos</a><a href="#roteiro">Meu roteiro</a><a href="#conceitos">Por dentro do React</a></nav>
        <div className="header-right"><a className="header-favorites" href="#destinos"><Heart size={15} /> <span>Salvos</span><span className="favorites-count">{favorites.length}</span></a><a href="#destinos" className="header-cta">Começar meu roteiro <ArrowUpRight size={15} /></a></div>
        <a className="mobile-menu" href="#destinos" aria-label="Explorar destinos"><Menu size={21} /></a>
      </header>

      <main id="inicio">
        <section className="hero-shell">
          <div className="hero-copy">
            <div className="hero-eyebrow"><span className="eyebrow-line" /> NÃO É SÓ SOBRE O DESTINO <span className="hero-sparkle"><Sparkles size={14} /></span></div>
            <h1>Sua próxima história<br />começa <em>em algum lugar.</em></h1>
            <p className="hero-description">Tem lugares que a gente visita. E tem lugares que encontram a gente. O primeiro passo para o seu é escolher.</p>
            <div className="hero-actions"><a className="primary-cta" href="#destinos">Explorar destinos <ArrowRight size={15} /></a><span className="hero-footnote"><span /> Um roteiro de cada vez. No seu tempo.</span></div>
            <div className="hero-note"><span className="note-decoration">“</span><span>O mundo é grande demais<br />para ficar só na vontade.</span><span className="note-signature">— seu próximo capítulo</span></div>
          </div>
          <div className="hero-visual">
            <div className="hero-photo"><img src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1400&q=90" alt="Casas coloridas na costa italiana banhadas pela luz do fim da tarde" /><div className="photo-overlay" /></div>
            <div className="photo-caption"><span>01 / 08</span><span>Cinque Terre, Itália <span className="caption-dot">·</span> 44°08' N, 9°43' E</span></div>
            <div className="photo-stamp"><span>feito para</span><Heart size={15} /><span>ir mais longe</span></div>
            <div className="floating-note"><div className="floating-icon"><Leaf size={16} /></div><div><strong>O mundo está aberto.</strong><span>Sua rota também.</span></div><ArrowUpRight size={15} /></div>
            <span className="visual-index">FIG. 01 — LUGARES QUE FICAM</span>
          </div>
          <a className="hero-scroll" href="#destinos" aria-label="Descer até os destinos"><span>UM BOM LUGAR PARA COMEÇAR</span><ArrowDown size={15} /></a>
        </section>

        <section className="explore-section" id="destinos">
          <div className="section-heading">
            <div><span className="section-kicker">A PRÓXIMA PÁGINA É SUA</span><h2>Alguns lugares<br />já estão <em>chamando.</em></h2></div>
            <p className="section-note">Sem lista de imperdíveis.<br />Só bons lugares para começar.</p>
          </div>
          <div className="destination-toolbar">
            <FilterBar filters={filters} activeFilter={activeFilter} onFilterChange={setActiveFilter} onlyFavorites={onlyFavorites} onToggleFavorites={() => setOnlyFavorites((value) => !value)} resultsCount={filteredDestinations.length} />
            <label className="search-box"><Search size={15} /><input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Uma cidade, um país…" aria-label="Buscar destino" />{searchQuery && <button type="button" aria-label="Limpar busca" onClick={() => setSearchQuery('')}>×</button>}</label>
          </div>
          {filteredDestinations.length > 0 ? (
            <div className="destination-grid">
              {filteredDestinations.map((destination) => (
                <DestinationCard key={destination.id} destination={destination} isFavorite={favorites.includes(destination.id)} onToggleFavorite={toggleFavorite} onAddToTrip={addToTrip} isInTrip={Object.values(tripDays).some((places) => Array.isArray(places) && places.includes(destination.id))} />
              ))}
            </div>
          ) : (
            <div className="no-destinations"><span className="no-destinations-icon"><Compass size={21} /></span><h3>Nenhum lugar por aqui — ainda.</h3><p>{onlyFavorites ? 'Guarde no coração os lugares que chamarem sua atenção.' : 'Experimente um estilo diferente ou mude sua busca.'}</p><button type="button" onClick={() => { setActiveFilter('Todos'); setOnlyFavorites(false); setSearchQuery(''); }}>Ver todos os destinos <ArrowRight size={14} /></button></div>
          )}
          <div className="more-destinations"><span>O MUNDO NÃO CABE NUMA LISTA</span><span><span className="more-dot" /> mais histórias vêm aí</span></div>
        </section>

        <section className="planner-section" aria-label="Planeje sua viagem"><div className="planner-intro"><span className="section-kicker">SEU TEMPO, SUAS ESCOLHAS</span><h2>Um dia de cada vez.<br /><em>Sem pressa.</em></h2><p>Um roteiro não precisa nascer perfeito. Coloque um lugar no papel e deixe o resto se encontrar pelo caminho.</p><div className="planner-illustration"><span>✳</span><span>✳</span><span>✳</span><svg viewBox="0 0 220 72" fill="none" aria-hidden="true"><path d="M5 57C36 9 54 82 93 33s56-15 69 4 28 36 53-18" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 5"/><circle cx="6" cy="57" r="4" fill="currentColor"/><circle cx="215" cy="18" r="4" fill="currentColor"/></svg></div></div><Itinerary tripDays={tripDays} selectedDay={selectedDay} onSelectDay={setSelectedDay} days={days} totalDays={totalDays} onRemove={removeFromTrip} onMove={moveInTrip} onChangeDays={setDays} /></section>

        <section className="closing-note"><span className="closing-kicker">PARA LEVAR NA BAGAGEM</span><p>“Não colecione só destinos.<br /><em>Colecione o jeito que eles fazem você se sentir.</em>”</p><span className="closing-byline">BOA VIAGEM, DE ONDE ESTIVER.</span><div className="closing-stamp"><Compass size={23} /></div></section>
        <ConceptsPanel />
      </main>

      <footer className="site-footer"><a className="brand footer-brand" href="#inicio"><span className="brand-mark"><Compass size={17} /></span><span>rota<span className="brand-light">aberta</span><i>.</i></span></a><span>FEITO COM CURIOSIDADE, CAFÉ E UM MAPA ABERTO.</span><a href="#inicio">voltar ao começo ↑</a></footer>
      <div className="floating-trip"><a href="#roteiro"><span className="floating-trip-icon"><Plane size={16} /></span><span><strong>Seu roteiro</strong><small>{destinationCount ? `${destinationCount} ${destinationCount === 1 ? 'lugar escolhido' : 'lugares escolhidos'}` : 'ainda está em branco'}</small></span><ArrowUpRight size={16} /></a></div>
    </>
  );
}
