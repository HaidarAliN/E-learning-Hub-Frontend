import { Button, Card, CardContent, CardHeader, createTheme, FormControl, Grid, InputLabel, makeStyles, NativeSelect, responsiveFontSizes, TextField, Typography } from '@material-ui/core'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import React, {useState, useEffect} from 'react'
import Layout from '../../components/layouts/adminSideLayout/Layout'
import BASE_API_URL from '../../services/BaseUrl'
import axios from "axios";


const useStyles = makeStyles((theme) => ({
    card:{
        marginTop: "2%"
    },
    cardbody:{
        color:'#5a5c69',
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
        [theme.breakpoints.down('xs')]: {
            display: 'none',

            },
    },
    label:{
        alignItems:"center",
        marginTop:"5%"
    },
    created:{
        marginTop: "2%"
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
    btnxs:{
        marginTop: "2%",
        [theme.breakpoints.up('sm')]: {
            display: 'none',

            },
    }  
  
}));

export default function Home() {
    const [access_token, setAccess_token] = useState(JSON.parse( localStorage.getItem('access_token') ));
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [userTypeName,setUserTypeName] = useState('');//
    const [created, setCreated] = useState(null);
    const [userType, setUserType] = useState({
        type: ''
      });

    const handleChange = (e) => {
        const name = e.target.name;
        if(e.target.value == 2){
            setUserTypeName("Instructor");
        }else if(e.target.value == 3){
            setUserTypeName("Student");
        }
        setUserType({
          ...userType,
          [name]: e.target.value,
        });
    };

    const handleSubmit = async() =>{
        setFirstNameError(false);
        setLastNameError(false);
        setEmailError(false);
        setPasswordError(false);

        if(!firstName){
            setFirstNameError(true);
        }
        if(!lastName){
            setLastNameError(true);
        }

        if(!password){
            setPasswordError(true);
        }

        if(!email){
            setEmailError(true);
        }

        if(firstName && lastName && password && email && userTypeName){
            const response = await axios.post(`${BASE_API_URL}/api/admin/register`,
            {
                "first_name" : firstName,
                "last_name" : lastName,
                "user_type_id" : userType.type,
                "password" : password,
                "email" : email,
                "password_confirmation": password,
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
    <Layout title="qwe" >
        <div className={classes.page}>
        <Typography className={classes.card2}  component="h2"  variant="h4" >
                Register New user
            </Typography>

            {!created ?<div className={classes.card}>
            <Grid container spacing={1} >
                <Grid item xs={12} md={12} lg={12} key={1}>
                <div>
                    <Card elevation={1} className={classes.cardbody}
                    >
                        <CardHeader
                            title="New User Info"
                            className={classes.cardHeader}
                            action={
                                <div className={classes.btn}>
                                <Button
                                    
                                    color="secondary" 
                                    variant="contained"
                                    onClick={handleSubmit}
                                    endIcon={<PersonAddIcon />}>
                                    Register User
                                </Button>
                                </div>
                            }
                        />
                        <CardContent>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={5} lg={3} key={1}>
                                <InputLabel className={classes.label}>First name:</InputLabel>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4} key={2}>
                                <TextField
                                    key={11}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className={classes.field}
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    required
                                    error={firstNameError}
                                    placeholder="first name"
                                />
                            </Grid>
                            <Grid item xs={12} md={1} lg={5} key={3}>
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={5} lg={3} key={4}>
                                <InputLabel className={classes.label}>Last name:</InputLabel>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4} key={5}>
                                <TextField
                                    key={111}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className={classes.field}
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    required
                                    error={lastNameError}
                                    placeholder="last name"
                                />
                            </Grid>
                            <Grid item xs={12} md={1} lg={5} key={6}>
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={5} lg={3} key={7}>
                                <InputLabel  className={classes.label}>Email:</InputLabel>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4} key={8}>
                                <TextField
                                    key={112}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={classes.field}
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    required
                                    error={emailError}
                                    placeholder="Email"
                                />
                            </Grid>
                            <Grid item xs={12} md={1} lg={5} key={9}>
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={5} lg={3} key={7}>
                                <InputLabel  className={classes.label}>Password:</InputLabel>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4} key={8}>
                                <TextField
                                    key={112}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={classes.field}
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    required
                                    error={passwordError}
                                    placeholder="Password"
                                />
                            </Grid>
                            <Grid item xs={12} md={1} lg={5} key={9}>
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={5} lg={3} key={10}>
                                <InputLabel>User type:</InputLabel>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4} key={1}>
                            <FormControl className={classes.formControl}>
                                    <NativeSelect
                                    value={userTypeName}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: 'type',
                                        id: 'age-native-label-placeholder',
                                    }}
                                    >
                                    <option >{userTypeName}</option>
                                    <option key={333} value={2}>Instructor</option>
                                    <option key={444} value={3}>Student</option>
                                    </NativeSelect>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={1} lg={5} key={12}>
                            </Grid>
                        </Grid>
                        
                        <div className={classes.btnxs}>
                                <Button
                                    color="secondary" 
                                    variant="contained"
                                    onClick={handleSubmit}
                                    endIcon={<PersonAddIcon />}>
                                    Register User
                                </Button>
                        </div>

                        </CardContent>
                    </Card>
                </div>
                </Grid>
            </Grid>
            </div>
            :
            <Typography className={classes.created} component="h2"  variant="h5" >
                User Has been Registerd!
            </Typography>    
        }
     
        </div>
    </Layout>

    )
}
