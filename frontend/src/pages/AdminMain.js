import { useState, useEffect } from 'react'
import axios from 'axios'
import MovieList from '../components/MovieList.js'
import Footer from '../layouts/Footer.jsx'
import Navbar from '../layouts/Navbar.jsx'
import star from '../pages/bgImages/star2.png'
import top from '../pages/bgImages/start.png'

const AdminMain = () => {
    const [movies, setMovies] = useState([])
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [pageClass, setPageClass] = useState('movies')
    const [recommendedMovies, setRecommendedMovies] = useState([])
    const [selectedGenre, setSelectedGenre] = useState('')
    const [selectedYear, setSelectedYear] = useState('')
    const moviesPerPage = 10

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
    const genres = [
        'Action',
        'Adventure',
        'Animation',
        'Comedy',
        'Crime',
        'Documentary',
        'Drama',
        'Family',
        'Fantasy',
        'History',
        'Horror',
        'Music',
        'Mystery',
        'Romance',
        'Science Fiction',
        'Thriller',
        'War',
        'Western'
    ];
    
    const years = [];
    for (let year = 1970; year <= 2024; year++) {
        years.push(year.toString());
    }

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedGenre === '' || movie.genres.includes(selectedGenre)) &&
        (selectedYear === '' || movie.release_year === selectedYear)
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

    useEffect(() => {
        async function fetchRecommendedMovies() {
            try {
                const response = await fetch('/api/recomendation?sortBy=imdb_rating&limit=5')
                if (!response.ok) {
                    throw new Error('Failed to fetch recommended movies')
                }
                const recommendedMoviesData = await response.json()
                setRecommendedMovies(recommendedMoviesData)
            } catch (error) {
                console.error('Error fetching recommended movies:', error)
            }
        }
        fetchRecommendedMovies()
    }, [])

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
                    {recommendedMovies.map((movie, index) => (
                        <li key={movie._id}>
                            <strong className='number'>#{index + 1}</strong>{movie.title}
                        </li>
                    ))}
                    </ul>
                </div>
                <div className="search-container">
                <select
                        className='filter-dropdown'
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                    >
                        <option value="">Years</option>
                        {years.map((year, id) => (
                            <option key={id} value={year}>{year}</option>
                        ))}
                    </select>
                    <select
                        className='filter-dropdown'
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                    >
                        <option value="">Genres</option>
                        {genres.map((genre, id) => (
                            <option key={id} value={genre}>{genre}</option>
                        ))}
                    </select>
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
                                    <img src={`${movie.url}`} alt={movie.title} />
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
                <MovieList
                    movie={selectedMovie}
                    closeModal={closeModal} 
                    updateMovies={updateMovies}
                />
            )}
        <Footer />
    </>
    )
}

export default AdminMain;
