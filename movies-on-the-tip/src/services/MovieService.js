const MOVIE_API_URL = '/movies.json';

export const getMovies = async () => {
    const response = await fetch(MOVIE_API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch movies');
    }
    return response.json();
};
