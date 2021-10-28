import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import LayoutCourse from "../../components/layouts/instructorSideLayout/LayoutCourse";
import Students from "../../components/InstructorComponents/Students";
import BASE_API_URL from "../../services/BaseUrl";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: "3%",
    color: "#5a5c69",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "10%",
    },
  },
  emptyState: {
    color: "#5a5c69",
    [theme.breakpoints.up("md")]: {
      marginTop: `calc(${window.innerHeight / 3}px)`,
      textAlign: "center",
      marginLeft: `calc(${window.innerWidth / 3 - 0.4 * window.innerWidth}px)`,
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "1%",
      marginTop: `calc(${window.innerHeight / 8}px)`,
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "5%",
      marginLeft: "5%",
      marginTop: `calc(${window.innerHeight / 3 - 0.1 * window.innerHeight}px)`,
    },
  },
}));

export default function ManageStudents() {
  const [access_token, setAccess_token] = useState(
    JSON.parse(localStorage.getItem("access_token"))
  );
  const [courseId, setCourseID] = useState(
    JSON.parse(localStorage.getItem("course_id"))
  );
  const classes = useStyles();
  const [data, setData] = useState(null);

  const getData = async () => {
    const response = await axios.get(
      `${BASE_API_URL}/api/instructor/course/get-student-info/${courseId}`,
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
  useEffect(async () => {
    getData();
  }, []);

  const handleRemove = async (id) => {
    const response = await axios.post(
      `${BASE_API_URL}/api/instructor/course/remove-student/${courseId}`,
      {
        student_id: id,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const data_fetched = response.data;
    if (data_fetched) {
      getData();
    }
  };

  const handlePending = async (id) => {
    const response = await axios.post(
      `${BASE_API_URL}/api/instructor/course/enroll-student/${courseId}`,
      {
        student_id: id,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const data_fetched = response.data;
    if (data_fetched) {
      getData();
    }
  };

  return (
    <LayoutCourse title="qwe">
      <div>
        {data && (
          <Typography className={classes.card} component="h2" variant="h4">
            Manage Students
          </Typography>
        )}
        {data ? (
          <div>
            <Grid container spacing={1}>
              <Grid item xs={12} md={12} lg={12} key={1}>
                <Students
                  data={data}
                  handleRemove={handleRemove}
                  handlePending={handlePending}
                />
              </Grid>
            </Grid>
          </div>
        ) : (
          <Typography
            className={classes.emptyState}
            component="h2"
            variant="h5"
          >
            No Students enrolled
          </Typography>
        )}
      </div>
    </LayoutCourse>
  );
}
