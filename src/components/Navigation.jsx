import React, { useContext } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Navigate, NavLink, useNavigate,useLocation } from 'react-router-dom';
import {signOut} from 'firebase/auth'
import { auth } from '../utils/firebase.config';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/Auth.Context';

function Navigation() {
  const navigate = useNavigate()
  const location = useLocation()
  const {currentUser} = useContext(AuthContext)

  const activeStyle = {
    '&.active' : {
      bgcolor:'primary.dark'
    }
  }
  return (
    <>
       <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Firebase Authentication
          </Typography>
          {!currentUser && 
             <>
                <Button component={NavLink} to='/home' sx={activeStyle} color="inherit">Home</Button>
                <Button component={NavLink} to='/login' sx={activeStyle} color="inherit">Login</Button>
                <Button component={NavLink} to='/register' sx={activeStyle}  color="inherit">Register</Button>
             </>
          }
          {
            currentUser && 
            <>
                <Button component={NavLink} to='/profile' sx={activeStyle} color="inherit">Profile</Button>
                <Button component={NavLink} to='/private' sx={activeStyle} color="inherit">Private</Button>
                <Button onClick={() => {
                  signOut(auth)
                  {<Navigate to='/login' />}
                  toast.success('logout successfully!')
                }} color="inherit">Logout</Button>
            </>
          }
        </Toolbar>
      </AppBar>
    </Box>
    </>
  )
}

export default Navigation

