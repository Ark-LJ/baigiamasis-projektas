import { useState } from "react"
import { useSignup } from "./useSignup.js"
import { useNavigate } from "react-router-dom"

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error} = useSignup()
    const navigate = useNavigate()

    const handleLoginClick = () => {
        navigate('/login');
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(email, password)
        setEmail('')
        setPassword('')
    }

    return (
        <div className="login_div">
            <div className="kasete">
                <h2 className="sign">SIGN UP</h2>
                <form className="signup" onSubmit={handleSubmit}>
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
                            type="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                    <button className="signup_navig button" onClick={handleLoginClick}>LOGIN</button>
                    <button type="submit" className="login_navig button">SIGN UP</button>
                    {error && <div className="error_warning">{error}</div>}
                </form>
            </div>
        </div>
    )
}
 
export default Signup;