import React, { Component } from "react";
import $ from 'jquery'; 
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import '../styles/login.css';
import '../styles/common.css';
import Button from '@mui/material/Button';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password : "",
      email : ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
  }


    handleSubmit() {
      // var baseUrl = window.location.href.split(window.location.pathname)[0];
      $.ajax({
        url:   baseUrl + '/api/login/',
        dataType: 'json',
        method: 'POST',
        data: JSON.stringify({
                  "email" : "narkhede.aks@gmail.com",
                  "password" : "12345678",
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
                <h2 className='center'>Login</h2>

                <Box component="form">
                                <TextField fullWidth label="Email" id="username" variant="outlined"/>
                                <TextField fullWidth label="Password" variant="outlined" id="password" type="password"/>
                                <Button variant="contained" onClick={this.handleSubmit}>Login</Button>
                </Box>
            </div>
      </div>
    );
  }
}

export default Login;