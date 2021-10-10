import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import { useHistory, useLocation } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import { ExpandLess, ExpandMore, StarBorder } from '@material-ui/icons'
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme, alpha } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Collapse } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SettingsIcon from '@material-ui/icons/Settings';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import DashboardIcon from '@material-ui/icons/Dashboard';

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  page: {
    background: '#f9f9f9',
    width: '100%',
    padding: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
    marginLeft:"-60%"

    },
  },
  root: {
    display: 'flex',
    background: '#f9f9f9',
  },
  drawer: {
    width: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },

  active: {
    background: '#f3f3f33f'
  },
  appBar: {
    background: '#ffff',

    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  drawerPaper: {
    width: drawerWidth,
    background: '#5a5c69',
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
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  title: {
    marginTop:"7%",
    alignItems: "center",
    textAlign: "center",
    display: 'none',
    color: "#eaecf4",
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  divider: {
    // Theme Color, or use css color in quote
    background: "#eaecf4",
},
nested: {
  paddingLeft: theme.spacing(4),
  background: '#f9f9f9',
  borderRadius: 45,
  marginBottom: "2%",
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
},
toolbar: theme.mixins.toolbar,
toolbar2: {
  marginBottom: "2%",
}
}));

export default function Layout2({ children }, props) {
  const history = useHistory()
  const location = useLocation()
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;
  //appbar 
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
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
          className={location.pathname == "/course/Dashboard" ? classes.active : null}
        >
          <ListItemIcon><DashboardIcon color="secondary" /></ListItemIcon>
          <ListItemText disableTypography primary={<Typography type="body2" style={{ color: '#d1d3e2' }}>Dashboard</Typography>}/>
        </ListItem>
      </List>
      <Divider  variant="middle" />
      <ListItem 
        button 
        onClick={handleClickFirst}
        className={location.pathname != "/course/Dashboard" ? classes.active : null}
      >
        <ListItemIcon>
          <SettingsIcon  color="secondary"/>
        </ListItemIcon>
        <ListItemText 
          disableTypography primary={<Typography type="body2" style={{ color: '#d1d3e2' }}>Course Content</Typography>} />
          {openfirst ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      <Collapse in={openfirst} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem 
            button 
            onClick={() => {
              handleClickFirst();
              history.push("/course/UploadMaterial");}}
            className={classes.nested}
          >
            <ListItemIcon>
              <StarBorder/>
            </ListItemIcon>
            <ListItemText primary="Upload Materials" />
          </ListItem>

          <ListItem 
            button 
            onClick={() => {
              handleClickFirst();
              history.push("/create");}}
            className={classes.nested}
          >
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Manage Quizzes" />
          </ListItem>

          <ListItem 
            button 
            onClick={() => {
              handleClickFirst();
              history.push("/create");}}
            className={classes.nested}
          >
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Manage Students" />
          </ListItem>

          <ListItem 
            button 
            onClick={() => {
              handleClickFirst();
              history.push("/create");}}
            className={classes.nested}
          >
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Edit Course Info" />
          </ListItem>

        </List>
      </Collapse>
     
    </div>
  );

  return (
    <div className={classes.root}>
      {/* app bar */}
      <div className={classes.grow}>
      <AppBar position="fixed"
      className={classes.appBar}
      color="secondary"
      elevation={3}
      >
        <Toolbar>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
              <Typography  variant="h6">
                E-Learning Hub
              </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={1} color="secondary">
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
              <AccountCircle />
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
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
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
          <div className={classes.toolbar}>
              <Typography className={classes.title} variant="h6">
                E-Learning Hub
              </Typography>
          </div>
          <Divider  variant="middle" />
          
            {renderList}

        </Drawer>
      </Hidden>
    </nav>
    {/* main content */}
    <div className={classes.page}>
    <div className={classes.toolbar}></div>
      { children }
    </div>
  </div>
  )
}