import React from 'react'
import UserOrders from '../features/user/components/UserOrders'
import Navbar from '../navbar/Navbar';

const UserOrdersPage = () => {
  return (
    <div>
        <Navbar/>
            <UserOrders/>
        
    </div>
  )
}

export default UserOrdersPage