import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditMovieForm = ({ movie: initialMovie, onClose }) => {
    const [formData, setFormData] = useState(null)
    const [showStatusOptions, setShowStatusOptions] = useState(false)
    const [confirmDialog, setConfirmDialog] = useState(false)

    useEffect(() => {
        setFormData(initialMovie)
        setShowStatusOptions(initialMovie.status === 'draft')
    }, [initialMovie])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e) => {
        try {
            let fetchUrl
            if (formData.status === 'draft') {
                fetchUrl = `/api/drafts/${initialMovie._id}`
            } else if (formData.status === 'published') {
                fetchUrl = `/api/drafts/publish/${initialMovie._id}`
            } else {
                fetchUrl = `/api/movies/${initialMovie._id}`
            }
            await axios.patch(fetchUrl, formData);
            console.log('Movie updated successfully!')
            window.location.reload()
        } catch (error) {
            console.error('Failed to update movie:', error)
        }
    }

    const handleClose = () => {
        onClose()
    }

    const handleStatusChange = () => {
        setConfirmDialog(true);
    }

    const handleConfirmStatusChange = async () => {
        setConfirmDialog(false);
        await handleSubmit();
    }

    const handleCancelStatusChange = () => {
        setConfirmDialog(false);
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
                {showStatusOptions && (
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
                )}
                {confirmDialog ? (
                    <div>
                        <p>Are you sure you want to change the status?</p>
                        <button onClick={handleConfirmStatusChange}>Yes</button>
                        <button onClick={handleCancelStatusChange}>No</button>
                    </div>
                ) : (
                    <div>
                        <button type="button" onClick={handleStatusChange}>Save</button>
                        <button type="button" onClick={handleClose}>Close</button>
                    </div>
                )}
            </form>
        </div>
    )
}

export default EditMovieForm;
