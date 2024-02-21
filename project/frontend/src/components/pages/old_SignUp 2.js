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
    if (password !== rpassword) {
      setPasswordError(true);
      setErrorMessage('Passwords do not match');
    } else {
      setPasswordError(false);
      setErrorMessage('');
    }
  }, [rpassword]);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
    console.log(selectedRole);
  };

  const handleSubmit = async () => {
  
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
  };
  
  return (  
    <div>
      <Box display={isLoading ? 'none' : 'flex'} flexDirection="column" alignItems="center" justifyContent={"center"} width={"100%"}>
      <Card sx={{ mt:2, alignItems:"center",p: 2, boxShadow: '0 0 70px rgba(0, 0, 0, 0.1)', border: '2px solid rgba(0, 0, 0, 0.1)' }}>
      <CardContent sx={{width:"100%"}}>
           
        <div className='body'>
                <Typography variant='string' fontWeight={"bold"}>Create Account</Typography>
                {/* <h3 className='center'>Create Account</h3> */}
                <Box className='center' component="form">
                  {errorMessage && (
                      <Alert severity="error" sx={{ mb: 2 }}>
                        {errorMessage}
                      </Alert>
                    )}
                  <Box display="flex" gap={2} mb={3}>
                  <TextField sx={{ flexGrow: 1 }}  label="First Name" id="fname_field" variant="outlined" 
                  value={fname} 
                  onChange={e => setFname(e.target.value)} />
                    
                  <TextField sx={{ flexGrow: 1 }}  label="Last Name" id="lname_field" 
                    variant="outlined" value={lname}
                    onChange={e => setLname(e.target.value)} />
                  
                  </Box>

                  <Box display="flex" gap={2} mb={3}>

                  <FormControl fullWidth >
                    <InputLabel>Select Role</InputLabel>
                    <Select sx = {{textAlign:'left'}}
                      fullWidth
                      label="Role"
                      value={selectedRole}
                      onChange={handleRoleChange}>
                      
                      <MenuItem value="S">Student</MenuItem>
                      <MenuItem value="I">Instructor</MenuItem>
                    </Select>
                  </FormControl>
                  
                  <TextField sx={{ mb: 1 }} fullWidth label="Email" id="username" variant="outlined"
                    onChange={e => setEmail(e.target.value)}/>
                  </Box>

                  <Box display="flex" gap={2} mb={1}>

                    <TextField sx={{ mb: 1 }} fullWidth label="Password" variant="outlined" id="password"
                      type="password"
                      onChange={e => setPassword(e.target.value)}
                      error={passwordError}
                      />
                      
                    <TextField sx={{ mb: 4 }} fullWidth label="Repeat Password" variant="outlined" id="rpassword" 
                      type="password"
                      onChange={e => setRpassword(e.target.value)}
                      error={passwordError}
                    />
                  </Box>
                  <Button variant="contained" onClick={handleSubmit} disabled={passwordError}>Sign Up</Button>
                </Box>
            </div>
            </CardContent>
          </Card>
          </Box>
            {isLoading && (
              <Box className="center">
                {/* <Skeleton variant="rect" width={210} height={118} />; */}

                <CircularProgress />
              </Box>
            )}
      </div>
  );
};

export default SignUp;