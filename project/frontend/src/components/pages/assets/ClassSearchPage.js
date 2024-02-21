import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import CourseCard from "./CourseCardEnroll";
import { useNavigate } from "react-router-dom";

var baseUrl = "https://edusphere.vercel.app"


function ClassSearchPage() {
  const [courseLevel, setCourseLevel] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseId, setCourseId] = useState("");
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  // Add this new state
 const [filteredCourses, setFilteredCourses] = useState([]);

  const userId = localStorage.getItem("userId");
  const userType = localStorage.getItem("userType");

  const navigate = useNavigate();

  const getAllCourses = async () => {
    try {
      const response = await fetch(baseUrl + '/api/all-courses-available-current-semester', {
        method: 'GET',
        
      });
      const data = await response.json();
      if (data.Status === "Success") {
        setCourses(data.response);
        setFilteredCourses(data.response);
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

  const getEnrolledCourses = async () => {
    try {
      const response = await fetch(baseUrl + `/api/my-courses/?username=${userId}`, {
        method: 'GET',
      });

      const data = await response.json();
      console.log('enrolled',data.requestedCourses);
      setEnrolledCourses(data.requestedCourses);
      }
  catch{
    console.log('failed');
      }
    }
   
    
  const isCourseEnrolled = (courseId) => {
    return enrolledCourses.some((enrolledCourse) => enrolledCourse.courseId === courseId);
  };


  useEffect(() => {
    if (!userId) {
      navigate('/login');}
    getAllCourses();
    getEnrolledCourses();
    
    console.log('handled');
    console.log(userId);
    console.log(userType);
    }, []);



const handleSearchClick = () => {
    const hasSearchValue = courseName || courseId || courseLevel;
    if (!hasSearchValue) {
      setFilteredCourses(courses);}
    else {
    const filteredCourses = courses.filter((course) => {
    const matchesCourseName = !courseName || (course.name && course.name.toLowerCase().includes(courseName.toLowerCase()));
    console.log('matchec',matchesCourseName);
    const matchesCourseId = !courseId || (course.id && course.id.toString().includes(courseId));
    const matchesCourseLevel = !courseLevel || (course.cLevel && course.cLevel.toLowerCase() === courseLevel.toLowerCase());

    return hasSearchValue && (matchesCourseName && matchesCourseId && matchesCourseLevel);}
  );
  setFilteredCourses(filteredCourses);
  console.log('chec',filteredCourses);}
  // Update your state or use the filteredCourses array as needed
};


useEffect(()=>{
  console.log('filtered',filteredCourses);
},[filteredCourses])

  const handleCourseLevelChange = (event) => {
    if (event.target.value === 'all') {
      setCourseLevel('');
    } else {
    setCourseLevel(event.target.value);
    console.log(courseLevel);}
  };

  const handleCourseNameChange = (event) => {
    setCourseName(event.target.value);
  };

  const handleCourseIdChange = (event) => {
    setCourseId(event.target.value);
  };

  
  return (
    <Box mt={3} ml={3} mr={3} >
      <Grid container spacing={4} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 4}} >
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Course Name"
            value={courseName}
            onChange={handleCourseNameChange}/>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Course ID"
            value={courseId}
            onChange={handleCourseIdChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
        <FormControl fullWidth >
        <InputLabel>Level</InputLabel>
            <Select
              
              label="Course Level"
              value={courseLevel}
              onChange={handleCourseLevelChange}>
             
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="b">Beginner</MenuItem>
              <MenuItem value="i">Intermediate</MenuItem>
              <MenuItem value="a">Advanced</MenuItem>
            </Select>
          </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3} mt={1}>
          <Button variant="contained" onClick={handleSearchClick}>
            Search
          </Button>
      
        </Grid>
       
      </Grid>

      <Grid container spacing={0.5} mt={2} justifyContent="center">
        {filteredCourses.map((course) => (
          <Grid item key={course.id} xs={12} sm={12} md={12} l={12}>
            <CourseCard course={course}  isEnrolled={isCourseEnrolled(course.id)} username={userId}/>
          </Grid>
        ))}
      </Grid>

    </Box>
  );
}

export default ClassSearchPage;