import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import AllJobs from './components/jobs/Alljobs'
import Applyajob from './components/jobs/Applyajob'
import EditaJob from './components/jobs/EditModal'
import Landing from './components/Landing'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Signup from './components/Signup'
import UserProfile from './components/user/Profile'

function App() {
  return(
    <div>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Login/>}/>
        <Route path="/user/auth" element={<Navbar/>}/>
        <Route path="/user/applyajob/:id" element={<Applyajob/>}/>
        <Route path="/myaccount" element={<UserProfile/>}/>
      </Routes>
    </div>
  )
}

export default App
