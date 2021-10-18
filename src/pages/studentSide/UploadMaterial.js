import { Button, Card, CardContent, CardHeader, createTheme, FormControl, Grid, InputLabel, makeStyles, responsiveFontSizes, TextField, Typography } from '@material-ui/core'
import React, {useState,useEffect} from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import SendIcon from '@material-ui/icons/Send';
import BackupOutlinedIcon from '@material-ui/icons/BackupOutlined';
import LayoutCourse from '../../components/layouts/studentSideLayout/LayoutCourse'
import Materials from '../../components/StudentComponents/Materials';
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
    const [access_token, setAccess_token] = useState(JSON.parse( localStorage.getItem('access_token') ));
    const [courseId, setCourseID] = useState(JSON.parse(localStorage.getItem('course_id')));
    const [data, setData] = useState(null);
    const classes = useStyles();
    const history = useHistory();
    let theme = createTheme();
    theme = responsiveFontSizes(theme);

    const getData = async() => {
        const response = await axios.get(`${BASE_API_URL}/api/student/course/get-uploaded-materials/${courseId}`,
          {headers:{
            'Authorization' : `Bearer ${access_token}`
          }}
        );
        const data_fetched = response.data;
        if(data_fetched.length == 0){
            setData(null);
        }else{
            setData(data_fetched);
        }
        
    }
  
    useEffect(async () => {
            getData();
        }, []);


    const handlePreview = async(path) => {
        window.open(`${BASE_API_URL}/UploadedMaterials/${path}`, "_blank")
    }

    return (
    <LayoutCourse title="qwe">

        <div>
                <Typography className={classes.card}  component="h2"  variant="h4" >
                Upload Materials
            </Typography>
            

            <div >
                <Grid container spacing={1} >
                    <Grid item xs={12} md={12} lg={12} key={1}>
                        <div>
                            {data && <Materials data={data} handlePreview={handlePreview}/>}
                        </div>
                    </Grid>
                </Grid>
            </div>


        </div>
        </LayoutCourse>
    )
}

