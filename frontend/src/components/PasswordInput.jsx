import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Stack from '@mui/joy/Stack';
import LinearProgress from '@mui/joy/LinearProgress';
import Typography from '@mui/joy/Typography';
import PasswordChecklist from "react-password-checklist"

export default function InputAdornments({ 
  placeholder, 
  confirmPassword, 
  value, 
  setValue, 
  setIsPasswordValid,
  passwordAgain,
  isLoginPassword
}) {
  const [showPassword, setShowPassword] = React.useState(false);
  const minLength = 12;

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleMouseUpPassword = (event) => event.preventDefault();

  return (
    <>
      <Stack spacing={0.5} sx={{ '--hue': Math.min(value.length * 10, 120) }}>
        <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">{placeholder}</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? 'hide the password' : 'display the password'}
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="password"
          />
        </FormControl>

        {!isLoginPassword && !confirmPassword && (
          <>
            <LinearProgress
              determinate
              size="sm"
              value={Math.min((value.length * 100) / minLength, 100)}
              sx={{ bgcolor: 'background.level3', color: 'hsl(var(--hue) 80% 40%)' }}
            />
            <Typography
              level="body-xs"
              sx={{ alignSelf: 'flex-end', color: 'hsl(var(--hue) 80% 30%)' }}
            >
              {value.length < 3 && 'Very weak'}
              {value.length >= 3 && value.length < 6 && 'Weak'}
              {value.length >= 6 && value.length < 10 && 'Strong'}
              {value.length >= 10 && 'Very strong'}
            </Typography>
            <PasswordChecklist
              rules={["minLength", "specialChar", "number", "capital", "match"]}
              minLength={5}
              value={value}
              valueAgain={passwordAgain}
              onChange={(isValid) => setIsPasswordValid?.(isValid)}
            />
          </>
        )}
      </Stack>
    </>
  );
}
