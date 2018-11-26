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

class SignupForm extends Component {
  state = { email: "", password: "", confirmPassword: "", loading: false };

  handleChange = event => {
    const name = event.target.id,
      value = event.target.value;

    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { client, history, width, place } = this.props;
    let { email, password } = this.state;
    let params = {
      email,
      password
    };
    this.toggleLoading();
    Accounts.createUser(params, error => {
      Bert.alert({
        title: error ? "Error!" : "Success",
        message: error ? error.reason : "You are now logged in",
        type: error ? "danger" : "success",
        style: isWidthUp("md", width) ? "growl-top-right" : "fixed-top",
        icon: error ? "fa-remove" : "fa-check"
      });
      if (!error) {
        if (place) {
          const { near, coords } = place;
          client.resetStore();
          history.push("/find/near", { near, coords });
        } else {
          client.resetStore(cd => history.push("/"));
        }
      }
    });
    this.toggleLoading();
  };

  toggleLoading = () => this.setState({ loading: !this.state.loading });

  render() {
    const { classes } = this.props;
    const { email, password, confirmPassword, loading } = this.state;
    const rules = {
      password: {
        required: true,
        minlength: 6
      },
      confirmPassword: {
        required: true,
        minlength: 6,
        equalTo: "#password"
      }
    };
    if (loading) return <Spinner />;
    return (
      <Form
        onHandleSubmit={this.handleSubmit}
        style={{ width: "100%" }}
        rules={rules}
      >
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
            <TextField
              label="Confirm Password"
              value={confirmPassword}
              type="password"
              required
              onChange={this.handleChange}
              id="confirmPassword"
              name="confirmPassword"
              fullWidth
              margin="dense"
            />
            <Typography
              variant="caption"
              color="default"
              align="center"
              style={{ marginTop: 8, color: "grey" }}
              paragraph
            >
              We track and store the least amount of data from you, <br />
              mainly your email and password. <br />
              We promise no spam at all!
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </Form>
    );
  }
}

export default withApollo(
  withWidth()(withStyles(styles)(withRouter(SignupForm)))
);
