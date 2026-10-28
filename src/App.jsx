import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import HomePage from './pages/HomePage.jsx';
import StatePage from './pages/StatePage.jsx';
import FormsPage from './pages/FormsPage.jsx';
import UseEffectPage from './pages/UseEffectPage.jsx';
import ApiPage from './pages/ApiPage.jsx';
import RouterPage from './pages/RouterPage.jsx';
import CountryPage from './pages/CountryPage.jsx';
import NotFound from './pages/NotFound.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/state" element={<StatePage />} />
          <Route path="/formularios" element={<FormsPage />} />
          <Route path="/useeffect" element={<UseEffectPage />} />
          <Route path="/api" element={<ApiPage />} />
          <Route path="/router" element={<RouterPage />} />
          <Route path="/pais/:nome" element={<CountryPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="new-footer">
        <span>React Hooks Demo · Aula 08</span>
        <span>useState · Formulários · useEffect · APIs · React Router</span>
      </footer>
    </>
  );
}
