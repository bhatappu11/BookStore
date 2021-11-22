import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
// import Input from '@mui/material/Input';
// import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
// import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

const Root = styled('div')(({ theme }) => ({
    marginLeft: 80,
    width: '50%',
    ...theme.typography.body2,
    '& > :not(style) + :not(style)': {
      marginTop: theme.spacing(2),
    },
  }));
  

function Login() {
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
      });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    
      const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    return (
        <div>
            <Box sx={{margin: '25px'}}>
                <TextField size="small" fullWidth id="outlined-basic" label="Email Id" variant="outlined" />
                <FormControl size="small" fullWidth variant="outlined" sx={{marginTop: 2}}>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        fullWidth
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
                <Button fullWidth variant="contained" style={{textTransform: 'none',background: "#A03037 0% 0% no-repeat padding-box",marginTop: 20}}>Login</Button>
                <Root sx={{marginTop: 3}}> 
                    <Divider style={{fontSize: '18px',fontWeight: 'bolder'}}>OR</Divider>
                </Root>
                <Box style={{display: 'flex',marginTop: 20, gap: 10 }}>
                <Button fullWidth variant="contained" style={{textTransform: 'none',background: "#4266B2 0% 0% no-repeat padding-box"}}>Facebook</Button>
                <Button fullWidth variant="contained" style={{textTransform: 'none',color: '#0A0102',background: "#F5F5F5 0% 0% no-repeat padding-box"}}>Google</Button>
                </Box>
            </Box>
        </div>
    )
}

export default Login
