import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  withStyles
} from "@material-ui/core";
import Box from '@mui/material/Box'


const styles = (theme) => ({
  tableContainer: {
    maxHeight: 330
  },
  tableHeaderCell: {
    backgroundColor: "#D7DBDD ",
    fontWeight: "bold"
  }
});

var baseUrl = "https://edusphere.vercel.app"
// var baseUrl = "http://127.0.0.1:8000"



const AssignmentsTable = ({ classes }) => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try{
        const response = await fetch(baseUrl + `/api/getUserAssignment/?username=${localStorage.getItem("userId")}`, {
          method: 'GET',
        });
        const data = await response.json();
        setAssignments(data.response);
        console.log('Assignment Table',data);
    } catch (error) {
      console.error(error);
    }
  }
    fetchAssignments();
  }, []);

  return (
    <Box sx={{margin:2}}>
      <h2>Assignment</h2>
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCell}>Course</TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Assignment
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Due Date
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Instructor
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignments &&
              assignments.length > 0 &&
              assignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell>{assignment.CourseName}</TableCell>
                  <TableCell>{assignment["Assignment Title"]}</TableCell>
                  <TableCell>{assignment.DueDate}</TableCell>
                  <TableCell>{assignment.ProfessorName}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default withStyles(styles)(AssignmentsTable);
