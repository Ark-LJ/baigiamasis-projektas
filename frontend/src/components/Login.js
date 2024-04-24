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
        <div>
            <h2>Log In</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">E-mail:</label>
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {loginError && <p>{loginError}</p>}
                <button type="submit">Log In</button>
            </form>
        </div>
    )
}

export default Login;
