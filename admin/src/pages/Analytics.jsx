import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { fastapiURL } from '../App'
import { backendUrl } from '../App'
import RightSidebar from '../component/ChartBar'

const Analytics = ({token}) => {

    const [charts, setList] = useState([])

    const fetchAllCharts = async()=>{
        try {
            if(!token){
                return null
              }
          const response = await axios.get(backendUrl + '/api/charts/all', {headers:{token}})
          
          if(response.data.success){
            setList(response.data.charts)
          }else{
            toast.error(response.data.message)
          }
        } catch (error) {
          toast.error(error.message)
          
        }
      }

    const getChart = async (id)=>{
    try {

        const response = await axios.post(fastapiURL + '/visualize', {_id: id} ,{headers:{"Authorization": `Bearer ${token}`}})
        
        if(response.data.success){
        const imgTag = document.createElement("img");
        imgTag.src = "data:image/jpeg;base64," + response.data.image;  // Use Base64 data
        let mycomponent = document.getElementById("analytics")
        mycomponent.innerHTML= "";
        mycomponent.appendChild(imgTag);
        }else{
        toast.error(response.data.message)
        }
    } catch (error) {
        toast.error(error.message)
        
    }
    }

    useEffect(()=>{
        fetchAllCharts()
      },[])
    

  return (
    <>
    <RightSidebar charts={charts} getChart={getChart}/>
    <div className="container mx-auto px-4 height-100 width-100">
    <h2 className="text-center text-2xl font-bold mb-6">Analytics Dashboard</h2>
    <div className="flex flex-wrap -mx-4" id="analytics">
      <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">Visualize<br/>the Business</h1>
    </div>

    </div>


    </>
    )
}

export default Analytics;