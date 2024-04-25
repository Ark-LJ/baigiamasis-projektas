import { useState, useEffect } from "react"
import { useLogin } from "../hooks/useLogin.js"
import { useNavigate } from "react-router-dom"
import loadingImage from '../200w.gif'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, isLoading, error} = useLogin()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setTimeout(async () => {
            await login(email, password)
            setLoading(false)
            const user = JSON.parse(localStorage.getItem('user'))
            console.log(user.role)
            if (user && user.role === 'admin') {
                navigate('/admindashboard');
            } else {
                navigate('/');
            }
        }, 1370)
    }

    const handleSignUpClick = () => {
        navigate('/signup');
    }
    
    useEffect(() => {
    const timeout = setTimeout(() => {
        setLoading(false);
    }, 1500)
    
    return () => clearTimeout(timeout)
    }, [])
    return (
        <div className="login_div">
            {(loading) && (
            <div className='loading-gif'>
                <img src={loadingImage} alt="Loading Cage" />
            </div>
            )}
            <div className="kasete">
                <form className="login" onSubmit={handleSubmit}>
                    <h2 className="sign">LOGIN</h2>
                    <div className="login_label login_email">
                            <label htmlFor="email">E-mail:</label>
                            <input
                                className="l_label"
                                type="email"
                                placeholder="E-mail"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                    </div>
                    <div className="login_label  login_password">
                        <label htmlFor="password">Password:</label>
                        <input
                            className="l_label"
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                        <button type="submit" className="login_navig button" disabled={isLoading}>LOGIN</button>
                        {error && <div className="error_warning">{error}</div>}
                </form>
                <button className="signup_navig button" onClick={handleSignUpClick}>SIGN UP</button>
            </div>
        </div>
    );
}
 
export default Login;