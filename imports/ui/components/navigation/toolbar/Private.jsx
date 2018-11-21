import React, { Component, Fragment } from "react";
import classNames from "classnames";
import { Link, withRouter } from "react-router-dom";
import { PropTypes } from "prop-types";

import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/icons/Menu";
import Search from "@material-ui/icons/Search";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";
import { withStyles } from "@material-ui/core/styles";

import SearchVenuesForm from "../../forms/SearchVenuesForm";

const drawerWidth = 220;

const styles = theme => ({
  drawerOpen: {
    paddingLeft: drawerWidth
  },
  hide: {
    display: "none"
  },
  iconButton: {
    padding: theme.spacing.unit / 2
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
    color: theme.palette.common.white,
    marginRight: theme.spacing.unit
  },
  toolbarButtonsContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end"
  }
});

class Private extends Component {
  state = {
    showSearch: false
  };

  toggleSearch = () => this.setState({ showSearch: !this.state.showSearch });

  render() {
    const { classes, open, onToggleDrawer, location } = this.props;
    const { showSearch } = this.state;
    const index = location.pathname == "/";
    return (
      <Fragment>
        <Toolbar
          disableGutters
          className={classNames(open && classes.drawerOpen)}
        >
          <Grid container justify="space-between">
            <Typography
              className={classes.logo}
              component={Link}
              to="/"
              variant="h6"
            >
              {Meteor.settings.public.appName}
            </Typography>
            <Grid item xs={3}>
              <Grid
                container
                justify="flex-end"
                alignItems="center"
                style={{ height: "100%" }}
              >
                {!index && (
                  <IconButton
                    classes={{ root: classes.iconButton }}
                    onClick={this.toggleSearch}
                  >
                    {showSearch ? (
                      <KeyboardArrowUp classes={{ root: classes.arrowIcon }} />
                    ) : (
                      <Search style={{ color: "white" }} />
                    )}
                  </IconButton>
                )}
                <Hidden lgUp>
                  <IconButton
                    style={{ marginLeft: 8 }}
                    color="inherit"
                    aria-label="open drawer"
                    onClick={onToggleDrawer}
                    className={classNames(
                      open && classes.hide,
                      classes.iconButton
                    )}
                  >
                    <Menu classes={{ root: classes.menuIcon }} />
                  </IconButton>
                </Hidden>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
        {showSearch && <SearchVenuesForm onSelect={this.toggleSearch} />}
      </Fragment>
    );
  }
}

Private.propTypes = {
  onToggleDrawer: PropTypes.func.isRequired,
  open: PropTypes.bool
};

export default withStyles(styles)(withRouter(Private));
