import { Card, CardContent, CardHeader, Grid, Button, InputLabel, makeStyles, TextField, Typography } from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import Layout from '../../components/layouts/studentSideLayout/Layout'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import SearchIcon from '@material-ui/icons/Search';
import BASE_API_URL from '../../services/BaseUrl'
import axios from "axios";
import { useHistory, useLocation } from 'react-router-dom'
import ArrowForwardSharpIcon from '@material-ui/icons/ArrowForwardSharp';
import MenuBookIcon from '@material-ui/icons/MenuBook';

const useStyles = makeStyles((theme) => ({
    card:{
        marginTop: "2%",
        color: "#bac8f2"
    },
    cardbody:{
        color:'#5a5c69',
        borderWidth: "1px",
        borderLeft: '.25rem solid !important',
        borderColor: "#bac8f2 !important"
    },
    cardHeader:{
        color:'#5a5c69',
        marginBottom: 0,
        backgroundColor:'#f8f9fc',
        borderBottom: '1px solid #e3e6f0',
    },
    page: {
        background: '#f9f9f9',
        width: '100%',
       },
        card2:{
            color:'#5a5c69',
            [theme.breakpoints.down('md')]: {
                marginBottom:  "10%"
            
                },
        },
        labell:{
            marginBottom : "4%"
        }
  
    }));

export default function SearchCourse() {
    const [access_token, setAccess_token] = useState(JSON.parse( localStorage.getItem('access_token') ));
    const [data, setData] = useState(null);
    const [status, setStatus] = useState(false);
    const [searchName, setSearchName] = useState('');
    const [searchNameError, setSearchNameError] = useState(false);
    const [enrollMessage, setEnrollMessage] = useState(false);
    const classes = useStyles();
    const history = useHistory();

        const handleSearch = async() => {
            setSearchNameError(false);
            if(!searchName){
                setSearchNameError(true);
            }

            if(searchName){
                const response = await axios.post(`${BASE_API_URL}/api/student/search-for-course`,
                {
                    "course_name":searchName,
                },
                {headers:{
                    'Authorization' : `Bearer ${access_token}`
                }}
                );
                const data_fetched = response.data;
                if(data_fetched.status){
                    setData('');
                    setStatus(true);
                     setEnrollMessage(false);
                }
                else{
                    setData(data_fetched);
                    setEnrollMessage(false);
                    setStatus(false);
                }
            }
        }

        const handleSubmit = async (id) => {
            const response = await axios.post(`${BASE_API_URL}/api/student/enroll-in-course`,
            {
                "course_id":id,
            },
            {headers:{
                'Authorization' : `Bearer ${access_token}`
            }}
            );
            const data_fetched = response.data;
            if(data_fetched){
                console.log(id);
                setSearchName('');
                setEnrollMessage(true);
                setData('');
            }
        }

    return (
    <Layout title="qwe" >
        <div className={classes.page}>
        <Typography className={classes.card2}  component="h2"  variant="h4" >
                Search Course
            </Typography>
            <div className={classes.card}>
            <Grid container spacing={1} >
                <Grid item xs={12} md={12} lg={12} key={2}>
                <div>
                    <Card elevation={1} className={classes.cardbody}>
                        <CardHeader
                            title="Search box"
                            className={classes.cardHeader}

                            action={
                                <div className={classes.btn}>
                                    <Button
                                        color="secondary" 
                                        variant="contained"
                                        style={{backgroundColor :"#bac8f2"}}
                                        onClick={handleSearch}
                                        endIcon={<SearchIcon/>}>
                                        Search
                                    </Button>
                                </div>
                              }
                        />
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={3} lg={3} key={2}>
                                    <InputLabel  className={classes.label}>Course Name:</InputLabel>
                                </Grid>
                                <Grid item xs={12} md={5} lg={5} key={3}>
                                    <TextField
                                        key={555}
                                        onChange={(e) => setSearchName(e.target.value)}
                                        className={classes.field}
                                        variant="outlined"
                                        color="primary"
                                        fullWidth
                                        value={searchName}
                                        required
                                        error={searchNameError}
                                        placeholder="Name"
                                    />
                                </Grid>
                                <Grid item xs={12} md={4} lg={4} key={4}>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </div>
                </Grid>
               
            </Grid>
            </div>

            {/* search card */}
            <div className={classes.card}>
            <Grid container spacing={1} >

            {data &&
                data.map(item => (

                <Grid item xs={12}  sm={6} md={6} lg={4} key={item.id}>
                <div>
                    <Card elevation={1} className={classes.cardbody}
                    >
                        <CardHeader
                            title={item.name}
                            action={
                                <MenuBookIcon style={{color:'#bac8f2'}}/>
                            }
                            className={classes.cardHeader}
                        />
                        <CardContent className={classes.cardBody}>

                           
                            <div>
                            <Typography className={classes.labell}>Progress: {item.progress}%</Typography>
                            <Typography className={classes.labell}>Course Type: {item.course_type}</Typography>
                            <div className={classes.btn}>
                                <Button
                                    
                                    color="secondary" 
                                    variant="contained"
                                    style={{backgroundColor :"#bac8f2"}}
                                    onClick={() => handleSubmit(item.id)}
                                    startIcon={<ArrowForwardSharpIcon />}
                                    >
                                    Enroll in Course
                                </Button>
                                </div>
                             </div>                          

                      
                        
                        </CardContent>
                    </Card>
                </div>
                </Grid>
                  

                ))
                            
                        }
                        {status && 
                <Typography  component="h2"  variant="h4" >
                    Nothing to show
                </Typography>}
            {enrollMessage &&
                    <Typography  component="h2"  variant="h4" >
                    Request Sent!
                    </Typography>
            }
                          
                        

            </Grid>
            </div>
            {/* end search card */}
        </div>
      
    </Layout>

    )
}
