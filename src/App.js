import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Notes from './pages/Notes'
import Create from './pages/instructorSide/Create'
import Dashboard from './pages/instructorSide/Dashboard'
import CreatteCourse from './pages/instructorSide/CreateCourse'
import CourseDashboard from './pages/instructorSide/CourseDashboard'
import UploadMaterial from './pages/instructorSide/UploadMaterial'
import { createTheme, ThemeProvider } from '@material-ui/core'
import Layout from './components/Layout'
import LayoutCourse from './components/LayoutCourse'
import Q from './pages/Q'
import { AddCircleOutlineOutlined, SubjectOutlined } from '@material-ui/icons'
import { Component } from 'react'

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
    fontFamily: 'PT Serif',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  }
})

const menuItems = [
  { 
    text: 'My Notes', 
    icon: <SubjectOutlined color="secondary" />, 
    path: '/' 
  },
  { 
    text: 'Create Note', 
    icon: <AddCircleOutlineOutlined color="secondary" />, 
    path: '/create' 
  },
  
];

const menuItems2 = [
  { 
    text: 'batata', 
    path: '/' 
  },
  { 
    text: 'pepsi', 
    path: '/create' 
  },
  
];

const AppRoute = ({component:Component, layout:Layout, ...rest})=>(
  <Route {...rest} >
    <Layout><Component ></Component></Layout>
  </Route>
)

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
          <Switch>
          <AppRoute exact path='/' layout={Layout} component={Dashboard} />
          <AppRoute exact path='/create' layout={LayoutCourse} component={Create} />
          <AppRoute exact path='/course/Dashboard' layout={LayoutCourse} component={CourseDashboard} />
          <AppRoute exact path='/course/UploadMaterial' layout={LayoutCourse} component={UploadMaterial} />
          <AppRoute exact path='/onGoing' layout={Layout} component={Notes} />
          <AppRoute exact path='/createCourse' layout={Layout} component={CreatteCourse} />
          </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;