import React from "react";
import { PropTypes } from "prop-types";

import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  container: {
    margin: "auto",
    minHeight: "100%"
  }
});

let Spinner = ({ classes, color, size }) => (
  <Grid container justify="center" classes={{ container: classes.container }}>
    <CircularProgress
      size={size ? size : 50}
      style={{ color: color ? color : "#673ab7" }}
      variant="indeterminate"
    />
  </Grid>
);

Spinner.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number
};

export default withStyles(styles)(Spinner);
