import Votes from "../votes/Votes";

export default {
  Venue: {
    score: venue => {
      return {
        a: Math.floor(Math.random() * 4 + 1),
        b: Math.round(Math.random() * 4 + 1)
      };
    }
  }
};
