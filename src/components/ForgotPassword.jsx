import {useEffect,useState} from 'react'
import { Link as Navigate,useNavigate,useLocation } from 'react-router-dom';
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
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import { sendPasswordResetEmail } from "firebase/auth";
import {auth} from '../utils/firebase.config'


const theme = createTheme();
function ForgotPassword() {
  const { register,reset, handleSubmit,formState: { errors,isSubmitSuccessful,isSubmitting,isValid } } = useForm();
  const [resetUserInfo,setResetUserInfo] = useState({})
  const {email} = resetUserInfo
  const navigate = useNavigate()
  const location = useLocation()
  const onSubmit = async data => {
    setResetUserInfo(data)
    try {
      await sendPasswordResetEmail(auth, data?.email)
      navigate('/login')
      toast.success('email send successfully with password reset link')
    } catch (err) {
      toast.error(err.message)
    }
  };

useEffect(() => {
 if(isSubmitSuccessful){
    reset({
        email : '',
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
          Forgot Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            type='email'
            label="Email Address"
            {...register("email",{required: 'valid email is required'})}
            autoComplete="email"
            color='success'
            autoFocus
          />
          </Grid>
          </Grid>
           <span style={{color:'red'}}>{errors?.email?.message}</span>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disable={isSubmitting ? 'disable' : ''}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
    </ThemeProvider>
  )
}

export default ForgotPassword