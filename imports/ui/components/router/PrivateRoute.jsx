import React, { Component, Fragment } from "react";
import classNames from "classnames";
import { Helmet } from "react-helmet";
import { Route, Redirect } from "react-router-dom";
import { PropTypes } from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import NavigationLayout from "../../layouts/components/navigation/NavigationLayout";

const styles = theme => ({
  main: {
    display: "flex",
    flex: 1,
    backgroundColor: theme.palette.background.default,
    marginTop: 64,
    flexDirection: "column",
    minHeight: "100%"
    // [theme.breakpoints.up("sm")]: {
    //   marginTop: 64
    // },
    // [theme.breakpoints.down("xs")]: {
    //   marginTop: 56,
    //   marginLeft: 0
    // },
    // [theme.breakpoints.up("md")]: {
    //   marginLeft: 60
    // },
    // [theme.breakpoints.up("lg")]: {
    //   marginLeft: 220
    // }
  },
  openDrawer: {
    marginLeft: 60,
    [theme.breakpoints.only("md")]: {
      marginLeft: 220
    }
  }
});

class PrivateRoute extends Component {
  state = {
    open: false
  };

  onToggleDrawer = open => {
    this.setState({ open });
  };

  render() {
    const {
      classes,
      component,
      content,
      exact,
      name,
      path,
      title
    } = this.props;
    const { open } = this.state;
    if (!Meteor.userId()) return <Redirect to="/" />;
    return (
      <Route
        exact={exact}
        path={path}
        render={props => (
          <Fragment>
            <Helmet>
              <title>{`${Meteor.settings.public.appName} | ${title}`}</title>
              <meta name={name} content={content} />
            </Helmet>
            <NavigationLayout handleToggleDrawer={this.onToggleDrawer} />
            <main
              className={classNames(classes.main, open && classes.openDrawer)}
            >
              {React.createElement(component)}
            </main>
          </Fragment>
        )}
      />
    );
  }
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  content: PropTypes.string,
  exact: PropTypes.bool,
  name: PropTypes.string,
  path: PropTypes.string,
  title: PropTypes.string
};

export default withStyles(styles, { withTheme: true })(PrivateRoute);
