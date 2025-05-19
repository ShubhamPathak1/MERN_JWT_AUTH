import { Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useUserStore } from '../store/UserStore'
import { useNavigate, useParams } from 'react-router-dom';
import PasswordInputField from '../components/PasswordInput'


const ResetPasswordPage = () => {

  const {resetPassword, isLoading, error} = useUserStore();

  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
const [isPasswordValid, setIsPasswordValid] = useState(false);
  const navigate = useNavigate();

  const {token}= useParams();
  const handleResetPassword = async(e)=> {
    e.preventDefault()
    if (password!=passwordAgain) {
      alert("Passwords don't match")
      return;
    }
      try {
        await resetPassword(token, password);
      navigate("/login");
      } catch (error) {
        console.log(error)
      }
  }
  return (
    <div>
      <form className='flex flex-col items-center w-full h-screen justify-center gap-2' onSubmit={handleResetPassword}>
        <Typography variant="h4" gutterBottom>Reset Password</Typography>

        <PasswordInputField 
                  placeholder="Password" 
                  confirmPassword={false}
                  value={password}
                  setValue={setPassword}
                  setIsPasswordValid={setIsPasswordValid}
                  passwordAgain={passwordAgain}
                  isLoginPassword={false}
                  />
        
                <PasswordInputField 
                  placeholder="Confirm Password" 
                  confirmPassword={true}
                  value={passwordAgain}
                  setValue={setPasswordAgain}
                  isLoginPassword={false}
                />

    {error && <Typography color='red' variant='body2' gutterBottom>{error}</Typography>}
            <Button 
          variant="contained" 
          className='w-85'
          disabled={!password || !passwordAgain || !isPasswordValid}
          loading={isLoading}
          loadingPosition='end'
          type='submit'
        >
          Reset Password
        </Button>
        </form>
        </div>
  )
}

export default ResetPasswordPage