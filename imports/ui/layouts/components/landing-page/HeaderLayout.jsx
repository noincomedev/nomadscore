import React from "react";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import SearchVenues from "../../../components/forms/SearchVenuesForm";

const headerMobileBackgroundUrl =
  "https://images.unsplash.com/photo-1525925946496-8abb0ec054d3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2641a812933c1cacabf215672965c0d0&auto=format&fit=crop&w=668&q=80";

const headerDesktopBackgroundUrl =
  "https://images.unsplash.com/photo-1477379206551-c71215479841?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1d5ef9048430004a5397c4210ec355f2&auto=format&fit=crop&w=1234&q=80";

const styles = theme => ({
  rootContainer: {
    height: "75vh",
    backgroundImage: `linear-gradient(rgba(56,63,81, 0.44),rgba(56,63,81, 0.15)), url(${headerDesktopBackgroundUrl})`,
    backgroundSize: "cover",
    borderBottom: `10px solid ${theme.palette.secondary.dark}`,
    [theme.breakpoints.down("xs")]: {
      minHeight: "92vh",
      backgroundImage: `linear-gradient(rgba(56,63,81, 0.15),rgba(56,63,81, 0.15)), url(${headerMobileBackgroundUrl})`
    }
  }
});

export default withStyles(styles)(({ classes }) => (
  <Grid
    container
    justify="center"
    alignItems="center"
    alignContent="center"
    classes={{ container: classes.rootContainer }}
  >
    <Grid item xs={9} md={4}>
      <SearchVenues />
    </Grid>
  </Grid>
));
