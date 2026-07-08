import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials = true
const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'
    await axios.post(`${backendUrl}/api/auth/login`, Object.fromEntries(formData)).then((res) => {
      alert("Logged In Successfully")
      e.target.reset()
      navigate('/');
    }).catch((err) => {
      alert("Server Is Down")
    })
  }
  return (
    <div className=' flex flex-col h-100 justify-around m-2 py-5 md:w-1/4 rounded-2xl px-10  bg-[#2e2f33]'>
      <h1 className='text-6xl font-extrabold text-center tracking-tight'>Log <span className='text-[#1dd760]'>In</span> </h1>
      <h1 className='text-xl text-center font-semibold '>Please Log in to continue</h1>
      <div>
        <form onSubmit={handleSubmit} className=' flex flex-col gap-7 items-center'>
          <input type="text" placeholder='Username' name='username' className="w-full pl-8 pr-4 py-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg transition-all
                         focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"/>
          <input type="password" placeholder='Password' name='password' className="w-full pl-8 pr-4 py-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg transition-all
                         focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"/>
          <button className='w-fit px-5 py-3 bg-[#1dd760] text-black font-bold rounded-full active:scale-95 cursor-pointer'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Login