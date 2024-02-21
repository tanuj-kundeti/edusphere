import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import { Link } from "react-router-dom";
import DOMPurify from 'dompurify';
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box';

export default function CourseCardBrowse({ courseId, courses, onDetailsClick }) {
  const course = courses.find(course => course.courseId === courseId);

  const images = ['course1.jpg', 'course2.jpg', 'course3.jpg', 'course4.jpg', 'course5.jpg', 'course6.jpg', 'course7.jpg', 'course8.jpg', 'course9.jpg']; // add more file names as needed
  const randomIndex = Math.floor(Math.random() * images.length);
  const imageSrc = require(`../assets/courseimages/${images[randomIndex]}`).default;
  console.log(imageSrc)
  const handleDetailsClick = () => {
    onDetailsClick(course);
  };

  return (
    <ButtonBase onClick={handleDetailsClick} sx={{ width: "100%",height:"100%" }}>
        <Card sx={{width:"100%",height:"100%"}}>
          <CardMedia
            component="img"
            height="140"
            width="100%"
            sx={{
              objectFit: "cover",
              maxWidth:"100%",
              maxHeight:"100%"
            }}
            image={imageSrc}/>
          <CardContent>
          <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
            <Typography gutterBottom variant="h6" fontWeight="bold" component="div" sx={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textAlign: "left",
                      marginBottom: 0
                    }}
                    truncate={10}>
              {course.courseName}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textAlign: "left",marginBottom: 0
                    }}
                    truncate={100}>
                {<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(course.courseDescription)}}/>}
            </Typography>
            </Box>
          </CardContent>
          
        </Card>
      </ButtonBase>
  );
}
