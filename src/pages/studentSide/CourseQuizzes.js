import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  createTheme,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  makeStyles,
  NativeSelect,
  responsiveFontSizes,
  TextField,
  Typography,
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import React, { useState, useEffect, useRef } from "react";
import SendIcon from "@material-ui/icons/Send";
import BackupOutlinedIcon from "@material-ui/icons/BackupOutlined";
import EditIcon from "@material-ui/icons/Edit";
import LayoutCourse from "../../components/layouts/studentSideLayout/LayoutCourse";
import Question from "../../components/StudentComponents/Question";
import BASE_API_URL from "../../services/BaseUrl";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: "2%",
    marginBottom: "3%",
  },
  cardbody: {
    borderWidth: "1px",
    borderLeft: ".25rem solid !important",
    borderColor: "#bac8f2 !important",
  },
  cardHeader: {
    marginBottom: 0,
    backgroundColor: "#f8f9fc",
    borderBottom: "1px solid #e3e6f0",
    color: "#757575",
  },
  field: {
    marginTop: "2%",
    marginBottom: "2%",
  },
  formControl: {
    marginLeft: "5%",
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  btn: {
    marginTop: "5%",
    [theme.breakpoints.down("sm")]: {
      marginTop: "2%",
    },
  },
  label: {
    alignItems: "center",
    marginTop: "5%",
  },
  or: {
    marginTop: "20%",
    alignItems: "center",
    marginLeft: "25%",
  },
  divider: {
    marginBottom: "2%",
    marginTop: "2%",
    color: "#ff4",
    maxWidth: 360,
    width: "100%",
  },
  page: {
    background: "#f9f9f9",
    width: "100%",
  },
  card2: {
    color: "#5a5c69",
    [theme.breakpoints.down("md")]: {
      marginBottom: "10%",
    },
  },
  emptyState: {
    color: "#5a5c69",
    [theme.breakpoints.up("md")]: {
      marginTop: `calc(${
        window.innerHeight / 3 - 0.07 * window.innerHeight
      }px)`,
      textAlign: "center",
      marginLeft: `calc(${window.innerWidth / 3 - 0.36 * window.innerWidth}px)`,
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "1%",
      marginTop: `calc(${window.innerHeight / 8}px)`,
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "5%",
      marginLeft: "14%",
      marginTop: `calc(${window.innerHeight / 3 - 0.1 * window.innerHeight}px)`,
    },
  },
  quizdone: {
    color: "#5a5c69",
    [theme.breakpoints.up("md")]: {
      marginTop: `calc(${window.innerHeight / 3 - 0.1 * window.innerHeight}px)`,
      textAlign: "center",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: `calc(${window.innerHeight / 8 + 0.2 * window.innerHeight}px)`,
      textAlign: "center",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "5%",
      alignItems: "center",
      textAlign: "center",
      marginTop: `calc(${window.innerHeight / 3 - 0.2 * window.innerHeight}px)`,
    },
  },
}));

export default function ManageQuizzes() {
  const [access_token, setAccess_token] = useState(
    JSON.parse(localStorage.getItem("access_token"))
  );
  const [courseId, setCourseID] = useState(
    JSON.parse(localStorage.getItem("course_id"))
  );
  const [data, setData] = useState(null);
  const [quizQuestion, setQuizQuestion] = useState(null);
  const [quizSubmition, setQuizSubmition] = useState(null);
  const [quizloaded, setquizloaded] = useState(null);
  const [quizId, setQuizId] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [quizname, setQuizName] = React.useState({
    type: "Choose one",
  });
  const classes = useStyles();
  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  const confirmHidRef = useRef();
  const getDAta = async () => {
    const response = await axios.get(
      `${BASE_API_URL}/api/student/course/get-quizzes/${courseId}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const data_fetched = response.data;
    if (data_fetched.length > 0) {
      setData(data_fetched);
    } else {
      setData(null);
    }
  };

  const getQuizquestion = async (id) => {
    const response = await axios.get(
      `${BASE_API_URL}/api/student/course/get-quiz-questions/${quizId}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const data_fetched = response.data;
    if (data_fetched.status) {
      setQuizDone(true);
      setQuizQuestion("");
    } else {
      setQuizQuestion(data_fetched);
      setQuizDone(false);
    }
  };

  useEffect(async () => {
    getDAta();
  }, []);

  const handleConfirm = async () => {
    if (quizname.type != "Choose one") {
      const response = await axios.get(
        `${BASE_API_URL}/api/student/course/start-quiz/${quizId}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      const data_fetched = await response.data;
      if (data_fetched) {
        setQuizSubmition(data_fetched.id);
        setquizloaded(quizname.type);
        getQuizquestion();
      }
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    data.forEach((element) => {
      if (element.id == e.target.value) {
        setQuizName({
          ...quizname,
          [name]: element.name,
        });
      }
    });
    setQuizId(e.target.value);
  };

  const handleSubmit = async (answer) => {
    const response = await axios.post(
      `${BASE_API_URL}/api/student/course/answer-quiz-questions/${quizId}`,
      {
        question_id: quizQuestion.id,
        answer: answer,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const data_fetched = await response.data;
    if (data_fetched) {
      getQuizquestion();
    }
  };

  return (
    <LayoutCourse title="qwe">
      {data ? (
        <div className={classes.page}>
          <Typography className={classes.card2} component="h2" variant="h4">
            Course Quizzes
          </Typography>
          <div className={classes.card}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={12} lg={12} key={1}>
                <div>
                  <Card elevation={1} className={classes.cardbody}>
                    <CardHeader
                      title="Quiz Name"
                      className={classes.cardHeader}
                    />
                    <CardContent>
                      <div>
                        <Grid container spacing={3}>
                          {data && (
                            <div>
                              <Grid item xs={12} md={12} lg={4} key={5}>
                                <FormControl className={classes.formControl}>
                                  <NativeSelect
                                    style={{ marginLeft: "10%" }}
                                    value={quizname.type}
                                    onChange={handleChange}
                                    inputProps={{
                                      name: "type",
                                      id: "age-native-label-placeholder",
                                    }}
                                  >
                                    <option key={33} value={0}>
                                      {quizname.type}
                                    </option>
                                    {data.map((item) => (
                                      <option key={item.id} value={item.id}>
                                        {item.name}
                                      </option>
                                    ))}
                                  </NativeSelect>
                                </FormControl>
                              </Grid>
                            </div>
                          )}
                          <Grid item xs={12} md={5} lg={5} key={6}></Grid>
                        </Grid>
                      </div>
                      <div className={classes.btn}>
                        <Button
                          ref={confirmHidRef}
                          style={{ backgroundColor: "#bac8f2" }}
                          color="secondary"
                          variant="contained"
                          onClick={handleConfirm}
                          endIcon={<SendIcon />}
                        >
                          Confirm
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
            </Grid>
          </div>

          {/* question section */}

          {quizQuestion && (
            <Question data={quizQuestion} handleSubmit={handleSubmit} />
          )}

          {/* quiz done */}
          {quizDone && (
            <Typography
              className={classes.quizdone}
              component="h2"
              variant="h4"
            >
              Wohoo No More Questions!!!
            </Typography>
          )}
        </div>
      ) : (
        <Typography className={classes.emptyState} component="h2" variant="h4">
          No quizzes for this course.
        </Typography>
      )}
    </LayoutCourse>
  );
}
