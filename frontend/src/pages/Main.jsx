// import { useEffect, useState } from "react" fetchint info is DB
// import { useRent } from './hooks/useRent.js

// Iškomentuoti nes dar nežinom kaip imsim duomenis.
const Main = () => {
    // const [movies, setMovies] = useState([])
    // const [error, setError] = useState(null)
    // useEffect(() => {
    // const fetchMovies = async () => {
    //     const response = await fetch(`/api/movies`)
    //     const json = await response.json()
    //     if(response.ok) {
    //         setMovies(json)
    //     }
    //     if(!response.ok) {
    //         setError(json.error)
    //         console.log(error)
    //     }
    //     fetchMovies()
    //   }
    // }, [])
    
    // Very wishy washy post'as. Ir reik pridėt authentication dėl šito
    // const handleAddToRent = async () => {
    //     const filmas = {title, id, banner_path}
    //     const response = await fetch('/api/rent', {
    //         method: 'POST',
    //         body: JSON.stringify(filmas),
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${user.token}`
    //         }
    //     })
    //     const json = await response.json()
    //     if(!response.ok) {
    //         setError(json.error)
    //     }
    //     if(response.ok) {
    //         console.log('Filmas išnuomuotas', json)
    //         dispatch({type: 'CREATE_RENT', payload: json})
    //     }
    // }
    return (
        <div className="main">
            {/* <h1>MOVIES THAT IS YOUR RIDE OR DIE.</h1>
            <div className="search-container">
                <input type="text" className='search-input' placeholder='Movie'/>
            </div>
            <div className="movie-container">
            {
            movies.map(movie => {
                return (
                    <div className={'movies-list movie-item'} key={movie.id}>
                        <button className='rent' onClick={() => handleAddToRent(movie)}></button>
                        <img src={`./bannerio pathas/${movie.banner_path}`} alt="movie_banner" />
                        <h3>{movie.title}</h3>
                        </div>)
                    })
            }
            </div> */}
        </div>
    )
}

export default Main