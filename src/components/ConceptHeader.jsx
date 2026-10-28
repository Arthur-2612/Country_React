export default function ConceptHeader({ num, color, title, subtitle, desc }) {
  return (
    <div className="concept-header" style={{ '--ch-color': color }}>
      <div className="ch-top">
        <span className="ch-num" style={{ background: color + '22', color }}>{num}</span>
        <span className="ch-label">CONCEITO REACT</span>
      </div>
      <h1 className="ch-title">{title}</h1>
      <p className="ch-subtitle">{subtitle}</p>
      {desc && <p className="ch-desc">{desc}</p>}
      <div className="ch-divider" style={{ background: color }} />
    </div>
  );
}
