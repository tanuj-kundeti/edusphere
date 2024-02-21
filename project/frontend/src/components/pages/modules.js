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
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CircularProgress from '@mui/material/CircularProgress';

var baseUrl = "https://edusphere.vercel.app"

const ModulesPage = () => {

  const [moduleTitle, setModuleTitle] = useState();
  const [moduleDescription, setModuleDescription] = useState();
  const [moduleLink, setModuleLink] = useState();
  const [showMessage, setShowMessage] = useState(false);
  
  const userId = localStorage.getItem('userId')
  const userType = localStorage.getItem('userType')
  const {courseId} = useParams();
  const [showEditor,setShowEditor] = useState(false);

  const [modules,setModules] = useState([]);
  console.log('ch',modules);
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const[isLoading,setIsloading] = useState(true);

  const showContent = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(-1);
    } else {
      setExpandedIndex(index);
    }
  };


  const fetchModules= async()=>{
    try{
      const response = await fetch(baseUrl + `/api/view_modules?courseid=${courseId}`, {
        method: 'GET',
      });
      const data = await response.json()
      console.log(data.Response);
      console.log(data.Status==="Success");
      if (data.Status === "Success") {
        setModules(data.Response.modules.flat())
        console.log('chec',data.Response.modules.flat())
      }

    }catch {
      console.log('error');
    }
  }

useEffect(()=>{
  fetchModules();
  setIsloading(false);
  console.log('checl',modules);
},[])

  const handleSubmit = async()=>{
  setShowEditor(false);
   try {
      const response = await fetch( baseUrl +`/api/create-update-course-module`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "userId":userId,
            "courseId":parseInt(courseId),
            "moduleTitle":moduleTitle,
            "moduleDescription": moduleDescription,
            "moduleLink": moduleLink
        }),
      });
      const data = await response.json();
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
      fetchModules();
      
        } catch (error) {
      console.error('Network error:', error);
     }
    // console.log('Submitting',courseId,userId,moduleTitle,moduleDescription,moduleLink);
  }


  
  const isValid = (url) => {
    const regex = /^https?:\/\/.+$/;
    return regex.test(url);
  };


  const ModuleCard = ({ module, expanded, onReadMore }) => {
    const oneLineDescription = module.moduleDescription.replace(/<[^>]*>/g, '').substring(0, 100) + '...';
    return (
      <>
      <ListItem onClick={onReadMore}>
        <Divider/>
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
          <Box>
            <ListItemText primary={<Typography variant="string" component="span" fontWeight="bold">
                  {module.moduleTitle}</Typography>}/>
            {!expanded && (
              <Box marginTop="8px">
                <Typography variant="body2" color="text.secondary"> {oneLineDescription}</Typography>
              </Box>)}
          </Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Posted on: {new Date(module.date).toLocaleString()}
          </Typography>
        </Box>
      </ListItem>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

          <ListItem sx={{ paddingTop: '0px', marginTop: '0px', paddingBottom: '0px' }}>
                <ListItemText primary={<Typography> Description: <br/>
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(module.moduleDescription),}}/>
                  Link: <a href={module.moduleLink} target="_blank" rel="noopener noreferrer">{module.moduleLink}</a>
                </Typography>
              }
            />
          </ListItem>

        </List>
      </Collapse>
      <Divider/>
      <Divider sx={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }} />
      </>
    );
  };

  const onChangedesc = (desc) => {
    setModuleDescription(desc.target.getContent());
   }

  return (
    <div>
        <Box sx={{marginTop:2,marginRight:2}} justifyContent="right">
          { (userType.toLowerCase() === 'i') &&
          (<Grid container justifyContent="flex-end" marginBottom={4}>
            <Button variant='contained' startIcon={<AddRoundedIcon/>} onClick={()=>{setShowEditor(!showEditor)}}>Create</Button>
          </Grid>)}
          {showMessage && (
            <Grid container justifyContent="center">
              <Typography variant="h6" fontWeight="bold" color="success.main">
                Module created successfully!
              </Typography>
              </Grid>
          )}
          {showEditor && (
            <Grid container marginBottom={4} justifyContent="center">
              <Grid item md={10} sm={12} xs={12}>
                <TextField fullWidth label='Title' value={moduleTitle} onChange={(e)=>setModuleTitle(e.target.value)} required></TextField>
              </Grid>
              
              <Grid item xs={12} md={10} sm={12} sx={{marginTop:"10px",marginBottom:"10px"}}>
                  <Typography variant="string" component="span" fontWeight="bold" sx={{ marginBottom: "10px" }}>Description:</Typography>
                  <Editor
                  apiKey="g6npcs2t24w5uzje2ln7lxmz4nzy4t2tly1wjmj1rfbhhas0"
                  initialValue=""
                  init={{
                    branding: false,
                    height: 100,
                    menubar: true,
                    plugins:
                      "print preview paste searchreplace autolink directionality visualblocks visualchars fullscreen link template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern textcolor",
                    toolbar:
                      "formatselect | bold italic underline strikethrough | forecolor backcolor blockquote | link | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat",
                    image_advtab: true
                  }}
                  onChange={onChangedesc}
                />
                <TextField fullWidth label="Link" type="url" value={moduleLink}  sx={{marginTop:2}}
                  onChange={(e) => setModuleLink(e.target.value)}
                  InputProps={{pattern: "https?://.+"}} required/>
                <Button variant='contained' className="add-announcement-button" onClick={() => handleSubmit()} sx={{marginTop:4}}>
                    Post
                  </Button>
                </Grid>
            </Grid>
          )}
        </Box>
        <Grid container display={isLoading?'none':'flex'}>
          <Grid item md={12} xs={8} sm={12} sx={{borderTop:"1px solid black"}} justifyContent ="center">
              {modules && 
                modules.map((module, index) => (
                  <ModuleCard
                  key={index}
                  module={module}
                  expanded={expandedIndex === index}
                  onReadMore={() => showContent(index)}/>
              ))}
            </Grid>
        </Grid>
        <Grid container>
        {isLoading && <CircularProgress/>}
        </Grid>
        <Grid container justifyContent="center" m={2}>
        {modules.length===0 && <Typography variant='h6' fontStyle='italic' color='text.disabled'>No modules</Typography>}
        </Grid>
    </div>
  );
};

export default ModulesPage;
