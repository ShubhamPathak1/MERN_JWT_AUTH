import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';

export default function Animations() {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center gap-3'>
      <Skeleton variant='rounded' animation="wave" width={200} height={50} />
      <Skeleton variant='rounded' animation="wave"  width={200} height={50} />
    </div>
  );
}
