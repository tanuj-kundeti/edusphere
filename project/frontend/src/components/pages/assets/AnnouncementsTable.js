import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  IconButton,
  Collapse
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  container: {
    maxHeight: 330
  },
  HeaderCell: {
    backgroundColor: "#D7DBDD ",
    fontWeight: "bold"
  }
});

var baseUrl = "https://edusphere.vercel.app"
// var baseUrl = "http://127.0.0.1:8000"



const AnnouncementsTable = () => {
  const classes = useStyles();
  const [announcements, setAnnouncements] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try{
        const response = await fetch(baseUrl + `/api/all_announcements/?username=${localStorage.getItem("userId")}`, {
          method: 'GET',
        });
        const data = await response.json();
        setAnnouncements(data.response);
        console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
    fetchAnnouncements();
  }, []);

  

  return (
    <Box sx={{marginRight:2}}>
      <h2>Announcements</h2>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.HeaderCell} />
              <TableCell className={classes.HeaderCell}>Date</TableCell>
              <TableCell className={classes.HeaderCell}>Course</TableCell>
              <TableCell className={classes.HeaderCell}>Title</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {announcements &&
              announcements.length > 0 &&
              announcements.map((announcement) => (
                <React.Fragment key={announcement.id}>
                  <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                    <TableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                      >
                        {open ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell>{announcement.Date}</TableCell>
                    <TableCell>{announcement.Course}</TableCell>
                    <TableCell>{announcement.Title}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={6}
                    >
                      <Collapse in={open} timeout="auto" unmountOnExit>
                        <Typography variant="subtitle1" gutterBottom>
                          {announcement.title}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          Description: {announcement.Description}
                        </Typography>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AnnouncementsTable;
