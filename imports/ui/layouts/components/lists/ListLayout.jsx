import React from "react";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({});

export default withStyles(styles)(({ classes, children }) => (
  <Grid container style={{ padding: 16 }}>
    {children}
  </Grid>
));
