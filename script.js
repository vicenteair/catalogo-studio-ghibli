const API_URL = 'https://ghibliapi.vercel.app/films';
let allMovies = [];
let currentFilter = 'all';
let favorites = JSON.parse(localStorage.getItem('ghibli_favorites')) || [];

// Função para buscar textos em PT-BR via API pública MyMemory
async function translateText(text) {
    try {
        const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|pt-BR`);
        const data = await res.json();
        return data.responseData.translatedText || text;
    } catch {
        return text; // Fallback para o texto original se falhar a rede
    }
}

async function fetchGhibliMovies() {
    const container = document.getElementById('movies-container');
    updateFavCount();
    
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);

        allMovies = await response.json();
        renderMovies();

    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #fff;">Erro ao carregar os dados do catálogo.</p>`;
    }
}

function renderMovies() {
    const container = document.getElementById('movies-container');
    container.innerHTML = '';

    // Filtra se a aba ativa for 'favorites'
    const moviesToRender = currentFilter === 'favorites' 
        ? allMovies.filter(m => favorites.includes(m.id))
        : allMovies;

    if (moviesToRender.length === 0 && currentFilter === 'favorites') {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #fff; font-size: 1.2rem;">Você ainda não favoritou nenhum filme. Clique no coração (♥) para salvar seus favoritos!</p>`;
        return;
    }

    moviesToRender.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('card');

        // Wrapper da Imagem
        const imgWrapper = document.createElement('div');
        imgWrapper.classList.add('card-img-wrapper');

        const img = document.createElement('img');
        img.src = movie.image;
        img.alt = movie.title;
        img.onclick = () => openModal(movie);

        const badge = document.createElement('span');
        badge.classList.add('card-badge');
        badge.textContent = movie.release_date;

        // Botão de Coração
        const heartBtn = document.createElement('button');
        heartBtn.classList.add('heart-btn');
        if (favorites.includes(movie.id)) {
            heartBtn.classList.add('active');
        }
        heartBtn.innerHTML = '♥';
        heartBtn.onclick = (e) => {
            e.stopPropagation();
            toggleFavorite(movie.id, heartBtn);
        };

        imgWrapper.appendChild(img);
        imgWrapper.appendChild(badge);
        imgWrapper.appendChild(heartBtn);

        // Conteúdo
        const content = document.createElement('div');
        content.classList.add('card-content');
        content.onclick = () => openModal(movie);

        const title = document.createElement('h2');
        title.textContent = movie.title;

        const director = document.createElement('p');
        director.classList.add('director');
        director.textContent = `Dir. ${movie.director}`;

        const btn = document.createElement('button');
        btn.classList.add('card-btn');
        btn.textContent = 'Ver Detalhes';
        btn.onclick = (e) => {
            e.stopPropagation();
            openModal(movie);
        };

        content.appendChild(title);
        content.appendChild(director);
        content.appendChild(btn);

        card.appendChild(imgWrapper);
        card.appendChild(content);

        container.appendChild(card);
    });
}

function setFilter(filterType) {
    currentFilter = filterType;
    document.getElementById('filter-all').classList.toggle('active', filterType === 'all');
    document.getElementById('filter-favs').classList.toggle('active', filterType === 'favorites');
    renderMovies();
}

function toggleFavorite(id, btn) {
    if (favorites.includes(id)) {
        favorites = favorites.filter(favId => favId !== id);
        btn.classList.remove('active');
    } else {
        favorites.push(id);
        btn.classList.add('active');
    }
    localStorage.setItem('ghibli_favorites', JSON.stringify(favorites));
    updateFavCount();

    if (currentFilter === 'favorites') {
        renderMovies();
    }
}

function updateFavCount() {
    document.getElementById('fav-count').textContent = favorites.length;
}

async function openModal(movie) {
    document.getElementById('modal-banner').src = movie.movie_banner || movie.image;
    document.getElementById('modal-title').textContent = movie.title;
    document.getElementById('modal-original-title').textContent = `${movie.original_title} (${movie.original_title_romanised})`;
    document.getElementById('modal-year').textContent = `Lançamento: ${movie.release_date}`;
    document.getElementById('modal-score').textContent = `★ ${movie.rt_score}/100`;
    document.getElementById('modal-time').textContent = `${movie.running_time} min`;
    document.getElementById('modal-director').textContent = movie.director;
    document.getElementById('modal-producer').textContent = movie.producer;

    // Tradução em tempo real da sinopse para Português
    const descElement = document.getElementById('modal-description');
    descElement.textContent = "Traduzindo sinopse para Português...";
    
    const translatedDesc = await translateText(movie.description);
    descElement.textContent = translatedDesc;

    document.getElementById('movie-modal').classList.remove('hidden');
}

document.getElementById('close-modal').onclick = () => {
    document.getElementById('movie-modal').classList.add('hidden');
};

window.onclick = (event) => {
    const modal = document.getElementById('movie-modal');
    if (event.target === modal) {
        modal.classList.add('hidden');
    }
};

document.addEventListener('DOMContentLoaded', fetchGhibliMovies);