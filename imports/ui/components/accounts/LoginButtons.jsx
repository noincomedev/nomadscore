import React, { Component } from "react";
import { Bert } from "meteor/themeteorchef:bert";
import { withApollo } from "react-apollo";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  fbButton: {
    backgroundColor: theme.palette.custom.facebookBlue,
    color: theme.palette.common.white
  }
});

class LoginButtons extends Component {
  handleFacebookLogin = () => {
    const { client, width } = this.props;
    Meteor.loginWithFacebook(
      {
        requestPermissions: ["public_profile"]
      },
      error => {
        Bert.alert({
          title: error ? "Error!" : "WELLCOME",
          message: error ? error.reason : "You are now logged in",
          type: error ? "danger" : "success",
          style: isWidthUp("md", width) ? "growl-top-right" : "fixed-top",
          icon: error ? "fa-remove" : "fa-check"
        });
        if (!error) {
          client.resetStore();
        }
      }
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        <Button
          variant="contained"
          size="large"
          fullWidth
          classes={{ contained: classes.fbButton }}
          onClick={this.handleFacebookLogin}
        >
          <i className="fab fa-facebook-square" style={{ marginLeft: 8 }} />
          Login with FB
        </Button>
      </Grid>
    );
  }
}

export default withApollo(withWidth()(withStyles(styles)(LoginButtons)));
