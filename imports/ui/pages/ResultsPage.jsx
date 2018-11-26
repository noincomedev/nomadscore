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

const GET_RESULTS = gql`
  query search($coords: CoordsInput!) {
    search(coords: $coords) {
      cafes {
        name
        photourl
        location {
          address
          lat
          lng
        }
        providerid
        score {
          a
          b
        }
        type
      }
      hostels {
        name
        photourl
        location {
          address
          lat
          lng
        }
        providerid
        score {
          a
          b
        }
        type
      }
    }
  }
`;

class ResultsPage extends Component {
  render() {
    const { classes, location, width } = this.props;
    const { near, coords } = location.state;
    return (
      <Query query={GET_RESULTS} variables={{ coords }}>
        {({ loading, data, error }) => {
          if (loading) return <Spinner />;
          if (error) return `Error: ${error}`;
          const { search } = data;
          const { hostels, cafes } = search;
          return (
            <Grid container direction="column" style={{ flex: 1 }}>
              {isWidthUp("md", width) ? (
                <h1>DESKTOP LAYOUT</h1>
              ) : (
                <MobileLayout
                  hostels={hostels}
                  cafes={cafes}
                  place={{ near, coords }}
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
