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
import Layout from "../../components/layouts/instructorSideLayout/Layout";
import Notification from "../../components/InstructorComponents/Notification";
import BASE_API_URL from "../../services/BaseUrl";
import axios from "axios";
import { useHistory } from "react-router";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: "2%",
  },
  cardbody: {
    borderWidth: "1px",
    borderLeft: ".25rem solid !important",
    borderColor: "#5a5c69 !important",
  },
  page: {
    background: "#f9f9f9",
    width: "100%",
  },
  card2: {
    color: "#5a5c69",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "10%",
    },
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
      marginLeft: "2%",
      marginTop: `calc(${window.innerHeight / 3 - 0.1 * window.innerHeight}px)`,
    },
  },
}));

export default function Notifications() {
  const [access_token, setAccess_token] = useState(
    JSON.parse(localStorage.getItem("access_token"))
  );
  const [data, setData] = useState(null);
  const classes = useStyles();
  const history = useHistory();

  const getDAta = async () => {
    const response = await axios.get(
      `${BASE_API_URL}/api/instructor/notifications`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const data_fetched = response.data;
    if (data_fetched.status) {
      setData("");
    } else {
      setData(data_fetched);
    }
  };

  useEffect(() => {
    getDAta();
  }, []);

  const handleRead = async (id) => {
    const response = await axios.post(
      `${BASE_API_URL}/api/instructor/notifications/mark-read`,
      {
        notification_id: id,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const data_fetched = response.data;
    if (data_fetched) {
      getDAta();
    }
  };

  const NavigateToCourse = async (course_id) => {
    localStorage.setItem("course_id", course_id);
    history.push("/course/ManageStudents");
  };

  return (
    <Layout title="qwe">
      <div className={classes.page}>
        {data && (
          <Typography className={classes.card2} component="h2" variant="h4">
            Notifications
          </Typography>
        )}
        {data ? (
          <div className={classes.card}>
            <Notification
              data={data}
              handleRead={handleRead}
              NavigateToCourse={NavigateToCourse}
            />
          </div>
        ) : (
          <Typography
            className={classes.emptyState}
            component="h2"
            variant="h4"
          >
            No Notifications yet <ErrorOutlineIcon />
          </Typography>
        )}
      </div>
    </Layout>
  );
}
