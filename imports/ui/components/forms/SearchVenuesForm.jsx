import React, { Component } from "react";
import { Bert } from "meteor/themeteorchef:bert";
import { withRouter } from "react-router-dom";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";

import Spinner from "../utils/Spinner";

const styles = theme => ({
  arrowIcon: {
    color: theme.palette.secondary.dark
  },
  checkbox: {
    color: `${theme.palette.custom.accent} !important`
  },
  checkboxLabel: {
    margin: 0
  },
  label: {
    fontSize: "2.5rem",
    color: theme.palette.common.white
  },
  paper: {
    padding: theme.spacing.unit,
    backgroundColor: theme.palette.background.default
  },
  rootContainer: {
    padding: theme.spacing.unit * 4,
    borderRadius: 25,
    borderBottom: `3px solid ${theme.palette.secondary.main}`,
    borderRight: `3px solid ${theme.palette.secondary.main}`,
    backgroundColor: "rgba(35,39,42, 0.44)"
  },
  searchButton: {
    color: theme.palette.custom.white,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.primary.dark
    }
  },
  searchInput: {
    color: theme.palette.common.white
  },
  slogan: {
    color: theme.palette.common.white,
    fontWeight: 500
  }
});

class SearchVenueForm extends Component {
  state = {
    near: "",
    hostels: true,
    cafes: true,
    selected: false
  };

  handleChange = near => this.setState({ near });

  handleCheckboxChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleSelect = near => this.setState({ near, selected: true });

  onSearch = () => {
    const { history, width, onSelect } = this.props;
    const { near, hostels, cafes, selected } = this.state;
    if (selected) {
      geocodeByAddress(near)
        .then(results => getLatLng(results[0]))
        .then(latLng => {
          const { lat, lng } = latLng;
          if (onSelect) onSelect();
          history.push("/find/near", {
            near,
            coords: { lat, lng },
            categories: { hostels, cafes }
          });
        })
        .catch(error => {
          Bert.alert({
            title: "Error!",
            message: "Something went wrong. Please try again",
            type: "danger",
            style: isWidthUp("sm", width) ? "growl-top-right" : "fixed-top",
            icon: "fa-remove"
          });
        });
    } else {
      Bert.alert({
        title: "Alert!",
        message: "Select from dropdown.",
        type: "warning",
        style: isWidthUp("sm", width) ? "growl-top-right" : "fixed-top",
        icon: "fa-warning"
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { near, cafes, hostels } = this.state;
    return (
      <Grid
        container
        justify="center"
        classes={{ container: classes.rootContainer }}
        component={Paper}
        elevation={5}
      >
        <Typography
          variant="h6"
          align="center"
          paragraph
          classes={{ root: classes.slogan }}
        >
          Find the right place to be online near:
        </Typography>
        <Grid item xs={12}>
          <PlacesAutocomplete
            value={near}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading
            }) => (
              <div style={{ width: "100%", position: "relative" }}>
                <input
                  {...getInputProps({
                    placeholder: "Chiang Mai, Thailand ...",
                    className: "autocomplete-search-input"
                  })}
                />
                <div className="autocomplete-container">
                  {loading && (
                    <div style={{ width: "100%", backgroundColor: "white" }}>
                      <Spinner size={20} />
                    </div>
                  )}
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? "autocomplete-suggestion-item--active"
                      : "autocomplete-suggestion-item";
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, { className })}
                      >
                        <strong>
                          {`${suggestion.formattedSuggestion.mainText}, `}
                        </strong>
                        <small>
                          {suggestion.formattedSuggestion.secondaryText}
                        </small>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </Grid>
        <Grid item xs={12}>
          <FormGroup row style={{ justifyContent: "space-around" }}>
            <FormControlLabel
              classes={{ root: classes.checkboxLabel, label: classes.label }}
              control={
                <Checkbox
                  checked={cafes}
                  onChange={this.handleCheckboxChange("cafes")}
                  value="cafes"
                  classes={{ colorSecondary: classes.checkbox }}
                />
              }
              label="☕️"
            />
            <FormControlLabel
              classes={{ root: classes.checkboxLabel, label: classes.label }}
              control={
                <Checkbox
                  checked={hostels}
                  onChange={this.handleCheckboxChange("hostels")}
                  value="hostels"
                  classes={{
                    colorSecondary: classes.checkbox
                  }}
                />
              }
              label="🛏"
            />
          </FormGroup>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button
            variant="contained"
            color="secondary"
            classes={{ containedSecondary: classes.searchButton }}
            onClick={this.onSearch}
            fullWidth
          >
            GO!
          </Button>
        </Grid>
      </Grid>
    );
  }
}
export default withWidth()(withStyles(styles)(withRouter(SearchVenueForm)));
