import {
  Button,
  Card,
  CardContent,
  CardHeader,
  createTheme,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  responsiveFontSizes,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import SendIcon from "@material-ui/icons/Send";
import BackupOutlinedIcon from "@material-ui/icons/BackupOutlined";
import LayoutCourse from "../../components/layouts/instructorSideLayout/LayoutCourse";
import Materials from "../../components/InstructorComponents/Materials";
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
    borderColor: "#2a96a5 !important",
  },
  cardHeader: {
    marginBottom: 0,
    backgroundColor: "#e3e6f0",
    borderBottom: "1px solid #e3e6f0",
    color: "#757575",
  },
  field: {
    marginTop: "2%",
    marginBottom: "2%",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  btn: {
    marginTop: "2%",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  label: {
    alignItems: "center",
    marginTop: "5%",
  },
  card2: {
    marginBottom: "2%",
    color: "#5a5c69",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "10%",
    },
  },
  label2: {
    [theme.breakpoints.down("sm")]: {
      marginTop: "15%",
    },
  },
  btnSmall: {
    color: "#fff",
    marginTop: "2%",
    backgroundColor: "#2a96a5",
    "&:hover": {
      color: "#fff",
      backgroundColor: "#2c9faf",
    },
    [theme.breakpoints.up("sm")]: {},
  },
}));

