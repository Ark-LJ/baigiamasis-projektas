import { useState, useEffect } from 'react';
import axios from 'axios';
import AddMovieForm from './AddMovieForm';
import MovieList from './MovieList';
import EditMovieForm from './EditMovieForm';

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

    const handleUpdateMovie = async (updatedMovie) => {
        try {
            await axios.patch(`/api/movies/${updatedMovie._id}`, updatedMovie)
            const updatedMovies = movies.map((movie) =>
                movie._id === updatedMovie._id ? updatedMovie : movie
            )
            setMovies(updatedMovies)
            setEditMovie(null)
            console.log('Movie updated successfully!')
        } catch (error) {
            console.error('Failed to update movie:', error)
        }
    }

    return (
        <div>
            <AddMovieForm onSubmit={handleCreateMovie} />
            <MovieList movies={movies} handleEdit={handleEdit} />
            {editMovie && (
                <EditMovieForm movie={editMovie} onSubmit={handleUpdateMovie} onClose={handleClose} />
            )}
        </div>
    )
}

export default AdminDashboard;
