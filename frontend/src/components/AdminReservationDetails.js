const AdminReservationDetails = ({ reservation }) => {
    return (
        <div>
            <h4>Reservation Details</h4>
            <p>Customer: {reservation.user_email}</p>
            <p>The movie: {reservation.movie_title}</p>
            <p>Reservation created: {new Date(reservation.createdAt).toLocaleString()}</p>
            <p>Reservation updated: {new Date(reservation.updatedAt).toLocaleString()}</p>
        </div>
    )
}

export default AdminReservationDetails;
