import { Card, CardContent, CardHeader, Grid, IconButton, makeStyles, Typography } from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import Layout from '../../components/layouts/instructorSideLayout/Layout'
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
        borderColor: "#2a96a5 !important"
    },
    card2:{
        color:'#5a5c69',
        [theme.breakpoints.down('md')]: {
            marginBottom:  "10%"
        
            },
    },
    page: {
        background: '#f9f9f9',
        width: '100%',
        },
        cardHeader:{
            marginBottom: 0,
            backgroundColor:'#e3e6f0',
            borderBottom: '1px solid #e3e6f0',
            color: '#757575',
        }
  
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
        <div className={classes.page}>
        <Typography className={classes.card2}  component="h2"  variant="h4" >
                Dashboard
            </Typography>
             <div className={classes.card}>
            <Grid container spacing={1} >
                <Grid item xs={12} md={6} lg={4} key={1}>
                <div>
                    <Card elevation={1} className={classes.cardbody}
                    >
                        <CardHeader
                            title="COURSES"
                            className={classes.cardHeader}
                            action={
                                <IconButton>
                                <MenuBookIcon style={{color:"#2c9faf"}}/>
                                </IconButton>
                            }
                        />
                        <CardContent>
                        { data && <Typography variant="h3" style={{color:"#2a96a5"}}>
                            {data.courses_count}
                        </Typography>}
                        </CardContent>
                    </Card>
                </div>
                </Grid>
                <Grid item xs={12} md={6} lg={4} key={2}>
                <div>
                    <Card elevation={1} className={classes.cardbody}>
                        <CardHeader
                            title="STUDENTS"
                            className={classes.cardHeader}
                            action={
                                <IconButton>
                                  <SupervisorAccountIcon style={{color:"#2c9faf"}}/>
                                </IconButton>
                              }
                        />
                        <CardContent>
                        { data && <Typography variant="h3" style={{color:"#2a96a5"}}>
                        {data.student_count}
                        </Typography>}
                        </CardContent>
                    </Card>
                </div>
                </Grid>
                <Grid item xs={12} md={6} lg={4} key={3}>
                <div>
                    <Card elevation={1} className={classes.cardbody}>
                        <CardHeader
                            title="FINISHED COURSES"
                            className={classes.cardHeader}
                            action={
                                <IconButton>
                                    <DoneAllIcon style={{color:"#2c9faf"}}/>
                                </IconButton>
                            }
                        />
                        <CardContent>
                        { data && <Typography variant="h3" style={{color:"#2a96a5"}}>
                        {data.finished_courses}
                        </Typography>}
                        </CardContent>
                    </Card>
                </div>
                </Grid>
            </Grid>
            </div>
        </div>
        <div className={classes.footer}>
                            <Typography className={classes.footer}></Typography>
        </div>
    </Layout>

    )
}
