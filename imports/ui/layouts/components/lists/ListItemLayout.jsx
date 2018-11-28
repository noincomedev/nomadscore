import React, { Component, Fragment } from "react";
import classNames from "classnames";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import GridListTile from "@material-ui/core/GridListTile";
import Typography from "@material-ui/core/Typography";
import Hotel from "@material-ui/icons/Hotel";
import LocationOn from "@material-ui/icons/LocationOn";
import NetworkCheck from "@material-ui/icons/NetworkCheck";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";

import Spinner from "../../../components/utils/Spinner";

import TileContent from "../lists/TileContentLayout";

import RateHostel from "../../../components/forms/ratings/HostelRatingForm";
import RateCafe from "../../../components/forms/ratings/CafeRatingForm";

const styles = theme => ({
  accent: {
    backgroundColor: `${theme.palette.secondary.dark} !important`
  },
  accentButton: {
    backgroundColor: theme.palette.custom.accent,
    color: theme.palette.primary.dark,
    "&:hover": {
      background: theme.palette.primary.dark,
      color: theme.palette.custom.accent
    }
  },
  contentContainer: {
    zIndex: 999,
    padding: theme.spacing.unit,
    background:
      "linear-gradient(rgba(103,58,183, 0),rgba(17,17,17, 0.66),rgba(17,17,17, 0.77))"
  },
  contrastAccent: {
    backgroundColor: `${theme.palette.primary.dark} !important`
  },
  contrastAdress: {
    backgroundColor: `${theme.palette.secondary.dark} !important`
  },
  contrastText: {
    color: theme.palette.custom.accent
  },
  divider: {
    paddingBottom: theme.spacing.unit / 3,
    backgroundColor: theme.palette.secondary.main,
    marginBottom: theme.spacing.unit / 2
  },
  rateButton: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white
  },
  rootContainer: {
    height: "20vh",
    boxShadow: `3px 3px ${theme.palette.primary.dark}`,
    padding: theme.spacing.unit
  },
  scoreLabel: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.98rem",
      justifyContent: "flex-end"
    }
  },
  tile: {
    display: "flex",
    flex: 1,
    position: "relative",
    borderRadius: 25
  },
  tileRoot: {
    width: "100%",
    height: "30vh",
    padding: 3,
    [theme.breakpoints.up("sm")]: {
      height: "25vh"
    }
  },
  venueAddress: {
    marginTop: theme.spacing.unit,
    color: theme.palette.grey[400],
    display: "flex",
    alignItems: "center"
  },
  venueName: {
    borderRadius: "25px 0 25px 0",
    color: theme.palette.common.white,
    backgroundColor: "rgba(72, 40, 128, 0.77)",
    padding: theme.spacing.unit
  },
  whiteLabel: {
    color: `${theme.palette.common.white} !important`
  }
});

class ListItemLayout extends Component {
  state = {
    hover: false,
    showDialog: false
  };

  toggleHover = () => {
    this.setState({ hover: !this.state.hover });
  };

  toggleDialog = () => {
    this.setState({ showDialog: !this.state.showDialog });
  };

  onSubmit = () => {
    this.props.refetch();
    this.toggleDialog();
  };

