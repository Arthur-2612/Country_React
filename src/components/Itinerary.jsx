import { ArrowDown, ArrowUp, CalendarDays, Check, Clock3, MapPin, Plus, Route, Sparkles, Trash2 } from 'lucide-react';

export default function Itinerary({ tripDays, selectedDay, onSelectDay, days, totalDays, onRemove, onMove, onChangeDays }) {
  return (
    <aside className="itinerary" id="roteiro">
      <div className="itinerary-eyebrow"><span><Route size={14} /> Seu plano, sem pressa</span><span className="live-dot" /></div>
      <div className="itinerary-heading">
        <div><span className="section-kicker">DO RASCUNHO AO EMBARQUE</span><h2>Sua próxima<br /><em>história.</em></h2></div>
        <div className="trip-counter"><strong>{totalDays}</strong><span>DIAS<br />DE VIAGEM</span></div>
      </div>

      <div className="day-tabs" role="tablist" aria-label="Dia do roteiro">
        {Array.from({ length: days }, (_, index) => {
          const day = index + 1;
          return (
            <button key={day} className={`day-tab${selectedDay === day ? ' is-active' : ''}`} type="button" role="tab" aria-selected={selectedDay === day} onClick={() => onSelectDay(day)}>
              <span>Dia</span><strong>{String(day).padStart(2, '0')}</strong>
            </button>
          );
        })}
        <button className="add-day" type="button" aria-label="Adicionar dia ao roteiro" onClick={() => { onChangeDays(Math.min(days + 1, 14)); onSelectDay(Math.min(days + 1, 14)); }} disabled={days >= 14}><Plus size={18} /></button>
      </div>

      {tripDays[selectedDay]?.length ? (
        <ol className="timeline-list">
          {tripDays[selectedDay].map((destinationId, index) => {
            const destination = window.__rotaDestinations?.find((item) => item.id === destinationId);
            if (!destination) return null;
            return (
              <li className="timeline-item" key={`${destinationId}-${index}`}>
                <span className="timeline-number">{String(index + 1).padStart(2, '0')}</span>
                <div className="timeline-detail"><span className="timeline-time">{index === 0 ? 'MANHÃ' : index === 1 ? 'TARDE' : 'FIM DE TARDE'}</span><strong>{destination.name}</strong><span><MapPin size={12} /> {destination.country}</span></div>
                <div className="timeline-controls">
                  <button type="button" aria-label={`Mover ${destination.name} para cima`} onClick={() => onMove(selectedDay, index, -1)} disabled={index === 0}><ArrowUp size={14} /></button>
                  <button type="button" aria-label={`Mover ${destination.name} para baixo`} onClick={() => onMove(selectedDay, index, 1)} disabled={index === tripDays[selectedDay].length - 1}><ArrowDown size={14} /></button>
                  <button type="button" aria-label={`Remover ${destination.name} do roteiro`} onClick={() => onRemove(selectedDay, destinationId)}><Trash2 size={14} /></button>
                </div>
              </li>
            );
          })}
          <li className="timeline-end"><span /><span>Mais um dia, mais uma história</span></li>
        </ol>
      ) : (
        <div className="empty-itinerary">
          <span className="empty-icon"><CalendarDays size={22} /></span>
          <strong>Todo roteiro começa com um lugar.</strong>
          <p>Explore os destinos e adicione aquele que despertou sua curiosidade ao Dia {String(selectedDay).padStart(2, '0')}.</p>
          <a href="#destinos">Encontrar meu primeiro lugar <span>↗</span></a>
        </div>
      )}

      <div className="itinerary-bottom">
        <span><Clock3 size={14} /> {days} {days === 1 ? 'dia planejado' : 'dias planejados'}</span>
        <span><Check size={14} /> Salvo automaticamente</span>
      </div>
      <div className="trip-inspiration"><Sparkles size={15} /><span>“Viajar é dar espaço ao inesperado.”</span></div>
    </aside>
  );
}
