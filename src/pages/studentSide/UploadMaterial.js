import { createTheme, Grid, makeStyles, responsiveFontSizes, Typography } from '@material-ui/core'
import React, {useState,useEffect} from 'react'
import LayoutCourse from '../../components/layouts/studentSideLayout/LayoutCourse'
import Materials from '../../components/StudentComponents/Materials';
import BASE_API_URL from '../../services/BaseUrl'
import axios from "axios";


const useStyles = makeStyles((theme) => ({
    card:{
        marginTop: "2%",
        marginBottom: "3%",
    }
}));


export default function UploadMaterial() {
    const [access_token, setAccess_token] = useState(JSON.parse( localStorage.getItem('access_token') ));
    const [courseId, setCourseID] = useState(JSON.parse(localStorage.getItem('course_id')));
    const [data, setData] = useState(null);
    const classes = useStyles();
    let theme = createTheme();
    theme = responsiveFontSizes(theme);

    const getData = async() => {
        const response = await axios.get(`${BASE_API_URL}/api/student/course/get-uploaded-materials/${courseId}`,
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
                            {data ?
                                 <Materials data={data} handlePreview={handlePreview}/>
                            :
                                <Typography>No uploaded materials</Typography>
                            }
                        </div>
                    </Grid>
                </Grid>
            </div>

        </div>
        </LayoutCourse>
    )
}

