import React, { useState, useEffect } from 'react';
import { getMovies } from '../services/MovieService';
import MovieList from '../components/MovieList';
import NavBar from '../components/NavBar';
import '../MovieList.css';

function ComingSoonPage({ onFavorite, searchTerm, onSearch }) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const movies = await getMovies();
                setMovies(movies['movies-coming'] || []);
            } catch (error) {
                console.error('Error fetching movies:', error);
                setMovies([]);
            }
        };

        fetchMovies();
    }, []);

    const filteredMovies = movies.filter((movie) =>
        movie.title && movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="coming-soon-page">
            <NavBar onSearch={onSearch} />
            <h2 style={{ textAlign: "center" }}>To hit the screen soon...</h2>
            {filteredMovies.length > 0 ? (
                <MovieList movies={filteredMovies} onFavorite={onFavorite} isFavoritePage={false} />
            ) : (
                <p>No results found</p>
            )}
        </div>
    );
}

export default ComingSoonPage;