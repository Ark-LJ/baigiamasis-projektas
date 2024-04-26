const AdminReservationDetails = ({ reservation }) => {
    return (
        <div>
            <h4>Reservation Details</h4>
            <p>Reservation ID: {reservation._id}</p>
            <p>User ID: {reservation.user_id}</p>
            <p>Movie ID: {reservation.movie_id}</p>
            <p>Created: {new Date(reservation.createdAt).toLocaleString()}</p>
            <p>Updated: {new Date(reservation.updatedAt).toLocaleString()}</p>
            <p>Status: {reservation.status}</p>
        </div>
    )
}

export default AdminReservationDetails;
