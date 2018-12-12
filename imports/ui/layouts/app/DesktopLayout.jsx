import React from "react";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import ListTab from "../tabs/ListTabLayout";
import MapTab from "../tabs/MapTabLayout";

const styles = theme => ({});

export default withStyles(styles, { withTheme: true })(
  ({ venues, place, theme, refetch }) => (
    <Grid container style={{ minHeight: "100%" }}>
      <Grid
        item
        xs={12}
        style={{ backgroundColor: theme.palette.primary.dark }}
      >
        <MapTab place={place} venues={venues} />
      </Grid>
    </Grid>
  )
);
