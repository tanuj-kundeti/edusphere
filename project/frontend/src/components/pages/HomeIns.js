import React, { useState,useEffect } from 'react';
import '../styles/announcement.css';
import { useParams } from "react-router-dom";
import {Editor} from '@tinymce/tinymce-react'
import DOMPurify from 'dompurify';
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

var baseUrl = "https://edusphere.vercel.app"


const CourseHome = (props) => {
  console.log(props.prop);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const {courseId} = useParams();
  const courseIdInt = parseInt(courseId, 10);
  const [courseinfo,setCourseinfo] = useState();
  const [editorContent, setEditorContent] = useState("");
  const [isLoading,setIsLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  const userId = localStorage.getItem("userId");
  const userType = localStorage.getItem("userType");


  useEffect(() => {
    setIsLoading(true);
    if (props.prop === 'syllabus') {
      setTitle('Course Syllabus');
      setContent('');
    }
  }, [props.prop]);


  const getdata = async ()=>{
    try {
      const response = await fetch(baseUrl + `/api/my_courses?username=${userId}`, {
        method: 'GET',
      });
      const data = await response.json();
      setCourseinfo(data.requestedCourses.find((enrolledCourse) => enrolledCourse.courseId === courseIdInt));
  
      }
      catch{
        console.log('failed');}
    }

  useEffect( () => {
    getdata();
}, []);


useEffect(() => {
  
  if (courseinfo){
    if (props.prop !== 'syllabus') {
      setTitle(`Welcome to ${courseinfo.courseName}`);
      setContent(courseinfo.courseDescription);
      console.log(courseinfo);
    } else {
  setContent(courseinfo.courseSyllabus);
  console.log('syllabys');
  }
}
setIsLoading(false);
}, [courseinfo]);


  const [editMode, setEditMode] = useState(false);
  
  const handleEditClick = () => {
    setEditMode(!editMode);
  };


  const pushdata = async() =>{
    setIsLoading(true);
    try {
      const response = await fetch(baseUrl +'/api/create-update-course', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "username":userId,
            "name": courseinfo.courseName,
            "masterCourseId": courseinfo.masterCourseId,
            "shortName": courseinfo.shortName,
            "description": props.prop === 'syllabus' ? courseinfo.courseDescription : editorContent,
            "syllabus": props.prop === 'syllabus' ? editorContent : courseinfo.courseSyllabus,
            "modules":courseinfo.modules,
            "skillJson":courseinfo.skillJson,
            "cLevel":courseinfo.cLevel,
            "startDate":courseinfo.startDate.split("T")[0],
            "endDate":courseinfo.endDate.split("T")[0],
        }),
      });
      const data = await response.json();
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
      console.log('checl',data);

    } catch (error) {
      // Handle network errors
      console.error('Network error:', error);
    }
    getdata();
    setIsLoading(false);
  }

  const handleSaveClick = () => {
    setEditMode(false);
    pushdata();
  };

  const onChangedesc=(e)=>{
    setEditorContent(e.target.getContent());
  }


  return (
    <Box>
      <Grid container spacing={2} justifyContent="space-between" sx={{ marginBottom: "10px" }}>
        <Grid item>
          <h2>{title}</h2>
        </Grid>
        { userType.toLowerCase() === 'i' &&
        (<Grid item>
        <IconButton onClick={() => handleEditClick()} sx={{ marginTop: "15px" }}>
              <EditIcon />
            </IconButton>
        </Grid>)}
      </Grid>
      {isLoading && (<Grid container justifyContent="center">
          < CircularProgress /></Grid>)} 
      {showMessage && (
        <Grid container justifyContent="center">
          <Typography variant="h6" fontWeight="bold" color="success.main">
            Content updated successfully!
          </Typography>
          </Grid>
      )}
      <Grid container spacing={12} mt={0} sx={{ marginBottom: "10px" }}>
      {!editMode && (
        <Grid item sx={{ marginBottom: "10px" ,p:2}}>
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}/>
        </Grid>)}

      {editMode && (
          <Grid  container md={12} xs={10} sm={12} justifyContent='center' alignItems='center'>
          <Editor
          apiKey="g6npcs2t24w5uzje2ln7lxmz4nzy4t2tly1wjmj1rfbhhas0"
          initialValue={content}
          init={{
            branding: false,
            height: 300,
            menubar: true,
            plugins:
              "print preview paste searchreplace autolink directionality visualblocks visualchars fullscreen link template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern textcolor",
            toolbar:
              "formatselect | bold italic underline strikethrough | forecolor backcolor blockquote | link | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat",
            image_advtab: true
          }}
          onChange={onChangedesc}/>

          <button className="save-button" onClick={handleSaveClick}>
          Save
          </button>
        </Grid>
      )}
      </Grid>

    </Box>
  );
};

export default CourseHome;


