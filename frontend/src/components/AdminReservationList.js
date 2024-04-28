import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminReservationDetails from './AdminReservationDetails.js';
import { useAuthContext } from '../hooks/useAuthContext.js'

const AdminReservationList = () => {
    const [reservations, setReservations] = useState([])
    const [selectedReservation, setSelectedReservation] = useState(null)
    const [newStatus, setNewStatus] = useState('')
    const {user} = useAuthContext()

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

        fetchReservations()
    }, [user])

    const fetchMovieTitle = async (movieId) => {
        try {
            const response = await axios.get(`/api/movies/${movieId}`)
            return response.data.title
        } catch (error) {
            console.error('Failed to fetch movie title:', error)
            return ''
        }
    }

    const handleReservationClick = async (reservationId) => {
        try {
            const response = await axios.get(`/api/reservation/${reservationId}`, {
                headers: { 'Authorization': `Bearer ${user.token}` }
            })
            const selectedReservation = response.data;
            const movieTitle = await fetchMovieTitle(selectedReservation.movie_id);
            setSelectedReservation({...selectedReservation, movie_title: movieTitle });
            setNewStatus(selectedReservation.status);
        } catch (error) {
            console.error('Failed to fetch reservation details:', error)
        }
    }

    const handleCloseDetails = () => {
        setSelectedReservation(null)
        setNewStatus('')
    }

    const handleStatusChange = async () => {
        try {
            await axios.patch(`/api/reservation/${selectedReservation._id}`, { status: newStatus }, {
                headers: { 'Authorization': `Bearer ${user.token}` }
            })
            const updatedReservations = reservations.map(reservation => {
                if (reservation._id === selectedReservation._id) {
                    return { ...reservation, status: newStatus }
                }
                return reservation;
            })
            setReservations(updatedReservations)
            setSelectedReservation({ ...selectedReservation, status: newStatus })
        } catch (error) {
            console.error('Failed to update reservation status:', error)
        }
    }

    return (
        <div>
            <h3>All Reservations</h3>
            <ul>
                {reservations.map((reservation, index) => (
                    <li key={reservation._id}>
                        <p onClick={() => handleReservationClick(reservation._id)} style={{ cursor: 'pointer' }}>
                            {selectedReservation && selectedReservation._id === reservation._id && selectedReservation.movie_title ?
                                `The item: ${selectedReservation.movie_title}` : `Reservation #${index + 1}`}
                        </p>
                        <p>Order status: {reservation.status}</p>
                        {selectedReservation && selectedReservation._id === reservation._id && (
                            <>
                                <AdminReservationDetails reservation={selectedReservation} newStatus={newStatus} />
                                <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                                    <option value="Approved">Approved</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Progress">Progress</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Completed">Completed</option>
                                </select>
                                <button onClick={handleStatusChange}>Update status</button>
                                <button onClick={handleCloseDetails}>Close</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AdminReservationList;
