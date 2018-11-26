import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

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
        <Grid item xs={6} style={{ marginTop: 8 }}>
          <Button
            variant="text"
            color="secondary"
            fullWidth
            onClick={this.toggleForm}
          >
            {showSignup ? "Log In" : "Create Account"}
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default AccountsFormsLayout;
