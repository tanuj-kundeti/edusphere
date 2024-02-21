import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import '../styles/login.css';
import '../styles/common.css';
import Button from '@mui/material/Button';
import { useNavigate,useLocation } from "react-router-dom";
import { useState,useEffect } from "react";
import Alert from "@mui/material/Alert";
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import { GoogleLogin } from '@react-oauth/google';
import GoogleLogin from 'react-google-login';

var baseUrl = "https://edusphere.vercel.app"


const Login = ()=> {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [registrationMessage,setRegistrationMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setRegistrationMessage(location.state?.message);
  }, [location.state?.message]);

  
  const handleSubmit = async() => {
    console.log(email,password);
    setIsLoading(true);
    setRegistrationMessage('');
    try {
      const response = await fetch(baseUrl + '/login/', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        // Handle successful login
        setIsLoading(false);
        if (data.Status.toLowerCase() === 'failed') {
          setErrorMessage('Wrong Password!');
          console.log(errorMessage);
        } else {
          console.log('cec')
          localStorage.setItem("userId", data.userId);
          localStorage.setItem("userFullName", data.userFullName);
          localStorage.setItem("userType", data.userType);
          console.log(data.userId,data.userFullName,data.userType);
          console.log('redirect to dashboard!')
          // const basePath = location.pathname.split('/login')[0];
        if (data.userType==='A') {
            navigate('/admindashboard');
        } else {
        navigate('/dashboard');}
      }
      } else {
        // Handle error from the server
        console.log('Error:', data);
        setIsLoading(false);
        setErrorMessage(data.Status || 'An error occurred. Please try again.');
      }
    } catch (error) {
      // Handle network errors
      console.error('Network error:', error);
      setIsLoading(false);
      setErrorMessage('A network error occurred. Please try again.');
    }
  };

  const responseGoogle = (response) => {
    console.log(response);
  }

  const responseGoogle2 = (response) => {
    if (response.error) {
      console.log("Login failed: ", response.error);
      return;
    }
  
    const id_token = response.tokenId;
    console.log(id_token);
    // Send the ID token to your server for verification and authentication
    // ...
  };
  

  // render() {
    return (
      <>
        <div className='body'>
          <Box display={isLoading ? 'none' : 'flex'} flexDirection="column" alignItems="center" >
          <Card sx={{ minWidth: 500,  height:"70vh",alignItems:"center",p: 2, boxShadow: '0 0 70px rgba(0, 0, 0, 0.1)', border: '2px solid rgba(0, 0, 0, 0.1)' }}>
          <CardContent>
            {registrationMessage && (
              <Alert severity="success" sx={{ marginBottom: 2 }}>
                {registrationMessage}
              </Alert>
            )}
            <h2 className='center'>Login</h2>
            {errorMessage && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {errorMessage}
              </Alert>
            )}
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
              <Box display="flex" flexDirection="column" gap={2} mb={3} alignItems="center">
                <TextField style={{width: "300px"}} label="Email" id="username" variant="outlined" onChange={e => setEmail(e.target.value)} required />
                <TextField style={{width: "300px"}} label="Password" variant="outlined" id="password" type="password"
                  onChange={e => setPassword(e.target.value)} required />
                <Button sx={{alignItems:"center"}} variant="contained" type='submit'>Login</Button>
                
                <GoogleLogin
                  clientId="974079139845-gfaj6bnbq8ovr3rb6mvd9jd8e380mcuh.apps.googleusercontent.com"
                  buttonText="Login with Google"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                  isSignedIn={true}
                />
                <Link sx={{ mt: 2 }} to="/forgotpassword" className="forgot-password-link">Forgot Password?</Link>
              </Box>
            </form>
            </CardContent>
          </Card>
          </Box>
    
          {isLoading && (
            <Box className="center">
              <CircularProgress />
            </Box>
          )}
        </div>
      </>
    );
}    

export default Login;