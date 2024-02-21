import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import { useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { useRef } from 'react';
import { useParams,Link } from "react-router-dom";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import DOMPurify from 'dompurify';
import CircularProgress from '@mui/material/CircularProgress';

var baseUrl = "https://edusphere.vercel.app"
// var baseUrl = "http://127.0.0.1:8000/"


const AssignmentDetails = () => {
    const location = useLocation();
    // const assignment = location.state?.assignment;
    const fileInputRef = useRef(null);
    const userId = localStorage.getItem('userId');
    const {courseId,assignmentId} = useParams();
    const userType = localStorage.getItem('userType');
    const [submitted, setSubmitted] = useState(false);
    const [fileName, setFileName] = useState('');
    const[isLoading,setIsLoading] = useState(false);
    
    const assignment = location.state.assignment;
    console.log('ch',assignment);
    
    const handleFileChange = (e) => {
      console.log(e.target.files[0]);
      setFileName(e.target.files[0].name);
    };
    

    const handleSubmit = async (event) =>{
        setIsLoading(true);
        event.preventDefault();
        const file = fileInputRef.current.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('username', userId);
        formData.append('courseid', courseId);
        formData.append('assignmentid', assignment.assingnmentNumber);

        for (const [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }
  
        try {
          const response = await fetch( baseUrl+'/api/student_upload_assignment', {
            method: 'POST',
            body: formData,
          });
          const data = await response.json();
          console.log('checl',data);
          setSubmitted(true);
          setIsLoading(false);
        } catch (error) {
          // Handle network errors
          console.error('Network error:', error);
        }
      }


  return (
    <>
    <Box display={isLoading?'none':'flex'}>
    {assignment && (<Box>
      <Grid container spacing={4} justifyContent="space-between"  alignItems="center" sx={{ marginBottom: "0px",marginTop:0.5 }}>
        <Grid item md={10}>
          <Typography variant='h6' fontWeight="bold">{assignment.assingnmentTitle}</Typography>
          <Typography variant="body2" color='text.secondary' >Due: {new Date(assignment.dueDate).toLocaleString()}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
            <Typography variant="string" color='text.primary' fontWeight="bold">Possible Points:{assignment.maxPoints}</Typography>
        </Grid>
       </Grid>
        <Grid container marginTop={2}>
            <Grid item xs={12} md={12}>
                <Typography variant="string" fontWeight="bold">Description:</Typography>
            </Grid>
            <Grid item md={12} sx={{marginTop:0}}>
                <Typography variant='string' >{<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(assignment.description) }}/>}</Typography>
            </Grid>
            <Grid item md={12}>
              <Box display="flex" alignItems="center">
                <Typography variant="string" fontWeight="bold">
                  File Link:
                </Typography>
                <a href={assignment.assignmentLink} target="_blank" rel="noopener noreferrer">
                  <Typography variant="string" sx={{ marginLeft: 1 }}>
                    Link
                  </Typography>
                </a>
              </Box>
            </Grid>

        {userType.toLowerCase()==='s' && (
        <Grid item xs={12} md={12} marginTop={2}>
        <Typography variant="string" fontWeight="bold">
          Submission:
        </Typography>
        <Box mt={2}>
          <form
            id="assignment-form"
            encType="multipart/form-data"
            onSubmit={(event) => handleSubmit(event)}
          >
            <Box display="flex" alignItems="center">
              <Button
                variant="outlined"
                component="label"
                startIcon={<FileUploadOutlinedIcon />}
              >
                {submitted ? 'File Submitted' : 'Select File'}
                <input
                  ref={fileInputRef}
                  hidden
                  accept=".doc,.docx,.pdf,.txt"
                  type="file"
                  onChange={handleFileChange}
                />
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ marginLeft: 1 }}
                disabled={submitted}
              >
                {submitted ? 'Submitted' : 'Submit'}
              </Button>
            </Box>
            {fileName && !submitted && (
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                File: {fileName}
              </Typography>
            )}
          </form>
        </Box>
      </Grid>
      
        )}
      </Grid>
    </Box>)}
    </Box>
    <Box justifyContent="center" display="flex">
    {isLoading && <CircularProgress/>}</Box>
    </>
  );
};

export default AssignmentDetails;
