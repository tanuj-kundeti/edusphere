import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography
} from "@mui/material";
import CalendarStud from "./CalendarStud";
import AssignmentsTable from "./AssignmentsTable";
import AnnouncementsTable from "./AnnouncementsTable";
import CoursesPage from "./CoursesPage";


export default function DashboardHome() {

  return (
    <Box sx={{marginLeft:2}}>
    <Grid container spacing={2} >
      <Grid container spacing={2} sx={{ maxWidth: 2000, mt: 0 }}>
        <CoursesPage />
      </Grid>
      <Grid container marginLeft={2}>
      
      <Grid item xs={12} md={6}>
        <AssignmentsTable />
      </Grid>
      <Grid item xs={12} md={6} sx={{marginRight:0}} marginRight={0}  >
        <AnnouncementsTable />
      </Grid>
      <Grid item xs={12} md={6} sx={{marginLeft:2}}>
        <CalendarStud />
      </Grid>
      </Grid>
   </Grid>
   </Box>
  );
}
