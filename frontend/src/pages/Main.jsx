import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'
import { useState, useEffect } from 'react'

const Main = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchMovies() {
            try {
                const response = await fetch('/api/movies');
                if (!response.ok) {
                    throw new Error('Failed to fetch movies');
                }
                const moviesData = await response.json();
                setMovies(moviesData);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        }
        fetchMovies();
    }, []);

    return (
        <div className="main">
            <Navbar />
            <h1>MOVIES THAT IS YOUR RIDE OR DIE.</h1>
            <div className="search-container">
                <button>All Movies</button>
                <input type="text" className='search-input' placeholder='Movie'/>
            </div>
            <div className="movie-container">
                {movies.map(movie => (
                    <div className={'movie-item'} key={movie._id}>
                        <img src={`${movie.url}`} alt="movie_banner" />
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    )
}

export default Main