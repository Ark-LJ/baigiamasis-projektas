// import { useEffect, useState } from "react" fetchint info is DB

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
    return (
        <div className="main">
            {/* <h1>Main Site</h1>
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