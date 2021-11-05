import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import React, { useState, useEffect } from "react";
import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import LayoutCourse from "../../components/layouts/studentSideLayout/LayoutCourse";
import BASE_API_URL from "../../services/BaseUrl";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: "2%",
  },
  cardbody: {
    color: "#5a5c69",
    borderWidth: "1px",
    borderLeft: ".25rem solid !important",
    borderColor: "#bac8f2 !important",
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
  cardHeader: {
    marginBottom: 0,
    backgroundColor: "#e3e6f0",
    borderBottom: "1px solid #e3e6f0",
    color: "#757575",
  },
}));

export default function CourseDashboard() {
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

  const getData = async () => {
    const response = await axios.get(
      `${BASE_API_URL}/api/student/course/dashboard/${courseId}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const data_fetched = response.data;
    if (data_fetched.status) {
      setData(null);
    } else {
      setData(data_fetched);
    }
  };

  const [graphData, setGraphData] = useState(null);
  const getgraph = async () => {
    const response = await axios.get(
      `${BASE_API_URL}/api/student/course/get-students-scoregraph/${courseId}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const data_fetched = response.data;
    if (data_fetched.status) {
      setGraphData(null);
    } else {
      setGraphData(data_fetched);
    }
  };

  useEffect(() => {
    getData();
    getgraph();
  }, []);

  return (
    <LayoutCourse title="qwe">
      <div>
        <Typography className={classes.card2} component="h2" variant="h4">
          Course Dashboard
        </Typography>

        <div className={classes.card}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} lg={4} key={1}>
              <div>
                <Card elevation={1} className={classes.cardbody}>
                  <CardHeader
                    title="LECTURES UPLOADED"
                    className={classes.cardHeader}
                    action={
                      <IconButton>
                        <MenuBookIcon style={{ color: "#4e73df" }} />
                      </IconButton>
                    }
                  />
                  <CardContent>
                    {data && (
                      <Typography variant="h3" color="textSecondary">
                        {data.lectures_count}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </div>
            </Grid>
            <Grid item xs={12} md={6} lg={4} key={2}>
              <div>
                <Card elevation={1} className={classes.cardbody}>
                  <CardHeader
                    title="QUIZZES"
                    className={classes.cardHeader}
                    action={
                      <IconButton>
                        <SupervisorAccountIcon style={{ color: "#4e73df" }} />
                      </IconButton>
                    }
                  />
                  <CardContent>
                    {data && (
                      <Typography variant="h3" color="textSecondary">
                        {data.quiz_count}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </div>
            </Grid>
            <Grid item xs={12} md={6} lg={4} key={3}>
              <div>
                <Card elevation={1} className={classes.cardbody}>
                  <CardHeader
                    title="COURSE PROGRESS"
                    className={classes.cardHeader}
                    action={
                      <IconButton>
                        <DoneAllIcon style={{ color: "#4e73df" }} />
                      </IconButton>
                    }
                  />
                  <CardContent>
                    {data && (
                      <Typography variant="h3" color="textSecondary">
                        {data.progress}%
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
      <div style={{ marginTop: "5%" }}></div>
      {graphData && (
        <div className={classes.card}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={12} lg={12} key={2}>
              <div>
                <Card elevation={1} className={classes.cardbody}>
                  <CardHeader
                    title="TOP SCORES"
                    className={classes.cardHeader}
                    action={
                      <IconButton>
                        <EqualizerIcon style={{ color: "#4e73df" }} />
                      </IconButton>
                    }
                  />
                </Card>
              </div>
            </Grid>
          </Grid>
        </div>
      )}
      <div style={{ marginTop: "2%" }}></div>
      {graphData && (
        <ResponsiveContainer width="100%" height="50%">
          <BarChart
            width={50}
            height={50}
            data={graphData}
            margin={{
              top: 5,
              left: -45,
              bottom: 5,
            }}
            barSize={30}
          >
            <XAxis dataKey="name" padding={{ left: 10, right: 10 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="1 1" />
            <Bar
              dataKey="Top_Scores"
              fill="#4e73df"
              background={{ fill: "#e3e6f0" }}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </LayoutCourse>
  );
}
