import React, { useEffect, useState } from 'react'
import Navbar from './component/Navbar'
import Sidebar from './component/Sidebar'
import { Route,Routes } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Analytics from './pages/Analytics'
import Insights from './pages/Insights'
import Home from './pages/Home'
import Login from './component/login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const fastapiURL = import.meta.env.VITE_FASTAPI_URL

export const currency = "$"
const App = () => {

  const [token, setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):'')

  useEffect(()=>{
    localStorage.setItem('token',token)

  },[token])

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer/>
      {token===""?<Login setToken={setToken} /> :
      <>
      <Navbar setToken={setToken} />
      <hr />
      <div className='flex w-full' >
      <Sidebar/>
      <div className='w-[75%] mx-auto ml-[max(1vw,25px)] my-8 text-gray-600 text-base ' >
        <Routes>
          <Route path='/' element={<Home token={token} />} />
          <Route path='/add' element={<Add token={token} />} />
          <Route path='/list' element={<List token={token} />} />
          <Route path='/orders' element={<Orders token={token} />} />
          <Route path='/analytics' element={<Analytics token={token}/>} />    
          <Route path='/insights' element={<Insights token={token}/>} />      
        </Routes>
      </div>
      </div>
      </>
      }
    </div>
  )
}

export default App