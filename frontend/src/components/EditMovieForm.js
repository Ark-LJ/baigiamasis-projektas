import { useState, useEffect } from 'react';
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
    if (!initialMovie) {
        return <div>Movie data is not available.</div>;
    }
    
    return (
        <div className='edit-all-container' > 
        <div className='edit-form-container'>
            <form className='edit-form-movie' onSubmit={handleSubmit}>
            <h3 className='form-title3' >Edit Movie</h3>
                <div className='form-evrything'>
                    <p className='form-title3'>Title:</p>
                    <input className='form-info3'
                        type="text"
                        name="title"
                        value={formData ? formData.title : ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div lassName='form-evrything'>
                    <p className='form-title3'>Director:</p>
                    <input className='form-info3'
                        type="text" 
                        name="director"
                        value={formData ? formData.director : ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div lassName='form-evrything'>
                    <p className='form-title3'>Release Year:</p>
                    <input className='form-info3'
                        type="number"
                        name="release_year"
                        value={formData ? formData.release_year : ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div lassName='form-evrything'>
                    <p className='form-title3'>Genres:</p>
                    <input className='form-info3'
                        type="text"
                        name="genres"
                        value={formData ? formData.genres : ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div lassName='form-evrything'>
                    <p className='form-title3'>imdb:</p>
                    <input className='form-info3'
                        type="number"
                        name="imdb_rating"
                        value={formData ? formData.imdb_rating : ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div lassName='form-evrything'>
                    <p className='form-title3'>Cast:</p>
                    <input className='form-info3'
                        type="text"
                        name="cast"
                        value={formData ? formData.cast : ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div lassName='form-evrything'>
                    <p className='form-title3'>URL:</p>
                    <input className='form-info3'
                        type="text"
                        name="url"
                        value={formData ? formData.url : ''}
                        onChange={handleChange}
                        required
                    />
                </div >
                {showStatusOptions && (
                    <div lassName='form-evrything'>
                        <p className='form-title3'>Status:</p>
                        <select className='form-info3'
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
                 <div lassName='form-evrything'> 
                    <p className='form-title3'>Description:</p>
                    <textarea className='form-info3'
                        name="description"
                        value={formData ? formData.description : ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                {confirmDialog ? (
                    <div>
                        <p>Are you sure you want to change the status?</p>
                        <button className='admin-submit' onClick={handleConfirmStatusChange}>Yes</button>
                        <button className='admin-submit' onClick={handleCancelStatusChange}>No</button>
                    </div>
                ) : (
                    <div>
                        <button className='edit-form-btn' type="button" onClick={handleStatusChange}>Save</button>
                        <button  className='edit-form-btn' type="button" onClick={handleClose}>Close</button>
                    </div>
                )}
            </form>
        </div>
    </div>
    )
}

export default EditMovieForm;
