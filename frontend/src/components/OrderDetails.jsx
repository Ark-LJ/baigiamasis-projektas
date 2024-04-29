import { useState, useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext.js"
import { useOrderContext } from "../hooks/useOrderContext.js"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const OrderDetails = ({ order, index }) => {
    const { dispatch } = useOrderContext()
    const { user } = useAuthContext()
    const [movie, setMovie] = useState(null)
    const [edit, setEdit] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date(order.pickup_date))
    const [selectedLocation, setSelectedLocation] = useState(order.pickup_location)

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(`/api/movies/${order.movie_id}`)
                if (response.ok) {
                    const movieData = await response.json()
                    setMovie(movieData)
                } else {
                    throw new Error('Failed to fetch movie')
                }
            } catch (error) {
                console.error('Error fetching movie:', error)
            }
        }
        fetchMovie()
    }, [order.movie_id])

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

    const handleClick = async () => {
        if (!user) { 
            return
        }
        const response = await fetch('/api/reservation/' + order._id, {
            method: 'DELETE',
            headers: {'Authorization': `Bearer ${user.token}`}
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_ORDER', payload: json})
        }
    }

    const handleEditClick = () => {
        setEdit(!edit)
    }

    const handleDateChange = (date) => {
        setSelectedDate(date)
    }

    const handleLocationChange = (e) => {
        setSelectedLocation(e.target.value)
    }

    const handleSaveEdit = async () => {
        try {
            const response = await fetch('/api/reservation/' + order._id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ pickup_date: selectedDate, pickup_location: selectedLocation })
            })
            const json = await response.json()
            if (response.ok) {
                dispatch({ type: 'UPDATE_ORDER', payload: json })
                setEdit(false)
            } else {
                console.error('Failed to update order:', json.error)
            }
        } catch (error) {
            console.error('Error updating order:', error)
        }
    }
    return (
        <> 
            <ul className="ordered-list">
                <li className='ordered-list-item'>
                    <div className='movie-split'>
                        <span className="number">#{index + 1}</span>
                        <span className="movie-name">{movie ? movie.title : 'Loading...'}</span>   
                    </div>
                    {edit ? (
                        <>
                            <DatePicker className="get-movies"
                                selected={selectedDate}
                                onChange={handleDateChange}
                                minDate={new Date()}
                            />
                            <select className="get-movies" value={selectedLocation} onChange={handleLocationChange}>
                                <option value="">Select Pickup Location</option>
                                {pickupLocations.map((location, id) => (
                                    <option key={id} value={location}>{location}</option>
                                ))}
                            </select>
                        </>
                    ) : (
                        <>
                            <span className="order-date">{selectedDate.toLocaleDateString('en-UK', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit'
                            })}</span>
                            <span className="selected-location">{selectedLocation}</span>
                        </>
                    )}
                    <span className="movie-name">{order.status}</span>
                    {order.status.toString() === ('Pending') ?
                    <div className="all-order-btn1" >
                        <button className="btn-1" onClick={edit ? handleSaveEdit : handleEditClick}>
                            {edit ? 'Save' : 'Edit order'}
                        </button>
                        <button className="btn-1" onClick={handleClick}>Delete</button>
                    </div>
                    :
                    <div className="all-order-btn1" >
                        <button className="btn-1" disabled>
                            Edit order
                        </button>
                        <button className="btn-1" disabled>Delete</button>
                    </div>
                    }
                </li>
            </ul>
        </>
    )
}

export default OrderDetails