import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()

        if (!email && !password) {
            setLoginError('You must enter your e-mail address and password.')
            return
        }

        if (!email) {
            setLoginError('You must enter an email address.')
            return
        }

        if (!password) {
            setLoginError('You must enter a password.')
            return
        }

        try {
            const response = await axios.post('/api/user/', { email, password })
                console.log('Login successful:', response.data)
                navigate('/admindashboard')
        } catch (error) {
            setLoginError(error.response.data.error)
        }

        setEmail('')
        setPassword('')
    }

    return (
     
        <div className="login_div">
      
        <div className="kasete">
        
                <form onSubmit={handleLogin} className="login_form">
                    <h2 className="sign">LOGIN</h2>
                <div className="login_label login_email">
                    <label htmlFor="email">E-mail:</label>
                        <input className="l_label"
                            type="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                </div>
                <div className="login_label  login_password">
                    <label htmlFor="password" >Password:</label>
                        <input className="l_label"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    
                    <button type="submit" className="login_navig button">LOGIN</button> 
                    <button className="signup_navig button">SIGN UP</button>{/* nepajungtas button */}
                    {loginError && <p className="error_warning">{loginError}</p>}
                </form>
        </div>
    </div>
    )
}

export default Login;
