import React, { Component, Fragment } from "react";
import classNames from "classnames";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import gql from "graphql-tag";
import { Bert } from "meteor/themeteorchef:bert";
import { Carousel } from "react-responsive-carousel";
import { Parallax, Background } from "react-parallax";
import { compose, graphql, withApollo } from "react-apollo";
import { withRouter } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Search from "@material-ui/icons/Search";
import ViewList from "@material-ui/icons/ViewList";
import LocalAtm from "@material-ui/icons/LocalAtm";
import NearMe from "@material-ui/icons/NearMe";
import NetworkCheck from "@material-ui/icons/NetworkCheck";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";

import Spinner from "../components/utils/Spinner";

import SigninForm from "../components/forms/accounts/SigninForm";
import SignupForm from "../components/forms/accounts/SignupForm";
import SearchVenues from "../components/forms/SearchVenuesForm";

const backgroundImgUrl =
  "https://images.unsplash.com/photo-1513258496099-48168024aec0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=73c00aaa6d23115d7fbe494c0cc1e5e3&auto=format&fit=crop&w=2100&q=80";

const avatarSrc =
  "https://lh3.googleusercontent.com/LBBaynhWIeEEGgQ7r4Pu_bjZWxRGQU1Dlj0UW5Krl3sxVSbYRXdZzf120FAHhQ0glEBRATGIOz-vGlMsQdrZr7roArq4CcVwyyyeGFfEOL8CpoCzu-Lqp8vmg9ffNdbOaoSVrCDZ3-CEcKpCoUgQr4RQUUWunhzx85EAFdPBHf7xXAaCmNmXhJFRX466vArJTpxonvnUhirzE9LZmPf2siLaG1U8SRy6mGzaIKaEqLb9kYJsVjGHmUChTrzHmG7xyUpsaQFA-OxIhMYhFNPgaPHwvPXv17eJ-TO1KU2LLwgBsKyzguv-IC00UdQ8AXL9Zm9qjRyowVbAmG1rjE4BZhAtyHer2Ex-6gvK9WuoYEBJaLMq8nVkzTwif2kEKyT0SCEHbrZldgTFemCRsSYCNo_LIkOlBoUvsUutiM9hto4F0G_Pa3EftoNu6Kri376Y1G0DZnlFBpzo6K8WlCy77vIDpt7bR-pGdU1YYEj3aBW5BcIj1Wrrues_G9Evz3hkL1MD3wqAdUSWmqXdUgNDAVUw5IovVzeTTp07exQs1uLFrGjvjBJk9AKF8f52WLskRvsJmQKssIVgMcYrXZkibFHte3GoVINm=w475-h349-no-tmp.jpg";

