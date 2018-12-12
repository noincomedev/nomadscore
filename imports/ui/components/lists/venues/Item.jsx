import React, { Component } from "react";
import classNames from "classnames";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import Spinner from "../../utils/Spinner";

import RateForm from "../../forms/RateForm";

const styles = theme => ({
  rootContainer: {
    maxHeight: "100%",
    backgroundColor: theme.palette.primary.dark,
    borderRadius: theme.spacing.unit * 2,
    padding: theme.spacing.unit,
    borderBottom: `1px solid ${theme.palette.grey[900]}`,
    borderRight: `1px solid ${theme.palette.grey[900]}`
  },
  accentButton: {
    border: `1px solid ${theme.palette.custom.accent} !important`,
    color: `${theme.palette.custom.accent} !important`
  },
  button: {
    fontSize: "0.65rem",
    color: theme.palette.secondary.light,
    border: `1px solid ${theme.palette.secondary.light}`
  },
  headline: {
    color: theme.palette.common.white,
    fontWeight: 800
  },
  photo: {
    borderRadius: "16px 0px 0px 16px",
    maxWidth: "100%",
    height: "100%",
    position: "absolute"
  }
});

const GET_VENUE = gql`
  query venue($providerid: ID!) {
    venue(providerid: $providerid) {
      _id
      providerid
      photourl
      score
      voted
    }
  }
`;

const CURRENT_USER = gql`
  query currentUser {
    user {
      _id
      profile {
        at
      }
    }
  }
`;

const CHECK_AT = gql`
  mutation checkAt($providerid: ID!) {
    checkAt(providerid: $providerid) {
      _id
      profile {
        at
      }
    }
  }
`;

const Item = withRouter(
  ({ classes, name, history, loading, data, theme, onToggle }) => {
    const { venue } = data;
    const renderScore = () => {
      const { score } = venue;
      if (score <= 2)
        return (
          <Typography variant="h4" align="center">
            😐
          </Typography>
        );
      if (score < 4) {
        return (
          <Typography variant="h4" align="center">
            🙂
          </Typography>
        );
      }
      if (score >= 4)
        return (
          <Typography variant="h4" align="center">
            😃
          </Typography>
        );
    };
    return (
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12} sm={8}>
          <Grid
            container
            component={Paper}
            elevation={5}
            classes={{ container: classes.rootContainer }}
          >
            <Grid item xs={4}>
              {!loading && (
                <Grid
                  container
                  alignItems="center"
                  style={{ height: "100%", position: "relative" }}
                >
                  {loading ? (
                    <Spinner />
                  ) : (
                    <img src={venue.photourl} className={classes.photo} />
                  )}
                </Grid>
              )}
            </Grid>
            <Grid
              item
              xs={8}
              style={{ display: "flex", flexDirection: "column", flex: 1 }}
            >
              <Grid container justify="center">
                <Typography
                  variant="h6"
                  classes={{ root: classes.headline }}
                  align="center"
                  paragraph
                >
                  {name}
                </Typography>
              </Grid>
              <Grid container justify="center" style={{ height: "100%" }}>
                <Grid item xs={8}>
                  <Grid
                    container
                    style={{ height: "100%" }}
                    direction="column"
                    justify="space-evenly"
                  >
                    <Typography
                      variant="caption"
                      style={{ color: theme.palette.grey[500] }}
                      align="center"
                    >
                      NOMADSCORE
                    </Typography>
                    {loading ? <Spinner size={15} /> : renderScore()}
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Grid
                    container
                    style={{ height: "100%" }}
                    direction="column"
                    justify="space-around"
                  >
                    <Mutation
                      awaitRefetchQueries
                      mutation={CHECK_AT}
                      variables={{ providerid: venue.providerid }}
                    >
                      {(checkAt, { data, error, loading }) => {
                        if (loading) return <Spinner size={15} />;
                        return (
                          <Button
                            variant="text"
                            color="secondary"
                            size="small"
                            classes={{ textSecondary: classes.button }}
                            onClick={event => {
                              checkAt().then(history.push("/at"));
                            }}
                          >
                            CHECK-IN
                          </Button>
                        );
                      }}
                    </Mutation>
                    {!venue.voted && (
                      <Button
                        variant="text"
                        color="secondary"
                        size="small"
                        classes={{
                          textSecondary: classNames(
                            classes.button,
                            classes.accentButton
                          )
                        }}
                        onClick={event => {
                          onToggle();
                        }}
                      >
                        RATE
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
);

class ToggableItem extends Component {
  state = {
    showForm: false
  };

  toggleForm = () => this.setState({ showForm: !this.state.showForm });

  render() {
    const { classes, data, name, theme, loading } = this.props;
    if (loading) return <Spinner />;
    const { showForm } = this.state;
    if (showForm)
      return (
        <RateForm
          providerid={data.venue.providerid}
          onToggle={this.toggleForm}
        />
      );
    return (
      <Item
        classes={classes}
        name={name}
        loading={loading}
        data={data}
        theme={theme}
        onToggle={this.toggleForm}
      />
    );
  }
}

export default withStyles(styles, { withTheme: true })(
  ({ classes, providerid, name, theme }) => (
    <Query query={GET_VENUE} variables={{ providerid }}>
      {({ error, loading, data }) => {
        if (error) return `Error: ${error}`;
        return (
          <ToggableItem
            classes={classes}
            name={name}
            loading={loading}
            data={data}
            theme={theme}
          />
        );
      }}
    </Query>
  )
);
