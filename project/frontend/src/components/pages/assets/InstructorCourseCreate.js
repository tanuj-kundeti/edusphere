import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import TinyMCE from 'react-tinymce';
import {Editor} from '@tinymce/tinymce-react'
import DOMPurify from 'dompurify';

// ...
var baseUrl = "https://edusphere.vercel.app"


function CourseCreate({ course, isEnrolled, username }) {
  const [expanded, setExpanded] = useState(false);
  const [enrolled, setEnrolled] = useState(isEnrolled);
  const [editorContent, setEditorContent] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  console.log(course);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  const handleCreateClick = async () => {
    try {
      const response = await fetch(baseUrl +'/api/create-update-course', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "username":username,
            "name": course.name,
            "masterCourseId": course.id,
            "shortName": course.shortName,
            "description":editorContent,
            "syllabus":course.syllabus,
            "modules":course.modules,
            "skillJson":course.skillJson,
            "cLevel":course.cLevel,
            "startDate":"2023-08-21",
            "endDate":"2023-12-16"
        }),
      });
      const data = await response.json();
      setEnrolled(true);
      console.log('checl',data);
      setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 2000);
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
          borderColor: "green",
          color:"green",
          textTransform: "none",
          marginRight: 1,
          transition:"none"
        }}
        // disabled = {true}
        disableRipple={true}
      >
        Created
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
          Create
        </Button>
      );
    }
  };


  const [openForm, setOpenForm] = useState(false);

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleEnrollClick = () => {
    handleOpenForm();
  };

  const onChangedesc=(e)=>{
    setEditorContent(e.target.getContent());
  }

  const courselvl = {"i":"Intermediate","b":"Beginner","a":"Advanced"}
  
  const renderForm = () => {
    return (
      <Dialog open={openForm} onClose={handleCloseForm} maxWidth="lg" fullWidth>
        <DialogTitle>{enrolled ? 'Update Course' : course.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the course description.
          </DialogContentText>
          
          <Editor
          apiKey="g6npcs2t24w5uzje2ln7lxmz4nzy4t2tly1wjmj1rfbhhas0"
          initialValue=""
          init={{
            branding: false,
            height: 400,
            menubar: true,
            plugins:
              "print preview paste searchreplace autolink directionality visualblocks visualchars fullscreen link template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern textcolor",
            toolbar:
              "formatselect | bold italic underline strikethrough | forecolor backcolor blockquote | link | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat",
            image_advtab: true
          }}
          onChange={onChangedesc}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm} color="primary">
            Cancel
          </Button>
          <Button onClick={() => { handleCreateClick(); handleCloseForm(); }} color="primary">
                {enrolled ? 'Update' : 'Create'}
            </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Card sx={{ width: "100%", mb: 1, backgroundColor: "#f5f5f5" }}>

    {showMessage && (
              <Grid container justifyContent="center">
                <Typography variant="h6" fontWeight="bold" color="success.main">
                  {course.name} created successfully!
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
          <Typography paragraph><div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(course.description) }}/></Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Course Level: {courselvl[course.cLevel]}
          </Typography>
          {/* <Typography paragraph>{course.cLevel}</Typography> */}
        </CardContent>
      </Collapse>
      
      {renderForm()}
    </Card>
  );
}

// ...

export default CourseCreate;
