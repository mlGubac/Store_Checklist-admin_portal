import React, { useState, createContext, useContext } from 'react'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { DrawerContext } from '../../context/DrawerContext';

const Topnav = () => {

  const {setIsOpen, isOpen} = useContext(DrawerContext);

  const onClickButton = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
     <div className="topnav">
      <div className='topnav-menu-icon'>
        <IconButton onClick={onClickButton} size="large">
          <MenuIcon/>
        </IconButton>
      </div>
      <div className='topnav-logout'>
        <IconButton size="large">
          <LogoutIcon/>
        </IconButton>
      </div>
    </div>
    </>
   
  )
}

export default Topnav