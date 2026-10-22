import { ArrowUpRight, Clock3, Heart, MapPin, Sun } from 'lucide-react';

export default function DestinationCard({ destination, isFavorite, onToggleFavorite, onAddToTrip, isInTrip }) {
  const { name, country, days, bestSeason, temperature, image, imageAlt, badge, note, style, region } = destination;

  return (
    <article className="destination-card">
      <div className="card-image-wrap">
        <img
          className="card-image"
          src={`https://images.unsplash.com/${image}?auto=format&fit=crop&w=900&q=85`}
          alt={imageAlt}
          loading="lazy"
        />
        <span className="destination-badge">{badge}</span>
        <button
          className={`favorite-button${isFavorite ? ' is-favorite' : ''}`}
          type="button"
          aria-label={isFavorite ? `Remover ${name} dos favoritos` : `Adicionar ${name} aos favoritos`}
          aria-pressed={isFavorite}
          onClick={() => onToggleFavorite(destination.id)}
        >
          <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
        <span className="card-region"><MapPin size={12} /> {region}</span>
      </div>

      <div className="card-content">
        <div className="card-heading">
          <div>
            <span className="card-country">{country}</span>
            <h3>{name}</h3>
          </div>
          <button
            className={`add-destination${isInTrip ? ' is-added' : ''}`}
            type="button"
            aria-label={isInTrip ? `${name} está no roteiro` : `Adicionar ${name} ao roteiro`}
            aria-pressed={isInTrip}
            onClick={() => onAddToTrip(destination.id)}
          >
            {isInTrip ? 'Adicionado' : <>Adicionar <ArrowUpRight size={14} /></>}
          </button>
        </div>
        <p className="card-note">{note}</p>
        <div className="card-footer">
          <span><Clock3 size={14} /> {days} dias</span>
          <span><Sun size={14} /> {bestSeason}</span>
          <span>{temperature}</span>
        </div>
        <div className="card-tags">
          {style.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </div>
    </article>
  );
}
