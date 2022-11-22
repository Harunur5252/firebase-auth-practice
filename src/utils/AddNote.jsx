import React, { useEffect,useState} from 'react'
import { Link as Navigate,useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {auth} from '../utils/firebase.config'
import { addDoc, Timestamp } from 'firebase/firestore';
import {notesColRef} from '../utils/firebase.config'
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AuthContext } from '../context/Auth.Context';

const theme = createTheme();
function AddNote() {
    const { register,reset, handleSubmit,formState: { errors,isSubmitSuccessful,isSubmitting,isValid } } = useForm();
    const [resetUserInfo,setResetUserInfo] = useState({})
    const {currentUser} = useContext(AuthContext)
    const {title,description} = resetUserInfo
    const navigate = useNavigate()

    const onSubmit = async data => {
      setResetUserInfo(data)
      addDoc(notesColRef,{
        ...data,
        createdAt : Timestamp.fromDate(new Date()),
        user:{
          id:currentUser.uid,
          name:currentUser.displayName
        }
      }).then(() => {
        navigate('/notes')
        toast.success('notes added successfully')
      }).catch(err => {
        toast.error(err.message)
      })
    };

    useEffect(() => {
      if(isSubmitSuccessful){
          reset({
            title : '',
            description : '',
          })
      }
    },[isSubmitSuccessful])

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
            Add Note
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  {...register("title",{ required: 'title is required', maxLength:{value : 20,message:'firstName must be less than or equal ten character'} })}
                  fullWidth
                  type='text'
                  color='success'
                  id="firstName"
                  label="Title"
                />
                <span style={{color:'red'}}>{errors?.title?.message}</span>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("description",{ required: 'description is required', maxLength:{value : 2000,message:'lastName must be less than or equal 2000 character'} })}
                  fullWidth
                  type='text'
                  multiline
                  maxRows={4}
                  id="lastName"
                  label="Description"
                  color='success'
                  autoComplete="family-name"
                />
                <span style={{color:'red'}}>{errors?.description?.message}</span>
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disable={isSubmitting ? 'disable' : ''}
            >
              Add Note
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default AddNote