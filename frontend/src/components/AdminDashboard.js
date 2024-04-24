import { useState, useEffect } from 'react'
import axios from 'axios'
import AddMovieForm from './AddMovieForm.js'
import AdminMovieModal from './AdminMovieModal.jsx'
import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'
import star from '../pages/movies/star2.png'
import top from '../pages/movies/start.png'

const AdminDashboard = () => {
    const [movies, setMovies] = useState([])
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [pageClass, setPageClass] = useState('movies')
    const moviesPerPage = 12;

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('/api/movies')
                setMovies(response.data);
            } catch (error) {
                console.error('Failed to fetch movies:', error)
            }
        }

        fetchMovies()
    }, [])

    const handleCreateMovie = (formData) => {
        setMovies([...movies, formData])
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

    const handlePageClick = (page) => {
        setCurrentPage(page);
    }

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const openModal = (movie) => {
        setSelectedMovie(movie);
        setIsModalOpen(true);
        setPageClass('movies blur-content')
    }

    const closeModal = () => {
        setSelectedMovie(null);
        setIsModalOpen(false);
        setPageClass('movies');
    }

    const updateMovies = async () => {
        try {
            const response = await fetch('/api/movies');
            if (!response.ok) {
                throw new Error('Failed to fetch movies')
            }
            const moviesData = await response.json();
            setMovies(moviesData);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    }

    return (
        <>
            <Navbar />
            <div className={pageClass}>
                <div className='top-part'>
                    <h1 className='banner1'>MOVIES THAT IS YOUR RIDE OR DIE.</h1>
                    <img src={top} className='star' alt="movie_banner" />
                    <img src={star} className='star2' alt="movie_banner" />
                </div>
                <div className='movie-top'>
                    <ul className='movie-recomended'>
                        <li ><strong className='number'>#1</strong>Schindler's List</li>
                        <li ><strong className='number'>#2</strong>Toy Story</li>
                        <li ><strong className='number'>#3</strong>Titanic</li>
                        <li ><strong className='number'>#4</strong>Men in Black</li>
                        <li ><strong className='number'>#5</strong>Forrest Gump</li>
                    </ul>
                </div>
                <AddMovieForm onSubmit={handleCreateMovie} />
                <div className="search-container">
                    <button className='get-movies'>
                        All Movies
                    </button>
                    <input 
                        type="text"
                        placeholder="Search movies..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                <div className="movie-container">
                        <div className={'movies-list'}>
                            {currentMovies.map(movie => (
                                <div className={'movie-item'} key={movie._id} onClick={() => openModal(movie)}>
                                    <img src={`${movie.url}`} alt="movie_banner" />
                                </div>
                                ))}  
                        </div>
                </div>
            </div>
            <div>
                {pageNumbers.map((number) => (
                    <button
                        key={number}
                        onClick={() => handlePageClick(number)}
                        className={currentPage === number ? 'active' : ''}
                    >
                        {number}
                    </button>
                ))}
            </div>
            {selectedMovie && (
                <AdminMovieModal
                    movie={selectedMovie}
                    closeModal={closeModal} 
                    updateMovies={updateMovies}
                />
            )}
        <Footer />
    </>
    )
}

export default AdminDashboard;
