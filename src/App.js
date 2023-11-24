import React, { useEffect } from 'react'
import{Counter} from './features/counter/Counter'
import './App.css'
import  Home  from './pages/Home'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import CartPage from './pages/CartPage'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Checkout from './pages/Checkout'
import ProductDetailPage from './pages/ProductDetailPage'
import Protected from './features/auth/Protected'
import { useDispatch, useSelector} from 'react-redux'
import { fetchItemsByUserIdAsync } from './features/cart/CartSlice'
import { selectLoggedInUser } from './features/auth/authSlice'
import PageNotFound from './pages/404'
import orderSuccess from './pages/orderSuccess'

const router = createBrowserRouter([
  {
    path: "/",
    element: (<Protected>
      <Home></Home>
      </Protected>),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/cart",
    element: <Protected>
      <CartPage />
    </Protected>,
  },
  {
    path: "/checkout",
    element:<Protected>
       <Checkout />
       </Protected>,
  },
  {
    path: "/product-detail/:id",
    element:<Protected>
       <ProductDetailPage />
       </Protected>,
  },
  {
    path: "*",
    element:
       <PageNotFound />
  },
  {
  path: "/order-success/:id",
  element:
     <orderSuccess />
},
]);
 
const App = () => {
  const dispatch =useDispatch();
  const user = useSelector(selectLoggedInUser)

  useEffect(()=>{
    if(user){
      dispatch(fetchItemsByUserIdAsync(user.id))
}
},[dispatch,user])
  
  
  return (
    <div className='App'>
          <RouterProvider router={router} />

    </div>
  )
}

export default App