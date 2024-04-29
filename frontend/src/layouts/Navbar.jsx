import logo from "../components/images/logo.png"
import { useLogout } from "../hooks/useLogout.js"
import { useAuthContext } from "../hooks/useAuthContext.js"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
    const {user} = useAuthContext()
    const {logout} = useLogout()
    const isAdmin = user && user.role === 'admin';
    const navigate = useNavigate()
    const handleClick = () => {
        logout()
    }
    const handleDashboardClick = () => {
        navigate('/admindashboard')
    }
    const handleReturnMainClick = () => {
        navigate('/')
    }
    const handleAccountClick = () => {
        navigate('/account')
    }
    return (
        <header>
            <div className="container">
                <div className="logo">
                    <img src={logo} alt="Logo" style={{width: '150%'}}/>
                </div>
                <div className="all-btn">
                <nav className="all-btn">
                    {(user && isAdmin) && (
                        <div>
                            <button className="adminBtn" onClick={handleDashboardClick}>Admin Dashboard</button>
                        </div>
                    )} 
                    {user && (
                        <>
                        <div>
                            <button className="navBtn" onClick={handleReturnMainClick}>Main</button>
                        </div>
                            <div><button className="navBtn" onClick={handleClick}
                            >Log Out</button></div>
                        </>
                    )}
                </nav>
              </div>
            </div>
        </header>
    )
}

export default Navbar