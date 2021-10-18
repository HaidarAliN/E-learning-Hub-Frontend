import { Card, CardContent, CardHeader, Grid, IconButton, makeStyles, Typography } from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import Layout from '../../components/layouts/Layout'
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import BASE_API_URL from '../../services/BaseUrl'
import axios from "axios";
import { useHistory, useLocation } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    card:{
        marginTop: "2%"
    },
    cardbody:{
        borderWidth: "1px",
        borderLeft: '.25rem solid !important',
        borderColor: "#5a5c69 !important"
    },
    // footer:{
    //     height: window.innerHeight/2,
    // }
    page: {
        background: '#f9f9f9',
        width: '100%',
        padding: theme.spacing(3),
        [theme.breakpoints.down('xs')]: {
        marginLeft:"-60%"
    
        }}
  
    }));

export default function Dashboard() {
    const [access_token, setAccess_token] = useState(JSON.parse( localStorage.getItem('access_token') ));
    const [data, setData] = useState(null);
    const classes = useStyles();
    const history = useHistory();


    useEffect(async () => {
        const response = await axios.get(`${BASE_API_URL}/api/instructor/dashboard`,
          {headers:{
            'Authorization' : `Bearer ${access_token}`
          }}
        );
        const data_fetched = response.data;
        setData(data_fetched);
        }, []);
    
  

    return (
    <Layout title="qwe" >
        <div className={classes.paper}>
        <Typography className={classes.card2}  component="h2"  variant="h4" >
                Dashboard
            </Typography>
            { data && <div className={classes.card}>
            <Grid container spacing={1} >
                <Grid item xs={12} md={6} lg={4} key={1}>
                <div>
                    <Card elevation={1} className={classes.cardbody}
                    >
                        <CardHeader
                            title="COURSES"
                            action={
                                <IconButton>
                                <MenuBookIcon/>
                                </IconButton>
                            }
                        />
                        <CardContent>
                        <Typography variant="body2" color="textSecondary">
                            {data.courses_count}
                        </Typography>
                        </CardContent>
                    </Card>
                </div>
                </Grid>
                <Grid item xs={12} md={6} lg={4} key={2}>
                <div>
                    <Card elevation={1} className={classes.cardbody}>
                        <CardHeader
                            title="STUDENTS"
                            action={
                                <IconButton>
                                  <SupervisorAccountIcon/>
                                </IconButton>
                              }
                        />
                        <CardContent>
                        <Typography variant="body2" color="textSecondary">
                        {data.student_count}
                        </Typography>
                        </CardContent>
                    </Card>
                </div>
                </Grid>
                <Grid item xs={12} md={6} lg={4} key={3}>
                <div>
                    <Card elevation={1} className={classes.cardbody}>
                        <CardHeader
                            title="FINISHED CLASSES"
                            action={
                                <IconButton>
                                    <DoneAllIcon/>
                                </IconButton>
                            }
                        />
                        <CardContent>
                        <Typography variant="body2" color="textSecondary">
                        {data.Quizzes_done}
                        </Typography>
                        </CardContent>
                    </Card>
                </div>
                </Grid>
            </Grid>
            </div>}
        </div>
        <div className={classes.footer}>
                            <Typography className={classes.footer}></Typography>
        </div>
    </Layout>

    )
}
