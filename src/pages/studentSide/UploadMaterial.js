import {
  createTheme,
  Grid,
  makeStyles,
  responsiveFontSizes,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import LayoutCourse from "../../components/layouts/studentSideLayout/LayoutCourse";
import Materials from "../../components/StudentComponents/Materials";
import BASE_API_URL from "../../services/BaseUrl";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: "2%",
    marginBottom: "3%",
  },
  page: {
    background: "#f9f9f9",
    width: "100%",
  },
  card2: {
    color: "#5a5c69",
    marginBottom: "2%",
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
}));

export default function UploadMaterial() {
  const [access_token, setAccess_token] = useState(
    JSON.parse(localStorage.getItem("access_token"))
  );
  const [courseId, setCourseID] = useState(
    JSON.parse(localStorage.getItem("course_id"))
  );
  const [data, setData] = useState(null);
  const classes = useStyles();
  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  const getData = async () => {
    const response = await axios.get(
      `${BASE_API_URL}/api/student/course/get-uploaded-materials/${courseId}`,
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

  const handlePreview = async (path) => {
    window.open(`${BASE_API_URL}/UploadedMaterials/${path}`, "_blank");
  };

  return (
    <LayoutCourse title="qwe">
      {data ? (
        <div className={classes.page}>
          <Typography className={classes.card2} component="h2" variant="h4">
            Uploaded Material
          </Typography>
          <div>
            <Grid container spacing={1}>
              <Grid item xs={12} md={12} lg={12} key={1}>
                <div>
                  <Materials data={data} handlePreview={handlePreview} />
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      ) : (
        <Typography className={classes.emptyState} component="h2" variant="h4">
          No uploaded material
        </Typography>
      )}
    </LayoutCourse>
  );
}
