import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { fastapiURL } from '../App'
import { backendUrl } from '../App'
import SecondaryNavbar from '../component/ChartBar'
import {assets} from '../assets/assets'

import { currency } from '../App'
import InsightsDataTable from '../component/InsightDataTable'


const Insights = ({token}) => {

    const [insight, setInsightsList] = useState([])
    const [insightData, setInsightData] = useState([])
    const [active, setActive] = useState("")

    const fetchAllInsights = async()=>{
        try {
            if(!token){
                return null
              }
          const response = await axios.get(backendUrl + '/api/insights/all', {headers:{token}})
          
          if(response.data.success){
            setInsightsList(response.data.insights)
          }else{
            toast.error(response.data.message)
          }
        } catch (error) {
          toast.error(error.message)
          
        }
      }

    const getInsights = async (id)=>{
    try {

        const response = await axios.post(fastapiURL + '/insights-data', {_id: id} ,{headers:{"Authorization": `Bearer ${token}`}})
        
        if(response.data.success){
        
        
        toast.success(response.data.message);
        setInsightData(response.data.data);
        
        }else{
        toast.error(response.data.message)
        }
        setActive(id)
    } catch (error) {
        toast.error(error.message)
        
    }
    }

    useEffect(()=>{
        fetchAllInsights()
      },[])
    

  return (
    <>
    <SecondaryNavbar charts={insight} getChart={getInsights} active={active}/>
    <div className="container mx-auto px-4 height-100 width-100">
    <h2 className="text-center text-2xl font-bold mb-6">Insights Dashboard</h2>
    <div className="flex flex-wrap -mx-4" id="insights">

    {!insightData.length ? (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-4">
      <span className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed"><span className="prata-regular text-8xl sm:py-3 lg:text-7xl leading-relaxed">I</span>nsights<br/>of <span className="prata-regular text-8xl sm:py-3 lg:text-7xl leading-relaxed">B</span>usiness</span>
      <img src={assets.insights}/>
        </div>):(<InsightsDataTable Data={insightData}/>)
        }

    </div>

    </div>


    </>
    );
};

export default Insights;