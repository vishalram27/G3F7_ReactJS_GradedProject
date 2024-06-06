import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritePage';
import InTheatersPage from './pages/InTheatersPage';
import ComingSoonPage from './pages/ComingSoonPage';
import TopRatedIndianPage from './pages/TopRatedIndianPage';
import TopRatedMoviesPage from './pages/TopRatedMoviesPage';
import Notification from './components/Notification';
import MovieDetails from './components/MovieDetails';

function App() {
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const handleFavoriteMovie = (movie) => {
        if (favorites.some((fav) => fav && fav.id === movie.id)) {
            setNotification("Movie already added to favorites");
            setTimeout(() => setNotification(null), 2000);
            return;
        }
        setFavorites((prevFavorites) => [...prevFavorites, movie]);
        setNotification("Added Movie to favorites ❤️");
        setTimeout(() => setNotification(null), 2000);
    };

    const handleRemoveFavorite = (movieId) => {
        setFavorites((prevFavorites) =>
            prevFavorites.filter((movie) => movie && movie.id !== movieId)
        );
        setTimeout(() => setNotification(null), 2000);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    return (
        <Router>
            <div className="App">
                {notification && <Notification message={notification} onClose={() => setNotification(null)} />}
                <Routes>
                    <Route path="/" element={<HomePage onFavorite={handleFavoriteMovie} searchTerm={searchTerm} onSearch={handleSearch} />} />
                    <Route path="/movie/:id" element={<MovieDetails />} />
                    <Route path="/favorites" element={<FavoritesPage favorites={favorites} onRemove={handleRemoveFavorite} searchTerm={searchTerm} onSearch={handleSearch} />} />
                    <Route path="/in-theaters" element={<InTheatersPage onFavorite={handleFavoriteMovie} searchTerm={searchTerm} onSearch={handleSearch} />} />
                    <Route path="/coming-soon" element={<ComingSoonPage onFavorite={handleFavoriteMovie} searchTerm={searchTerm} onSearch={handleSearch} />} />
                    <Route path="/top-rated-indian" element={<TopRatedIndianPage onFavorite={handleFavoriteMovie} searchTerm={searchTerm} onSearch={handleSearch} />} />
                    <Route path="/top-rated-movies" element={<TopRatedMoviesPage onFavorite={handleFavoriteMovie} searchTerm={searchTerm} onSearch={handleSearch} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;