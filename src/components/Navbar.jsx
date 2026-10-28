import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Compass, Menu, X, Zap, BookOpen, Globe, Route, Home } from 'lucide-react';

const NAV_LINKS = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/state', label: 'useState', icon: Zap },
  { to: '/formularios', label: 'Formulários', icon: BookOpen },
  { to: '/useeffect', label: 'useEffect', icon: Compass },
  { to: '/api', label: 'APIs', icon: Globe },
  { to: '/router', label: 'Router', icon: Route },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const loc = useLocation();

  const current = NAV_LINKS.find((l) => l.to !== '/' ? loc.pathname.startsWith(l.to) : loc.pathname === '/');

  return (
    <header className="new-header">
      <div className="new-header-inner">
        <Link to="/" className="new-brand">
          <span className="new-brand-icon"><Compass size={18} /></span>
          <span>React<em>Hooks</em></span>
        </Link>

        <nav className="new-nav desktop-nav">
          {NAV_LINKS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => `new-nav-link${isActive ? ' new-nav-active' : ''}`}
            >
              <Icon size={13} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="new-header-right">
          {current && (
            <span className="header-current-route">
              <code>{loc.pathname}</code>
            </span>
          )}
          <button className="mobile-toggle" onClick={() => setMobileOpen((o) => !o)} aria-label="Menu">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="mobile-nav-drawer">
          {NAV_LINKS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => `mobile-nav-link${isActive ? ' mobile-nav-active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              <Icon size={16} /> {label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
