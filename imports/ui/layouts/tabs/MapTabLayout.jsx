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
    color: theme.palette.common.white,
    textShadow: `-1px 0 ${theme.palette.secondary.light}, 0 1px ${
      theme.palette.secondary.light
    }, 1px 0 ${theme.palette.secondary.light}, 0 -1px ${
      theme.palette.secondary.light
    }`
  },
  coffeeIcon: {
    color: theme.palette.common.white,
    textShadow: `-1px 0 ${theme.palette.primary.dark}, 0 1px ${
      theme.palette.primary.dark
    }, 1px 0 ${theme.palette.primary.dark}, 0 -1px ${
      theme.palette.primary.dark
    }`
  },
  icon: {
    "&:hover": {
      zIndex: 1000
    }
  },
  laptopIcon: {
    color: theme.palette.primary.light,
    textShadow: `-1px 0 ${theme.palette.secondary.main}, 0 1px ${
      theme.palette.secondary.main
    }, 1px 0 ${theme.palette.secondary.main}, 0 -1px ${
      theme.palette.secondary.main
    }`
  },
  rootContainer: {
    flex: 1,
    backgroundColor: theme.palette.primary.light
  }
});

export default withStyles(styles)(({ classes, place, venues }) => {
  const renderMarkerIcon = _id => {
    switch (_id) {
      case "4bf58dd8d48988d174941735":
        return (
          <i
            className={classNames(
              "fas fa-laptop",
              classes.laptonIcon,
              classes.icon
            )}
          />
        );
      case "4bf58dd8d48988d1f0941735":
        return (
          <i
            className={classNames(
              "fas fa-coffee",
              classes.coffeeIcon,
              classes.icon
            )}
          />
        );
      case "4bf58dd8d48988d1ee931735":
        return (
          <i
            className={classNames("fas fa-bed", classes.bedIcon, classes.icon)}
          />
        );
    }
  };

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
          zoom={[11]}
        >
          {venues.map(venue => (
            <Marker
              key={venue._id}
              coordinates={[venue.location.lng, venue.location.lat]}
              anchor="bottom"
              className={classes.icon}
            >
              {renderMarkerIcon(venue.category._id)}
            </Marker>
          ))}
        </Map>
      </div>
      <Typography variant="caption" align="center" color="primary">
        Searching near:
      </Typography>
      <Typography variant="h5" align="center" style={{ color: "white" }}>
        {place.near}
      </Typography>
    </Grid>
  );
});
