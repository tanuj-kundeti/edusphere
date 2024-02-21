import React, { useState,useEffect } from 'react';
import '../styles/createassignments.css';
import TextField  from '@material-ui/core/TextField';
import {Editor} from '@tinymce/tinymce-react'
import DOMPurify from 'dompurify';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import { useParams } from "react-router-dom";
import { useRef } from 'react';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import CircularProgress from '@mui/material/CircularProgress';

var baseUrl = "https://edusphere.vercel.app"

const CreateAssignment = ({courseid,setCreate,setShowMessage, getAssignments}) => {
    const [assignments, setAssignments] = useState([]);
    const [title, setTitle] = useState('');
    const [points, setPoints] = useState(100);
    const [selectedFile, setSelectedFile] = useState(null);
    const [duedate, setDuedate] = useState(null);
    const [description, setDescription] = useState('');
    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState('');
    const[isLoading,setIsLoading] = useState(false);

    const userId = localStorage.userId;

    const onChangedesc=(e)=>{
      setDescription(e.target.getContent());
    }
    
    const handleNewAssignment = (title, points, file) => {
        const newAssignment = { title, points, file };
    setAssignments([...assignments, newAssignment]);
    };

    const handleSubmit = async (event) =>{
      event.preventDefault();
      setCreate(false);
      const file = fileInputRef.current.files[0];
      const formData = new FormData();

      formData.append('file', file);
      formData.append('userid', userId);
      formData.append('courseid', courseid);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('assignmentid', 1); // Replace 1 with the actual assignment ID
      formData.append('points', points);
      formData.append('duedate', duedate);

      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      try {
        const response = await fetch(baseUrl +'/api/professor_upload_assignment', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        console.log('checl',data);
        setShowMessage(true);
        getAssignments()
        setTimeout(() => {
          setShowMessage(false);
        }, 2000);
      } catch (error) {
        // Handle network errors
        console.error('Network error:', error);
      }
    }

    useEffect(() => {
      console.log('cehck',userId);
    }, []);

    
    const handleCardClick = (assignment) => {
      window.open(assignment.file);
    };
    
    const handleTitleChange = (e) => {
      setTitle(e.target.value);
      console.log(title);
    };
    
    const handlePointsChange = (e) => {
      setPoints(e.target.value);
    };
    
    const handleDateChange = (newdate) => {
      setDuedate(newdate.format('YYYY-MM-DD HH:mm'));
      // console.log(newdate.d);
      console.log('Formatted date:', newdate.format('YYYY-MM-DD HH:mm'))
    };

    const handleFileChange = (e) => {
      console.log(e.target.files[0]);
      setFileName(e.target.files[0].name);
    };


    return (
      <form id="assignment-form" encType="multipart/form-data" onSubmit={(event) => handleSubmit(event)}>
      <Box sx={{marginTop:"20px" }}>
        <Grid container spacing={3}>
          <Grid item xs={11} md={11} l={11}>
            <TextField fullWidth variant="outlined" label="Title" onChange={handleTitleChange} required />
          </Grid>
          <Grid item xs={11} md={11} l={11}>
            <Typography variant="string" fontWeight="bold">Description:</Typography>
          </Grid>
          <Grid item xs={11} md={11}>
            <Editor
              apiKey="g6npcs2t24w5uzje2ln7lxmz4nzy4t2tly1wjmj1rfbhhas0"
              initialValue=""
              init={{
                branding: false,
                height: 100,
                menubar: true,
                plugins:
                  "print preview paste searchreplace autolink directionality visualblocks visualchars fullscreen link template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern textcolor",
                toolbar:
                  "formatselect | bold italic underline strikethrough | forecolor backcolor blockquote | link | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat",
                image_advtab: true,
              }}
              onChange={onChangedesc} required
            />
          </Grid>
          <Grid item xs={11} md={4} justifyContent={'center'}>
              <Button variant="outlined" size='large' component="label"  startIcon={<FileUploadOutlinedIcon/>}>
                Select File
                <input ref={fileInputRef} hidden accept=".doc,.docx,.pdf,.txt" type="file" onChange={handleFileChange} required/>
              </Button>
              {fileName && (
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                 {fileName}
              </Typography>
            )}
          </Grid>
          <Grid item xs={11} md={4}>
            {/* <Typography variant="h6">Points:</Typography> */}
            <TextField variant='outlined' size='medium'  label='Points' onChange={handlePointsChange} required>Points</TextField>
          </Grid>
          <Grid item xs={11} md={4}>
            {/* <Typography variant="h6">Due Date:</Typography> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker label="Due Date" size='medium' onChange={handleDateChange} required/>
            </LocalizationProvider>
          </Grid>
            <Grid container marginTop={2} xs={11} md={11} display="flex" justifyContent="center">
              <Button variant="contained" color="primary" type="submit">
                Create
              </Button>
            </Grid>
        </Grid>
      </Box>
      </form>
    );
    
};

export default CreateAssignment;