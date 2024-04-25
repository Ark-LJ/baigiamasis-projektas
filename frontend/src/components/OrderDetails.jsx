import { useAuthContext } from "../hooks/useAuthContext.js"
import { useOrderContext } from "../hooks/useOrderContext.js"
import { useState, useEffect } from "react"

const OrderDetails = ({order, index}) => {
    const { dispatch } = useOrderContext()
    const {user} = useAuthContext()
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(`/api/movies/${order.movie_id}`);
                if (response.ok) {
                    const movieData = await response.json();
                    setMovie(movieData);
                } else {
                    throw new Error('Failed to fetch movie');
                }
            } catch (error) {
                console.error('Error fetching movie:', error);
            }
        };
        fetchMovie();
    }, [order.movie_id]);

    const handleClick = async () => {
        if(!user) { 
            return
        }
        const response = await fetch('/api/reservation/' + order._id, {
            method: 'DELETE',
            headers: {'Authorization': `Bearer ${user.token}`}
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_ORDER', payload: json})
        }
    }

    const createdAtDate = new Date(order.createdAt).toLocaleDateString('en-UK', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    return (
        <>
            <ul className="ordered-list">
                <li className='ordered-list-item'>
                    <div className='movie-split'>
                        <span className="number">#{index + 1}</span>
                        <span className="movie-name">{movie ? movie.title : 'Loading...'}</span>   
                    </div>
                        <span className="order-date">{createdAtDate}</span>
                    <div>
                        <button className="btn-1">Edit order</button>
                        <button className="material-symbols-outlined" onClick={handleClick}>delete</button>
                    </div> 
                </li>
            </ul>
        </>

    )   
}

export default OrderDetails
