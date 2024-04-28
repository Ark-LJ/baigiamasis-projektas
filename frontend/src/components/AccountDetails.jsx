import { useAuthContext } from "../hooks/useAuthContext.js"
import { useOrderContext } from "../hooks/useOrderContext.js"
import { useState, useEffect } from "react"

const AccountDetails = ({order, index}) => {
    const { dispatch } = useOrderContext()
    const {user} = useAuthContext()
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(`/api/movies/${order.movie_id}`)
                if (response.ok) {
                    const movieData = await response.json()
                    setMovie(movieData)
                } else {
                    throw new Error('Failed to fetch movie')
                }
            } catch (error) {
                console.error('Error fetching movie:', error)
            }
        };
        fetchMovie()
    }, [order.movie_id])

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
    })

    return (
        <>
            <table className="ordered-list">
                <tbody>
                    <tr className='ordered-list-item'>
                        <td>
                            <div className='movie-split'>
                                <span className="number">#{index + 1}</span>
                                <span className="movie-name">{movie ? movie.title : 'Loading...'}</span>   
                            </div>
                        </td>
                        <td>
                            <span className="order-date">{createdAtDate}</span>
                        </td>
                        <td>
                            <div>
                                <button className="edit"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clipRule="evenodd"></path><path fillRule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clipRule="evenodd"></path></svg></button>
                                <button className="delete" onClick={handleClick}><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z"></path></g></svg></button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>

    )   
}

export default AccountDetails
