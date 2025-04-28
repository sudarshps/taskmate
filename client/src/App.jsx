import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './components/Login'
import Signup from './components/Signup'
import Home from './pages/Home'
import useAuthStore from './store/authStore';
import axiosApi from './api/axiosInstance';
import Dashboard from './pages/Dashboard';


const App = () => {
  const {isAuth,setAuth} = useAuthStore()  

  useEffect(()=>{
    const checkAuth = async () => {
      try {
        const response = await axiosApi.get('/api/user/authenticate', { withCredentials: true });
        if (response.status === 200) {
          setAuth(true); 
        }
      } catch (error) {
        setAuth(false);  
      }
    };

    checkAuth()
  },[setAuth])


  return (
    <Router>
    <Routes>
      <Route path='/' element={!isAuth?<Home />:<Dashboard/>} />
      <Route path='/taskboard' element={isAuth ? <Dashboard /> : <Navigate to="/" />} />
      <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path='/login' element={isAuth ? <Navigate to="/taskboard" /> : <LoginPage />} />
      <Route path='/signup' element={isAuth ? <Navigate to="/taskboard" /> : <Signup />} />
    </Routes>
  </Router>
  )
}

export default App