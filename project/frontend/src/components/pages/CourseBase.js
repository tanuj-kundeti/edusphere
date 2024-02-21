// import React from 'react';
import ReactDOM from 'react-dom/client';
import React, { useState } from 'react';
// import VerticalNavigation from './verticalnavigationIns';
import HorizontalNavigation from './horizontalnavIns';
import { render } from "react-dom";  
// import '../../App.css';
// import Home from './HomeIns';
// import Announcements from './AnnouncementIns';
// import CreateAssignment from './CreateAssignment';
// import Assignment from './Assignment';
import Box from '@mui/material/Box'

const CourseBase = (props) => {
  const [horizontalNavItem, setHorizontalNavItem] = useState('Home');

  const [homecont, setHomecont] = useState('Welcome to Home!')
  const [syllcont, setSyllcont] = useState('Welcome to Syllabus Page!')

  const handleHomepage = (newcont) => {
    setHomecont(newcont);
  }

  const handleSyllpage = (newcont) => {
    setSyllcont(newcont);
  }

  const handleHorizontalNavClick = (item) => {
    setHorizontalNavItem(item);
  };

  return (
    <div className="App1">
      <div className="navigation">
        <HorizontalNavigation onItemClick={handleHorizontalNavClick} />
      </div>
      {/* <div className="content"> */}
      <Box sx={{marginLeft:"20px", marginRight:"20px",marginTop:"5px"}}>
        {props.children}
        </Box>
      {/* </div> */}
    </div>
  );
};

export default CourseBase;



