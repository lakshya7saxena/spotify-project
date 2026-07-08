import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Home from "../assets/home.svg"
import Logo from "../assets/logo.svg"
const UploadSongs = () => {
    const [artist, setArtist] = useState("")
    const [flag, setFlag] = useState(false)
    
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        await axios.post("http://localhost:3000/api/music/create-music", formData).then((res) => {
            alert("Music Uploaded Successfully")
            e.target.reset()
        }).catch((err) => {
            alert("Server Is Down")
        })
    }
    
    const handleClick = () => {
        setFlag(!flag)
    }


    const handleLogOut = async () => {
        await axios.post("http://localhost:3000/api/auth/logout").then((res) => {
            alert("Logged Out Successfully")
            window.location.reload();
        }).catch((err) => {
            alert("Server Is Down")
        })
    }

    const getArtist = async (req, res) => {
        const data = await axios.get("http://localhost:3000/api/music/artist")
        setArtist(data.data.artist.username)
    }

    useEffect(() => {
        getArtist()
    }, [])


    return (
        <div className='h-full flex items-center justify-center w-full relative'>

            <nav className='md:text-2xl text-sm w-screen  absolute top-0  left-0 font-bold flex bg-black text-white justify-between items-center md:p-4 px-2 py-6'>
                <div className='flex md:gap-4 items-center'>
                    <img src={Logo} />
                    <img src={Home} width={20} />
                </div>
                <div className='flex md:gap-7 gap-5 md:mr-20'>
                    <div>Premium</div>
                    <div>Support</div>
                    <div>Download</div>
                </div>
                <button onClick={handleClick} className='bg-white cursor-pointer md:px-4 py-1 px-2 text-black capitalize rounded-md md:text-3xl'>{artist.slice(0, 1)}</button>
            </nav>
            {flag && (
                <div className='absolute top-16 right-2 mt-2 w-48 bg-[#0c0e28] border border-gray-700 rounded-xl shadow-xl z-50 py-1 overflow-hidden  duration-150 '>
                    <div className='px-4 py-2.5 border-b border-gray-700 text-lg text-gray-400'>Signed In as <br /> <span className='font-semibold text-gray-200'>{artist}</span> </div>
                    <button className='w-full text-left px-4 py-2 text-lg text-gray-300 hover:bg-gray-800 transition-colors'>Settings</button>
                    <button onClick={handleLogOut} className='w-full cursor-pointer text-left px-4 py-2 text-lg text-rose-400 hover:bg-rose-500/10 transition-colors font-medium border-t border-gray-700/50'>Logout</button>
                </div>
            )}


            <div className='h-120 flex flex-col mt-16  justify-around py-5 md:w-1/3 m-5 rounded-2xl px-10  bg-[#2e2f33]'>
                <h1 className='md:text-6xl text-5xl font-extrabold text-center leading-20 tracking-tight'>Upload <span className='text-[#1dd760]'>Song</span></h1>
                <div>
                    <form onSubmit={handleSubmit} className=' flex flex-col gap-7 items-center'>
                        <div className='flex gap-8'>
                            <label className='' htmlFor="music">Select Music:</label>
                            <input
                                type="file"
                                name="music"
                                className="block w-3/4 text-sm bg-white text-black file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-zinc-800 file:text-white hover:file:bg-zinc-700 cursor-pointer focus:outline-none border border-zinc-800 rounded-lg p-1"
                            />
                        </div>
                        <div className='flex'>
                            <label className='' htmlFor="thumbnail">Select Thumbnail:</label>
                            <input
                                type="file"
                                name="thumbnail"
                                className="block w-3/4 text-sm bg-white text-black file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-zinc-800 file:text-white hover:file:bg-zinc-700 cursor-pointer focus:outline-none border border-zinc-800 rounded-lg p-1"
                            />
                        </div>
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter Title Of Song ..."
                            className="block w-full bg-white text-sm text-black  border border-zinc-800 rounded-lg px-4 py-2.5 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-colors"
                        />
                        <button className='w-fit px-5 py-3 bg-[#1dd760] text-black font-bold rounded-full active:scale-95 cursor-pointer'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UploadSongs