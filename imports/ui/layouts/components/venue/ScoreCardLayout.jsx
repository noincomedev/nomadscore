import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  scoreHeadline: {
    color: theme.palette.primary.dark
  }
});

export default withStyles(styles, { withTheme: true })(
  ({ classes, score, votesCount, theme }) => {
    const renderScore = score => {
      if (score < 3)
        return (
          <Typography variant="h3" align="center" paragraph>
            😐
          </Typography>
        );
      if (score <= 4)
        return (
          <Typography variant="h3" align="center" paragraph>
            🙂
          </Typography>
        );
      if (score > 4)
        return (
          <Typography variant="h3" align="center" paragraph>
            😀
          </Typography>
        );
    };
    return (
      <Grid
        item
        xs={6}
        style={{
          backgroundColor: theme.palette.primary.light,
          borderRadius: theme.spacing.unit,
          paddingBottom: theme.spacing.unit
        }}
      >
        <Typography
          variant="h3"
          align="center"
          classes={{ root: classes.scoreHeadline }}
          paragraph
        >
          Score
        </Typography>
        {renderScore(score)}
        <Typography
          variant="caption"
          align="center"
          style={{ color: theme.palette.grey[400] }}
        >{`Based on ${votesCount} ${
          votesCount == 0 ? "rates" : votesCount == 1 ? "rate" : "ratings"
        }`}</Typography>
      </Grid>
    );
  }
);
