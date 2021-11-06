import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Layout from "../../components/layouts/studentSideLayout/Layout";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import BASE_API_URL from "../../services/BaseUrl";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";

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

export default function Dashboard() {
  const [access_token, setAccess_token] = useState(
    JSON.parse(localStorage.getItem("access_token"))
  );
  const [data, setData] = useState(null);
  const classes = useStyles();
  const history = useHistory();

  useEffect(async () => {
    const response = await axios.get(
      `${BASE_API_URL}/api/student/get-user-info`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const data_fetched = response.data;
    setData(data_fetched);
  }, []);

  return (
    <Layout title="qwe">
      <div className={classes.page}>
        <Typography className={classes.card2} component="h2" variant="h4">
          Dashboard
        </Typography>
        <div className={classes.card}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} lg={6} key={2}>
              <div>
                <Card elevation={1} className={classes.cardbody}>
                  <CardHeader
                    title="Courses"
                    className={classes.cardHeader}
                    action={
                      <IconButton disabled="true">
                        <MenuBookIcon style={{ color: "#4e73df" }} />
                      </IconButton>
                    }
                  />
                  <CardContent>
                    {data && (
                      <Typography variant="h3" color="textSecondary">
                        {data.Courses_count}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </div>
            </Grid>
            <Grid item xs={12} md={6} lg={6} key={3}>
              <div>
                <Card elevation={1} className={classes.cardbody}>
                  <CardHeader
                    title="Submited Quizzes"
                    className={classes.cardHeader}
                    action={
                      <IconButton disabled="true">
                        <DoneAllIcon style={{ color: "#4e73df" }} />
                      </IconButton>
                    }
                  />
                  <CardContent>
                    {data && (
                      <Typography variant="h3" color="textSecondary">
                        {data.quiz_submited_count}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </Layout>
  );
}
