import React, { useEffect, useState } from 'react'
import DisplaySongs from '../components/DisplaySongs'
import UploadSongs from '../components/UploadSongs'
import axios from 'axios'
import Buttons from '../components/Buttons'
import musicBg from '../assets/bg.png';
const Home = () => {
  const [status, setStatus] = useState()
  const fetchSongs = async () => {
    try{
      const data = await axios.get("http://localhost:3000/api/music/")
      setStatus(data.status)
    }catch(err){
      setStatus(err.status);
    }
    
  }
  useEffect(() => {
    fetchSongs()
  }, [])



  
  return (
    <div className={`w-screen h-full bg-cover relative  flex ${status==200?'':'justify-center'} items-center `} >
      
      {status==200?<DisplaySongs/>:(status==403?<UploadSongs/>:<Buttons/>)}
    </div>
  )
}

export default Home