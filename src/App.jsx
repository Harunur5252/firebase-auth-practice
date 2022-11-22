import {Routes,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Login from './components/Login'
import Register from './components/Register'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import Profile from './components/Profile'
import Private from './components/Private'
import Navigation from './components/Navigation'
import AuthRequired from './components/AuthRequired';
import PublicRequired from './components/PublicRequired';
import Home from './components/Home';
import Notes from './utils/Notes';
import EditNote from './utils/EditNote';
import AddNote from './utils/AddNote';

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
         <Route path='/home' element={<PublicRequired><Home /></PublicRequired>} />
         <Route path='/login' element={<PublicRequired><Login /></PublicRequired>} />
         <Route path='/register' element={<PublicRequired><Register /></PublicRequired>} />
         <Route path='/forgotPassword' element={<PublicRequired><ForgotPassword /></PublicRequired>} />
         <Route path='/resetPassword' element={<PublicRequired><ResetPassword /></PublicRequired>} />
         <Route path='/profile' element={<AuthRequired><Profile /></AuthRequired>} />
         <Route path='/private' element={<AuthRequired><Private /></AuthRequired>} />
         <Route path='/notes' element={<Notes />} />
         <Route path='/note-add' element={<AuthRequired><AddNote /></AuthRequired>} />
         <Route path='/note-edit/:noteId' element={<AuthRequired><EditNote /></AuthRequired>} />
      </Routes>
    </>
  )
}

export default App
