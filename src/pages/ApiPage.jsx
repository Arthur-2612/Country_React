import { useState, useEffect, useCallback } from 'react';
import { Search, Globe, MapPin, Users, Languages, Coins, X, Loader, ChevronDown } from 'lucide-react';
import ConceptHeader from '../components/ConceptHeader.jsx';
import { fallbackCountries } from '../data/countries.js';

const REGIONS = ['Todos', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

function CountryCard({ country, onClick }) {
  const name = country.name?.common || 'Desconhecido';
  const flag = country.flags?.svg || country.flags?.png || '';
  const capital = country.capital?.[0] || '—';
  const population = country.population?.toLocaleString('pt-BR') || '—';
  const region = country.region || '—';
  const currency = Object.values(country.currencies || {})[0];
  const currencyName = currency ? `${currency.name} (${currency.symbol || ''})` : '—';
  const lang = Object.values(country.languages || {}).slice(0, 2).join(', ') || '—';

  return (
    <button className="country-card" onClick={() => onClick(country)}>
      <div className="country-flag-wrap">
        {flag ? (
          <img src={flag} alt={`Bandeira de ${name}`} className="country-flag" loading="lazy" />
        ) : country.flagEmoji ? (
          <div className="country-flag-emoji" aria-label={`Bandeira de ${name}`}>{country.flagEmoji}</div>
        ) : (
          <div className="country-flag-placeholder"><Globe size={24} /></div>
        )}
        <span className="country-region-badge">{region}</span>
      </div>
      <div className="country-info">
        <h3 className="country-name">{name}</h3>
        <div className="country-detail"><MapPin size={11} /> {capital}</div>
        <div className="country-detail"><Users size={11} /> {population}</div>
        <div className="country-detail"><Languages size={11} /> {lang}</div>
        <div className="country-detail"><Coins size={11} /> {currencyName}</div>
      </div>
    </button>
  );
}

function CountryModal({ country, onClose }) {
  if (!country) return null;
  const name = country.name?.common || 'Desconhecido';
  const official = country.name?.official || name;
  const flag = country.flags?.svg || '';
  const capital = country.capital?.join(', ') || '—';
  const population = country.population?.toLocaleString('pt-BR') || '—';
  const area = country.area?.toLocaleString('pt-BR') || '—';
  const currencies = Object.values(country.currencies || {}).map((c) => `${c.name} (${c.symbol || ''})`).join(', ') || '—';
  const languages = Object.values(country.languages || {}).join(', ') || '—';
  const borders = country.borders || [];
  const callingCodes = country.idd?.root ? [`${country.idd.root}${(country.idd.suffixes || [''])[0]}`] : [];
  const timezones = (country.timezones || []).slice(0, 3).join(', ');
  const tld = (country.tld || []).join(', ') || '—';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={18} /></button>
        <div className="modal-flag-header" style={{ backgroundImage: `url(${flag})` }}>
          <div className="modal-flag-overlay" />
          <div className="modal-flag-info">
            <span className="modal-region">{country.region} / {country.subregion}</span>
            <h2>{name}</h2>
            <p className="modal-official">{official}</p>
          </div>
        </div>
        <div className="modal-body">
          <div className="modal-grid">
            <div className="modal-field"><span>Capital</span><strong>{capital}</strong></div>
            <div className="modal-field"><span>População</span><strong>{population}</strong></div>
            <div className="modal-field"><span>Área</span><strong>{area} km²</strong></div>
            <div className="modal-field"><span>Moeda</span><strong>{currencies}</strong></div>
            <div className="modal-field"><span>Idiomas</span><strong>{languages}</strong></div>
            <div className="modal-field"><span>Código tel.</span><strong>{callingCodes[0] || '—'}</strong></div>
            <div className="modal-field"><span>Fuso horário</span><strong>{timezones}</strong></div>
            <div className="modal-field"><span>Domínio</span><strong>{tld}</strong></div>
          </div>
          {borders.length > 0 && (
            <div className="modal-borders">
              <span>Fronteiras:</span>
              {borders.map((b) => <span key={b} className="border-chip">{b}</span>)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ApiPage() {
  const [allCountries, setAllCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('Todos');
  const [sortBy, setSortBy] = useState('name');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offline, setOffline] = useState(false);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const PER_PAGE = 24;

  // Keep the lesson usable if the public API is unavailable or blocked by the network.
  const loadCountries = useCallback(async (signal) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region,subregion,currencies,languages,borders,idd,timezones,tld,area,cca2,cca3', { signal });
      if (!response.ok) throw new Error(`Erro ${response.status}`);
      const data = await response.json();
      if (!Array.isArray(data)) throw new Error('A resposta da API não tem o formato esperado.');
      setAllCountries(data);
      setOffline(false);
    } catch (err) {
      if (err.name === 'AbortError') return;
      setAllCountries(fallbackCountries);
      setOffline(true);
      setError(err.message || 'Não foi possível acessar a API.');
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    loadCountries(controller.signal);
    return () => controller.abort();
  }, [loadCountries]);

  // Filter + sort
  useEffect(() => {
    let result = [...allCountries];
    if (region !== 'Todos') result = result.filter((c) => c.region === region);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((c) =>
        c.name?.common?.toLowerCase().includes(q) ||
        c.capital?.[0]?.toLowerCase().includes(q) ||
        c.region?.toLowerCase().includes(q)
      );
    }
    result.sort((a, b) => {
      if (sortBy === 'name') return (a.name?.common || '').localeCompare(b.name?.common || '');
      if (sortBy === 'population') return (b.population || 0) - (a.population || 0);
      if (sortBy === 'area') return (b.area || 0) - (a.area || 0);
      return 0;
    });
    setFiltered(result);
    setPage(1);
  }, [allCountries, search, region, sortBy]);

  const visible = filtered.slice(0, page * PER_PAGE);
  const hasMore = visible.length < filtered.length;

  return (
    <div className="concept-page">
      <ConceptHeader
        num="10"
        color="#3ac07a"
        title="Consumo de APIs"
        subtitle="Como buscar e apresentar dados de serviços externos"
        desc="useEffect + fetch: busca os 195 países da API RestCountries. Filtro por região, busca em tempo real, ordenação e paginação — tudo com dados reais."
      />

      {/* API Status Bar */}
      <div className="api-status-bar">
        <div className={`api-dot ${loading ? 'api-loading' : error ? 'api-error' : 'api-ok'}`} />
        <span>
          {loading ? 'Buscando dados da API...' : offline ? `Modo demonstração — ${allCountries.length} países disponíveis sem conexão` : `API RestCountries — ${allCountries.length} países carregados`}
        </span>
        {!loading && <button className="api-retry" onClick={() => loadCountries()}>{offline ? 'Tentar conexão novamente' : 'Atualizar dados'}</button>}
        <code className="api-url">https://restcountries.com/v3.1/all</code>
      </div>
      {offline && <p className="api-offline-note" role="status">A API não respondeu ({error}). Exibindo dados locais de demonstração; tente novamente quando a conexão estiver disponível.</p>}

      {/* Controls */}
      <div className="api-controls">
        <div className="api-search-wrap">
          <Search size={15} />
          <input
            className="api-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar país, capital ou região..."
          />
          {search && <button onClick={() => setSearch('')}><X size={14} /></button>}
        </div>
        <div className="api-filters">
          {REGIONS.map((r) => (
            <button
              key={r}
              className={`filter-chip${region === r ? ' is-active' : ''}`}
              onClick={() => setRegion(r)}
            >
              {r}
            </button>
          ))}
        </div>
        <select className="api-sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Ordenar: Nome A→Z</option>
          <option value="population">Ordenar: População</option>
          <option value="area">Ordenar: Área</option>
        </select>
      </div>

      {/* Results count */}
      {!loading && (
        <div className="api-results-bar">
          Mostrando <strong>{visible.length}</strong> de <strong>{filtered.length}</strong> países
          {search && <span> para "<em>{search}</em>"</span>}
        </div>
      )}

      {/* Content */}
      {loading && (
        <div className="api-loading-state">
          <div className="api-spinner"><Loader size={32} /></div>
          <p>Carregando 195 países da API...</p>
          <div className="loading-bar"><div className="loading-bar-fill" /></div>
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="api-empty">
          <Globe size={32} />
          <p>Nenhum país encontrado para "<strong>{search}</strong>"</p>
          <button onClick={() => { setSearch(''); setRegion('Todos'); }}>Limpar filtros</button>
        </div>
      )}

      {!loading && (
        <div className="country-grid">
          {visible.map((c) => (
            <CountryCard key={c.name?.common} country={c} onClick={setSelected} />
          ))}
        </div>
      )}

      {hasMore && (
        <div className="api-load-more">
          <button onClick={() => setPage((p) => p + 1)}>
            <ChevronDown size={16} /> Carregar mais ({filtered.length - visible.length} restantes)
          </button>
        </div>
      )}

      {selected && <CountryModal country={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
