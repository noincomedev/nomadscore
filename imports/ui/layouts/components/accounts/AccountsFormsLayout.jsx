import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import SigninForm from "../../../components/forms/accounts/SigninForm";
import SignupForm from "../../../components/forms/accounts/SignupForm";

class AccountsFormsLayout extends Component {
  state = {
    showSignup: false
  };

  toggleForm = () => this.setState({ showSignup: !this.state.showSignup });

  render() {
    const { place } = this.props;
    const { showSignup } = this.state;
    return (
      <Grid container justify="center">
        {!showSignup ? (
          <SigninForm place={place} />
        ) : (
          <SignupForm place={place} />
        )}
        {!showSignup && (
          <Grid item xs={6} style={{ marginTop: 8 }}>
            <Typography variant="caption" color="default" align="center">
              Don't have an account?
            </Typography>
            <Button variant="text" color="secondary" onClick={this.toggleForm}>
              Create Account
            </Button>
          </Grid>
        )}
      </Grid>
    );
  }
}

export default AccountsFormsLayout;