const styles = theme => ({
  accentButton: {
    color: theme.palette.primary.dark,
    background: theme.palette.custom.accent,
    "&:hover": {
      color: theme.palette.common.white
    }
  },
  avatar: {
    height: 75,
    width: 75
  },
  carouselContainer: {
    position: "relative"
  },
  carousel: { height: "100%" },
  caption: {
    fontSize: "1rem"
  },
  communityContainer: {
    backgroundColor: theme.palette.primary.dark,
    minHeight: "33vh",
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing.unit * 3,
      paddingBottom: theme.spacing.unit * 3
    },
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing.unit * 4,
      paddingBottom: theme.spacing.unit * 4
    }
  },
  communityHeading: {
    border: `4px solid ${theme.palette.primary.light}`,
    padding: theme.spacing.unit * 2,
    fontWeight: 600,
    color: theme.palette.secondary.light,
    transform: "skew(20deg)",
    [theme.breakpoints.up("md")]: {
      border: `4px solid ${theme.palette.custom.accent}`
    }
  },
  communitySubheading: {
    border: `4px solid ${theme.palette.custom.accent}`,
    padding: theme.spacing.unit * 2,
    fontWeight: 600,
    color: theme.palette.secondary.light,
    transform: "skew(-20deg)",
    [theme.breakpoints.up("md")]: {
      border: `4px solid ${theme.palette.primary.light}`
    }
  },
  contrastDivider: {
    paddingBottom: theme.spacing.unit / 4,
    backgroundColor: theme.palette.primary.light
  },
  dialogContent: {
    background: theme.palette.background.default
  },
  divider: {
    paddingBottom: theme.spacing.unit / 4,
    backgroundColor: theme.palette.secondary.light
  },
  fastHeader: {
    padding: theme.spacing.unit * 2,
    transform: "skew(-20deg)",
    color: theme.palette.custom.accent,
    backgroundColor: theme.palette.primary.dark,
    borderRadius: theme.spacing.unit * 2
  },
  footerContainer: {
    background: theme.palette.primary.main,
    borderBottom: `16px solid ${theme.palette.primary.dark}`
  },
  footerHeadingContainer: {
    height: "100%",
    padding: theme.spacing.unit * 3,
    background: theme.palette.grey[300]
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
    width: "100%",
    left: -150
  },
  hashtag: {
    color: `${theme.palette.custom.accent} !important`,
    textShadow: `3px 3px ${theme.palette.primary.dark}`
  },
  headerContainer: {
    height: "44vh",
    position: "relative"
  },
  headlineContainer: {
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing.unit * 3
    },
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6
    }
  },
  headline: {
    backgroundColor: theme.palette.custom.accent,
    color: theme.palette.primary.dark,
    padding: theme.spacing.unit * 2,
    color: theme.palette.secondary.main,
    transform: "skew(20deg)",
    boxShadow: `10px 10px ${theme.palette.primary.dark}`,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.33rem"
    }
  },
  icon: {
    color: theme.palette.common.white,
    textShadow: "-1px 0 grey, 0 1px grey, 1px 0 grey, 0 -1px grey",
    marginBottom: theme.spacing.unit,
    fontSize: "3rem",
    [theme.breakpoints.up("md")]: {
      fontSize: "3.5rem"
    }
  },
  iconDescription: { color: theme.palette.common.white },
  imageContainer: { [theme.breakpoints.down("sm")]: { paddingTop: 16 } },
  img: { height: "100%" },
  instagramButton: {
    height: 50,
    width: 50,
    color: theme.palette.primary.light,
    [theme.breakpoints.down("sm")]: {
      color: theme.palette.custom.accent
    }
  },
  mediaContainer: {
    backgroundColor: theme.palette.primary.main,
    backgroundImage: `linear-gradient(rgba(103,58,183, 0.33),rgba(103,58,183, 0.66)),
                      url(${backgroundImgUrl})`,
    backgroundSize: "cover",
    padding: theme.spacing.unit * 4,
    [theme.breakpoints.down("sm")]: {
      minHeight: "44vh"
    },
    [theme.breakpoints.up("md")]: {
      minHeight: "55vh"
    }
  },
  link: {
    color: theme.palette.secondary.dark
  },
  logo: {
    textDecoration: "none",
    color: theme.palette.common.white,
    fontFamily: "pacifico",
    textShadow: `-2px 0 ${theme.palette.secondary.dark}, 0 2px ${
      theme.palette.secondary.dark
    }, 2px 0 ${theme.palette.secondary.dark}, 0 -2px ${
      theme.palette.secondary.dark
    }`
  },
  parallaxContainer: {
    height: "30vh",
    [theme.breakpoints.up("md")]: {
      height: "55vh"
    }
  },
  planContainer: {
    display: "flex",
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 2,
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing.unit * 3
    }
  },
  planDescription: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
      fontSize: "1.3rem"
    }
  },
  pricingContainer: {
    padding: "64px 16px 64px 16px",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: 0
    }
  },
  pricingHeading: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.dark,
    padding: theme.spacing.unit * 2,
    transform: "skew(-20deg)",
    fontWeight: 600,
    boxShadow: `-5px 5px ${theme.palette.custom.accent}`,
    [theme.breakpoints.down("sm")]: {
      fontSize: "3.15rem"
    }
  },
  productContainer: {
    padding: "64px 16px 64px 16px",
    [theme.breakpoints.down("sm")]: {
      padding: "32px 16px 32px 16px"
    }
  },
  quoteIcon: {
    color: theme.palette.grey[500],
    fontSize: "3.5rem",
    position: "absolute",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.5rem"
    }
  },
  requestButton: {
    marginBottom: theme.spacing.unit,
    color: theme.palette.common.white,
    backgroundColor: theme.palette.secondary.light,
    "&:hover": {
      color: theme.palette.custom.accent
    }
  },
  searchContainer: {
    position: "absolute"
  },
  signupButton: {
    background: theme.palette.primary.light,
    color: theme.palette.custom.accent,
    marginBottom: theme.spacing.unit
  },
  slogan: {
    color: theme.palette.common.white,
    textTransform: "uppercase"
  },
  sloganContainer: {
    width: "100%",
    background: "rgba(51,51,51, 0.77)",
    padding: theme.spacing.unit * 2,
    position: "absolute"
  },
  storeIcon: {
    color: theme.palette.grey[400]
  },
  testimonialContainer: {
    padding: theme.spacing.unit * 2,
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing.unit * 6
    },
    [theme.breakpoints.up("md")]: {
      paddingRight: theme.spacing.unit * 6
    }
  },
  testimonialText: {
    paddingLeft: "4rem",
    color: theme.palette.primary.dark,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "3rem"
    }
  },
  tilesContainer: {
    overflow: "hidden",
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
    backgroundColor: theme.palette.primary.dark
  },
  tileItem: {
    width: "33%% !important",
    color: "white",
    background: theme.palette.primary.light,
    margin: theme.spacing.unit
  },
  whitelink: {
    color: theme.palette.common.white
  }
});

const carousel = [
  {
    name: "Cafes",
    img:
      "https://images.unsplash.com/photo-1526639673778-1ed7ff390a4a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4d9b10695a9229a438c2be02736d178f&auto=format&fit=crop&w=720&q=80"
  },
  {
    name: "Hostels",
    img:
      "https://images.unsplash.com/photo-1520277739336-7bf67edfa768?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=09a4f3cb2892021a156c5aa7f82edacb&auto=format&fit=crop&w=720&q=80"
  },
  {
    name: "THE BEST",
    img:
      "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=749f8fec9b7cf4a040ae12df54cc7443&auto=format&fit=crop&w=720&q=80"
  }
];

const tiles = [
  {
    icon: "fas fa-coffee",
    label: "Drink the best coffee!"
  },
  {
    icon: "fas fa-bed",
    label: "Sleep in comfortable beds!"
  },
  {
    icon: "fas fa-wifi",
    label: "Work with fast wifi!"
  }
];

class LandingPage extends Component {
  state = {
    reveal: false,
    index: 0,
    showDialog: false,
    showSearch: false,
    showAccounts: false,
    login: false,
    loading: false
  };

  handleCarouselChange = index => {
    this.setState({ index });
  };

  handleChange = event => {
    const name = event.target.id,
      value = event.target.value;
    this.setState({ [name]: value });
  };

  closeDialog = () =>
    this.setState({
      showDialog: false,
      showAccounts: false,
      showSearch: false,
      login: false
    });

  onSearchClick = () =>
    this.setState({
      showSearch: true,
      showDialog: true
    });

  onSignupClick = () =>
    this.setState({
      showAccounts: true,
      showDialog: true
    });

  toggleAccounts = login =>
    this.setState({
      showDialog: !this.state.showDialog,
      showAccounts: !this.state.showAccounts,
      login
    });

  toggleLoading = () => this.setState({ loading: !this.state.loading });

