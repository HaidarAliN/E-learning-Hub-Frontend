import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_API_URL from "../services/BaseUrl";
import { useHistory, Redirect, Link } from "react-router-dom";
import firebase from "../firebase";
import { isMobile } from "react-device-detect";
import { ThemeProvider } from "@material-ui/styles";
import { Container } from "react-bootstrap";
import {
  makeStyles,
  Box,
  createTheme,
  CssBaseline,
  Button,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import Alert from "@material-ui/lab/Alert";
import ImageResponsive from "react-image-responsive";

const useStyles = makeStyles((theme) => ({
  image: {
    width: "20%",
    height: "20%",
    [theme.breakpoints.down("sm")]: {
      width: "50%",
      height: "50%",
    },
  },
}));

const Login = ({ redicrett }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwrodError, setPasswordError] = useState(false);
  const [error, setError] = useState(null);
  const [firebaseToken, setFirebaseToken] = useState(null);
  const history = useHistory();
  const classes = useStyles();

  const componentDidMount = () => {
    const messaging = firebase.messaging();
    messaging
      .requestPermission()
      .then(() => {
        return messaging.getToken();
      })
      .then((token) => {
        console.log("token : ", token);
        setFirebaseToken(token);
      })
      .catch(() => {
        console.log("token : ");
      });
  };

  useEffect(() => {
    if (!isMobile) {
      componentDidMount();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      email: email,
      password: password,
    };
    setEmailError(false);
    setPasswordError(false);
    if (email && password) {
      try {
        const resp = await axios.post(`${BASE_API_URL}/api/login`, newPost);
        setError(null);
        localStorage.setItem(
          "access_token",
          JSON.stringify(resp.data["access_token"])
        );
        localStorage.setItem(
          "user_type_id",
          JSON.stringify(resp.data["user"]["user_type_id"])
        );
        localStorage.setItem("name", resp.data["user"]["first_name"]);

        const response = await axios.post(
          `${BASE_API_URL}/api/update-firebase-token`,
          {
            token: firebaseToken,
          },
          {
            headers: {
              Authorization: `Bearer ${resp.data["access_token"]}`,
            },
          }
        );
        const data_fetched = await response.data;
        if (data_fetched) {
          history.push("/home");
          window.location.reload();
        }
      } catch (err) {
        setError(true);
      }
    } else {
      if (!email) {
        setEmailError(true);
      }
      if (!password) {
        setPasswordError(true);
      }
    }
  };
  const theme = createTheme();

  const sources = [
    { maxWidth: 100, src: "http://placehold.it/100x100" },
    { maxWidth: 200, src: "http://placehold.it/200x100" },
    { maxWidth: 400, src: "http://placehold.it/400x100" },
    { maxWidth: 800, src: "http://placehold.it/800x100" },
    { maxWidth: 1200, src: "http://placehold.it/1200x100" },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="https://user-images.githubusercontent.com/89384538/139715338-bfd924d1-9449-45e3-b1df-d40d03de18df.png"
            alt="this is my image"
            className={classes.image}
            style={{ m: 1, color: "#4e73df" }}
            // sources={sources}
          />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={emailError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              error={passwrodError}
            />
            {error && (
              <Alert
                severity="error"
                className="text-center"
                style={{ textAlign: "center" }}
              >
                Bad Credentials
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{
                backgroundColor: "#4e73df",
                marginTop: "4%",
                color: "#fff",
              }}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
