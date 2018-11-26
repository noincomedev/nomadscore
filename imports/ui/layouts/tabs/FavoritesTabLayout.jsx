import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Star from "@material-ui/icons/Star";

export default () => (
  <Grid container direction="column" justify="center" style={{ flex: 1 }}>
    <Typography variant="h4" align="center">
      Soon you will be able to <br />
      <Star style={{ fontSize: "4rem", color: "rgb(29,233,182)" }} />
    </Typography>
  </Grid>
);
