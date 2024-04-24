import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'
import first from "./movies/Image20240423125111.jpg"
import second from "./movies/Image20240423125116.jpg"
import third from "./movies/Image20240423125120.jpg"
import fourth from "./movies/Image20240423125125.jpg"
import top from "./movies/start.png"
import star from "./movies/star2.png"



const Main = () => {
    return (
    < >
        <Navbar />
        <div className="main">
            <div className='top-part'>
            <h1>MOVIES THAT IS YOUR RIDE OR DIE.</h1>
            <img src={top} className='star' alt="movie_banner" />
            <img src={star} className='star2' alt="movie_banner" />

            </div>
            <div className='movie-top'>
                <ul className='movie-recomended'>
                    <li ><strong className='number'>#1</strong>Schindler's List</li>
                    <li ><strong className='number'>#2</strong>Toy Story</li>
                    <li ><strong className='number'>#3</strong>Titanic</li>
                    <li ><strong className='number'>#4</strong>Men in Black</li>
                    <li ><strong className='number'>#5</strong>Forrest Gump</li>
                </ul>
            </div>

            <div>
                <h2>MOVIES THAT I ORDERED</h2>
                <div className='movie-orders'>
                    <ul class="ordered-list">
                       <li>
                             <span class="number">#1</span> 
                             <span class="movie-name">Toy Story</span> 
                             <span class="order-date">2013/06/13</span> 
                             <button class="btn-1">Edit order</button>
                             <button class="btn-2">Delete my order</button>
                      </li>
                      <li>
                             <span class="number">#2</span> 
                             <span class="movie-name">Toy Story</span> 
                             <span class="order-date">2013/06/13</span> 
                             <button class="btn-1">Edit order</button>
                             <button class="btn-2">Delete my order</button>
                      </li>
                      <li>
                             <span class="number">#3</span> 
                             <span class="movie-name">Toy Story</span> 
                             <span class="order-date">2013/06/13</span> 
                             <button class="btn-1">Edit order</button>
                             <button class="btn-2">Delete my order</button>
                      </li>
                      <li>
                             <span class="number">#4</span> 
                             <span class="movie-name">Toy Story</span> 
                             <span class="order-date">2013/06/13</span> 
                             <button class="btn-1">Edit order</button>
                             <button class="btn-2">Delete my order</button>
                      </li>
                      <li>
                             <span class="number">#5</span> 
                             <span class="movie-name">Toy Story</span> 
                             <span class="order-date">2013/06/13</span> 
                             <button class="btn-1">Edit order</button>
                             <button class="btn-2">Delete my order</button>
                      </li>
                   </ul> 
                </div>
            </div>

            <div className="search-container">
                <button className='get-movies'>
                    All Movies
                </button>
                <input type="text" className='search-input' placeholder='Movie'/>
            </div>
            <div className="movie-container">
                    <div className={'movies-list movie-item'}>
                        <img src={first} alt="movie_banner" />
                        <img src={second} alt="movie_banner" />
                        <img src={third} alt="movie_banner" />
                        <img src={fourth} alt="movie_banner" />
                    </div>
            </div>
        </div>
     <Footer />
    </>
    )
}
export default Main