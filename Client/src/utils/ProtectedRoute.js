import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserInfo } from '../slices/authSlice';
import { Navigate, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const ProtectedRoute = ({ children }) => {
  const user = useSelector(getUserInfo);
  const navigate = useNavigate(); // useNavigate hook from react-router-dom

useEffect(()=>{
  if (user === null) {
    // Redirect to the login page if the user is not authenticated
    return navigate('/login')
  }else{
    return navigate('/')

  }

},user)
 

  return children;
};

export default ProtectedRoute;
