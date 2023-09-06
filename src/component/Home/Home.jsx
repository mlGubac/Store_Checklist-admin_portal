import React from 'react'
import Topnav from './Topnav'
import Sidenav from './Sidenav'
import User from './User'
import DrawerContextProvider from '../../context/DrawerContext'


const Home = () => {
  
  return (
    <DrawerContextProvider>
      
       <div className='home'> 
        <Sidenav/>
        <div className='topnavAndContent'>
        <Topnav/>
        <User/>
        </div>        
       
        
      </div>

    
    </DrawerContextProvider>
  )
}

export default Home