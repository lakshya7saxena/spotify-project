import React from 'react'
import home from "../assets/home.svg"
import logo from "../assets/logo.svg"
import axios from "axios"
import { Link } from 'react-router-dom'
const Navbar = () => {
  const handleLogOut = async() => {
    await axios.post("http://localhost:3000/api/auth/logout").then((res) => {
      alert("Logged Out Successfully")
    }).catch((err) => {
      alert("Server Is Down")
    })
  }
  return (
    <nav className='flex bg-black text-white justify-between items-center p-4'>
      <div className='flex gap-4 items-center'>
        <img src={logo} />
        <Link to='/' className='active:scale-95 cursor-pointer'><img src={home} width={20} /></Link>
      </div>
      <div className='flex gap-4'>
        <div>Premium</div>
        <div>Support</div>
        <div>Download</div>
      </div>
      <div className='flex gap-4 items-center'>
        <Link to='/signup' className='active:scale-95 text-lg cursor-pointer'>Sign up</Link>
        <Link to='/login' className='rounded-3xl py-2 px-4 active:scale-95 cursor-pointer bg-white text-black font-bold'>Log in</Link>
      </div>
    </nav>
  )
}

export default Navbar