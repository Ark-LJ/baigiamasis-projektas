import { OrderContext } from "../context/OrderContext.js"
import { useContext } from "react"

export const useOrderContext = () => {
    const context = useContext(OrderContext)
    if(!OrderContext) {
        throw Error('useOrderContext turi būti OrderContextProvider viduje')
    }
    return context
}