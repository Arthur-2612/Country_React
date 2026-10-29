const country = (common, official, region, subregion, capital, population, area, currencyCode, currencyName, symbol, language, cca2, flagEmoji) => ({
  name: { common, official },
  region,
  subregion,
  capital: [capital],
  population,
  area,
  currencies: { [currencyCode]: { name: currencyName, symbol } },
  languages: { [language.slice(0, 3).toLowerCase()]: language },
  flags: {},
  flagEmoji,
  cca2,
  cca3: cca2 === 'BR' ? 'BRA' : cca2 === 'US' ? 'USA' : cca2 === 'GB' ? 'GBR' : cca2,
  timezones: [],
  tld: [],
  borders: [],
  idd: {},
  subregion,
});

export const COUNTRY_RESPONSE_FIELDS = [
  'names.common', 'names.official', 'codes.alpha_2', 'codes.alpha_3',
  'flag.emoji', 'flag.url_svg', 'flag.url_png', 'capitals', 'population',
  'region', 'subregion', 'area.kilometers', 'currencies', 'languages',
  'borders', 'calling_codes', 'timezones', 'tlds',
].join(',');

export function normalizeApiCountry(item) {
  const currencies = Array.isArray(item.currencies)
    ? Object.fromEntries(item.currencies.map((entry) => [entry.code || entry.name, entry]))
    : item.currencies || {};
  const languages = Array.isArray(item.languages)
    ? Object.fromEntries(item.languages.map((entry, index) => [entry.code || `language-${index}`, entry.name || entry.native_name || '']))
    : item.languages || {};
  const phoneCode = item.calling_codes?.[0] || '';
  const phoneMatch = phoneCode.match(/^(\+?\d+)(.*)$/);

  return {
    name: {
      common: item.names?.common || 'Desconhecido',
      official: item.names?.official || item.names?.common || 'Desconhecido',
    },
    flags: { svg: item.flag?.url_svg || '', png: item.flag?.url_png || '' },
    flagEmoji: item.flag?.emoji || '',
    capital: (item.capitals || []).map((entry) => typeof entry === 'string' ? entry : entry.name).filter(Boolean),
    population: item.population || 0,
    region: item.region || '',
    subregion: item.subregion || '',
    area: item.area?.kilometers || 0,
    currencies,
    languages,
    borders: item.borders || [],
    idd: phoneMatch ? { root: phoneMatch[1], suffixes: [phoneMatch[2]] } : {},
    timezones: item.timezones || [],
    tld: item.tlds || [],
    cca2: item.codes?.alpha_2 || '',
    cca3: item.codes?.alpha_3 || '',
  };
}

export function extractApiCountries(payload) {
  if (Array.isArray(payload)) return payload.map(normalizeApiCountry);
  if (Array.isArray(payload?.data?.objects)) return payload.data.objects.map(normalizeApiCountry);
  if (Array.isArray(payload?.data)) return payload.data.map(normalizeApiCountry);
  return [];
}

