import { useState } from "react"


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState('')

    const usersDatabase = [{ email: 'test@gmail.com', password: 'slaptazodis' }]
       

    const handleLogin = (e) => {
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

        const user = usersDatabase.find(user => user.email === email && user.password === password)

        if (user) {
            console.log('Prisijungta sėkmingai:', user)
            setLoginError('')
        } else {
            setLoginError('Invalid email or password.')
            return
        }

        console.log('Prisijungimo informacija:', { email, password })
        setEmail('')
        setPassword('')
        setLoginError('')
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
