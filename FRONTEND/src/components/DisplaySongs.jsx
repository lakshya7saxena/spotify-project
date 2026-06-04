import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import playBtn from "../assets/playBtn.svg"
const DisplaySongs = () => {
  var content = ""
  const [data, setData] = useState([])
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null)
  const [trackProgress, setTrackProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(new Audio());


  const fetchSongs = async () => {
    const songs = await axios.get("http://localhost:3000/api/music/")
    setData(songs.data.songs)
  }


  useEffect(() => {
    fetchSongs()
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setTrackProgress(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTrackEnded = () => {
      setIsPlaying(false);
      setTrackProgress(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleTrackEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleTrackEnded);
    };
  }, [])

  const handleLogOut = async() => {
    await axios.post("http://localhost:3000/api/auth/logout").then((res) => {
      alert("Logged Out Successfully")
      window.location.reload();
    }).catch((err) => {
      alert("Server Is Down")
    })
  }

  const playMusic = (track) => {
    if (!currentTrack || currentTrack.uri !== track.uri) {
      audioRef.current.src = track.uri
      setCurrentTrack(track)
      audioRef.current.play()
      setIsPlaying(true)
    } else {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleProgressChange = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setTrackProgress(newTime);
  };

  const toggleMute = () => {
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  if (data.length > 0) {
    content = data.map((elem, idx) => {
      return <div key={idx} className='relative w-50'>
        <img src={elem.thumbnail} className='rounded-xl object-cover mb-2' /> {/* thumbnail */}
        <div className='px-1 text-xl wrap-anywhere font-semibold capitalize'>{elem.title}</div> {/*title*/}
        <div className='px-1 text-md text-gray-400 wrap-anywhere capitalize'>{elem.artist.username}</div> {/*artist username*/}
        <button onClick={() => {
          playMusic(elem)
        }}
          className='absolute bottom-20 right-4 items-center justify-center h-10 w-10 rounded-full bg-white border border-gray-100 hover:scale-110 active:scale-95 cursor-pointer'
        ><img src={playBtn} /></button>
      </div>
    })
  } else {
    content = <div className='text-5xl font-semibold flex flex-col items-center gap-8'>
      <div>No Songs To Display...</div>
    </div>
  }


  return (
    <div className='flex flex-wrap px-20 gap-10'>
      <button onClick={handleLogOut} className='absolute top-5 right-5 px-5 py-3 bg-[#1dd760] text-black font-bold rounded-full active:scale-95 cursor-pointer'>Log Out</button>
      {content}
      {currentTrack && (<div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 text-white p-4 flex flex-col md:flex-row items-center justify-between gap-4 z-50 shadow-2xl">

        {/* Left Side: Track Info */}
        <div className="flex items-center gap-3 w-full md:w-1/4">
          <img
            src={currentTrack.thumbnail}
            alt={currentTrack.title}
            className={`w-14 h-14 rounded-md object-cover ${isPlaying ? 'animate-spin [animation-duration:10s]' : ''}`}
          />
          <div className="truncate">
            <h4 className="text-sm font-semibold truncate capitalize">{currentTrack.title}</h4>
            <p className="text-xs text-zinc-400 truncate capitalize">{currentTrack.artist.username || "Unknown Artist"}</p>
          </div>
        </div>

        {/* Center Controls & Progress Bar */}
        <div className="flex flex-col items-center gap-2 w-full md:w-2/4">
          {/* Play/Pause Circle Button */}
          <button
            onClick={() => playMusic(currentTrack)}
            className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-all shadow"
          >
            {isPlaying ? (
              // Pause Icon
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
            ) : (
              // Play Icon
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 ml-0.5"><path d="M8 5v14l11-7z" /></svg>
            )}
          </button>

          {/* Timeline Slider */}
          <div className="flex items-center gap-2 w-full text-xs text-zinc-400">
            <span>{formatTime(trackProgress)}</span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={trackProgress}
              onChange={handleProgressChange}
              className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-white hover:accent-green-500 transition-all"
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right Side: Spacer/Volume (Optional placeholder to balance layout) */}
        <div className="hidden md:flex justify-end w-1/4 text-zinc-400">
          <button
            onClick={toggleMute}
            className="flex items-center justify-center p-2 rounded-full hover:bg-zinc-800 text-white transition-all"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              // Muted Icon (Speaker with a slash or cross)
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-red-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6L4.5 9H1.5v6h3l4.5 3.75V5.25z" />
              </svg>
            ) : (
              // Sound On Icon (Speaker with waves)
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-zinc-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
              </svg>
            )}
          </button>
        </div>

      </div>)}
    </div>
  )
}

export default DisplaySongs