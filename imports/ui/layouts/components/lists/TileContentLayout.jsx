import React from "react";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  rootContainer: {},
  background: {
    position: "absolute",
    width: "100%",
    height: "100%"
  }
});

export default withStyles(styles)(({ classes, background, children }) => (
  <Grid container classes={{ container: classes.rootContainer }}>
    <img src={background} className={classes.background} />
    {children}
  </Grid>
));
