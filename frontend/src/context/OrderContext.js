import { createContext, useReducer } from 'react'

export const OrderContext = createContext()

export const orderReducer = (state, action) => {
    switch(action.type) {
        case 'EDIT_ORDER':
            return {orders: action.payload}
        case 'CREATE_ORDER':
            return {orders: [action.payload, ...state.orders]}
        case 'DELETE_ORDER':
            return {
                orders: state.orders.filter(order => order._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const OrderContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(orderReducer, {
        orders: null
    })

    return (
        <OrderContext.Provider value={{...state, dispatch}}>
            {children}
        </OrderContext.Provider>
    )
}
