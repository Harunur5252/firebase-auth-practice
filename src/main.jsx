import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import  './App.css'
import "react-toastify/dist/ReactToastify.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './context/Auth.Context';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
