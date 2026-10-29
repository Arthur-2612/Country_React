const API_BASE = 'https://api.restcountries.com/countries/v5';

export default async function countriesProxy(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ errors: [{ message: 'Apenas requisições GET são aceitas.' }] });
  }

  const requestUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const route = requestUrl.pathname.replace(/^\/api\/countries(?=\/|$)/, '');
  const upstreamUrl = new URL(`${API_BASE}${route}`);
  upstreamUrl.search = requestUrl.search;

  try {
    const response = await fetch(upstreamUrl, {
      headers: {
        Authorization: `Bearer ${process.env.REST_COUNTRIES_API_KEY || 'rc_live_demo'}`,
        Accept: 'application/json',
      },
      signal: AbortSignal.timeout(20000),
    });

    const body = await response.text();
    res.setHeader('Content-Type', response.headers.get('content-type') || 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    return res.status(response.status).send(body);
  } catch (error) {
    console.error('Rest Countries proxy failed:', error.message);
    return res.status(502).json({ errors: [{ message: 'Não foi possível acessar a API de países.' }] });
  }
}
