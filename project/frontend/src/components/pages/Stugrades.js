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


const StuGrades = () => {
  const[assignments,setAssignments] = useState([]);

  const {courseId} = useParams();
  const userId = localStorage.getItem('userId');
  const [comments, setComments] = useState({});
  const [grds, setGrds] = useState({});
  const [totalScore,setTotalScore] = useState(0);
  const [totalMaxPoints,setTotalMaxPoints] = useState(0);
  const [percentage, setPercentage] = useState(0);

  console.log('course',courseId);
  var baseUrl = "https://edusphere.vercel.app"
  // var baseUrl = "http://127.0.0.1:8000/"


  const getAssignments = async()=>{
    try {
      const response = await fetch(baseUrl + `/api/student_check_grade?username=${userId}&courseId=${courseId}`, {
        method: 'GET',
      });
      const data = await response.json();
      setAssignments(data.Response);
    } catch (error) {
      console.error(error);
    }
  }


  useEffect( () => {    
    getAssignments();
    }, []);

useEffect( () => {    
    var tscore = assignments.reduce((sum, assignment) => sum + assignment.Score, 0)
    var tmaxscore = assignments.reduce((sum, assignment) => sum + assignment["Max points"], 0)
    var tpercentage = tmaxscore > 0 ? (tscore / tmaxscore) * 100 : 0
    console.log("Student Grades page : Total Score ", tscore," out of ",tmaxscore, " percentage : ",tpercentage)
    setTotalScore(tscore);
    setTotalMaxPoints(tmaxscore)
    setPercentage(tpercentage);
    }, [assignments]);

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
            <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: 2 }}>
                Grades
            </Typography>
            </Grid>
            <Grid item>
            {percentage && percentage > 0 ?
            <Typography variant="subtitle1">
                Score: {percentage.toFixed(2)}%
            </Typography>
            :
            <Typography variant="subtitle1">
                Score: 0
            </Typography>
            }
            </Grid>
        </Grid>
      {assignments.length > 0 && (
        <Grid container>
          <Grid item md={12} xs={12}>
        <TableContainer component={Card}>
          <Table sx={{ '& td, & th': { border: '1px solid rgba(224, 224, 224, 1)' } }}>
            <TableHead sx={{fontWeight:"bold"}}>
              <TableRow sx={{fontWeight:"bold"}}>
                <TableCell sx={{fontWeight:"bold",backgroundColor: '#f5f5f5'}} align="center">Assignment</TableCell>
                <TableCell sx={{fontWeight:"bold",backgroundColor: '#f5f5f5'}} align="center">Due Date</TableCell>
                <TableCell sx={{fontWeight:"bold",backgroundColor: '#f5f5f5'}} align="center">Score</TableCell>
                <TableCell sx={{fontWeight:"bold",backgroundColor: '#f5f5f5'}} align="center">Max Points</TableCell>
                <TableCell sx={{fontWeight:"bold",backgroundColor: '#f5f5f5'}} align="center">Comments</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assignments.map((assignment, index)=> (
                <TableRow key={assignment["Assignment Name"]}>
                  <TableCell align="center" component="th" scope="row">
                    {assignment["Assignment Name"]}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {assignment["Due Date"]}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {assignment.Score}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {assignment["Max points"]}
                  </TableCell>
                  <TableCell align="center">
                  {assignment.comments}
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

export default StuGrades;





