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
import { signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import {auth} from '../utils/firebase.config'


const theme = createTheme();
function Login() {
  const { register,reset, handleSubmit,formState: { errors,isSubmitSuccessful,isSubmitting,isValid } } = useForm();
  const [resetUserInfo,setResetUserInfo] = useState({})
  const {email,password} = resetUserInfo
  const navigate = useNavigate()
  const location = useLocation()
  
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth,provider)
      navigate(location?.state?.from ? location?.state?.from : '/profile')
      toast.success('login successful!')
    } catch (err) {
      console.log(err.message)
      toast.error(err.message)
    }
  }

  const onSubmit = async data => {
    setResetUserInfo(data)
    try {
      await signInWithEmailAndPassword(auth, data?.email, data?.password)
      navigate(location?.state?.from ? location?.state?.from : '/profile')
      toast.success('login successful!')
    } catch (err) {
      toast.error(err.message)
    }
  };

useEffect(() => {
 if(isSubmitSuccessful){
    reset({
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
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
           <span style={{color:'red'}}>{errors?.email?.message}</span>
          <TextField
            margin="normal"
            required
            fullWidth
            {...register("password",{required: 'password is required'})}
            label="Password"
            type="password"
            color='success'
            id="password"
            autoComplete="current-password"
          />
          <span style={{color:'red'}}>{errors?.password?.message}</span>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disable={isSubmitting ? 'disable' : ''}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link component={Navigate} to="/forgotPassword" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={Navigate} to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={googleSignIn}
          >
            Sign In with Google
          </Button>
      </Box>
    </Container>
    </ThemeProvider>
  )
}

export default Login