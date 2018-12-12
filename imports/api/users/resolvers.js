import Venues from "../venues/Venues";

export default {
  Query: {
    user(obj, args, { user }) {
      return user;
    }
  },
  Mutation: {
    setAsProspect(obj, args, { user }) {
      if (user) {
        const { profile } = user;
        profile.prospect = true;
        const userid = Meteor.users.update(
          { _id: user._id },
          { $set: { profile: { ...profile } } }
        );
        return Meteor.users.findOne({ _id: user._id });
      }
      throw new Error("unauthorized");
    },
    submitVote(obj, { vote }, { user }) {
      if (user) {
        Venues.update(
          { providerid: vote.providerid },
          {
            $addToSet: {
              votes: {
                owner: user._id,
                score: vote.score
              }
            }
          }
        );
        const venue = Venues.findOne({ providerid: vote.providerid });
        return { ...venue, voted: true };
      }
      throw new Error("unauthorized");
    },
    checkAt(obj, { providerid }, { user }) {
      if (user) {
        const { profile } = user;
        profile.at = providerid;
        Meteor.users.update({ _id: user._id }, { $set: { profile } });
        return Meteor.users.findOne({ _id: user._id });
      }
      throw new Error("unauthorized");
    },
    checkOut(obj, args, { user }) {
      if (user) {
        const { profile } = user;
        profile.at = "";
        Meteor.users.update({ _id: user._id }, { $set: { profile } });
        return Meteor.users.findOne({ _id: user._id });
      }
      throw new Error("unauthorized");
    }
  },
  User: {
    admin: user => (user.profile ? user.profile.admin : false),
    profile: user => {
      const { profile } = user;
      return profile;
    },
    prospect: ({ profile }) => {
      const { prospect } = profile;
      return prospect ? prospect : false;
    },
    venue: user => {
      return Venues.findOne({ providerid: user.profile.at });
    }
  }
};
