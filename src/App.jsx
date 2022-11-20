import {Routes,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Login from './components/Login'
import Register from './components/Register'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import Profile from './components/Profile'
import Private from './components/Private'
import Navigation from './components/Navigation'

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Navigation />
      <Routes>
         <Route path='/login' element={<Login />} />
         <Route path='/register' element={<Register />} />
         <Route path='/forgot-password' element={<ForgotPassword />} />
         <Route path='/reset-password' element={<ResetPassword />} />
         <Route path='/profile' element={<Profile />} />
         <Route path='/private' element={<Private />} />
      </Routes>
    </>
  )
}

export default App
