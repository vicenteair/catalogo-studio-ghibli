# Catálogo Studio Ghibli

Aplicação web front-end interativa desenvolvida para explorar o acervo cinematográfico do **Studio Ghibli**. O projeto consome dados em tempo real de APIs públicas RESTful e renderiza dinamicamente os cartões dos filmes com suporte a favoritação persistente e tradução automática das sinopses para o Português (PT-BR).

> Trabalho desenvolvido como requisito parcial de avaliação da disciplina **Web Programming for Front-end** — Graduação em Análise e Desenvolvimento de Sistemas (**Centro Universitário UniFECAF**).

---

## Funcionalidades

- **Consumo de Dados em Tempo Real:** Busca assíncrona das informações oficiais dos filmes (títulos, capas, banners, diretores, ano de lançamento e pontuação no Rotten Tomatoes).
- **Renderização Dinâmica via DOM:** Criação e injeção programática dos elementos HTML a partir da resposta JSON da API, sem conteúdo estático engessado.
- **Sistema e Filtro de Favoritos:** Possibilidade de favoritar filmes com persistência local no navegador por meio da API `localStorage`.
- **Tradução Dinâmica (PT-BR):** Integração com API de tradução para converter as sinopses originais em inglês para o Português do Brasil sob demanda.
- **Design Responsivo:** Layout adaptável para diferentes tamanhos de tela (Desktop e Mobile) com tipografia inspirada na estética cinematográfica do estúdio.

---

## Tecnologias e Recursos Utilizados

- **Linguagens:** HTML5, CSS3 Puro, JavaScript ES6+ (`fetch`, `async/await`, manipulação de DOM, `localStorage`).
- **APIs:**
  - [Studio Ghibli API](https://ghibliapi.vercel.app/films) — Fornecimento dos metadados e imagens dos filmes.
  - [MyMemory Translation API](https://api.mymemory.translated.net/) — Tradução dinâmica das sinopses para PT-BR.
- **Tipografia:** [Google Fonts](https://fonts.google.com/) (`Cinzel` para títulos e `Outfit` para textos e cards).

---

## Estrutura do Projeto

📁 catalogo-studio-ghibli/
├── 📄 index.html       # Estrutura semântica da aplicação
├── 📁 css/
│   └── 📄 style.css    # Estilização, variáveis de tema e responsividade
├── 📁 js/
│   └── 📄 script.js    # Consumo das APIs, manipulação do DOM, favoritos e tradução
└── 📁 assets/          # Recursos visuais e imagens de apoio

## Por Vicente de Paula Santos - Graduando em Análise e Desenvolvimento de Sistemas — Centro Universitário UniFECAF (São Paulo, 2026).
