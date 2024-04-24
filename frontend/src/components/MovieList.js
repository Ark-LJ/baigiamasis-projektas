import { useState, useEffect } from 'react';
import axios from 'axios';

const MovieList = ({ handleEdit }) => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 12;

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('/api/movies')
                setMovies(response.data)
            } catch (error) {
                console.error('Failed to fetch movies:', error)
            }
        }

        fetchMovies();
    }, [])

    const handleSelectMovie = (movie) => {
        setSelectedMovie(movie);
    }

    const handleCloseDetails = () => {
        setSelectedMovie(null);
    }

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const indexOfLastMovie = currentPage * moviesPerPage
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage
    const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie)

    const totalPages = Math.ceil(filteredMovies.length / moviesPerPage)

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
    }

    return (
        <div>
            <h2>Movies List</h2>
            <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={handleSearch}
            />
            <ul>
                {currentMovies.map((movie) => (
                    <li key={movie._id} onClick={() => handleSelectMovie(movie)}>
                                                        {/* ************************ Nuimti stiliu ************************ */}
                        <img src={movie.url} alt="Viršelis" style={{ width: '200px', height: '300px', objectFit: 'cover' }} />
                        <h3>{movie.title} {movie.release_year}</h3>
                        <p>Status: {movie.status}</p>
                    </li>
                ))}
            </ul>
            <div>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
            {selectedMovie && (
                <div>
                                                             {/* ************************ Nuimti stiliu ************************ */}
                    <img src={selectedMovie.url} alt="Viršelis" style={{ width: '200px', height: '300px', objectFit: 'cover' }} />
                    <h3>{selectedMovie.title}</h3>
                    <p>Release year: {selectedMovie.release_year}</p>
                    <p>Director: {selectedMovie.director}</p>
                    <p>{selectedMovie.description}</p>
                    <button onClick={() => handleEdit(selectedMovie)}>Edit</button>
                    <button onClick={handleCloseDetails}>Back</button>
                </div>
            )}
        </div>
    )
}

export default MovieList;
