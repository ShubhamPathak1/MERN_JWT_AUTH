import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function FormPropsTextFields({placeholder, value, setValue, type}) {
  return (
    <>
        <TextField
          id="outlined-required"
          label={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type={type}
          sx={{ m: 1, width: '40ch' }}
        /> 
      
</>
  );
}
