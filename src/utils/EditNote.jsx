import React, { useEffect,useState} from 'react'
import { Link as Navigate,useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {auth} from '../utils/firebase.config'
import {  doc, getDoc,updateDoc, Timestamp } from 'firebase/firestore';
import {notesColRef} from '../utils/firebase.config'
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AuthContext } from '../context/Auth.Context';

const theme = createTheme();
function EditNote() {
    const [note,setNote] = useState({
      title:'',
      description:'',
    })
    const {currentUser} = useContext(AuthContext)
    const navigate = useNavigate()
    const {noteId} = useParams()

    // checking note is exists?
    useEffect(() => {
      (async () => {
         const docRef = doc(notesColRef,noteId)
         const currentDoc = await getDoc(docRef)
         if(currentDoc.exists){
            const data = currentDoc.data()
            setNote({
              ...data
            })
         }
      })()
    },[noteId])

    const handleChange = (e) => {
       setNote({
        ...note,
        [e.target.name] : e.target.value
       })
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      const docRef = doc(notesColRef,noteId)
      if(currentUser?.uid === note?.user?.id){
        updateDoc(docRef,{
          ...note
        }).then(() => {
          navigate('/notes')
          toast.success('notes updated successfully!')
        }).catch(err => {
          toast.error(err.message)
        })
      }else{
        toast.error(`it's not your note to be updated`)
      }
    };


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 14,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <Typography component="h1" variant="h5">
            Update Note
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name='title'
                  fullWidth
                  value={note?.title}
                  onChange={handleChange}
                  type='text'
                  color='success'
                  id="title"
                  placeholder='Title'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name='description'
                  fullWidth
                  type='text'
                  onChange={handleChange}
                  multiline
                  value={note?.description}
                  maxRows={4}
                  id="lastName"
                  placeholder='Description'
                  color='success'
                  autoComplete="family-name"
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update Note
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default EditNote