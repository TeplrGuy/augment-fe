import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Icon from "@material-ui/core/Icon";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
  button: {
    margin: theme.spacing(1)
  },
  toolbar: {
    minHeight: 140,
    background: "#3f6ed9",
    alignItems: 'flex-start',
    paddingTop: 70,
    paddingBottom: theme.spacing(2),
  },
  input: {
    display: "none"
  },
  title: {
    fontWeight: "bolder",
    color: "black"
  }
});

const FlatButtons = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
          <Typography className={classes.title} variant="h5" noWrap>
            Home
          </Typography>
    </div>
  );
};

FlatButtons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FlatButtons);