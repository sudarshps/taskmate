import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosApi from '../api/axiosInstance';

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axiosApi.get(`api/user/authenticate`, { withCredentials: true })
        setIsAuth(true); 
      } catch (error) {
        setIsAuth(false); 
      }
    };

    checkAuth();
  }, []);

  if (isAuth === null) {
    return <div>Loading...</div>;
  }

  if (isAuth === false) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
