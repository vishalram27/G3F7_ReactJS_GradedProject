import React from 'react';
import { Link } from 'react-router-dom';
import '../MovieList.css';

function MovieList({ movies, onFavorite, onRemove, isFavoritePage }) {
    return (
        <div className="movie-list">
            {movies.map(movie => (
                <div key={movie.id} className="movie-card">
                    <Link to={`/movie/${movie.id}`}>
                        <img src={movie.posterurl} alt={movie.title} className="movie-poster" />
                    </Link>
                    <div className="movie-info">
                        <h3>
                            <Link to={`/movie/${movie.id}`} className="movie-title-link" style={{ textDecoration: 'none', color: 'black' }}>{movie.title}</Link>
                        </h3>
                        {isFavoritePage ? (
                            <span className="movie-action" onClick={() => onRemove(movie.id)}>Remove from favorites 💔</span>
                        ) : (
                            <span className="movie-action" onClick={() => onFavorite(movie)}>Add to favorites ❤️</span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MovieList;