// Small built-in catalog keeps the API lesson usable when the browser has no network access.
export const fallbackCountries = [
  country('Argentina', 'República Argentina', 'Americas', 'South America', 'Buenos Aires', 45808747, 2780400, 'ARS', 'Peso argentino', '$', 'Español', 'AR', '🇦🇷'),
  country('Australia', 'Commonwealth of Australia', 'Oceania', 'Australia and New Zealand', 'Canberra', 25687041, 7692024, 'AUD', 'Dólar australiano', '$', 'Inglês', 'AU', '🇦🇺'),
  country('Brazil', 'República Federativa do Brasil', 'Americas', 'South America', 'Brasília', 212559409, 8515767, 'BRL', 'Real brasileiro', 'R$', 'Português', 'BR', '🇧🇷'),
  country('Canada', 'Canada', 'Americas', 'North America', 'Ottawa', 38005238, 9984670, 'CAD', 'Dólar canadense', '$', 'Inglês e francês', 'CA', '🇨🇦'),
  country('China', "People's Republic of China", 'Asia', 'Eastern Asia', 'Beijing', 1402112000, 9706961, 'CNY', 'Yuan chinês', '¥', 'Chinês', 'CN', '🇨🇳'),
  country('Egypt', 'Arab Republic of Egypt', 'Africa', 'Northern Africa', 'Cairo', 102334403, 1002450, 'EGP', 'Libra egípcia', '£', 'Árabe', 'EG', '🇪🇬'),
  country('France', 'French Republic', 'Europe', 'Western Europe', 'Paris', 67391582, 551695, 'EUR', 'Euro', '€', 'Francês', 'FR', '🇫🇷'),
  country('Germany', 'Federal Republic of Germany', 'Europe', 'Western Europe', 'Berlin', 83240525, 357114, 'EUR', 'Euro', '€', 'Alemão', 'DE', '🇩🇪'),
  country('India', 'Republic of India', 'Asia', 'Southern Asia', 'New Delhi', 1380004385, 3287590, 'INR', 'Rupia indiana', '₹', 'Hindi e inglês', 'IN', '🇮🇳'),
  country('Italy', 'Italian Republic', 'Europe', 'Southern Europe', 'Rome', 59554023, 301336, 'EUR', 'Euro', '€', 'Italiano', 'IT', '🇮🇹'),
  country('Japan', 'Japan', 'Asia', 'Eastern Asia', 'Tokyo', 125836021, 377930, 'JPY', 'Iene', '¥', 'Japonês', 'JP', '🇯🇵'),
  country('Mexico', 'United Mexican States', 'Americas', 'North America', 'Mexico City', 128932753, 1964375, 'MXN', 'Peso mexicano', '$', 'Espanhol', 'MX', '🇲🇽'),
  country('New Zealand', 'New Zealand', 'Oceania', 'Australia and New Zealand', 'Wellington', 5084300, 270467, 'NZD', 'Dólar neozelandês', '$', 'Inglês e maori', 'NZ', '🇳🇿'),
  country('Portugal', 'Portuguese Republic', 'Europe', 'Southern Europe', 'Lisbon', 10305564, 92090, 'EUR', 'Euro', '€', 'Português', 'PT', '🇵🇹'),
  country('South Africa', 'Republic of South Africa', 'Africa', 'Southern Africa', 'Pretoria', 59308690, 1221037, 'ZAR', 'Rand sul-africano', 'R', 'Inglês', 'ZA', '🇿🇦'),
  country('Spain', 'Kingdom of Spain', 'Europe', 'Southern Europe', 'Madrid', 47351567, 505992, 'EUR', 'Euro', '€', 'Espanhol', 'ES', '🇪🇸'),
  country('United Kingdom', 'United Kingdom of Great Britain and Northern Ireland', 'Europe', 'Northern Europe', 'London', 67215293, 242900, 'GBP', 'Libra esterlina', '£', 'Inglês', 'GB', '🇬🇧'),
  country('United States', 'United States of America', 'Americas', 'North America', 'Washington, D.C.', 329484123, 9372610, 'USD', 'Dólar americano', '$', 'Inglês', 'US', '🇺🇸'),
];

export function findFallbackCountry(name) {
  const normalizedName = decodeURIComponent(name || '').trim().toLowerCase();
  const aliases = {
    brasil: 'brazil', japão: 'japan', japao: 'japan', frança: 'france', franca: 'france',
    alemanha: 'germany', itália: 'italy', italia: 'italy', portugal: 'portugal',
    'estados unidos': 'united states', 'reino unido': 'united kingdom', 'áfrica do sul': 'south africa',
    'africa do sul': 'south africa', 'nova zelândia': 'new zealand', 'nova zelandia': 'new zealand',
  };
  const target = aliases[normalizedName] || normalizedName;
  return fallbackCountries.find((item) =>
    item.name.common.toLowerCase() === target ||
    item.name.official.toLowerCase() === target ||
    item.cca2.toLowerCase() === target ||
    item.cca3.toLowerCase() === target
  ) || null;
}
