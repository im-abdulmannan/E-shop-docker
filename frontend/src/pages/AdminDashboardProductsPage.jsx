import React from 'react'
import AdminProducts from "../components/Admin/AdminProducts"
import AdminHeader from '../components/Admin/Layout/AdminHeader'
import AdminSidebar from '../components/Admin/Layout/AdminSidebar'

const AdminDashboardProductsPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSidebar active={5} />
          </div>
          <AdminProducts />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardProductsPage