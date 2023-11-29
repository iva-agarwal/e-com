import React from 'react'
import ProductList from '../products/components/ProductList'
import Landing from '../features/Landing'
import Navbar from '../navbar/Navbar'
const Home = () => {
  return (
    <div>
     
      <Landing/>
      
        <ProductList  />
    </div>
  )
}

export default Home