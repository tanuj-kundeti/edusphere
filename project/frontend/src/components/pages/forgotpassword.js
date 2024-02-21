import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

var baseUrl = "https://edusphere.vercel.app"


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const API_ENDPOINT = baseUrl + "/api/recover/";

    try {
        console.log(email);
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        setIsLoading(false);
        setSuccessMessage(
          "A password reset link has been sent to your email address."
        );
      } else {
        setIsLoading(false);
        setErrorMessage(data.Status || "An error occurred. Please try again.");
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage("A network error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="body">
      <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems: "center",
            "& > :not(style)": { m: 3 },
          }}
        >
        <h2 className="center">Forgot Password</h2>
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
       
       <Box display="flex" gap={2} mb={3}>
          <TextField sx={{ width: "80%" }}
            fullWidth
            label="Email"
            id="email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Send Reset Link
          </Button>
        </Box>
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

export default ForgotPassword;
