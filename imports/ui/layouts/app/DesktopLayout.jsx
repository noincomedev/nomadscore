import React from "react";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import ListTab from "../tabs/ListTabLayout";
import MapTab from "../tabs/MapTabLayout";

const styles = theme => ({});

export default withStyles(styles, { withTheme: true })(
  ({ hostels, cafes, place, theme, refetch }) => (
    <Grid container style={{ minHeight: "100%" }}>
      <Grid item xs={8} style={{ backgroundColor: theme.palette.primary.dark }}>
        <MapTab place={place} hostels={hostels} cafes={cafes} />
      </Grid>
      <Grid item xs={4} style={{ height: "100%" }}>
        <ListTab
          place={place}
          hostels={hostels}
          cafes={cafes}
          refetch={refetch}
        />
      </Grid>
    </Grid>
  )
);
