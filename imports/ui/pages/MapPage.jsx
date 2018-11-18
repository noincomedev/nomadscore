import React, { Component } from "react";
import classNames from "classnames";
import Geocode from "react-geocode";
import gql from "graphql-tag";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import { Query } from "react-apollo";
import { withRouter } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";

import Spinner from "../components/utils/Spinner";

import SearchForm from "../components/forms/SearchVenuesForm";

Geocode.setApiKey(Meteor.settings.public.GEOCODING_API_KEY);

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
  marker: {
    color: theme.palette.secondary.main
  },
  mapContainer: {
    position: "relative",
    width: "100%",
    height: "95vh",
    [theme.breakpoints.down("sm")]: {
      height: "33vh"
    }
  },
  searchContainer: {
    padding: theme.spacing.unit
  },
  sidebarContainer: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit
  }
});

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1Ijoib3dpdHNlcnZpY2VzIiwiYSI6ImNqbGg2M3phdzFlejUzcXV2MW85cnF6cGIifQ.tTlo5ekxL4hcRT2YGCROpQ",
  interactive: true
});

const GET_NEAR_VENUES = gql`
  query nearVenues($near: String) {
    nearVenues(near: $near) {
      _id
      name
      category {
        _id
        name
      }
      location {
        lat
        lng
      }
    }
  }
`;

class MapPage extends Component {
  state = {
    lat: "",
    lng: "",
    near: "",
    mounted: false
  };

  static getDerivedStateFromProps(props, state) {
    const { near, lat, lng } = props.location.state;
    const { mounted } = state;
    if (near && !mounted) {
      return {
        near,
        lat,
        lng,
        mounted: true
      };
    } else
      return {
        ...state
      };
  }

  updateNear = ({ near }) => {
    Geocode.fromAddress(near).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState({ near, lat, lng });
      },
      error => {
        console.error(error);
      }
    );
  };

  render() {
    const { classes, width } = this.props;
    const { lat, lng, near } = this.state;
    if (near && lat && lng) {
      return (
        <Query query={GET_NEAR_VENUES} variables={{ near: near }}>
          {({ loading, error, data, refetch }) => {
            if (loading) return <Spinner />;
            const { nearVenues } = data;
            const renderMarkerIcon = _id => {
              switch (_id) {
                case "4bf58dd8d48988d174941735":
                  return (
                    <i
                      className={classNames(
                        "fas fa-laptop fa-2x",
                        classes.laptonIcon,
                        classes.icon
                      )}
                    />
                  );
                case "4bf58dd8d48988d1f0941735":
                  return (
                    <i
                      className={classNames(
                        "fas fa-coffee fa-2x",
                        classes.coffeeIcon,
                        classes.icon
                      )}
                    />
                  );
                case "4bf58dd8d48988d1ee931735":
                  return (
                    <i
                      className={classNames(
                        "fas fa-bed fa-2x",
                        classes.bedIcon,
                        classes.icon
                      )}
                    />
                  );
              }
            };
            return (
              <Grid container classes={{ container: classes.mapContainer }}>
                <Grid item xs={12} md={8} style={{ height: "100%" }}>
                  <Map
                    style="mapbox://styles/mapbox/streets-v9"
                    containerStyle={{
                      height: "100%",
                      width: "100%"
                    }}
                    center={[lng, lat]}
                    zoom={[isWidthDown("sm", width) ? 10 : 13]}
                  >
                    {nearVenues.map(venue => (
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
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={4}
                  classes={{ item: classes.sidebarContainer }}
                >
                  <Grid
                    container
                    component={Paper}
                    elevation={5}
                    classes={{ container: classes.searchContainer }}
                  >
                    <SearchForm near={near} onSubmit={this.updateNear} />
                  </Grid>
                </Grid>
              </Grid>
            );
          }}
        </Query>
      );
    }
    return <Spinner />;
  }
}
export default withWidth()(withStyles(styles)(withRouter(MapPage)));
