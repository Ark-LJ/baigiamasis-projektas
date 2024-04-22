import { Link } from "react-router-dom"
import logo from "./images/logo.jpg"

const Navbar = () => {
    return (
        <header>
            <div className="container">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <nav>
                    <div>
                        <Link to='/'>Login</Link>
                        <Link to='/signup'>Signup</Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Navbar