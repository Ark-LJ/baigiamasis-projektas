import { useState } from 'react';
import axios from 'axios';

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
        <div className="modal">
            <div className="modal-content">
                <div className='modal-top'>
                    <img src={`${movie.url}`} alt="movie_banner" />
                    <div className='text-container'>
                        <h2>{movie.title}</h2>
                        {isEditing ? (
                            <div className='contents-container'>
                                <div>
                                    <p>Url</p>
                                    <input
                                        type="text"
                                        name="url"
                                        value={editedMovie.url}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <p>Year</p>
                                    <input
                                        type="number"
                                        name="release_year"
                                        value={editedMovie.release_year}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <p>Genre</p>
                                    <input
                                        type="text"
                                        name="genres"
                                        value={editedMovie.genres}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <p>Directed By</p>
                                    <input
                                        type="text"
                                        name="director"
                                        value={editedMovie.director}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <p>IMDB</p>
                                    <input
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
                                    <p>Year</p>
                                    <div>{movie.release_year}</div>
                                </div>
                                <div>
                                    <p>Genre</p>
                                    <div>{movie.genres.join(', ')}</div>
                                </div>
                                <div>
                                    <p>Directed By</p>
                                    <div>{movie.director.join(', ')}</div>
                                </div>
                                <div>
                                    <p>IMDB</p>
                                    <div>{movie.imdb_rating} / 10</div>
                                </div>
                            </div>
                        )}
                        <p>Cast</p>
                        {isEditing ? (
                            <input
                                type="text"
                                name="cast"
                                value={editedMovie.cast}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <div>{movie.cast.join(', ')}</div>
                        )}
                        <p>Storyline</p>
                        {isEditing ? (
                            <textarea
                                name="description"
                                value={editedMovie.description}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <div>{movie.description}</div>
                        )}
                    </div>
                </div>
                <div className='modal-bottom'>
                    <div className='button-container'>
                        {isEditing ? (
                            <>
                                <button className="close" onClick={handleEditSubmit}>Submit</button>
                                <button className="close" onClick={() => setIsEditing(false)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <button className="close" onClick={() => setIsEditing(true)}>EDIT</button>
                                <button className="close" onClick={handleDelete}>DELETE</button>
                            </>
                        )}
                        <button className="close" onClick={closeModal}>Go Back</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminModal