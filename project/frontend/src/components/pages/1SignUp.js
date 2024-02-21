import React from 'react'
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import '../styles/login.css';
import '../styles/common.css';
import Button from '@mui/material/Button';
import CSRFToken from "./CSRFToken";
import axios from 'axios'; 

var baseUrl = "https://edusphere.vercel.app"

const handleSubmit = (e) => {
    axios({
      method: 'POST',
      url: baseUrl+'/api/signup/',
      data: { event: this.state },
      headers: {
        'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
      }
    })
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
    e.preventDefault()
  }

const SignUp = (props) => {
    return (
        <React.Fragment>
            <div className='body'>
                <h2 className='center'>Sign up</h2>

                <Box
                    component="form"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        '& > :not(style)': { m: 1 },
                      }}
                    >
                        {/* <TextField id="filled-basic" label="Username/Email" variant="filled" />
                        
                        <TextField id="filled-basic" label="Password" variant="filled" /> */}
                        {/* <TextField fullWidth label="Username/Email" id="fullWidth" />
                        <TextField fullWidth label="Password" />
                        <Button variant="contained">Login</Button> */}

                                <TextField fullWidth label="First Name" id="fname" variant="outlined"/>
                                <TextField fullWidth label="Last Name" id="lname" variant="outlined"/>

                                <TextField fullWidth label="Email" id="username" variant="outlined"/>

                                <TextField fullWidth label="Password" variant="outlined" id="password" type="password"/>
                                <TextField fullWidth label="Repeat Password" variant="outlined" id="rpassword" type="password"/>
                                <Button variant="contained" onClick={this.handleSubmit}>Submit</Button>
                </Box>
            </div>
        </React.Fragment>
    )
}

export default SignUp;