import { useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import DOMPurify from 'dompurify';

// ...
var baseUrl = "https://edusphere.vercel.app"


function CourseCard({ course, isEnrolled, username }) {
  const [expanded, setExpanded] = useState(false);
  const [enrolled, setEnrolled] = useState(isEnrolled);
  const courselvl = {"i":"Intermediate","b":"Beginner","a":"Advanced"}
  const [showMessage, setShowMessage] = useState(false);
  
  // console.log(course,isEnrolled);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleEnrollClick = async () => {
    try {
      const response = await fetch(baseUrl + '/api/enroll-course', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          courseId: course.id,
        }),
      });
      
      console.log(course.id);
      const data = await response.json();
      if(data.Status == "Success"){
        setEnrolled(true);
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 2000);
      }

      console.log(data);

    } catch (error) {
      // Handle network errors
      console.error('Network error:', error);
    }

    // Perform any API calls or other actions needed to enroll the student in the course
  };

  const EnrollButton = () => {
    if (enrolled) {
      return (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<CheckIcon />}
          sx={{
            pointerEvents: 'None',
            cursor: "default",
            borderColor: "primary.main",
            textTransform: "none",
            marginRight: 1,
            transition:"none"
          }}
          // disabled = {true}
          disableRipple={true}
        >
          Enrolled
        </Button>
      );
    } else {
      return (
        <Button
          variant="outlined"
          color="primary"
          sx={{
            borderColor: "primary.main",
            textTransform: "none",
            marginRight: 1,
          }}
          onClick={handleEnrollClick}
        >
          Enroll
        </Button>
      );
    }
  };
  // "#f5f5f5"
  return (
    <Card sx={{ width: "100%", mb: 1, backgroundColor: "#f5f5f5" }}>

    {showMessage && (
          <Grid container justifyContent="center">
            <Typography variant="h6" fontWeight="bold" color="success.main">
              Successfully enrolled in {course.name}!
            </Typography>
            </Grid>
        )}
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6" >
              {course.name}
            </Typography>
          </Grid>
          <Grid item>
            <EnrollButton />
            <IconButton
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="subtitle1" color="text.secondary">
            Description:
          </Typography>
          <Typography paragraph><div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(course.description) }}/>
</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Professor:
          </Typography>
          <Typography paragraph>{course.professorName}</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Course Level: {courselvl[course.cLevel]}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Course Id: {course.id}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

// ...

export default CourseCard;