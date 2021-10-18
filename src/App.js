import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom'
import Notes from './pages/Notes'
import Login from './pages/Login'
import Create from './pages/instructorSide/Create'
import Dashboard from './pages/instructorSide/Dashboard'
import Notifications from './pages/instructorSide/Notifications'
import CreateCourse from './pages/instructorSide/CreateCourse'
import EditCourseInfo from './pages/instructorSide/EditCourseInfo'
import CourseDashboard from './pages/instructorSide/CourseDashboard'
import UploadMaterial from './pages/instructorSide/UploadMaterial'
import ManageStudents from './pages/instructorSide/ManageStudents'
import ManageQuizzes from './pages/instructorSide/ManageQuizzes'
import FinishedCourses from './pages/instructorSide/FinishedCourses'
import OnGoing from './pages/instructorSide/OnGoing'

import DashboardS from './pages/studentSide/Dashboard'
import NotificationsS from './pages/studentSide/Notifications'
import OnGoingS from './pages/studentSide/OnGoing'
import FinishedCoursesS from './pages/studentSide/FinishedCourses'
import SearchCourse from './pages/studentSide/SearchCourse'
import CourseDashboards from './pages/studentSide/CourseDashboard'


import { createTheme, ThemeProvider, Typography } from '@material-ui/core'
import firebase from './firebase'
import { useEffect, useState } from "react";


const theme = createTheme({
  palette: {
    primary: {
      main: '#989A96'
    },
    secondary: {
      main: '#d1d3e2'
    }
  },
  typography: {
    fontFamily: 'Roboto',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  }
})

function App() {
  const [type_id, setAccess_token] = useState(JSON.parse( localStorage.getItem('user_type_id') ));
  const history = useHistory();

  const componentDidMount = ()=>{

    const messaging = firebase.messaging()
    messaging.requestPermission().then(()=>{
      return messaging.getToken()
    }).then(token=>{
      console.log('token : ', token)
    }).catch(()=>{
      console.log('token : ')

    })
    
  }



  useEffect(() => {
    // Update the document title using the browser API
    componentDidMount();
    console.log(type_id);
  },[type_id]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
          <Switch>
            <Route path='/' exact component={Login} />
          </Switch>
          {type_id == 1 && 
            <Switch>
              <Route path='/' exact component={Dashboard}/>
            </Switch>}
          {type_id == 2 && 
            <Switch>
              <Route path='/home' exact component={Dashboard}/>
              <Route path='/notifications' exact component={Notifications}/>
              <Route path='/onGoing' exact component={OnGoing}/>
              <Route path='/finishedCourses' exact component={FinishedCourses}/>
              <Route path='/createCourse' exact component={CreateCourse}/>
              <Route path='/create' exact component={Create}/>
              <Route path='/course/Dashboard' exact component={CourseDashboard}/>
              <Route path='/course/UploadMaterial' exact component={UploadMaterial}/>
              <Route path='/course/EditInfo' exact component={EditCourseInfo}/> 
              <Route path='/course/ManageStudents' exact component={ManageStudents}/> 
              <Route path='/course/ManageQuizzes' exact component={ManageQuizzes}/> 
            </Switch>
          }
          {type_id == 3 && 
            <Switch>
              <Route path='/home' exact component={DashboardS}/>
              <Route path='/notifications' exact component={NotificationsS}/>
              <Route path='/onGoing' exact component={OnGoingS}/>
              <Route path='/finishedCourses' exact component={FinishedCoursesS}/>
              <Route path='/searchCourse' exact component={SearchCourse}/>
              <Route path='/course/Dashboard' exact component={CourseDashboards}/>
              <Route path='/course/Materials' exact component={UploadMaterial}/>
              <Route path='/course/CourseQuizzes' exact component={ManageQuizzes}/> 
              {/* <Route path='/course/EditInfo' exact component={EditCourseInfo}/>  */}
              {/* <Route path='/course/ManageStudents' exact component={ManageStudents}/>  */}
            </Switch>
            }
      </Router>
    </ThemeProvider>
  );
}

export default App;