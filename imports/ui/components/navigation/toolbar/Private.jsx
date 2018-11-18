import React from "react";
import classNames from "classnames";
import { Link, withRouter } from "react-router-dom";
import { PropTypes } from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const drawerWidth = 220;

const styles = theme => ({
  drawerOpen: {
    paddingLeft: drawerWidth
  },
  hide: {
    display: "none"
  },
  logo: {
    marginLeft: theme.spacing.unit,
    textDecoration: "none",
    color: theme.palette.common.white,
    fontFamily: "pacifico",
    fontSize: "2rem",
    textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"
  },
  menuIcon: {
    color: theme.palette.common.white
  },
  toolbarButtonsContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end"
  }
});

const Private = ({ classes, open, onToggleDrawer }) => {
  return (
    <Toolbar disableGutters className={classNames(open && classes.drawerOpen)}>
      <Grid container justify="space-between">
        <Typography
          className={classes.logo}
          component={Link}
          to="/"
          variant="h6"
        >
          {Meteor.settings.public.appName}
        </Typography>
        <Hidden lgUp>
          <IconButton
            style={{ marginLeft: 8 }}
            color="inherit"
            aria-label="open drawer"
            onClick={onToggleDrawer}
            className={classNames(open && classes.hide)}
          >
            <Menu classes={{ root: classes.menuIcon }} />
          </IconButton>
        </Hidden>
      </Grid>
    </Toolbar>
  );
};

Private.propTypes = {
  onToggleDrawer: PropTypes.func.isRequired,
  open: PropTypes.bool
};

export default withStyles(styles)(withRouter(Private));
