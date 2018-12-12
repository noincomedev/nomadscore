import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import { Bert } from "meteor/themeteorchef:bert";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";

import CustomMarker from "../../../components/utils/CustomMarker";
import Spinner from "../../../components/utils/Spinner";

import RateForm from "../../../components/forms/RateForm";

import ScoreCard from "./ScoreCardLayout";

const styles = theme => ({
  rootContainer: {
    height: "100%",
    flex: 1,
    backgroundColor: theme.palette.primary.main,
    paddingBottom: theme.spacing.unit * 2
  },
  avatar: {
    height: 75,
    width: 75,
    border: `2px solid ${theme.palette.common.white}`
  },
  contrastButton: {
    "&:hover": {
      backgroundColor: theme.palette.custom.accent,
      color: theme.palette.secondary.dark
    }
  },
  darkButton: {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.primary.dark
    }
  },
  headerContainer: {
    padding: theme.spacing.unit,
    borderRadius: "50px 25px 25px 50px",
    padding: theme.spacing.unit * 2,
    backgroundColor: theme.palette.primary.dark
  },
  name: {
    color: theme.palette.common.white
  },
  photo: {
    maxWidth: "100%",
    position: "absolute"
  },
  subtitle: {
    padding: theme.spacing.unit,
    color: theme.palette.secondary.light,
    background: theme.palette.primary.dark
  }
});

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

const CHECK_OUT = gql`
  mutation checkOut {
    checkOut {
      _id
      profile {
        at
      }
    }
  }
`;

const Map = ReactMapboxGl({
  accessToken: Meteor.settings.public.mapbox.API_KEY,
  interactive: false
});

class AtVenueLayout extends Component {
  state = {
    showForm: false
  };

  toggleForm = () => this.setState({ showForm: !this.state.showForm });

  render() {
    const { classes, venue, width, theme, history } = this.props;
    const { showForm } = this.state;

    return (
      <Grid
        container
        classes={{ container: classes.rootContainer }}
        alignContent="space-between"
      >
        <Grid item xs={12}>
          <div
            style={{
              height: isWidthUp("sm", width) ? "33vh" : "33vh",
              paddingBottom: 8
            }}
          >
            <Map
              style="mapbox://styles/mapbox/streets-v9"
              containerStyle={{
                height: "100%",
                width: "100%"
              }}
              center={[venue.location.lng, venue.location.lat]}
              zoom={[15]}
            >
              <Marker
                key={venue.providerid}
                coordinates={[venue.location.lng, venue.location.lat]}
                anchor="bottom"
                className={classes.icon}
              >
                <CustomMarker
                  active={false}
                  providercategoryid={venue.providercategoryid}
                />
              </Marker>
            </Map>
          </div>
        </Grid>
        <Grid container justify="center">
          <Grid item xs={12} style={{ padding: 8 }}>
            <Grid container alignItems="center" justify="space-around">
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  color="secondary"
                  style={{ color: theme.palette.grey[500] }}
                  align="center"
                >
                  Currently at
                </Typography>
              </Grid>
              <Grid container justify="center">
                <Grid item xs={12} sm={8}>
                  <Grid
                    container
                    classes={{ container: classes.headerContainer }}
                    component={Paper}
                    elevation={8}
                  >
                    <Grid item xs={3}>
                      <Avatar
                        src={venue.photourl}
                        classes={{ root: classes.avatar }}
                      />
                    </Grid>
                    <Grid item xs={9}>
                      <Grid
                        container
                        direction="column"
                        justify="center"
                        style={{ height: "100%" }}
                      >
                        <Typography
                          variant="h5"
                          align="center"
                          classes={{ root: classes.name }}
                        >
                          {venue.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="default"
                          align="center"
                          style={{ color: theme.palette.grey[400] }}
                        >
                          {venue.location.address}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justify="center">
          {showForm ? (
            <RateForm
              onToggle={this.toggleForm}
              providerid={venue.providerid}
            />
          ) : (
            <ScoreCard score={venue.score} votesCount={venue.votesCount} />
          )}
        </Grid>
        {!showForm && (
          <Grid container justify="space-around">
            <Grid item xs={venue.voted ? 9 : 5}>
              <Mutation
                mutation={CHECK_OUT}
                update={(cache, { data: { checkOut } }) => {
                  const { user } = cache.readQuery({ query: CURRENT_USER });
                  cache.writeQuery({
                    query: CURRENT_USER,
                    data: { user: checkOut }
                  });
                }}
              >
                {(checkOut, { error, loading, data }) => {
                  if (loading) return <Spinner />;
                  if (error)
                    Bert.alert({
                      title: "Error!",
                      message: "Something went wrong. Please try again",
                      type: "warning",
                      style: isWidthUp("sm", width)
                        ? "growl-top-right"
                        : "fixed-top",
                      icon: "fa-warning"
                    });
                  return (
                    <Button
                      variant="contained"
                      classes={{ contained: classes.darkButton }}
                      fullWidth
                      size="large"
                      onClick={event => {
                        checkOut().then(history.push("/"));
                      }}
                    >
                      Check Out
                    </Button>
                  );
                }}
              </Mutation>
            </Grid>
            {!venue.voted && (
              <Grid item xs={venue.voted ? 9 : 5}>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  size="large"
                  classes={{ containedSecondary: classes.contrastButton }}
                  onClick={this.toggleForm}
                >
                  Rate
                </Button>
              </Grid>
            )}
          </Grid>
        )}
      </Grid>
    );
  }
}

export default withWidth()(
  withStyles(styles, { withTheme: true })(withRouter(AtVenueLayout))
);
