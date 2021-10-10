import { Box, Button, Card, CardContent, CardHeader, createTheme, FormControl, Grid, IconButton, InputLabel, makeStyles, NativeSelect, responsiveFontSizes, TextField, Typography } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import React, {useState} from 'react'
import SendIcon from '@material-ui/icons/Send';
import BackupOutlinedIcon from '@material-ui/icons/BackupOutlined';
import { DataGrid } from '@material-ui/data-grid';
import EditIcon from '@material-ui/icons/Edit';

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
    },
    label:{
        alignItems:"center",
        marginTop:"5%"
    }
  
}));

const columns = [
    {
      field: 'Name',
      headerName: 'Name',
      width: 150,
      editable: true,
    },
    {
      field: 'Description',
      headerName: 'Description',
      width: 150,
      editable: true,
    },
    {
      field: 'Content',
      headerName: 'Content',
      width: 110,
      editable: true,
    },
    {
      field: 'Edit',
      headerName: 'Edit',
      width: 150,
      editable: true,
    },
    {
      field: 'Remove',
      headerName: 'Remove',
      width: 150,
      editable: true,
    },
  ];
  
  const editIcon = (
    <IconButton >
      <EditIcon color="primary" />
    </IconButton>
  );

  const rows = [
    { id: 1, Name: 'Snow', Description: 'Jon', Content: 35, Edit: {editIcon} },
    { id: 2, Name: 'Lannister', Description: 'Cersei', Content: 42 },
    { id: 3, Name: 'Lannister', Description: 'Jaime', Content: 45 },
    { id: 4, Name: 'Stark', Description: 'Arya', Content: 16 },
    { id: 5, Name: 'Targaryen', Description: 'Daenerys', Content: null },
    { id: 6, Name: 'Melisandre', Description: null, Content: 150 },
    { id: 7, Name: 'Clifford', Description: 'Ferrara', Content: 44 },
    { id: 8, Name: 'Frances', Description: 'Rossini', Content: 36 },
    { id: 9, Name: 'Roxie', Description: 'Harvey', Content: 65 },
  ];
  

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

    return (
        <div>
            <ThemeProvider theme={theme}>
            <Typography  component="h3"  variant="h4" >
                <Box color="text.primary">
                Welcom Haidar Ali
                </Box>
            </Typography>
             <Typography  component="h6" variant="body1" >
                <Box color="text.secondary">
                Upload Materials:
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
                            title="Add Chapter info:"
                            className={classes.cardHeader}
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

                        <div className={classes.btn}>
                        <Button
                            color="secondary" 
                            variant="contained"
                            onClick={handleSubmit}
                            endIcon={<SendIcon />}>
                            Add Chapter
                        </Button>
                        </div>
                        
                        </CardContent>
                    </Card>
                </div>
                </Grid>
            </Grid>
            </div>

            {rows && <div className={classes.card}>
                <Grid container spacing={1} >
                    <Grid item xs={12} md={12} lg={12} key={1}>
                    <div style={{ height: 400, width: '100%', backgroundColor:'#f8f9fc' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pContentSize={5}
                            checkboxSelection
                            disableSelectionOnClick
                        />
                    </div>
                    </Grid>
                </Grid>
            </div>}


        </div>
    )
}

