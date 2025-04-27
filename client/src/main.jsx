import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import LoginPage from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { CookiesProvider } from 'react-cookie'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CookiesProvider>
      <Router>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Router>
    </CookiesProvider>

  </StrictMode>,
)
