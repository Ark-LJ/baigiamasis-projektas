import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login.js'
import Signup from './pages/Signup/Signup.js'
import Main from './pages/Main.jsx'
import Error from './pages/Error.js'
import Complete from './pages/Complete.js'
import AdminDashboard from './pages/AdminDashboard.js'
import UserDashboard from './pages/UserDashboard.js'
import { useAuthContext } from './hooks/useAuthContext.js'
import AdminReservationList from './components/AdminReservationList.js';


function App() {
  const {user} = useAuthContext()
  const isAdmin = user && user.role === 'admin'
  
  return (
    <>
      <div className="App">
        <div className={'inner-container'}>
        <BrowserRouter>
          <div className="pages">
            <Routes>
              <Route 
                path='/'
                element={user ? <Main /> : <Navigate to="/login" />}
              />
              <Route 
                path='/login'
                element={!user ? <Login/> : <Navigate to="/" />}
              />
              <Route 
                path='/signup'
                element={!user ? <Signup/> : <Navigate to="/" />}
              />
              <Route
                path='/admindashboard'
                element={isAdmin ? <AdminDashboard /> : <Navigate to="/" />}
              />
              <Route 
                path='/account'
                element={user ? <UserDashboard /> : <Navigate to="/login" />}
              />
              <Route
                  path='/admin-reservations'
                  element={isAdmin ? <AdminReservationList /> : <Navigate to="/" />}
                />
              <Route 
                path='/complete'
                element={user ? <Complete /> : <Navigate to="/login" />}
              />
              <Route 
                path='*'
                element={<Error />}
              />
            </Routes>
          </div>
        </BrowserRouter>
        </div>
      </div>
    </>
  )
}

export default App;
