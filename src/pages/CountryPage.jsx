import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, Globe, Loader } from 'lucide-react';

export default function CountryPage() {
  const { nome } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(nome)}?fullText=false`)
      .then((r) => {
        if (!r.ok) throw new Error('País não encontrado');
        return r.json();
      })
      .then((data) => {
        setCountry(data[0]);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
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
            <img src={country.flags?.svg} alt={country.name?.common} className="cdp-flag" />
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
