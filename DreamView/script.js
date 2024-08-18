const apiKey = '950327dd46c0575462760a8fdec6758d'; // Your TMDb API key

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const movieList = document.getElementById('movie-list');

// Function to fetch movies from the TMDb API
function fetchMovies(query) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayMovies(data.results))
        .catch(error => console.error('Error fetching the movie data:', error));
}

// Function to display movies in the HTML
function displayMovies(movies) {
    movieList.innerHTML = '';  // Clear previous results

    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');

        const moviePoster = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'no_image.png';
        movieItem.innerHTML = `
            <img src="${moviePoster}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>${movie.overview.substring(0, 100)}...</p>
        `;

        movieList.appendChild(movieItem);
    });
}

// Event listener for form submission
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInput.value;
    if (query) {
        fetchMovies(query);
    }
});
