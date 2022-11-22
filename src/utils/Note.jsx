import React, { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Avatar, CardHeader, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { deleteDoc, doc } from 'firebase/firestore';
import { notesColRef } from './firebase.config';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AuthContext } from '../context/Auth.Context';


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);


function Note({note}) {
  const [anchorEl, setAnchorEl] =useState(null);
  const {currentUser} = useContext(AuthContext)
  const open = Boolean(anchorEl);
  const ownerShip = currentUser?.uid === note?.user?.id

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
 
  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleDelete = async () => {
     const docRef = doc(notesColRef,note?.id)
     try {
      if(ownerShip){
        await deleteDoc(docRef)
        toast.success('note deleted successfully!')
      }
     } catch (err) {
      toast.error(err?.message)
     }
  };

  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box
      sx={{
        marginTop: 1,
        marginBottom: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        bgcolor:'rgb(2, 20, 44)'
      }}
    > 
      <Box sx={{ mt: 3,mb:3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={12}>
          <Card sx={{ minWidth: 355,bgcolor:'rgb(209, 213, 218)' }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {note?.user?.name[0].toUpperCase()}
                </Avatar>
              }
              action={
                ownerShip && 
                <IconButton  onClick={handleClick} aria-controls={open ? 'account-menu' : undefined} aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={note?.user?.name}
              subheader={note?.createdAt.toDate().toLocaleDateString()}
            />
           
            <CardContent>
              <Menu
                id="account-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem component={Link} to={`/note-edit/${note?.id}`}> 
                  Edit
                </MenuItem>
                <MenuItem onClick={handleDelete}>
                  Delete
                </MenuItem>
              </Menu>
              <Typography sx={{marginBottom:'0.8rem'}} variant="h6" color="text.dark">
                {note?.title}
              </Typography>
              <Typography variant="p" color="text.dark">
                {note?.description}
              </Typography>
            </CardContent>
          </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  </Container>
  )
}

export default Note