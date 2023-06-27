import React, { useState } from 'react';

import { AppBar, Avatar, Toolbar, Typography, Box, useMediaQuery, useTheme } from '@mui/material';
import DehazeIcon  from '@mui/icons-material/Dehaze';
import CloseIcon from '@mui/icons-material/Close';

import json2mq from 'json2mq';
import Sidebar from '../sidebar/sidebar.component';
import ToggleModeSwitch from '../toggle-mode-switch/toggle-mode-switch.component';
import { grey } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/reducers/user/user.selector';

const Navbar = ({ header }) => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const currentUser = useSelector(selectCurrentUser);

  // const avatarLetter = currentUser ? currentUser.email[0].toUpperCase() : "";

  const theme = useTheme();
  
  const smallDevice = useMediaQuery(
    json2mq({
      maxWidth: 800
    })
  );
  
  return (
   <AppBar position='relative' sx={{
    background: 'inherit',
    color: theme.palette.mode === 'dark' ? 'white' : 'black',
    borderBottomColor: grey,
    borderRadius: '15px',
    height: '10%',
    
   }}>
    <Toolbar sx={{
      display: smallDevice ? 'none' : 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <div />
      <Typography variant='h6'>{header}</Typography>
      <Box sx={{
        display: 'flex',
        alignItems: 'center'
      }}>
        <ToggleModeSwitch sx={{ marginRight: '1rem' }} />
        <Avatar>
          J
        </Avatar>
      </Box>
    </Toolbar>
    <Toolbar sx={{
      display: smallDevice ? 'flex' : 'none',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
        <DehazeIcon onClick={() => setToggleMenu(true)} />
        <Typography variant='h6'>{header}</Typography>
        <Avatar sx={{
          backgroundColor: 'secondary'
        }}>
          {/* {avatarLetter} */}
        </Avatar>
    </Toolbar>
    {
      toggleMenu && (
        <Box sx={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '45%',
          height: '100vh',
          overflow: 'scroll',
          transition: 'width 1.5s ease-in',
          zIndex: 10,
          background: theme.palette.mode === 'dark' ? grey[900] : grey[200],
          borderRadius: '15px'
        }}>
          <Toolbar sx={{ height: '10%' }}>
            <CloseIcon onClick={() => setToggleMenu(false)} />
            <div />
            <div />
          </Toolbar>
          <Sidebar />
        </Box>
      )
    }
   </AppBar>
  )
}

export default Navbar
