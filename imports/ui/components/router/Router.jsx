import React from "react";
import gql from "graphql-tag";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { graphql } from "react-apollo";

import theme from "../../../assets/theme";

import ScrollTop from "../utils/ScrollTop";
import Spinner from "../utils/Spinner";

import PublicRoute from "./PublicRoute";
import MultiRoute from "./MultiRoute";

import LandingPage from "../../pages/LandingPage";
import ResultsPage from "../../pages/ResultsPage";
import NotFound from "../../pages/NotFound";

const Router = ({ loading, user }) => {
  if (loading) return <Spinner color="secondary" />;
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <ScrollTop>
          <Switch>
            <MultiRoute
              exact
              path="/"
              component={LandingPage}
              name="landing-page"
              content="index"
              title="Home"
            />
            <MultiRoute
              exact
              path="/find/near"
              content="map-venues"
              name="results"
              title="Results"
              component={ResultsPage}
            />
            <PublicRoute
              component={NotFound}
              name="not-found"
              content="404"
              title="Error!"
            />
          </Switch>
        </ScrollTop>
      </MuiThemeProvider>
    </BrowserRouter>
  );
};

const CURRENT_USER = gql`
  query currentUser {
    user {
      _id
    }
  }
`;

export default graphql(CURRENT_USER, {
  options: {
    fetchPolicy: "cache-and-network"
  },
  props: ({ data }) => ({ ...data })
})(Router);
