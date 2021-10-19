import { Card, CardContent, CardHeader, Grid, IconButton, makeStyles, Typography } from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import Layout from '../../components/layouts/studentSideLayout/Layout'
import Notification from '../../components/StudentComponents/Notification'
import BASE_API_URL from '../../services/BaseUrl'
import axios from "axios";
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
    card:{
        marginTop: "2%"
    },
    cardbody:{
        borderWidth: "1px",
        borderLeft: '.25rem solid !important',
        borderColor: "#5a5c69 !important"
    },
    page: {
        background: '#f9f9f9',
        width: '100%',
        padding: theme.spacing(3),
        [theme.breakpoints.down('xs')]: {
        marginLeft:"-60%"
    
        }}
  
    }));

export default function Notifications() {
    const [access_token, setAccess_token] = useState(JSON.parse( localStorage.getItem('access_token') ));
    const [data, setData] = useState(null);
    const classes = useStyles();
    const history = useHistory();

    const getDAta = async () => {
        const response = await axios.get(`${BASE_API_URL}/api/student/get-notifications`,
            {headers:{
            'Authorization' : `Bearer ${access_token}`
            }}
        );
        const data_fetched = response.data;
        if(data_fetched.status){
            setData("");
        }else{
            setData(data_fetched);
        }
    }

    useEffect(() => {
        getDAta();
        }, []);
    
    const handleRead = async(id)=>{
        const response = await axios.post(`${BASE_API_URL}/api/student/notifications/mark-read`,
        {
            "notification_id" : id
        },
        {headers:{
        'Authorization' : `Bearer ${access_token}`
        }}
    );
    const data_fetched = response.data;
    if(data_fetched){
        getDAta();
    }
    }

    const NavigateToCourse = async(course_id) => {
        const response2 = await axios.get(`${BASE_API_URL}/api/student/get-course-name-by-id/${course_id}`,
        {headers:{
            'Authorization' : `Bearer ${access_token}`
        }}
        );
        const data_fetched2 = await response2.data;
        if(data_fetched2){
            localStorage.setItem('course_name', data_fetched2.name);
        }
        localStorage.setItem('course_id', course_id);
        history.push("/course/Dashboard");
    }

    return (
    <Layout title="qwe">
        <div className={classes.paper}>
        <Typography className={classes.card2}  component="h2"  variant="h4" >
                Notifications
            </Typography>
            { data ?
                <div className={classes.card}>
                    <Notification data={data} handleRead={handleRead} NavigateToCourse={NavigateToCourse}/> 
                </div>
            :
                <Typography > No Notifications yet </Typography>
            }
        </div>
    </Layout>

    )
}
