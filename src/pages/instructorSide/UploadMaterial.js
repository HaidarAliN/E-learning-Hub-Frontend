import { Box, Button, Card, CardContent, CardHeader, createTheme, FormControl, Grid, IconButton, InputLabel, makeStyles, NativeSelect, responsiveFontSizes, TextField, Typography } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import React, {useState,useEffect} from 'react'
import SendIcon from '@material-ui/icons/Send';
import BackupOutlinedIcon from '@material-ui/icons/BackupOutlined';
import EditIcon from '@material-ui/icons/Edit';
import LayoutCourse from '../../components/layouts/LayoutCourse'
import Materials from '../../components/Materials';
import BASE_API_URL from '../../services/BaseUrl'
import axios from "axios";


const useStyles = makeStyles((theme) => ({
    card:{
        marginTop: "2%",
        marginBottom: "3%",
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
    },
    label:{
        alignItems:"center",
        marginTop:"5%"
    }
  
}));


export default function UploadMaterial() {
    const [chapterName,setChapterName] = useState('');
    const [chapterDescription,setChapterDescription] = useState('');
    const [nameError,setNameError] = useState(false);
    const [chapterDescriptionError,setChapterDescriptionError] = useState(false);
    const [rows2,setrow2] = useState(null);
    
    const classes = useStyles();
    let theme = createTheme();
    theme = responsiveFontSizes(theme);

    const handleSubmit = () =>{
        console.log(3);
    }

    const [data, setData] = useState(null);
    useEffect(async () => {
        const access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzNDE3MjcxOSwiZXhwIjoxNjM0MTc2MzE5LCJuYmYiOjE2MzQxNzI3MTksImp0aSI6IkFlcUVzcU9wRDZPSUh6bmUiLCJzdWIiOjIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.6FZRo-arwrvPBmv0X-XbfiW2G3b7678DwtK6BbO5lpc";
        const response = await axios.get(`${BASE_API_URL}/api/instructor/course/get-student-info/1`,
          {headers:{
            'Authorization' : `Bearer ${access_token}`
          }}
        );
        const data_fetched = response.data;
        setData(data_fetched);
        }, []);

        const handleRemove = (id) => {
            console.log(id);
        }

        const handleEdit = (id) => {
            console.log(id);
        }

    return (
    <LayoutCourse title="qwe">

        <div>
            <ThemeProvider theme={theme}>
            <Typography  component="h3"  variant="h4" >
                <Box color="text.primary">
                Upload Materials
                </Box>
            </Typography>
             <Typography  component="h6" variant="body1" >
                <Box color="text.secondary">
                </Box>
            </Typography>
            </ThemeProvider>
            <div className={classes.card}>
            <Grid container spacing={1} >
                <Grid item xs={12} md={12} lg={12} key={1}>
                <div>
                    <Card elevation={1} className={classes.cardbody}
                    >
                        <CardHeader
                            title="Add Chapter info"
                            className={classes.cardHeader}
                            action={
                                
                        <div className={classes.btn}>
                        <Button
                            color="secondary" 
                            variant="contained"
                            onClick={handleSubmit}
                            endIcon={<SendIcon />}>
                            Add Chapter
                        </Button>
                        </div>
                            }
                        />
                        <CardContent>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={5} lg={3} key={2}>
                                <InputLabel className={classes.label}>Chapter name:</InputLabel>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4} key={3}>
                                <TextField
                                    onChange={(e) => setChapterName(e.target.value)}
                                    className={classes.field}
                                    label="Name"
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    required
                                    error={nameError}
                                    placeholder="Chapter 1"
                                />
                            </Grid>
                            <Grid item xs={12} md={1} lg={5} key={4}>
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={5} lg={3} key={2}>
                                <InputLabel  className={classes.label}>Chapter Description:</InputLabel>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4} key={3}>
                                <TextField
                                    onChange={(e) => setChapterDescription(e.target.value)}
                                    className={classes.field}
                                    label="Description"
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    required
                                    error={chapterDescriptionError}
                                    placeholder="Description"
                                />
                            </Grid>
                            <Grid item xs={12} md={1} lg={5} key={4}>
                            </Grid>
                        </Grid>
   

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={5} lg={3} key={2}>
                                <InputLabel>Upload File:</InputLabel>
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

                        
                        </CardContent>
                    </Card>
                </div>
                </Grid>
            </Grid>
            </div>

            <div >
            <Grid container spacing={1} >
                <Grid item xs={12} md={12} lg={12} key={1}>
                <div>
            {data && <Materials data={data} handleRemove={handleRemove} handleEdit={handleEdit}/>}
                </div>
                </Grid>
                </Grid>
                </div>


        </div>
        </LayoutCourse>
    )
}

