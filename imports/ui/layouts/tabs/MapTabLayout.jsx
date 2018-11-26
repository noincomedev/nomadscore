import React from "react";
import classNames from "classnames";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1Ijoib3dpdHNlcnZpY2VzIiwiYSI6ImNqbGg2M3phdzFlejUzcXV2MW85cnF6cGIifQ.tTlo5ekxL4hcRT2YGCROpQ",
  interactive: true
});

const styles = theme => ({
  bedIcon: {
    color: theme.palette.secondary.main,
    textShadow: `-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white`,
    fontSize: "1.5rem"
  },
  coffeeIcon: {
    color: theme.palette.primary.light,
    textShadow: `-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white`,
    fontSize: "1.5rem"
  },
  icon: {
    "&:hover": {
      zIndex: 1000
    }
  },
  rootContainer: {
    flex: 1,
    backgroundColor: theme.palette.primary.dark
  }
});

export default withStyles(styles)(({ classes, place, hostels, cafes }) => {
  return (
    <Grid
      container
      direction="column"
      classes={{ container: classes.rootContainer }}
    >
      <div style={{ height: "75vh", paddingBottom: 8 }}>
        <Map
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: "100%",
            width: "100%"
          }}
          center={[place.coords.lng, place.coords.lat]}
          zoom={[13]}
        >
          {hostels.map(hostel => (
            <Marker
              key={hostel.providerid}
              coordinates={[hostel.location.lng, hostel.location.lat]}
              anchor="bottom"
              className={classes.icon}
            >
              <i
                className={classNames(
                  "fas fa-bed",
                  classes.bedIcon,
                  classes.icon
                )}
              />
            </Marker>
          ))}
          {cafes.map(cafe => (
            <Marker
              key={cafe.providerid}
              coordinates={[cafe.location.lng, cafe.location.lat]}
              anchor="bottom"
              className={classes.icon}
            >
              <i
                className={classNames(
                  "fas fa-coffee",
                  classes.coffeeIcon,
                  classes.icon
                )}
              />
            </Marker>
          ))}
        </Map>
      </div>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{ flex: 1 }}
      >
        <Typography
          variant="caption"
          align="center"
          style={{
            color: "rgb(29,233,182)"
          }}
        >
          Searching near:
        </Typography>
        <Typography variant="h5" align="center" style={{ color: "white" }}>
          {place.near}
        </Typography>
      </Grid>
    </Grid>
  );
});
