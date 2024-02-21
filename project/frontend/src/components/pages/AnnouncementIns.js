import React, { useEffect, useState } from 'react';
import {Editor} from '@tinymce/tinymce-react'
import DOMPurify from 'dompurify';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import { useParams } from "react-router-dom";
import '../styles/announcement.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { List,
  ListItem,
  ListItemText,
  Collapse,
  Divider, } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

var baseUrl = "https://edusphere.vercel.app"

const Announcements = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const[isLoading,setIsLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  const showContent = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(-1);
    } else {
      setExpandedIndex(index);
    }
  };
  const {courseId} = useParams();
  const userId = localStorage.getItem('userId');
  const userType = localStorage.getItem('userType');

  // const handleAnnouncementSubmit = (title, content, date, time) => {
  //   const newAnnouncement = { title, content, date, time };
  //   setAnnouncements([...announcements, newAnnouncement]);
  // };

  const handlePost = async()=>{
    setShowEditor(false);
    setIsLoading(true);
    console.log(description,title);
    try {
      const response = await fetch(baseUrl + `/api/createAnnouncement/${courseId}`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "username":userId,
            "title":title,
            "description": description
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
     getAnn();
     setIsLoading(false);
  }

  const getAnn = async()=>{
    console.log(description,title);
    try {
      const response = await fetch(baseUrl + `/api/getAnnouncementByCourse/${courseId}?username=${userId}`, {
        method: 'GET',
      });
      const data = await response.json();
      setAnnouncements(data.Announcements);
      console.log('check',data,userType);
        } catch (error) {
      // Handle network errors
      console.error('Network error:', error);
     }
  }

  useEffect(()=>{
      getAnn();
      setIsLoading(false);
    },[])

    useEffect(()=>{
      console.log('ch1',announcements)
    },[announcements])


  const AnnouncementCard = ({ announcement, expanded, onReadMore }) => {
    const oneLineDescription = announcement.Description.replace(/<[^>]*>/g, '').substring(0, 100) + '...';
    return (
      <>
      <ListItem onClick={onReadMore}>
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
          <Box>
            <ListItemText primary={<Typography variant="string" component="span" fontWeight="bold">
                  {announcement.Title}</Typography>}/>
            {!expanded && (
              <Box marginTop="8px">
                <Typography variant="body2" color="text.secondary"> {oneLineDescription}</Typography>
              </Box>)}
          </Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Posted on: {new Date(announcement.Date).toLocaleString()}
          </Typography>
        </Box>
      </ListItem>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem sx={{ paddingTop: "0px", marginTop: "0px" ,paddingBottom: "0px"}}>
            <ListItemText primary={<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(announcement.Description) }} />} />
          </ListItem>
        </List>
      </Collapse>
      <Divider sx={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }} />
      </>
    );
  };
  

 const onChangedesc = (desc) => {
  setDescription(desc.target.getContent());
 }

  return (
    <div className="announcements-container">
      {userType.toLowerCase()==='i' && (<div className="announcements-header">
        <button className="add-announcement-button" onClick={() => setShowEditor(!showEditor)}>
          Post Announcement
        </button>
      </div>)}
      { showEditor && (
        <Grid container justifyContent={"center"} sx={{marginTop:"20px"}}>
          <Grid item xs={8} md={10}>
            <TextField fullWidth label="Title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
          </Grid>
          <Grid item xs={8} md={10} sx={{marginTop:"10px",marginBottom:"10px"}}>
              <Typography variant="string" component="span" fontWeight="bold" sx={{ marginBottom: "10px" }}>Description:</Typography>
              <Editor
              apiKey="g6npcs2t24w5uzje2ln7lxmz4nzy4t2tly1wjmj1rfbhhas0"
              initialValue=""
              init={{
                branding: false,
                height: 200,
                menubar: true,
                plugins:
                  "print preview paste searchreplace autolink directionality visualblocks visualchars fullscreen link template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern textcolor",
                toolbar:
                  "formatselect | bold italic underline strikethrough | forecolor backcolor blockquote | link | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat",
                image_advtab: true
              }}
              onChange={onChangedesc}
            />
            <Button variant='contained' className="add-announcement-button" onClick={handlePost} sx={{ marginTop: "20px" }}>
              Post
            </Button>
          </Grid>
        </Grid>
      )}

      {showMessage && (
            <Grid container justifyContent="center">
              <Typography variant="h6" fontWeight="bold" color="success.main">
                Module created successfully!
              </Typography>
              </Grid>
          )}

      {announcements && announcements.map((announcement, index) => (
        <AnnouncementCard
          key={index}
          announcement={announcement}
          expanded={expandedIndex === index}
          onReadMore={() => showContent(index)}
        />
      ))
      }
      <Grid container justifyContent="center" m={2}>
        {isLoading && <CircularProgress/>}

        {announcements.length===0 && <Typography variant='h6' fontStyle='italic' color='text.disabled'>No Announcements</Typography>}
        </Grid>
    </div>
  );
};

export default Announcements;
