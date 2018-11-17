import React, { Component, Fragment } from "react";
import classNames from "classnames";
import gql from "graphql-tag";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import withWidth, { isWidthDown, isWidthUp } from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";

const backgroundImgUrl =
  "https://images.unsplash.com/photo-1513258496099-48168024aec0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=73c00aaa6d23115d7fbe494c0cc1e5e3&auto=format&fit=crop&w=2100&q=80";

const avatarSrc =
  "https://lh3.googleusercontent.com/LBBaynhWIeEEGgQ7r4Pu_bjZWxRGQU1Dlj0UW5Krl3sxVSbYRXdZzf120FAHhQ0glEBRATGIOz-vGlMsQdrZr7roArq4CcVwyyyeGFfEOL8CpoCzu-Lqp8vmg9ffNdbOaoSVrCDZ3-CEcKpCoUgQr4RQUUWunhzx85EAFdPBHf7xXAaCmNmXhJFRX466vArJTpxonvnUhirzE9LZmPf2siLaG1U8SRy6mGzaIKaEqLb9kYJsVjGHmUChTrzHmG7xyUpsaQFA-OxIhMYhFNPgaPHwvPXv17eJ-TO1KU2LLwgBsKyzguv-IC00UdQ8AXL9Zm9qjRyowVbAmG1rjE4BZhAtyHer2Ex-6gvK9WuoYEBJaLMq8nVkzTwif2kEKyT0SCEHbrZldgTFemCRsSYCNo_LIkOlBoUvsUutiM9hto4F0G_Pa3EftoNu6Kri376Y1G0DZnlFBpzo6K8WlCy77vIDpt7bR-pGdU1YYEj3aBW5BcIj1Wrrues_G9Evz3hkL1MD3wqAdUSWmqXdUgNDAVUw5IovVzeTTp07exQs1uLFrGjvjBJk9AKF8f52WLskRvsJmQKssIVgMcYrXZkibFHte3GoVINm=w475-h349-no-tmp.jpg";

const styles = theme => ({
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
    backgroundColor: theme.palette.primary.main,
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
  divider: {
    paddingBottom: theme.spacing.unit / 4,
    backgroundColor: theme.palette.secondary.light
  },
  focusedLabel: {
    color: `${theme.palette.secondary.main} !important`
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
    width: "100%",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 5,
    paddingRight: theme.spacing.unit * 12,
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing.unit * 7,
      paddingRight: theme.spacing.unit * 12,
      maxWidth: "66vw"
    }
  },
  headerContainer: {
    height: "44vh",
    position: "relative"
  },
  headlineContainer: {
    [theme.breakpoints.down("sm")]: {
      background: theme.palette.grey[300]
    },
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6
    }
  },
  headline: {
    fontFamily: "pacifico",
    color: theme.palette.primary.dark,
    padding: theme.spacing.unit * 4,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.33rem"
    },
    [theme.breakpoints.up("md")]: {
      transform: "skew(20deg)",
      boxShadow: `10px 10px ${theme.palette.secondary.main}`
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
  iconDescription: { color: theme.palette.primary.dark },
  img: { height: "100%" },
  imgWrapper: {
    background: "red"
  },
  inputLabel: {
    color: theme.palette.secondary.main
  },
  joinusContainer: {
    backgroundColor: theme.palette.primary.main,
    backgroundImage: `linear-gradient(rgba(51, 51, 51, 0.45),rgba(51, 51, 51, 0.66)),
                      url(${backgroundImgUrl})`,
    backgroundSize: "cover",
    padding: theme.spacing.unit * 4,
    [theme.breakpoints.down("sm")]: {
      minHeight: "44vh"
    },
    [theme.breakpoints.up("md")]: {
      minHeight: "100%"
    }
  },
  logo: {
    textDecoration: "none",
    color: theme.palette.common.white,
    fontFamily: "pacifico",
    textShadow: "-3px 0 black, 0 3px black, 3px 0 black, 0 -3px black"
  },
  notchedOutline: {
    borderColor: `${theme.palette.grey[600]} !important`,
    color: theme.palette.common.white
  },
  quoteIcon: {
    fontSize: "3.5rem",
    position: "absolute",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.5rem"
    }
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
  testimonialContainer: {
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing.unit * 6
    }
  },
  testimonialText: {
    paddingLeft: "4rem",
    color: theme.palette.grey[600],
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "3rem"
    }
  },
  tilesContainer: {
    overflow: "hidden",
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
    backgroundColor: theme.palette.primary.dark,
    [theme.breakpoints.down("sm")]: {
      paddingRight: theme.spacing.unit * 3
    }
  },
  tileItem: {
    color: "white",
    transform: "skew(-20deg)",
    margin: theme.spacing.unit,
    background: theme.palette.secondary.light
  }
});

