import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CourseCardBrowse from "./CourseCardBrowse";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box'
import CircularProgress from "@material-ui/core/CircularProgress";

var baseUrl = "https://edusphere.vercel.app"


function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [isLoading,setIsLoading] = useState(true);

  useEffect(() => {
    async function getCourses() {
      try {
        const response = await fetch(baseUrl + `/api/my_courses?username=${localStorage.getItem("userId")}`, {
          method: 'GET',
        });
        const data = await response.json();
        setCourses(data.requestedCourses);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
    getCourses(); 
    setIsLoading(false);
  }, []);

  useEffect(()=>{
    console.log(courses);
  },[courses]);

  const navigate = useNavigate();

  const handleCourseDetailsClick = (course) => {
    localStorage.setItem('courseTitle', course.courseName);
    navigate(`/course/${course.courseId}`);
    // setSelectedCourse(course);
  };

  const handleBackClick = () => {
    setSelectedCourse(null);
  };

  // if (courses.length === 0) {
  //   return <h1>Welcome to EduSphere! Please enroll in courses</h1>
  // }



  if (selectedCourse) {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">{selectedCourse.courseName}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" >{selectedCourse.courseDescription.p1}</Typography>
        </Grid>
        <Grid item xs={12}>
          <button onClick={handleBackClick}>Back to Courses</button>
        </Grid>
      </Grid>
    );
  }

  return (
    // <Box>
    <Grid container spacing={4} sx={{marginTop:1,marginLeft:1, paddingRight: "150px" }}>
      {courses.length===0 && <Typography variant='h4' fontWeight="bold" sx={{margin:2}}>Welcome to EduSphere! Please enroll in courses</Typography>}
      {courses.map((course) => (
        <Grid item key={course.courseId} xs={6} sm={6} md={4}>
          <CourseCardBrowse
            courseId={course.courseId}
            courses={courses}
            onDetailsClick={handleCourseDetailsClick}
          />
          
        </Grid>
      ))}
      {isLoading && <CircularProgress/>}
    </Grid>
  );
}

export default CoursesPage;
