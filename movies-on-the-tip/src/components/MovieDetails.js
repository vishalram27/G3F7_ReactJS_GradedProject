import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovies } from '../services/MovieService';
import '../MovieDetails.css';

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState(null);
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const moviesData = await getMovies();
                const allMovies = [
                    ...moviesData['movies-coming'],
                    ...moviesData['movies-in-theaters'],
                    ...moviesData['top-rated-india'],
                    ...moviesData['top-rated-movies']
                ];
                const movie = allMovies.find((m) => m.id === id);
                setMovie(movie);
            } catch (error) {
                console.error('Error fetching movie:', error);
            }
        };

        fetchMovie();
    }, [id]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    const averageRating = movie.ratings.reduce((acc, curr) => acc + curr, 0) / movie.ratings.length;

    const openModal = (imageUrl) => {
        setModalImage(imageUrl);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="movie-details">
            <Link to="/" style={{ textDecoration: 'none' }}>back to home...</Link>
            <hr />
            {modalOpen && (
                <div className="modal">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <img src={modalImage} alt={movie.title} className="modal-image" />
                </div>
            )}
            <img src={movie.posterurl} alt={movie.title} className="details-poster" onClick={() => openModal(movie.posterurl)} />
            <h2 className="details-title">{movie.title}</h2>
            <p className="details-storyline">{movie.storyline}</p>
            <p>Release Date: {movie.releaseDate}</p>
            <p>Rating: {averageRating.toFixed(1)}</p>
            <p>Genres: {movie.genres.join(', ')}</p>
            <p>Actors: {movie.actors.join(', ')}</p>
            <p>Duration: {movie.duration}</p>
            <p>Content Rating: {movie.contentRating}</p>
        </div>
    );
}

export default MovieDetails;
