# Rota Aberta

Guia interativo de viagens feito em React. Explore destinos, filtre por estilo, salve favoritos e distribua lugares em um roteiro diário — no seu ritmo.

> **Projeto da aula 08:** a aplicação demonstra componentes, props, listas, estado, eventos, renderização condicional e efeitos. A seção **“Por dentro do React”** também explica conceitos internos, como o Virtual DOM, que não são implementados manualmente na interface.

## Sumário

- [Visão geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Começar](#começar)
- [Como usar](#como-usar)
- [Conceitos de React demonstrados](#conceitos-de-react-demonstrados)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Dados dos destinos](#dados-dos-destinos)
- [Persistência e limitações](#persistência-e-limitações)
- [Build e publicação](#build-e-publicação)
- [Acessibilidade e responsividade](#acessibilidade-e-responsividade)

## Visão geral

O **Rota Aberta** tem uma direção editorial inspirada em cadernos de viagem: tons naturais, tipografia serifada, fotografias de destinos e textos que convidam a descobrir. A interface é em português e se adapta a celulares, tablets e computadores.

O catálogo inicial reúne oito destinos: Lisboa, Santorini, Kyoto, Patagônia, Marrakech, Bali, Havana e Queenstown. Os destinos são descritos por dados e apresentados por um cartão reutilizável.

## Funcionalidades

- Catálogo de destinos em cartões com país, região, estilos, época recomendada, temperatura e duração sugerida.
- Filtros por estilo de viagem: praia, cultura, natureza, aventura, gastronomia e romance.
- Busca por nome, país, região ou estilo.
- Favoritos, com filtro para ver apenas os lugares salvos.
- Planejamento por dia, com opção de adicionar dias até o limite de 14.
- Inclusão, remoção e reordenação de destinos no itinerário.
- Estados vazios para busca sem resultados e dias ainda não planejados.
- Armazenamento local de favoritos e roteiro, preservado ao atualizar a página no mesmo navegador.
- Edição didática expansível sobre os conceitos utilizados na aplicação e sobre o Virtual DOM.

## Tecnologias

- [React](https://react.dev/) e React DOM.
- [Vite](https://vite.dev/) para desenvolvimento e build.
- [Lucide React](https://lucide.dev/) para ícones.
- CSS responsivo, sem framework de estilos.
- `localStorage` do navegador para persistência local.

## Começar

### Pré-requisitos

- Node.js compatível com a versão instalada do Vite.
- npm, incluído com o Node.js.

### Instalação e execução

Na pasta do projeto, instale as dependências e inicie o servidor de desenvolvimento:

```bash
npm install
npm run dev
```

Abra no navegador o endereço local informado pelo Vite — normalmente `http://localhost:5173`.

### Outros comandos

```bash
# Gerar a versão otimizada de produção em dist/
npm run build

# Servir localmente o build de produção
npm run preview
```

## Como usar

1. Selecione um estilo para filtrar os destinos ou pesquise por cidade, país, região ou estilo.
2. Use o ícone de coração para guardar um destino. Ative **Favoritos** para filtrar a lista pelos lugares salvos.
3. Selecione **Adicionar** no cartão de um destino. Se o dia selecionado já tiver lugares, o destino é acrescentado a ele; se estiver vazio, a aplicação procura o próximo dia vazio.
4. Na seção **Seu roteiro**, selecione um dia para consultar seu plano. Adicione dias, altere a ordem dos lugares com as setas ou remova uma parada.
5. Abra **Por dentro do React** para explorar exemplos de código e explicações dos conceitos.

Os controles informam seu estado acessível: filtros e botões de estado usam atributos ARIA, e as ações principais podem ser utilizadas pelo teclado.

## Conceitos de React demonstrados

| Conceito | Onde aparece | O que demonstra |
| --- | --- | --- |
| Componentes reutilizáveis | `src/components/` | Divisão da interface em partes com responsabilidades claras. |
| Props | `DestinationCard` e `Itinerary` | Passagem de dados e funções do componente pai para os filhos. |
| Estado | `src/App.jsx` | `useState` para filtros, busca, favoritos, dias e roteiro. |
| Eventos | Cartões, filtros e itinerário | Atualização da aplicação por meio de cliques e entrada de texto. |
| Listas e `key` | Catálogo, filtros, dias e paradas | Renderização de coleções com chaves estáveis, como o identificador do destino. |
| Renderização condicional | Catálogo e itinerário | Exibição de resultados, estados vazios ou dias planejados de acordo com o estado. |
| `useMemo` | Filtro do catálogo | Reutilização do resultado derivado até que suas dependências mudem. |
| `useEffect` | Persistência | Sincronização dos favoritos e do roteiro com o armazenamento do navegador. |
| Imutabilidade de estado | Favoritos e itinerário | Criação de novos arrays e objetos nas atualizações de estado. |
| Virtual DOM e reconciliação | Edição didática | Explicação do processo interno que compara descrições da UI e atualiza o DOM real. |

### Sobre o Virtual DOM

O Virtual DOM **não é uma estrutura que a aplicação precise construir ou atualizar manualmente**. O código descreve a interface em JSX; o React mantém sua representação interna, compara a nova árvore de elementos com a anterior e aplica ao DOM real as alterações necessárias. A edição explica essa ideia, enquanto o React realiza o trabalho durante a execução.

## Estrutura do projeto

```text
Soccer_React/
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── styles.css
    ├── data/
    │   └── destinations.js
    └── components/
        ├── ConceptsPanel.jsx
        ├── DestinationCard.jsx
        ├── FilterBar.jsx
        └── Itinerary.jsx
```

- **`src/main.jsx`**: monta o React no elemento raiz e carrega os estilos.
- **`src/App.jsx`**: organiza a página, gerencia o estado compartilhado, filtra o catálogo e persiste as preferências.
- **`src/data/destinations.js`**: contém os dados do catálogo e as opções de filtro.
- **`src/components/DestinationCard.jsx`**: cartão reutilizável para cada destino.
- **`src/components/FilterBar.jsx`**: filtros de estilo e alternância de favoritos.
- **`src/components/Itinerary.jsx`**: seleção de dias e organização das paradas.
- **`src/components/ConceptsPanel.jsx`**: edição didática com conceitos e exemplos de React.
- **`src/styles.css`**: identidade visual, layout e adaptações para diferentes telas.

## Dados dos destinos

Os dados ficam em `src/data/destinations.js`. Para adicionar outro destino, inclua um objeto em `destinations` com o mesmo formato geral:

```js
{
  id: 'cidade-exemplo',
  name: 'Cidade Exemplo',
  country: 'País',
  region: 'Europa',
  style: ['Cultura', 'Gastronomia'],
  days: 3,
  bestSeason: 'Abr — Jun',
  temperature: '22°',
  image: 'photo-ID-do-unsplash',
  imageAlt: 'Descrição da fotografia',
  badge: 'Uma chamada curta',
  note: 'Uma frase breve sobre o destino.',
}
```

O `id` precisa ser único e estável: ele identifica o destino nos favoritos e no itinerário. O valor `image` é usado para formar uma URL de imagem do Unsplash.

## Persistência e limitações

- Favoritos, roteiro e quantidade de dias são gravados no `localStorage` do navegador sob a chave `rota-aberta-v1`.
- Os dados são locais ao navegador e ao dispositivo. Não há conta, sincronização entre dispositivos, API, banco de dados ou colaboração entre pessoas.
- Para começar de novo, limpe os dados do site no navegador ou remova a entrada `rota-aberta-v1` do `localStorage` nas ferramentas de desenvolvedor.
- Fotografias e fontes são carregadas de serviços externos (Unsplash e Google Fonts), então sua disponibilidade depende de conexão com a internet.
- A aplicação é uma demonstração de planejamento; não consulta disponibilidade, preços, clima ou informações de viagem em tempo real.

## Build e publicação

O comando `npm run build` gera os arquivos estáticos em `dist/`. Publique o conteúdo dessa pasta em um serviço de hospedagem de sites estáticos, como GitHub Pages, Netlify ou Vercel. Como a aplicação usa rotas por âncora e não depende de backend, uma configuração simples de hospedagem estática é suficiente.

## Acessibilidade e responsividade

- Interface adaptada para celular, tablet e desktop.
- Imagens com textos alternativos; controles interativos com nomes acessíveis e estados ARIA quando aplicável.
- Indicadores de foco visíveis para navegação por teclado e respeito à hierarquia semântica de títulos e seções.
- Ações apresentadas por botões, formulários com rótulos e estados vazios com instruções para continuar.

---

**Rota Aberta** — feito com curiosidade, café e um mapa aberto.
