import React from 'react'
import Footer from '../../components/Layout/Footer'
import Header from '../../components/Layout/Header'
import ShopOrderDetails from "../../components/Shop/ShopOrderDetails"

const ShopOrderDetailsPage = () => {
  return (
    <div>
        <Header />
        <ShopOrderDetails />
        <Footer/>
    </div>
  )
}

export default ShopOrderDetailsPage