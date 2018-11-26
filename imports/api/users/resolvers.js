import Votes from "../votes/Votes";

export default {
  Query: {
    user(obj, args, { user }) {
      return user;
    },
    search(obj, { coords }, { user }) {
      return { coords };
    },
    voted(obj, { providerid }, { user }) {
      if (user) {
        console.log(
          Votes.find({ owner: user._id, providerid }).fetch().length > 0
        );
        return {
          voted: Votes.find({ owner: user._id, providerid }).fetch().length > 0
        };
      }
      return { voted: false };
    }
  },
  Mutation: {
    submitVote(obj, { vote }, { user }) {
      if (user) {
        const { venueid, a, b } = vote;
        return Votes.insert({ owner: user._id, providerid: venueid, a, b });
      }
      throw new Error("unauthorized");
    },
    setAsProspect(obj, args, { user }) {
      if (user) {
        const userid = Meteor.users.update(
          { _id: user._id },
          { $set: { profile: { prospect: true } } }
        );
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
      return prospect;
    }
  }
};
