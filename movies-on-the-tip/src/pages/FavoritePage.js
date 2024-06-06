import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import MovieList from '../components/MovieList';
import Notification from '../components/Notification';
import '../FavoriteList.css';
import '../Notification.css';

function FavoritesPage({ favorites, onRemove, onFavorite, searchTerm, onSearch }) {
    const [notification, setNotification] = useState(null);
    const [filteredFavorites, setFilteredFavorites] = useState([]);

    useEffect(() => {
        const updatedFavorites = favorites.filter(movie => {
            if (!movie || !movie.title) {
                console.warn("Invalid Movie found in favorites: ", movie);
                return false;
            }
            return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setFilteredFavorites(updatedFavorites);
    }, [favorites, searchTerm]);

    const noFavoritesMessage = filteredFavorites.length === 0
        ? "No favorites added yet"
        : "No search results found";

    const handleRemove = (movieId) => {
        onRemove(movieId);
        if (!notification) {
            setNotification("Removed Movie from favorites 💔");
        }
    };

    const handleAddFavorite = (movieId) => {
        onFavorite(movieId);
        setNotification("Added Movie to favorites ❤️");
    };

    useEffect(() => {
        let timer;
        if (notification) {
            timer = setTimeout(() => {
                setNotification(null);
            }, 2000);
        }
        return () => clearTimeout(timer);
    }, [notification]);

    return (
        <div>
            <NavBar onSearch={onSearch} />
            {notification && <Notification message={notification} onClose={() => setNotification(null)} />}
            <h2 style={{ textAlign: "center" }}>Favorite Movies ❤️</h2>
            {filteredFavorites.length > 0 ? (
                <MovieList movies={filteredFavorites} onRemove={handleRemove} onAdd={handleAddFavorite} isFavoritePage={true} />
            ) : (
                <p>{noFavoritesMessage}</p>
            )}
        </div>
    );
}

export default FavoritesPage;