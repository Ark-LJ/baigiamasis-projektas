import { useState } from 'react';
import axios from 'axios';
import '../modalStyles.css';

const AdminModal = ({ movie, closeModal, updateMovies }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedMovie, setEditedMovie] = useState({
        url: movie.url,
        title: movie.title,
        release_year: movie.release_year,
        genres: movie.genres.join(', '),
        director: movie.director.join(', '),
        imdb_rating: movie.imdb_rating,
        cast: movie.cast.join(', '),
        description: movie.description
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedMovie({
            ...editedMovie,
            [name]: value
        });
    };

    const handleEditSubmit = async () => {
        try {
            await axios.patch(`/api/movies/${movie._id}`, editedMovie)
            closeModal()
        } catch (error) {
            console.error('Failed to update movie:', error)
        }
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/movies/${movie._id}`)
            closeModal()
            updateMovies()
        } catch (error) {
            console.error('Failed to delete movie:', error)
        }
    };

    if (!movie) return null

    return (
        <div className="modal admin-modal">
            <div className="modal-content admin-modal-content">
                <div className='modal-top'>
                    <img className='form-img' src={`${movie.url}`} alt="movie_banner" />
                    <div className='text-container admin-text-container'>
                        <h2>{movie.title}</h2>
                        {isEditing ? (
                            <div className='edit-content admin-edit-content'>
                                <div className='edit-container admin-edit-container'>
                                    <p className="form-title">Url</p>
                                    < input className="form-info admin-form-info"
                                        type="text"
                                        name="url"
                                        value={editedMovie.url}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='edit-container admin-edit-container'>
                                    <p className="form-title">Year</p>
                                    <input className="form-info admin-form-info"
                                        type="number"
                                        name="release_year"
                                        value={editedMovie.release_year}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='edit-container admin-edit-container'>
                                    <p className="form-title">Genre</p>
                                    <input className="form-info admin-form-info"
                                        type="text"
                                        name="genres"
                                        value={editedMovie.genres}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='edit-container admin-edit-container'>
                                    <p className="form-title">Directed By</p>
                                    <input className="form-info admin-form-info"
                                        type="text"
                                        name="director"
                                        value={editedMovie.director}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='edit-container admin-edit-container'>
                                    <p className="form-title">IMDB</p>
                                    <input className="form-info admin-form-info"
                                        type="number"
                                        name="imdb_rating"
                                        value={editedMovie.imdb_rating}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className='contents-container'>
                                <div>
                                    <p className="form-title">Year</p>
                                    <div className="form-info admin-form-info">{movie.release_year}</div>
                                    <p className="form-title">Genre</p>
                                    <div className="form-info admin-form-info">{movie.genres.join(', ')}</div>
                                </div>
                                <div>
                                    <p className="form-title">Directed By</p>
                                    <div className="form-info admin-form-info">{movie.director.join(', ')}</div>
                                    <p className="form-title">IMDB</p>
                                    <div className="form-info admin-form-info">{movie.imdb_rating} / 10</div>
                                </div>
                            </div>
                        )}
                        <div className='edit-container admin-edit-container'>
                        <p className="form-title">Cast</p>
                        {isEditing ? (
                            <input className="form-info admin-form-info"
                                type="text"
                                name="cast"
                                value={editedMovie.cast}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <div className="form-info admin-form-info">{movie.cast.join(', ')}</div>
                        )}
                        </div >
                        <div className='edit-container admin-edit-container' >
                        <p className="form-title">Storyline</p>
                        {isEditing ? (
                            <textarea 
                                className="form-info admin-form-info"
                                name="description"
                                value={editedMovie.description}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <div className="form-info admin-form-info">{movie.description}</div>
                        )}
                        </div>
                    </div>
                </div>
                <div className='modal-bottom'>
                    <div className='button-container .admin-button-container'>
                        {isEditing ? (
                            <>
                                <button className="form-button" onClick={handleEditSubmit}>Submit</button>
                                <button className="form-button" onClick={() => setIsEditing(false)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <button className="form-button" onClick={() => setIsEditing(true)}>EDIT</button>
                                <button className="form-button" onClick={handleDelete}>DELETE</button>
                            </>
                        )}
                        <button className="form-button" onClick={closeModal}>Go Back</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminModal