import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import SigninForm from "../../../components/forms/accounts/SigninForm";
import SignupForm from "../../../components/forms/accounts/SignupForm";

class AccountsFormsLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUser: props.isUser
    };
  }

  toggleForm = () => this.setState({ isUser: !this.state.isUser });

  render() {
    const { place, asProspect, categories } = this.props;
    const { isUser } = this.state;
    return (
      <Grid container justify="center">
        {isUser ? (
          <SigninForm place={place} categories={categories} />
        ) : (
          <SignupForm
            place={place}
            categories={categories}
            asProspect={asProspect}
          />
        )}
        <Grid item xs={9} sm={3} style={{ marginTop: 8 }}>
          <Button
            variant="text"
            color="secondary"
            fullWidth
            onClick={this.toggleForm}
          >
            {isUser ? "Sign Up" : "Log In"}
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default AccountsFormsLayout;
