import React, { useState,useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate, useLocation } from "react-router-dom";

var baseUrl = "https://edusphere.vercel.app"


const PasswordRecovery = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
  }, []);

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    } else if (password.length<8) {
        setErrorMessage("Passowrd should be atleast 8 characters long");
        return;
    }

    const id = new URLSearchParams(location.search).get("id");
    const username = new URLSearchParams(location.search).get("username");

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const API_ENDPOINT = baseUrl + `/api/recover_confirm/?id=${id}&username=${username}`;

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "PUT",
        body: JSON.stringify({
          password: password,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setIsLoading(false);
        if (data.Status === 'Success') {
            setSuccessMessage("Your password has been successfully reset.");
            navigate('/login',{ state: { message: 'Your password has been successfully reset.Please login to continue.' } });
        }
        else {
        setErrorMessage("The link is not valid!");
        }
        
      } else {
        setIsLoading(false);
        setErrorMessage(data.Status || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setErrorMessage("A network error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="body">
        <h2 className="center">Password Recovery</h2>
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}
        <Box
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            "& > :not(style)": { m: 1 },
          }}
        >
          <TextField
            fullWidth
            label="New Password"
            id="new-password"
            variant="outlined"
            type="password"
            sx={{ width: "50%" }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            fullWidth
            label="Confirm New Password"
            id="confirm-password"
            variant="outlined"
            type="password"
            sx={{ width: "50%" }}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={passwordError}
          />
          <Button variant="contained" onClick={handleSubmit} disabled={passwordError}>
            Reset Password
          </Button>
        </Box>
        {isLoading && (
          <Box className="center">
            <CircularProgress />
          </Box>
        )}
      </div>
    </>
  );
};

export default PasswordRecovery;
