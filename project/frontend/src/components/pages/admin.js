import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import DOMPurify from 'dompurify';

var baseUrl = "https://edusphere.vercel.app"


const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const adminid = localStorage.getItem('userId');
  const userType = localStorage.getItem("userType");
  const [showMessage, setShowMessage] = useState(false);
  const [approve,setApprove] = useState(true);

  const[coursenm, setCoursenm] = useState();

  const [expanded, setExpanded] = useState({});
  const handleExpandClick = (courseId) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [courseId]: !prevExpanded[courseId],
    }));
      };

  const getAllCourses = async () => {

    try {
      const response = await fetch(baseUrl + '/api/admin-course-view', {
        method: 'GET',
      });
      const data = await response.json();
      if (data.Status === "Success") {
        setCourses(data.response);
        console.log(data.response);
      }
      else {
        console.log('failed');
        console.log(data.response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  const handleClick = async ({course,isApproved})=>{
    console.log(course,isApproved);
    setCoursenm(course.courseName);
    try {
      const response = await fetch(baseUrl + '/api/admin-approve-course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              "userId":adminid,
              "courseId": course.courseId,
              "decision": isApproved ? "approve" : "reject"
          }),
      });
      console.log('checl')
      const data = await response.json();
      if (data.Status === "Success") {
        console.log(data.response);
        getAllCourses();
        setShowMessage(isApproved ? true : false);
        setTimeout(() => {
          setShowMessage(false);
        }, 2000);
        }
        else {
          console.log('failed');
          console.log(data.response);
        }
      } catch (error) {
        console.error(error);
    }
  };

  return (
    <Box mt={3} ml={3} mr={3} >
      <Grid container justifyContent="space-between">
        <Grid item>
      <Typography variant='string' fontWeight="bold">Admin View - Approve Courses</Typography>
      </Grid>
      <Grid item>
      <a href='https://edusphere.vercel.app/admin/'  target='_blank' rel="noopener noreferrer">Click here to go to Admin Panel</a>
      </Grid>
      </Grid>
      <Grid container spacing={1} mt={4} >
      {showMessage && (
          <Grid container justifyContent="center">
            <Typography variant="h6" fontWeight="bold" color="success.main">
                {coursenm} approved successfully!
            </Typography>
            </Grid>
        )}
        {courses && (courses.map((course) => (
          <Card sx={{ width: "100%", mb: 1, backgroundColor: "#f5f5f5" }}>
          <CardContent>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography variant="h6" >
                  {course.courseName}
                </Typography>
              </Grid>
              <Grid item>
              <Button variant="outlined" color="primary" sx={{borderColor: "primary.main", textTransform: "none",marginRight: 1,}}
                onClick={()=>handleClick({course: course, isApproved: true})}>
                Approve
              </Button>
              <Button variant="outlined" color="primary" sx={{borderColor: "primary.main", textTransform: "none",marginRight: 1,}}
                onClick={()=>handleClick({course: course, isApproved: false})}>
                Reject
              </Button>

                <IconButton
                  onClick={() => handleExpandClick(course.courseId)}
                  aria-expanded={expanded[course.courseId]}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </Grid>
            </Grid>
          </CardContent>
          <Collapse in={expanded[course.courseId]} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="subtitle1" color="text.secondary">
                Description:
              </Typography>
              <Typography paragraph> <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(course.courseDescription) }}/></Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Professor:
              </Typography>
              <Typography paragraph>{course.professorName}</Typography>
            </CardContent>
          </Collapse>
        </Card>
        )))}

        {(courses.length === 0) && (
          <Grid container justifyContent="center" alignItems="center" style={{ height: '100%' }}>
            <Typography variant="h6" fontStyle="italic" align="center"
              color="text.disabled"> No courses to approve </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
