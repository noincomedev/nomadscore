import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import Item from "./PriceItemLayout";

const styles = theme => ({
  rootContainer: {
    backgroundColor: theme.palette.primary.dark,
    padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 2}px ${theme
      .spacing.unit * 5}px ${theme.spacing.unit * 2}px`,
    borderBottom: `${theme.spacing.unit * 2}px solid ${
      theme.palette.primary.main
    }`
  },
  headline: {
    color: theme.palette.common.white
  },
  subheading: {
    color: theme.palette.common.white
  }
});

const CURRENT_USER = gql`
  query user {
    user {
      prospect
    }
  }
`;

export default graphql(CURRENT_USER, {
  options: {
    fetchPolicy: "cache-and-network"
  },
  props: ({ data }) => ({ ...data })
})(
  withStyles(styles)(({ classes, user }) => {
    return (
      <Grid
        container
        classes={{ container: classes.rootContainer }}
        justify="center"
      >
        <Grid item xs={12} sm={8}>
          <Typography
            variant="h3"
            color="default"
            align="center"
            classes={{ root: classes.headline }}
            paragraph
          >
            Pricing
          </Typography>
          <Typography
            variant="h5"
            align="center"
            classes={{ root: classes.subheading }}
            paragraph
          >
            Which kind of nomad are you?
          </Typography>
        </Grid>
        <Grid container justify="center">
          {!Meteor.userId() && <Item slow />}
          <Hidden xsUp={user ? user.prospect : false}>
            <Item />
          </Hidden>
        </Grid>
      </Grid>
    );
  })
);
