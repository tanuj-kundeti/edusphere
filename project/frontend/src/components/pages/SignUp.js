import React, {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import '../styles/login.css';
import '../styles/common.css';


var baseUrl = "https://edusphere.vercel.app"

const SignUp = (props) => {

  const [fname, setFname] =  useState('');
  const [lname, setLname] = useState('');
  const [password, setPassword] = useState('');
  const [rpassword, setRpassword] = useState('');
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    
  }, []);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
    console.log(selectedRole);
  };

  const handleSubmit = async () => {
    if (password !== rpassword) {
        setPasswordError(true);
        setErrorMessage('Passwords do not match');
      } else {
        setPasswordError(false);
        setErrorMessage('');
        setIsLoading(true);
        try {
          console.log(selectedRole);
          const response = await fetch(baseUrl + '/signup/', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              fname: fname,
              lname: lname,
              email: email,
              password: password,
              type: selectedRole,
            }),
          });
      
          const data = await response.json();
      
          if (data.msg === 'This email is already registered') {
              setIsLoading(false);
              setErrorMessage('This email is already registered.Please Login!');
              navigate('/login', { state: { message: 'This email is already registered.Please Login' } });
            }
          else if (data.Status === 'Success') {
              setIsLoading(false);
              navigate('/login',{ state: { message: 'Registration Successful.Please Login' } }); }
            else {
              setIsLoading(false);
              setErrorMessage('An error occurred. Please try again.');
            }
          } catch (error) {
          // Handle network errors
          console.error('Network error:', error);
          setIsLoading(false);
          setErrorMessage('A network error occurred. Please try again.');
        }
      }
    
    
  };
  
  return (
    <Box display = {isLoading ? 'none' : 'flex'}
      sx={{justifyContent: 'center',alignItems: 'center',  minHeight:"60vh"}}>
    <Grid container justifyContent="center" alignContent="center">
      <Grid item xs={12} sm={10} md={8} lg={6}>
      <Card sx={{mt:10,alignItems: 'center',p: 2,
         boxShadow: '0 0 70px rgba(0, 0, 0, 0.1)',
          border: '2px solid rgba(0, 0, 0, 0.1)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: 2,
        }}>

        <CardContent sx={{ width: '100%' }}>
          <Grid container>
            <Grid item md={12}>
              {errorMessage && (
                      <Alert severity="error" sx={{ mb: 2 }}>
                        {errorMessage}
                      </Alert>
                    )}
              <Typography variant="body1" fontWeight="bold" textAlign="center" mb={2}>
                Create Account
              </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={3} mb={2}>
              <Grid item md={6} xs={12}>
                  <TextField fullWidth variant='outlined' label='First Name' value={fname} 
                  onChange={e => setFname(e.target.value)}/>
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField fullWidth variant='outlined' label='Last Name' value={lname}
                    onChange={e => setLname(e.target.value)}/>
              </Grid>
            </Grid>

            <Grid container spacing={3} mb={2}>
              <Grid item md={6} xs={12}>
                  <TextField fullWidth variant='outlined' label='Email' onChange={e => setEmail(e.target.value)}/>
              </Grid>
              <Grid item md={6} xs={12}>
                <FormControl fullWidth >
                    <InputLabel>Role</InputLabel>
                    <Select sx = {{textAlign:'left'}}
                      fullWidth
                      label="Role"
                      value={selectedRole}
                      onChange={handleRoleChange}>
                      
                      <MenuItem value="S">Student</MenuItem>
                      <MenuItem value="I">Instructor</MenuItem>
                    </Select>
                  </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={3} mb={2}>
              <Grid item md={6} xs={12}>
                  <TextField fullWidth label="Password" variant="outlined"
                      type="password"
                      onChange={e => setPassword(e.target.value)}
                      error={passwordError}/>
              </Grid>
              <Grid item md={6} xs={12}>
              <TextField fullWidth label="Repeat Password" variant="outlined"  type="password"
                      onChange={e => setRpassword(e.target.value)}
                      error={passwordError}
                    />
              </Grid>
            </Grid>

            <Grid container justifyContent={'center'}>
              <Button variant="contained" onClick={handleSubmit}
              sx={{ mt: 2, backgroundColor: 'primary.main', color: 'white' }}>
              Sign Up
            </Button>
            </Grid>
        </CardContent>
      </Card>

      {isLoading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          }}
        >
          <CircularProgress />
        </Box>
      )}
      </Grid>
      </Grid>
    </Box>
  );
};

export default SignUp;