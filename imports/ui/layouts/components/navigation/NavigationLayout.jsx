import React, { Component, Fragment } from "react";
import classNames from "classnames";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import PrivateToolbar from "../../../components/navigation/toolbar/Private";
import PublicToolbar from "../../../components/navigation/toolbar/Public";

import SearchVenues from "../../../components/forms/SearchVenuesForm";

const styles = theme => ({
  appBar: {
    background: theme.palette.secondary.dark,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  logo: {
    color: theme.palette.common.white,
    textDecoration: "none"
  },
  searchContainer: {
    position: "absolute",
    zIndex: 1000,
    [theme.breakpoints.up("sm")]: {
      marginTop: 72
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: 108
    }
  },
  darkAppBar: {
    background: `${theme.palette.primary.dark} !important`
  }
});

class NavigationLayout extends Component {
  state = {
    open: false,
    showSearch: false
  };

  toggleDrawer = () => {
    // this.setState(prevState => {
    //   const { open } = prevState;
    //   this.props.handleToggleDrawer(!open);
    //   return { open: !open };
    // });
    console.log("toggleDrawer");
  };

  toggleSearch = () => {
    this.setState({ showSearch: !this.state.showSearch });
  };

  render() {
    const { classes, match } = this.props;
    let { open, showSearch } = this.state;
    const index = match.path == "/";
    return (
      <Fragment>
        <nav className={classes.navContainer}>
          <AppBar
            position="fixed"
            color={index ? "secondary" : "primary"}
            className={classNames(!index ? classes.darkAppBar : classes.appBar)}
          >
            {Meteor.userId() ? (
              <PrivateToolbar
                open={open}
                onToggleDrawer={this.toggleDrawer}
                onToggleSearch={this.toggleSearch}
                showSearch={showSearch}
              />
            ) : (
              <PublicToolbar
                onToggleSearch={this.toggleSearch}
                showSearch={showSearch}
              />
            )}
          </AppBar>
        </nav>
        {showSearch && (
          <Grid container classes={{ container: classes.searchContainer }}>
            <SearchVenues onSelect={this.toggleSearch} />
          </Grid>
        )}
      </Fragment>
    );
  }
}

NavigationLayout.propTypes = {
  handleToggleDrawer: PropTypes.func
};

export default withStyles(styles)(withRouter(NavigationLayout));
