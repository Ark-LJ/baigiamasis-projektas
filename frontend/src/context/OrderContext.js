import { createContext, useReducer } from 'react'

export const OrderContext = createContext()

export const orderReducer = (state, action) => {
    switch(action.type) {
        case 'SET_ORDER':
            return {orders: action.payload}
        case 'CREATE_ORDER':
            return {orders: [...state.orders, action.payload]} // to add / append the orders ascending order. The new addition will go to the bottom of the list
        case 'DELETE_ORDER':
            return {
                orders: state.orders.filter(order => order._id !== action.payload._id)
            }
        case 'UPDATE_ORDER':
            const updatedOrders = state.orders.map(order => {
                if (order._id === action.payload._id) {
                    return action.payload
                }
                return order
            })
            return { orders: updatedOrders }
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
