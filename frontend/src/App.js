import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './components/Login.js'
import Signup from './components/Signup.js'
import Main from './pages/Main.jsx'
import Error from './components/Error.js'
import Complete from './components/Complete.js'
import AdminDashboard from './components/AdminDashboard.js'
import { useAuthContext } from './hooks/useAuthContext.js'


function App() {
  const {user} = useAuthContext()
  const isAdmin = user && user.role === 'admin';
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
                path='/complete'
                element={<Complete />}
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
