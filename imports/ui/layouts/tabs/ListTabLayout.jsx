import React, { Component } from "react";

import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import Hotel from "@material-ui/icons/Hotel";
import LaptopMac from "@material-ui/icons/LaptopMac";
import LocalCafe from "@material-ui/icons/LocalCafe";
import { withStyles } from "@material-ui/core/styles";

import Item from "../components/lists/ListItemLayout";

const styles = theme => ({
  divider: {
    paddingBottom: theme.spacing.unit / 3,
    backgroundColor: theme.palette.primary.light
  },
  listContainer: {
    maxHeight: "66vh"
  },
  rootContainer: {
    flex: 1,
    padding: theme.spacing.unit,
    overflow: "scroll"
  },
  tabs: {
    color: theme.palette.secondary.light
  },
  tabsContainer: {
    alignSelf: "flex-end"
  }
});

class ListTabLayout extends Component {
  state = {
    tab: 0
  };

  handleTabChange = (event, value) => {
    this.setState({ tab: value });
  };

  render() {
    const { classes, place, venues } = this.props;
    const { tab } = this.state;

    const coworkcategoryid = "4bf58dd8d48988d174941735";
    const coffecategoryid = "4bf58dd8d48988d1f0941735";
    const hostelcategoryid = "4bf58dd8d48988d1ee931735";

    const hostels = [],
      cafes = [],
      coworks = [];

    venues.filter(venue => {
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

    const renderTitle = tab => {
      switch (tab) {
        case 0:
          return "Hostels";
        case 1:
          return "Internet Cafes";
        case 2:
          return "Coworks";
      }
    };

    const renderTab = () => {
      switch (tab) {
        case 0:
          return (
            <Grid container classes={{ container: classes.listContainer }}>
              {hostels.map(hostel => (
                <Grid key={hostel._id} item xs={12}>
                  <Item item={hostel} place={place} />
                </Grid>
              ))}
            </Grid>
          );
        case 1:
          return (
            <Grid container classes={{ container: classes.listContainer }}>
              {cafes.map(cafe => (
                <Grid key={cafe._id} item xs={12}>
                  <Item item={cafe} place={place} />
                </Grid>
              ))}
            </Grid>
          );
        case 2:
          return (
            <Grid container classes={{ container: classes.listContainer }}>
              {coworks.map(cowork => (
                <Grid key={cowork._id} item xs={12}>
                  <Item item={cowork} place={place} />
                </Grid>
              ))}
            </Grid>
          );
      }
    };

    return (
      <Grid
        container
        direction="column"
        justify="space-between"
        style={{ flex: 1 }}
      >
        <Grid container style={{ padding: 8 }}>
          <Grid item xs={12}>
            <Typography variant="h4" color="primary">
              {renderTitle(tab)}
            </Typography>
            <Divider classes={{ root: classes.divider }} />
          </Grid>
        </Grid>
        <Grid
          container
          alignItems="flex-start"
          alignContent="flex-start"
          classes={{ container: classes.rootContainer }}
        >
          {renderTab()}
        </Grid>
        <Grid
          container
          direction="column"
          classes={{ container: classes.tabsContainer }}
        >
          <Tabs
            value={tab}
            onChange={this.handleTabChange}
            indicatorColor="secondary"
            fullWidth
            centered
            classes={{ root: classes.tabs }}
          >
            <Tab label={<Hotel />} />
            <Tab label={<LocalCafe />} />
            <Tab label={<LaptopMac />} />
          </Tabs>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ListTabLayout);
