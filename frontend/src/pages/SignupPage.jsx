import React, { useState } from 'react'
import InputField from '../components/Input'
import PasswordInputField from '../components/PasswordInput'
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';
import { Link, useNavigate } from "react-router-dom";
import { Typography } from '@mui/material';
import { useUserStore } from '../store/UserStore';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);


  const navigate = useNavigate();
  const {signup, error, isLoading} = useUserStore();

  const handleSignup = async (e) => {
    e.preventDefault();
      try {
        await signup(email, password, username)
        navigate("/verify-otp")
      } catch (error) {
        console.log(error);
      }
  };

  return (
    <div>
      <form className='flex flex-col items-center w-full h-screen justify-center gap-2' onSubmit={handleSignup}>
        <Typography variant="h4" gutterBottom>Create an Account</Typography>
        <InputField placeholder={"Username"} value={username} setValue={setUsername} type={'text'} />
        <InputField placeholder={"Email Address"} value={email} setValue={setEmail} type={'email'} />
        
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
          endIcon={<LoginIcon />} 
          className='w-85'
          disabled={!isPasswordValid  || !username || !email || !password || !passwordAgain}
          loading={isLoading}
          loadingPosition='end'
          type='submit'
        >
          Sign Up
        </Button>

        <Typography variant="body1" gutterBottom>
          Already have an Account? <Link to="/login" className='text-blue-500 hover:underline'>Login</Link>
        </Typography>
      </form>
    </div>
  )
};

export default SignupPage;
