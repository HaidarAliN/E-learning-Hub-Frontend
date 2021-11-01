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
  NativeSelect,
  responsiveFontSizes,
  TextField,
  Typography,
} from "@material-ui/core";
import CachedIcon from "@material-ui/icons/Cached";
import React, { useState, useEffect } from "react";
import Layout from "../../components/layouts/adminSideLayout/Layout";
import BASE_API_URL from "../../services/BaseUrl";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: "2%",
  },
  cardbody: {
    borderWidth: "1px",
    borderLeft: ".25rem solid !important",
    borderColor: "#5a5c69 !important",
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
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  btn: {
    marginTop: "2%",
  },
  label: {
    alignItems: "center",
    marginTop: "5%",
  },
  created: {
    marginTop: "2%",
  },
  page: {
    background: "#f9f9f9",
    width: "100%",
    [theme.breakpoints.down("xs")]: {},
  },
  card2: {
    color: "#5a5c69",
    [theme.breakpoints.down("md")]: {
      marginBottom: "10%",
    },
  },
}));

export default function ResetPassword() {
  const [access_token, setAccess_token] = useState(
    JSON.parse(localStorage.getItem("access_token"))
  );
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [created, setCreated] = useState(null);

  const handleSubmit = async () => {
    setEmailError(false);
    setPasswordError(false);

    if (!password) {
      setPasswordError(true);
    }

    if (!email) {
      setEmailError(true);
    }

    if (password && email) {
      const response = await axios.post(
        `${BASE_API_URL}/api/admin/reset-password`,
        {
          password: password,
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      const data_fetched = await response.data;
      if (data_fetched) {
        console.log(data_fetched);
      }
    }
  };

  const classes = useStyles();
  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  return (
    <Layout title="qwe">
      <div className={classes.page}>
        <Typography className={classes.card2} component="h2" variant="h4">
          Reset Password
        </Typography>

        {!created ? (
          <div className={classes.card}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={12} lg={12} key={1}>
                <div>
                  <Card elevation={1} className={classes.cardbody}>
                    <CardHeader
                      title="User Info "
                      className={classes.cardHeader}
                      action={
                        <div className={classes.btn}>
                          <Button
                            color="secondary"
                            variant="contained"
                            onClick={handleSubmit}
                            endIcon={<CachedIcon />}
                          >
                            Reset
                          </Button>
                        </div>
                      }
                    />
                    <CardContent>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={5} lg={3} key={1}>
                          <InputLabel className={classes.label}>
                            User email:
                          </InputLabel>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4} key={2}>
                          <TextField
                            key={11}
                            onChange={(e) => setEmail(e.target.value)}
                            className={classes.field}
                            variant="outlined"
                            color="primary"
                            fullWidth
                            required
                            error={emailError}
                            placeholder="email"
                          />
                        </Grid>
                        <Grid item xs={12} md={1} lg={5} key={3}></Grid>
                      </Grid>

                      <Grid container spacing={3}>
                        <Grid item xs={12} md={5} lg={3} key={4}>
                          <InputLabel className={classes.label}>
                            User password:
                          </InputLabel>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4} key={5}>
                          <TextField
                            key={111}
                            onChange={(e) => setPassword(e.target.value)}
                            className={classes.field}
                            variant="outlined"
                            color="primary"
                            fullWidth
                            required
                            error={passwordError}
                            placeholder="password"
                          />
                        </Grid>
                        <Grid item xs={12} md={1} lg={5} key={6}></Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
            </Grid>
          </div>
        ) : (
          <Typography
            className={classes.created}
            component="h2"
            variant="body1"
          >
            User Has been Registerd!
          </Typography>
        )}
      </div>
    </Layout>
  );
}
