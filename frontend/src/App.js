import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import loadingImage from './200w.gif'
// import Login from './pages/Login.js'
// import Signup from './pages/Signup.js'
// import Main from './pages/Main.jsx'


function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000)
  
    return () => clearTimeout(timeout);
  }, [])

  return (
    <>
      <div className="App">
        {/* Jei pages(bet kuris) loadinasi uždės image */}
        {loading && (
          <div className='loading-gif'>
            <img src={loadingImage} alt="Loading Cage" />
          </div>
        )}
        {/* WIP, reikės pačekint ar galiu palikti tuščią class'ę div'ui, nes nenoriu perpildyti kodo nereikalingom clasėm */}
        <div className={(loading ? 'blur-content' : 'inner-container')}>
        <BrowserRouter>
          <Navbar />
          <div className="pages">
            {/* <Routes>
                <Route 
                  path='/'
                  element={<Login />}
                />
                <Route 
                  path='/signup'
                  element={<Signup />}
                />
            </Routes> */}
          </div>
        </BrowserRouter>
        </div>
      </div>
    </>
  )
}

export default App;
