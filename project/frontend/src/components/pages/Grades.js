import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Card from  '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

var baseUrl = "https://edusphere.vercel.app"
// var baseUrl = "http://127.0.0.1:8000"


const Grades = () => {
  const [selectedAssignment, setSelectedAssignment] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const[assignments,setAssignments] = useState([]);

  const {courseId} = useParams();
  const userId = localStorage.getItem('userId');
  const [comments, setComments] = useState({});
  const [grds, setGrds] = useState({});
  const [showMessage, setShowMessage] = useState(false);
  const [submittedStudentName, setSubmittedStudentName] = useState();
  const[editmode, setEditmode] = useState([]);

  const toggleEditMode = (userId, mode) => {
    setEditmode({
      ...editmode,
      [userId]: mode
    });
  };

  
  console.log('course',courseId);

  useEffect( () => {
    
    const getAssignments = async()=>{
      try {
        const response = await fetch(baseUrl +`/api/get_professor_created_assignment?username=${userId}&courseId=${courseId}`, {
          method: 'GET',
        });
        const data = await response.json();
        setAssignments(data.response);
      } catch (error) {
        console.error(error);
      }
    }
    getAssignments();
  
    }, []);

  const fetchSubmissions = async (assignmentId) => {
      try {
      const response = await fetch( baseUrl + `/api/professor_list_gradebookview?courseId=${courseId}&assignmentId=${assignmentId}`,
       {
        method: 'GET',
      });
      const data = await response.json();
      if (data) {
        setSubmissions(data);
        console.log('Incoming data',data)
        }
        else {
          console.log('Failed');
        }
      }
      catch{
        console.log('failed');}
    };


  const handleCommentChange = (event, userId) => {
      setComments({
        ...comments,
        [userId]: event.target.value
      });
    };

  const handleAssignmentSelect = (event) => {
    const assignmentId = event.target.value;
    setSelectedAssignment(assignmentId);
    fetchSubmissions(assignmentId);
  };

  const handleMarksChange = (event, stuId) => {
    const updatedMarks = parseInt(event.target.value);
    const maxPoints = submissions[0].maxPoints;
    if (updatedMarks > maxPoints) {
      setGrds({
        ...grds,
        [stuId]: maxPoints
      });
    } else {
    setGrds({
      ...grds,
      [stuId]: event.target.value
    });}
  };

  const handleSubmitGrade = async (userId, points, comments, assignmentId,submission) => {
    // Handle the grade submission logic here
    try {
      const response = await fetch( baseUrl+ '/api/instuctor_grade_assignment', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "userid":userId,
            "assignmentId": assignmentId,
            "courseId": courseId,
            "points": points,
            "comments": comments,
        }),
      });
      const data = await response.json();
      console.log('check',data);
    } catch (error) {
      // Handle network errors
      console.error('Network error:', error);
    }
    setSubmittedStudentName(submission.studentfirstname+' '+submission.studentlastname);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
    console.log("Submitting grade for", userId, points, comments, assignmentId, courseId);
    fetchSubmissions(assignmentId);
    toggleEditMode(userId, false);
  };
  

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: 2 }}>
        Gradebook
      </Typography>
      <Grid container>
        <Grid item xs={9} sm={6} md={4}>
        <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
        <InputLabel id="assignment-select-label">Select Assignment</InputLabel>
        <Select
          labelId="assignment-select-label"
          id="assignment-select"
          value={selectedAssignment}
          onChange={handleAssignmentSelect}
          label="Select Assignment"
        >
          {assignments.map((assignment) => (
            <MenuItem key={assignment.assingnmentNumber} value={assignment.assingnmentNumber}>
              {assignment.assingnmentTitle}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </Grid>
      </Grid>

      {showMessage && (
        <Grid container justifyContent="center">
          <Typography variant="h6" fontWeight="bold" color="success.main">
            Grade submitted successfully for {submittedStudentName}!
          </Typography>
          </Grid>
      )}

      {submissions.length > 0 && (
        <Grid container>
          <Grid item md={12} xs={12} sm={12}>
            <Typography fontWeight="bold" variant='body1' sx={{marginBottom:2}}>Submissions</Typography>
          </Grid>
          <Grid item md={12} xs={12}>
        <TableContainer component={Card}>
          <Table sx={{ '& td, & th': { border: '1px solid rgba(224, 224, 224, 1)' } }}>
            <TableHead sx={{fontWeight:"bold"}}>
              <TableRow sx={{fontWeight:"bold"}}>
                <TableCell sx={{fontWeight:"bold",backgroundColor: '#f5f5f5'}} align="center">Student</TableCell>
                <TableCell sx={{fontWeight:"bold",backgroundColor: '#f5f5f5'}} align="center">Submission Date</TableCell>
                <TableCell sx={{fontWeight:"bold",backgroundColor: '#f5f5f5'}} align="center">Submission</TableCell>
                <TableCell sx={{fontWeight:"bold",backgroundColor: '#f5f5f5'}} align="center">Max Points</TableCell>
                <TableCell sx={{fontWeight:"bold",backgroundColor: '#f5f5f5'}} align="center">Grade</TableCell>
                <TableCell sx={{fontWeight:"bold",backgroundColor: '#f5f5f5'}} align="center">Comments</TableCell>
                <TableCell sx={{fontWeight:"bold",backgroundColor: '#f5f5f5'}} align="center">Submit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {submissions.map((submission, index)=> (
                <TableRow key={submission.submissionId}>
                  <TableCell align="center" component="th" scope="row">
                    {submission.studentfirstname+' '+submission.studentlastname}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {submission.isSubmittedDate? new Date(submission.isSubmittedDate).toLocaleString():"NA"}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    <a href ={submission.assignmentlink} target="_blank" rel="noopener noreferrer">Link</a>
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {submission.maxPoints}
                  </TableCell>

                  <TableCell align="center">
                      {editmode[submission.userId] || submission.receivedPoints === null ? (
                        <TextField
                          type="number"
                          InputProps={{ inputProps: { min: 0, max: submission.maxPoints } }}
                          value={submission.receivedPoints}
                          size="small"
                          onChange={(event) => handleMarksChange(event, submission.userId)}
                        />
                      ) : (
                      <Box sx={{ display: 'flex', alignItems: 'center' ,justifyContent:"spacebetween"}}>
                          <Typography>{submission.receivedPoints}</Typography>
                          <EditIcon fontSize="small"
                            onClick={() => toggleEditMode(submission.userId, true)}
                            sx={{ cursor: 'pointer' ,marginLeft: 2}}
                          />
                        </Box>
                      )}
                  </TableCell>
                  <TableCell align="center">
                    {editmode[submission.userId] || submission.receivedPoints === null ? (
                      <TextField
                        type="text"
                        value={submission.comments || ''}
                        size="small"
                        onChange={(event) => handleCommentChange(event, submission.userId)}
                      />
                    ) : (
                      <Box sx={{ display: 'flex', alignItems: 'center' ,justifyContent:"spacebetween"}}>
                        <Typography>{submission.comments}</Typography>
                        <EditIcon fontSize="small"
                          onClick={() => toggleEditMode(submission.userId, true)}
                          sx={{ cursor: 'pointer',marginLeft: 2  }}
                        />
                      </Box>
                    )}
                  </TableCell>
                  {/* <TableCell align="center">
                  <TextField
                      type="text"
                      value={comments[submission.userId] || ''}
                      size="small"
                      onChange={(event) => handleCommentChange(event, submission.userId)}
                    />
                  </TableCell> */}
                  <TableCell align="center">
                    <Button onClick={() => handleSubmitGrade(submission.userId, grds[submission.userId], comments[submission.userId], selectedAssignment,submission)}>Submit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Grades;





