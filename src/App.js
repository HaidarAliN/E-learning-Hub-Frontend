import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Notes from './pages/Notes'
import Create from './pages/instructorSide/Create'
import Dashboard from './pages/instructorSide/Dashboard'
import CreateCourse from './pages/instructorSide/CreateCourse'
import EditCourseInfo from './pages/instructorSide/EditCourseInfo'
import CourseDashboard from './pages/instructorSide/CourseDashboard'
import UploadMaterial from './pages/instructorSide/UploadMaterial'
import { createTheme, ThemeProvider } from '@material-ui/core'

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
  return (
    <ThemeProvider theme={theme}>
      <Router>
          <Switch>
            <Route path='/qwe' exact component={Notes}/>
            <Route path='/' exact component={Dashboard}/>
            <Route path='/onGoing' exact component={Notes}/>
            <Route path='/createCourse' exact component={CreateCourse}/>
            <Route path='/create' exact component={Create}/>
            <Route path='/course/Dashboard' exact component={CourseDashboard}/>
            <Route path='/course/UploadMaterial' exact component={UploadMaterial}/>
            <Route path='/course/EditInfo' exact component={EditCourseInfo}/> 
          </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;