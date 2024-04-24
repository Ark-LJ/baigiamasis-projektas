import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditMovieForm = ({ movie: initialMovie, onSubmit, onClose }) => {
    const [movie, setMovie] = useState(initialMovie)
    const [formData, setFormData] = useState(null)

    useEffect(() => {
        setMovie(initialMovie)
        setFormData(initialMovie)
    }, [initialMovie])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.patch(`/api/movies/${movie._id}`, formData)
            console.log('Movie updated successfully!')
            onSubmit(formData)
        } catch (error) {
            console.error('Failed to update movie:', error)
        }
    }

    const handleClose = () => {
        onClose()
    }

    return (
        <div>
            <h3>Edit Movie</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData ? formData.title : ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={formData ? formData.description : ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Director:</label>
                    <input
                        type="text"
                        name="director"
                        value={formData ? formData.director : ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Release Year:</label>
                    <input
                        type="number"
                        name="release_year"
                        value={formData ? formData.release_year : ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Genres:</label>
                    <input
                        type="text"
                        name="genres"
                        value={formData ? formData.genres : ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>imdb:</label>
                    <input
                        type="number"
                        name="imdb_rating"
                        value={formData ? formData.imdb_rating : ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Cast:</label>
                    <input
                        type="text"
                        name="cast"
                        value={formData ? formData.cast : ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>URL:</label>
                    <input
                        type="text"
                        name="url"
                        value={formData ? formData.url : ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Status:</label>
                    <select
                        name="status"
                        value={formData ? formData.status : ''}
                        onChange={handleChange}
                        required
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                </div>
                <button type="submit">Update Movie</button>
                <button type="button" onClick={handleClose}>Close</button>
            </form>
        </div>
    )
}

export default EditMovieForm;
