import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useOrderContext } from "../hooks/useOrderContext";

const MovieModal = ({ movie, closeModal }) => {
    const {dispatch, orders} = useOrderContext()
    const [error, setError] = useState(null)
    const {user} = useAuthContext()

    useEffect(() => {
        const timer = setTimeout(() => {
            setError(null);
        }, 1000);

        return () => clearTimeout(timer);
    }, [error]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!user) {
            setError('Būtina prisijungti');
            return;
        }
        const isMovieAlreadyOrdered = orders.some(order => order.movie_id === movie._id);
        if (isMovieAlreadyOrdered) {
            setError('This movie is already in your orders');
            return;
        }
        const order = { user_id: user.token, movie_id: movie._id };
        try {
            const response = await fetch('/api/reservation', {
                method: 'POST',
                body: JSON.stringify(order),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json();
            if (!response.ok) {
                setError(json.error);
            }
            if (response.ok) {
                console.log('Naujas order pridėtas', json);
                dispatch({ type: 'CREATE_ORDER', payload: json });
                closeModal();
            }
        } catch (error) {
            console.error('Error creating reservation:', error);
            setError('Error creating reservation. Please try again.');
        }
    };

    if (!movie) return null;

    return (
        <div className="modal">
            <div className="modal-content">
            <div className="modal-error" style={{ display: error ? 'block' : 'none' }}>
                    {error}
                </div>
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
                        <button className="close" onClick={handleSubmit}>Rent DVD</button>
                        <button className="close" onClick={closeModal}>Go Back</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieModal;