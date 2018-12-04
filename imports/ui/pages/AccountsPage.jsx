import React from "react";
import { withRouter } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import Accounts from "../layouts/components/accounts/AccountsFormsLayout";

const styles = theme => ({
  rootContainer: { flex: 1 }
});

const AccountsPage = ({ classes, location }) => {
  const { state } = location;
  if (state) {
    const { near, coords, categories, asProspect, isUser } = state;
    if (coords) {
      const place = {
        near,
        coords
      };
      return (
        <Grid
          container
          direction="column"
          justify="center"
          classes={{ container: classes.rootContainer }}
        >
          <Accounts
            place={place}
            asProspect={asProspect}
            isUser={isUser}
            categories={categories}
          />
        </Grid>
      );
    } else {
      return (
        <Grid
          container
          direction="column"
          justify="center"
          classes={{ container: classes.rootContainer }}
        >
          <Accounts asProspect={asProspect} isUser={isUser} />
        </Grid>
      );
    }
  }
  return (
    <Grid
      container
      direction="column"
      justify="center"
      classes={{ container: classes.rootContainer }}
    >
      <Accounts />
    </Grid>
  );
};

export default withStyles(styles)(withRouter(AccountsPage));
