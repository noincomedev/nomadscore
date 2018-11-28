import React, { Fragment } from "react";
import gql from "graphql-tag";
import { Bert } from "meteor/themeteorchef:bert";
import { graphql } from "react-apollo";
import { withRouter } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import NearMe from "@material-ui/icons/NearMe";
import ViewList from "@material-ui/icons/ViewList";
import LocalAtm from "@material-ui/icons/LocalAtm";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";

import Spinner from "../components/utils/Spinner";

const styles = () => ({});

const ScalePage = ({
  classes,
  loading,
  user,
  setAsProspect,
  location,
  width
}) => {
  if (loading) return <Spinner />;
  const { state } = location;
  if (state) {
    const { error } = state;
    switch (error) {
      case Meteor.settings.public.error.DAILY_LIMIT:
        return (
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            style={{ flex: 1 }}
          >
            <Typography variant="h2" color="default" paragraph>
              Ups!
            </Typography>
            <Typography variant="h6" color="primary" align="center" paragraph>
              {`Daily limit reached.
            ${
              user.prospect
                ? "We are working to deliver you this content!"
                : "We need to scale to deliver you this content."
            }`}
            </Typography>
            {user.prospect ? (
              <Typography variant="h6" color="default">
                We will contact you soon.
              </Typography>
            ) : (
              <Fragment>
                <Typography
                  variant="h6"
                  color="default"
                  paragraph
                  align="center"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "grey"
                  }}
                >
                  <NearMe />
                  GEOLOCALIZATION!
                </Typography>
                <Typography
                  variant="h6"
                  color="default"
                  paragraph
                  align="center"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "grey"
                  }}
                >
                  <ViewList />
                  Near you!
                </Typography>
                <Typography
                  variant="h6"
                  color="default"
                  paragraph
                  align="center"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "grey"
                  }}
                >
                  <LocalAtm />
                  ATMS!
                </Typography>
                <Typography
                  variant="caption"
                  color="default"
                  paragraph
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "grey"
                  }}
                >
                  {` { Unlimited searches up to 50 results } `}
                </Typography>
                <Button
                  onClick={event => {
                    setAsProspect().then(result => {
                      Bert.alert({
                        title: "SUCCESS",
                        message: "We will contact you soon.",
                        type: "success",
                        style: isWidthUp("md", width)
                          ? "growl-top-right"
                          : "fixed-top",
                        icon: "fa-check"
                      });

                      client.resetStore(cb => history.push("/"));
                    });
                  }}
                  color="primary"
                  variant="contained"
                >
                  REQUEST FAST!
                </Button>
              </Fragment>
            )}
          </Grid>
        );
    }
  }

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ flex: 1 }}
    >
      <Typography variant="h2" color="default" paragraph>
        Ups!
      </Typography>
      <Typography variant="h6" color="primary" align="center" paragraph>
        {user.restricted && !user.prospect
          ? "Daily limit reached."
          : user.prospect
          ? "We are working to deliver you this content!"
          : "We need to scale to deliver you this content."}
      </Typography>
      {user.prospect ? (
        <Typography variant="h6" color="default">
          We will contact you soon.
        </Typography>
      ) : (
        <Fragment>
          <Typography
            variant="h6"
            color="default"
            paragraph
            align="center"
            style={{ display: "flex", alignItems: "center", color: "grey" }}
          >
            <NearMe />
            GEOLOCALIZATION!
          </Typography>
          <Typography
            variant="h6"
            color="default"
            paragraph
            align="center"
            style={{ display: "flex", alignItems: "center", color: "grey" }}
          >
            <ViewList />
            Near you!
          </Typography>
          <Typography
            variant="h6"
            color="default"
            paragraph
            align="center"
            style={{ display: "flex", alignItems: "center", color: "grey" }}
          >
            <LocalAtm />
            ATMS!
          </Typography>
          <Typography
            variant="caption"
            color="default"
            paragraph
            style={{ display: "flex", alignItems: "center", color: "grey" }}
          >
            {` { Unlimited searches up to 50 results } `}
          </Typography>
          <Button
            onClick={event => {
              setAsProspect().then(result => {
                Bert.alert({
                  title: "SUCCESS",
                  message: "We will contact you soon.",
                  type: "success",
                  style: isWidthUp("md", width)
                    ? "growl-top-right"
                    : "fixed-top",
                  icon: "fa-check"
                });

                client.resetStore(cb => history.push("/"));
              });
            }}
            color="primary"
            variant="contained"
          >
            REQUEST FAST!
          </Button>
        </Fragment>
      )}
    </Grid>
  );
};

const SET_AS_PROSPECT = gql`
  mutation setAsProspect {
    setAsProspect {
      _id
    }
  }
`;

export default graphql(SET_AS_PROSPECT, { name: "setAsProspect" })(
  withWidth()(withStyles(styles)(withRouter(ScalePage)))
);
