import React from 'react';
import { Link } from 'react-router-dom';
import '../NavBar.css';

function NavBar({ onSearch }) {
    const handleSearchChange = (event) => {
        onSearch(event.target.value);
    };

    return (
        <nav className="nav-bar">
            <div className="nav-links">
                <Link to="/in-theaters" className="nav-link">Movies In Theaters</Link>
                <Link to="/coming-soon" className="nav-link">Coming Soon</Link>
                <Link to="/top-rated-indian" className="nav-link">Top Rated Indian</Link>
                <Link to="/top-rated-movies" className="nav-link">Top Rated Movies</Link>
                <Link to="/favorites" className="nav-link">Favorites</Link>
            </div>
            <input
                type="text"
                placeholder="Search..."
                onChange={handleSearchChange}
                className="search-bar"
            />
        </nav>
    );
}

export default NavBar;
