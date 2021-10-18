import { Button, Card, CardContent, CardHeader,  Grid, makeStyles, Typography } from '@material-ui/core'
import Layout from '../../components/layouts/studentSideLayout/Layout'
import React, {useState, useEffect} from 'react'
import BASE_API_URL from '../../services/BaseUrl'
import axios from "axios";
import ArrowForwardSharpIcon from '@material-ui/icons/ArrowForwardSharp';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { useHistory } from 'react-router';


const useStyles = makeStyles((theme) => ({
    card:{
        marginTop: "2%"
    },
    cardbody:{
        borderWidth: "1px",
        marginRight:"2%",
        marginBottom:"2%"
    },
    card2:{
        marginBottom:"3%"
    },
    cardHeader:{
        marginBottom: 0,
        backgroundColor:'#f8f9fc',
        borderBottom: '1px solid #e3e6f0',
        color: '#757575',
    },
    field: {
        marginTop: "2%",
        marginBottom: "2%"
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
      selectEmpty: {
        marginTop: theme.spacing(2),
    },
    btn:{
        marginTop: "2%",
    },
    label:{
        aligndata:"center",
        marginTop:"5%"
    },
    flex:{
        // display: "flex-row",
        width: "1000"
        // flex: 1,
    },
    cardBody:{
        color: '#757575',
    }
  
}));

export default function FinishedCourses() {
    const classes = useStyles();
    const [access_token, setAccess_token] = useState(JSON.parse( localStorage.getItem('access_token') ));
    const [data, setData] = useState(null);
    const history = useHistory()

    const fetchMoreData = async () => {
        const response = await axios.get(`${BASE_API_URL}/api/student/get-finished-courses`,
          {headers:{
            'Authorization' : `Bearer ${access_token}`
          }}
        );
        const data_fetched = response.data;
        setData(data_fetched);
    }

    useEffect(async () => {
        const response = await axios.get(`${BASE_API_URL}/api/student/get-finished-courses`,
          {headers:{
            'Authorization' : `Bearer ${access_token}`
          }}
        );
        const data_fetched = response.data;
        if(data_fetched.status){
            setData(null);
        }else{
            setData(data_fetched);
        }
        }, []);

        const handleSubmit = (id) =>{
            localStorage.setItem('course_id', id);
            history.push("/course/Dashboard");
        }

    return (
    <Layout title="qwe">

        <div>
            <Typography className={classes.card2}  component="h2"  variant="h4" >
                On Going Courses
            </Typography>

            {/* card */}
            <div className={classes.card}>
            <Grid container spacing={1} >

            {data ? 
            // <InfiniteScroll
            //                 dataLength={data.length} //This is important field to render the next data
            //                 next={fetchMoreData}
            //                 hasMore={true}
            //                 className={classes.flex}
            //                 loader={<h4>Loading...</h4>}
            //                 >
                                  data.map(item => (

                <Grid item xs={12}  sm={6} md={8} lg={4} key={item.id}>
                <div>
                    <Card elevation={1} className={classes.cardbody}
                    >
                        <CardHeader
                            title={item.name}
                            action={
                                <MenuBookIcon/>
                            }
                            className={classes.cardHeader}
                        />
                        <CardContent className={classes.cardBody}>

                           
                            <div>
                            <Typography>Progress: {item.progress}%</Typography>
                            <Typography >Course Type: {item.course_type}</Typography>
                            <div className={classes.btn}>
                                <Button
                                    
                                    color="secondary" 
                                    variant="contained"
                                    onClick={() => handleSubmit(item.id)}
                                    startIcon={<ArrowForwardSharpIcon />}
                                    >
                                    Go To Course
                                </Button>
                                </div>
                             </div>                          

                      
                        
                        </CardContent>
                    </Card>
                </div>
                </Grid>
                  

                ))
                            
                        :<Typography className={classes.card2}  component="h2"  variant="h4" >
                            Nothing to show
                        </Typography>}

            </Grid>
            </div>


        </div>
    </Layout>
    )
}