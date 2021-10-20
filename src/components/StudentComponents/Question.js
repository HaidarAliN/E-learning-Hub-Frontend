import { Box, Button, Card, CardContent, CardHeader, createTheme, Divider, FormControl, Grid, IconButton, InputLabel, makeStyles, NativeSelect, responsiveFontSizes, TextField, Typography } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import React, {useState,useEffect} from 'react'
import SendIcon from '@material-ui/icons/Send';
import BackupOutlinedIcon from '@material-ui/icons/BackupOutlined';
import EditIcon from '@material-ui/icons/Edit';
import LayoutCourse from '../../components/layouts/instructorSideLayout/LayoutCourse'
import Questions from '../../components/InstructorComponents/Questions';
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

export default function Question({data, handleSubmit}) {
    const classes = useStyles();
    const [answerText, setAnswerText] = useState('Choose one')
    const [torf, setTorf] = useState({
        type: 'Choose one'
      });
      const [mcq, setMcq] = useState({
        type: 'Choose one'
      });

      const handleMCQChange = (e) => {
        const name = e.target.name;
        if(e.target.value == 1){
            setAnswerText(data.first_answer);
        }
        if(e.target.value == 2){
            setAnswerText(data.second_answer);
        }
        if(e.target.value == 3){
            setAnswerText(data.third_answer);
        }
        setMcq({
            ...mcq,
            [name] : e.target.value
        })
    };

    const handletofChange = (e) => {
        const name = e.target.name;
        if(e.target.value == 0){
            setAnswerText("False");
        }
        if(e.target.value == 1){
            setAnswerText("True");
        }
        setTorf({
            ...torf,
            [name] : e.target.value
        })
    }

    const handleSubmitAnswer = () => {
        if(torf.type != 'Choose one'){
            handleSubmit(torf.type);
            setTorf({
                type: 'Choose one'
            });
        }
        if(mcq.type != 'Choose one'){
            handleSubmit(mcq.type);
            setMcq({
                type: 'Choose one'
            });
        }
        setAnswerText('');
        
    }

    return (
        <div>
              {data && <div className={classes.card}>
            <Grid container spacing={1} >
                <Grid item xs={12} md={12} lg={12} key={31}>
                <div>
                    <Card elevation={1} className={classes.cardbody}
                    >
                        <CardHeader
                            title="Question"
                            className={classes.cardHeader}
                            action={
                        <div className={classes.btn}>
                        <Button
                            color="secondary" 
                            variant="contained"
                            onClick={handleSubmitAnswer}
                            endIcon={<SendIcon />}>
                            Submit Answer
                        </Button>
                        </div>
                            }
                        />
                        <CardContent>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={5} lg={4} key={32}>
                                <TextField
                                        key={66}
                                        value={data.content}
                                        InputProps={{
                                            readOnly: true,
                                          }}
                                        className={classes.field}
                                        variant="filled"
                                        color="primary"
                                        fullWidth
                                        required                                       
                                        placeholder="Quiz 1"
                                    />
                            </Grid>

                            {data.type == 1?
                                <div>
                                <Grid item xs={12} md={1} lg={4} key={33}>
                                <FormControl className={classes.formControl}>
                                        <NativeSelect
                                        key={67}
                                        value={answerText}
                                        onChange={handletofChange}
                                        label="qwe"
                                        inputProps={{
                                            name: 'type',
                                            id: 'age-native-label-placeholder',
                                        }}
                                        >
                                        <option >{answerText}</option>
                                        <option value={1}>True</option>
                                        <option value={0}>False</option>
                                        </NativeSelect>
                                    </FormControl>
                                </Grid>
                                </div>
                            :
                                <div>
                                <Grid item xs={12} md={5} lg={5} key={34}>
                                <FormControl className={classes.formControl}>
                                        <NativeSelect
                                        key={67}
                                        onChange={handleMCQChange}
                                        label="qwe"
                                        value={answerText}
                                        inputProps={{
                                            name: 'type',
                                            id: 'age-native-label-placeholder',
                                        }}
                                        >
                                        <option >{answerText}</option>
                                        <option value={1}>{data.first_answer}</option>
                                        <option value={2}>{data.second_answer}</option>
                                        <option value={3}>{data.third_answer}</option>
                                        </NativeSelect>
                                    </FormControl>
                                </Grid>
                                </div>        

                                        }             

                            <Grid item xs={12} md={3} lg={3} key={4}>
                            </Grid>
                        </Grid>
                        </CardContent>
                    </Card>
                </div>
                </Grid>
            </Grid>
            </div>}
        </div>
    )
}