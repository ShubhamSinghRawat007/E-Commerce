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
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam magni voluptatum obcaecati fugit hic alias maiores quidem amet saepe, in ipsum tenetur. Voluptas, quam fugiat mollitia culpa magnam aliquam quo repellendus hic dolores? Architecto enim ipsa possimus corporis sunt ducimus harum natus facilis tempore nemo expedita aspernatur, cumque amet delectus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, modi quas, excmaiores, harum, quis ipsa sit. Minima, natus.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur eum, explicabo magni molestias blanditiis ullam debitis voluptate rerum. Accusantium unde nostrum facere, vitae doloremque quam odit, sit voluptatibus atque et its quaerat minima. Tempora error eius perspiciatis?</p>
          <b className='text-gray-800 ' >Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, illum temporibus corporis necessitam perspiciatis vel magni facilis repellat, magnam ab deleniti, quia voluptates!</p>
        </div>
      </div>

      <div className="text-xl py-4 ">
        <Title text1={'Why'} text2={'Choose Us'}/>
      </div>
      
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16  py-8 md:py-20 flex flex-col gap-5 ">
          <b>Quality Assurance:</b>
          <p className='text-gray-600' >we Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis vero beatae nostrum? Hic aliquam, sit nulla pariatur doloribus architecto harum.</p>
        </div>
      
      <div className="border px-10 md:px-16  py-8 md:py-20 flex flex-col gap-5 ">
          <b>C0nvenience:</b>
          <p className='text-gray-600' >we Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis vero beatae nostrum? Hic aliquam, sit nulla pariatur doloribus architecto harum.</p>
        </div>
        <div className="border px-10 md:px-16  py-8 md:py-20 flex flex-col gap-5 ">
          <b>Exceptional Customer Support:</b>
          <p className='text-gray-600' >we Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis vero beatae nostrum? Hic aliquam, sit nulla pariatur doloribus architecto harum.</p>
        </div>
    </div>
    <NewsLettterBox/>
    </div>
  )
}

export default About