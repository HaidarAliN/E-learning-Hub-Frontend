import { Box, Button, Card, CardContent, CardHeader, createTheme, Divider, FormControl, Grid, IconButton, InputLabel, makeStyles, NativeSelect, responsiveFontSizes, TextField, Typography } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import React, {useState,useEffect, useRef} from 'react'
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
        borderColor: "#2a96a5 !important"
    },
    cardHeader:{
        marginBottom: 0,
        backgroundColor:'#e3e6f0',
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
        marginTop:"3%",
        alignItems:"center",
        marginLeft:"2%",
        [theme.breakpoints.down('sm')]: {
            marginTop:"6%",
        
            },
    },
    formcontrollediv:{
        marginTop:"2%",
        alignItems:"center",
        marginLeft:"2%"

    },
    divider:{
        marginBottom:"2%",
        marginTop:"2%",
        color:"#ff4",
        maxWidth: 360,
        width: '100%',
    },
    card2:{
        color:'#5a5c69',
        [theme.breakpoints.down('sm')]: {
            marginBottom:  "10%"
        
            },
    }
  
}));

export default function ManageQuizzes() {
    const [access_token, setAccess_token] = useState(JSON.parse( localStorage.getItem('access_token') ));
    const [courseId, setCourseID] = useState(JSON.parse(localStorage.getItem('course_id')));
    const [quizNameT,setQuizNameT] = useState('');
    const [data, setData] = useState(null);
    const [quizQuestions, setQuizQuestions] = useState(null);
    const [quizNameError,setQuizNameError] = useState(false);
    const [newQuestion,setNewQuestion] = useState('');
    const [quizquestionError,setQuizquestionError] = useState(false);
    const [newQuestiontype,setNewQuestiontype] = useState(null);
    const [quizloaded,setquizloaded] = useState(null);
    const [quizloadedQuestions,setquizloadedQuestions] = useState(null);
    const [quizId, setQuizId] = useState(0);
    const [questionInfo, setQuestionInfo] = useState('');
    const [tofquestionInfo, setTofQuestionInfo] = useState('');
    const [firsteditanswer, setFirsteditanswer] = useState('');
    const [secondeditanswer, setSecondeditanswer] = useState('');
    const [thirdeditanswer, setThirdeditanswer] = useState('');
    const [editquestion, setEditquestion] = useState('');
    const [newFirstAnswer, setNewFirstAnswer] = useState('');
    const [newSecondAnswer, setNewSecondAnswer] = useState('');
    const [newThirdAnswe, setNewThirdAnswe] = useState('');
    const [quizname, setQuizName] = React.useState({
        type: 'Choose one'
      });
    const [mcqeditans, setMcqeditans] = React.useState({
    type: 'qwe'
    });
    const [tofeditans, setTofeditans] = React.useState({
        type: 'qwe'
        });
    const [newquestionTyped, setNewquestionTyped] = React.useState({
        type: ''
        });
    const [newRightAnswer, setNewRightAnswer] = React.useState({
        type: ''
        });

    const classes = useStyles();
    let theme = createTheme();
    theme = responsiveFontSizes(theme);
    const mcqEditRef = useRef();
    const torEditRef = useRef();
    const questionRef = useRef();
    const confirmRef = useRef();
    const confirmHidRef = useRef();
 

    const getDAta = async () =>{
        const response = await axios.get(`${BASE_API_URL}/api/instructor/course/get-quiz/${courseId}`,
          {headers:{
            'Authorization' : `Bearer ${access_token}`
          }}
        );
        const data_fetched = response.data;
        if(data_fetched.length>0){
            setData(data_fetched);
        }else{
            setData(null);
        }
    }

    const getQuizquiestion = async (id) =>{
        const response = await axios.post(`${BASE_API_URL}/api/instructor/course/get-quiz-questions/${courseId}`,
        {
            "quiz_id": id
        },
          {headers:{
            'Authorization' : `Bearer ${access_token}`
          }}
        );
        const data_fetched = response.data;
        if(data_fetched.length>0){
            setQuizQuestions(data_fetched);
        }else{
            setQuizQuestions(null);
        }
        if(data_fetched.status){
            setquizloadedQuestions(null);
        }else{
            if(data_fetched.length > 0){
                setquizloadedQuestions(data_fetched);
            }else{
                setquizloadedQuestions(null);
            }
        }
    }
    
    useEffect(async () => {
        getDAta();
    }, [quizloadedQuestions]);

    const handleConfirm = async() =>{
        if(quizNameT){
            setquizloaded(quizNameT);
            const response = await axios.post(`${BASE_API_URL}/api/instructor/course/create-quiz/${courseId}`,
            {
                "name": quizNameT
            },
            {headers:{
                'Authorization' : `Bearer ${access_token}`
            }}
            );
            const data_fetched = await response.data;
            if(data_fetched){
                setQuizId(data_fetched.id);
                confirmHidRef.current.style.display = "none";
            }
        }else if(quizname.type != 'Choose one'){
            confirmHidRef.current.style.display = "none";
            setquizloaded(quizname.type);
            getQuizquiestion(quizId);
        }
    }

    const handleRemove = async(id) => {
        const response = await axios.post(`${BASE_API_URL}/api/instructor/course/remove-question/${courseId}`,
        {
            "quiz_id": quizId,
            "question_id": id
        },
          {headers:{
            'Authorization' : `Bearer ${access_token}`
          }}
        );
        const data_fetched = await response.data;
        if(data_fetched){
            getQuizquiestion(quizId);
        }
        
    }

    const handleEdit = async(id) => {
        const response = await axios.post(`${BASE_API_URL}/api/instructor/course/get-quiz-question-by-id/${courseId}`,
        {
            "quiz_id": quizId,
            "question_id": id
        },
          {headers:{
            'Authorization' : `Bearer ${access_token}`
          }}
        );
        const data_fetched = await response.data;
        if(data_fetched.type == 0){
            setQuestionInfo(data_fetched);
            setMcqeditans({
                ...mcqeditans,
                ['type']: data_fetched.right_answer,
            });
        mcqEditRef.current.scrollIntoView({ behavior: 'smooth' })
        }else{
            setTofQuestionInfo(data_fetched);
            setTofeditans({
                ...tofeditans,
                ['type']: data_fetched.right_answer,
            });
        torEditRef.current.scrollIntoView({ behavior: 'smooth' })
        }
        setFirsteditanswer(data_fetched.first_answer);
        setSecondeditanswer(data_fetched.second_answer);
        setThirdeditanswer(data_fetched.third_answer);
        setEditquestion(data_fetched.content);

    }

    

    const handleChange = (e) => {
        const name = e.target.name;
        data.forEach(element => {
            if(element.id == e.target.value){
                setQuizName({
                    ...quizname,
                    [name]: element.name,
                });
            }
        });
        setQuizId(e.target.value);
    };

    const handleChangemcqedit = (e) => {
        const name = e.target.name;
        setMcqeditans({
            ...mcqeditans,
            [name]: e.target.value,
        });
    };

    const handleChangetofedit = (e) => {
        const name = e.target.name;
        setTofeditans({
            ...tofeditans,
            [name]: e.target.value,
        });
    };

    const handleChangeNewQuestionType  = (e) => {
        setNewRightAnswer({type:''});
        const name = e.target.name;
        setNewquestionTyped({
            ...newquestionTyped,
            [name]: e.target.value,
        });
        if(newQuestion){
            setNewQuestiontype(e.target.value);
        }
    };

    const handleChangeNewRightAnswer = (e) => {
        const name = e.target.name;
        setNewRightAnswer({
            ...newRightAnswer,
            [name]: e.target.value,
        });
    };

    const handleMCQEditUpdate = async(id) => {
        const response = await axios.post(`${BASE_API_URL}/api/instructor/course/edit-question/${courseId}`,
        {
            "quiz_id": quizId,
            "question_id": questionInfo.id,
            "content":editquestion,
            "first_answer":firsteditanswer,
            "second_answer":secondeditanswer,
            "third_answer":thirdeditanswer,
            "right_answer": mcqeditans.type
        },
          {headers:{
            'Authorization' : `Bearer ${access_token}`
          }}
        );
        const data_fetched = await response.data;
        if(data_fetched){
            setQuestionInfo('');
            getQuizquiestion(quizId);
        }
    }

    const handleTOFEditUpdate = async(id) => {
        const response = await axios.post(`${BASE_API_URL}/api/instructor/course/edit-question/${courseId}`,
        {
            "quiz_id": quizId,
            "question_id": tofquestionInfo.id,
            "content":editquestion,
            "first_answer":"True",
            "second_answer":"False",
            "third_answer":" ",
            "right_answer": tofeditans.type
        },
          {headers:{
            'Authorization' : `Bearer ${access_token}`
          }}
        );
        const data_fetched = await response.data;
        if(data_fetched){
            setTofQuestionInfo('');
            getQuizquiestion(quizId);
        }
    }

    const addquestion = async(first_ans, second_ans, third_ans) => {
        const response = await axios.post(`${BASE_API_URL}/api/instructor/course/add-question/${courseId}`,
        {
            "quiz_id": quizId,
            "content":newQuestion,
            "first_answer":first_ans,
            "second_answer":second_ans,
            "third_answer":third_ans,
            "right_answer": newRightAnswer.type,
            "type" : newquestionTyped.type
        },
          {headers:{
            'Authorization' : `Bearer ${access_token}`
          }}
        );
        const data_fetched = await response.data;
        if(data_fetched){
            getQuizquiestion(quizId);
        }
    }

    const handleAdd = async() => {
        setQuizquestionError(false);
        if(!newQuestion){
            setQuizquestionError(true);
        }else if(newquestionTyped.type){
            setNewQuestiontype(newquestionTyped.type);
        }
        if(newquestionTyped.type == 1 && newRightAnswer.type){
            addquestion("True", "False", "");
            handleClearAfterAdd();
            getQuizquiestion(quizId);
            questionRef.current.scrollIntoView({ behavior: 'smooth' })
        }
        if(newquestionTyped.type == 0 && newFirstAnswer && newSecondAnswer && newThirdAnswe && newRightAnswer.type){
            addquestion(newFirstAnswer, newSecondAnswer, newThirdAnswe);
            handleClearAfterAdd();
            getQuizquiestion(quizId);
            questionRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const handleClearAfterAdd = () => {
       setNewFirstAnswer('');
       setNewSecondAnswer('');
       setNewThirdAnswe('');
       setNewQuestion('');
       setNewRightAnswer({type:''});

    }

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
                            ref={confirmHidRef}
                            style={{color:"#fff", backgroundColor:'#2c9faf'}}
                            variant="contained"
                            onClick={handleConfirm}
                            endIcon={<SendIcon />}>
                            Confirm
                        </Button>
                        </div>
                        }
                        />
                        <CardContent>

                        {!quizloaded ?<div
                        
                        >
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={2} lg={2} key={2}>
                                <InputLabel className={classes.label}>Create Quiz:</InputLabel>
                            </Grid>
                            <Grid item xs={12} md={2} lg={2} key={3}>
                                <TextField
                                    onChange={(e) => setQuizNameT(e.target.value)}
                                    className={classes.field}
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    required
                                    placeholder="Quiz 123"
                                />
                            </Grid>
                            {data && <div
                            className={classes.or}
                            >
                            <Grid item xs={12} md={2} lg={2} key={4}>
                             <Typography   >
                                OR
                            </Typography>
                            </Grid></div>}
                            {data && <div
                            className={classes.formcontrollediv}
                            >
                            <Grid item xs={12} md={6} lg={6} key={5}>
                            <FormControl className={classes.formControl}>
                                    <NativeSelect
                                    value={quizname.type}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: 'type',
                                        id: 'age-native-label-placeholder',
                                    }}
                                    >
                                   <option key={33} value={0}>{quizname.type}</option>
              {data.map(item => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                    ))}
                                    </NativeSelect>
                                </FormControl>
                            </Grid>
                            </div>} 
                            
                        </Grid></div>
                        :
                        <div ref={confirmRef}>
                        <Typography  component="h2"  variant="h6" >
                            {quizloaded}
                        </Typography>
                        </div>
                        }
                        </CardContent>
                    </Card>
                </div>
                </Grid>
            </Grid>
            </div>

            {/* question section */}
            <div className={classes.card}>
            <Grid container spacing={1} >
                <Grid item xs={12} md={12} lg={12} key={70}>
                {quizloaded && <div
                
                >
                    <Card elevation={1} className={classes.cardbody}
                    >
                        <CardHeader
                            title="Add Question"
                            className={classes.cardHeader}
                        />
                        <CardContent>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={5} lg={3} key={71}>
                                <InputLabel className={classes.label}>Question Content:</InputLabel>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4} key={72}>
                                <TextField
                                    key={777}
                                    onChange={(e) => setNewQuestion(e.target.value)}
                                    className={classes.field}
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    value={newQuestion}
                                    required
                                    error={quizquestionError}
                                    placeholder="Quiz 124"
                                />
                            </Grid>
                            <Grid item xs={12} md={1} lg={5} key={73}>
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={5} lg={3} key={74}>
                                <InputLabel className={classes.label}>Question type:</InputLabel>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4} key={75}>
                            <FormControl className={classes.formControl}>
                                    <NativeSelect
                                    key={776}
                                    value={newquestionTyped.type}
                                    onChange={handleChangeNewQuestionType}
                                    label="qwe"
                                    inputProps={{
                                        name: 'type',
                                        id: 'age-native-label-placeholder',
                                    }}
                                    >
                                    <option value={-1}></option>
                                    <option value={0}>MCQ</option>
                                    <option value={1}>True or False</option>
                                    </NativeSelect>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={1} lg={5} key={76}>
                            </Grid>
                        </Grid>

                        <Divider  variant="middle" className={classes.divider} color="primary"/>
                        {/* MCQ section */}
                        {newQuestiontype == 0 ?
                        <div>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={5} lg={3} key={2}>
                                <InputLabel className={classes.label}>First Answer:</InputLabel>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4} key={3}>
                                <TextField
                                    key={654}
                                    onChange={(e) => setNewFirstAnswer(e.target.value)}
                                    className={classes.field}
                                    variant="outlined"
                                    color="primary"
                                    value={newFirstAnswer}
                                    fullWidth
                                    required
                                    placeholder="First Answer"
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
                                    key={765}
                                    onChange={(e) => setNewSecondAnswer(e.target.value)}
                                    className={classes.field}
                                    value={newSecondAnswer}
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    required
                                    placeholder="Second Answer"
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
                                    key={876}
                                    onChange={(e) => setNewThirdAnswe(e.target.value)}
                                    className={classes.field}
                                    variant="outlined"
                                    color="primary"
                                    value={newThirdAnswe}
                                    fullWidth
                                    required
                                    placeholder="Third Answe"
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
                                    key={987}
                                    value={newRightAnswer.type}
                                    onChange={handleChangeNewRightAnswer}
                                    label="qwe"
                                    inputProps={{
                                        name: 'type',
                                        id: 'age-native-label-placeholder',
                                    }}
                                    >
                                    <option >Choose Answer</option>
                                    <option value={1}>First Answer</option>
                                    <option value={2}>Second Answer</option>
                                    <option value={3}>Third Answer</option>
                                    </NativeSelect>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={1} lg={5} key={4}>
                            </Grid>
                        </Grid>
                        <div className={classes.btn}>
                        <Button
                            style={{color:"#fff",backgroundColor:'#2c9faf'}}
                            variant="contained"
                            onClick={handleAdd}
                            endIcon={<SendIcon />}>
                            Add Question
                        </Button>
                        </div>
                        </div>
                        :
                        newQuestiontype == 1?
                                <div>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={5} lg={3} key={2}>
                                            <InputLabel className={classes.label}>Right Answer:</InputLabel>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={4} key={3}>
                                        <FormControl className={classes.formControl}>
                                                <NativeSelect
                                                key={567}
                                                value={newRightAnswer.type}
                                                onChange={handleChangeNewRightAnswer}
                                                label="qwe"
                                                inputProps={{
                                                    name: 'type',
                                                    id: 'age-native-label-placeholder',
                                                }}
                                                >
                                                <option >Choose Answer</option>
                                                <option value={1}>True</option>
                                                <option value={0}>False</option>
                                                </NativeSelect>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={1} lg={5} key={4}>
                                        </Grid>
                                    </Grid>
                                    <div className={classes.btn}>
                                        <Button
                                            style={{color:"#fff",backgroundColor:'#2c9faf'}}
                                            variant="contained"
                                            onClick={handleAdd}
                                            endIcon={<SendIcon />}>
                                            Add Question
                                        </Button>
                                    </div>
                                            
                             </div>
                            :
                                                null
                        }

                       

                        </CardContent>

                    </Card>
                </div>}
                </Grid>
            </Grid>
            </div> 
            <div ref={questionRef}>
            {quizloadedQuestions &&<Questions  data={quizloadedQuestions} handleEdit={handleEdit} handleRemove={handleRemove}  />}
            </div>
            {/* edit MCQ section */}
            {questionInfo &&<div
            ref={mcqEditRef}
            className={classes.card}>
            <Grid container spacing={1} >
                <Grid item xs={12} md={12} lg={12} key={10}>
                <div id="edit">
                    <Card elevation={1} className={classes.cardbody}
                    >
                        <CardHeader
                            title="Edit question"
                            className={classes.cardHeader}
                           
                        />
                        <CardContent>

                        <Grid container spacing={3}>
                        <Grid item xs={12} md={12} lg={12} key={50}>
                                <TextField
                                    
                                    key={451}
                                    onChange={(e) => setEditquestion(e.target.value)}
                                    className={classes.field}
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    value={editquestion}
                                    required
                                    placeholder="Quiz 1"
                                />
                            </Grid>
                            <Grid item xs={12} md={4} lg={4} key={20}>
                                <TextField
                                        key={41}
                                        onChange={(e) => setFirsteditanswer(e.target.value)}
                                        className={classes.field}
                                        variant="outlined"
                                        color="primary"
                                        value={firsteditanswer}
                                        fullWidth
                                        required
                                        placeholder="Quiz 1"
                                    />
                            </Grid>
                            <Grid item xs={12} md={4} lg={4} key={30}>
                                <TextField
                                    key={42}
                                    onChange={(e) => setSecondeditanswer(e.target.value)}
                                    className={classes.field}
                                    variant="outlined"
                                    color="primary"
                                    value={secondeditanswer}

                                    fullWidth
                                    required
                                    placeholder="Quiz 1"
                                />
                            </Grid>
                            <Grid item xs={12} md={4} lg={4} key={40}>
                                <TextField
                                    key={43}
                                    onChange={(e) => setThirdeditanswer(e.target.value)}
                                    className={classes.field}
                                    variant="outlined"
                                    color="primary"
                                    value={thirdeditanswer}
                                    fullWidth
                                    required
                                    placeholder="Quiz 1"
                                />
                            </Grid>
                           
                            <Grid item xs={12} md={12} lg={12} key={60}>
                            <FormControl className={classes.formControl}>
                                    <NativeSelect
                                    key={44}
                                    value={mcqeditans.type}
                                    onChange={handleChangemcqedit}
                                    label="qwe"
                                    inputProps={{
                                        name: 'type',
                                        id: 'age-native-label-placeholder',
                                    }}
                                    >
                                        <option key={998} value={1}>First</option>
                                        <option key={997} value={2}>Second</option>
                                        <option key={996} value={3}>third</option>
                                    </NativeSelect>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12} key={60}>

                                    <div className={classes.btn}>
                                <Button
                                    style={{color:"#fff",backgroundColor:'#2c9faf'}}
                                    variant="contained"
                                    onClick={handleMCQEditUpdate}
                                    endIcon={<SendIcon />}>
                                    Update
                                </Button>
                                </div>
                        </Grid>
                        </Grid>
                        </CardContent>
                        
                    </Card>
                </div>
                </Grid>
            </Grid>
            </div>}

            {/* edit T or F section */}
            {tofquestionInfo && <div
            ref={torEditRef}
            className={classes.card}>
            <Grid container spacing={1} >
                <Grid item xs={12} md={12} lg={12} key={31}>
                <div>
                    <Card elevation={1} className={classes.cardbody}
                    >
                        <CardHeader
                            title="Edit question"
                            className={classes.cardHeader}
                          
                        />
                        <CardContent>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12} lg={12} key={32}>
                                <TextField
                                        key={66}
                                        onChange={(e) => setEditquestion(e.target.value)}
                                        className={classes.field}
                                        variant="outlined"
                                        color="primary"
                                        fullWidth
                                        value={editquestion}
                                        required                                       
                                        placeholder="Quiz 1"
                                    />
                            </Grid>
                            <Grid item xs={12} md={12} lg={12} key={33}>
                            <FormControl className={classes.formControl}>
                                    <NativeSelect
                                    key={67}
                                    value={tofeditans.type}
                                    onChange={handleChangetofedit}
                                    label="qwe"
                                    inputProps={{
                                        name: 'type',
                                        id: 'age-native-label-placeholder',
                                    }}
                                    >
                                    <option value={1}>True</option>
                                    <option value={0}>False</option>
                                    </NativeSelect>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12} key={4}>
                                <div className={classes.btn}>
                                    <Button
                                        style={{color:"#fff",backgroundColor:'#2c9faf'}}
                                        variant="contained"
                                        onClick={handleTOFEditUpdate}
                                        endIcon={<SendIcon />}>
                                        Update
                                    </Button>
                                </div>
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

