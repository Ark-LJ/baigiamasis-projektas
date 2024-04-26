import Navbar from '../layouts/Navbar.jsx'
import Footer from '../layouts/Footer.jsx'
import { useEffect } from 'react'
import AccountDetails from '../components/AccountDetails.jsx'
import { useOrderContext } from "../hooks/useOrderContext.js"
import { useAuthContext } from '../hooks/useAuthContext.js'

const UserDashboard = () => {
    const {orders, dispatch} = useOrderContext()
    const {user} = useAuthContext()
    useEffect(() => {
        const fetchOrders = async () => {
            if (user) {
                try {
                    const response = await fetch('/api/reservation', {
                        headers: {'Authorization': `Bearer ${user.token}`}
                    })
                    const json = await response.json()
                    if(response.ok) {
                        dispatch({type: 'SET_ORDER', payload: json})
                    }
                } catch (error) {
                    console.error('Error fetching orders:', error)
                }
            }
        }
        fetchOrders()
    }, [dispatch, user])
    
    if(!user) return null
        
    return (
        <>     
            <Navbar/>
                <div>
                    <h2 className='banner2'>MOVIES THAT I ORDERED</h2>
                    <div className='movie-orders-details'>
                        {orders && orders.map((order, index) => (
                            <AccountDetails key={order._id} order={order} index={index} />
                        ))}
                    </div>
                </div>
            <Footer/>
        </>
    )
}


export default UserDashboard;