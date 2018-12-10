import React, { Component } from "react";
import classNames from "classnames";
import gql from "graphql-tag";
import { Bert } from "meteor/themeteorchef:bert";
import { Mutation } from "react-apollo";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";

import Spinner from "../utils/Spinner";

const styles = theme => ({
  disabledButton: {
    backgroundColor: `${theme.palette.secondary.dark} !important`,
    color: `${theme.palette.custom.accent} !important`
  },
  greenButton: {
    color: "green"
  },
  redButton: {
    color: "red"
  },
  selected: {
    fontSize: "2.5rem"
  },
  yellowButton: {
    color: "yellow"
  }
});

const SUBMIT_VOTE = gql`
  mutation submitVote($vote: VoteInput!) {
    submitVote(vote: $vote) {
      _id
      providerid
      score
      voted
    }
  }
`;

class RateForm extends Component {
  state = {
    loading: false,
    score: 0
  };

  toggleLoading = () => this.setState({ loading: !this.state.loading });

  updateRate = value => {
    this.setState({ score: value });
  };

  render() {
    const { classes, providerid, onToggle, width } = this.props;
    const { score } = this.state;
    return (
      <Grid container>
        <Grid
          item
          xs={12}
          component={Paper}
          elevation={2}
          style={{ margin: 2 }}
        >
          <Grid
            container
            style={{ padding: 8, heihgt: "100%" }}
            justify="space-between"
          >
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
                      score == 1 && classes.redButton,
                      score == 1 && classes.selected
                    )
                  }}
                  onClick={event => {
                    this.updateRate(1);
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
                      score == 3 && classes.yellowButton,
                      score == 3 && classes.selected
                    )
                  }}
                  onClick={event => {
                    this.updateRate(3);
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
                      score == 5 && classes.greenButton,
                      score == 5 && classes.selected
                    )
                  }}
                  onClick={event => {
                    this.updateRate(5);
                  }}
                >
                  😃
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Grid item xs={6} style={{ padding: 4 }}>
            <Button
              variant="contained"
              color="default"
              fullWidth
              onClick={event => {
                onToggle();
              }}
            >
              Cancel
            </Button>
          </Grid>
          <Mutation
            awaitRefetchQueries
            mutation={SUBMIT_VOTE}
            variables={{ vote: { providerid, score } }}
          >
            {(submitVote, { data, error, loading }) => {
              if (loading) return <Spinner size={25} />;
              return (
                <Grid item xs={6} style={{ padding: 4 }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={event => {
                      submitVote()
                        .then(result => {
                          Bert.alert({
                            title: "Success",
                            message: "Your rate has been saved.",
                            type: "success",
                            style: isWidthUp("md", width)
                              ? "growl-top-right"
                              : "fixed-top",
                            icon: "fa-check"
                          });
                          onToggle();
                        })
                        .catch(error =>
                          Bert.alert({
                            title: error ? "Error!" : "WELLCOME",
                            message: error
                              ? error.reason
                              : "You are now logged in",
                            type: error ? "danger" : "success",
                            style: isWidthUp("md", width)
                              ? "growl-top-right"
                              : "fixed-top",
                            icon: error ? "fa-remove" : "fa-check"
                          })
                        );
                    }}
                    disabled={score == 0}
                    classes={{
                      disabled: classes.disabledButton
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
              );
            }}
          </Mutation>
        </Grid>
      </Grid>
    );
  }
}

export default withWidth()(withStyles(styles)(RateForm));
