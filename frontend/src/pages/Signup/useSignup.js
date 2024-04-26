import { useState } from "react"
import { useAuthContext } from "../../hooks/useAuthContext.js"

export const useSignup = () => {
    const [error, setError] = useState(null)
    const {dispatch} = useAuthContext()

    const signup = async (email, password) => {
        setError(null)
        if (!email && !password) {
            setError('You must enter your e-mail address and password.')
            return
        }
        
        if (!password) {
            setError('You must enter a password.')
            return
        }

        const passwordRequired = /^(?=.*[0-9]).{8,}$/
        if (!passwordRequired.test(password)) {
            setError('Password must contain at least one number and be at least 8 characters long.')
            return
        }

        if (!email) {
            setError('You must enter an email address.')
            return
        }

        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
        }

        if(response.ok) {
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({type: 'LOGIN', payload: json})
        }
    }
    return {signup, error}
}