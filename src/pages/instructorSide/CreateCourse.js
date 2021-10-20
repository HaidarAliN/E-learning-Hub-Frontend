import { Box, Button, Card, CardContent, CardHeader, Container, createTheme, FormControl, Grid, InputLabel, makeStyles, NativeSelect, responsiveFontSizes, TextField, Typography } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import React, {useState, useEffect} from 'react'
import SendIcon from '@material-ui/icons/Send';
import Layout from '../../components/layouts/instructorSideLayout/Layout'
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
    cardHeader:{
        marginBottom: 0,
        backgroundColor:'#f8f9fc',
        borderBottom: '1px solid #e3e6f0',
        color: '#757575',
        [theme.breakpoints.up('xs')]: {
            fontSize: "2px",
            size: "2",
            text:""
          },
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
        [theme.breakpoints.down('xs')]: {
            display: 'none',

          },
    },
    btnxs:{
        marginTop: "2%",
        [theme.breakpoints.up('md')]: {
            display: 'none',

          },
    },
    label:{
        alignItems:"center",
        marginTop:"5%"
    },
    created:{
        marginTop: "2%"
    }
  
}));

export default function CreateCourse() {
    const [access_token, setAccess_token] = useState(JSON.parse( localStorage.getItem('access_token') ));
    const [courseName, setCourseName] = useState('');
    const [nameError, setNameError] = useState(false);
    const [CourseDescription, setCourseDescription] = useState('');
    const [CourseDescriptionError, setCourseDescriptionError] = useState(false);
    const [types, setTypes] = useState(null);
    const [courseTypeName,setCourseTypeName] = useState(1);//
    const [courseType, setCourseType] = useState(0);
    const [created, setCreated] = useState(null);
    // const [courseType, setCourseType] = useState({
    //     type: ''
    //   });

    const handleChange = (e) => {
        const name = e.target.name;
        setCourseTypeName(e.target.value);
        setCourseType({
          ...courseType,
          [name]: types[e.target.value-1].name,
        });
    };

    useEffect(async () => {
        const response = await axios.get(`${BASE_API_URL}/api/instructor/get-course-types`,
        {headers:{
          'Authorization' : `Bearer ${access_token}`
        }}
        );
        const data_fetched = await response.data;
        setTypes(data_fetched);
    }, []);

  
    
    const handleSubmit = async() =>{
        setNameError(false);
        setCourseDescriptionError(false);

        if(!courseName){
            setNameError(true);
        }
        if(!CourseDescription){
            setCourseDescriptionError(true);
        }
        if(courseName && CourseDescription && courseTypeName){
            const response = await axios.post(`${BASE_API_URL}/api/instructor/create-course`,
            {
                "name" : courseName,
                "description" : CourseDescription,
                "type_id" : courseTypeName,
            },
            {headers:{
            'Authorization' : `Bearer ${access_token}`
            }}
            );
            const data_fetched = await response.data;
            if(data_fetched){
                setCreated("1");
            }
        }
    }

    const classes = useStyles();
    let theme = createTheme();
    theme = responsiveFontSizes(theme);
    return (
    <Layout title="qwe">

        <div>
        <Typography className={classes.card2}  component="h2"  variant="h4" >
                Create New Course
            </Typography>

            {!created ?<div className={classes.card}>
            <Grid container spacing={1} >
                <Grid item xs={12} md={12} lg={12} key={1}>
                <div>
                    <Card elevation={1} className={classes.cardbody}
                    >
                        <CardHeader
                            title="Info"
                            className={classes.cardHeader}
                            action={
                                <div
                                 className={classes.btn}
                                >
                                <Button
                                   
                                    color="secondary" 
                                    variant="contained"
                                    onClick={handleSubmit}
                                    endIcon={<SendIcon />}>
                                    Create Course
                                </Button>
                                </div>
                            }
                        />
                        <CardContent>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={5} lg={3} key={2}>
                                <InputLabel className={classes.label}>Course name:</InputLabel>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4} key={3}>
                                <TextField
                                    key={11}
                                    onChange={(e) => setCourseName(e.target.value)}
                                    className={classes.field}
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    required
                                    error={nameError}
                                    placeholder="Machine learning"
                                />
                            </Grid>
                            <Grid item xs={12} md={1} lg={5} key={4}>
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={5} lg={3} key={2}>
                                <InputLabel  className={classes.label}>Course Description:</InputLabel>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4} key={3}>
                                <TextField
                                    key={12}
                                    onChange={(e) => setCourseDescription(e.target.value)}
                                    className={classes.field}
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    required
                                    error={CourseDescriptionError}
                                    placeholder="Description"
                                />
                            </Grid>
                            <Grid item xs={12} md={1} lg={5} key={4}>
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={5} lg={3} key={2}>
                                <InputLabel>Course type:</InputLabel>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4} key={3}>
                            {types &&<FormControl className={classes.formControl}>
                                    <NativeSelect
                                    value={courseType.type}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: 'type',
                                        id: 'age-native-label-placeholder',
                                    }}
                                    >
                                    <option >{courseType.type}</option>
              {types.map(item => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                    ))}
                                    </NativeSelect>
                                </FormControl>}
                            </Grid>
                            <Grid item xs={12} md={1} lg={5} key={4}>
                            </Grid>
                        </Grid>
                        <div
                                 className={classes.btnxs}
                                >
                                <Button
                                   
                                    color="secondary" 
                                    variant="contained"
                                    onClick={handleSubmit}
                                    endIcon={<SendIcon />}>
                                    Create Course
                                </Button>
                                </div>
                        </CardContent>
                    </Card>
                </div>
                </Grid>
            </Grid>
            </div>
            :
            <Typography className={classes.created} component="h2"  variant="body1" >
                Course has beed created!
            </Typography>    
        }
        </div>
    </Layout>

    )
}
