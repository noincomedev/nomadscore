import React, { Component } from "react";

import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import Hotel from "@material-ui/icons/Hotel";
import LocalCafe from "@material-ui/icons/LocalCafe";
import { withStyles } from "@material-ui/core/styles";

import Item from "../components/lists/ListItemLayout";

const styles = theme => ({
  rootContainer: {
    flex: 1,
    [theme.breakpoints.up("sm")]: {
      height: "92.6vh"
    }
  },
  divider: {
    paddingBottom: theme.spacing.unit / 3,
    backgroundColor: theme.palette.primary.light
  },
  listContainer: {
    position: "absolute"
  },
  tabContainer: {
    flex: 1,
    position: "relative",
    overflow: "scroll"
  },
  tabs: {
    color: theme.palette.primary.main
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
    const { classes, place, hostels, cafes, refetch } = this.props;
    const { tab } = this.state;

    const renderTitle = tab => {
      switch (tab) {
        case 0:
          return "Hostels";
        case 1:
          return "Cafes";
      }
    };

    const renderTab = () => {
      switch (tab) {
        case 0:
          return (
            <GridList cols={1} classes={{ root: classes.listContainer }}>
              {hostels.map((hostel, index) => (
                <Item
                  hidden={index > 2}
                  key={hostel._id}
                  item={hostel}
                  place={place}
                  refetch={refetch}
                />
              ))}
            </GridList>
          );
        case 1:
          return (
            <GridList
              cellHeight={45}
              cols={1}
              classes={{ root: classes.listContainer }}
            >
              {cafes.map((cafe, index) => (
                <Item
                  hidden={index > 2}
                  key={cafe._id}
                  item={cafe}
                  place={place}
                  refetch={refetch}
                />
              ))}
            </GridList>
          );
      }
    };

    return (
      <Grid
        container
        direction="column"
        justify="space-between"
        classes={{ container: classes.rootContainer }}
      >
        <Grid container style={{ padding: 8 }}>
          <Grid item xs={12}>
            <Typography variant="h4" color="default">
              {renderTitle(tab)}
            </Typography>
            <Divider classes={{ root: classes.divider }} />
          </Grid>
        </Grid>
        <Grid
          container
          alignItems="flex-start"
          alignContent="flex-start"
          classes={{ container: classes.tabContainer }}
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
          </Tabs>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ListTabLayout);