  render() {
    const { classes, item, place, voted, hidden, loading, width } = this.props;
    const { hover, showDialog } = this.state;
    const renderForm = () => {
      const { type } = item;
      switch (type) {
        case "hostel":
          return (
            <RateHostel venueid={item.providerid} onResult={this.onSubmit} />
          );
        case "cafe":
          return (
            <RateCafe venueid={item.providerid} onResult={this.onSubmit} />
          );
      }
    };
    return (
      <Fragment>
        <GridListTile classes={{ tile: classes.tile, root: classes.tileRoot }}>
          <TileContent background={item.photourl}>
            <Grid container classes={{ container: classes.contentContainer }}>
              <Grid
                container
                direction="column"
                justify="space-between"
                alignItems="flex-start"
              >
                <Grid container style={{ height: "100%" }}>
                  <Grid
                    item
                    xs={9}
                    style={{
                      display: "flex",
                      flexDirection: "column"
                    }}
                  >
                    <Grid container>
                      <Typography
                        variant={item.name.length > 15 ? "body1" : "h6"}
                        classes={{
                          root: classNames(
                            classes.venueName,
                            hover && classes.accent
                          )
                        }}
                      >
                        {item.name.length > 22
                          ? `${item.name.slice(0, 21)}...`
                          : item.name}
                      </Typography>
                    </Grid>
                  </Grid>
                  {!voted && (
                    <Grid item xs={3}>
                      <Grid container justify="flex-end">
                        <Button
                          variant="contained"
                          classes={{
                            root: classes.accentButton
                          }}
                          onClick={this.toggleDialog}
                        >
                          RATE
                        </Button>
                      </Grid>
                    </Grid>
                  )}

                  <Grid container>
                    <Grid item xs={9}>
                      <Grid
                        container
                        direction="column"
                        justify="flex-end"
                        style={{ height: "100%" }}
                      >
                        <Grid container>
                          <Typography
                            variant="caption"
                            color="secondary"
                            classes={{
                              root: classNames(
                                classes.venueAddress,
                                hover && classes.contrastAdress
                              )
                            }}
                          >
                            <LocationOn />
                            {item.location.address}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={3} style={{ display: "flex", flex: 1 }}>
                      <Grid container justify="flex-end" direction="column">
                        <Typography
                          variant="caption"
                          align="right"
                          classes={{
                            root: classNames(
                              classes.contrastText,
                              hover && classes.whiteLabel
                            )
                          }}
                        >
                          NOMADSCORE
                        </Typography>
                        {loading ? (
                          <Spinner />
                        ) : (
                          <Grid
                            container
                            justify="flex-end"
                            direction={
                              isWidthDown("sm", width) ? "column" : "row"
                            }
                          >
                            {Meteor.userId() || !hidden ? (
                              <Fragment>
                                <Typography
                                  variant="h5"
                                  classes={{
                                    root: classNames(
                                      classes.whiteLabel,
                                      classes.scoreLabel
                                    )
                                  }}
                                  align={
                                    isWidthDown("sm", width) ? "right" : "left"
                                  }
                                >
                                  <NetworkCheck />
                                  {`: ${
                                    item.score.b > 0 ? item.score.b : "N/R"
                                  }`}
                                </Typography>
                                <Typography
                                  variant="h5"
                                  classes={{
                                    root: classNames(
                                      classes.whiteLabel,
                                      classes.scoreLabel
                                    )
                                  }}
                                  align={
                                    isWidthDown("sm", width) ? "right" : "left"
                                  }
                                >
                                  <Hotel />
                                  {`: ${
                                    item.score.a > 0 ? item.score.a : "N/R"
                                  }`}
                                </Typography>
                              </Fragment>
                            ) : (
                              <Typography
                                variant="caption"
                                align="right"
                                classes={{
                                  root: classNames(
                                    classes.contrastText,
                                    hover && classes.whiteLabel
                                  )
                                }}
                              >
                                Login to view.
                              </Typography>
                            )}
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </TileContent>
        </GridListTile>
        <Dialog
          title={Meteor.userId() ? "Rate" : "Log In"}
          open={showDialog}
          onClose={this.toggleDialog}
          fullWidth
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" style={{ padding: 4 }}>
            {Meteor.userId()
              ? `Rate ${
                  item.name.length > 15
                    ? `${item.name.substring(0, 15)}...`
                    : item.name
                }`
              : "Log In"}
          </DialogTitle>
          <Grid container>
            <Grid item xs={12}>
              <Divider classes={{ root: classes.divider }} />
            </Grid>
          </Grid>
          <DialogContent style={{ paddingTop: 4 }}>
            {renderForm()}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

const GET_VOTED = gql`
  query voted($providerid: ID!) {
    voted(providerid: $providerid) {
      voted
    }
  }
`;

const QueryContainer = ({ children, classes, item, hidden, width }) => {
  const { providerid } = item;
  return (
    <Query query={GET_VOTED} variables={{ providerid }}>
      {({ loading, error, data, refetch }) => {
        if (loading) return <Spinner />;
        if (error) return `Error: ${error}`;
        const { voted } = data.voted;
        return (
          <Fragment>
            {React.cloneElement(children, {
              voted,
              classes,
              item,
              hidden,
              loading,
              width,
              refetch
            })}
          </Fragment>
        );
      }}
    </Query>
  );
};

export default withWidth()(
  withStyles(styles)(({ classes, item, hidden, width, refetch }) => (
    <QueryContainer
      classes={classes}
      item={item}
      hidden={hidden}
      width={width}
      refetch={refetch}
    >
      <ListItemLayout />
    </QueryContainer>
  ))
);
