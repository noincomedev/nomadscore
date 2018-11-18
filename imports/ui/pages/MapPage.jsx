import React, { Component, Fragment } from "react";
import classNames from "classnames";
import Geocode from "react-geocode";
import gql from "graphql-tag";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import { Query } from "react-apollo";
import { withRouter } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";

import SearchForm from "../components/forms/SearchVenuesForm";
import Spinner from "../components/utils/Spinner";

import List from "../layouts/components/lists/ListLayout";
import Item from "../layouts/components/lists/ListItemLayout";

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
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    flex: 1,
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.up("md")]: {
      position: "absolute",
      maxWidth: "33%",
      right: 0
    }
  },
  sidebarContentContainer: {
    flex: 1
  },
  sidebarItemContainer: {
    display: "flex",
    flex: "1",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      height: "87vh"
    }
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
      votes {
        owner
        a
        b
      }
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
    mounted: false,
    tab: 0
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

  handleTabChange = (event, value) => {
    this.setState({ tab: value });
  };

  render() {
    const { classes, width } = this.props;
    const { lat, lng, near, tab } = this.state;

    const coworkcategoryid = "4bf58dd8d48988d174941735";
    const coffecategoryid = "4bf58dd8d48988d1f0941735";
    const hostelcategoryid = "4bf58dd8d48988d1ee931735";

    if (near && lat && lng) {
      return (
        <Query query={GET_NEAR_VENUES} variables={{ near: near }}>
          {({ loading, error, data }) => {
            if (loading) return <Spinner />;
            const { nearVenues } = data;
            const hostels = [],
              cafes = [],
              coworks = [];
            nearVenues.filter(venue => {
              switch (venue.category._id) {
                case coworkcategoryid:
                  coworks.push(venue);
                  break;
                case hostelcategoryid:
                  hostels.push(venue);
                  break;
                case coffecategoryid:
                  cafes.push(venue);
                  break;
              }
            });

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
            const renderTab = tab => {
              switch (tab) {
                case 0:
                  return (
                    <List title="Hostels">
                      {hostels.map(hostel => (
                        <Grid key={hostel._id} item xs={12}>
                          <Item item={hostel} />
                        </Grid>
                      ))}
                    </List>
                  );
                case 1:
                  return (
                    <List title="Internet Cafes">
                      {cafes.map(cafe => (
                        <Grid key={cafe._id} item xs={12}>
                          <Item item={cafe} />
                        </Grid>
                      ))}
                    </List>
                  );
                case 2:
                  return (
                    <List title="Coworks">
                      {coworks.map(cowork => (
                        <Grid key={cowork._id} item xs={12}>
                          <Item item={cowork} />
                        </Grid>
                      ))}
                    </List>
                  );
              }
            };
            return (
              <Fragment>
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
                </Grid>
                <Grid
                  container
                  classes={{ container: classes.sidebarContainer }}
                >
                  <Grid item xs={12} style={{ padding: 8 }}>
                    <Grid
                      container
                      component={Paper}
                      elevation={5}
                      classes={{ container: classes.searchContainer }}
                    >
                      <SearchForm near={near} onSubmit={this.updateNear} />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    classes={{ item: classes.sidebarItemContainer }}
                  >
                    <Grid
                      container
                      justify="flex-start"
                      alignContent="space-between"
                      classes={{ container: classes.sidebarContentContainer }}
                    >
                      {renderTab(tab)}
                      <AppBar position="static">
                        <Tabs
                          value={tab}
                          onChange={this.handleTabChange}
                          fullWidth
                          centered
                        >
                          <Tab
                            label={<i className={classNames("fas fa-bed")} />}
                          />
                          <Tab
                            label={
                              <i className={classNames("fas fa-coffee")} />
                            }
                          />
                          <Tab
                            label={
                              <i className={classNames("fas fa-laptop")} />
                            }
                          />
                        </Tabs>
                      </AppBar>
                    </Grid>
                  </Grid>
                </Grid>
              </Fragment>
            );
          }}
        </Query>
      );
    }
    return <Spinner />;
  }
}
export default withWidth()(withStyles(styles)(withRouter(MapPage)));
