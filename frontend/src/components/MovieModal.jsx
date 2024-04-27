import { useState, useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useOrderContext } from "../hooks/useOrderContext"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const MovieModal = ({ movie, closeModal }) => {
    const {dispatch, orders} = useOrderContext()
    const [error, setError] = useState(null)
    const {user} = useAuthContext()
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [selectedLocation, setSelectedLocation] = useState('')

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
        const isMovieAlreadyOrdered = orders.some(order => order.movie_id === movie._id)
        const order = { user_id: user._id, movie_id: movie._id, pickup_date: selectedDate, pickup_location: selectedLocation, user_email: user.email }
        if (isMovieAlreadyOrdered) {
            setError('This movie is already in your orders')
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
    };

    if (!movie) return null;

    return (
        <div className="modal">
            <div className="modal-content">
            <div className="modal-error" style={{ display: error ? 'block' : 'none' }}>
                    {error}
                </div>
                <div className='modal-top'>
                    <img src={`${movie.url}`} alt="movie_banner" />
                    <div className='text-container'>
                        <h2>{movie.title}</h2>
                        <div className='contents-container'>
                            <div>
                                <p>Year</p>
                                <div>{movie.release_year}</div>
                            </div>
                            <div>
                                <p>Genre</p>
                                <div>{movie.genres.join(', ')}</div>
                            </div>
                            <div>
                                <p>Directed By</p>
                                <p>{movie.director.join(', ')}</p>
                            </div>
                            <div>
                                <p>IMDB</p>
                                <p>{movie.imdb_rating} / 10</p>
                            </div>
                        </div>
                        <p>Cast</p>
                        <div>{movie.cast.join(', ')}</div>
                        <p>Storyline</p>
                        <div>{movie.description}</div>
                    </div>
                </div>
                <div className="order-date">
                        <p>Order pickup date:</p>
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            minDate={new Date()}
                        />
                        <select value={selectedLocation} onChange={handleLocationChange}>
                                <option value="">Select Pickup Location</option>
                                {pickupLocations.map((location, idx) => (
                                    <option key={idx} value={location}>{location}</option>
                                ))}
                        </select>
                </div>
                <div className='modal-bottom'>
                    <div className='button-container'>
                        <button className="close" onClick={handleSubmit}>Rent DVD</button>
                        <button className="close" onClick={closeModal}>Go Back</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieModal;