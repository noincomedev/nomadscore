import React, { Component } from "react";
import classNames from "classnames";
import gql from "graphql-tag";
import { Bert } from "meteor/themeteorchef:bert";
import { graphql } from "react-apollo";
import { withRouter } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  accentButton: {
    backgroundColor: `${theme.palette.custom.accent} !important`,
    color: `${theme.palette.primary.main} !important`
  },
  fast: {
    border: `2px solid ${theme.palette.secondary.light}`,
    "&:hover": {
      border: `2px solid ${theme.palette.custom.accent}`
    }
  },
  fastHeadline: {
    color: `${theme.palette.secondary.main} !important`,
    fontWeight: `${1000} !important`
  },
  priceFeature: {
    color: theme.palette.secondary.light
  },
  priceHeadline: {
    fontWeight: 400,
    color: theme.palette.grey[500]
  },
  priceItemContainer: {
    margin: theme.spacing.unit,
    borderRadius: theme.spacing.unit * 2,
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px ${theme
      .spacing.unit * 3}px ${theme.spacing.unit * 2}px !important`,
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      alignItems: "center"
    }
  },
  priceSubheading: {
    color: theme.palette.common.white
  },
  purchaseButton: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.custom.accent,
      color: theme.palette.primary.main
    }
  },
  signupButton: {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.custom.accent,
      color: theme.palette.primary.main
    }
  },
  slow: {
    border: `2px solid ${theme.palette.secondary.dark}`,
    "&:hover": {
      border: `2px solid ${theme.palette.custom.accent}`
    }
  }
});

class PriceItemItemLayout extends Component {
  state = {
    hover: false,
    loading: false
  };

  onPurchase = () => {
    const { history, width } = this.props;
    this.toggleLoading();
    this.props
      .setAsProspect()
      .then(result => {
        Bert.alert({
          title: "SUCCESS",
          message: "We will contact you soon.",
          type: "success",
          style: isWidthUp("md", width) ? "growl-top-right" : "fixed-top",
          icon: "fa-check"
        });
        history.push("/");
      })
      .catch(error =>
        Bert.alert({
          title: "Error!",
          message: error.reason,
          type: "danger",
          style: isWidthUp("md", width) ? "growl-top-right" : "fixed-top",
          icon: "fa-remove"
        })
      );
    this.toggleLoading();
  };

  toggleHover = () => this.setState({ hover: !this.state.hover });

  toggleLoading = () => this.setState({ loading: !this.state.loading });

  render() {
    const { classes, history, slow } = this.props;
    const { hover } = this.state;
    return (
      <Grid
        item
        xs={10}
        md={5}
        classes={{
          item: classNames(
            classes.priceItemContainer,
            slow ? classes.slow : classes.fast
          )
        }}
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
      >
        <Grid container direction="column">
          <Typography
            variant="h4"
            align="center"
            classes={{
              root: classNames(
                classes.priceHeadline,
                !slow && classes.fastHeadline
              )
            }}
            paragraph
          >
            {slow ? "SLOW" : "FAST"}
          </Typography>
          <Typography
            variant="h6"
            color="default"
            align="center"
            classes={{ root: classes.priceSubheading }}
            paragraph
          >
            {`You work from ${slow ? "home or office!" : "everywhere!"}`}
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            classes={{ root: classes.priceFeature }}
          >
            {`${slow ? "1x Daily Search" : "Unlimited"}`}
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            classes={{ root: classes.priceFeature }}
            paragraph={!slow}
          >
            {`${slow ? "Check In" : "Geolocalization"}`}
          </Typography>
          <Hidden xsUp={!slow}>
            <Typography
              variant="subtitle1"
              align="center"
              classes={{ root: classes.priceFeature }}
              paragraph
            >
              Rate places
            </Typography>
          </Hidden>
          <Grid container justify="center">
            <Button
              variant="contained"
              classes={{
                root: classNames(
                  slow ? classes.signupButton : classes.purchaseButton,
                  hover && classes.accentButton
                )
              }}
              onClick={event => {
                if (Meteor.userId()) {
                  this.onPurchase();
                } else {
                  history.push("/accounts", {
                    asProspect: slow ? false : true,
                    isUser: false
                  });
                }
              }}
            >
              {slow ? "Sign Up" : "Purchase"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const SET_AS_PROSPECT = gql`
  mutation setAsProspect {
    setAsProspect {
      _id
      prospect
    }
  }
`;

export default graphql(SET_AS_PROSPECT, {
  name: "setAsProspect"
})(withWidth()(withStyles(styles)(withRouter(PriceItemItemLayout))));
