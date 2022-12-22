import React from 'react'
import Landing from './Landing';
import Navbar from './Navbar'
import UnauthenticatedTabs from './UnauthentcateTabs'

function Home() {
    const isAuth= false;
    
  return (
    <div>
        <Landing/>
    </div>
  )
}

export default Home