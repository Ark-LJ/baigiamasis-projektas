import Footer from '../layouts/Footer.jsx'
import Navbar from '../layouts/Navbar.jsx'
import { useState, useEffect } from 'react'
import star from './bgImages/star2.png'
import top from './bgImages/start.png'
import MovieModal from '../components/MovieModal.jsx'
import MovieList from '../components/MovieList.js'
import OrderDetails from '../components/OrderDetails.jsx'
import { useOrderContext } from "../hooks/useOrderContext.js"
import { useAuthContext } from '../hooks/useAuthContext.js'

const Main = () => {
    const [movies, setMovies] = useState([])
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [pageClass, setPageClass] = useState('main')
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [recommendedMovies, setRecommendedMovies] = useState([])
    const [selectedGenre, setSelectedGenre] = useState('')
    const [selectedYear, setSelectedYear] = useState('')
    const moviesPerPage = 12

    const {orders, dispatch} = useOrderContext()
    const {user} = useAuthContext()
    const isAdmin = user && user.role === 'admin'

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
    ]
    
    const years = [];
    for (let year = 1970; year <= 2024; year++) {
        years.push(year.toString())
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
        const fetchOrders = async () => {
            if (user) {
                try {
                    const response = await fetch('/api/reservation', {
                        headers: {'Authorization': `Bearer ${user.token}`}
                    })
                    const json = await response.json()
                    if(response.ok) {
                        dispatch({type: 'SET_ORDER', payload: json})
                    }
                } catch (error) {
                    console.error('Error fetching orders:', error)
                }
            }
        }
        fetchOrders()
    }, [dispatch, user])

    useEffect(() => {
        async function fetchMovies() {
            try {
                const response = await fetch('/api/movies')
                if (!response.ok) {
                    throw new Error('Failed to fetch movies')
                }
                const moviesData = await response.json()
                setMovies(moviesData)
            } catch (error) {
                console.error('Error fetching movies:', error)
            }
        }
        fetchMovies()
    }, [])

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
        pageNumbers.push(i)
    }

    const openModal = (movie) => {
        setSelectedMovie(movie)
        setPageClass('main blur-content')
    }

    const closeModal = () => {
        setSelectedMovie(null)
        setPageClass('main')
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
                    {recommendedMovies.map((movie, index) => (
                        <li key={movie._id}>
                            <strong className='number'>#{index + 1}</strong>{movie.title}
                        </li>
                    ))}
                    </ul>
                </div>
                {isAdmin ? <></> :
                <div>
                    <h2 className='banner2'>MOVIES THAT I ORDERED</h2>
                    <div className='movie-orders'>
                        {orders && orders.map((order, index) => (
                            <OrderDetails key={order._id} order={order} index={index} />
                        ))}
                    </div>
                </div>}
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
                        className='search-input'
                        type="text"
                        placeholder="Search movies..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                <div className='main-movie-container'>
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
            </div>
            {isAdmin ? selectedMovie && (
                <MovieList
                    movie={selectedMovie}
                    closeModal={closeModal} 
                    updateMovies={updateMovies}
                />
            ) : <MovieModal movie={selectedMovie} closeModal={closeModal} />}
        <Footer />            
    </>
    )
}
export default Main
