import { Box, Button, Card, CardContent, CardHeader, createTheme, Divider, FormControl, Grid, IconButton, InputLabel, makeStyles, NativeSelect, responsiveFontSizes, TextField, Typography } from '@material-ui/core'
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
    },
    or:{
        marginTop:"20%",
        alignItems:"center",
        marginLeft:"25%"
    },
    divider:{
        marginBottom:"2%",
        marginTop:"2%",
        color:"#ff4",
        maxWidth: 360,
        width: '100%',
    }
  
}));

export default function ManageQuizzes() {
    const [quizNameT,setQuizNameT] = useState('');
    const [quizNameError,setQuizNameError] = useState(false);
    const [chapterDescription,setChapterDescription] = useState('');
    const [chapterDescriptionError,setChapterDescriptionError] = useState(false);
    const [rows2,setrow2] = useState(null);
    const [quizname, setQuizName] = React.useState({
        type: ''
      });
    
    const classes = useStyles();
    let theme = createTheme();
    theme = responsiveFontSizes(theme);

    const handleSubmit = () =>{
        console.log(3);
    }

    const [data, setData] = useState(null);

    
    // useEffect(async () => {
    //     const access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYzNDIwMTU2NywiZXhwIjoxNjM0MjA1MTY3LCJuYmYiOjE2MzQyMDE1NjcsImp0aSI6IlZqQVZvMXdVYThlSnFiRUQiLCJzdWIiOjIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.wJfz_eswb1rk2YGEur59ZDLdGmz9vxwwddd1qu0f_gw";
    //     const response = await axios.get(`${BASE_API_URL}/api/instructor/course/get-student-info/1`,
    //       {headers:{
    //         'Authorization' : `Bearer ${access_token}`
    //       }}
    //     );
    //     const data_fetched = response.data;
    //     setData(data_fetched);
    //     }, []);

        const handleRemove = (id) => {
            console.log(id);
        }

        const handleEdit = (id) => {
            console.log(id);
        }

        const handleChange = (e) => {
            const name = e.target.name;
            setQuizName({
              ...quizname,
              [name]: e.target.value,
            });
        };

    return (
    <LayoutCourse title="qwe">

        <div>
                <Typography className={classes.card2}  component="h2"  variant="h4" >
                Manage Quizzes
            </Typography>
            <div className={classes.card}>
            <Grid container spacing={1} >
                <Grid item xs={12} md={12} lg={12} key={1}>
                <div>
                    <Card elevation={1} className={classes.cardbody}
                    >
                        <CardHeader
                            title="Quiz info"
                            className={classes.cardHeader}
                            action={
                        <div className={classes.btn}>
                        <Button
                            color="secondary" 
                            variant="contained"
                            onClick={handleSubmit}
                            endIcon={<SendIcon />}>
                            Confirm
                        </Button>
                        </div>
                            }
                        />
                        <CardContent>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={5} lg={2} key={2}>
                                <InputLabel className={classes.label}>Quiz Name:</InputLabel>
                            </Grid>
                            <Grid item xs={12} md={6} lg={3} key={3}>
                                <TextField
                                    onChange={(e) => setQuizNameT(e.target.value)}
                                    className={classes.field}
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    required
                                    error={quizNameError}
                                    placeholder="Quiz 1"
                                />
                            </Grid>
                            <Grid item xs={12} md={1} lg={1} key={4}>
                             <Typography className={classes.or}  >
                                OR
                            </Typography>
                            </Grid>
                            <Grid item xs={12} md={1} lg={3} key={4}>
                            <FormControl className={classes.formControl}>
                                    <NativeSelect
                                    value={quizname.type}
                                    onChange={handleChange}
                                    label="qwe"
                                    inputProps={{
                                        name: 'type',
                                        id: 'age-native-label-placeholder',
                                    }}
                                    >
                                    <option value={0}>Choose one</option>
                                    <option value={10}>Ten</option>
                                    <option value={20}>Twenty</option>
                                    <option value={30}>Thirty</option>
                                    </NativeSelect>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={1} lg={3} key={4}>
                            </Grid>
                        </Grid>
                        </CardContent>
                    </Card>
                </div>
                </Grid>
            </Grid>
            </div>

            {/* question section */}
            <div className={classes.card}>
            <Grid container spacing={1} >
                <Grid item xs={12} md={12} lg={12} key={1}>
                <div>
                    <Card elevation={1} className={classes.cardbody}
                    >
                        <CardHeader
                            title="Add Question"
                            className={classes.cardHeader}
                            action={
                        <div className={classes.btn}>
                        <Button
                            color="secondary" 
                            variant="contained"
                            onClick={handleSubmit}
                            endIcon={<SendIcon />}>
                            Add Question
                        </Button>
                        </div>
                            }
                        />
                        <CardContent>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={5} lg={3} key={2}>
                                <InputLabel className={classes.label}>Question Content:</InputLabel>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4} key={3}>
                                <TextField
                                    onChange={(e) => setQuizNameT(e.target.value)}
                                    className={classes.field}
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    required
                                    error={quizNameError}
                                    placeholder="Quiz 1"
                                />
                            </Grid>
                            <Grid item xs={12} md={1} lg={5} key={4}>
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={5} lg={3} key={2}>
                                <InputLabel className={classes.label}>Question type:</InputLabel>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4} key={3}>
                            <FormControl className={classes.formControl}>
                                    <NativeSelect
                                    value={quizname.type}
                                    onChange={handleChange}
                                    label="qwe"
                                    inputProps={{
                                        name: 'type',
                                        id: 'age-native-label-placeholder',
                                    }}
                                    >
                                    <option value={0}>MCQ</option>
                                    <option value={10}>True or False</option>
                                    </NativeSelect>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={1} lg={5} key={4}>
                            </Grid>
                        </Grid>

                        <Divider  variant="middle" className={classes.divider} color="primary"/>
                        {/* MCQ section */}
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={5} lg={3} key={2}>
                                <InputLabel className={classes.label}>First Answer:</InputLabel>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4} key={3}>
                                <TextField
                                    onChange={(e) => setQuizNameT(e.target.value)}
                                    className={classes.field}
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    required
                                    error={quizNameError}
                                    placeholder="Quiz 1"
                                />
                            </Grid>
                            <Grid item xs={12} md={1} lg={5} key={4}>
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={5} lg={3} key={2}>
                                <InputLabel className={classes.label}>Second Answer:</InputLabel>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4} key={3}>
                                <TextField
                                    onChange={(e) => setQuizNameT(e.target.value)}
                                    className={classes.field}
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    required
                                    error={quizNameError}
                                    placeholder="Quiz 1"
                                />
                            </Grid>
                            <Grid item xs={12} md={1} lg={5} key={4}>
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={5} lg={3} key={2}>
                                <InputLabel className={classes.label}>Third Answer:</InputLabel>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4} key={3}>
                                <TextField
                                    onChange={(e) => setQuizNameT(e.target.value)}
                                    className={classes.field}
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    required
                                    error={quizNameError}
                                    placeholder="Quiz 1"
                                />
                            </Grid>
                            <Grid item xs={12} md={1} lg={5} key={4}>
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={5} lg={3} key={2}>
                                <InputLabel className={classes.label}>Right Answer:</InputLabel>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4} key={3}>
                            <FormControl className={classes.formControl}>
                                    <NativeSelect
                                    value={quizname.type}
                                    onChange={handleChange}
                                    label="qwe"
                                    inputProps={{
                                        name: 'type',
                                        id: 'age-native-label-placeholder',
                                    }}
                                    >
                                    <option value={0}>Choose Answer</option>
                                    <option value={10}>First Answer</option>
                                    <option value={10}>Second Answer</option>
                                    <option value={10}>Third Answer</option>
                                    </NativeSelect>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={1} lg={5} key={4}>
                            </Grid>
                        </Grid>
                        {/*true or false section  */}
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={5} lg={3} key={2}>
                                <InputLabel className={classes.label}>Right Answer:</InputLabel>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4} key={3}>
                            <FormControl className={classes.formControl}>
                                    <NativeSelect
                                    value={quizname.type}
                                    onChange={handleChange}
                                    label="qwe"
                                    inputProps={{
                                        name: 'type',
                                        id: 'age-native-label-placeholder',
                                    }}
                                    >
                                    <option value={0}>Choose Answer</option>
                                    <option value={10}>True</option>
                                    <option value={10}>False</option>
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

            {/* edit MCQ section */}
            <div className={classes.card}>
            <Grid container spacing={1} >
                <Grid item xs={12} md={12} lg={12} key={1}>
                <div>
                    <Card elevation={1} className={classes.cardbody}
                    >
                        <CardHeader
                            title="Edit question"
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
                                <TextField
                                        onChange={(e) => setQuizNameT(e.target.value)}
                                        className={classes.field}
                                        variant="outlined"
                                        color="primary"
                                        fullWidth
                                        required
                                        error={quizNameError}
                                        placeholder="Quiz 1"
                                    />
                            </Grid>
                            <Grid item xs={12} md={6} lg={2} key={3}>
                                <TextField
                                    onChange={(e) => setQuizNameT(e.target.value)}
                                    className={classes.field}
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    required
                                    error={quizNameError}
                                    placeholder="Quiz 1"
                                />
                            </Grid>
                            <Grid item xs={12} md={6} lg={2} key={3}>
                                <TextField
                                    onChange={(e) => setQuizNameT(e.target.value)}
                                    className={classes.field}
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    required
                                    error={quizNameError}
                                    placeholder="Quiz 1"
                                />
                            </Grid>
                            <Grid item xs={12} md={6} lg={2} key={3}>
                                <TextField
                                    onChange={(e) => setQuizNameT(e.target.value)}
                                    className={classes.field}
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    required
                                    error={quizNameError}
                                    placeholder="Quiz 1"
                                />
                            </Grid>
                            <Grid item xs={12} md={1} lg={3} key={4}>
                            <FormControl className={classes.formControl}>
                                    <NativeSelect
                                    value={quizname.type}
                                    onChange={handleChange}
                                    label="qwe"
                                    inputProps={{
                                        name: 'type',
                                        id: 'age-native-label-placeholder',
                                    }}
                                    >
                                    <option value={20}>First</option>
                                    <option value={30}>Second</option>
                                    </NativeSelect>
                                </FormControl>
                            </Grid>
                        </Grid>
                        </CardContent>
                    </Card>
                </div>
                </Grid>
            </Grid>
            </div>

            {/* edit T or F section */}
            <div className={classes.card}>
            <Grid container spacing={1} >
                <Grid item xs={12} md={12} lg={12} key={1}>
                <div>
                    <Card elevation={1} className={classes.cardbody}
                    >
                        <CardHeader
                            title="Edit question"
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
                            <Grid item xs={12} md={5} lg={4} key={2}>
                                <TextField
                                        onChange={(e) => setQuizNameT(e.target.value)}
                                        className={classes.field}
                                        variant="outlined"
                                        color="primary"
                                        fullWidth
                                        required
                                        error={quizNameError}
                                        placeholder="Quiz 1"
                                    />
                            </Grid>
                            <Grid item xs={12} md={1} lg={4} key={4}>
                            <FormControl className={classes.formControl}>
                                    <NativeSelect
                                    value={quizname.type}
                                    onChange={handleChange}
                                    label="qwe"
                                    inputProps={{
                                        name: 'type',
                                        id: 'age-native-label-placeholder',
                                    }}
                                    >
                                    <option value={20}>First</option>
                                    <option value={30}>Second</option>
                                    </NativeSelect>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={1} lg={4} key={4}>
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

