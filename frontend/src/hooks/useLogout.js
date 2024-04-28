    import { useAuthContext } from "./useAuthContext.js"
    import { useOrderContext } from "./useOrderContext.js"

    export const useLogout = () => {
        const {dispatch} = useAuthContext()
        const {dispatch: orderDispatch} = useOrderContext()

        const logout = () => {
            localStorage.removeItem('user')
            dispatch({type: 'LOGOUT'})
            orderDispatch({type: 'SET_ORDER', payload: null})
        }
        return {logout}
    }