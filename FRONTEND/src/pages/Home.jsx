import React, { useEffect, useState } from 'react'
import DisplaySongs from '../components/DisplaySongs'
import UploadSongs from '../components/UploadSongs'
import axios from 'axios'
import Buttons from '../components/Buttons'
import musicBg from '../assets/bg.png';
const Home = () => {
  const [status, setStatus] = useState()
  const [songs, setSongs] = useState();
  const fetchSongs = async () => {
    try {
      const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'
      const data = await axios.get(`${backendUrl}/api/music/`)
      setStatus(data.status)
      setSongs(data)
    } catch (err) {
      setStatus(err.status);
    }

  }
  useEffect(() => {
    fetchSongs()
  }, [])




  return (
    <div className={`w-screen  h-full bg-cover relative  justify-center   flex  items-center`} >

      {status == 200 ? <DisplaySongs data={songs.data.songs} user={songs.data.user}/> : (status == 403 ? <UploadSongs /> : <Buttons />)}
    </div>
  )
}

export default Home