import React from 'react'

const RightSidebar = ({charts, getChart}) => {
    
  return (
    <>
    <div className='flex items-center py-2 px-[45]' >
            {charts.map((chart, index)=>(

            <button key={index} className="flex items-center gap-3  px-3 py-2 rounded-l " onClick={()=>getChart(chart._id)} >
               <p className='hidden md:block' >{chart.name}</p>
            </button>

            ))}
    </div>
    </>
  )
}

export default RightSidebar