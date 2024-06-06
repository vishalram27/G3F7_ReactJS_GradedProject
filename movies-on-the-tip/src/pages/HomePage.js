import React, { useState, useEffect } from 'react';
import { getMovies } from '../services/MovieService';
import MovieList from '../components/MovieList';
import NavBar from '../components/NavBar';
import '../App.css';

function HomePage({ onFavorite, searchTerm, onSearch }) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const moviesData = await getMovies();
                const allMovies = [
                    ...moviesData['movies-coming'],
                    ...moviesData['movies-in-theaters'],
                    ...moviesData['top-rated-india'],
                    ...moviesData['top-rated-movies']
                ];
                setMovies(allMovies);
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
        <div className="home-page">
            <NavBar onSearch={onSearch} />
            <h2 style={{ textAlign: "center" }}>Movies List in the Tip...</h2>
            {filteredMovies.length > 0 ? (
                <MovieList movies={filteredMovies} onFavorite={onFavorite} isFavoritePage={false} />
            ) : (
                <p>No results found</p>
            )}
        </div>
    );
}

export default HomePage;