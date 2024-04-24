import { useState } from "react";
import { useSignup } from "../hooks/useSignup.js";

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, isLoading, error} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(email, password)
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
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                    <button type="submit" className="login_navig button" disabled={isLoading}>SIGN UP</button>
                    {error && <div className="error">{error}</div>}
                </form>
            </div>
        </div>
    )
}
 
export default Signup;