import React, { Component } from "react";
import $ from 'jquery'; 
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import '../styles/login.css';
import '../styles/common.css';
import Button from '@mui/material/Button';

var baseUrl = "https://edusphere.vercel.app"


class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname : "",
      lname : "",
      password : "",
      rpassword : "",
      email : ""
    };
    this.getUserDetails = this.getUserDetails.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.getUserDetails();
  }

  getUserDetails() {
      // var baseUrl = window.location.href.split(window.location.pathname)[0];
      $.ajax({
        url:  baseUrl + '/api/testjson/',
        dataType: 'json',
        method: 'GET',
        success: function(data) {
          // var jsonData = JSON.parse(data);
          console.log("IN API CALL : ",data)

        }.bind(this),
        error: function(xhr, status, err) {
          console.error(status, err);
        }.bind(this)
      });
    }

    handleSubmit() {
      // var baseUrl = window.location.href.split(window.location.pathname)[0];
      $.ajax({
        url:  baseUrl +'/api/signup/',
        dataType: 'json',
        method: 'POST',
        data: JSON.stringify({
                  "fname":"akshay",
                  "lname": "n",
                  "email" : "narkhede@gmail.com",
                  "password" : "12345678",
                  "rpassword" : "12345678",
              }),
        success: function(data) {
          // var jsonData = JSON.parse(data);
          console.log("IN API CALL : ",data)

        }.bind(this),
        error: function(xhr, status, err) {
          console.error(status, err);
        }.bind(this)
      });
    }

  render() {
    return (
      <div>
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

                                <TextField fullWidth label="First Name" id="fname" variant="outlined"/> <br/>
                                <TextField fullWidth label="Last Name" id="lname" variant="outlined"/>

                                <TextField fullWidth label="Email" id="username" variant="outlined"/>

                                <TextField fullWidth label="Password" variant="outlined" id="password" type="password"/>
                                <TextField fullWidth label="Repeat Password" variant="outlined" id="rpassword" type="password"/>
                                <Button variant="contained" onClick={this.handleSubmit}>Submit</Button>
                </Box>
            </div>
      </div>
    );
  }
}

export default SignUp;