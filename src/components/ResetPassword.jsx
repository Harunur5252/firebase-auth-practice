import {useEffect,useState} from 'react'
import { Link as Navigate,useNavigate,useLocation,useSearchParams } from 'react-router-dom';
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
import { confirmPasswordReset } from "firebase/auth";
import {auth} from '../utils/firebase.config'


const theme = createTheme();
function ResetPassword() {
  const { register,reset, handleSubmit,formState: { errors,isSubmitSuccessful,isSubmitting,isValid } } = useForm();
  const [resetUserInfo,setResetUserInfo] = useState({})
  const {password} = resetUserInfo
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const code = searchParams.get('oobCode')

  const onSubmit = async data => {
    setResetUserInfo(data)
    try {
      await confirmPasswordReset(auth,code, data?.password)
      navigate('/login')
      toast.success('password update successfully,now login with new password')
    } catch (err) {
      toast.error(err.message)
    }
  };

useEffect(() => {
 if(isSubmitSuccessful){
    reset({
      password : '',
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
          Reset Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            type="password"
            label="New Password"
            {...register("password",{required: 'new password is required'})}
            autoComplete="password"
            color='success'
            autoFocus
          />
          </Grid>
          </Grid>
           <span style={{color:'red'}}>{errors?.password?.message}</span>
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

export default ResetPassword