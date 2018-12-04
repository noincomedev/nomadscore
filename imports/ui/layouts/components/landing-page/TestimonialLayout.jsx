import React from "react";

import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";

const background =
  "https://images.unsplash.com/photo-1523908511403-7fc7b25592f4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1fe18e6fdfabd9a43474c9ad3d2255b4&auto=format&fit=crop&w=1350&q=80";

const avatarSrc =
  "https://lh3.googleusercontent.com/LBBaynhWIeEEGgQ7r4Pu_bjZWxRGQU1Dlj0UW5Krl3sxVSbYRXdZzf120FAHhQ0glEBRATGIOz-vGlMsQdrZr7roArq4CcVwyyyeGFfEOL8CpoCzu-Lqp8vmg9ffNdbOaoSVrCDZ3-CEcKpCoUgQr4RQUUWunhzx85EAFdPBHf7xXAaCmNmXhJFRX466vArJTpxonvnUhirzE9LZmPf2siLaG1U8SRy6mGzaIKaEqLb9kYJsVjGHmUChTrzHmG7xyUpsaQFA-OxIhMYhFNPgaPHwvPXv17eJ-TO1KU2LLwgBsKyzguv-IC00UdQ8AXL9Zm9qjRyowVbAmG1rjE4BZhAtyHer2Ex-6gvK9WuoYEBJaLMq8nVkzTwif2kEKyT0SCEHbrZldgTFemCRsSYCNo_LIkOlBoUvsUutiM9hto4F0G_Pa3EftoNu6Kri376Y1G0DZnlFBpzo6K8WlCy77vIDpt7bR-pGdU1YYEj3aBW5BcIj1Wrrues_G9Evz3hkL1MD3wqAdUSWmqXdUgNDAVUw5IovVzeTTp07exQs1uLFrGjvjBJk9AKF8f52WLskRvsJmQKssIVgMcYrXZkibFHte3GoVINm=w475-h349-no-tmp.jpg";

const styles = theme => ({
  avatar: {
    width: 50,
    height: 50,
    border: `2px solid ${theme.palette.custom.accent}`,
    marginLeft: theme.spacing.unit
  },
  rootContainer: {
    height: "66vh",
    backgroundImage: `url(${background})`,
    backgroundColor: theme.palette.primary.main,
    backgroundPosition: "center center",
    backgroundSize: "cover",
    padding: `${theme.spacing.unit * 5}px ${theme.spacing.unit * 2}px ${theme
      .spacing.unit * 5}px ${theme.spacing.unit * 2}px`,
    borderBottom: `${theme.spacing.unit * 3}px solid ${
      theme.palette.primary.main
    } `
  },
  divider: {
    paddingBottom: theme.spacing.unit / 4,
    backgroundColor: theme.palette.secondary.light
  },
  name: {
    color: theme.palette.common.white,
    fontWeight: 600
  },
  paper: {
    backgroundColor: "rgba(35,39,42, 0.66)",
    padding: theme.spacing.unit
  },
  testimonialText: {
    fontWeight: 500,
    color: theme.palette.common.white,
    padding: theme.spacing.unit
  }
});

export default withWidth()(
  withStyles(styles)(({ classes, width }) => (
    <Grid
      container
      justify="flex-end"
      classes={{ container: classes.rootContainer }}
    >
      <Grid
        item
        xs={10}
        sm={5}
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "flex-end"
        }}
      >
        <Grid
          container
          component={Paper}
          elevation={5}
          classes={{ container: classes.paper }}
          direction="column"
        >
          <Typography
            variant="caption"
            align={isWidthUp("sm", width) ? "left" : "justify"}
            classes={{ root: classes.testimonialText }}
          >
            While backpacking through South East Asia one of my struggles was
            booking cheap hostels with decent quality wi-fi. I had to spend so
            many time reading reviews because sometimes happened that I booked
            on hostels with "high speed wi-fi" but once I got there, the thing
            was different. Unstable, slow or even no connection at all!
          </Typography>
          <Grid container justify="flex-end">
            <Grid item xs={8}>
              <Divider classes={{ root: classes.divider }} />
            </Grid>
          </Grid>
          <Grid
            container
            alignItems="center"
            justify="flex-end"
            style={{ padding: 8 }}
          >
            <Grid item xs={8}>
              <Grid container direction="column">
                <Typography
                  variant="subtitle1"
                  align="right"
                  classes={{ root: classes.name }}
                >
                  Diego Robles
                </Typography>
                <Typography
                  variant="caption"
                  color="default"
                  align="right"
                  classes={{ root: classes.name }}
                >
                  NomadScore Maker
                </Typography>
              </Grid>
            </Grid>
            <Avatar src={avatarSrc} classes={{ root: classes.avatar }} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  ))
);
