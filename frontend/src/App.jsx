import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import OTPVerificationPage from './pages/OTPVerificationPage'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useUserStore } from './store/UserStore'
import Skeleton from './components/Skeleton'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'


const ProtectedRoute = ({children}) => {
  const {isAuthenticated, user} = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />
  }
  if (!user.isVerified) {
    return <Navigate to={"/verify-otp"} replace />
  }

  return children;
};

const RedirectAuthenticatedUser = ({children}) => {
  const {isAuthenticated, user} = useUserStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to={"/"} replace />
  }

  return children;
}


const App = () => {

  const {isCheckingAuth, checkAuth} = useUserStore();

  useEffect(()=> {checkAuth()}, [checkAuth]);

  if (isCheckingAuth) return <Skeleton />



  return (
    <Routes>
      <Route path='/' element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path='/login' element={<RedirectAuthenticatedUser><LoginPage /></RedirectAuthenticatedUser>} />
      <Route path='/signup' element={<RedirectAuthenticatedUser><SignupPage /></RedirectAuthenticatedUser>} />
      <Route path='/verify-otp' element={<OTPVerificationPage />} />
      <Route path='/forgot-password' element={<RedirectAuthenticatedUser><ForgotPasswordPage /></RedirectAuthenticatedUser>} />
      <Route path='/reset-password/:token' element={<RedirectAuthenticatedUser><ResetPasswordPage /></RedirectAuthenticatedUser>} />



      {/* catch all other routes, and redirect to dashboard page */}
      <Route path='*' element={<Navigate to={"/"} replace />} />

    </Routes>
  )
}

export default App