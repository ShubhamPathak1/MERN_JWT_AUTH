import React, { useState } from 'react'
import InputField from '../components/Input'
import { Button, Typography } from '@mui/material'
import { useUserStore } from '../store/UserStore'
import EmailIcon from '@mui/icons-material/Email';

const ForgotPasswordPage = () => {
    
    const [email, setEmail] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)
    
    const {forgotPassword, error, isLoading} = useUserStore();

    const handleForgotPassword = async (e)=> {
        e.preventDefault();
        try {
            await forgotPassword(email)
            setIsSubmitted(true)
            
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
       {!isSubmitted?  
      <form className='flex flex-col items-center w-full h-screen justify-center gap-2' onSubmit={handleForgotPassword}>
        <Typography variant="h4" gutterBottom className='max-w-xl text-center'> Enter your email address</Typography>
        <Typography variant="body1" gutterBottom className='max-w-xl text-center'> We'll send you a link to reset your password.</Typography>
        <InputField placeholder={"Email Address"} value={email} setValue={setEmail} type={"email"} />

        {error && <Typography color='red' variant='body2' gutterBottom>{error}</Typography>}

         <Button 
          variant="contained" 
          className='w-85'
          disabled={!email}
          loading={isLoading}
          loadingPosition='end'
          type='submit'
          >
          Send Reset Link
        </Button>
        </form>
        : 
            <div className='flex flex-col items-center w-full h-screen justify-center gap-2'> 
            <EmailIcon className='bg-gray-200 rounded-full p-1' />
            <Typography variant="body1" gutterBottom className='max-w-xl text-center'> You will receive a Password Reset Link shortly on your email {email}</Typography>
            </div>
       }
        </div>
  )
}

export default ForgotPasswordPage