import React, { Component, Fragment } from "react";
import classNames from "classnames";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";

import Grid from "@material-ui/core/Grid";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import Venue from "../../components/lists/venues/Item";

import CustomMarker from "../../components/utils/CustomMarker";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1Ijoib3dpdHNlcnZpY2VzIiwiYSI6ImNqbGg2M3phdzFlejUzcXV2MW85cnF6cGIifQ.tTlo5ekxL4hcRT2YGCROpQ",
  interactive: true
});

const styles = theme => ({
  rootContainer: {
    flex: 1,
    backgroundColor: theme.palette.primary.dark
  },
  icon: {
    "&:hover": {
      zIndex: 1000
    }
  }
});

class MapTabLayout extends Component {
  state = {
    venue: {}
  };

  setActiveVenue = venue => this.setState({ venue });

  render() {
    const { classes, place, venues, width, theme } = this.props;
    const { venue } = this.state;
    const active = venue.hasOwnProperty("providerid");
    return (
      <Grid
        container
        direction="column"
        classes={{ container: classes.rootContainer }}
      >
        <div
          style={{
            height: isWidthUp("sm", width) ? "80vh" : "58vh",
            paddingBottom: 8
          }}
        >
          <Map
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
              height: "100%",
              width: "100%"
            }}
            center={[place.coords.lng, place.coords.lat]}
            zoom={[13]}
          >
            {venues.map(item => (
              <Marker
                key={item.providerid}
                coordinates={[item.location.lng, item.location.lat]}
                anchor="bottom"
                className={classes.icon}
                onClick={event => {
                  this.setActiveVenue(item);
                }}
              >
                <CustomMarker
                  active={active && venue.providerid == item.providerid}
                  providercategoryid={item.providercategoryid}
                />
              </Marker>
            ))}
          </Map>
        </div>
        <Grid container style={{ flex: 1, padding: 16 }}>
          {active ? (
            <Venue {...venue} />
          ) : (
            <Grid container direction="column" justify="center">
              <Typography
                variant="caption"
                align="center"
                style={{
                  color: theme.palette.grey[400]
                }}
              >
                Searching near:
              </Typography>
              <Typography
                variant="h5"
                align="center"
                style={{ color: theme.palette.custom.accent }}
              >
                {place.near}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    );
  }
}

export default withWidth()(
  withStyles(styles, { withTheme: true })(MapTabLayout)
);
