import React from 'react'
import Footer from '../components/Layout/Footer'
import Header from '../components/Layout/Header'
import UserTrackOrder from "../components/Profile/UserTrackOrder"

const UserTrackOrderPage = () => {
  return (
    <div>
      <Header/>
      <UserTrackOrder />
      <Footer/>
    </div>
  )
}

export default UserTrackOrderPage