import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_API_URL from "../services/BaseUrl";
import { useHistory } from "react-router-dom";
import firebase from "../firebase";
import { isIOS } from "react-device-detect";
import { ThemeProvider } from "@material-ui/styles";
import { Container } from "react-bootstrap";
import {
  makeStyles,
  Box,
  createTheme,
  CssBaseline,
  Button,
  TextField,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

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

  const getFirebaseToken = () => {
    const messaging = firebase.messaging();
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("./firebase-messaging-sw.js")
        .then(function (registration) {
          console.log("Registration successful, scope is:", registration.scope);
          Notification.requestPermission().then(() => {
            return messaging
              .getToken({
                vapidKey:
                  "BDN5zDxWa_64tkj66l2l8L836fWPFkdNmVeNuG7IGmL3oeylSuc_P_zTcqhkVjis43V6L0A6A-5MmP2P7RQLZ54",
                serviceWorkerRegistration: registration,
              })
              .then((currentToken) => {
                if (currentToken) {
                  console.log("current token for client: ", currentToken);
                  setFirebaseToken(currentToken);
                  console.log("device_token", currentToken);
                } else {
                  console.log(
                    "No registration token available. Request permission to generate one."
                  );
                }
              })
              .catch((err) => {
                console.log("An error occurred while retrieving token. ", err);
              });
          });
        })
        .catch(function (err) {
          console.log("Service worker registration failed, error:", err);
        });
    }
  };

  useEffect(() => {
    if (!isIOS) {
      getFirebaseToken();
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
