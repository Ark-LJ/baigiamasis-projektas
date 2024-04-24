import { useAuthContext } from "./useAuthContext.js"
// import { useMovieContext } from "./useMovieContext.js"

export const useLogout = () => {
    const {dispatch} = useAuthContext()
    // const {dispatch: movieDispatch} = useMovieContext()

    const logout = () => {
        localStorage.removeItem('user')
        dispatch({type: 'LOGOUT'})
        // movieDispatch({type: 'SET_MOVIES', payload: null})
    }
    return {logout}
}