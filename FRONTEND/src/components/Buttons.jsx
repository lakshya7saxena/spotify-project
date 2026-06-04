import React from 'react'

import { Link } from 'react-router-dom'
const Buttons = () => {
    return (
        <div className=' w-1/2 h-1/3 flex flex-col justify-around items-center  '>
            <h1 className='text-6xl font-serif font-extrabold drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] tracking-wide'>Welcome to Spotify</h1>
            <div className='w-full flex justify-center gap-10'>
                <Link to="/signup" className='w-fit px-5 py-3 bg-[#1dd760] text-black font-bold rounded-full active:scale-95 cursor-pointer'>Sign Up</Link>
                <Link to="/login" className='w-fit px-5 py-3 bg-[#1dd760] text-black font-bold rounded-full active:scale-95 cursor-pointer'>Log In</Link>
            </div>
        </div>
    )
}

export default Buttons