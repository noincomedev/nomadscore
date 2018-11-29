import React, { Component } from "react";
import { withApollo } from "react-apollo";
import { withRouter } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";

import Form from "../../utils/ValidatedForm";
import Spinner from "../../utils/Spinner";

const styles = theme => ({});

class SigninForm extends Component {
  state = { email: "", password: "", loading: false };

  handleChange = event => {
    const name = event.target.id,
      value = event.target.value;

    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { client, history, width, place } = this.props;
    let { email, password } = this.state;
    this.toggleLoading();

    Meteor.loginWithPassword(email, password, error => {
      if (!error) {
        client.resetStore();
        if (place) {
          const { near, coords } = place;
          history.push("/find/near", { near, coords });
        } else {
          history.push("/");
        }
      }
      Bert.alert({
        title: error ? "Error!" : "Success",
        message: error ? error.reason : "You are now logged in",
        type: error ? "danger" : "success",
        style: isWidthUp("md", width) ? "growl-top-right" : "fixed-top",
        icon: error ? "fa-remove" : "fa-check"
      });
    });

    this.toggleLoading();
  };

  toggleLoading = () => this.setState({ loading: !this.state.loading });

  render() {
    const { classes } = this.props;
    const { email, password, loading } = this.state;
    return loading ? (
      <Spinner />
    ) : (
      <Form onHandleSubmit={this.handleSubmit} style={{ width: "100%" }}>
        <Grid container justify="center">
          <Grid item xs={9}>
            <TextField
              label="Email"
              placeholder="your@email.com"
              value={email}
              type="email"
              required
              onChange={this.handleChange}
              id="email"
              name="email"
              fullWidth
            />
            <TextField
              label="Password"
              value={password}
              type="password"
              required
              onChange={this.handleChange}
              id="password"
              name="password"
              fullWidth
            />
          </Grid>
          <Grid item xs={5} style={{ marginTop: 8 }}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Sign In
            </Button>
          </Grid>
        </Grid>
      </Form>
    );
  }
}

export default withApollo(
  withWidth()(withStyles(styles)(withRouter(SigninForm)))
);
