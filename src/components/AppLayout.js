import { Box } from '@mui/material'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import ContextProvider from '../context/ContextProvider'
import AppBarComponent from './AppBar'
import Footer from './Footer'
import 'react-toastify/dist/ReactToastify.css';

export default function AppLayout({children}) {
  return (
    <ContextProvider>
        <ToastContainer position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              draggable
              pauseOnHover/>
        <AppBarComponent/>
        <Box sx={{minHeight:"88vh"}}>
          {children}
        </Box>
        <Footer/>
    </ContextProvider>
  )
}
