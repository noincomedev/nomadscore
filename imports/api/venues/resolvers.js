import Votes from "../votes/Votes";

export default {
  Venue: {
    votes: venue => Votes.find({ venueid: venue._id }).fetch()
  }
};
