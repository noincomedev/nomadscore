import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, Query } from "react-apollo";
import { Redirect } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import Spinner from "../components/utils/Spinner";

import AtVenue from "../layouts/components/venue/AtVenueLayout";

const styles = (theme = {});

const CURRENT_USER = gql`
  query user {
    user {
      _id
      profile {
        at
      }
    }
  }
`;

const CURRENT_VENUE = gql`
  query venue($providerid: ID!) {
    venue(providerid: $providerid) {
      _id
      providerid
      providercategoryid
      name
      score
      voted
      location {
        lat
        lng
        address
      }
      type
      photourl
      votesCount
    }
  }
`;

class CheckedAtPage extends Component {
  render() {
    const { classes, loading, user, theme } = this.props;
    if (!user) return <Spinner />;
    const { at } = user.profile;
    if (at && !loading) {
      return (
        <Query query={CURRENT_VENUE} variables={{ providerid: at }}>
          {({ loading, error, data }) => {
            if (loading)
              return (
                <Grid
                  container
                  style={{
                    flex: 1,
                    height: "100%",
                    backgroundColor: theme.palette.primary.main
                  }}
                >
                  <Spinner />
                </Grid>
              );
            if (error) return `Error: ${error}`;
            const { venue } = data;
            return <AtVenue venue={venue} />;
          }}
        </Query>
      );
    } else {
      return (
        <Grid
          container
          style={{
            flex: 1,
            height: "100%",
            backgroundColor: theme.palette.primary.main
          }}
        >
          <Spinner />
        </Grid>
      );
    }
  }
}

export default graphql(CURRENT_USER, { props: ({ data }) => ({ ...data }) })(
  withStyles(styles, { withTheme: true })(CheckedAtPage)
);
