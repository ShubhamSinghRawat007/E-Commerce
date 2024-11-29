import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2 ' >
        <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px] ' >
            <NavLink className="flex items-center gap-3 border-gray-300 border-r-0 border px-3 py-2 rounded-l " to='/add' >
               <img src={assets.add_icon} className='' alt="" /> 
               <p className='hidden md:block' >Add Item</p>
            </NavLink>
            <NavLink className="flex items-center gap-3 border-gray-300 border-r-0 border px-3 py-2 rounded-l " to='/list' >
               <img src={assets.order_icon} className='' alt="" /> 
               <p className='hidden md:block' >List Items </p>
            </NavLink>
            <NavLink className="flex items-center gap-3 border-gray-300 border-r-0 border px-3 py-2 rounded-l " to='/orders' >
               <img src={assets.order_icon} className='' alt="" /> 
               <p className='hidden md:block' >Orders</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar