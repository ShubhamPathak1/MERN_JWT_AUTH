import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/UserStore';
import { Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

const OTPVerificationPage = () => {
  const [otp, setOtp] = useState('');

  const navigate = useNavigate();

  const {verifyEmail, error, isLoading} = useUserStore();

  const handleOTPSubmit = async (e)=> {
    e.preventDefault();
    try {
      await verifyEmail(otp);
      navigate("/");
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div className='flex justify-center mt-10 h-screen w-full items-center'>
      <form onSubmit={{handleOTPSubmit}} className='flex flex-col gap-3 items-center justify-center'>

      <OtpInput
  value={otp}
  onChange={setOtp}
  numInputs={6}
  inputType="tel"
  inputMode="numeric"
  renderSeparator={<span className="mx-1"></span>}
  renderInput={(props) => (
    <input
    {...props}
    type="text"
    inputMode="numeric"
    pattern="[0-9]*"
    className="w-40 h-8 text-2xl text-center border border-gray-300 rounded"
    />
  )}
/>

{error && <Typography color='red' variant='body2' gutterBottom>{error}</Typography>}

<Button 
          variant="contained" 
          className='w-50'
          onClick={handleOTPSubmit}
          disabled={otp.length !== 6}
          endIcon={<EmailIcon />}
          loading={isLoading}
          loadingPosition='end'
          type='submit'
          >
          Verify OTP
        </Button>
<Link to="/resend-otp" className='text-blue-500 hover:underline'>Resend OTP</Link>
          </form>

    </div>
  );
};

export default OTPVerificationPage;
