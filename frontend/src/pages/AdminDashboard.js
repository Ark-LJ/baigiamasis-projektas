import { useState } from 'react';
import AddMovieForm from '../components/AddMovieForm.js';
import MovieList from '../components/MovieList.js';
import EditMovieForm from '../components/EditMovieForm';
import Footer from '../layouts/Footer.jsx';
import Navbar from '../layouts/Navbar.jsx';
import AdminReservationList from '../components/AdminReservationList';

const AdminDashboard = () => {
    const [movies, setMovies] = useState([])
    const [editMovie, setEditMovie] = useState(null)

    const handleEdit = (movie) => {
        setEditMovie(movie)
    }

    const handleCreateMovie = (formData) => {
        setMovies([...movies, formData])
    }

    const handleClose = () => {
      setEditMovie(null)
  }

    return (
        <>
            <Navbar />
            <div>
                <AddMovieForm onSubmit={handleCreateMovie} />
                <MovieList movies={movies} handleEdit={handleEdit} />
                {editMovie && (
                    <EditMovieForm movie={editMovie} onClose={handleClose} />
                )}
                <AdminReservationList />
            </div>
            <Footer />
        </>
    )
}

export default AdminDashboard;
