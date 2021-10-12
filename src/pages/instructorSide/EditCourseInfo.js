import { Box, Button, Card, CardContent, CardHeader, createTheme, FormControl, Grid,  IconButton,  InputLabel, makeStyles, NativeSelect, responsiveFontSizes, TextField, Typography } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import React, {useState} from 'react'
import SendIcon from '@material-ui/icons/Send';
import BackupOutlinedIcon from '@material-ui/icons/BackupOutlined';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LayoutCourse from '../../components/layouts/LayoutCourse'



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
    const [courseName,setCourseName] = useState('');
    const [courseDescription,setCourseDescription] = useState('');
    const [nameError,setNameError] = useState(false);
    const [courseDescriptionError,setCourseDescriptionError] = useState(false);
    const [courseType, setCourseType] = React.useState({
        type: ''
      });
      const [courseMajor, setCourseMajor] = React.useState({
        major: ''
      });
    
    const classes = useStyles();
    let theme = createTheme();
    theme = responsiveFontSizes(theme);

    const handleChange = (e) => {
        const name = e.target.name;
        setCourseType({
          ...courseType,
          [name]: e.target.value,
        });
    };

    const handleMajorChange = (e) => {
        const name = e.target.name;
        setCourseMajor({
          ...courseMajor,
          [name]: e.target.value,
        });
        };

    const handleSubmit = () =>{
        console.log(3);
    }

    return (
    <LayoutCourse title="qwe">

        <div>
            <Typography   component="h2"  variant="h4" >
                Course info
            </Typography>
            <div className={classes.card}>
            <Grid container spacing={1} >
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
                                    onChange={(e) => setCourseName(e.target.value)}
                                    className={classes.field}
                                    label="Name"
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
                                    onChange={(e) => setCourseDescription(e.target.value)}
                                    className={classes.field}
                                    label="Description"
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
                                <FormControl className={classes.formControl}>
                                <Button
                                    variant="contained"
                                    component="label"
                                    color="secondary" 
                                    endIcon={<BackupOutlinedIcon/>}
                                    >
                                    Upload File
                                    <input
                                        type="file"
                                        hidden
                                    />
                                </Button>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={1} lg={5} key={4}>
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={5} lg={3} key={2}>
                                <InputLabel>Course type:</InputLabel>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4} key={3}>
                                <FormControl className={classes.formControl}>
                                    <NativeSelect
                                    value={courseType.type}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: 'type',
                                        id: 'age-native-label-placeholder',
                                    }}
                                    >
                                    <option aria-label="qwe" value="" />
                                    <option value={10}>Ten</option>
                                    <option value={20}>Twenty</option>
                                    <option value={30}>Thirty</option>
                                    </NativeSelect>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={1} lg={5} key={4}>
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={5} lg={3} key={2}>
                                <InputLabel>Course Major:</InputLabel>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4} key={3}>
                                <FormControl className={classes.formControl}>
                                    <NativeSelect
                                    value={courseMajor.major}
                                    onChange={handleMajorChange}
                                    inputProps={{
                                        name: 'major',
                                        id: 'type-native-helper',
                                    }}
                                    >
                                    <option aria-label="qwee" value="" />
                                    <option value={10}>Ten</option>
                                    <option value={20}>Twenty</option>
                                    <option value={30}>Thirty</option>
                                    </NativeSelect>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={1} lg={5} key={4}>
                            </Grid>
                        </Grid>
                        </CardContent>
                    </Card>
                </div>
                </Grid>
            </Grid>
            </div>

        </div>
        </LayoutCourse>

    )
}

