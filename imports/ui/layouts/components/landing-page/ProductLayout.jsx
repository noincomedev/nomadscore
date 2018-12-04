import React from "react";
import classNames from "classnames";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import withWidth, { isWidthUp, isWidthDown } from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  rootContainer: {
    padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 2}px ${theme
      .spacing.unit * 5}px ${theme.spacing.unit * 2}px`,
    borderBottom: `${theme.spacing.unit * 2}px solid ${
      theme.palette.secondary.main
    }`
  },
  featureContainer: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    padding: theme.spacing.unit
  },
  headline: {
    paddingBottom: theme.spacing.unit * 2,
    borderBottom: `5px solid ${theme.palette.custom.accent}`
  },
  img: { maxWidth: "100%" },
  large: {
    maxHeight: "55vh"
  },
  small: {
    maxHeight: "33vh",
    maxWidth: "100%",
    marginBottom: theme.spacing.unit * 2
  }
});

export default withWidth()(
  withStyles(styles)(({ classes, width }) => (
    <Grid container classes={{ container: classes.rootContainer }}>
      <Grid item xs={12} sm={4}>
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ height: "100%" }}
        >
          <img
            className={classNames(
              isWidthDown("sm", width) ? classes.small : classes.large
            )}
            src={
              isWidthUp("sm", width)
                ? "/assets/devices.png"
                : "/assets/macbook.png"
            }
          />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Grid
          container
          justify="center"
          alignContent="center"
          style={{ height: "100%" }}
        >
          <Grid item xs={10}>
            <Typography
              variant="h4"
              color="primary"
              align="center"
              classes={{ root: classes.headline }}
              paragraph
            >
              Stop reading reviews!
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid
              container
              justify="center"
              classes={{ container: classes.featureContainer }}
            >
              <Grid
                item
                xs={2}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Grid container justify="center">
                  <Typography variant="h2" color="secondary" align="center">
                    🌎
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={10}>
                <Grid
                  container
                  alignItems="center"
                  alignContent="center"
                  justify="center"
                  direction="column"
                  style={{ height: "100%", padding: 16 }}
                >
                  <Grid container direction="column">
                    <Typography variant="h5" color="secondary" align="left">
                      MOVE
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="primary"
                      align="left"
                    >
                      Keep your nomad life!
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              justify="center"
              classes={{ container: classes.featureContainer }}
            >
              <Grid
                item
                xs={2}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Grid container justify="center">
                  <Typography variant="h2" color="secondary" align="center">
                    🚀
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={10}>
                <Grid
                  container
                  alignItems="center"
                  alignContent="center"
                  justify="center"
                  direction="column"
                  style={{ height: "100%", padding: 16 }}
                >
                  <Grid container direction="column">
                    <Typography variant="h5" color="secondary" align="left">
                      FAST
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="primary"
                      align="left"
                    >
                      Don't worry about speed connection!
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              justify="center"
              classes={{ container: classes.featureContainer }}
            >
              <Grid
                item
                xs={2}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Grid container justify="center">
                  <Typography variant="h2" color="secondary" align="center">
                    💻
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={10}>
                <Grid
                  container
                  alignItems="center"
                  alignContent="center"
                  justify="center"
                  direction="column"
                  style={{ height: "100%", padding: 16 }}
                >
                  <Grid container direction="column">
                    <Typography variant="h5" color="secondary" align="left">
                      BE ONLINE!
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="primary"
                      align="left"
                    >
                      Save time, skip bad wi-fi!
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  ))
);
