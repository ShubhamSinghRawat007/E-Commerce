import React, { useState } from 'react'
import { backendUrl } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'
const Login = ({setToken}) => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')


    const onSubmitHandler = async (e)=>{
        try {
            
            e.preventDefault()
            const response = await axios.post(backendUrl + '/api/user/admin' , {email,password})
            if(response.data.success){
                setToken(response.data.token)
            }else{
                toast.error(response.data.message)
            }
           
            
            
        } catch (error) {
            toast.error(error.message)
        }
    }
  return (
    <div className='min-h-screen flex items-center w-full justify-center'>
        <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md' >
            <h1 className='text-2xl font-bold mb-4
            '>Admin Panel</h1>
            <form onSubmit={onSubmitHandler}  >
                <div className='mb-3 min-w-72' >
                    <p className='text-sm font-medium mb-2 text-gray-700' >Email Adress</p>
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} className='rounded-md outline-none w-full px-3 py-2 border border-gray-300' type="email" placeholder='your@email.com' required />
                </div>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium mb-2 text-gray-700'>Password</p>
                    <input onChange={(e)=>setPassword(e.target.value)} value={password} className='rounded-md outline-none w-full px-3 py-2 border border-gray-300' type="password" placeholder='Enter your password' required />
                </div>
                <div>
                    <button className='mt-2 bg-black  text-white w-full py-2 px-4 rounded-md '  type='submit' >Login</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login