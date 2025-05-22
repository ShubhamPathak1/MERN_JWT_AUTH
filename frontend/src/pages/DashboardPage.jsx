import { Typography } from '@mui/material'
import React from 'react'
import { useUserStore } from '../store/UserStore'
import Button from '@mui/material/Button';

const DashboardPage = () => {

  const {user, logout} = useUserStore();

  const handleLogout = async ()=> {
      await logout();
  }

  return (
    <div className='flex flex-col w-full h-screen justify-center items-center'>
      <Typography variant='h4' gutterBottom>Welcome {user.username}</Typography>
      <Typography variant='body1' gutterBottom>{user.email} </Typography>
      <Button 
          variant="contained" 
          className='w-60'
          onClick={handleLogout}
        >
          Logout
        </Button>
    </div>
  )
}

export default DashboardPage