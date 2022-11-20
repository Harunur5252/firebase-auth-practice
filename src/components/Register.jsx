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
import { createUserWithEmailAndPassword } from "firebase/auth";

import {auth} from '../utils/firebase.config'
import { toast } from 'react-toastify';

const theme = createTheme();
function Register() {
    const { register,reset, handleSubmit,formState: { errors,isSubmitSuccessful,isSubmitting,isValid } } = useForm();
    const [resetUserInfo,setResetUserInfo] = useState({})
    const {firstName,lastName,email,password} = resetUserInfo
    const navigate = useNavigate()
    const onSubmit = async data => {
      setResetUserInfo(data)
      try {
        await createUserWithEmailAndPassword(auth, data?.email, data?.password)
        navigate('/home')
        toast.success('registration successful!')
      } catch (err) {
        toast.error(err.message)
      }
};

useEffect(() => {
   if(isSubmitSuccessful){
      reset({
          firstName : '',
          lastName : '',
          email : '',
          password: ''
      })
   }
},[isSubmitSuccessful])

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  {...register("firstName",{ required: 'firstName is required', maxLength:{value : 20,message:'firstName must be less than or equal ten character'} })}
                  fullWidth
                  type='text'
                  color='success'
                  id="firstName"
                  label="First Name"
                />
                <span style={{color:'red'}}>{errors?.firstName?.message}</span>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("lastName",{ required: 'lastName is required', maxLength:{value : 20,message:'lastName must be less than or equal ten character'} })}
                  fullWidth
                  type='text'
                  id="lastName"
                  label="Last Name"
                  color='success'
                  autoComplete="family-name"
                />
                <span style={{color:'red'}}>{errors?.lastName?.message}</span>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  type='email'
                  label="Email Address"
                  color='success'
                  {...register("email",{required: 'valid email is required'})}
                  autoComplete="email"
                />
                <span style={{color:'red'}}>{errors?.email?.message}</span>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  {...register("password",{required: 'password is required'})}
                  color='success'
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
                <span style={{color:'red'}}>{errors?.password?.message}</span>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disable={isSubmitting ? 'disable' : ''}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={Navigate} to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default Register