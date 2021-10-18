import { Card, CardContent, CardHeader, Grid, IconButton, makeStyles, Typography } from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import Layout from '../../components/layouts/instructorSideLayout/Layout'
import Notification from '../../components/InstructorComponents/Notification'
import BASE_API_URL from '../../services/BaseUrl'
import axios from "axios";


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

    

    const getDAta = async () => {
        const response = await axios.get(`${BASE_API_URL}/api/instructor/notifications`,
            {headers:{
            'Authorization' : `Bearer ${access_token}`
            }}
        );
        const data_fetched = response.data;
        setData(data_fetched);
    }

    useEffect(() => {
        getDAta();
        }, []);
    
    const handleRead = async(id)=>{
        const response = await axios.post(`${BASE_API_URL}/api/instructor/notifications/mark-read`,
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

    return (
    <Layout title="qwe">
        <div className={classes.paper}>
        <Typography className={classes.card2}  component="h2"  variant="h4" >
                Notifications
            </Typography>
            { data && <div className={classes.card}>
                <Notification data={data} handleRead={handleRead}/> 
            </div>}
        </div>
        <div className={classes.footer}>
                            <Typography className={classes.footer}></Typography>
        </div>
    </Layout>

    )
}
