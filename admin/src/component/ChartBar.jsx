import React, {useState} from 'react'

const SecondaryNavbar = ({charts, getChart, active}) => {
  
  return (
    <>
    <div className='flex items-center py-2 px-[45]' >
            {charts.map((chart, index)=>(

            <button key={index} className="flex items-center gap-3 px-3 py-2 " onClick={()=>getChart(chart._id)} >
               <p className='hidden md:block' Style={active==chart._id?"color: #c586A5":""}>{chart.name}</p>
            </button>

            ))}
    </div>
    </>
  )
}

export default SecondaryNavbar