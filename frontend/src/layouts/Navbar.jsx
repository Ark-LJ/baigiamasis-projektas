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
                    <img src={logo} alt="Logo" />
                </div>
                <nav>
                    {(user && isAdmin) && (
                        <div>
                            <button className="admindashboard" onClick={handleDashboardClick}>Admin Dashboard</button>
                        </div>
                    )}
                    {(user && !isAdmin) && (
                        <div>
                            <button className="accountbutton" onClick={handleAccountClick}>Account</button>
                        </div>
                    )}
                    {user && (
                        <div>
                            <button className="mainBtn" onClick={handleReturnMainClick}>Main</button>
                            <button className="logoutBtn" onClick={handleClick}>Log Out</button>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar