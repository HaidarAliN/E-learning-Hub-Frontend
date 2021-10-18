import { Button, Card, CardContent, CardHeader, createTheme, FormControl, Grid, InputLabel, makeStyles, responsiveFontSizes, TextField, Typography } from '@material-ui/core'
import React, {useState,useEffect} from 'react'
import SendIcon from '@material-ui/icons/Send';
import BackupOutlinedIcon from '@material-ui/icons/BackupOutlined';
import LayoutCourse from '../../components/layouts/LayoutCourse'
import Materials from '../../components/InstructorComponents/Materials';
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
    const [access_token, setAccess_token] = useState(JSON.parse( localStorage.getItem('access_token') ));
    const [courseId, setCourseID] = useState(JSON.parse(localStorage.getItem('course_id')));
    const [chapterEditName, setChapterEditName] = useState(null);
    const [chapterEditDescription, setChapterEditDescription] = useState('');
    const [editChapterId, setEditChapterId] = useState(null);
    
    const classes = useStyles();
    let theme = createTheme();
    theme = responsiveFontSizes(theme);

    const getData = async() => {
        const response = await axios.get(`${BASE_API_URL}/api/instructor/course/get-uploaded-material/${courseId}`,
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

    const handleSubmit = async() =>{
        setNameError(false);
        setChapterDescriptionError(false);
        if(!chapterName){
            setNameError(true);
        }
        if(!chapterDescription){
            setChapterDescriptionError(true);
        }
        if(chapterName && chapterDescription && pdfData ){
            // setSubmited(true);
            addchapt();
            // setSubmited(false);
            setChapterDescription('');
            setChapterName('');
            setPdfData(null);
        }
    }

    const addchapt = async () =>{
        const response = await axios.post(`${BASE_API_URL}/api/instructor/course/upload-new-material/${courseId}`,
        {
            "name" : chapterName,
            "description" : chapterDescription,
            "base64file" : pdfData
        },
        {headers:{
          'Authorization' : `Bearer ${access_token}`
        }}
      );
      const data_fetched = response.data;
      if(data_fetched){
          getData();
        }
    }

    const handleUpdate = async() =>{
        const response = await axios.post(`${BASE_API_URL}/api/instructor/course/edit-material/${courseId}`,
        {
            "id" : editChapterId,
            "name" : chapterEditName,
            "description" : chapterEditDescription
        },
        {headers:{
          'Authorization' : `Bearer ${access_token}`
        }}
      );
      const data_fetched = response.data;
      if(data_fetched){
          setChapterEditName('');
          setChapterEditDescription('');
          getData();
        }
    }

    const [data, setData] = useState(null);
    const [submited, setSubmited] = useState(false);
    const [pdfData, setPdfData] = useState(null);
    useEffect(async () => {
            getData();
            // if(chapterDescription && chapterName && pdfData && submited){
            //     addchapt();
            //     setSubmited(false);
            //     setChapterDescription('');
            //     setChapterName('');
            //     setPdfData(null);
            // }
        }, []);

        const handleRemove = async(id) => {
            const response = await axios.post(`${BASE_API_URL}/api/instructor/course/remove-material/${courseId}`,
            {
                "id" : id,
            },
            {headers:{
            'Authorization' : `Bearer ${access_token}`
            }}
            );
            const data_fetched = response.data;
            if(data_fetched){
                console.log(data_fetched);
                getData();
            }
        }

        const handleEdit = async(id) => {
            const response = await axios.get(`${BASE_API_URL}/api/instructor/course/get-material-by-id/${id}`,
            {headers:{
            'Authorization' : `Bearer ${access_token}`
            }}
            );
            const data_fetched = response.data;
            setChapterEditName(await data_fetched.name);
            setChapterEditDescription(await data_fetched.description);
            setEditChapterId(id);
        }
        const [qwe,setState] = useState('');

        // const  getBase64 = (file) => {
        //     return new Promise(resolve => {
        //       let fileInfo;
        //       let baseURL = "";
        //       // Make new FileReader
        //       let reader = new FileReader();
        
        //       // Convert the file to base64 text
        //       reader.readAsDataURL(file);
        
        //       // on reader load somthing...
        //       reader.onload = () => {
        //         // Make a fileInfo Object
        //         console.log("Called", reader);
        //         baseURL = reader.result;
        //         console.log(baseURL);
        //         resolve(baseURL);
        //       };
        //       console.log(fileInfo);
        //     });
        //   };

        // const  onFileChange = (event) => {
    
        //     // Update the state
        //     setState({ selectedFile: event.target.files[0] });
        //     file = event.target.files[0];
        //     getBase64(file).then(result => {
        //         file["base64"] = result;
        //         console.log("File Is", file);
        //         this.setState({
        //             base64URL: result,
        //             file
        //          });
        //      })
        //   };


        const uploadFile = async (e) => {
          const file = e.target.files[0];
          const base64 = await convertBase64(file); //encrypt the file
          const base = base64.split(',');//split the encypted data
          setPdfData(base[1]);//
        };
      
        const convertBase64 = (file) => {
          return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
      
            fileReader.onload = () => {
              resolve(fileReader.result);
            };
      
            fileReader.onerror = (error) => {
              reject(error);
            };
          });
        };

    return (
    <LayoutCourse title="qwe">

        <div>
                <Typography className={classes.card2}  component="h2"  variant="h4" >
                Upload Materials
            </Typography>
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
                                key={554}
                                    onChange={(e) => setChapterName(e.target.value)}
                                    className={classes.field}
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    required
                                    value={chapterName}
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
                                    key={555}
                                    onChange={(e) => setChapterDescription(e.target.value)}
                                    className={classes.field}
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    value={chapterDescription}
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
                                        onChange={uploadFile}
                                        hidden
                                        accept="application/pdf"
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

            { chapterEditName && <div className={classes.card}>
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
                            onClick={handleUpdate}
                            endIcon={<SendIcon />}>
                            Update
                        </Button>
                        </div>
                            }
                        />
                        <CardContent>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={5} lg={6} key={1}>
                                <TextField
                                        onChange={(e) => setChapterEditName(e.target.value)}
                                        className={classes.field}
                                        variant="outlined"
                                        color="primary"
                                        fullWidth
                                        required
                                        value={chapterEditName}
                                        placeholder="Name"
                                    />
                            </Grid>
                            <Grid item xs={12} md={6} lg={6} key={2}>
                                <TextField
                                    onChange={(e) => setChapterEditDescription(e.target.value)}
                                    className={classes.field}
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    required
                                    value={chapterEditDescription}
                                    placeholder="Description"
                                />
                            </Grid>
                           
                           
                        </Grid>
                        </CardContent>
                    </Card>
                </div>
                </Grid>
            </Grid>

            </div>}


        </div>
        </LayoutCourse>
    )
}

