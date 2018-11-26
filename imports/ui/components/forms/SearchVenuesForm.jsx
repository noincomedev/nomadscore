import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import Spinner from "../utils/Spinner";

const styles = theme => ({
  arrowIcon: {
    color: theme.palette.secondary.dark
  },
  paper: {
    padding: theme.spacing.unit,
    backgroundColor: theme.palette.background.default
  },
  rootContainer: {
    padding: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit
  },
  searchButton: {
    border: "1px solid white",
    color: theme.palette.common.white
  },
  searchInput: {
    color: theme.palette.common.white
  }
});

class SearchVenueForm extends Component {
  state = {
    near: ""
  };

  handleChange = near => this.setState({ near });

  handleSelect = near => {
    const { history, location, onSelect } = this.props;
    const index = location.pathname == "/";
    if (!index) onSelect();
    geocodeByAddress(near)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        const { lat, lng } = latLng;
        history.push("/find/near", { near, coords: { lat, lng } });
      })
      .catch(error => console.error("Error", error));
  };

  render() {
    const { classes } = this.props;
    const { near } = this.state;
    return (
      <Grid container classes={{ container: classes.rootContainer }}>
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
              <div style={{ width: "100%" }}>
                <input
                  {...getInputProps({
                    placeholder: "Search Places ...",
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
      </Grid>
    );
  }
}
export default withStyles(styles)(withRouter(SearchVenueForm));
