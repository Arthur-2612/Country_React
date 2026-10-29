import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, Globe, Loader } from 'lucide-react';
import { findFallbackCountry } from '../data/countries.js';

export default function CountryPage() {
  const { nome } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    setCountry(null);
    fetch(`/api/restcountries/v3.1/name/${encodeURIComponent(nome)}?fullText=false`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('País não encontrado');
        return response.json();
      })
      .then((data) => setCountry(data[0]))
      .catch((err) => {
        if (err.name === 'AbortError') return;
        const fallback = findFallbackCountry(nome);
        if (fallback) setCountry(fallback);
        else setError('Não foi possível consultar a API e este país não está no catálogo offline.');
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [nome]);

  return (
    <div className="concept-page">
      <div className="country-page-header">
        <Link to="/api" className="back-link"><ArrowLeft size={16} /> Voltar</Link>
        <div className="country-page-params">
          <code>useParams() → {'{'} nome: "<strong>{nome}</strong>" {'}'}</code>
        </div>
      </div>

      {loading && (
        <div className="api-loading-state">
          <div className="api-spinner"><Loader size={32} /></div>
          <p>Buscando {nome}...</p>
        </div>
      )}

      {error && (
        <div className="api-error-state">
          <Globe size={32} />
          <h3>País não encontrado</h3>
          <p>"{nome}" não foi encontrado na API.</p>
          <Link to="/api">← Voltar à lista</Link>
        </div>
      )}

      {country && (
        <div className="country-detail-page">
          <div className="cdp-flag-col">
            {country.flags?.svg ? (
              <img src={country.flags.svg} alt={country.name?.common} className="cdp-flag" />
            ) : (
              <div className="cdp-flag-emoji" role="img" aria-label={`Bandeira de ${country.name?.common}`}>
                {country.flagEmoji || '🌍'}
              </div>
            )}
            <h1>{country.name?.common}</h1>
            <p className="cdp-official">{country.name?.official}</p>
          </div>
          <div className="cdp-info-col">
            <div className="cdp-grid">
              {[
                ['Região', country.region],
                ['Sub-região', country.subregion],
                ['Capital', country.capital?.[0]],
                ['População', country.population?.toLocaleString('pt-BR')],
                ['Área', `${country.area?.toLocaleString('pt-BR')} km²`],
                ['Moeda', Object.values(country.currencies || {})[0]?.name],
                ['Idioma', Object.values(country.languages || {})[0]],
                ['Código', country.cca3],
              ].map(([label, value]) => (
                <div key={label} className="cdp-field">
                  <span>{label}</span>
                  <strong>{value || '—'}</strong>
                </div>
              ))}
            </div>
            <div className="cdp-note">
              <p>Esta página usa <code>useParams()</code> para capturar o nome da URL e buscar os dados do país diretamente na API.</p>
              <p>Tente mudar a URL: <code>/pais/Japan</code>, <code>/pais/France</code>, etc.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
