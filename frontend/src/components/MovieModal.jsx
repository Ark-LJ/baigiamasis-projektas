import React from 'react';

const MovieModal = ({ movie, closeModal }) => {
    if (!movie) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <div className='modal-top'>
                    <img src={`${movie.url}`} alt="movie_banner" />
                    <div className='text-container'>
                        <h2>{movie.title}</h2>
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
                                <p>{movie.director.join(', ')}</p>
                            </div>
                            <div>
                                <p>IMDB</p>
                                <p>{movie.imdb_rating} / 10</p>
                            </div>
                        </div>
                        <p>Cast</p>
                        <div>{movie.cast.join(', ')}</div>
                        <p>Storyline</p>
                        <div>{movie.description}</div>
                    </div>
                </div>
                <div className='modal-bottom'>
                    <div className='button-container'>
                        <button className="close" onClick={closeModal}>Rent DVD</button>
                        <button className="close" onClick={closeModal}>Go Back</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieModal;