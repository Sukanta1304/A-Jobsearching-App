import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Landing from './components/Landing'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Signup from './components/Signup'

function App() {
  return(
    <div>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Login/>}/>
        <Route path="/user/auth" element={<Navbar/>}/>
      </Routes>
    </div>
  )
}

export default App
