import React, { useState, useEffect } from "react";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import { Link, useHistory, useLocation } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, useTheme, alpha } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import DashboardIcon from "@material-ui/icons/Dashboard";
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";
import SchoolOutlinedIcon from "@material-ui/icons/SchoolOutlined";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import BASE_API_URL from "../../../services/BaseUrl";
import axios from "axios";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  page: {
    background: "#f9f9f9",
    width: "100%",
    height: window.innerHeight,
    padding: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      marginLeft: "-60%",
    },
  },
  root: {
    display: "flex",
    background: "#f9f9f9",
  },
  drawer: {
    width: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },

  active: {
    background: "#f3f3f33f",
  },
  appBar: {
    background: "#ffff",

    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  drawerPaper: {
    width: drawerWidth,
    background: "#4e73df",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  //app bar
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  title: {
    marginTop: "7%",
    marginLeft: "-25%",
    textAlign: "center",
    display: "none",
    color: "#eaecf4",
    marginBottom: "7%",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  divider: {
    // Theme Color, or use css color in quote
    background: "#eaecf4",
  },
  nested: {
    paddingLeft: theme.spacing(4),
    background: "#f9f9f9",
    borderRadius: 45,
    marginBottom: "2%",
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
  },
  toolbar: theme.mixins.toolbar,
  toolbar2: {
    marginBottom: "2%",
  },
  back: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

export default function Layout2({ children }, props) {
  const [backTo, setBackTo] = useState(localStorage.getItem("location"));
  const [access_token, setAccess_token] = useState(
    JSON.parse(localStorage.getItem("access_token"))
  );
  const [courseId, setCourseID] = useState(
    JSON.parse(localStorage.getItem("course_id"))
  );
  const [title, setTitle] = useState("course");
  const history = useHistory();
  const location = useLocation();
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [notification, setNotification] = useState(0);
  const [data, setData] = useState(null);
  const [name, setName] = useState(localStorage.getItem("course_name"));

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const container =
    window !== undefined ? () => window().document.body : undefined;
  //appbar
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileMenuOpen2 = (event) => {
    handleLogout();
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push("/");
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  useEffect(async () => {
    const response = await axios.get(`${BASE_API_URL}/api/student/navInfo`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const data_fetched = response.data;
    setData(data_fetched);
    setNotification(data_fetched.notification_count);
  }, []);

  const handleNotification = () => {
    history.push("/Notifications");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleNotification}>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={notification} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p style={{ marginTop: "10%" }}>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen2}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p style={{ marginTop: "10%" }}>Logout</p>
      </MenuItem>
    </Menu>
  );

  //list
  const [openfirst, setOpenFirst] = React.useState(false);
  const [opensecond, setOpenSecond] = React.useState(false);
  const handleClickFirst = () => {
    setOpenFirst(!openfirst);
  };
  const handleClickSecond = () => {
    setOpenSecond(!opensecond);
  };

  const renderList = (
    <div>
      <List>
        <ListItem
          button
          key="Dashboard"
          onClick={() => history.push("/course/Dashboard")}
          className={
            location.pathname == "/course/Dashboard" ? classes.active : null
          }
        >
          <ListItemIcon>
            <DashboardIcon color="secondary" />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography type="body2" style={{ color: "#d1d3e2" }}>
                Dashboard
              </Typography>
            }
          />
        </ListItem>
      </List>
      <Divider variant="middle" />

      <List>
        <ListItem
          button
          key="Dashboard"
          onClick={() => history.push("/course/Materials")}
          className={
            location.pathname == "/course/Materials" ? classes.active : null
          }
        >
          <ListItemIcon>
            <CloudUploadOutlinedIcon color="secondary" />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography type="body2" style={{ color: "#d1d3e2" }}>
                Uploaded Materials
              </Typography>
            }
          />
        </ListItem>
      </List>
      <Divider variant="middle" />

      <List>
        <ListItem
          button
          key="Dashboard"
          onClick={() => history.push("/course/CourseQuizzes")}
          className={
            location.pathname == "/course/CourseQuizzes" ? classes.active : null
          }
        >
          <ListItemIcon>
            <SchoolOutlinedIcon color="secondary" />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography type="body2" style={{ color: "#d1d3e2" }}>
                Course Quizzes
              </Typography>
            }
          />
        </ListItem>
      </List>
      <Divider variant="middle" />

      <List>
        <ListItem
          button
          key="Dashboard"
          onClick={() => history.push("/course/QuizGrades")}
          className={
            location.pathname == "/course/QuizGrades" ? classes.active : null
          }
        >
          <ListItemIcon>
            <AssignmentTurnedInIcon color="secondary" />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography type="body2" style={{ color: "#d1d3e2" }}>
                Quiz Grades
              </Typography>
            }
          />
        </ListItem>
      </List>
      <Divider variant="middle" />

      <List className={classes.back}>
        <ListItem
          button
          key="Dashboard"
          onClick={() => history.push(`/${backTo}`)}
        >
          <ListItemIcon>
            <ArrowBackIcon color="secondary" />
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography type="body2" style={{ color: "#d1d3e2" }}>
                Back
              </Typography>
            }
          />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      {/* app bar */}
      <div className={classes.grow}>
        <AppBar
          position="fixed"
          className={classes.appBar}
          color="secondary"
          elevation={3}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              className={classes.menuButton}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" style={{ color: "#7591e6" }}>
              {name} {">"}
            </Typography>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                onClick={handleNotification}
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={notification} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle style={{ color: "#7591e6" }} />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>
      {/* side drawer */}
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {renderList}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <div>
              <Link to={`/${backTo}`} style={{ textDecoration: "none" }}>
                <Typography
                  type="body2"
                  className={classes.title}
                  style={{ color: "#d1d3e2" }}
                >
                  <ArrowBackIcon color="secondary" /> Back
                </Typography>
              </Link>
            </div>
            <Divider variant="middle" />

            {renderList}
          </Drawer>
        </Hidden>
      </nav>
      {/* main content */}
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
}
