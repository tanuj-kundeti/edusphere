import React from 'react'
import {
  BrowserRouter as Router, 
  Routes,
  Route
} from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './components/pages/Home'
import AboutUs from './components/pages/AboutUs'
import ContactUs from './components/pages/ContactUs'
import Login from './components/pages/Login'
import SignUp from './components/pages/SignUp'
import './App.css';
import Dashboard from "./components/pages/dashboard";
import { StyledEngineProvider } from "@mui/material/styles";
import DashboardHome from './components/pages/assets/Home'
import CoursesPage from './components/pages/assets/CoursesPage'
import CoursePageWrapper from './components/pages/assets/CourseSearchWrapper'
// import ClassSearchPage from './components/pages/assets/ClassSearchPage'
import CourseBase from './components/pages/CourseBase'
import CourseHome from './components/pages/HomeIns'
import Announcements from './components/pages/AnnouncementIns'
import Assignment from './components/pages/Assignment'
import ProfilePage from './components/pages/assets/ProfilePage'
import AdminDashboard from './components/pages/admin'
import ForgotPassword from './components/pages/forgotpassword'
import PasswordRecovery from './components/pages/recoverpassword'
import ChatPage from './components/pages/assets/ChatPage'
import ModulePage from './components/pages/modules'
import Admindash from './components/pages/admindash'
import AssignmentDetails from './components/pages/entityassignment'
import Grades from './components/pages/Grades'
import GradeWrapper from './components/pages/GradesWrapper'

function App() {
  const Check = (props) => {
    return (
      <StyledEngineProvider injectFirst>
        <Dashboard props = {props}></Dashboard>
      </StyledEngineProvider>
    );
  };

  return (
    <div className="body-wrap">
      <Router>
      <Routes>
          <Route path={'/*'} element = {<Layout>
            <Routes>
            <Route index element={<Home/>}></Route>
            <Route path={'/AboutUs'} element={<AboutUs/>}></Route>
            <Route path={'/ContactUs'} element={<ContactUs/>}></Route>
            <Route path={'/Login'} element={<Login/>}></Route>
            <Route path={'/SignUp'} element={<SignUp/>}></Route>
            <Route path={'/forgotpassword'} element={<ForgotPassword/>}></Route>
            <Route path={'/api/recover_confirm/'} element={<PasswordRecovery/>}></Route>
            </Routes>
            </Layout>
          }/>
          <Route path={'/dashboard/*'} element={<Dashboard>
            <Routes>
              <Route index element={<DashboardHome/>}></Route>
              <Route path={'/mycourses'} element = {<CoursesPage/>}></Route>
              <Route path = {'/coursebrowse'} element = {<CoursePageWrapper/>}></Route>
              <Route path = {'/admin'} element = {<AdminDashboard/>}></Route>
              <Route path = {'/profile'} element = {<ProfilePage/>}></Route>
              <Route path = {'/chat'} element = {<ChatPage/>}></Route>

            </Routes>
            </Dashboard>
              } />

          <Route path={'/course/:courseId/*'} element={<Dashboard> <CourseBase>
            <Routes>
                <Route path="" index element = {<CourseHome key={'/course'} prop={'home'}/>}></Route>
                <Route path = {'/syllabus'} element = {<CourseHome key={'/syllabus'} prop={'syllabus'}/>}></Route>
                <Route path = {'/announcements'} element = {<Announcements/>}></Route>
                <Route path = {'/modules'} element = {<ModulePage/>}></Route>
                <Route path = {'/assignments'} element = {<Assignment/>}></Route>
                <Route path={"/assignments/:assignmentId"} element={<AssignmentDetails/>} />
                <Route path = {'/grading'} element = {<GradeWrapper/>}></Route>s
              </Routes>
            </CourseBase>
            </Dashboard>
              } />

          <Route path={'/admindashboard/*'} element={<Admindash>
            <Routes>
              <Route index element={<AdminDashboard/>}></Route>
              <Route path={'/adminpanel'} element = {<CoursesPage/>}></Route>
            </Routes>
            </Admindash>
              } />

        </Routes>
      </Router>
    </div>
  );
}

export default App;