import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { withRouter } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";

import Spinner from "../components/utils/Spinner";

import MobileLayout from "../layouts/app/MobileLayout";

const styles = theme => ({});

const GET_NEAR_VENUES = gql`
  query nearVenues($coords: CoordsInput!) {
    nearVenues(coords: $coords) {
      _id
      name
      votes {
        owner
        a
        b
      }
      category {
        _id
        name
      }
      location {
        lat
        lng
      }
    }
  }
`;

class ResultsPage extends Component {
  render() {
    const { classes, location, width } = this.props;
    const { near, lat, lng } = location.state;
    return (
      <Query query={GET_NEAR_VENUES} variables={{ coords: { lat, lng } }}>
        {({ loading, data, error }) => {
          if (loading) return <Spinner />;
          if (error) return `Error: ${error}`;
          const { nearVenues } = data;
          return (
            <Grid container direction="column" style={{ flex: 1 }}>
              {isWidthUp("md", width) ? (
                <h1>DESKTOP LAYOUT</h1>
              ) : (
                <MobileLayout
                  venues={nearVenues}
                  place={{ near, coords: { lat, lng } }}
                />
              )}
            </Grid>
          );
        }}
      </Query>
    );
  }
}

export default withWidth()(withStyles(styles)(withRouter(ResultsPage)));
