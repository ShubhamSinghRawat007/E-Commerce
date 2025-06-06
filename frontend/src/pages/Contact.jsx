import React from 'react'
import Title from '../component/Title'
import { assets } from '../assets/assets'
import NewsLettterBox from '../component/NewsLetterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t' >
        <Title text1={'Contact'} text2={'Us'}/>
      </div>
      <div className='flex my-10 flex-col justify-center md:flex-row gap-10 mb-28' >
        <img src={assets.contact_img} alt="" className="w-full md:max-w-[480px]" />
        <div className='flex flex-col justify-center items-start gap-6' >
          <p className='font-semibold text-xl text-gray-600 ' >Our Store</p>
          <p className='text-gray-600' >Ground Floor, Asha Villa <br /> Harsholi, Bhowali<br/> Nanital, India, 263132 </p>
          <p className='text-gray-600' > Tel: +91-9393939393 <br /> mail: mail@example.com</p>
          <p className='font-semibold text-xl text-gray-600 ' >Careeers at forever</p>
          <p className='text-gray-600'>Learn more about our team ad job openings.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 '>Explore Jobs</button>
        </div>
      </div>
      <NewsLettterBox/>
    </div>
  )
}

export default Contact