const carousel = [
  {
    name: "Cafes",
    img:
      "https://images.unsplash.com/photo-1526639673778-1ed7ff390a4a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4d9b10695a9229a438c2be02736d178f&auto=format&fit=crop&w=720&q=80"
  },
  {
    name: "Coworks",
    img:
      "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=749f8fec9b7cf4a040ae12df54cc7443&auto=format&fit=crop&w=720&q=80"
  },
  {
    name: "Hostels",
    img:
      "https://images.unsplash.com/photo-1520277739336-7bf67edfa768?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=09a4f3cb2892021a156c5aa7f82edacb&auto=format&fit=crop&w=720&q=80"
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

const GET_NEAR_VENUES = gql`
  query nearVenues {
    nearVenues {
      _id
      name
    }
  }
`;

class LandingPage extends Component {
  state = {
    reveal: false,
    index: 0,
    search: ""
  };

  handleCarouselChange = index => {
    this.setState({ index });
  };

  handleChange = event => {
    const name = event.target.id,
      value = event.target.value;
    this.setState({ [name]: value });
  };

  findVenues = () => {
    this.props.nearVenues().then(result => {
      console.log(result);
    });
  };

  render() {
    const { classes, width } = this.props;
    const { index, search } = this.state;
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
              direction={isWidthUp("md", width) ? "row" : "column"}
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
                paragraph={isWidthDown("sm", width)}
              >
                WITH FAST INTERNET
              </Typography>
            </Grid>
            <Grid container justify="center" spacing={8}>
              <Grid item xs={8} md={6}>
                <TextField
                  variant="outlined"
                  id="search"
                  value={search}
                  label="Where are you going?"
                  onChange={this.handleChange}
                  placeholder="Chiang Mai, Thailand"
                  fullWidth
                  InputProps={{
                    classes: { notchedOutline: classes.notchedOutline }
                  }}
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                      focused: classes.focusedLabel
                    }
                  }}
                />
              </Grid>
              <Grid
                item
                xs={3}
                md={1}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={event => {
                    this.findVenues;
                  }}
                >
                  <i className="fas fa-search" />
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          justify="space-around"
          classes={{ container: classes.tilesContainer }}
        >
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
        <Grid
          container
          justify="center"
          classes={{ container: classes.headlineContainer }}
        >
          <Typography
            variant="h4"
            classes={{ h4: classes.headline }}
            align="center"
          >
            Don't waste time reading reviews anymore!
          </Typography>
        </Grid>
        <Grid
          container
          justify="center"
          classes={{ container: classes.testimonialContainer }}
        >
          <Grid item xs={10} md={7} style={{ position: "relative" }}>
            <i className={classNames("fas fa-quote-left", classes.quoteIcon)} />
            <Typography
              variant="h5"
              align={isWidthUp("md", width) ? "justify" : "left"}
              classes={{ root: classes.testimonialText }}
            >
              While backpacking through South East Asia one of my struggles was
              booking cheap hostels with decent quality wi-fi. I had to spend so
              many time reading comments because it happened that I booked on
              hostels with "high speed wi-fi" but once I got there, the reality
              was different. Unstable, slow or even no connection at all!
            </Typography>
          </Grid>
          <Grid item xs={10} md={7} style={{ padding: 16 }}>
            <Grid
              container
              justify={isWidthUp("md", width) ? "flex-end" : "center"}
              alignItems="center"
            >
              <Grid item xs={12} md={4}>
                <Grid
                  container
                  justify={isWidthUp("md", width) ? "flex-end" : "center"}
                >
                  <Avatar src={avatarSrc} classes={{ root: classes.avatar }} />
                </Grid>
              </Grid>
              <Grid item xs={8} md={4}>
                <Grid container direction="column" alignItems="center">
                  <Typography variant="h6">Diego Robles</Typography>
                  <Grid container justify="center">
                    <Grid item xs={8}>
                      <Divider classes={{ root: classes.divider }} />
                    </Grid>
                  </Grid>
                  <Typography variant="subtitle1">
                    Maker of NomadScore
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Grid
              container
              classes={{ container: classes.communityContainer }}
              alignItems="center"
              justify="center"
            >
              <Grid item xs={10} md={6}>
                <Typography variant="h2" align="center" color="secondary">
                  HELP
                </Typography>
                <Typography
                  variant="h1"
                  align="center"
                  style={{ color: "white", fontWeight: 400 }}
                >
                  +1500
                </Typography>
                <Typography variant="h2" align="center" color="secondary">
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
              classes={{ container: classes.joinusContainer }}
              alignItems="center"
              alignContent="center"
              justify="center"
              direction="column"
            >
              <Typography
                variant={isWidthUp("md", width) ? "h4" : "h6"}
                align="center"
                style={{ color: "#F75C03" }}
                paragraph
              >
                JOIN
              </Typography>
              <Typography
                variant={isWidthUp("md", width) ? "h1" : "h3"}
                classes={{ root: classes.logo }}
                align="center"
                paragraph
              >
                NomadScore
              </Typography>
              <Grid item xs={6} md={4}>
                <Button
                  color="secondary"
                  variant="contained"
                  size="large"
                  fullWidth
                >
                  NOW
                </Button>{" "}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default withWidth()(withStyles(styles)(LandingPage));
