import React, { useState } from 'react'
import InputField from '../components/Input'
import PasswordInputField from '../components/PasswordInput'
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { Typography } from '@mui/material';
import { useUserStore } from '../store/UserStore';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {login, error, isLoading} = useUserStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password)
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <div>
      <form className='flex flex-col items-center w-full h-screen justify-center gap-2' onSubmit={handleLogin}>
        <Typography variant="h4" gutterBottom>Login</Typography>
        <InputField placeholder={"Email Address"} value={email} setValue={setEmail} type={'email'} />
        
        <PasswordInputField 
          placeholder="Password" 
          confirmPassword={false}
          value={password}
          setValue={setPassword}
          isLoginPassword={true}
        />

          <Link to="/forgot-password" className='text-blue-500 hover:underline'>Forgot Password?</Link>
        
        {error && <Typography color='red' variant='body2' gutterBottom>{error}</Typography>}
        <Button 
          variant="contained" 
          endIcon={<LoginIcon />} 
          className='w-85'
          disabled={!email || !password}
          loading={isLoading}
          loadingPosition='end'
          type='submit'
        >
          Login
        </Button>

        <Typography variant="body1" gutterBottom>
          Don't have an Account? <Link to="/signup" className='text-blue-500 hover:underline'>Signup</Link>
        </Typography>
      </form>
    </div>
  )
};

export default LoginPage;
