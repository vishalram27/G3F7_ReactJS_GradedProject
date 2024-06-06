import React, { useState, useEffect } from 'react';
import { getMovies } from '../services/MovieService';
import MovieList from '../components/MovieList';
import NavBar from '../components/NavBar';
import '../App.css';

function InTheatersPage({ onFavorite, searchTerm, onSearch }) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const moviesData = await getMovies();
                setMovies(moviesData['movies-in-theaters'] || []);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);

    const filteredMovies = movies.filter((movie) =>
        movie.title && movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="in-theaters-page">
            <NavBar onSearch={onSearch} />
            <h2 style={{ textAlign: "center" }}>Released worldwide...</h2>
            {filteredMovies.length > 0 ? (
                <MovieList movies={filteredMovies} onFavorite={onFavorite} isFavoritePage={false} />
            ) : (
                <p>No results found</p>
            )}
        </div>
    );
}

export default InTheatersPage;