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
import React, { useState, useEffect, useRef } from "react";
import SendIcon from "@material-ui/icons/Send";
import LayoutCourse from "../../components/layouts/studentSideLayout/LayoutCourse";
import BASE_API_URL from "../../services/BaseUrl";
import axios from "axios";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";

const useStyles = makeStyles((theme) => ({
  btn: {
    marginTop: "5%",
    [theme.breakpoints.down("sm")]: {
      marginTop: "2%",
    },
  },
  card: {
    marginTop: "2%",
    marginBottom: "3%",
  },
  cardbody: {
    borderWidth: "1px",
    borderLeft: ".25rem solid !important",
    borderColor: "#bac8f2 !important",
  },
  card2: {
    marginBottom: "2%",
    color: "#5a5c69",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "10%",
    },
  },
  formcontrollediv: {
    marginTop: "2%",
    alignItems: "center",
    marginLeft: "2%",
  },
  formControl: {
    marginLeft: "5%",
    margin: theme.spacing(1),
    minWidth: 120,
  },
  cardHeader: {
    marginBottom: 0,
    backgroundColor: "#e3e6f0",
    borderBottom: "1px solid #e3e6f0",
    color: "#757575",
  },
  emptyState: {
    color: "#5a5c69",
    [theme.breakpoints.up("md")]: {
      marginTop: `calc(${window.innerHeight / 3 - 0.1 * window.innerHeight}px)`,
      textAlign: "center",
      marginLeft: `calc(${window.innerWidth / 3 - 0.5 * window.innerWidth}px)`,
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "1%",
      marginTop: `calc(${window.innerHeight / 8}px)`,
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "5%",
      marginLeft: "6%",
      marginTop: `calc(${window.innerHeight / 3 - 0.2 * window.innerHeight}px)`,
    },
  },
  field: {
    marginTop: "2%",
    marginBottom: "2%",
  },
}));

export default function StudentSubmissions() {
  const classes = useStyles();
  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  const [access_token, setAccess_token] = useState(
    JSON.parse(localStorage.getItem("access_token"))
  );
  const [courseId, setCourseID] = useState(
    JSON.parse(localStorage.getItem("course_id"))
  );
  const [data, setData] = useState(null);
  const [quizloaded, setquizloaded] = useState(null);
  const [quizNameT, setQuizNameT] = useState("");
  const [quizId, setQuizId] = useState(0);
  const [submissions, setSubmissions] = useState(null);
  const [noSubmissions, setNoSubmissions] = useState(false);
  const [quizname, setQuizName] = useState({
    type: "Choose one",
  });
  const getData = async () => {
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

  const getSubmissions = async () => {
    //to be done
    const response = await axios.post(
      `${BASE_API_URL}/api/student/course/get-student-submission/${courseId}`,
      {
        quiz_id: quizId,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const data_fetched = response.data;
    if (data_fetched.status) {
      setSubmissions(null);
      setNoSubmissions(true);
    } else {
      setNoSubmissions(false);
      setSubmissions(data_fetched);
      console.log(data_fetched);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleConfirm = async () => {
    if (quizname.type != "Choose one") {
      setquizloaded(quizname.type);
      console.log(quizname.type);
      getSubmissions();
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

  return (
    <LayoutCourse title="qwe">
      {data ? (
        <div>
          <Typography className={classes.card2} component="h2" variant="h4">
            Quiz Grades
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
                              <Grid item xs={12} md={6} lg={6} key={5}>
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
                          style={{
                            backgroundColor: "#bac8f2",
                          }}
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

          {submissions && (
            <div className={classes.card}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6} lg={6} key={1}>
                  <div>
                    <Card elevation={1} className={classes.cardbody}>
                      <CardHeader
                        title="Grade"
                        className={classes.cardHeader}
                        action={
                          <IconButton disabled="true">
                            <CheckBoxOutlinedIcon
                              style={{ color: "#4e73df" }}
                            />
                          </IconButton>
                        }
                      />
                      <CardContent>
                        <div>
                          <Grid container spacing={3}>
                            <Grid item xs={4} md={4} lg={4} key={5}>
                              <Typography
                                className={classes.card2}
                                component="h2"
                                variant="h5"
                              >
                                Status:
                              </Typography>
                            </Grid>
                            <Grid item xs={4} md={34} lg={4} key={5}>
                              <Typography
                                className={classes.card2}
                                component="h2"
                                variant="h6"
                              >
                                {submissions.quiz_status}
                              </Typography>
                            </Grid>
                            <Grid item xs={4} md={43} lg={4} key={5}></Grid>

                            <Grid item xs={4} md={4} lg={4} key={5}>
                              <Typography
                                className={classes.card2}
                                component="h2"
                                variant="h5"
                              >
                                Grade:
                              </Typography>
                            </Grid>
                            <Grid item xs={4} md={34} lg={4} key={5}>
                              <Typography
                                className={classes.card2}
                                component="h2"
                                variant="h6"
                              >
                                {submissions.score}
                              </Typography>
                            </Grid>
                            <Grid item xs={4} md={43} lg={4} key={5}></Grid>
                          </Grid>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </Grid>
              </Grid>
            </div>
          )}
          {noSubmissions && (
            <Typography
              className={classes.emptyState}
              component="h2"
              variant="h4"
            >
              The quiz is not submitted yet
            </Typography>
          )}
        </div>
      ) : (
        <Typography className={classes.emptyState} component="h2" variant="h4">
          No Quizzes for this course <ErrorOutlineIcon />
        </Typography>
      )}
    </LayoutCourse>
  );
}
