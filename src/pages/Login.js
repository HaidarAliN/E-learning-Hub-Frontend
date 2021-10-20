import { useState, useEffect } from "react";
import axios from "axios";
import BASE_API_URL from '../services/BaseUrl';
import { useHistory, Redirect } from "react-router-dom";
import firebase from '../firebase'
import {isMobile} from 'react-device-detect';


const Login = ({redicrett}) => {
    // const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari']);
    const [email, setEmail] = useState('instructor1@ehub.edu');
    const [password, setPassword] = useState('qweqwe');
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

    return ( 
        <div className="login">
            { error && <h4>Login failed wrong user credentials</h4> }
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input 
                type="text" 
                required 
                placeholder="xyz@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password:</label>
                <input 
                type="password" 
                required 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <button>Login</button>
            </form>
        </div>
     );
}
 
export default Login;