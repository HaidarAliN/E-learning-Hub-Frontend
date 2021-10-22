import { useState, useEffect } from "react";
import axios from "axios";
import BASE_API_URL from '../services/BaseUrl';
import { useHistory, Redirect, Link } from "react-router-dom";
import firebase from '../firebase'
import {isMobile} from 'react-device-detect';
import { ThemeProvider } from "@material-ui/styles";
import { Container } from "react-bootstrap";
import { Avatar, Box, createTheme, CssBaseline, Button, Grid, TextField, Typography } from "@material-ui/core";
import LockIcon from '@material-ui/icons/Lock';

const Login = ({redicrett}) => {
    // const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari']);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [firebaseToken, setFirebaseToken] = useState(null);
    const history = useHistory();

    const handleRedicret = () => {
        redicrett();
        console.log("qwe");

    }

    const componentDidMount = ()=>{

        const messaging = firebase.messaging()
        messaging.requestPermission().then(()=>{
          return messaging.getToken()
        }).then(token=>{
          console.log('token : ', token);
          setFirebaseToken(token);
        }).catch(()=>{
          console.log('token : ')
    
        })
        
      }
    
    useEffect(() => {
        if(!isMobile){
            componentDidMount();
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            email: email,
            password: password
        };
        try {
            const resp = await axios.post(`${BASE_API_URL}/api/login`, newPost);
            setError(null);
            localStorage.setItem('access_token', JSON.stringify( resp.data['access_token']));
            localStorage.setItem('user_type_id', JSON.stringify( resp.data['user']['user_type_id']));
            localStorage.setItem('name', resp.data['user']['first_name']);

            const response = await axios.post(`${BASE_API_URL}/api/update-firebase-token`,
            {
                "token" : firebaseToken
            },
            {headers:{
            'Authorization' : `Bearer ${resp.data['access_token']}`
            }}
            );
            const data_fetched = await response.data;
            if(data_fetched){
                history.push('/home');
                window.location.reload();
            }
        } catch (err) {
            console.error(err);
            setError('qwe');
        }
    }
    const theme = createTheme();

    return ( 
        // <Container>
        //     { error && <h4>Login failed wrong user credentials</h4> }
        //     <h1 className="shadow-sm  mt-5 p-3 text-center rounded" style={{textAlign:"center", color:"#4e73df", marginTop:"4%"}}>E-Learning Hub</h1>
        //     <Row className="mt-5">
        //         <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
        //             <Form onSubmit={handleSubmit}>
        //             <Form.Group controlId="formBasicEmail">
        //                 <Form.Label>Email:</Form.Label>
        //                 <Form.Control 
        //                 type="text" 
        //                 required 
        //                 placeholder="xyz@gmail.com"
        //                 value={email}
        //                 onChange={(e) => setEmail(e.target.value)}
        //                 />
        //                 </Form.Group>
        //             <Form.Group controlId="formBasicEmail">

        //                 <Form.Label>Password:</Form.Label>
        //                 <Form.Control
        //                 type="password" 
        //                 required 
        //                 placeholder="Password"
        //                 value={password}
        //                 onChange={(e) => setPassword(e.target.value)}
        //                 />
        //                 </Form.Group>
        //                 <Button variant="btn-block" style={{backgroundColor:"#4e73df", marginTop:"4%", color:"#fff"}} type="submit">Login</Button>
        //             </Form>
        //         </Col>   
        //     </Row>
        // </Container>
<ThemeProvider theme={theme}>
      <Container component="main" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar style={{ m: 1, backgroundColor: '#4e73df' }}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{backgroundColor:"#4e73df", marginTop:"4%", color:"#fff"}}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>

     );
}
 
export default Login;