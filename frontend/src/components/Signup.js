import { useState } from 'react';

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [signupError, setSignupError] = useState('')

    const handleLogin = (e) => {
        e.preventDefault()

        const passwordRegex = /^(?=.*[0-9]).{8,}$/
        if (!passwordRegex.test(password)) {
            setSignupError('Password must contain at least one number and be at least 8 characters long.')
            return
        }

        const isEmailRegistered = (email) => {
            const registeredEmails = ['test@gmail.com', 'example@yahoo.com']
            return registeredEmails.includes(email)
        }

        if (!email && !password) {
            setSignupError('You must enter your e-mail address and password.')
            return
        }

        if (!email) {
            setSignupError('You must enter an email address.')
            return
        }

        if (!password) {
            setSignupError('You must enter a password.')
            return
        }

        if (isEmailRegistered(email)) {
            setSignupError('This email address is already registered.')
            return
        }

        console.log('Registracijos informacija:', { email, password })
        setEmail('')
        setPassword('')
        setSignupError('')
    }

    return (
        <div>
       <h2>Sign Up</h2>
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
            {signupError && <p>{signupError}</p>}
            <button type="submit">Sign Up</button>
         </form>
      </div>
    )
}

export default Signup;