export default function UploadMaterial() {
  const [chapterName, setChapterName] = useState("");
  const [chapterDescription, setChapterDescription] = useState("");
  const [nameError, setNameError] = useState(false);
  const [chapterDescriptionError, setChapterDescriptionError] = useState(false);
  const [rows2, setrow2] = useState(null);
  const [extention, setExtention] = useState(null);
  const [access_token, setAccess_token] = useState(
    JSON.parse(localStorage.getItem("access_token"))
  );
  const [courseId, setCourseID] = useState(
    JSON.parse(localStorage.getItem("course_id"))
  );
  const [chapterEditName, setChapterEditName] = useState(null);
  const [chapterEditDescription, setChapterEditDescription] = useState("");
  const [editChapterId, setEditChapterId] = useState(null);

  const classes = useStyles();
  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  const getData = async () => {
    const response = await axios.get(
      `${BASE_API_URL}/api/instructor/course/get-uploaded-material/${courseId}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const data_fetched = response.data;
    if (data_fetched.length == 0) {
      setData(null);
    } else {
      setData(data_fetched);
    }
  };

  const handleSubmit = async () => {
    setNameError(false);
    setChapterDescriptionError(false);
    if (!chapterName) {
      setNameError(true);
    }
    if (!chapterDescription) {
      setChapterDescriptionError(true);
    }
    if (chapterName && chapterDescription && pdfData) {
      if (extention != "pdf") {
        alert("You can only upload pdf files");
      } else {
        addchapt();
        setChapterDescription("");
        setChapterName("");
        setPdfData(null);
      }
    }
  };

  const addchapt = async () => {
    const response = await axios.post(
      `${BASE_API_URL}/api/instructor/course/upload-new-material/${courseId}`,
      {
        name: chapterName,
        description: chapterDescription,
        base64file: pdfData,
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

  const handleUpdate = async () => {
    const response = await axios.post(
      `${BASE_API_URL}/api/instructor/course/edit-material/${courseId}`,
      {
        id: editChapterId,
        name: chapterEditName,
        description: chapterEditDescription,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const data_fetched = response.data;
    if (data_fetched) {
      setChapterEditName("");
      setChapterEditDescription("");
      getData();
    }
  };

  const [data, setData] = useState(null);
  const [submited, setSubmited] = useState(false);
  const [pdfData, setPdfData] = useState(null);
  useEffect(async () => {
    getData();
  }, []);

  const handleRemove = async (id) => {
    const response = await axios.post(
      `${BASE_API_URL}/api/instructor/course/remove-material/${courseId}`,
      {
        id: id,
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

  const handleEdit = async (id) => {
    const response = await axios.get(
      `${BASE_API_URL}/api/instructor/course/get-material-by-id/${id}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const data_fetched = response.data;
    setChapterEditName(await data_fetched.name);
    setChapterEditDescription(await data_fetched.description);
    setEditChapterId(id);
  };

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    const nameArr = e.target.files[0].name.split(".");
    setExtention(nameArr[1]);
    const base64 = await convertBase64(file); //encrypt the file
    const base = base64.split(","); //split the encypted data
    setPdfData(base[1]);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <LayoutCourse title="qwe">
      <div>
        <Typography className={classes.card2} component="h2" variant="h4">
          Upload Materials
        </Typography>
        <div className={classes.card}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12} lg={12} key={1}>
              <div>
                <Card elevation={1} className={classes.cardbody}>
                  <CardHeader
                    title="Add Chapter Info"
                    className={classes.cardHeader}
                  />
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={5} lg={3} key={2}>
                        <InputLabel className={classes.label}>
                          Chapter name:
                        </InputLabel>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4} key={3}>
                        <TextField
                          key={554}
                          onChange={(e) => setChapterName(e.target.value)}
                          className={classes.field}
                          variant="outlined"
                          color="primary"
                          fullWidth
                          required
                          value={chapterName}
                          error={nameError}
                          placeholder="Chapter 1"
                        />
                      </Grid>
                      <Grid item xs={12} md={1} lg={5} key={4}></Grid>
                    </Grid>

                    <Grid container spacing={3}>
                      <Grid item xs={12} md={5} lg={3} key={2}>
                        <InputLabel className={classes.label}>
                          Chapter description:
                        </InputLabel>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4} key={3}>
                        <TextField
                          key={555}
                          onChange={(e) =>
                            setChapterDescription(e.target.value)
                          }
                          className={classes.field}
                          variant="outlined"
                          color="primary"
                          fullWidth
                          value={chapterDescription}
                          required
                          error={chapterDescriptionError}
                          placeholder="Description"
                        />
                      </Grid>
                      <Grid item xs={12} md={1} lg={5} key={4}></Grid>
                    </Grid>

                    <Grid container spacing={3}>
                      <Grid item xs={4} md={5} lg={3} key={2}>
                        <InputLabel className={classes.label2}>
                          Upload File:
                        </InputLabel>
                      </Grid>
                      <Grid item xs={8} md={6} lg={4} key={3}>
                        <FormControl className={classes.formControl}>
                          <Button
                            variant="contained"
                            component="label"
                            color="secondary"
                            endIcon={<BackupOutlinedIcon />}
                          >
                            Upload file
                            <input
                              type="file"
                              onChange={uploadFile}
                              hidden
                              accept="application/pdf"
                            />
                          </Button>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={1} lg={5} key={4}></Grid>
                    </Grid>

                    <div>
                      <Button
                        className={classes.btnSmall}
                        variant="contained"
                        onClick={handleSubmit}
                        endIcon={<SendIcon />}
                      >
                        Add Chapter
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Grid>
          </Grid>
        </div>

        <div>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12} lg={12} key={1}>
              <div>
                {data && (
                  <Materials
                    data={data}
                    handleRemove={handleRemove}
                    handleEdit={handleEdit}
                  />
                )}
              </div>
            </Grid>
          </Grid>
        </div>

        {chapterEditName && (
          <div className={classes.card}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={12} lg={12} key={1}>
                <div>
                  <Card elevation={1} className={classes.cardbody}>
                    <CardHeader
                      title="Edit Chapter Info"
                      className={classes.cardHeader}
                    />
                    <CardContent>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={5} lg={6} key={1}>
                          <TextField
                            onChange={(e) => setChapterEditName(e.target.value)}
                            className={classes.field}
                            variant="outlined"
                            color="primary"
                            fullWidth
                            required
                            value={chapterEditName}
                            placeholder="Name"
                          />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6} key={2}>
                          <TextField
                            onChange={(e) =>
                              setChapterEditDescription(e.target.value)
                            }
                            className={classes.field}
                            variant="outlined"
                            color="primary"
                            fullWidth
                            required
                            value={chapterEditDescription}
                            placeholder="Description"
                          />
                        </Grid>
                      </Grid>

                      <div>
                        <Button
                          className={classes.btnSmall}
                          variant="contained"
                          onClick={handleUpdate}
                          endIcon={<SendIcon />}
                        >
                          Update
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
            </Grid>
          </div>
        )}
      </div>
    </LayoutCourse>
  );
}
