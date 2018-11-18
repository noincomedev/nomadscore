import React, { Component, Fragment } from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import LoginButtons from "../../../components/accounts/LoginButtons";

import RateHostel from "../../../components/forms/ratings/HostelRatingForm";
import RateCowork from "../../../components/forms/ratings/CoworkRatingForm";
import RateCafe from "../../../components/forms/ratings/CafeRatingForm";

const styles = theme => ({
  avatarContainer: {
    [theme.breakpoints.up("md")]: {
      height: "100%",
      justifyContent: "center"
    }
  },
  dialogContainer: {
    background: theme.palette.grey[300]
  },
  divider: {
    paddingBottom: theme.spacing.unit / 3,
    backgroundColor: theme.palette.secondary.main,
    marginBottom: theme.spacing.unit / 2
  },
  name: {
    fontWeight: 400,
    color: theme.palette.primary.light
  },
  rootContainer: {
    height: "8vh",
    boxShadow: `3px 3px ${theme.palette.primary.dark}`,
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing.unit
  }
});

class ListItemLayout extends Component {
  state = {
    showDialog: false,
    showButtons: Meteor.userId() ? false : true
  };

  toggleDialog = () => {
    this.setState({ showDialog: !this.state.showDialog });
  };

  toggleLoginButtons = () => {
    this.setState({ showButtons: !this.state.showButtons });
  };

  renderForm = () => {
    const { item } = this.props;
    const { category } = item;
    const { _id } = category;
    switch (_id) {
      case "4bf58dd8d48988d1ee931735":
        return <RateHostel venueid={item._id} onResult={this.toggleDialog} />;
      case "4bf58dd8d48988d1f0941735":
        return <RateCafe venueid={item._id} onResult={this.toggleDialog} />;
      case "4bf58dd8d48988d174941735":
        return <RateCowork venueid={item._id} onResult={this.toggleDialog} />;
    }
  };

  render() {
    const { classes, item } = this.props;
    const { showDialog, showButtons } = this.state;
    const { votes } = item;
    const voters = votes.map(vote => vote.owner);
    const voted = voters.includes(Meteor.userId());
    return (
      <Fragment>
        <Grid item xs={12} style={{ padding: 8 }}>
          <Grid container classes={{ container: classes.rootContainer }}>
            <Grid item xs={2} style={{ flex: 1, height: "100%" }}>
              <Grid
                container
                alignItems="center"
                classes={{ container: classes.avatarContainer }}
              >
                <Avatar src="https://via.placeholder.com/150" />
              </Grid>
            </Grid>
            <Grid item xs={10}>
              <Grid
                container
                alignItems="center"
                justify="space-between"
                style={{ flex: 1, height: "100%" }}
              >
                <Typography variant="h6" classes={{ root: classes.name }}>
                  {item.name.length > 15
                    ? `${item.name.substring(0, 8)}...`
                    : item.name}
                </Typography>
                <Typography variant="subtitle2" color="primary">
                  {`Votes: ${votes.length}`}
                </Typography>
                {!voted && (
                  <Button
                    variant="text"
                    size="small"
                    color="secondary"
                    onClick={this.toggleDialog}
                  >
                    RATE
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Dialog
          classes={{ paper: classes.dialogContainer }}
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
          <DialogContent style={{ paddongTop: 4 }}>
            {showButtons ? (
              <Grid container justify="center">
                <Grid item xs={12}>
                  <Typography
                    color="secondary"
                    variant="subtitle2"
                    align="center"
                    paragraph
                  >
                    Help other nomads make their life easier, also yours!
                  </Typography>
                </Grid>
                <Grid item xs={10}>
                  <LoginButtons onSuccess={this.toggleLoginButtons} />
                </Grid>
              </Grid>
            ) : (
              this.renderForm()
            )}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

export default withStyles(styles)(ListItemLayout);
