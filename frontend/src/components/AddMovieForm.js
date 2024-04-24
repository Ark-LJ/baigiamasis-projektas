import { useState } from 'react';
import axios from 'axios';

const AddMovieForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        director: '',
        release_year: '',
        genres: '',
        imdb_rating: '',
        cast: '',
        url: '',
        status: 'draft'
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post('/api/movies', formData)
            console.log('Movie added successfully!')
            onSubmit(formData)
            setFormData({
                title: '',
                description: '',
                director: '',
                release_year: '',
                genres: '',
                imdb_rating: '',
                cast: '',
                url: '',
                status: 'draft'
            })
        } catch (error) {
            console.error('Failed to add movie:', error)
        }
    }

    return (
        <div>
            <h3>Add New Movie</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Director:</label>
                    <input
                        type="text"
                        name="director"
                        value={formData.director}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Release Year:</label>
                    <input
                        type="number"
                        name="release_year"
                        value={formData.release_year}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Genres:</label>
                    <input
                        type="text"
                        name="genres"
                        value={formData.genres}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>imdb:</label>
                    <input
                        type="number"
                        name="imdb_rating"
                        value={formData.imdb_rating}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Cast:</label>
                    <input
                        type="text"
                        name="cast"
                        value={formData.cast}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>URL:</label>
                    <input
                        type="text"
                        name="url"
                        value={formData.url}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Status:</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                </div>
                <button type="submit">Add Movie</button>
            </form>
        </div>
    )
}

export default AddMovieForm;
