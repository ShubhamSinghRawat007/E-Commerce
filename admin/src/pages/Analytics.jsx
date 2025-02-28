import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { fastapiURL } from '../App'
import { backendUrl } from '../App'

const Analytics = ({token}) => {

    const [charts, setList] = useState([])

    const fetchAllCharts = async()=>{
        try {
            if(!token){
                return null
              }
          const response = await axios.get(backendUrl + '/api/charts/all', {headers:{token}})
          console.log(response.data);
          if(response.data.success){
            setList(response.data.charts)
          }else{
            toast.error(response.data.message)
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message)
          
        }
      }

    const getChart = async (id)=>{
    try {

        const response = await axios.post(fastapiURL + '/visualize', {_id: id} ,{headers:{"Authorization": `Bearer ${token}`}})
        
        if(response.data.success){
        toast.success(response.data.message)
        const imgTag = document.createElement("img");
        imgTag.src = "data:image/jpeg;base64," + response.data.image;  // Use Base64 data
        document.body.appendChild(imgTag);
        console.log(response.data)
        }else{
        toast.error(response.data.message)
        }
    } catch (error) {
        console.log(error);
        toast.error(error.message)
        
    }
    }

    useEffect(()=>{
        fetchAllCharts()
      },[])
    

  return (
    <>
    <div className="container mx-auto px-4">
    <h2 className="text-center text-2xl font-bold mb-6">Analytics Dashboard</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {
            charts.map((chart, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6 text-center">
                <h5 className="text-lg font-semibold">{chart.name}</h5>
                <p className="text-gray-600">{chart.desc}</p>
                <button onClick={()=>getChart(chart._id)} className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg ">View</button>
            </div>
            ))
        }

    </div>
</div>

    </>
    )
}

export default Analytics;