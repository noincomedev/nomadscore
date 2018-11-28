import React, { Component } from "react";
import classNames from "classnames";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";

import Spinner from "../../utils/Spinner";

const styles = theme => ({
  button: {
    padding: theme.spacing.unit / 4,
    fontSize: "1.89rem"
  },
  greenButton: {
    color: "green",
    margin: theme.spacing.unit / 4,
    padding: 0
  },
  redButton: {
    color: "red",
    margin: theme.spacing.unit / 4,
    padding: 0
  },
  yellowButton: {
    color: theme.palette.secondary.main,
    margin: theme.spacing.unit / 4,
    padding: 0
  }
});

class CafeRatingForm extends Component {
  state = {
    taste: 0,
    wifi: 0,
    loading: false
  };

  toggleLoading = () => this.setState({ loading: !this.state.loading });

  submitVote = () => {
    this.toggleLoading();
    const { venueid, width, onResult } = this.props;
    const { taste, wifi } = this.state;
    this.props
      .submitVote({ variables: { vote: { venueid, a: taste, b: wifi } } })
      .then(({ data }) => {
        Bert.alert({
          title: "Success",
          message: "Your vote has been saved.",
          type: "success",
          style: isWidthUp("md", width) ? "growl-top-right" : "fixed-top",
          icon: "fa-check"
        });
        onResult();
      })
      .catch(error =>
        Bert.alert({
          title: error ? "Error!" : "WELLCOME",
          message: error ? error.reason : "You are now logged in",
          type: error ? "danger" : "success",
          style: isWidthUp("md", width) ? "growl-top-right" : "fixed-top",
          icon: error ? "fa-remove" : "fa-check"
        })
      );
  };

  updateRate = (name, value) => {
    this.setState({ [name]: value });
  };

  render() {
    const { classes } = this.props;
    const { taste, wifi, loading } = this.state;
    if (loading) return <Spinner />;
    return (
      <Grid container>
        <Grid
          item
          xs={12}
          component={Paper}
          elevation={2}
          style={{ margin: 2 }}
        >
          <Grid container style={{ padding: 8 }} justify="space-between">
            <Grid item xs={2}>
              <Grid
                container
                style={{ height: "100%" }}
                justify="center"
                alignItems="center"
              >
                <i className="fas fa-coffee" />
              </Grid>
            </Grid>
            <Grid item xs={10}>
              <Grid
                container
                alignItems="center"
                justify="flex-end"
                style={{ height: "100%" }}
              >
                <IconButton
                  variant="text"
                  size="small"
                  classes={{
                    root: classNames(
                      classes.button,
                      taste == 1 && classes.redButton
                    )
                  }}
                  onClick={event => {
                    this.updateRate("taste", 1);
                  }}
                  size="small"
                >
                  😕
                </IconButton>
                <IconButton
                  variant="text"
                  size="small"
                  classes={{
                    root: classNames(
                      classes.button,
                      taste == 3 && classes.yellowButton
                    )
                  }}
                  onClick={event => {
                    this.updateRate("taste", 3);
                  }}
                >
                  🙂
                </IconButton>
                <IconButton
                  variant="text"
                  size="small"
                  classes={{
                    root: classNames(
                      classes.button,
                      taste == 5 && classes.greenButton
                    )
                  }}
                  onClick={event => {
                    this.updateRate("taste", 5);
                  }}
                >
                  😃
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          component={Paper}
          elevation={2}
          style={{ margin: 2 }}
        >
          <Grid container style={{ padding: 8 }} justify="space-between">
            <Grid item xs={2}>
              <Grid
                container
                style={{ height: "100%" }}
                justify="center"
                alignItems="center"
              >
                <i className="fas fa-wifi fa-2x" />
              </Grid>
            </Grid>
            <Grid item xs={10}>
              <Grid
                container
                alignItems="center"
                justify="flex-end"
                style={{ height: "100%" }}
              >
                <IconButton
                  variant="text"
                  size="small"
                  classes={{
                    root: classNames(
                      classes.button,
                      wifi == 1 && classes.redButton
                    )
                  }}
                  onClick={event => {
                    this.updateRate("wifi", 1);
                  }}
                  size="small"
                >
                  😕
                </IconButton>
                <IconButton
                  variant="text"
                  size="small"
                  classes={{
                    root: classNames(
                      classes.button,
                      wifi == 3 && classes.yellowButton
                    )
                  }}
                  onClick={event => {
                    this.updateRate("wifi", 3);
                  }}
                >
                  🙂
                </IconButton>
                <IconButton
                  variant="text"
                  size="small"
                  classes={{
                    root: classNames(
                      classes.button,
                      wifi == 5 && classes.greenButton
                    )
                  }}
                  onClick={event => {
                    this.updateRate("wifi", 5);
                  }}
                >
                  😃
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {wifi > 0 && taste > 0 && (
          <Grid container justify="center">
            <Grid item xs={6} style={{ paddingTop: 8 }}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={this.submitVote}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>
    );
  }
}

const SUBMIT_VOTE = gql`
  mutation submitVote($vote: VoteInput!) {
    submitVote(vote: $vote) {
      _id
    }
  }
`;

export default graphql(SUBMIT_VOTE, { name: "submitVote" })(
  withWidth()(withStyles(styles)(CafeRatingForm))
);
