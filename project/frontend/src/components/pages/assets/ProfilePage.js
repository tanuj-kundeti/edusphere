import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import { deepOrange, deepPurple } from "@mui/material/colors";

var baseUrl = "https://edusphere.vercel.app"


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    backgroundColor: '#F8F8F8',
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  name: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    marginTop: theme.spacing(2),
  },
  bio: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(2),
  },
}));

function ProfilePage() {
  const classes = useStyles();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
  });

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await fetch(baseUrl + `/api/profile/?userId=${localStorage.getItem("userId")}`, {
          method: 'GET',
        });
        const data = await response.json();
        setUser({
          firstName: data.firstName,
          lastName: data.lastName,
          emailAddress: data.email_address,
          userType: data.userType,
        });
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
    getProfile(); 
  }, []);

  let userTypeText = "";
  if (user.userType == "S") {
    userTypeText = "Student";
  } else if (user.userType == "I" || user.userType == 'i') {
    userTypeText = "Instructor";
  } else if (user.userType == "A" || user.userType == 'a') {
    userTypeText = "Admin";
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Avatar style={{backgroundColor: 'blueviolet'}}>

              {user.firstName.charAt(0).toUpperCase()}
            </Avatar>
            
            <Typography className={classes.name}>
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="subtitle1" className={classes.bio}>Email: {user.emailAddress}</Typography>
            <Typography variant="subtitle1" className={classes.bio}>Account Type: {userTypeText}</Typography>
            {/* <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Edit Profile
            </Button> */}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProfilePage;
