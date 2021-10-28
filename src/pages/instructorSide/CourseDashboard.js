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
import { ThemeProvider } from "@material-ui/styles";
import React, { useState, useEffect } from "react";
import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import LayoutCourse from "../../components/layouts/instructorSideLayout/LayoutCourse";
import BASE_API_URL from "../../services/BaseUrl";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: "2%",
  },
  cardbody: {
    borderWidth: "1px",
    borderLeft: ".25rem solid !important",
    borderColor: "#2a96a5 !important",
  },
  card2: {
    marginBottom: "2%",
    color: "#5a5c69",
    [theme.breakpoints.down("sm")]: {
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
      `${BASE_API_URL}/api/instructor/course/dashboard/${courseId}`,
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
    //to be done
    const response = await axios.get(
      `${BASE_API_URL}/api/instructor/course/get-students-scoregraph/${courseId}`,
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
            <Grid item xs={12} sm={6} md={6} lg={6} key={2}>
              <div>
                <Card elevation={1} className={classes.cardbody}>
                  <CardHeader
                    title="STUDENTS"
                    className={classes.cardHeader}
                    action={
                      <IconButton>
                        <SupervisorAccountIcon style={{ color: "#2c9faf" }} />
                      </IconButton>
                    }
                  />
                  <CardContent>
                    {data && (
                      <Typography variant="h3" style={{ color: "#2a96a5" }}>
                        {data.students_count}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} key={3}>
              <div>
                <Card elevation={1} className={classes.cardbody}>
                  <CardHeader
                    title="COURSE PROGRESS"
                    className={classes.cardHeader}
                    action={
                      <IconButton>
                        <DoneAllIcon style={{ color: "#2c9faf" }} />
                      </IconButton>
                    }
                  />
                  <CardContent>
                    {data && (
                      <Typography variant="h3" style={{ color: "#2a96a5" }}>
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
              fill="#2a96a5"
              background={{ fill: "#e3e6f0" }}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </LayoutCourse>
  );
}
