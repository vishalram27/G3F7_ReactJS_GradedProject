import React from 'react';

const MovieCard = ({ movie, onFavorite, isFavorite }) => {
    if (!movie) return null;

    return (
        <div className="movie-card">
            <img src={movie.posterurl} alt={movie.title} />
            <h3>{movie.title}</h3>
            <button onClick={() => onFavorite(movie)}>
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
        </div>
    );
};

export default MovieCard;