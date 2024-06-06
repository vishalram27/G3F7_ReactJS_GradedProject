import React, { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';
import NavBar from '../components/NavBar';
import '../App.css';

function TopRatedMoviesPage({ onFavorite, searchTerm, onSearch }) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch('/movies.json')
            .then((response) => response.json())
            .then((data) => setMovies(data['top-rated-movies']))
            .catch((error) => console.error('Error fetching movies:', error));
    }, []);

    const filteredMovies = movies.filter((movie) =>
        movie.title && movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="top-rated-movies-page">
            <NavBar onSearch={onSearch} />
            <h2 style={{ textAlign: "center" }}>Top Rated Movies</h2>
            {filteredMovies.length > 0 ? (
                <MovieList movies={filteredMovies} onFavorite={onFavorite} isFavoritePage={false} />
            ) : (
                <p>No results found</p>
            )}
        </div>
    );
}

export default TopRatedMoviesPage;