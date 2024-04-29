import { useState, useEffect } from 'react';
import axios from 'axios';

const MovieList = ({ handleEdit }) => {
    const [movies, setMovies] = useState([])
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const moviesPerPage = 10

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('/api/drafts')
                setMovies(response.data)
            } catch (error) {
                console.error('Failed to fetch movies:', error)
            }
        }

        fetchMovies()
    }, [])

    const handleSelectMovie = (movie) => {
        setSelectedMovie(movie)
    }

    const handleCloseDetails = () => {
        setSelectedMovie(null)
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
    }

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
    }

    return (
        <div >
            <div className='all-btn-admin'>
            <h3 className='get-movies2'>Drafts List</h3>
            <input
                className='get-search2 '
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={handleSearch}
            />
            </div>
            <ul className='draft-all'>
                {currentMovies.map((movie) => (
                    <li className='draft-list' key={movie._id} onClick={() => handleSelectMovie(movie)}>
                        <img className="draft-img" src={movie.url} alt="Cover" />
                        <h3 className='draft-title'>{movie.title} {movie.release_year}</h3>
                        <p className='draft-title2'>Status: {movie.status}</p>
                    </li>
                ))}
            </ul>
            <div className='draft-flex'>
                <button className='draft-button' onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                <button className='draft-button' onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
            {selectedMovie && (
                <div className='draft-list2'>
                    <div className='draft-list draft-width'>
                        <img className="draft-img" src={selectedMovie.url} alt="Viršelis" />
                        <h3 className='draft-title' >{selectedMovie.title}</h3>
                        <p className='draft-title2'>Release year: {selectedMovie.release_year}</p>
                        <p className='draft-title2'>Director: {selectedMovie.director}</p>
                        <p className='draft-title2'>{selectedMovie.description}</p>
                        <button className='draft-button' onClick={() => handleEdit(selectedMovie)}>Edit</button>
                        <button className='draft-button' onClick={handleCloseDetails}>Back</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MovieList;
