import { Box, Button, Card, CardContent, CardHeader, createTheme, FormControl, Grid,  IconButton,  InputLabel, makeStyles, NativeSelect, responsiveFontSizes, TextField, Typography } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import React, {useState, useEffect} from 'react'
import SendIcon from '@material-ui/icons/Send';
import Slider from '@material-ui/core/Slider';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LayoutCourse from '../../components/layouts/LayoutCourse'
import BASE_API_URL from '../../services/BaseUrl'
import axios from "axios";
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';



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
        marginRight:"50%",
        paddingRight:"10%"
    },
    label:{
        alignItems:"center",
        marginTop:"5%"
    }
  
}));



export default function UploadMaterial() {
    const [access_token, setAccess_token] = useState(JSON.parse( localStorage.getItem('access_token') ));
    const [courseId, setCourseID] = useState(JSON.parse(localStorage.getItem('course_id')));
    const classes = useStyles();
    const [data, setData] = useState(null);
    const [types, setTypes] = useState(null);
    const [sliderValue, setSliderValue] = useState(20);
    const [courseName,setCourseName] = useState('w');//
    const [courseTypeName,setCourseTypeName] = useState(1);//
    const [courseDescription,setCourseDescription] = useState('');//
    const [nameError,setNameError] = useState(false);
    const [courseDescriptionError,setCourseDescriptionError] = useState(false);
    const [courseType, setCourseType] = React.useState(null);
      const [courseMajor, setCourseMajor] = React.useState({
        major: ''
      });
    
    let theme = createTheme();
    theme = responsiveFontSizes(theme);

    const handleChange = (e) => {
        const name = e.target.name;
        setCourseTypeName(e.target.value);
        setCourseType({
          ...courseType,
          [name]: types[e.target.value-1].name,
        });
    };

    const handleMajorChange = (e) => {
        const name = e.target.name;
        setCourseMajor({
          ...courseMajor,
          [name]: e.target.value,
        });
        };

    const handleSubmit = async() =>{
        const response = await axios.post(`${BASE_API_URL}/api/instructor/course/edit-info/${courseId}`,
        {
            "name" : courseName,
            "description" : courseDescription,
            "type_id" : courseTypeName,
            "progress" : sliderValue
             
        },
        {headers:{
          'Authorization' : `Bearer ${access_token}`
        }}
      );
        const data_fetched = await response.data;
        if(data_fetched){
            getData();
        }
    }

    const getTypesData = async()=>{
        const response = await axios.get(`${BASE_API_URL}/api/instructor/get-course-types`,
        {headers:{
          'Authorization' : `Bearer ${access_token}`
        }}
      );
        const data_fetched = await response.data;
        setTypes(data_fetched);
    }
    const getData = async()=>{
        const response = await axios.get(`${BASE_API_URL}/api/instructor/course/info/${courseId}`,
        {headers:{
          'Authorization' : `Bearer ${access_token}`
        }}
      );
      const data_fetched = await response.data;
      if(data_fetched.status){
          setData(null);
      }else{
          setData(data_fetched);
        setCourseName(await data_fetched[0].name);
        setCourseTypeName(await data_fetched[0].type_id);
        setCourseDescription(await data_fetched[0].description);
        setCourseType({type: `${await data_fetched[0].course_type}`})
        setSliderValue(await data_fetched[0].progress);
      }
    }
    useEffect(async () => {
        getData();
        getTypesData();
        }, []);
        
    // const handelSlider = () =>{
    //     console.log(sliderValue);
    // }
    

    return (
    <LayoutCourse title="qwe">

        <div>
            <Typography   component="h2"  variant="h4" >
                Course info
            </Typography>
            <div className={classes.card}>
    {data && <Grid container spacing={1} >
                <Grid item xs={12} md={12} lg={12} key={1}>
                <div>
                    <Card elevation={1} className={classes.cardbody}
                    >
                        <CardHeader
                            title="Update Course info"
                            className={classes.cardHeader}
                            action={
                                <div className={classes.btn}>
                                <Button
                                color="secondary" 
                                variant="contained"
                                onClick={handleSubmit}
                                endIcon={<SendIcon />}>
                                Update
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
                                key={22}
                                    onChange={(e) => setCourseName(e.target.value)}
                                    className={classes.field}
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    required
                                    value={courseName}
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
                                    key={23}
                                    onChange={(e) => setCourseDescription(e.target.value)}
                                    className={classes.field}
                                    value={courseDescription}
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    required
                                    error={courseDescriptionError}
                                    placeholder="Description"
                                />
                            </Grid>
                            <Grid item xs={12} md={1} lg={5} key={4}>
                            </Grid>
                        </Grid>
   

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={5} lg={3} key={2}>
                                <InputLabel>Course progress:</InputLabel>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4} key={3}>
                            <Slider
                                key={`slider-${sliderValue}`} /* fixed issue */
                                ValueLabelComponent={ValueLabelComponent}
                                aria-label="custom thumb label"
                                defaultValue={sliderValue}
                                // onChange={handelSlider}
                                onChangeCommitted={(event, newValue) =>
                                    setSliderValue(newValue)
                                  }
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

                        </CardContent>
                    </Card>
                </div>
                </Grid>
            </Grid>}
            
            </div>

        </div>
        </LayoutCourse>

    )
}

function ValueLabelComponent(props) {
    const { children, open, value } = props;
  
    return (
      <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }
  
  ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
  };
