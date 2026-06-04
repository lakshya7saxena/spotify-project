import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Home from './pages/Home'

const App = () => {
  return (
    <div className='bg-[#121212] h-screen text-white'>
      <Navbar/>
      <section className='h-89/100 flex items-center justify-center'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      </section>
    </div>
  )
}

export default App