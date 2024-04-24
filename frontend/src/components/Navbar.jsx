// import { Link } from "react-router-dom"
import logo from "./images/logo.png"
import { useLogout } from "../hooks/useLogout.js"
import { useAuthContext } from "../hooks/useAuthContext.js"
// import { useAdminAuthContext } from "../hooks/useAdminAuthContext.js"

const Navbar = () => {
    const {user} = useAuthContext()
    const {logout} = useLogout()
    const handleClick = () => {
        logout()
    }
    return (
        <header>
            <div className="container">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <nav>
                    {user && (
                        <div>
                            <button className="logoutBtn" onClick={handleClick}>Log Out</button>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar;
