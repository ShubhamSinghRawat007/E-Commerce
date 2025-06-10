import React from 'react'
import Title from '../component/Title'
import { assets } from '../assets/assets'
import NewsLettterBox from '../component/NewsLetterBox'

const About = () => {
  return (
    <div>

      <div className="text-2xl text-center pt-8 border-t " >
        <Title text1={'About'} text2={'Us'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16 ' >
        <img src={assets.about_img} className='w-full md:max-w-[450px]' alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600' >
          <p>StyleVerse is a brand for those who can think beyond the confines of what is? and imagine what if?
Through our unique approach to fabrics, design, color, and aesthetics, we transform and reshape perceptions, challenging conventional fashion. We're constantly creating something new and unexpected. Our aesthetic embraces the absurd and the surreal.
</p>
          <p>StyleVerse makes room for people to break free from the limitations of their world and escape into an alternate reality through our lens. Our love is interwoven between the threads of each product we make.</p>
          <b className='text-gray-800 ' >Our Mission</b>
          <p>Through our unique approach to fabrics, design, color, and aesthetics, we transform and reshape perceptions, challenging conventional fashion.!</p>
        </div>
      </div>

      <div className="text-xl py-4 ">
        <Title text1={'Why'} text2={'Choose Us'}/>
      </div>
      
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16  py-8 md:py-20 flex flex-col gap-5 ">
          <b>Quality Assurance:</b>
          <p className='text-gray-600' >We meticulously select fabrics and employ rigorous quality checks to ensure every garment meets our high standards. We believe in clothing that not only looks good but also stands the test of time.</p>
        </div>
      
      <div className="border px-10 md:px-16  py-8 md:py-20 flex flex-col gap-5 ">
          <b>Convenience:</b>
          <p className='text-gray-600' >We understand your busy life. That's why we've designed our online store to be intuitive and easy to navigate. From browsing our collections to secure checkout and swift delivery, we strive to make your shopping experience seamless and enjoyable.</p>
        </div>
        <div className="border px-10 md:px-16  py-8 md:py-20 flex flex-col gap-5 ">
          <b>Exceptional Customer Support:</b>
          <p className='text-gray-600' >Your satisfaction is our top priority. Our dedicated customer support team is here to assist you with any questions, concerns, or feedback you may have. We're committed to providing prompt, friendly, and helpful service every step of the way.</p>
        </div>
    </div>
    <NewsLettterBox/>
    </div>
  )
}

export default About