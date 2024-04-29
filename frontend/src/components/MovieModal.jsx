import { useState, useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useOrderContext } from "../hooks/useOrderContext"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import axios from "axios"

const MovieModal = ({ movie, closeModal }) => {
    const { dispatch, orders } = useOrderContext()
    const [error, setError] = useState(null)
    const { user } = useAuthContext()
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [selectedLocation, setSelectedLocation] = useState('')
    const [reservations, setReservations] = useState([])
    const pickupLocations = [
        'High Street 12 , London',
        'Station Road 78 , London',
        'Main Street 34 , Liverpool',
        'Park Road, 36, Liverpool',
        'Church Road 99, Manchester',
        'Church Street 76, Birmingham',
        'London Road 11, Birmingham',
        'Victoria Road 12,Bradford'
    ]

    const handleLocationChange = (e) => {
        setSelectedLocation(e.target.value)
    }

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                if (user) {
                    const response = await axios.get('/api/reservation/admin', {
                        headers: { 'Authorization': `Bearer ${user.token}` }
                    })
                    setReservations(response.data);
                }
            } catch (error) {
                console.error('Failed to fetch reservations:', error)
            }
        }
        
        fetchReservations();
    }, [user])

    useEffect(() => {
        const timer = setTimeout(() => {
            setError(null)
        }, 1000)

        return () => clearTimeout(timer)
    }, [error])
    
    const handleDateChange = (date) => {
        setSelectedDate(date)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!user) {
            setError('Must be logged in!')
            return
        }

        const order = { user_email: user.email, user_id: user._id, movie_id: movie._id, pickup_date: selectedDate, pickup_location: selectedLocation }
        const isMovieAlreadyOrdered = orders.some(order => order.movie_id === movie._id && new Date(order.pickup_date).toDateString() === selectedDate.toDateString());

        if (isMovieAlreadyOrdered) {
            setError('This movie is already in your orders.')
            return
        }

        // Check if there's a reservation for the selected movie on the selected date
        const isMovieAlreadyReserved = reservations.some(reservation => reservation.movie_id === movie._id && new Date(reservation.pickup_date).toDateString() === selectedDate.toDateString());

        if (isMovieAlreadyReserved) {
            setError('This movie is already reserved for the selected date.')
            return
        }

        try {
            const response = await fetch('/api/reservation', {
                method: 'POST',
                body: JSON.stringify(order),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            if (!response.ok) {
                setError(json.error)
            }
            if (response.ok) {
                dispatch({ type: 'CREATE_ORDER', payload: json })
                closeModal()
            }
        } catch (error) {
            console.error('Error creating reservation:', error)
            setError('Error creating reservation. Please try again.')
        }
    }

    if (!movie) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-error" style={{ display: error ? 'block' : 'none' }}>
                    {error}
                </div>
                <div className='modal-top'>
                    <img className='form-img' src={`${movie.url}`} alt="movie_banner" />
                    <div className='text-container'>
                        <div className="dispay-title">
                            <p className="form-title">Title</p>
                            <p className="form-info">{movie.title}</p>
                        </div>
                        <div className='contents-container'>
                            <div className='display-year'>
                                <p className="form-title">Year</p>
                                <div className="form-info">{movie.release_year}</div>
                            </div>
                            <div className='display-genre'>
                                <p className="form-title">Genre</p>
                                <div className="form-info">{movie.genres.join(', ')}</div>
                            </div>
                        </div>
                        <div className='contents-container'>
                            <div className='display-directed'>
                                <p className="form-title">Directed By</p>
                                <p className="form-info">{movie.director.join(', ')}</p>
                            </div>
                            <div className='display-imdb'>
                                <p className="form-title">IMDB</p>
                                <p className="form-info">{movie.imdb_rating} / 10</p>
                            </div>
                        </div>
                        <div className='display-cast'>
                            <p className="form-title">Cast</p>
                            <div className="form-info">{movie.cast.join(', ')}</div>
                        </div>
                        <div className='display-story'>
                            <p className="form-title">Storyline</p>
                            <div className="form-info info-story">{movie.description}</div>
                        </div>
                        <div>
                            <div>
                                <p className="form-title">Order pickup date:</p>
                            </div>
                            <div className="picker-location">
                                <DatePicker className="get-movies get-movies-picker"
                                    selected={selectedDate}
                                    onChange={handleDateChange}
                                    minDate={new Date()}
                                />
                                <select className="get-movies get-movies-location" value={selectedLocation} onChange={handleLocationChange}>
                                    <option value="">Select Pickup Location</option>
                                    {pickupLocations.map((location, idx) => (
                                        <option key={idx} value={location}>{location}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='modal-bottom'>
                            <div className='button-container'>
                                <button className="form-button" onClick={handleSubmit}>Rent DVD</button>
                                <button className="form-button" onClick={closeModal}>Go Back</button>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieModal;