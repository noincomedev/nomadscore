import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const background =
  "https://images.unsplash.com/photo-1513258496099-48168024aec0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=73c00aaa6d23115d7fbe494c0cc1e5e3&auto=format&fit=crop&w=2100&q=80";

const styles = theme => ({
  rootContainer: {
    backgroundColor: theme.palette.primary.main,
    backgroundImage: `linear-gradient(rgba(103,58,183, 0.33),rgba(103,58,183, 0.33)),
                      url(${background})`,
    backgroundSize: "cover",
    padding: theme.spacing.unit * 4,
    minHeight: "55vh"
  },
  headline: {
    color: theme.palette.custom.accent
  }
});

export default withStyles(styles)(({ classes }) => (
  <Grid
    container
    classes={{ container: classes.rootContainer }}
    alignItems="center"
    alignContent="center"
    justify="center"
    direction="column"
  >
    <Typography
      variant="h3"
      align="center"
      classes={{ root: classes.headline }}
    >
      HELP OTHER NOMADS
    </Typography>
    <Typography
      variant="h5"
      align="center"
      style={{ color: "white", fontWeight: 400 }}
    >
      Rate cafes and hostels wi-fi networks!
    </Typography>
  </Grid>
));
