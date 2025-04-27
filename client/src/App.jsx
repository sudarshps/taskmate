import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './components/Login'
import Signup from './components/Signup'
import Home from './pages/Home'
import useAuthStore from './store/authStore';
import axiosApi from './api/axiosInstance';
import Dashboard from './pages/Dashboard';

// Temporary warning suppression
const originalError = console.error;
console.error = (...args) => {
  if (/defaultProps/.test(args[0])) return;
  originalError.call(console, ...args);
};

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

  // if (isAuth === null) {
  //   return <div>Loading...</div>;
  // }

  return (
    <Router>
    <Routes>
      <Route path='/' element={!isAuth?<Home />:<Dashboard/>} />
      <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
  </Router>
  )
}

export default App