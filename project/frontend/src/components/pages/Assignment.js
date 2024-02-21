import React from 'react'
import '../styles/assignment.css';
import { useState,useEffect } from 'react';
import '../styles/assignment.css';
import CreateAssignment from './CreateAssignment';
import { useParams } from 'react-router-dom';
// import AssignmentDetail from './entityassignment';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import AddRoundedIcon from '@mui/icons-material/AddRounded'

var baseUrl = "https://edusphere.vercel.app"


const Assignment = () => {
    const [create, setCreate] = useState(false);
    const {courseId} = useParams();

    const [assignments, setAssignments] = useState([]);
    const userId = localStorage.getItem('userId');
    const userType = localStorage.getItem('userType');
    const navigate = useNavigate();
    const [isLoading,setIsLoading] = useState(true);
    const [showMessage, setShowMessage] = useState(false);

    const handleClick = (assignment) => {
      navigate(`./${assignment.assingnmentNumber}`, { state: { assignment } });
    };
    
    const getAssignments = async()=>{
      try {
        const response = await fetch(baseUrl + `/api/get_professor_created_assignment?username=${userId}&courseId=${courseId}`, {
          method: 'GET',
        });
        const data = await response.json();
        setAssignments(data.response);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }

    useEffect(()=>{
      getAssignments();
    },[]);


    const AssignmentsList = ({ assignments }) => {
      return (
        <List>
          {assignments.map((assignment, index) => (
            <React.Fragment key={index}>
              <ListItem >
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      marginBottom={1}
                      onClick={() => handleClick(assignment)}
                      style={{ textDecoration: 'none', cursor: 'pointer' }}
                    >
                      {assignment.assingnmentTitle}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      <strong>Due:</strong> {assignment.dueDate} &nbsp;| &nbsp;
                      <strong>Points:</strong> {assignment.maxPoints}
                    </Typography>}/>
              </ListItem>
              {index < assignments.length - 1 && (
                <Divider sx={{ marginBottom:0,backgroundColor: 'rgba(0, 0, 0, 0.3)' }}  />
              )}
            </React.Fragment>
          ))}
        </List>
      );
    };
    
  
    const BaseAssignment = () => {
      return (
          <Box className="assign-main" marginTop={2} marginRight={2}>
            { userType.toLowerCase() === 'i' &&
            (<Box className="create-btn" display="flex" justifyContent="flex-end">
              <Button variant='contained'startIcon={<AddRoundedIcon/>} onClick={() => (setCreate(!create))}> Create </Button>
            </Box>)}

            {showMessage && (
              <Grid container justifyContent="center">
                <Typography variant="h6" fontWeight="bold" color="success.main">
                 Assignment Created Successfully!
                </Typography>
                </Grid>
            )}

          <Grid container>
            <Grid item md={11} xs={12}>
              {create && <CreateAssignment courseid={courseId} setCreate={setCreate} setShowMessage={setShowMessage} getAssignments={getAssignments}/>}
            </Grid>
            <Grid item md={10}  xs={12}>
              <Card variant="outlined"  sx={{mt: 2, p:0.5, background: '#f5f5f5',
              borderRadius: 1, border:'1px solid rgba(0, 0, 0, 0.3)'}}>
                <CardContent >
                  <Typography variant="string" fontWeight="bold">
                    Assignments
                  </Typography>
                  </CardContent>
              </Card>
              <Card sx={{
                borderLeft: '1px solid rgba(0, 0, 0, 0.3)',
                borderRight: '1px solid rgba(0, 0, 0, 0.3)',
              }}>
                  <Divider sx={{ marginTop: 0 }} />
                    <AssignmentsList assignments={assignments} />
              </Card>
            </Grid>
          </Grid>
          </Box>
          
    );

    };

    return (
      
      <React.Fragment>
        <BaseAssignment/>
      </React.Fragment>
    );
    };
    
export default Assignment;
    