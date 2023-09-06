import React, { useState, createContext, useContext } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import FolderIcon from '@mui/icons-material/Folder';

import logo from './../../assets/expo-bg1.png';

import { DrawerContext } from '../../context/DrawerContext';

const Sidenav = () => {

  const {isOpen} = useContext(DrawerContext)
  console.log(isOpen)

  return (
    <>
      <div className={isOpen ? 'sidenav-active' : 'sidenav'}>
        <div className='sidenav-img'>
          <img src={logo} alt="Logo" className='sidenav-logo'/>
        </div>
        <div>
          <Divider />  
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <IconButton  size="large">
                  <DashboardIcon/>
                </IconButton>
                <ListItemText primary="Dashboards" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <IconButton size="large" >
                  <PersonIcon/>
                </IconButton>
                <ListItemText primary="User" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <IconButton size="large">
                  <FolderIcon/>
                </IconButton>
                <ListItemText primary="Reports" />
              </ListItemButton>
            </ListItem>
          </List>
        </div>
      </div>
    </>
  )
}

export default Sidenav