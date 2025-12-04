const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function searchMovie(query: string) {
    if (!TMDB_API_KEY) {
        console.warn('TMDB_API_KEY is not set');
        return [];
    }

    try {
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1&include_adult=false`);
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('TMDB Search Error:', error);
        return [];
    }
}

export async function getMovieDetails(movieId: number) {
    if (!TMDB_API_KEY) return null;

    try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US&append_to_response=credits,images`);
        return await response.json();
    } catch (error) {
        console.error('TMDB Details Error:', error);
        return null;
    }
}
