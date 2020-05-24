import React, { useState, Fragment } from 'react';
import clsx from 'clsx';
import { Router, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';
import ViewCompactIcon from '@material-ui/icons/ViewCompact';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import AccountCircle from '@material-ui/icons/AccountCircle';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';


import Home from "../pages/Home";
import Grid from "../pages/Grid";
import UploadMidi from "../pages/UploadMidi";

import red from '@material-ui/core/colors/red';

const primary = red[800]; // #F44336


const drawerWidth = 80;
const history = createBrowserHistory();


const styles = theme => ({
  root: {
    display: 'flex',
    height: '100vh'
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  toolbarMargin: 0,
  aboveDrawer: {
    zIndex: theme.zIndex.drawer + 1
  },
  content: {
    paddingTop: 70,
    backgroundColor: "#E9E8E6",
    flexGrow: 1,
    padding: "none",
    marginLeft: 0,
    height: '100vh'
  },
  search: {
    position: 'relative',
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    marginLeft: 10,
    marginRight: 10,
    width: '100%'
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
    color: 'white',
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
});

const MyToolbar = withStyles(styles)(
  ({ classes, title, onMenuClick, open, onItemClick }) => (
    <Router history={history}>

   <Fragment>
      <AppBar 
              color="primary"
              position="fixed"
              elevation={0}
              style={{ background: primary }}
      >
        <Toolbar className={classes.toolbar}>

           <IconButton
                component={Link} to="/" onClick={onItemClick('Home')}
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
               <img style={{height: 50, width: 50}} src="/img/logo.png"></img>
          </IconButton>

          <IconButton
                component={Link} to="/upload" onClick={onItemClick('Upload')}
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
               <QueueMusicIcon></QueueMusicIcon>
          </IconButton>


          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>



          <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </Fragment>

    <main 
      className={classes.content}
    >
        <Route exact path="/" component={Home} />
        <Route path="/grid" component={Grid} />
        <Route path="/upload" component={UploadMidi} />
    </main>

    </Router>
  )
);


function AppBarInteraction({ classes }) {
  const [title, setTitle] = useState('Home');

  const onItemClick = title => () => {
    setTitle(title);
  };

  return (
    <div className={classes.root}>
      <MyToolbar title={title} onItemClick={onItemClick} />
      
    </div>
  );
}

export default withStyles(styles)(AppBarInteraction);