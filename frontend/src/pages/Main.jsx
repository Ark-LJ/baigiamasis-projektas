import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'
import { useState, useEffect } from 'react'
import star from './movies/star2.png'
import top from './movies/start.png'
import MovieModal from '../components/MovieModal.jsx'
import useAuthContext from '../hooks/useAuthContext.js'


const Main = () => {

    const [movies, setMovies] = useState([])
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [pageClass, setPageClass] = useState('main')
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 12;

    useEffect(() => {
        async function fetchMovies() {
            try {
                const response = await fetch('/api/movies', {
                    headers: {"Authorization":`Bearer ${user.token}`}
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch movies')
                }
                const moviesData = await response.json();
                setMovies(moviesData);
                console.log(moviesData)
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        }
        fetchMovies()
    }, [])

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
        setPageClass('main blur-content')
    }

    const closeModal = () => {
        setSelectedMovie(null);
        setIsModalOpen(false);
        setPageClass('main');
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
                <div>
                    <h2 className='banner2'>MOVIES THAT I ORDERED</h2>
                    <div className='movie-orders'>
                    <ul className="ordered-list">
                        <li className='ordered-list-item'>
                            <div className='movie-split'>
                                <span className="number">#1</span> 
                                <span className="movie-name">Toy Story</span>   
                            </div>
                                <span className="order-date">2013/06/13</span>
                            <div>
                                <button className="btn-1">Edit order</button>
                                <button className="btn-1">Delete my order</button>
                            </div> 
                        </li>
                        <li className='ordered-list-item'> 
                            <div className='movie-split'> 
                                <span className="number">#2</span> 
                                <span className="movie-name" >Titanic</span> 
                            </div>
                                <span className="order-date">2023/08/13</span> 
                            <div>
                                <button className="btn-1">Edit order</button>
                                <button className="btn-1">Delete my order</button>
                            </div>
                        </li>
                        <li className='ordered-list-item'> 
                        <div className='movie-split'>
                            <span className="number">#3</span> 
                            <span className="movie-name">Men in Black</span>   
                        </div>
                            <span className="order-date">2013/06/13</span> 
                        <div>     
                            <button className="btn-1">Edit order</button>
                            <button className="btn-1">Delete my order</button>
                        </div>  
                        </li>
                        <li className='ordered-list-item'> 
                        <div className='movie-split'>
                            <span className="number">#4</span> 
                            <span className="movie-name">Men in Black</span> 
                        </div>
                            <span className="order-date">2013/06/13</span> 
                        <div>       
                            <button className="btn-1">Edit order</button>
                            <button className="btn-1">Delete my order</button>
                        </div>
                        </li>
                        <li className='ordered-list-item'>
                            <div className='movie-split'>
                                <span className="number">#5</span> 
                                <span className="movie-name">Forrest Gump</span> 
                            </div>   
                                <span className="order-date">2013/06/13</span> 
                            <div>
                                <button className="btn-1">Edit order</button>
                                <button className="btn-1">Delete my order</button>
                            </div>
                        </li>
                    </ul> 
                    </div>
                </div>
                <div className="search-container">
                    <button className='get-movies'>
                        All Movies
                    </button>
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
            </div>
            <MovieModal movie={selectedMovie} closeModal={closeModal} />
        <Footer />            
    </>
    )
}
export default Main