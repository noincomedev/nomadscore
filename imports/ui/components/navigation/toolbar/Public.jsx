import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Search from "@material-ui/icons/Search";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  iconButton: {
    padding: theme.spacing.unit / 2
  },
  logo: {
    marginLeft: theme.spacing.unit,
    textDecoration: "none",
    color: theme.palette.common.white,
    fontFamily: "fredoka one",
    fontSize: "1.89rem",
    textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"
  },
  menuIcon: {
    color: theme.palette.common.white,
    marginRight: theme.spacing.unit
  },
  toolbarButtonsContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end"
  }
});

const Public = ({ classes, location, showSearch, onToggleSearch }) => {
  const index = location.pathname == "/";
  return (
    <Toolbar disableGutters classes={{ root: classes.toolbar }}>
      <Grid container justify="space-between">
        <Typography
          className={classes.logo}
          component={Link}
          to="/"
          variant="h6"
        >
          {Meteor.settings.public.appName}
        </Typography>
        <Grid item xs={3} style={{ marginRight: 8 }}>
          <Grid
            container
            justify="flex-end"
            alignItems="center"
            style={{ height: "100%" }}
          >
            {!index && (
              <IconButton
                classes={{ root: classes.iconButton }}
                onClick={onToggleSearch}
              >
                {showSearch ? (
                  <KeyboardArrowUp classes={{ root: classes.arrowIcon }} />
                ) : (
                  <Search style={{ color: "white" }} />
                )}
              </IconButton>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Toolbar>
  );
};

export default withStyles(styles)(withRouter(Public));
