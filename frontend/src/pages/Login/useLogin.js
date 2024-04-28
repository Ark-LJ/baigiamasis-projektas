import { useState } from "react"
import { useAuthContext } from "../../hooks/useAuthContext.js"

export const useLogin = () => {
    const [error, setError] = useState(null)
    const {dispatch} = useAuthContext()

    const login = async (email, password) => {
        setError(null)
        if (!email && !password) {
            setError('You must enter your e-mail address and password.')
            return
        }

        if (!email) {
            setError('You must enter an email address.')
            return
        }

        if (!password) {
            setError('You must enter a password.')
            return
        } 
        const response = await fetch('/api/user/login', {
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
    return {login, error}
}