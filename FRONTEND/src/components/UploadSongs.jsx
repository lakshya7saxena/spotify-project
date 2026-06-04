import React from 'react'
import axios from 'axios'
const UploadSongs = () => {

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

    const handleLogOut = async () => {
        await axios.post("http://localhost:3000/api/auth/logout").then((res) => {
            alert("Logged Out Successfully")
            window.location.reload();
        }).catch((err) => {
            alert("Server Is Down")
        })
    }

    return (
        <div className='h-7/10 flex flex-col justify-around py-5 w-1/3 rounded-2xl px-10 bg-[#2e2f33]'>
            <button onClick={handleLogOut} className='absolute top-5 right-5 px-5 py-3 bg-[#1dd760] text-black font-bold rounded-full active:scale-95 cursor-pointer'>Log Out</button>
            <h1 className='text-6xl font-extrabold text-center leading-20 tracking-tight'>Upload <span className='text-[#1dd760]'>Song</span></h1>
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
    )
}

export default UploadSongs