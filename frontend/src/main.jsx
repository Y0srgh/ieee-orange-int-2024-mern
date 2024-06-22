import React from 'react'
import ReactDOM from 'react-dom/client'
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SnackbarProvider autoHideDuration={3000}>
      <App />
    </SnackbarProvider>
  </React.StrictMode>,
)
