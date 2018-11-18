import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

import Form from "../utils/ValidatedForm";

const styles = theme => ({
  searchButton: {
    color: theme.palette.secondary.main
  }
});

class SearchVenueForm extends Component {
  state = {
    search: ""
  };

  handleChange = event => {
    const name = event.target.id,
      value = event.target.value;

    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { search } = this.state;
    this.props.onSubmit({ near: search });
  };

  render() {
    const { classes, near } = this.props;
    const { search } = this.state;
    return (
      <Form onHandleSubmit={this.handleSubmit} style={{ width: "100%" }}>
        <Grid container>
          <Grid item xs={9}>
            <TextField
              id="search"
              value={search}
              label={near ? "Search Again" : "Search"}
              placeholder="Chiang Mai"
              onChange={this.handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={3}>
            <Grid container alignItems="center" style={{ height: "100%" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                classes={{ containedPrimary: classes.searchButton }}
                fullWidth
              >
                <i className="fas fa-search" />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Form>
    );
  }
}
export default withStyles(styles)(SearchVenueForm);
