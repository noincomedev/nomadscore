import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Redirect, withRouter } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";

import Spinner from "../components/utils/Spinner";

import DesktopLayout from "../layouts/app/DesktopLayout";
import MobileLayout from "../layouts/app/MobileLayout";

const styles = theme => ({});

const GET_RESULTS = gql`
  query search($coords: CoordsInput!) {
    search(coords: $coords) {
      cafes {
        _id
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
        _id
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
    const { classes, history, location, width, loading } = this.props;
    const { near, coords } = location.state;
    if (loading) return <Spinner />;
    return (
      <Query query={GET_RESULTS} variables={{ coords }}>
        {({ loading, data, error, refetch }) => {
          if (loading) return <Spinner />;
          if (error)
            return (
              <Redirect
                to={{
                  pathname: "/scale",
                  state: { error: error.graphQLErrors[0].message }
                }}
              />
            );
          const { search } = data;
          const { hostels, cafes } = search;
          return (
            <Grid
              container
              direction={isWidthUp("sm", width) ? "row" : "column"}
              style={{ flex: 1 }}
            >
              {isWidthUp("sm", width) ? (
                <DesktopLayout
                  hostels={hostels}
                  cafes={cafes}
                  place={{ near, coords }}
                  refetch={refetch}
                />
              ) : (
                <MobileLayout
                  hostels={hostels}
                  cafes={cafes}
                  place={{ near, coords }}
                  refetch={refetch}
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
