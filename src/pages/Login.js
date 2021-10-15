import { useState } from "react";
import axios from "axios";
import BASE_API_URL from '../services/BaseUrl';
import { useHistory, Redirect } from "react-router-dom";

const Login = (props) => {
    const [email, setEmail] = useState('instructor1@ehub.edu');
    const [password, setPassword] = useState('qweqwe');
    const [error, setError] = useState(null);
    const history = useHistory();

    // const handleChange = event => {
    //     props.onchange(event);
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            email: email,
            password: password
        };
        try {
            const resp = await axios.post(`${BASE_API_URL}/api/login`, newPost);
            setError(null);
            const userType = resp.data['user']['user_type_id'];
            // if (userType != 1){
                // setError('qwe');
                // return( <Redirect to={ {pathname: '/', state: {from: props.location} }}/>
                // );
            // }else{
                // handleChange();
                localStorage.setItem('access_token', JSON.stringify( resp.data['access_token']));
                history.push('/');
            // }
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