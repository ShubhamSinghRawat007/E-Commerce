import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { fastapiURL } from '../App'
import { backendUrl } from '../App'
import SecondaryNavbar from '../component/ChartBar'
import {assets} from '../assets/assets'

const Home = ({token}) => {

    const [insights, setList] = useState([])

    const fetchAllInsights = async()=>{
        try {
            if(!token){
                return null
              }
          const response = await axios.post(fastapiURL + '/insights/',{}, { headers: { Authorization: `Bearer ${token}` }  })
          
          if(response.data.success){
            setList(response.data.insights)
          }else{
            toast.error(response.data.message)
          }
        } catch (error) {
          toast.error(error.message)
          
        }
      }

    useEffect(()=>{
        fetchAllInsights();
      },[])
    

  return (
    <>


    <div className="container mx-auto px-4 height-100 width-100">
        <h1 className="text-center text-6xl font-bold mb-14">Admin Panel</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
       
        {insights.map((item,index)=>(
        <div className="flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow-sm  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 w-auto max-w-sm" key = {index}>
            <span className="text-8xl sm:py-3 lg:text-7xl leading-relaxed" >{item.emoji_decimal}</span>
            <div className="flex flex-col justify-between p-4">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.value}</p>
            </div>
        </div>))}

        </div>
    </div>
    </>
    )
}

export default Home;