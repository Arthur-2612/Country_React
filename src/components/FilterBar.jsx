import { Heart, SlidersHorizontal } from 'lucide-react';

export default function FilterBar({ filters, activeFilter, onFilterChange, onlyFavorites, onToggleFavorites, resultsCount }) {
  return (
    <div className="filter-bar">
      <div className="filter-scroll" aria-label="Filtrar destinos por estilo">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            className={`filter-chip${activeFilter === filter ? ' is-active' : ''}`}
            aria-pressed={activeFilter === filter}
            onClick={() => onFilterChange(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="filter-actions">
        <span className="results-count"><SlidersHorizontal size={14} /> {resultsCount} lugares</span>
        <button
          className={`favorites-filter${onlyFavorites ? ' is-active' : ''}`}
          type="button"
          aria-pressed={onlyFavorites}
          onClick={onToggleFavorites}
        >
          <Heart size={14} fill={onlyFavorites ? 'currentColor' : 'none'} /> Favoritos
        </button>
      </div>
    </div>
  );
}