  requestPlan = name => {
    const { width, history, client } = this.props;
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

        client.resetStore(cb => history.push("/"));
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

  render() {
    const { classes, width, theme, user } = this.props;
    const prospect = user ? user.prospect : false;
    const {
      index,
      showDialog,
      showAccounts,
      showSearch,
      login,
      loading
    } = this.state;
    const renderForm = action => {
      switch (action) {
        case true:
          return <SigninForm />;
        case false:
          return <SignupForm />;
      }
    };
    return (
      <Fragment>
        <Grid
          container
          classes={{ container: classes.headerContainer }}
          alignItems="center"
          justify="center"
        >
          <Carousel
            showArrows={false}
            showThumbs={false}
            interval={2000}
            infiniteLoop
            onChange={this.handleCarouselChange}
            selectedItem={index}
            className={classes.carousel}
            autoPlay
          >
            {carousel.map(item => (
              <img key={Random.id(5)} src={item.img} className={classes.img} />
            ))}
          </Carousel>
          <Grid item xs={10} classes={{ item: classes.sloganContainer }}>
            <Grid
              container
              justify="center"
              alignItems="center"
              direction="column"
            >
              <Typography
                variant="h5"
                align="center"
                classes={{ h5: classes.slogan }}
              >
                Find
              </Typography>
              <Typography
                variant="h3"
                align="center"
                classes={{ h3: classes.slogan }}
                style={{ marginLeft: 8, marginRight: 8 }}
              >
                {`${carousel[index].name}`}
              </Typography>
              <Typography
                variant={isWidthUp("md", width) ? "h5" : "subtitle1"}
                align="center"
                classes={{ root: classes.slogan }}
              >
                {index == 2 ? "WI-FI" : "WITH FAST INTERNET"}
              </Typography>
              {!showSearch && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={this.onSearchClick}
                  classes={{ containedSecondary: classes.accentButton }}
                >
                  Search
                  <Search />
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          justify="center"
          classes={{ container: classes.tilesContainer }}
        >
          <Grid item xs={10}>
            <GridList
              classes={{ root: classes.gridList }}
              cols={isWidthUp("md", width) ? 3 : 1.5}
            >
              {tiles.map(tile => (
                <GridListTile
                  classes={{ root: classes.tileItem }}
                  component={Paper}
                  elevation={2}
                  key={Random.id(5)}
                >
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    style={{ height: "100%" }}
                  >
                    <i className={classNames(tile.icon, classes.icon)} />
                    <Typography
                      variant="h5"
                      align="center"
                      paragraph
                      classes={{ root: classes.iconDescription }}
                    >
                      {tile.label}
                    </Typography>
                  </Grid>
                </GridListTile>
              ))}
            </GridList>
          </Grid>
        </Grid>
        <Grid
          container
          justify="center"
          classes={{ container: classes.headlineContainer }}
        >
          <Grid item xs={6} md={9}>
            <Typography
              variant="h4"
              classes={{ h4: classes.headline }}
              align="center"
            >
              Don't waste time reading reviews anymore!
            </Typography>
          </Grid>
        </Grid>
        <Grid container classes={{ container: classes.productContainer }}>
          <Grid item xs={12} md={6} classes={{ item: classes.imageContainer }}>
            <Grid
              container
              justify="center"
              classes={{
                container: classNames(
                  isWidthUp("sm", width) && classes.macbookImgContainer
                )
              }}
            >
              <img
                src={
                  isWidthUp("sm", width)
                    ? "/assets/macbook.png"
                    : "/assets/devices.png"
                }
              />
              <Grid item xs={12}>
                <Grid container direction="column" justify="center">
                  <Typography variant="caption" align="center" color="default">
                    Coming to
                  </Typography>
                  <Grid container justify="center">
                    <i
                      className={classNames(
                        "fab fa-app-store-ios fa-2x",
                        classes.storeIcon
                      )}
                    />
                    <i
                      className={classNames(
                        "fab fa-google-play fa-2x",
                        classes.storeIcon
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid
              container
              direction="column"
              justify="center"
              classes={{ container: classes.testimonialContainer }}
            >
              <Grid container>
                <Grid item xs={12} style={{ position: "relative" }}>
                  <i
                    className={classNames(
                      "fas fa-quote-left",
                      classes.quoteIcon
                    )}
                  />
                  <Typography
                    variant="subtitle1"
                    align={isWidthUp("md", width) ? "justify" : "left"}
                    classes={{ root: classes.testimonialText }}
                  >
                    While backpacking through South East Asia one of my
                    struggles was booking cheap hostels with decent quality
                    wi-fi. I had to spend so many time reading comments because
                    it happened that I booked on hostels with "high speed wi-fi"
                    but once I got there, the reality was different. Unstable,
                    slow or even no connection at all!
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                justify="flex-end"
                style={{ alignContent: "center" }}
              >
                <Grid item xs={8} style={{ padding: "16px 0px 16px 16px" }}>
                  <Grid container justify="flex-end">
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" align="right">
                        Diego Robles
                      </Typography>
                      <Divider classes={{ root: classes.divider }} />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" align="right">
                        Maker of NomadScore
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4} md={2}>
                  <Grid
                    container
                    justify={isWidthUp("md", width) ? "flex-end" : "center"}
                    alignItems="center"
                    style={{ height: "100%" }}
                  >
                    <Avatar
                      component={Paper}
                      elevation={5}
                      src={avatarSrc}
                      classes={{ root: classes.avatar }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          classes={{ container: classes.parallaxContainer }}
          component={Paper}
          elevation={12}
        >
          <Parallax
            blur={1}
            bgImage={`https://images.unsplash.com/photo-1530521954074-e64f6810b32d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=375f08acd511ccc0cc6ca5db9979c7b1&auto=format&fit=crop&w=1950&q=80`}
            bgImageAlt="instagram"
            bgWidth="100%"
            strength={50}
            style={{ height: "100%", width: "100%" }}
          />
        </Grid>
        <Grid
          container
          classes={{ container: classes.pricingContainer }}
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid container justify="center">
            <Typography
              variant="h3"
              classes={{ h3: classes.pricingHeading }}
              paragraph
            >
              Pricing
            </Typography>
          </Grid>
          <Grid container justify="space-evenly" style={{ padding: 16 }}>
            <Grid item xs={12}>
              <Typography
                variant="caption"
                align="center"
                style={{ fontSize: "1.65rem", color: theme.palette.grey[400] }}
                paragraph
              >
                Which kind of
                <Hidden mdUp>
                  <br />
                </Hidden>{" "}
                nomad are you?
              </Typography>
            </Grid>
            {!Meteor.userId() && (
              <Grid
                item
                xs={9}
                md={4}
                classes={{ item: classes.planContainer }}
                component={Paper}
                elevation={5}
                style={{ background: theme.palette.grey[200] }}
              >
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justify="center"
                >
                  <Typography variant="h2" color="primary" paragraph>
                    SLOW
                  </Typography>
                  <Typography
                    variant="caption"
                    color="default"
                    paragraph
                    classes={{ root: classes.planDescription }}
                    align="center"
                  >
                    You work from home or office <br />
                    and like coffee!
                  </Typography>
                  <Typography
                    variant="h6"
                    color="default"
                    paragraph
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Search />1 Daily Search
                  </Typography>
                  <Typography
                    variant="h6"
                    color="default"
                    paragraph
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <ViewList />
                    16 max results
                  </Typography>
                  <Typography
                    variant="h6"
                    color="default"
                    paragraph
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <NetworkCheck />
                    Rate!
                  </Typography>
                  {!Meteor.userId() && !showDialog && (
                    <Button
                      variant="contained"
                      size="large"
                      color="secondary"
                      classes={{ containedSecondary: classes.signupButton }}
                      onClick={this.onSignupClick}
                    >
                      Sign Up
                    </Button>
                  )}
                  <Typography
                    variant="caption"
                    color="default"
                    paragraph
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    {` { It's FREE! } `}
                  </Typography>
                </Grid>
              </Grid>
            )}
            <Grid
              item
              xs={9}
              md={4}
              classes={{ item: classes.planContainer }}
              component={Paper}
              elevation={5}
            >
              <Grid
                container
                direction="column"
                alignItems="center"
                justify="center"
              >
                <Typography
                  variant="h2"
                  color="primary"
                  align="center"
                  paragraph
                  style={{ fontWeight: 800, fontFamily: "pacifico" }}
                >
                  Fast
                </Typography>
                <Typography
                  variant="caption"
                  color="default"
                  paragraph
                  classes={{ root: classes.planDescription }}
                  align="center"
                >
                  You work remote, travel a lot <br /> and like coffee!
                </Typography>
                <Typography
                  variant="h6"
                  color="default"
                  paragraph
                  align="center"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <NearMe />
                  GEOLOCALIZATION!
                </Typography>
                <Typography
                  variant="h6"
                  color="default"
                  paragraph
                  align="center"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <ViewList />
                  Near you!
                </Typography>
                <Typography
                  variant="h6"
                  color="default"
                  paragraph
                  align="center"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <LocalAtm />
                  ATMS!
                </Typography>
                {prospect ? (
                  <Typography
                    variant="caption"
                    color="primary"
                    paragraph
                    style={{ fontWeight: 1000 }}
                  >
                    We will contact you soon.
                  </Typography>
                ) : (
                  !showDialog && (
                    <Button
                      variant="contained"
                      size="large"
                      color="secondary"
                      align="center"
                      classes={{ containedSecondary: classes.requestButton }}
                      onClick={event => {
                        if (Meteor.userId()) {
                          this.requestPlan("fast");
                        } else {
                          this.toggleAccounts(Meteor.userId ? true : false);
                        }
                      }}
                    >
                      {loading ? (
                        <Spinner
                          size={15}
                          color={theme.palette.custom.accent}
                        />
                      ) : !Meteor.userId() ? (
                        "Login to request"
                      ) : (
                        "I WANT THIS!"
                      )}
                    </Button>
                  )
                )}
                <Typography
                  variant="caption"
                  color="default"
                  paragraph
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {` { Unlimited searches up to 50 results } `}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          classes={{ container: classes.mediaContainer }}
          alignItems="center"
          alignContent="center"
          justify="center"
          direction="column"
        >
          <Typography
            variant={isWidthUp("md", width) ? "h1" : "h3"}
            classes={{ root: classes.logo }}
            align="center"
            paragraph
          >
            {`${Meteor.settings.public.appName}`}
          </Typography>
          <Grid item xs={6} md={4}>
            <IconButton
              color="primary"
              href="https://www.instagram.com/nomadscoreapp"
              classes={{ root: classes.instagramButton }}
            >
              <i className="fab fa-instagram fa-3x" />
            </IconButton>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Grid
              container
              classes={{ container: classes.communityContainer }}
              alignItems="center"
              alignContent="center"
              justify="center"
            >
              <Grid item xs={10} md={6}>
                <Grid container justify="center">
                  <Typography
                    variant="h2"
                    align="center"
                    classes={{ root: classes.communityHeading }}
                  >
                    HELP
                  </Typography>
                </Grid>
                <Typography
                  variant="h1"
                  align="center"
                  style={{ color: "white", fontWeight: 300 }}
                >
                  +1500
                </Typography>
                <Typography
                  variant="h2"
                  align="center"
                  color="secondary"
                  classes={{ root: classes.communitySubheading }}
                  paragraph
                >
                  OTHER NOMADS
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  style={{ color: "white", fontWeight: 400 }}
                >
                  MAKE THEIR LIFE EASIER!
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              classes={{ container: classes.footerHeadingContainer }}
            >
              <Typography
                variant="h5"
                style={{ color: `${theme.palette.primary.dark}` }}
              >
                I BUILT THIS APP ON
              </Typography>
              <Typography variant="h3" color="secondary" paragraph>
                <a
                  className={classNames(classes.link, classes.hashtag)}
                  href="https://24hrstartup.com/diego-robles"
                >
                  #24HRSTARTUP
                </a>
              </Typography>
              <Typography
                variant="h5"
                style={{ color: `${theme.palette.primary.dark}` }}
              >
                CHALLENGE
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container classes={{ container: classes.footerContainer }}>
          <Grid container>
            <Grid item xs={4}>
              <Grid
                container
                justify="center"
                alignItems="center"
                direction="column"
                style={{ height: "100%" }}
              >
                <Typography variant="h6" style={{ color: "grey" }}>
                  Powered by
                </Typography>
                <i
                  className="fab fa-foursquare fa-2x"
                  style={{ color: "white" }}
                />
                <Typography variant="subtitle1" style={{ color: "grey" }}>
                  Foursquare
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <Grid
                container
                justify="center"
                alignItems="flex-end"
                direction="column"
                style={{ height: "100%", padding: 8 }}
              >
                <Typography variant="subtitle1" style={{ color: "grey" }}>
                  Developed by
                </Typography>
                <Typography variant="h6" style={{ color: "grey" }}>
                  <a
                    href="https://www.noincomedev.me"
                    className={classes.whitelink}
                  >
                    NOINCOMEDEV
                  </a>
                </Typography>
                <Grid container justify="flex-end">
                  <IconButton
                    color="primary"
                    href="https://www.instagram.com/noincomedev"
                    style={{ color: theme.palette.custom.accent }}
                  >
                    <i className="fab fa-instagram" />
                  </IconButton>
                  <IconButton
                    color="primary"
                    href="https://www.twitter.com/noincomedev"
                    style={{ color: theme.palette.custom.accent }}
                  >
                    <i className="fab fa-twitter" />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Dialog
          classes={{ paper: classes.dialogContainer }}
          title={Meteor.userId() ? "Rate" : "Log In"}
          open={showDialog}
          onClose={this.closeDialog}
          fullWidth
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" style={{ padding: 4 }}>
            {showSearch ? "Search" : login ? "Login" : "Create Account"}
          </DialogTitle>
          <Grid container>
            <Grid item xs={12}>
              <Divider classes={{ root: classes.divider }} />
            </Grid>
          </Grid>
          {showSearch && (
            <Typography
              variant="caption"
              style={{ marginLeft: 32, marginTop: 8 }}
            >
              Select from dropdown.
            </Typography>
          )}
          <DialogContent classes={{ root: classes.dialogContent }}>
            {showAccounts && renderForm(login)}
            {showSearch && <SearchVenues />}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

const CURRENT_USER = gql`
  query currentUser {
    user {
      _id
      prospect
    }
  }
`;

const SET_AS_PROSPECT = gql`
  mutation setAsProspect {
    setAsProspect {
      prospect
    }
  }
`;

export default compose(
  graphql(CURRENT_USER, {
    options: {
      fetchPolicy: "cache-and-network"
    },
    props: ({ data }) => ({ ...data })
  }),
  graphql(SET_AS_PROSPECT, {
    name: "setAsProspect",
    options: {
      refetchQueries: ["user"]
    }
  })
)(
  withWidth()(
    withStyles(styles, { withTheme: true })(withApollo(withRouter(LandingPage)))
  )
);
