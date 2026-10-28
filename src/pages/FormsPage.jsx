import { useState } from 'react';
import { CheckCircle, AlertCircle, Send, User, Mail, MapPin, Calendar, MessageSquare } from 'lucide-react';
import ConceptHeader from '../components/ConceptHeader.jsx';

function validate(fields) {
  const errors = {};
  if (!fields.name.trim()) errors.name = 'Nome é obrigatório';
  else if (fields.name.trim().length < 2) errors.name = 'Nome muito curto';
  if (!fields.email.trim()) errors.email = 'E-mail é obrigatório';
  else if (!/\S+@\S+\.\S+/.test(fields.email)) errors.email = 'E-mail inválido';
  if (!fields.destination.trim()) errors.destination = 'Destino é obrigatório';
  if (!fields.date) errors.date = 'Data é obrigatória';
  if (!fields.travelers || fields.travelers < 1) errors.travelers = 'Mínimo 1 viajante';
  if (!fields.message.trim()) errors.message = 'Mensagem é obrigatória';
  else if (fields.message.trim().length < 20) errors.message = 'Mensagem muito curta (mín. 20 caracteres)';
  return errors;
}

const INITIAL = { name: '', email: '', destination: '', date: '', travelers: 1, budget: 'medio', message: '' };

export default function FormsPage() {
  const [fields, setFields] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const change = (e) => {
    const { name, value } = e.target;
    setFields((f) => ({ ...f, [name]: value }));
    if (touched[name]) {
      const errs = validate({ ...fields, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: errs[name] }));
    }
  };

  const blur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    const errs = validate(fields);
    setErrors((prev) => ({ ...prev, [name]: errs[name] }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const allTouched = Object.fromEntries(Object.keys(INITIAL).map((k) => [k, true]));
    setTouched(allTouched);
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setSubmitted(true);
  };

  const reset = () => {
    setFields(INITIAL);
    setErrors({});
    setTouched({});
    setSubmitted(false);
  };

  const field = (name) => ({
    name,
    value: fields[name],
    onChange: change,
    onBlur: blur,
    className: `form-input${touched[name] && errors[name] ? ' input-error' : touched[name] && !errors[name] ? ' input-ok' : ''}`,
  });

  if (submitted) {
    return (
      <div className="concept-page">
        <ConceptHeader num="08" color="#e06f3a" title="Formulários" subtitle="Como receber, validar e processar informações" desc="" />
        <div className="form-success">
          <div className="success-icon"><CheckCircle size={52} /></div>
          <h2>Formulário enviado com sucesso!</h2>
          <p>
            Olá <strong>{fields.name}</strong>! Sua solicitação de viagem para{' '}
            <strong>{fields.destination}</strong> foi recebida.
          </p>
          <div className="success-summary">
            <div className="sum-item"><Mail size={14} />{fields.email}</div>
            <div className="sum-item"><Calendar size={14} />{fields.date}</div>
            <div className="sum-item"><User size={14} />{fields.travelers} viajante{fields.travelers > 1 ? 's' : ''}</div>
          </div>
          <button className="form-reset-btn" onClick={reset}>Enviar outro formulário</button>
        </div>
      </div>
    );
  }

  return (
    <div className="concept-page">
      <ConceptHeader
        num="08"
        color="#e06f3a"
        title="Formulários"
        subtitle="Como receber, validar e processar informações"
        desc="Formulários controlados em React: cada campo tem seu valor sincronizado com o estado. Validação em tempo real, feedback visual e submit assíncrono."
      />

      <div className="forms-layout">
        <form className="travel-form" onSubmit={submit} noValidate>
          <div className="form-section-title">Dados pessoais</div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                <User size={14} /> Nome completo
              </label>
              <input id="name" {...field('name')} placeholder="Seu nome" type="text" />
              {touched.name && errors.name && (
                <span className="form-error"><AlertCircle size={12} /> {errors.name}</span>
              )}
              {touched.name && !errors.name && (
                <span className="form-ok"><CheckCircle size={12} /> Perfeito!</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <Mail size={14} /> E-mail
              </label>
              <input id="email" {...field('email')} placeholder="seu@email.com" type="email" />
              {touched.email && errors.email && (
                <span className="form-error"><AlertCircle size={12} /> {errors.email}</span>
              )}
              {touched.email && !errors.email && (
                <span className="form-ok"><CheckCircle size={12} /> Válido!</span>
              )}
            </div>
          </div>

          <div className="form-section-title" style={{ marginTop: 24 }}>Detalhes da viagem</div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="destination" className="form-label">
                <MapPin size={14} /> Destino
              </label>
              <input id="destination" {...field('destination')} placeholder="Ex: Paris, França" type="text" />
              {touched.destination && errors.destination && (
                <span className="form-error"><AlertCircle size={12} /> {errors.destination}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="date" className="form-label">
                <Calendar size={14} /> Data da viagem
              </label>
              <input id="date" {...field('date')} type="date" />
              {touched.date && errors.date && (
                <span className="form-error"><AlertCircle size={12} /> {errors.date}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="travelers" className="form-label">
                <User size={14} /> Nº de viajantes
              </label>
              <input id="travelers" {...field('travelers')} type="number" min="1" max="20" />
              {touched.travelers && errors.travelers && (
                <span className="form-error"><AlertCircle size={12} /> {errors.travelers}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="budget" className="form-label">💰 Orçamento</label>
              <select id="budget" name="budget" value={fields.budget} onChange={change} className="form-input">
                <option value="economico">Econômico</option>
                <option value="medio">Médio</option>
                <option value="luxo">Luxo</option>
                <option value="ultra">Ultra luxo</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="message" className="form-label">
              <MessageSquare size={14} /> Mensagem / Observações
            </label>
            <textarea
              id="message"
              {...field('message')}
              placeholder="Conte-nos mais sobre sua viagem dos sonhos..."
              rows={4}
              className={`form-input form-textarea${touched.message && errors.message ? ' input-error' : touched.message && !errors.message ? ' input-ok' : ''}`}
            />
            <div className="char-count" style={{ color: fields.message.length < 20 ? '#e06f3a' : '#3ac07a' }}>
              {fields.message.length} / mín. 20 caracteres
            </div>
            {touched.message && errors.message && (
              <span className="form-error"><AlertCircle size={12} /> {errors.message}</span>
            )}
          </div>

          <button type="submit" className="form-submit" disabled={loading}>
            {loading ? (
              <><span className="spinner" /> Enviando...</>
            ) : (
              <><Send size={15} /> Solicitar viagem</>
            )}
          </button>
        </form>

        <div className="forms-sidebar">
          <div className="forms-info-card">
            <h3>Como funciona?</h3>
            <div className="info-step">
              <span className="info-num">1</span>
              <div>
                <strong>Estado controlado</strong>
                <p>Cada campo é um estado React, sincronizado via onChange.</p>
              </div>
            </div>
            <div className="info-step">
              <span className="info-num">2</span>
              <div>
                <strong>Validação reativa</strong>
                <p>Erros aparecem ao sair do campo (onBlur) ou no submit.</p>
              </div>
            </div>
            <div className="info-step">
              <span className="info-num">3</span>
              <div>
                <strong>Submit assíncrono</strong>
                <p>Estado de loading enquanto processa. Feedback imediato.</p>
              </div>
            </div>
          </div>

          <div className="forms-live-preview">
            <div className="preview-label">Prévia em tempo real</div>
            <div className="preview-content">
              <div className="preview-row">
                <span>Nome:</span>
                <strong>{fields.name || '—'}</strong>
              </div>
              <div className="preview-row">
                <span>Destino:</span>
                <strong>{fields.destination || '—'}</strong>
              </div>
              <div className="preview-row">
                <span>Data:</span>
                <strong>{fields.date || '—'}</strong>
              </div>
              <div className="preview-row">
                <span>Viajantes:</span>
                <strong>{fields.travelers}</strong>
              </div>
              <div className="preview-row">
                <span>Orçamento:</span>
                <strong style={{ textTransform: 'capitalize' }}>{fields.budget}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
