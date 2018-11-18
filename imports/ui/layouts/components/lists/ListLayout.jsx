import React from "react";

import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  divider: {
    paddingBottom: theme.spacing.unit / 4,
    backgroundColor: theme.palette.secondary.main
  },
  listHeadingContainer: {
    position: "fixed",
    background: theme.palette.background.default,
    padding: theme.spacing.unit,
    zIndex: 999
  },
  tabContentContainer: {
    width: "100%",
    minHeight: "37vh",
    maxHeight: "34vh",
    overflow: "scroll"
  }
});

export default withStyles(styles)(({ classes, children, title }) => (
  <div className={classes.tabContentContainer}>
    <Grid container classes={{ container: classes.listHeadingContainer }}>
      <Grid item xs={12}>
        <Typography variant="h6">{title}</Typography>
        <Divider classes={{ root: classes.divider }} />
      </Grid>
    </Grid>
    <Grid container style={{ marginTop: 35, padding: 16 }}>
      {children}
    </Grid>
  </div>
));
