import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminReservationDetails from '../components/AdminReservationDetails';

const AdminReservationList = () => {
    const [reservations, setReservations] = useState([])
    const [selectedReservation, setSelectedReservation] = useState(null)
    const [newStatus, setNewStatus] = useState('')

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get('/api/reservation')
                setReservations(response.data);
            } catch (error) {
                console.error('Failed to fetch reservations:', error)
            }
        }

        fetchReservations()
    }, [])

    const handleReservationClick = async (reservationId) => {
        try {
            const response = await axios.get(`/api/reservation/${reservationId}`)
            setSelectedReservation(response.data)
            setNewStatus(response.data.status)
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
            await axios.patch(`/api/reservation/${selectedReservation._id}`, { status: newStatus })
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
            <h3>Admin Reservation List</h3>
            <ul>
                {reservations.map((reservation, index) => (
                    <li key={reservation._id}>
                        <p>#{index + 1}</p>
                        <p onClick={() => handleReservationClick(reservation._id)} style={{ cursor: 'pointer' }}>
                            Reservation ID: {reservation._id}
                        </p>
                        <p>Status: {reservation.status}</p>
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