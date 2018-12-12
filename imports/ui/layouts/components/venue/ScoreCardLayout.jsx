import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  scoreHeadline: {
    color: theme.palette.secondary.light,
    marginRight: theme.spacing.unit * 2
  }
});

export default withStyles(styles, { withTheme: true })(
  ({ classes, score, votesCount, theme }) => {
    const renderCaption = () => {
      switch (votesCount) {
        case 0:
          return "Not rated yet.";
        default:
          return `Based on ${votesCount} ${
            votesCount == 1 ? "rate" : "ratings"
          }`;
      }
    };
    const renderScore = score => {
      if (score == null)
        return (
          <Typography variant="h3" align="center">
            🚧
          </Typography>
        );
      if (score < 3)
        return (
          <Typography variant="h3" align="center">
            😐
          </Typography>
        );
      if (score <= 4)
        return (
          <Typography variant="h3" align="center">
            🙂
          </Typography>
        );
      if (score > 4)
        return (
          <Typography variant="h3" align="center">
            😀
          </Typography>
        );
    };
    return (
      <Grid
        item
        xs={8}
        sm={6}
        style={{
          backgroundColor: theme.palette.primary.light,
          borderRadius: theme.spacing.unit,
          paddingTop: theme.spacing.unit * 2,
          paddingBottom: theme.spacing.unit * 2
        }}
      >
        <Grid container justify="center" alignItems="center">
          <Typography
            variant="h3"
            align="center"
            classes={{ root: classes.scoreHeadline }}
          >
            Score
          </Typography>
          {renderScore(score)}
          <Grid item xs={12}>
            <Typography
              variant="caption"
              align="center"
              style={{ color: theme.palette.grey[400] }}
              align="center"
            >
              {renderCaption()}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  }
);
