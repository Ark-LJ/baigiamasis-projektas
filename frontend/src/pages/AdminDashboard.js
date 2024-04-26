import { useState, useEffect } from 'react';
import axios from 'axios';
import AddMovieForm from '../components/AddMovieForm';
import MovieList from '../components/MovieList';
import EditMovieForm from '../components/EditMovieForm';

const AdminDashboard = () => {
    const [movies, setMovies] = useState([])
    const [editMovie, setEditMovie] = useState(null)

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('/api/movies')
                setMovies(response.data);
            } catch (error) {
                console.error('Failed to fetch movies:', error)
            }
        }

        fetchMovies()
    }, [])

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
        <div>
            <AddMovieForm onSubmit={handleCreateMovie} />
            <MovieList movies={movies} handleEdit={handleEdit} />
            {editMovie && (
                <EditMovieForm movie={editMovie} onClose={handleClose} />
            )}
        </div>
    )
}

export default AdminDashboard;
