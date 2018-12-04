import React from "react";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";

const styles = theme => ({
  rootContainer: {
    borderBottom: `${theme.spacing.unit * 2}px solid ${
      theme.palette.secondary.main
    }`,
    backgroundColor: theme.palette.secondary.dark,
    padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 2}px ${theme
      .spacing.unit * 5}px ${theme.spacing.unit * 2}px`
  }
});

export default withWidth()(
  withStyles(styles, { withTheme: true })(({ classes, theme, width }) => (
    <Grid
      container
      classes={{ container: classes.rootContainer }}
      justify={isWidthUp("sm", width) ? "flex-end" : "center"}
    >
      <Grid item xs={10} sm={8} />
      <Grid item xs={10} sm={4}>
        <Grid container direction="column" alignItems="center">
          <Typography variant="caption" style={{ color: "white" }}>
            Developed by
          </Typography>
          <Button
            variant="outlined"
            href="https://www.noincomedev.me"
            style={{ color: theme.palette.custom.accent }}
          >
            NOINCOMEDEV
          </Button>
          <Grid container justify="center">
            <IconButton
              color="primary"
              href="https://www.instagram.com/noincomedev"
              style={{ color: "white" }}
            >
              <i className="fab fa-instagram" />
            </IconButton>
            <IconButton
              color="primary"
              href="https://www.twitter.com/noincomedev"
              style={{ color: "white" }}
            >
              <i className="fab fa-twitter" />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  ))
);
