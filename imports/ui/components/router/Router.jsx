import React from "react";
import gql from "graphql-tag";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { graphql } from "react-apollo";

import theme from "../../../assets/theme";

import ScrollTop from "../utils/ScrollTop";
import Spinner from "../utils/Spinner";

import MultiRoute from "./MultiRoute";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

import AccountsPage from "../../pages/AccountsPage";
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
            <PrivateRoute
              exact
              path="/find/near"
              content="map-venues"
              name="results"
              title="Results"
              component={ResultsPage}
            />
            <MultiRoute
              exact
              path="/accounts"
              content="accounts"
              name="accounts"
              title="Accounts"
              component={AccountsPage}
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
      prospect
    }
  }
`;

export default graphql(CURRENT_USER, {
  options: {
    fetchPolicy: "cache-and-network"
  },
  props: ({ data }) => ({ ...data })
})(Router);
