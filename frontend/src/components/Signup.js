import { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [signupError, setSignupError] = useState('')
    const [signupSuccess, setSignupSuccess] = useState(false)

    const handleSignup = async (e) => {
        e.preventDefault()

        if (!email && !password) {
            setSignupError('You must enter your e-mail address and password.')
            return
        }

        const passwordRequired = /^(?=.*[0-9]).{8,}$/
        if (!passwordRequired.test(password)) {
            setSignupError('Password must contain at least one number and be at least 8 characters long.')
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

        try {
            const response = await axios.post('/api/user/signup', { email, password })
            console.log('Registration successful:', response.data)
            setSignupSuccess(true)
        } catch (error) {
            console.error('Registration failed:', error.response.data.error)
            setSignupError(error.response.data.error)
        }

        setEmail('')
        setPassword('')
    }

    return (
         //     <div>  TRINK JEI GERAI PERDARIAU.FUNKCIJAS.
    //    <h2>Sign Up</h2>
    //      <form onSubmit={handleLogin}>
    //        <div>
    //          <label htmlFor="email">E-mail:</label>
    //             <input
    //                 type="email"
    //                 placeholder="E-mail"
    //                 value={email}
    //                 onChange={(e) => setEmail(e.target.value)}
    //             />
    //        </div>
    //        <div>
    //          <label htmlFor="password">Password:</label>
    //             <input
    //                 type="password"
    //                 placeholder="Password"
    //                 value={password}
    //                 onChange={(e) => setPassword(e.target.value)}
    //             />
    //         </div>
    //         {signupError && <p>{signupError}</p>}
    //         <button type="submit">Sign Up</button>
    //      </form>
    //   </div>

<div className="login_div">
      
      <div className="kasete">
                <h2 className="sign">SIGN UP</h2>
              <form onSubmit={handleLogin} className="login_form">
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
                  
                  <button type="submit" className="signup_navig button">LOGIN</button>
                  <button className="login_navig button">SIGN UP</button>{/* nepajungtas button */}
                  {signupError && <p className="error_warning">{signupError}</p>}
              </form>
      </div>
      </div>
    )
}

export default Signup;
